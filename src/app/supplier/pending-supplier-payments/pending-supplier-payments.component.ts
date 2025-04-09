import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { GlobalServiceService } from '../../global-service.service';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;

@Component({
  selector: 'app-pending-supplier-payments',
  standalone: false,
  templateUrl: './pending-supplier-payments.component.html',
  styleUrls: ['./pending-supplier-payments.component.scss']
})
export class PendingSupplierPaymentsComponent implements OnInit {
setFilteredItems() {
throw new Error('Method not implemented.');
}
  loginUserData: any
  supplierdata: any = []
  p: any = 1
  searchText: any
  suppliers: any = []
  totaldue: any;
  searchduedate: any;
supplier: any;
  constructor(private router: Router,private datePipe: DatePipe, private globalServicce: GlobalServiceService, private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getinvoicedata()
    // this.getsuppliers()

  }
  getsuppliers() {
    this.globalServicce.getDataOnlyWithMethod("sup/skuprifix").subscribe((data) => {
      this.suppliers = data;
    });
  }
  totalsupplierdata: any = []
  allPendingPayments: any = [];
  getinvoicedata() {
    this.spinner.show();
    // this.globalServicce.getDatawithMethodParams2("sup/pendingpaymentlist/", this.loginUserData.user_id, "USD").subscribe((data: any) => {
    this.globalServicce.getMethodData('sup/pendingpaymentlist/').subscribe((data: any) => {
      this.allPendingPayments = data;
      for (var i = 0; i <= this.allPendingPayments.length; i++) {
        if (this.allPendingPayments[i]) {
          if (this.allPendingPayments[i].bldate) {
            let currentDate = new Date();
            let dateSent = new Date(this.allPendingPayments[i].bldate);
            // this.allPendingPayments[i].Due_date = this.datePipe.transform(new Date(currentDate.setDate(dateSent.getDate() + this.allPendingPayments[i].credit_preiod)), 'yyyy-MM-dd')
          }
        }
      }
      this.supplierdata = this.allPendingPayments
      for (var i = 0; i <= this.supplierdata.length; i++) {
        if (this.supplierdata[i]) {
          if (this.supplierdata[i].bldate) {
            let currentDate = new Date();
            let dateSent = new Date(this.supplierdata[i].bldate);
            // this.supplierdata[i].days = this.datePipe.transform(new Date(currentDate.setDate(dateSent.getDate() + this.supplierdata[i].credit_preiod)), 'yyyy-MM-dd')
          }
        }

      }

      this.totalsupplierdata = data
      if (data.length > 0) {
        this.totaldue = this.supplierdata.map(a => parseFloat(a.balance_amount ? a.balance_amount : '0')).reduce(function (a, b) {
          return a + b;
        });
      }
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
  printreport() {


    localStorage.setItem('supplierdata', JSON.stringify(this.supplierdata));
    this.router.navigate(['/pending-supplier-payments-print'])



  }

  filterduedate() {
    console.log(this.allPendingPayments, this.searchduedate)
    if (this.searchduedate) {
      this.supplierdata = this.allPendingPayments.filter((e) => e.Due_date <= this.searchduedate)
    } else {
      this.supplierdata = this.allPendingPayments;
    }
  this.totaldue = this.supplierdata.map(a => parseFloat(a.balance_amount ? a.balance_amount : '0')).reduce(function (a, b) {
          return a + b;
        });
  }
}
