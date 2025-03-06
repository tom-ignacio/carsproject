export interface Vehicle {
    mileage: number;
    vehicleImages: File[];
    vehicleCompany: string;
    vehicleModel: string;
    vehicleEngine: string;
}

export interface VehicleDetailsImage {
    src: string;
    id: string;
}