import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from 'src/Car.model';

@Injectable({
  providedIn: 'root'
})

export class CarService {
  modelId: number = 0;
  baseUrl: string = "http://localhost:8888";

  constructor(private http: HttpClient) { }

  public async getBrandList() {
    return this.http.get<string[]>(this.baseUrl + "/getCarBrands").toPromise();
  }

  public async getModelFromBrand(selectedBrand: string) {

    return this.http.get<string[]>(this.baseUrl + "/getCarModelFromBrand/" + selectedBrand).toPromise();
  }

  public async getCarVariantFromBrandModel(selectedBrand: string, selectedModel: string) {
    selectedModel = selectedModel.replace(" ", "_");
    return this.http.get<string[]>(this.baseUrl + "/getCarVariantFromBrandModel/" + selectedBrand + "/" + selectedModel).toPromise();
  }

  public getCarId(car: Car) {
    return this.http.post<number>(this.baseUrl + "/getCarId", car);

  }
  
}
