import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDetails } from 'src/Login-details.model';
import { Otp } from 'src/otp.model';
import { SharedService } from '../service/shared.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  verify: any;
  verification: any = {
    gmail: '',
    mobileNo: ''
  };
  email: string;
  otpResponse: Otp = new Otp();
  otp: string = '';
  verifybutton: string = 'Send OTP';
  constructor(private router: Router, private service: UserService, private sharedService: SharedService) {
    this.verify = sharedService.getSharedData("verify");
    this.verification.gmail = this.verify.data.gmail;
    this.verification.mobileNo = this.verify.data.mobileNo;
    this.email = this.verify.data.gmail;
  }

  ngOnInit(): void {
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

  verifyEmail() {
    if (this.verifybutton == "Send OTP") {
      this.service.verifyEmail(this.email).then((data) => {
        this.otpResponse = data;
        if (this.otpResponse.status == "EMAIL IS ALREADY USED") {
          alert("Entered E-mail is already in use. Please Use different E-mail.");
        }
        else if (this.otpResponse.status == "OTP IS SENT") {
          alert("OTP sent");
          console.log(this.otpResponse.otp);
          this.verifybutton = "Verify OTP";
        }
        else {
          alert("OTP not sent. Please Retry")
        }
      });
    }
    if (this.verifybutton == "Verify OTP") {
      if (this.otpResponse.otp == this.otp) {
        this.router.navigate(['payment']);
      }
      else {
        alert('Wrong OTP');
      }
    }
  }
}
