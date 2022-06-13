import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleService } from './service/vehicle.service';
import { VistorCountService } from './service/vistor-count.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private service: VistorCountService,private router:Router){}
 
  ngOnInit(): void {
    this.service.incrementVisitorCount();
  }
 
}
