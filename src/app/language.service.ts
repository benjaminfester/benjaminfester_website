import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { Lang, Translations, translations } from './translations';

const STORAGE_KEY = 'lang';

/**
 * The site's language. Follows the browser's language until the visitor picks
 * one with the DA/EN switch; that choice is remembered.
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly lang = signal<Lang>(this.initial());
  /** Current texts, e.g. `t().home.role`. */
  readonly t = computed(() => translations[this.lang()]);
  /** For dates and times, e.g. "14:30" vs "2:30 PM". */
  readonly locale = computed(() => (this.lang() === 'da' ? 'da-DK' : 'en-GB'));

  constructor() {
    effect(() => {
      document.documentElement.lang = this.lang();
    });
  }

  set(lang: Lang): void {
    this.lang.set(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
  }

  private initial(): Lang {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'da') return saved;
    } catch {}
    return navigator.language.toLowerCase().startsWith('da') ? 'da' : 'en';
  }
}

/** Route `title`s are keys into `titles`, so the browser tab follows the language too. */
@Injectable({ providedIn: 'root' })
export class TranslatedTitleStrategy extends TitleStrategy {
  private readonly i18n = inject(LanguageService);
  private readonly page = signal<keyof Translations['titles'] | undefined>(undefined);

  constructor(title: Title) {
    super();
    effect(() => {
      const page = this.page();
      title.setTitle(page ? `${this.i18n.t().titles[page]} – Benjamin Fester` : 'Benjamin Fester');
    });
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    this.page.set(this.buildTitle(snapshot) as keyof Translations['titles'] | undefined);
  }
}
