import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router } from '@angular/router';
import { Navigation } from '../../interfaces/navigation.interface';
import { navigation } from './navigation.component.data';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="flex flex-row gap-5 p-2">
      @for (nav of navigation; track $index) {
        <button mat-button class="w-full flex flex-col !text-white {{ currentRoute == nav.route ? 'opacity-50' : 'opacity-100' }}" (click)="navigateToRoute(nav.route)">
          <label>{{ nav.name }}</label>
          <mat-icon>{{ nav.icon }}</mat-icon>
        </button>
      }
    </div>
  `,
})
export class NavigationComponent {
  private router = inject(Router);

  navigation: Navigation[] = navigation;

  currentRoute: string | null = null;

  ngOnInit(): void {
    this.currentRoute = this.router.url;

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  };

  navigateToRoute(route: string): void {
    this.router.navigate([route]);
  };
}
