import { Injectable, computed, inject, signal } from '@angular/core';
import { AuthRecord, ClientResponseError } from 'pocketbase';
import { PocketBaseService } from './pocketbase.service';

/**
 * Who is signed in. PocketBase keeps the session in localStorage, so it survives
 * reloads; `user` follows it and updates on sign-in and sign-out.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly pb = inject(PocketBaseService);

  readonly user = signal<AuthRecord>(this.validUser());
  readonly isLoggedIn = computed(() => this.user() !== null);
  readonly avatarUrl = computed(() => {
    const user = this.user();
    return user?.['avatar'] ? this.pb.files.getURL(user, user['avatar'], { thumb: '100x100' }) : null;
  });

  constructor() {
    this.pb.authStore.onChange(() => this.user.set(this.validUser()));

    // The stored session may be old: check it with the server and get a fresh token.
    // Only sign out if the server rejects it, not if it's just unreachable.
    if (this.pb.authStore.isValid) {
      this.pb
        .collection('users')
        .authRefresh()
        .catch((err: ClientResponseError) => {
          if (err.status === 401 || err.status === 403 || err.status === 404) this.pb.authStore.clear();
        });
    }
  }

  /**
   * Opens Google's sign-in in a popup. The first sign-in creates the account.
   * Call it straight from a click handler, without awaiting anything first,
   * or Safari blocks the popup.
   */
  loginWithGoogle(): Promise<void> {
    return this.pb
      .collection('users')
      .authWithOAuth2({ provider: 'google' })
      .then(() => undefined);
  }

  logout(): void {
    this.pb.authStore.clear();
  }

  private validUser(): AuthRecord {
    return this.pb.authStore.isValid ? this.pb.authStore.record : null;
  }
}
