import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GlobalServiceService } from "../../global-service.service";
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-supplier-users-list',
  standalone: false,
  templateUrl: './supplier-users-list.component.html',
  styleUrls: ['./supplier-users-list.component.scss']
})
export class SupplierUsersListComponent implements OnInit {
  internalUsersList: any = [];
  p: any = 1;
  searchText: any;
  loginUserData: any;
  page: any = 1
  totalinvoice: any;
  totalpaid: any;
  constructor(private globalServicce: GlobalServiceService, private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }


  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getRegisterdUsers();
  }

  registeredusers1: any = [];
  registeredusers: any = [];
  getRegisterdUsers() {
    this.spinner.show();
    this.globalServicce.getDataOnlyWithMethod("sup/supplierlist").subscribe((data) => {
      this.registeredusers1 = data
      this.registeredusers = this.registeredusers1.filter((a) => { return a.user_type == 'supplier' || a.user_type == 'cha'})
    console.log(this.registeredusers,'users')
    this.spinner.hide();
      if (this.registeredusers.length > 0) {
        this.internalUsersList = this.registeredusers;
      }
      //  else {
      //   alert('No Data');
      // }
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
    localStorage.setItem('supplierProfile', JSON.stringify(data));
    this.route.navigateByUrl('/Admin-EDIT SUPPLIER');
  };
  ledgerdata: any = []
  view(data) {
    this.spinner.show();
    this.globalServicce.getDatawithMethodParams1("sup/payments/", data.user_id).subscribe((data) => {
      this.ledgerdata = data
      this.totalinvoice = this.ledgerdata.map(a => a.InvAmount).reduce(function (a, b) {
        return a + b;
      });
      this.totalpaid = this.ledgerdata.map(a => a.PaidAmount).reduce(function (a, b) {
        return a + b;
      });
      this.spinner.hide();
      $('#viewledgerModal').modal('show');


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
  onPageChange(Page: number) {
    this.page = Page;
    window.scrollTo(0, 0);
  }
}
