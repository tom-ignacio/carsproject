import {
  Component,
  Inject,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CarouselComponent } from '../../../shared/carousel/carousel.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselComponent,
    CommonModule
  ],
  template: `
    <div class="p-5">
      <b class="text-xl">{{data.vehicle.vehicleModel}} - {{data.vehicle.vehicleCompany}}</b>

      <app-carousel [slides]="this.data.slides"></app-carousel>

      <div class="flex flex-row">
        <b class="mr-2">Mileage:</b>
        <label>{{data.vehicle.mileage | number : '1.2-2' }}</label>
      </div>
      <div class="flex flex-row">
        <b class="mr-2">Company:</b>
        <label>{{data.vehicle.vehicleCompany}}</label>
      </div>
      <div class="flex flex-row">
        <b class="mr-2">Engine:</b>
        <label>{{data.vehicle.vehicleEngine}}</label>
      </div>
      <div class="flex flex-row">
        <b class="mr-2">Model:</b>
        <label>{{data.vehicle.vehicleModel}}</label>
      </div>
    </div>
  `,
})
export class VehicleDetailsComponent {

    constructor(
        public dialogRef: MatDialogRef<VehicleDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(): void {
    }

    convertFileToDataURL(file: File): Promise<string> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve(e.target?.result as string);
        };
        reader.onerror = (e) => {
          reject('File could not be read: ' + e.target?.error);
        };
        reader.readAsDataURL(file);
      });
    }
}
