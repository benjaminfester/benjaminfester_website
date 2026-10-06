import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FabService } from './fab.service';
import { LanguageService } from './language.service';
import { Lang } from './translations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'benjaminfester';
  readonly fab = inject(FabService).action;

  private readonly i18n = inject(LanguageService);
  readonly t = this.i18n.t;
  readonly lang = this.i18n.lang;

  setLang(lang: Lang): void {
    this.i18n.set(lang);
  }
}
