import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewInsurance } from "src/view-insurance.model";
import { ViewInsuranceService } from "../service/view-insurance.service";
import { SharedItem } from 'src/shared-item.model';
import { SharedService } from '../service/shared.service';
import { InsuranceService } from '../service/insurance.service';
import { GetUrl } from 'src/getUrl.model';
import { LoginDetails } from 'src/Login-details.model';
@Component({
  selector: 'app-view-insurance',
  templateUrl: './view-insurance.component.html',
  styleUrls: ['./view-insurance.component.css']
})
export class ViewInsuranceComponent implements OnInit {
  Details:SharedItem;
  id:number=100;
  public viewInsuranceDetail : ViewInsurance= new ViewInsurance();
  public downloadurl : GetUrl = new GetUrl();
  constructor(private router:Router,private service : ViewInsuranceService,private sharedService : SharedService,private services : InsuranceService) { 
    this.Details = sharedService.getSharedData("UserDetail");
    console.log(this.Details.src);
    console.log(this.Details.data);
  }

  ngOnInit(): void {
    this.service.getViewInsuranceById(this.Details.data).then((data )=> { this.viewInsuranceDetail= data;
      console.log(this.viewInsuranceDetail);
    });  
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

  public downloadlinkurl(id:number):void{
    this.services.getDownloadUrl(''+id).then((data)=>{ 
      this.downloadurl = data;
      console.log("URL : "+this.downloadurl.url);
      window.open(this.downloadurl.url, '_blank');
      
    });
  }
 user(){
   this.router.navigate(['user']);
 }

}
