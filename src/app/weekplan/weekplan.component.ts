import { Component, computed, inject } from '@angular/core';
import { LanguageService } from '../language.service';

interface Day {
  date: Date;
  weekday: string;
  label: string;
  isToday: boolean;
}

@Component({
  selector: 'app-weekplan',
  standalone: true,
  templateUrl: './weekplan.component.html',
  styleUrls: ['./weekplan.component.css'],
})
export class WeekplanComponent {
  private readonly i18n = inject(LanguageService);
  readonly t = this.i18n.t;

  private readonly monday = startOfWeek(new Date());
  readonly week = isoWeek(this.monday);

  /** Monday to Sunday of the current week, named in the site's language. */
  readonly days = computed<Day[]>(() => {
    const locale = this.i18n.locale();
    const today = new Date().toDateString();
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(this.monday);
      date.setDate(date.getDate() + i);
      return {
        date,
        weekday: date.toLocaleDateString(locale, { weekday: 'long' }),
        label: date.toLocaleDateString(locale, { day: 'numeric', month: 'short' }),
        isToday: date.toDateString() === today,
      };
    });
  });
}

function startOfWeek(date: Date): Date {
  const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  return monday;
}

/** ISO 8601 week number: weeks start on Monday, week 1 contains the year's first Thursday. */
function isoWeek(date: Date): number {
  const thursday = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  thursday.setUTCDate(thursday.getUTCDate() + 4 - (thursday.getUTCDay() || 7));
  const yearStart = Date.UTC(thursday.getUTCFullYear(), 0, 1);
  return Math.ceil(((thursday.getTime() - yearStart) / 86_400_000 + 1) / 7);
}
