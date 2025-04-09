import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../../global-service.service';

@Component({
  selector: 'app-pending-dealers',
  standalone: false,
  templateUrl: './pending-dealers.component.html',
  styleUrls: ['./pending-dealers.component.scss']
})
export class PendingDealersComponent implements OnInit {
page:any=1
loginUserData:any
  constructor(private globalService:GlobalServiceService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getdata()
    
  }
 methodname:any
 response:any
  getdata() {
   
     this.methodname = "telecom/unassigned_dealer";
     this.globalService.getDataOnlyWithMethod(this.methodname).subscribe((data) => {
       this.response = data
        console.log(this.response,"response")
     })
   
   }
  
}
