import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../../global-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-supplier-payment-list',
  standalone: false,
  templateUrl: './supplier-payment-list.component.html',
  styleUrls: ['./supplier-payment-list.component.scss']
})
export class SupplierPaymentListComponent implements OnInit {
  loginUserData: any;
  supplierpayments: any = [];
  totalinvoiceusd: any;
  totalinvoicecny: any;
  totalPaidAmount: any;
  totalbalance_amount: any;
searchText: any;
p: string|number;

  constructor(private globalServicce: GlobalServiceService, private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getPendingPayments();
  }
  getPendingPayments() {
    this.spinner.show();
    this.globalServicce. getMethodData('sup/suppaymentlist/').subscribe((data) => {
      this.supplierpayments=data;
      this.spinner.hide();
      console.log(this.supplierpayments)
      this.totalinvoiceusd = this.supplierpayments.map(a => parseFloat(a.Invoice_USD?a.Invoice_USD:'0')).reduce(function (a, b) {
        return a + b;
      });
      this.totalinvoicecny = this.supplierpayments.map(a => parseFloat(a.Invoice_CNY?a.Invoice_CNY:'0')).reduce(function (a, b) {
        return a + b;
      });
      this.totalPaidAmount = this.supplierpayments.map(a => parseFloat(a.PaidAmount?a.PaidAmount:'0')).reduce(function (a, b) {
        return a + b;
      });
      this.totalbalance_amount = this.supplierpayments.map(a => parseFloat(a.balance_amount?a.balance_amount:'0')).reduce(function (a, b) {
        return a + b;
      });
      console.log(this.totalinvoiceusd, this.totalinvoicecny, this.totalPaidAmount, this.totalbalance_amount)
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
  printreport(){
    localStorage.setItem('orders', JSON.stringify(this.supplierpayments));
    this.route.navigate(['/Admin-Paid-List-Print'])
  }
}
