import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from './../global-service.service';
import { ToasterService } from '../toastr-service.service';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-monthly-sms',
  standalone: false,
  templateUrl: './monthly-sms.component.html',
  styleUrls: ['./monthly-sms.component.scss']
})
export class MonthlySMSComponent implements OnInit {
 // description:any;
  loginUserData: any;
  SMS_Service: any;
  feedrespdata:any;
  constructor(private globalservice:GlobalServiceService, private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService, private toasterService: ToasterService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
  }


  PostFeedback(){
    this.spinner.show();
    this.globalservice.getDatawithMethod1("commansend_sms6/").subscribe((data) => {
   // this.globalservice.getDatawithMethod1(this.SMS_Service).subscribe((data) => {
     this.feedrespdata = data;
     this.spinner.hide();
      this.toasterService.success ('Your feedback has been submitted successfully');
      },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      });
  
    }
  
  }

