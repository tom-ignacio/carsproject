import { ExtraOptions, Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { AddVehicleComponent } from './core/components/add-vehicle/add-vehicle.component';

export const routes: Routes = [
    { path: 'home', title: 'Home', component: HomeComponent },
    { path: 'add-vehicle', title: 'Add Vehicle', component: AddVehicleComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
];