import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../service/shared.service';
import { SharedItem } from 'src/shared-item.model';
import { LoginDetails } from 'src/Login-details.model';

@Component({
  selector: 'app-helpsupport',
  templateUrl: './helpsupport.component.html',
  styleUrls: ['./helpsupport.component.css']
})
export class HelpsupportComponent implements OnInit {
  private sharedItem: SharedItem = new SharedItem();

  public loginoutBtn: string = "Login";
  public logindetails: LoginDetails = new LoginDetails;
  constructor(private router: Router,
    private sharedService: SharedService) {

  }

  ngOnInit(): void {
    this.logindetails = this.sharedService.getLoginDetails();
    if (this.logindetails.isLogged) {
      this.loginoutBtn = "Logout";
    }
    else {
      this.loginoutBtn = "Login";
    }
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
  footerscroll() {
    window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
  }
}
