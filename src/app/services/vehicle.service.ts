import { Injectable, signal } from '@angular/core';
import { Vehicle } from '../interfaces/vehicle.interface';

@Injectable({
  providedIn: 'root',
})

export class VehicleService {
  vehicleSignal = signal<Vehicle[]>([]);

  addVehicle(newVehicle: Vehicle) {
    this.vehicleSignal.update((signal) => {
      if (signal) {
        const currentVehicles = signal || [];
        currentVehicles.push(newVehicle);
        return currentVehicles;
      };
      return signal;
    });
  }
}
