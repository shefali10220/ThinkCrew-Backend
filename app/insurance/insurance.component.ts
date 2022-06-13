import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDetails } from 'src/Login-details.model';
import { SharedItem } from 'src/shared-item.model';
import { InsurancePlans } from '../InsurancePlans.model';
import { InsuranceService } from '../service/insurance.service';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {
  plan: string = '';
  model: string = '';
  year: number = 0;
  vehicleType: string = '';
  modelId: number = 6;
  insurancePlans: InsurancePlans = new InsurancePlans();
  vDetails: any;

  toPersonalDetails: any = {
    insuranceType: '',
    plan: '',
    VehicleNumber: 0,
    vehicleType: '',
    modelId: 0,
    fee: 0
  };
  private sharedItem: SharedItem = new SharedItem();
  public loginoutBtn: string = "Login";
  public logindetails: LoginDetails = new LoginDetails;

  constructor(private router: Router, private service: InsuranceService, private sharedService: SharedService) {
    this.vDetails = sharedService.getSharedData("Insurance");
    console.log(this.vDetails.src);
    this.toPersonalDetails.modelId = this.vDetails.data.modelId;
    this.toPersonalDetails.vehicleType = this.vDetails.data.vehicleType;
    this.toPersonalDetails.VehicleNumber = this.vDetails.data.vehicleNumber;
  }

  ngOnInit(): void {
    this.service.getInsurancePlans(this.vDetails.data.vehicleType, this.vDetails.data.modelId).then((data) => {
      this.insurancePlans = data;
     // this.logindetails = this.sharedService.getLoginDetails();
      // if (this.logindetails.isLogged) {
      //   this.loginoutBtn = "Logout";
      // }
      // else {
      //   this.loginoutBtn = "Login";
      // }
    });
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

  buy() {
    console.log(this.plan);
    if (this.plan == "third 3 year") {
      this.toPersonalDetails.plan = "3 Year";
      this.toPersonalDetails.insuranceType = "Third Party";
      this.toPersonalDetails.fee = this.insurancePlans.thirdYear3;
    }
    if (this.plan == "third 2 year") {
      this.toPersonalDetails.plan = "2 Year";
      this.toPersonalDetails.insuranceType = "Third Party";
      this.toPersonalDetails.fee = this.insurancePlans.thirdYear2;
    }
    if (this.plan == "third 1 year") {
      this.toPersonalDetails.plan = "1 Year";
      this.toPersonalDetails.insuranceType = "Third Party";
      this.toPersonalDetails.fee = this.insurancePlans.thirdYear1;
    }
    if (this.plan == "compre 3 year") {
      this.toPersonalDetails.plan = "3 Year";
      this.toPersonalDetails.insuranceType = "Comprehensive";
      this.toPersonalDetails.fee = this.insurancePlans.compreYear3;
    }
    if (this.plan == "compre 2 year") {
      this.toPersonalDetails.plan = "2 Year";
      this.toPersonalDetails.insuranceType = "Comprehensive";
      this.toPersonalDetails.fee = this.insurancePlans.compreYear2;
    }
    if (this.plan == "compre 1 year") {
      this.toPersonalDetails.plan = "1 Year";
      this.toPersonalDetails.insuranceType = "Comprehensive"
      this.toPersonalDetails.fee = this.insurancePlans.compreYear1;
    }
    this.sharedItem.src = "insurance";
    this.sharedItem.data = this.toPersonalDetails;
    console.log(this.sharedItem.data);
    this.sharedService.setSharedData("PersonalDetails", this.sharedItem);
    this.router.navigate(['personaldetails']);
  }

}