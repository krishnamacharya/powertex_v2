import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GlobalServiceService } from "../../global-service.service";
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
import { ViewMoreComponent } from '../view-more/view-more.component';
declare var $: any;

@Component({
  selector: 'app-internal-users-list',
  standalone: false,
  templateUrl: './internal-users-list.component.html',
  styleUrls: ['./internal-users-list.component.scss']
})
export class InternalUsersListComponent implements OnInit {
  internalUsersList: any = [];
  p: any = 1;
  rejectData: any = {};
  rejData: any;
  searchText: any;
  loginUserData: any;

  constructor(private globalServicce: GlobalServiceService, private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getRegisterdUsers();
  };
  registeredusers:any
  getRegisterdUsers() {
    this.spinner.show();
    this.globalServicce.getDatawithQueryParams4(3.6, 'A', '', 'Employee', this.loginUserData.company_code).subscribe((data) => {
      this.registeredusers=data
      this.spinner.hide();
      if (this.registeredusers.length > 0) {
        this.internalUsersList = data;
      } else {
        alert('No Data');
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

  editInfo(data) {
    localStorage.setItem('userProfile', JSON.stringify(data));
    this.route.navigateByUrl('/internal-user-edit');
  };

  reject(data) {
    this.rejData = data;
    $('#confirmModal').modal('show');
  };

  viewMore(data) {
    
    // this.ngxSmartService.resetModalData('viewmoreModal');
    // this.ngxSmartService.setModalData(data, 'viewmoreModal');
    // this.ngxSmartService.getModal('viewmoreModal').open();
    this.dialog.open(ViewMoreComponent, {
      data:data
    });
  };

  confirm() {
    // this.spinner.show();
    $('#confirmModal').modal('hide');
    this.rejectData.status = 'R';
    this.rejectData.passing_param = 2;
    this.rejectData.user_type = this.rejData.user_type;
    this.rejectData.user_id = this.rejData.user_id;
    var methodName = 'api/registration/';
    this.globalServicce.postData(this.rejectData, methodName).subscribe((data) => {
      // this.spinner.hide();
      if (data['Status'] == 'Update sucessfully') {
        alert(data['Status']);
        this.getRegisterdUsers();
      } else {
        alert('error');
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
  }

}
