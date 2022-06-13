import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from 'src/vehicle.model';
import { Car } from 'src/Car.model';
import { Bike } from 'src/Bike.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  baseUrl: string = "http://localhost:8888";

  constructor(private http: HttpClient) { }

  public getVehicleDetails(vehiclenumber: string) {
    console.log(vehiclenumber);
    return this.http.get<Vehicle>(this.baseUrl + "/getVehicleFromRcNo/" + vehiclenumber).toPromise();
  }

  public getCarModelDetails(modelTypeId: Number) {
    return this.http.get<Car>(this.baseUrl + "/carmodel/" + modelTypeId).toPromise();
  }

  public getBikeModelDetails(modelTypeId: Number) {
    return this.http.get<Bike>(this.baseUrl + "/bikemodel/" + modelTypeId).toPromise();
  }
  
}
