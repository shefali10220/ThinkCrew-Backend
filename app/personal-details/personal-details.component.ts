import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDetails } from 'src/Login-details.model';
import { SharedItem } from 'src/shared-item.model';
import { User } from 'src/user.model';
import { SharedService } from '../service/shared.service';
import { UserService } from '../service/user.service';
import { InsuranceService } from '../service/insurance.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})

export class PersonalDetailsComponent implements OnInit {
  selectedDate: string = '';
  date: number = 0;
  bore: number = 0;
  private sharedItem: SharedItem = new SharedItem();
  user: User = new User();
  user2: User = new User();
  Insurance: any;
  toNotify: any = {
    insuranceType: '',
    plan: '',
    VehicleNumber: 0,
    vehicleType: '',
    modelId: 0,
    fee: 0,
    fname: '',
    lname: '',
    mname: '',
    mobileNo: '',
    gmail: '',
    startDate: '',
    photoId: '',
    photoIdType: '',
    endDate: ''
  }
  vehicleNumber: string;
  constructor(private router: Router, private service: UserService, private sharedService: SharedService, private insuranceService: InsuranceService) {
    this.Insurance = sharedService.getSharedData("PersonalDetails");
    this.toNotify.modelId = this.Insurance.data.modelId;
    this.toNotify.vehicleType = this.Insurance.data.vehicleType;
    this.toNotify.VehicleNumber = this.Insurance.data.VehicleNumber;
    this.toNotify.plan = this.Insurance.data.plan;
    this.toNotify.fee = this.Insurance.data.fee;
    this.toNotify.insuranceType = this.Insurance.data.insuranceType;
    this.vehicleNumber = this.Insurance.data.VehicleNumber;
    console.log(this.Insurance.data);
  }

  ngOnInit(): void {
    // this.logindetails = this.sharedService.getLoginDetails();
    // if (this.logindetails.isLogged) {
    //   this.loginoutBtn = "Logout";
    //   this.fetchUserDetails(this.logindetails.userID);
    // }
    // else {
    //   this.loginoutBtn = "Login";
    // }
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

  save() {

    this.toNotify.fname = this.user.fname;
    this.toNotify.lname = this.user.lname
    this.toNotify.mobileNo = this.user.mobileNo;
    this.toNotify.gmail = this.user.gmail;
    this.toNotify.photoId = this.user.photoId;
    this.toNotify.photoIdType = this.user.photoIdType;
    this.toNotify.VehicleNumber = this.vehicleNumber;
    this.toNotify.startDate = this.selectedDate;

    let datesPartList = this.selectedDate.split("-");
    var year = +datesPartList[0];
    if (this.Insurance.data.plan == "3 Year") {
      year = 3 + year;
    } else if (this.Insurance.data.plan == "2 Year") {
      year = 2 + year;
    } else if (this.Insurance.data.plan == "1 Year") {
      year = 1 + year;
    }
    this.toNotify.endDate = year + '-' + datesPartList[1] + '-' + datesPartList[2];

    this.sharedItem.src = "personalDetails";
    this.sharedItem.data = this.toNotify;

    console.log(this.sharedItem.data);
    this.sharedService.setSharedData("verify", this.sharedItem);

    this.sharedService.setSharedData("notify", this.sharedItem);

    if (this.logindetails.isLogged) {
      this.router.navigate(['payment']);
    } else {
      //this.router.navigate(['verify']);
      this.router.navigate(['payment']);
    }
  }

  fetchUserDetails(uid: number) {
    this.insuranceService.getUserDetail(uid).then((data) => { this.user2 = data });
  }
}


