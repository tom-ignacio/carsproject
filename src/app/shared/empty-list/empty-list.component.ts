import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router } from '@angular/router';
import { Navigation } from '../../interfaces/navigation.interface';

@Component({
  selector: 'app-empty-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="flex flex-col w-full gap-12 opacity-50 relative top-60">
        <mat-icon class="self-center scale-500">info</mat-icon>
        <label class="self-center">You don't have any vehicle yet...</label>
    </div>
  `,
})
export class EmptyListComponent {

  ngOnInit(): void {
  };
}
