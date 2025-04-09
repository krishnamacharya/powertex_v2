import { Component, OnInit, Input } from '@angular/core';
import { GlobalServiceService } from "../../global-service.service";
import { Router } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
import { ToasterService } from '../../toastr-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
@Component({
  selector: 'app-reject-users',
  standalone: false,
  templateUrl: './reject-users.component.html',
  styleUrls: ['./reject-users.component.scss']
})
export class RejectUsersComponent implements OnInit {
  internalRejectUsersList: any = [];
  p: any = 1;
  @Input() id: any;
  input_id: number;
  searchText: any;
  loginUserData: any;
  assign:any={}

  constructor(private toaster:ToasterService,private globalServicce: GlobalServiceService, private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    if (this.id == 1) {
      this.input_id = 3.5;
    } else {
      this.input_id = 3.6;
    }

    this.getRejectUsers();
  };
  getrejectusers:any
  getRejectUsers() {
    this.spinner.show();
    this.globalServicce.getDatawithQueryParams1nd4(this.input_id, 'R', this.loginUserData.company_code).subscribe((data) => {
      this.getrejectusers=data
      this.spinner.hide();
      if (this.getrejectusers.length > 0) {
        this.internalRejectUsersList = data;
      } else {
        this.internalRejectUsersList = [];
      }
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        // console.log(error);
      });
  };
  fromdealer_id:any
  viewMore(data) {
    this.fromdealer_id=data.user_id
    $('#editApproveModal').modal('show');
    this.getRegisterdUsers()
  }
  activeList: any = []
  getregusers:any
  getRegisterdUsers() {


    this.globalServicce.getDatawithQueryParams1nd4(3.5, 'A', this.loginUserData.company_code).subscribe((data) => {
      this.getregusers=data
      this.spinner.hide();
      if ( this.getregusers.length > 0)
        this.activeList = data;
      else {
        //alert('No data');
      }
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      });
  };
  keypress(event: any) {
    const pattern = /^[A-Za-z0-9' '.&,]+$/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
 

  methodname: any
  assigned: any
  body: any
  assigntodealer() {
   
    this.methodname = "telecom/messaging/";
    if(this.assign.dealer && this.assign.msg){
    this.body = { "fromid": this.loginUserData.user_id, "todealer":this.assign.dealer, "fromdealer":this.fromdealer_id, "msgs":this.assign.msg}
    this.globalServicce.postData(this.body, this.methodname).subscribe((data) => {
      this.assigned = data
      this.assign={}
      $('#editApproveModal').modal('hide');
      $('#succModal').modal('show');
      console.log(this.assigned, "response")
      this.getRejectUsers();
    })
  }
  else{
this.toaster.error('Please Fill All Fields')
  }
  }

}
