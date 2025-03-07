import { ExtraOptions, Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { AddVehicleComponent } from './core/components/add-vehicle/add-vehicle.component';
import { VehicleDetailsComponent } from './core/components/vehicle-details/vehicle-details.component';

export const routes: Routes = [
    { path: 'home', title: 'Home', component: HomeComponent },
    { path: 'add-vehicle', title: 'Add Vehicle', component: AddVehicleComponent },
    { path: 'vehicle/:company/:model', title: 'Vehicle Details', component: VehicleDetailsComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
];