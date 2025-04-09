import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../global-service.service';
import { ToasterService } from '../toastr-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-whatsapp-notification',
  standalone: false,
  
  templateUrl: './whatsapp-notification.component.html',
  styleUrl: './whatsapp-notification.component.scss'
})
export class WhatsappNotificationComponent  implements OnInit {
  loginUserData:any
  page:any=1 
  body = {};
  method: any;
  message:any;
  constructor(private globalservice:GlobalServiceService,public dialog: MatDialog, private toasterService: ToasterService,private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
  }

  Sendsupplier(message){
  if(!message){
    this.toasterService.warning ('Fill input fields');
    return false;
  }
  this.body={'param_other1': message };
  this.method =  "sup/newarival/";
  this.spinner.show();
  this.globalservice.postData(this.body,this.method).subscribe((data) => {

    this.spinner.hide();
    this.toasterService.success ('Your Message has been sent...');
    this.message='';
},
 error => {
           this.spinner.hide();
           this.dialog.open(ErrorModalComponent, {
             data: { errorModal:true }
           });
           // this.ngxSmartService.getModal('errorModal').open();
     
         });
         return true;
 }

}
