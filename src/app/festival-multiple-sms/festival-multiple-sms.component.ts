import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from './../global-service.service';
import { ToasterService } from '../toastr-service.service';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';


@Component({
  selector: 'app-festival-multiple-sms',
  standalone: false,
  templateUrl: './festival-multiple-sms.component.html',
  styleUrls: ['./festival-multiple-sms.component.scss']
})
export class FestivalMultipleSmsComponent implements OnInit {
  description1:any;
  description2:any;
  description3:any;
  description4:any;
  description5:any;
  loginUserData: any;
  SMS_Service: any;
  feedrespdata:any;
  constructor(private globalservice:GlobalServiceService, private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService, private toasterService: ToasterService) 
  { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
  }


  PostFeedback(){
    //this.SMS_Service =  "commansend_sms/";
    this.SMS_Service =  "commansend_sms5/";
    // this.spinner.hide();
  if (this.description1 ==undefined) {
    this.toasterService.warning ('please fill details');
  } else {
    this.spinner.show();
    this.globalservice.getDatawithMethodParams5(this.SMS_Service,this.description1,this.description2,this.description3,this.description4,this.description5).subscribe((data) => {
     this.feedrespdata = data;

     console.log("5Values",this.feedrespdata);
     this.spinner.hide();
      this.toasterService.success ('Your feedback has been submitted successfully');
     this.description1= undefined;
     this.description2= undefined;
     this.description3= undefined;
     this.description4= undefined;
     this.description5= undefined;
      },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      });
  
    }
  
  }

}
