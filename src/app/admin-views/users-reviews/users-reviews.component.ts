import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GlobalServiceService } from '../../global-service.service';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-users-reviews',
  standalone: false,
  templateUrl: './users-reviews.component.html',
  styleUrls: ['./users-reviews.component.scss']
})
export class UsersReviewsComponent implements OnInit {
p: any;
check_status1(arg0: any): any {
throw new Error('Method not implemented.');
}
panelOpenState:any;
orders: any[];
searchText: string;
editInfo(_t41: any) {
throw new Error('Method not implemented.');
}
reject(_t41: any) {
throw new Error('Method not implemented.');
}
viewInfo(_t41: any) {
throw new Error('Method not implemented.');
}
  loginUserData: any;
  token: any;
  All_Rev:boolean=true;
  Approve_Rev:boolean=false;
  Rejected_Rev:boolean=false;
  reviews: any;
regList: any;

  constructor(private service:GlobalServiceService,private dialog: MatDialog,private route: Router) { }
  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    console.log(this.loginUserData);
    if(this.loginUserData===null){
      this.route.navigateByUrl('home');
    }
    this.get_A_rev();
  }
  
  get_A_rev() {
    let param1="";
    let permission=0;
    return this.service.getDatawithQueryParams2('8.0',param1,permission ).subscribe((resp) => {
    console.log(resp);

    this.reviews = resp;
     console.log("rev", this.reviews);
  },
   error => { 
      //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      // console.log(error);
    });
    
  }
  A_Rev(){
    console.log("--");
  }
  Apr_Rev(){
    console.log("--");
  }

  Rej_Rev(){
    console.log("--");
  }
}
