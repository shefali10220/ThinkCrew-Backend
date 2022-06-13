import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bike } from 'src/Bike.model';
import { LoginDetails } from 'src/Login-details.model';
import { SharedItem } from 'src/shared-item.model';
import { BikeService } from '../service/bike.service';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-bike-insurance',
  templateUrl: './bike-insurance.component.html',
  styleUrls: ['./bike-insurance.component.css']
})
export class BikeInsuranceComponent implements OnInit {
  bike: Bike = new Bike();
  public brandList: string[] = [];
  public modelList: string[] = [];
  public selectedBrand: string = '';
  public selectedModel: string = '';
  public year: number = 0;
  public modelId: number = 0;
  private toInsuranceData: any = {
    vehicleType: 'Bike',
    modelId: 0,
    vehicleNumber: ''
  };
  private sharedItem: SharedItem = new SharedItem();
  constructor(private service: BikeService, private router: Router, private sharedService: SharedService) { }
  ngOnInit(): void {
    this.service.getBrandList().then((data) => {
      this.brandList = data;
      this.logindetails = this.sharedService.getLoginDetails();
      if (this.logindetails.isLogged) {
        this.loginoutBtn = "Logout";
      }
      else {
        this.loginoutBtn = "Login";
      }
    });
  }
  public loginoutBtn: string = "Login";
  public logindetails: LoginDetails = new LoginDetails;
  loginout() {
    if (this.logindetails.isLogged) {
      var answer: boolean = confirm("Are you sure you want to logout?");
      if (answer) {
        this.logindetails.isLogged = false;
        this.logindetails.userType = "";
        this.logindetails.userID = 0;
        this.sharedService.setLoginDetails(this.logindetails);
        this.loginoutBtn = "Login";
      }
    }
    else {
      this.loginoutBtn = "Logout";
      this.router.navigate(['login']);
    }
  }
  dashboard() {
    if (this.logindetails.userType == 'User') {
      this.router.navigate(['user']);
    } else {
      this.router.navigate(['admin']);
    }
  }

  home() {
    this.router.navigate(['']);
  }
  help() {
    this.router.navigate(['helpsupport']);
  }
  footerscroll() {
    window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
  }
  getModel(val: any): void {

    this.service.getModelFromBrand(this.selectedBrand).then((data) => {
      this.modelList = data;
    });

  }

  save() {

    this.bike.brand = this.selectedBrand;
    this.bike.model = this.selectedModel;
    this.bike.year = 2018;

    this.service.getBikeId(this.bike).subscribe((data) => {
      this.modelId = data;
      this.toInsuranceData.modelId = this.modelId;
      this.sharedItem.src = "Bikeinsurance";
      this.sharedItem.data = this.toInsuranceData;
      this.sharedService.setSharedData("Insurance", this.sharedItem);
      console.log(this.toInsuranceData);
      this.router.navigate(['insurance']);
    });
  }
}
