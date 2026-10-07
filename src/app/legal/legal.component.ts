import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../language.service';

/** The privacy policy and terms of service. Which one is picked by the route's `data.doc`. */
@Component({
  selector: 'app-legal',
  standalone: true,
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.css'],
})
export class LegalComponent {
  readonly t = inject(LanguageService).t;
  private readonly doc: 'privacy' | 'terms' = inject(ActivatedRoute).snapshot.data['doc'];

  readonly title = computed(() => this.t().titles[this.doc]);
  readonly sections = computed(() => this.t().legal[this.doc]);
}
