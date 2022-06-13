import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/Car.model';
import { LoginDetails } from 'src/Login-details.model';
import { SharedItem } from 'src/shared-item.model';
import { CarService } from '../service/car.service';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-car-insurance',
  templateUrl: './car-insurance.component.html',
  styleUrls: ['./car-insurance.component.css']
})
export class CarInsuranceComponent implements OnInit {
  public brandList: string[] = [];
  public modelList: string[] = [];
  public variantList: string[] = [];
  public selectedBrand: string = '';
  public selectedModel: string = '';
  selectedVariant: string = '';
  fuelType: string = '';
  public year: number = 0;
  car: Car = new Car();
  sharedItem: SharedItem = new SharedItem();
  private toInsuranceData: any = {
    vehicleType: 'Car',
    modelId: 0,
    vehicleNumber: ''
  };
  modelId: number = 0;
  constructor(private service: CarService, private router: Router, private sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.service.getBrandList().then((data) => {
      this.brandList = data;
      //this.logindetails = this.sharedService.getLoginDetails();
      // if (this.logindetails.isLogged) {
      //   this.loginoutBtn = "Logout";
      // }
      // else {
      //   this.loginoutBtn = "Login";
      // }
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
  footerscroll() {
    window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
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
  getModel(val: any): void {
    this.service.getModelFromBrand(this.selectedBrand).then((data) => {
      this.modelList = data;
    });
  }
  getVariant(val: any): void {
    this.service.getCarVariantFromBrandModel(this.selectedBrand, this.selectedModel).then((data) => {
      this.variantList = data;
    });
  }
  save() {
    this.car.model = this.selectedModel;
    console.log(this.car.model);
    this.car.brand = this.selectedBrand;
    this.car.variant = this.selectedVariant;
    this.car.fuel = this.fuelType;
    this.car.year = 2018;

    this.service.getCarId(this.car).subscribe((data) => {
      this.modelId = data;
      this.toInsuranceData.modelId = this.modelId;
      this.sharedItem.src = "Carinsurance";
      this.sharedItem.data = this.toInsuranceData;
      this.sharedService.setSharedData("Insurance", this.sharedItem);
      console.log(this.toInsuranceData);
      this.router.navigate(['insurance']);
    });
  }
  click: boolean = false;
  onButtonClick(event: MouseEvent) {
    (event.target as HTMLButtonElement).disabled = true;
  }
}
