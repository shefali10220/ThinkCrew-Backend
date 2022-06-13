import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDetails } from 'src/Login-details.model';
import { Otp } from 'src/otp.model';
import { SharedItem } from 'src/shared-item.model';
import { UserLogin } from 'src/UserLogin.model';
import { SharedService } from '../service/shared.service';
import { UserloginService } from '../userlogin.service';


@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  userLogin: UserLogin = new UserLogin();

  public otpdata: any;
  public Votp: Otp = new Otp();
  public email: string = '';
  public mobile: string = '';
  public enteredOtp: number = 0;
  public sharedItem: SharedItem = new SharedItem();
  public getotp: boolean = false;
  inputCred: string = '';
  password: string = '';
  toOtp= {
    otp:'',
    status:'',
    email:'',
    mobile:'',
    userType:'',
    password:'',
    id:0
  }

  constructor(private userLoginService: UserloginService, private router: Router, private sharedService: SharedService) { }

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
  footerscroll() {
    window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
  }
  home() {
    this.router.navigate(['']);
  }
  help() {
    this.router.navigate(['helpsupport']);
  }
  clickOnGetOTP() {
    console.log(this.inputCred);
    let mailMatch: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
    let phoneMatch: string = '[0-9]{10}';
    if (this.inputCred.match(mailMatch)) {
      this.userLogin.emailId = this.inputCred;
      this.userLogin.password=this.password;
      this.callOtp();
    }
    else if (this.inputCred.match(phoneMatch)) {
      this.userLogin.mobileNo = this.inputCred;
      this.userLogin.password=this.password;
      this.callOtp();
    }
    else {
      alert("Invalid login Credentials.")
    }
  }

  callOtp() {
    this.userLogin.userType = "Admin";
    this.userLoginService.getOtp(this.userLogin).then((data) => {
      this.otpdata = data;
      this.sharedItem.src = "AdminLogin";
      this.toOtp.otp=this.otpdata.otp;
      this.toOtp.status=this.otpdata.status;
      this.toOtp.id=this.otpdata.id;
      this.toOtp.userType="User";
      this.toOtp.email=this.userLogin.emailId;
      this.toOtp.mobile=this.userLogin.mobileNo;
      this.toOtp.password = this.userLogin.password;
      this.sharedItem.data = this.toOtp;

      this.sharedService.setSharedData("OTP", this.sharedItem);
      this.Votp.actualotp = this.otpdata.otp;
      this.Votp.status = this.otpdata.status;
      console.log("Success");
      console.log(this.Votp.actualotp);

      if (this.Votp.status === "OTP IS SENT") {
        this.getotp = true;
        this.router.navigate(['/otp']);
      }
      else {
        alert(this.Votp.status)
      }
    }
    );
  }

}
