import { DestroyRef, Injectable, Signal, computed, inject, signal } from '@angular/core';

export interface FabAction {
  /** Font Awesome solid icon name, e.g. 'plus'. */
  icon: string;
  label: string;
  run: () => void;
}

/** What the round button in the middle of the mobile bottom nav does on the current page. */
@Injectable({ providedIn: 'root' })
export class FabService {
  private readonly source = signal<Signal<FabAction> | null>(null);
  readonly action = computed(() => this.source()?.() ?? null);

  /**
   * Call from a page's constructor. `action` may read signals, so the button
   * updates with the page (e.g. play → pause). It is cleared when the page is destroyed.
   */
  register(action: () => FabAction): void {
    const current = computed(action);
    this.source.set(current);
    inject(DestroyRef).onDestroy(() => {
      if (this.source() === current) this.source.set(null);
    });
  }
}
