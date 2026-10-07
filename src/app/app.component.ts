import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { FabService } from './fab.service';
import { LanguageService } from './language.service';
import { Lang } from './translations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  host: {
    '(document:click)': 'accountOpen.set(false)',
    '(document:keydown.escape)': 'accountOpen.set(false)',
  },
})
export class AppComponent {
  title = 'benjaminfester';
  readonly fab = inject(FabService).action;

  private readonly i18n = inject(LanguageService);
  readonly t = this.i18n.t;
  readonly lang = this.i18n.lang;

  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  readonly user = this.auth.user;
  readonly avatarUrl = this.auth.avatarUrl;
  readonly accountOpen = signal(false);

  setLang(lang: Lang): void {
    this.i18n.set(lang);
  }

  toggleAccount(event: Event): void {
    event.stopPropagation(); // otherwise the document click listener closes it again right away
    this.accountOpen.update((open) => !open);
  }

  signOut(): void {
    this.accountOpen.set(false);
    this.auth.logout();
    this.router.navigateByUrl('/');
  }
}
