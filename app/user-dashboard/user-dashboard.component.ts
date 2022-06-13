import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Insurance } from 'src/insurance.model';
import { InsuranceService } from '../service/insurance.service';
import { PersonalDetails } from 'src/PersonalDetails.model';
import { GetUrl } from "src/getUrl.model";
import { SharedItem } from 'src/shared-item.model';
import { SharedService } from '../service/shared.service';
import { LoginDetails } from 'src/Login-details.model';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})

export class UserDashboardComponent implements OnInit {
  public userId: number = 0;
  public userDetail: PersonalDetails = new PersonalDetails();
  public InsuranceList: Insurance[] = [];
  public downloadurl: GetUrl = new GetUrl();
  private sharedItem: SharedItem = new SharedItem();
  loginDetails: LoginDetails = new LoginDetails();

  constructor(private router: Router, private service: InsuranceService, private sharedService: SharedService) { }

  ngOnInit(): void {
    let loginDetail: LoginDetails = this.sharedService.getLoginDetails();
    if (loginDetail.isLogged) {
      if (loginDetail.userType == "Admin") {
        this.router.navigate(['admin']);
      }
    }
    else {
      this.router.navigate(['login']);
    }
    this.service.getInsuranceDetail(loginDetail.userID).then((data) => { this.InsuranceList = data; });
    this.service.getUserDetail(loginDetail.userID).then((data) => { this.userDetail = data });
  }

  logout() {
    var answer: boolean = confirm("Are you sure you want to logout?");
    if (answer) {
      this.loginDetails.isLogged = false;
      this.loginDetails.userType = "";
      this.loginDetails.userID = 0;
      this.sharedService.setLoginDetails(this.loginDetails);
      this.router.navigate(['']);
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

  public downloadlinkurl(id: number): void {
    this.service.getDownloadUrl('' + id).then((data) => {
      this.downloadurl = data;
      console.log("URL : " + this.downloadurl.url);
      window.open(this.downloadurl.url, '_blank');

    });
  }

  viewUserInsurance(id: number) {
    this.service.getInsuranceDetail(id).then((data) => {
      this.sharedItem.src = "UserDashboard";
      this.sharedItem.data = +id;
      this.sharedService.setSharedData("UserDetail", this.sharedItem);
      this.router.navigate(['viewinsurance']);
    });
  }
}