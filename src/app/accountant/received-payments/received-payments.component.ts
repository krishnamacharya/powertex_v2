import { Component, OnInit } from '@angular/core';
import {GlobalServiceService} from '../../global-service.service'
import { DataServiceService } from '../../data-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { ToasterService } from '../../toastr-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';

declare var $: any;
@Component({
  selector: 'app-received-payments',
  standalone: false,
  templateUrl: './received-payments.component.html',
  styleUrls: ['./received-payments.component.scss']
})
export class ReceivedPaymentsComponent implements OnInit {
  loginUserData:any
  page:any=1
  page1:any=1
  panelOpenState:any;
  fromdate:any
  tilldate:any
  discountdetails:any=[]
  POhidden: boolean = true;

  DOhidden: boolean = false;
searchText: string;
  constructor(private DatePipe: DatePipe,private service:DataServiceService,private globalservice:GlobalServiceService,private dialog: MatDialog,private spinner:NgxSpinnerService,private toasterService: ToasterService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.invoice()
  }
  do() {
   
    this.POhidden = false;
    this.DOhidden = true;
   this.discounts()
  }
  po() {
    
    this.POhidden = true;
    this.DOhidden = false;
    this.invoice()
  }
  outstandingdetails:any=[]
  

  invoice(){
   this.spinner.show()
    
    this.globalservice.getDataOnlyWithMethod("paymentreceved").subscribe((resp) => {
   
      this.outstandingdetails=resp;
      this.spinner.hide()
      
    
    
    },
    error => {    
      this.spinner.hide()
      this.dialog.open(ErrorModalComponent, {
        data: { errorModal:true }
      });
      // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      
    }
    )
  }
  discounts(){
    this.spinner.show()
     
     this.globalservice.getDataOnlyWithMethod("market/discountbysuper").subscribe((resp) => {
    
       this.discountdetails=resp;
       this.spinner.hide()
       
     
     
     },
     error => {    
       this.spinner.hide()
       this.dialog.open(ErrorModalComponent, {
        data: { errorModal:true }
      });
      //  //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
       
     }
     )
   }

  getreceived(){
   if(!this.fromdate){
    this.toasterService.warning("Select From Date");
    return false;
  }
  if(!this.tilldate){
    this.toasterService.warning("Select To Date");
    return false;
  }
    this.spinner.show()
    
    this.fromdate = this.DatePipe.transform(this.fromdate, "yyyy-MM-dd");
    this.tilldate = this.DatePipe.transform(this.tilldate, "yyyy-MM-dd");
    this.globalservice.getDatawithMethodParams2("paymentreceved/",this.tilldate,this.fromdate).subscribe((resp) => {
   
      this.outstandingdetails=resp;
      this.spinner.hide()
      if (this.outstandingdetails.length < 1) {
        $("#WarningModal").modal('show');
        }
    
    },
    error => {    
      this.spinner.hide()
      this.dialog.open(ErrorModalComponent, {
        data: { errorModal:true }
      });
      // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      
    }
    )
  }

  body:any
 deletepayment(sd){
   
   this.body={"transID":sd.transid}
  this.globalservice.getDatawithdelete("cheque/",sd.transid).subscribe((resp) => {
    $("#success").modal('show');
  },
  error => {    
    this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
    // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
    
  }
  )
 }
 refresh(){
   if(this.fromdate){
this.getreceived()
   }
   else{
    this.invoice()
   }
 
 }
 
}
