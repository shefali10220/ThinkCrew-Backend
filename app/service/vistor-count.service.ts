import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class VistorCountService {
  
  baseUrl : string = "http://localhost:8888" ;

  constructor(private http: HttpClient) { }

  public incrementVisitorCount() : void   {
    this.http.get(this.baseUrl+"/incrementcount").toPromise();
  }

}
