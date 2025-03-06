import {
  Component,
  effect,
  inject,
} from '@angular/core';
import { Vehicle, VehicleDetailsImage } from '../../../interfaces/vehicle.interface';
import { EmptyListComponent } from "../../../shared/empty-list/empty-list.component";
import { VehicleService } from '../../../services/vehicle.service';
import { MatCardModule } from '@angular/material/card';
import { VehicleDetailsComponent } from '../vehicle-details/vehicle-details.component';
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    EmptyListComponent,
    MatCardModule
  ],
  template: `
    @if (vehicles.length > 0) {
      <div class="grid md:grid-cols-4 gap-4 p-15">
        @for (vehicle of vehicles; track $index) {
          <mat-card class="cursor-pointer" (click)="openDialog(vehicle)">
            <mat-card-header>
              <div class="flex flex-col place-content-center p-3 w-full">
                @if (vehicleImages[$index]) {
                  <img [src]="vehicleImages[$index]" 
                      alt="{{ vehicle.vehicleCompany }} {{ vehicle.vehicleModel }}"
                      class="w-48 h-48 object-cover self-center"/>
                }
                <mat-card-title class="self-center">{{ vehicle.vehicleModel }}</mat-card-title>
                <mat-card-subtitle class="self-center">{{ vehicle.vehicleCompany }} </mat-card-subtitle>
              </div>
            </mat-card-header>
          </mat-card>
        }
      </div>
    }
    @else {
      <app-empty-list></app-empty-list>
    }
  `,
})
export class HomeComponent {
  private vehicleService = inject(VehicleService);
  private dialog = inject(MatDialog);

  vehicles: Vehicle[] = [];

  vehicleImages: string[] = [];

  constructor() {
    effect(() => {
      this.vehicles = this.vehicleService.vehicleSignal();
      this.loadVehicleImages();
    });
  }

  ngOnInit(): void {
    this.loadVehicleImages();
  }

  loadVehicleImages() {
    this.vehicles.forEach((vehicle, index) => {
      if (vehicle.vehicleImages.length > 0) {
        this.convertFileToDataURL(vehicle.vehicleImages[0]).then(dataURL => {
          this.vehicleImages[index] = dataURL;
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

  openDialog(vehicle: Vehicle): void {
    var slides: VehicleDetailsImage[] = [];
    vehicle.vehicleImages.forEach((vehicle, index) => {
      this.convertFileToDataURL(vehicle).then(dataURL => {
        const image: VehicleDetailsImage = {
          src: dataURL,
          id: index.toString()
        }
        slides.push(image)
      });
    });

    const dialogRef = this.dialog.open(VehicleDetailsComponent, {
      data: {
        vehicle: vehicle,
        slides: slides
      }
    });
  }

}
