import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NavigationComponent } from "./shared/navigation/navigation.component";
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MatSlideToggleModule, NavigationComponent, MatToolbarModule],
  styleUrl: './app.component.scss',
  template: `
    <mat-toolbar>
      <span>Vehicles Project</span>
    </mat-toolbar>
    <router-outlet/>
    <app-navigation class="fixed bottom-0 z-99 w-full bg-[#673ab7]"><app-navigation/>
  `
})
export class AppComponent {
  title = 'carsproject';
}
