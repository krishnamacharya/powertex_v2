import { Component, OnInit } from '@angular/core';
import {GlobalServiceService} from '../../global-service.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
@Component({
  selector: 'app-outstanding-clearance-payment',
  standalone: false,
  templateUrl: './outstanding-clearance-payment.component.html',
  styleUrls: ['./outstanding-clearance-payment.component.scss']
})
export class OutstandingClearancePaymentComponent implements OnInit {
  loginUserData:any
  page:any=1
  
  discountdetails:any=[]
searchText: string;
  constructor(private globalservice:GlobalServiceService,private dialog: MatDialog,private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.discounts()
  }
  discounts(){
    this.spinner.show()
     this.globalservice.getDataOnlyWithMethod("market/discountbysuper").subscribe((resp) => {
       this.discountdetails=resp;
       this.spinner.hide()
     },
     error => {    
       this.spinner.hide()
     
       //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
       
     }
     )
   }
}
