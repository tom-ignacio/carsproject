import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { MatSelectModule } from '@angular/material/select'; 
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { VehicleService } from '../../../services/vehicle.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-vehicle',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatOptionModule,
    ReactiveFormsModule,
    CommonModule,
    FileUploadModule
  ],
  template: `
    <form [formGroup]="vehicleForm" (ngSubmit)="onSubmit()">
      <div class="w-full flex flex-col p-15">
        <mat-form-field appearance="fill">
          <mat-label>Mileage</mat-label>
          <input matInput type="number" formControlName="mileage">
          <mat-error>Mileage must be a positive number</mat-error>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Vehicle Company</mat-label>
          <mat-select formControlName="vehicleCompany" (selectionChange)="onCompanyChange($event.value)">
            @for (company of vehicleCompanies; track company) {
              <mat-option [value]="company">{{company}}</mat-option>
            }
          </mat-select>
          <mat-error>Vehicle Company is a required field</mat-error>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Vehicle Engine</mat-label>
          <mat-select formControlName="vehicleEngine">
            @for (option of filteredEngineOptions; track option) {
              <mat-option [value]="option">{{option}}</mat-option>
            }
          </mat-select>
          <mat-error>Vehicle Engine is a required field</mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Vehicle Model</mat-label>
          <input matInput type="text" formControlName="vehicleModel">
          <mat-error>Vehicle Model is a required field</mat-error>
        </mat-form-field>

        <file-upload formControlName="vehicleImages" [accept]="'.jpg,.png,.gif'">

          <mat-error>Only 5 files allowed</mat-error>
        </file-upload>

        <button mat-raised-button color="primary" type="submit" [disabled]="vehicleForm.invalid">Submit</button>
      </div>
    </form>

  `,
})
export class AddVehicleComponent {
  private vehicleService = inject(VehicleService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  vehicleForm: FormGroup;
  vehicleCompanies: string[] = ['Toyota', 'Ford', 'Honda'];
  filteredEngineOptions: string[] = [];

  engineOptions = [
    {
      company: 'Toyota',
      options: ['Petrol', 'Diesel', 'Hybrid']
    },
    {
      company: 'Ford',
      options: ['Petrol', 'Diesel', 'Electric']
    },
    {
      company: 'Honda',
      options: ['Petrol', 'Diesel']
    }
  ];

  public filesControl = new FormControl(null, Validators.required);

  constructor(private fb: FormBuilder) {
    this.vehicleForm = this.fb.group({
      mileage: [0, [Validators.required, Validators.min(0)]],
      vehicleImages: this.filesControl,
      vehicleCompany: [null, Validators.required],
      vehicleModel: ['', Validators.required],
      vehicleEngine: [null, Validators.required]
    });
  }

  imageUrl: string | ArrayBuffer | null = null;

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      this.vehicleService.addVehicle(this.vehicleForm.value)
      this.snackBar.open('Vehicle saved successfully!', 'Okay' , { duration: 2000 });
      this.router.navigate(['/home']);
    } 
  }

  onCompanyChange(company: string) {
    const selectedCompanyOptions = this.engineOptions.find(option => option.company === company);
    this.filteredEngineOptions = selectedCompanyOptions ? selectedCompanyOptions.options : [];
    this.vehicleForm.get('vehicleEngine')?.setValue(null); // Reset the engine option selection
  }
}
