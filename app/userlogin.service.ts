import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from 'src/UserLogin.model';

@Injectable({
  providedIn: 'root'
})

export class UserloginService {
  baseUrl : string = "http://localhost:8888" ;

  constructor(private http: HttpClient) { }

  public getOtp(userlogin: UserLogin){
    return this.http.post(this.baseUrl+"/getOTP",userlogin).toPromise();
  }
}
