import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetUrl } from 'src/getUrl.model';
import { Insurance } from 'src/insurance.model';
import { LoginDetails } from 'src/Login-details.model';
import { User } from 'src/user.model';
import { InsuranceService } from '../service/insurance.service';
import { SharedService } from '../service/shared.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})

export class NotifyComponent implements OnInit {
  public downloadurl: GetUrl = new GetUrl();
  public logindetails:LoginDetails = new LoginDetails();
  details: any;
  userid: number = 0;
  policyid: number = 0;
  user: User = new User();
  insurance: Insurance = new Insurance();
  constructor(private sharedService: SharedService, private router: Router, private service: UserService, private services: InsuranceService) {
    this.details = sharedService.getSharedData("notify");
    this.user.fname = this.details.data.fname;
    this.user.mname = this.details.data.mname;
    this.user.lname = this.details.data.lname;
    this.user.mobileNo = this.details.data.mobileNo;
    this.user.gmail = this.details.data.gmail;
    this.user.photoId = this.details.data.photoId;
    this.user.photoIdType = this.details.data.photoIdType;
    this.insurance.startDate = this.details.data.startDate;
    this.insurance.endDate = this.details.data.endDate;
    this.insurance.type = this.details.data.insuranceType;
    this.insurance.plan = this.details.data.plan;
    this.insurance.fee = this.details.data.fee;
    this.insurance.vehicleType = this.details.data.vehicleType;
    this.insurance.vehicle_no = this.details.data.VehicleNumber;  
  }

  public loginoutBtn: string = "Login";
  ngOnInit(): void {
    // this.logindetails = this.sharedService.getLoginDetails();
    // if (this.logindetails.isLogged) {
    //   this.loginoutBtn = "Logout";
    //   this.insurance.userId = this.logindetails.userID;
    //   this.services.addInsurance(this.insurance).subscribe((data) => {
    //     this.policyid = data;
    //     this.services.sendWelcomeEmail(this.logindetails.userID, this.policyid);
    //   });  
    // }
    // else {
    //   this.loginoutBtn = "Logout";
    //   this.service.addUser(this.user).subscribe((data) => {
    //     this.userid = data;
    //     this.insurance.userId = this.userid;
    //     this.login(this.userid);
    //     console.log(this.insurance);
    //     this.services.addInsurance(this.insurance).subscribe((data) => {
    //       this.policyid = data;
    //       this.services.sendWelcomeEmail(this.userid, this.policyid);
    //     });  
    //   });
    // }    
  }

  login(uid:number){
    this.logindetails.isLogged = true;
    this.logindetails.userID = uid;
    this.logindetails.userType = "User";
    this.sharedService.setLoginDetails(this.logindetails);
  }

  public downloadlinkurl(): void {
    this.services.getDownloadUrl('' + this.policyid).then((data) => {
      this.downloadurl = data;
      console.log("URL : " + this.downloadurl.url);
      window.open(this.downloadurl.url, '_blank');

    });
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

  footerscroll() {
    window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
  }
}