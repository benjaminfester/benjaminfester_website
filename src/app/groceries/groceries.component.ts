import { Component, ElementRef, computed, effect, inject, signal, viewChild } from '@angular/core';
import { FabService } from '../fab.service';

interface Grocery {
  id: number;
  name: string;
  bought: boolean;
}

const ITEMS_KEY = 'grocery-items';
const RECENT_KEY = 'grocery-recent';
const MAX_RECENT = 20;

@Component({
  selector: 'app-groceries',
  standalone: true,
  templateUrl: './groceries.component.html',
  styleUrls: ['./groceries.component.css'],
})
export class GroceriesComponent {
  items = signal<Grocery[]>(this.load(ITEMS_KEY));
  recent = signal<string[]>(this.load(RECENT_KEY));
  private readonly newItem = viewChild.required<ElementRef<HTMLInputElement>>('newItem');

  readonly toBuy = computed(() => this.items().filter((g) => !g.bought));
  readonly bought = computed(() => this.items().filter((g) => g.bought));

  /** Previously added items that aren't on the list right now, for one-tap re-adding. */
  readonly suggestions = computed(() => {
    const onList = new Set(this.toBuy().map((g) => g.name.toLowerCase()));
    return this.recent().filter((name) => !onList.has(name.toLowerCase()));
  });

  constructor() {
    inject(FabService).register(() => ({
      icon: 'plus',
      label: 'Add grocery item',
      run: () => this.newItem().nativeElement.focus(),
    }));
    effect(() => this.save(ITEMS_KEY, this.items()));
    effect(() => this.save(RECENT_KEY, this.recent()));
  }

  add(input: HTMLInputElement): void {
    this.addName(input.value);
    input.value = '';
    input.focus();
  }

  /** Adding something already on the list just moves it back to "to buy" instead of duplicating it. */
  addName(raw: string): void {
    const name = raw.trim();
    if (!name) return;
    const key = name.toLowerCase();
    this.items.update((list) => {
      const existing = list.find((g) => g.name.toLowerCase() === key);
      if (existing) return list.map((g) => (g === existing ? { ...g, bought: false } : g));
      return [...list, { id: Date.now(), name, bought: false }];
    });
    this.recent.update((list) =>
      [name, ...list.filter((n) => n.toLowerCase() !== key)].slice(0, MAX_RECENT),
    );
  }

  toggle(id: number): void {
    this.items.update((list) => list.map((g) => (g.id === id ? { ...g, bought: !g.bought } : g)));
  }

  remove(id: number): void {
    this.items.update((list) => list.filter((g) => g.id !== id));
  }

  forget(name: string): void {
    this.recent.update((list) => list.filter((n) => n !== name));
  }

  clearBought(): void {
    this.items.update((list) => list.filter((g) => !g.bought));
  }

  private save(key: string, value: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }

  private load<T>(key: string): T[] {
    try {
      const parsed = JSON.parse(localStorage.getItem(key) ?? '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
}
