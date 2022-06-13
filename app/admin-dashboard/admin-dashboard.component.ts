import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalDetails } from 'src/PersonalDetails.model';
import { AdminPanelDetails } from "src/admin-dashboard.model";
import { AdminService } from '../service/admin.service';
import { Insurance } from "src/insurance.model";
import { LoginDetails } from 'src/Login-details.model';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  public usersList : PersonalDetails[]=[];
  public editUser: PersonalDetails=new PersonalDetails;
  public insuranceList : Insurance[]=[];
  public panelDetails :AdminPanelDetails= new AdminPanelDetails();
  loginDetails: LoginDetails=new LoginDetails();
  constructor(private router:Router,private service : AdminService,private sharedService:SharedService) { }

   ngOnInit() {
    let loginDetail: LoginDetails = this.sharedService.getLoginDetails();
    if(loginDetail.isLogged){
      if(loginDetail.userType=="User"){
        this.router.navigate(['user']);
      }
    }
    else{
      this.router.navigate(['adminlogin']);
    }
     this.service.getUsersList().then((data) => { this.usersList= data;});
     this.service.getAllInsuranceDetails().then((data) => { this.insuranceList= data;});
     this.service.getAdminPanelDetails().then((data)=>{this.panelDetails = data});
   }
   logout(){
    var answer: boolean=confirm("Are you sure you want to logout?");
    if(answer){
      this.loginDetails.isLogged=false;
      this.loginDetails.userType="";
      this.loginDetails.userID=0;
      this.sharedService.setLoginDetails(this.loginDetails);
      this.router.navigate(['']);
    }
    
  }
  footerscroll(){
    window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
  }
  home(){
    this.router.navigate(['']);
  }
  help(){
    this.router.navigate(['helpsupport']);
  }
   public searchUser(key: string): void {
    console.log(key);
    const results: PersonalDetails[] = [];
    for (const searchUser of this.usersList) {
      if (searchUser.fname.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || searchUser.mname.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || searchUser.lname.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || searchUser.gmail.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || searchUser.mobileNo.toLowerCase().indexOf(key.toLowerCase()) !== -1)
       {
        results.push(searchUser);
      }
    }
    this.usersList = results;
    if (results.length === 0 || !key) {
      this.service.getUsersList().then((data) => { this.usersList= data;});
      console.log("invalid")
    }
  }

  public onDeleteUser(idToDelete: string): void {
    this.service.deleteUser(idToDelete).subscribe(
      (response: void) => {
        console.log(response);
        this.service.getUsersList().then((data) => { this.usersList= data;});
      }
    );
  }
}
