import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GlobalServiceService } from "./../global-service.service";
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
declare var $: any;

@Component({
  selector: 'app-supplier-revised-pi-list',
  standalone: false,
  templateUrl: './supplier-revised-pi-list.component.html',
  styleUrls: ['./supplier-revised-pi-list.component.scss']
})
export class SupplierRevisedPiListComponent implements OnInit {

  orders: any = [];
  p: any = 1;
  searchText: any;
  loginUserData: any;
  removedata: any;
  pendingdata: any;
  constructor(private globalServicce: GlobalServiceService, private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getorders()
    this.getpendingdata()
  }
  getorders() {
    this.spinner.show();
    this.globalServicce.getDatawithMethodParam1("sup/poqhdrrevaiseddata/", 0).subscribe((data) => {
      this.orders = data
      console.log(data)
      this.spinner.hide();

    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  };
  viewMore(data, rev) {
    data.revised = rev != null ? rev : '';
    localStorage.setItem('purchaseorder', JSON.stringify(data));
    if (this.loginUserData.role == 'Admin') {
      this.route.navigateByUrl('Admin-PO-Approval');
    }
    else {
      this.route.navigateByUrl('Supplier-PO-Approval?S=Apv');
    }
  };
  reject(){
    this.globalServicce.getcheckdata("sup/sup_po_cancel/",this.removedata.pono).subscribe((resp) => {
      console.log(resp);
      this.getorders()
      $('#reject').modal('hide');
     
     })
  }
  confirm(data) {
    // this.fromdealer_id=data.user_id
    $('#reject').modal('show');
    this.removedata=data
    // this.getRegisterdUsers()
  }
  getpendingdata() {
    this.globalServicce.getcheckdata("sup/getsupoutstanding/",this.loginUserData.user_id).subscribe((data) => {
      this.pendingdata = data;
    });
  }

}

