import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Insurance } from "src/insurance.model";
import { PersonalDetails } from 'src/PersonalDetails.model';
import { GetUrl } from "src/getUrl.model";
import { InsurancePlans } from '../InsurancePlans.model';

@Injectable({
  providedIn: 'root'
})

export class InsuranceService {
  baseUrl: string = "http://localhost:8888";

  constructor(private http: HttpClient) { }

  public async getInsuranceDetail(id: number) {
    return await this.http.get<Insurance[]>(this.baseUrl + "/insurancesByUser/" + id).toPromise();
  };

  public async getUserDetail(id: number) {
    return await this.http.get<PersonalDetails>(this.baseUrl + "/user/" + id).toPromise();
  };

  public async getDownloadUrl(id: string) {
    return await this.http.get<GetUrl>(this.baseUrl + "/getDownloadUrl/" + id).toPromise();
  };

  public getInsurancePlans(vehicleType: string, modelid: number) {
    return this.http.get<InsurancePlans>(this.baseUrl + "/getPlanes" + "/" + vehicleType + "/" + modelid).toPromise();
  };

  public sendWelcomeEmail(userID: number, insuranceID: number) {
    this.http.get(this.baseUrl + "/sendMail/" + userID + "/" + insuranceID).toPromise();
  };

  addInsurance(I: Insurance) {
    return this.http.post<number>(this.baseUrl + "/addinsurance", I);
  }

}