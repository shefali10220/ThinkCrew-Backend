import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminPanelDetails } from "src/admin-dashboard.model";
@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  baseUrl: string = "http://localhost:8888";
  constructor(private http: HttpClient) { }
  public async getAdminPanelDetails() {
    return await this.http.get<AdminPanelDetails>(this.baseUrl + "/adminPanelDetails").toPromise();
  };
}
