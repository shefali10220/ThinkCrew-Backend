import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDetails } from 'src/Login-details.model';
import { InsuranceService } from '../service/insurance.service';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.css']
})
export class PaymentGatewayComponent implements OnInit {

  constructor(private router: Router, private service: InsuranceService, private sharedService: SharedService) { }
  public loginoutBtn: string = "Login";
  public logindetails: LoginDetails = new LoginDetails;
  ngOnInit(): void {
    // this.logindetails = this.sharedService.getLoginDetails();
    // if (this.logindetails.isLogged) {
    //   this.loginoutBtn = "Logout";
    // }
    // else {
    //   this.loginoutBtn = "Login";
    // }
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

  save() {
    this.router.navigate(['buffer'])
    //this.router.navigate(['']);
  }
}
