import {
  Component,
  effect,
  inject,
  Inject,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CarouselComponent } from '../../../shared/carousel/carousel.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Vehicle, VehicleDetailsImage } from '../../../interfaces/vehicle.interface';
import { VehicleService } from '../../../services/vehicle.service';
import { EmptyListComponent } from '../../../shared/empty-list/empty-list.component';

@Component({
  selector: 'app-vehicle-details',
  standalone: true,
  imports: [
    CarouselComponent,
    CommonModule,
    EmptyListComponent
  ],
  template: `
    @if (vehicle) {      
      <div class="p-5">
        <b class="text-xl">{{vehicle.vehicleModel}} - {{vehicle.vehicleCompany}}</b>
  
        <app-carousel [slides]="slides"></app-carousel>
  
        <div class="flex flex-row">
          <b class="mr-2">Mileage:</b>
          <label>{{vehicle.mileage | number : '1.2-2' }}</label>
        </div>
        <div class="flex flex-row">
          <b class="mr-2">Company:</b>
          <label>{{vehicle.vehicleCompany}}</label>
        </div>
        <div class="flex flex-row">
          <b class="mr-2">Engine:</b>
          <label>{{vehicle.vehicleEngine}}</label>
        </div>
        <div class="flex flex-row">
          <b class="mr-2">Model:</b>
          <label>{{vehicle.vehicleModel}}</label>
        </div>
      </div>
    }
    @else {
      <app-empty-list [message]="'This vehicle does not exist!'"></app-empty-list>
    }
  `,
})
export class VehicleDetailsComponent {
    private route = inject(ActivatedRoute);
    private vehicleService = inject(VehicleService);

    vehicle: Vehicle | null = null;
    slides: VehicleDetailsImage[] = [];

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.vehicle = this.vehicleService.vehicleSignal().find(x => x.vehicleCompany == params['company'] && x.vehicleModel == params['model']) || null;

        if (this.vehicle) {          
          this.vehicle.vehicleImages.forEach((vehicle, index) => {
            this.convertFileToDataURL(vehicle).then(dataURL => {
              const image: VehicleDetailsImage = {
                src: dataURL,
                id: index.toString()
              }
              this.slides.push(image)
            });
          });
        }

      });
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
