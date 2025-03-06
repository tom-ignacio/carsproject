import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router } from '@angular/router';
import { Navigation } from '../../interfaces/navigation.interface';
import { VehicleDetailsImage } from '../../interfaces/vehicle.interface';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    @if (slides.length > 0)  {
        <div class="relative">
            <img class="w-144 h-72 object-cover self-center" [src]="slides[counter].src">
            @if (slides.length > 1) {
                <div class="absolute top-1/2 left-0 w-4 h-4 ml-2">        
                    <button mat-mini-fab (click)="previous()">
                        <mat-icon class="ml-2">arrow_back_ios</mat-icon>
                    </button>
                </div>
            
                <div class="absolute top-1/2 left-full w-4 h-4 -ml-12">        
                    <button mat-mini-fab (click)="next()">
                        <mat-icon class="ml-1">arrow_forward_ios</mat-icon>
                    </button>
                </div>
            }
        </div>
    }
  `,
})
export class CarouselComponent {

    @Input() slides: VehicleDetailsImage[] = [];
    counter: number = 0;

    ngOnInit(): void {
    };

    next() {
        const nextCounter = this.counter + 1;
        const maxIndex = this.slides.length;
        this.counter = nextCounter >= maxIndex ? 0 : nextCounter;
    }
    
    previous() {
        const previousCounter = this.counter - 1;
        const maxIndex = this.slides.length;
        this.counter = previousCounter < 0 ? maxIndex - 1 : previousCounter;
    }
}
