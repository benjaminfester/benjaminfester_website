import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  readonly t = inject(LanguageService).t;
  private readonly auth = inject(AuthService);

  readonly busy = signal(false);
  readonly failed = signal(false);

  constructor() {
    const router = inject(Router);
    const returnUrl = this.safeReturnUrl(inject(ActivatedRoute).snapshot.queryParamMap.get('returnUrl'));

    // Covers both "just signed in" and "was already signed in when opening /login"
    effect(() => {
      if (this.auth.isLoggedIn()) router.navigateByUrl(returnUrl);
    });
  }

  /** Not async on purpose: Safari only allows the popup when it opens straight from the click. */
  login(): void {
    this.busy.set(true);
    this.failed.set(false);
    this.auth
      .loginWithGoogle()
      .catch(() => this.failed.set(true))
      .finally(() => this.busy.set(false));
  }

  /** Only go back to pages on this site, never to a URL someone put in the link. */
  private safeReturnUrl(url: string | null): string {
    return url?.startsWith('/') && !url.startsWith('//') ? url : '/todo';
  }
}
