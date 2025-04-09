import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../../global-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-minmum-order-qty',
  standalone: false,
  templateUrl: './minmum-order-qty.component.html',
  styleUrls: ['./minmum-order-qty.component.scss']
})
export class MinmumOrderQtyComponent implements  OnInit {
  loginUserData: any;
  orders: any = [];
  p: any = 1
searchText: any;

  constructor(private globalServicce: GlobalServiceService, private router: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getPendingPayments();
  }
  getPendingPayments() {
    this.spinner.show();
    this.globalServicce.getMethodData('minumsaleorder/').subscribe((data) => {
      this.orders = data;
      this.spinner.hide();
      console.log(this.orders)
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      });
  };
  printdatadetail(data, type) {
    if (type == 'invoice') {
      this.router.navigateByUrl('/Supplier-Inv-Print?invqhid=' + data);
    }
  }


  printreport(){
  localStorage.setItem('orders', JSON.stringify(this.orders));
  this.router.navigate(['/Admin-Minmum-Order-Quantity-Print'])

}

}
