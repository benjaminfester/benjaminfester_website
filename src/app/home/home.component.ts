import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  readonly skills = [
    'Software architecture',
    'Full-stack development',
    'Optimization & numerical methods',
    'Cloud & CI/CD',
    'MySQL',
    'Product development',
  ];
}
