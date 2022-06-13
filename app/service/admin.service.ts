import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonalDetails } from "src/PersonalDetails.model";
import { Observable } from 'rxjs';
import { AdminPanelDetails } from 'src/admin-dashboard.model';
import { Insurance } from 'src/insurance.model';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl: string = "http://localhost:8888";
  constructor(private http: HttpClient) { }
  public async getUsersList() {
    return await this.http.get<PersonalDetails[]>(this.baseUrl + "/users").toPromise();
  };
  public async getAdminPanelDetails() {
    return await this.http.get<AdminPanelDetails>(this.baseUrl + "/adminPanelDetails").toPromise();
  };
  public async getAllInsuranceDetails() {
    return await this.http.get<Insurance[]>(this.baseUrl + "/insurances").toPromise();
  };
  public deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl+"/del/"+userId);
  }
}