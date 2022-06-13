import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/service/vehicle.service'
import { SharedService } from '../service/shared.service';
import { SharedItem } from 'src/shared-item.model';
import { LoginDetails } from 'src/Login-details.model';

@Component({
  selector: 'app-get-quote',
  templateUrl: './get-quote.component.html',
  styleUrls: ['./get-quote.component.css']
})
export class GetQuoteComponent implements OnInit {
  displayConfirmBox = false;
  DisplayDialogBox = false;
  public vehicleNumber: string = '';
  private vehicle: any;
  private toInsuranceData: any = {
    vehicleType: '',
    modelId: 0,
    vehicleNumber: ''
  };
  private sharedItem: SharedItem = new SharedItem();
  public loginoutBtn: string = "Login";
  public logindetails: LoginDetails = new LoginDetails;
  constructor(private router: Router,
    private service: VehicleService,
    private sharedService: SharedService) {

  }
  ngOnInit(): void {
    // this.logindetails = this.sharedService.getLoginDetails();
    // if (this.logindetails.isLogged) {
    //   this.loginoutBtn = "Logout";
    // }
    // else {
    //   this.loginoutBtn = "Login";
    // }
  }
  footerscroll() {
    window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
  }
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

  save() {
    this.service.getVehicleDetails(this.vehicleNumber).then((data) => {
      this.vehicle = data;
      console.log("hi");

      this.toInsuranceData.vehicleType = this.vehicle.vehicleType;
      this.toInsuranceData.modelId = this.vehicle.modelTypeId;
      this.toInsuranceData.vehicleNumber = this.vehicleNumber;

      this.sharedItem.src = "GetQuote";
      this.sharedItem.data = this.toInsuranceData;

      console.log(this.toInsuranceData);
      this.sharedService.setSharedData("Insurance", this.sharedItem);

      this.router.navigate(['insurance']);
    });
  }
  popUp() {
    this.displayConfirmBox = true;
    this.DisplayDialogBox = true;
  }
  cancel() {
    this.DisplayDialogBox = false;
    this.displayConfirmBox = false;
  }
  ClickCar() {
    this.router.navigate(['carinsurance']);
  }

  ClickBike() {
    this.router.navigate(['Bikeinsurance']);
  }
}