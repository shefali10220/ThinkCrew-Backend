import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ViewInsurance } from "src/view-insurance.model";

@Injectable({
  providedIn: 'root'
})

export class ViewInsuranceService {
  baseUrl: string = "http://localhost:8888";

  constructor(private http: HttpClient) { }
  
  public async getViewInsuranceById(id:number) {
    return await this.http.get<ViewInsurance>(this.baseUrl + "/getInsuranceView/"+id).toPromise();
  };
 
}