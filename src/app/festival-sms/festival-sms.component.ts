import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from './../global-service.service';
import { ToasterService } from '../toastr-service.service';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';


@Component({
  selector: 'app-festival-sms',
  standalone: false,
  templateUrl: './festival-sms.component.html',
  styleUrls: ['./festival-sms.component.scss']
})
export class FestivalSmsComponent implements OnInit {
  description:any;
  loginUserData: any;
  SMS_Service: any;
  feedrespdata:any;
  constructor(private globalservice:GlobalServiceService, private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService, private toasterService: ToasterService) 
  { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
  }


  PostFeedback(description){
    
    this.SMS_Service =  "commansend_sms/";
    // this.spinner.hide();
  if (description ==undefined) {
    this.toasterService.warning ('please fill details');
  } else {
    this.spinner.show();
    this.globalservice.getDatawithMethodParams1(this.SMS_Service,this.description).subscribe((data) => {
     this.feedrespdata = data;
     this.spinner.hide();
      this.toasterService.success ('Your feedback has been submitted successfully');
     this.description= undefined;
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
