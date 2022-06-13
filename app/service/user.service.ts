import { Injectable } from '@angular/core';
import { User } from 'src/user.model';
import { HttpClient } from '@angular/common/http';
import { Otp } from 'src/otp.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  baseUrl: string = "http://localhost:8888";

  constructor(private http: HttpClient) { }

  addUser(u: User) {
    return this.http.post<number>(this.baseUrl + "/add", u);
  }

  updateUser(u: User) {
    this.http.post(this.baseUrl + "/add", u).subscribe((data: any) => data = u);
  }

  public async verifyEmail(email: string) {
    return await this.http.get<Otp>(this.baseUrl + "/verifyMail/" + email).toPromise();
  }
}
