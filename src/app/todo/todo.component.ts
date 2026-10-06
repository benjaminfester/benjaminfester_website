import { Component, computed, effect, signal } from '@angular/core';

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const STORAGE_KEY = 'todo-items';

@Component({
  selector: 'app-todo',
  standalone: true,
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  items = signal<Todo[]>(this.load());

  readonly open = computed(() => this.items().filter((t) => !t.done));
  readonly done = computed(() => this.items().filter((t) => t.done));

  constructor() {
    effect(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items()));
      } catch {}
    });
  }

  add(input: HTMLInputElement): void {
    const text = input.value.trim();
    if (!text) return;
    this.items.update((list) => [...list, { id: Date.now(), text, done: false }]);
    input.value = '';
    input.focus();
  }

  toggle(id: number): void {
    this.items.update((list) => list.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  remove(id: number): void {
    this.items.update((list) => list.filter((t) => t.id !== id));
  }

  clearDone(): void {
    this.items.update((list) => list.filter((t) => !t.done));
  }

  private load(): Todo[] {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
}
