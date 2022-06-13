import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDetails } from 'src/Login-details.model';
import { UserLogin } from 'src/UserLogin.model';
import { SharedService } from '../service/shared.service';
import { UserloginService } from '../userlogin.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})

export class OtpComponent implements OnInit {
  userLogin!: UserLogin;
  public email: string = '';
  public mobile: string = '';
  public password: string = '';
  public enteredOtp: number = 0;
  public vOTP: number = 0;
  public vsource: string = '';
  public uid: number = 0;

  loginDetails: LoginDetails = new LoginDetails();

  constructor(private userLoginService: UserloginService, private router: Router, private sharedService: SharedService) {
    this.vOTP = this.sharedService.getSharedData("OTP").data.otp;
    this.vsource = this.sharedService.getSharedData("OTP").src;
    this.uid = this.sharedService.getSharedData("OTP").data.id;
  }

  ngOnInit(): void {
    let loginDetail: LoginDetails = this.sharedService.getLoginDetails();
    if (loginDetail.isLogged) {
      if (loginDetail.userType == "Admin") {
        this.router.navigate(['admin']);
      } else {
        this.router.navigate(['user']);
      }
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

  otpVerification() {
    console.log("Success");
    if (this.enteredOtp == this.vOTP) {
      console.log("Success");
      if (this.vsource == "AdminLogin") {
        this.loginDetails.isLogged = true;
        this.loginDetails.userType = "Admin";
        this.loginDetails.userID = this.uid;
        this.sharedService.setLoginDetails(this.loginDetails);
        this.router.navigate(['admin']);
      } else {
        this.loginDetails.isLogged = true;
        this.loginDetails.userType = "User";
        this.loginDetails.userID = this.uid;
        this.sharedService.setLoginDetails(this.loginDetails);
        this.router.navigate(['user']);
      }
      alert('Login Successful');
      console.log("Success");
    }
    else {
      alert("Wrong otp");
    }
  }

  onButtonClick(event: MouseEvent) {
    (event.target as HTMLButtonElement).disabled = true;
  }
  
}