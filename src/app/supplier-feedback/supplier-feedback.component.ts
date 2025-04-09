import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from './../global-service.service';
import { ToasterService } from '../toastr-service.service';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-supplier-feedback',
  standalone: false,
  templateUrl: './supplier-feedback.component.html',
  styleUrls: ['./supplier-feedback.component.scss']
})
export class SupplierFeedbackComponent implements OnInit {
title: any;
comment: any;
description:any;
feedbackdata = {}
feedbackmethod: any;
feedrespdata:any;
subject:any;
supplierid:any;

  orders: any = [];
  p: any = 1;
  searchText: any;
  loginUserData: any;
  totalpaid: any;
  totalinvoice: any;
  details1: any;
  details: any;
  constructor(private globalservice:GlobalServiceService, private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService, private toasterService: ToasterService) { }


  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.feedbacktable();
  }
  //Get data
  feedbacktable(){
    this.spinner.show()
     this.globalservice.getcheckdata("sup/feedback1/",this.loginUserData.user_id).subscribe((data) => {
       this.details1 = data;
       this.details = this.details1.filter((a) => { return a.supplierid == this.loginUserData.user_id})
       console.log(data,'data')
       console.log(this.details,'this.details')
        this.spinner.hide()
     },
     error => {    
       this.spinner.hide()
     
       this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
       
     }
     )
   }
   

// =============================
PostFeedback(title,description){
  this.feedbackdata={'supplierid':this.loginUserData.user_id, 'business_name':this.loginUserData.business_name, 'subject':title?title:'', 'comment':description, 'returnby':0, 'date':new Date(), 'isnew':1 };
  this.feedbackmethod =  "sup/feedback1/";
  // this.spinner.hide();
if (title==undefined && description ==undefined) {
  this.toasterService.warning ('please fill details');
} else {
  this.spinner.show();
  this.globalservice.postData(this.feedbackdata,this.feedbackmethod).subscribe((data) => {
   this.feedrespdata = data;
   this.spinner.hide();
   //  $("#successModal").modal('show');
    this.feedbacktable();
    this.toasterService.success ('Your feedback has been submitted successfully');
   this.feedbackdata = '';
   this.title= undefined;
   this.description= undefined;
    },
    error => {
      this.spinner.hide();
      this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
    });


  }

}
}
