import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { GlobalServiceService } from '../../global-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-admin-supplier-ledger',
  standalone: false,
  templateUrl: './admin-supplier-ledger.component.html',
  styleUrls: ['./admin-supplier-ledger.component.scss']
})
export class AdminSupplierLedgerComponent implements OnInit {
  p: any = 1;
  loginUserData: any;
  suppliers: any;
  orders: any;
  totalinvoice: any;
  totalpaid: any;
  pro: any;
  pro1: any;
  currency: any;
  SNameExists: any;
  searchText: any;
  fromdate: any;
  tilldate: any;
  maxdate: any;
  totDiscUsd: any;
  totPayUsd: any;
  totPurUsd: any;
  totDiscCny: any;
  totPayCny: any;
  totPurCny: any;
  TDiscUsd: any;
  TPayUsd: any;
  TPurUsd: any;
  TDiscCny: any;
  TPayCny: any;
  TPurCny: any;
  constructor(private DatePipe: DatePipe, private globalService: GlobalServiceService, private router: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getsuppliers()
 //   this.getsku()
  }

  ngOnInit() {
    this.fromdate = new Date().getUTCFullYear() + "-" + "01" + "-" + "01";
    this.tilldate = new Date();
    this.maxdate = new Date();
  }

  getsuppliers() {
    this.globalService.getDataOnlyWithMethod("sup/skuprifix").subscribe((data) => {
      this.suppliers = data;
      console.log(data)
    });
  }
  totInvUsd: any;
  totPaidUsd: any;
  totInvCny: any;
  totPaidCny: any;
  totUsd: any = [];
  totCny: any = [];

 
  getsku() {
    if(this.pro1){
      for (let name of this.suppliers) {
        if (this.pro1.replace(/\s/g, '') === name.business_name.replace(/\s/g, '')) {
      this.pro = name.user_id
      break;
        }
      }
    }
    if (this.suppliers) {
      let supplier = this.suppliers.filter((e) => e.user_id == this.pro)
      this.currency = supplier[0].currency
    }
    let from, till;
    if (this.fromdate && this.tilldate) {
      from = this.DatePipe.transform(this.fromdate, "yyyy-MM-dd")
      till = this.DatePipe.transform(this.tilldate, "yyyy-MM-dd")
    } else {
      from = this.DatePipe.transform(new Date('1900-01-01'), "yyyy-MM-dd");
      till = this.DatePipe.transform(new Date(), "yyyy-MM-dd");
    }
    this.globalService.getDatawithMethodParams3("sup/payments/", this.pro?this.pro:undefined, from, till).subscribe((data) => {
      this.orders = data
      console.log(this.orders)
      // this.totalinvoice = this.orders.map(a => parseInt(a.InvAmount)).reduce(function (a, b) {
      //   return a + b;
      // });
      // this.totalpaid = this.orders.map(a => parseInt(a.PaidAmount)).reduce(function (a, b) {
      //   return a + b;
      // });
      console.log(this.totalinvoice, this.totalpaid)
    if(this.orders){
      // USD Totals
      this.totUsd = this.orders.filter((e) => { return e.ctype == 'USD'})
      if(this.totUsd.length>0){
        // this.totInvUsd = this.totUsd.map(a => parseFloat(a.InvAmount?a.InvAmount:'0')).reduce(function (a, b) {
        //   return a + b;
        // });
        // this.totPaidUsd = this.totUsd.map(a => parseFloat(a.PaidAmount?a.PaidAmount:'0')).reduce(function (a, b) {
        //   return a + b;
        // });
        // console.log('this.totInvUsd',this.totInvUsd,'this.totPaidUsd', this.totPaidUsd)
        this.TDiscUsd = this.totUsd.filter((e) => { return e.TType == 'Discount'})
        if(this.TDiscUsd.length>0){
          this.totDiscUsd = this.TDiscUsd.map(a => parseFloat(a.PaidAmount?a.PaidAmount:'0')).reduce(function (a, b) {
            return a + b;
          });
        }else{
          this.totDiscUsd = 0;
        }

        this.TPayUsd = this.totUsd.filter((e) => { return e.TType == 'Payment'})
        if(this.TPayUsd.length>0){
          this.totPayUsd = this.TPayUsd.map(a => parseFloat(a.PaidAmount?a.PaidAmount:'0')).reduce(function (a, b) {
            return a + b;
          });
        }else{
          this.totPayUsd = 0;
        }
          
        this.TPurUsd = this.totUsd.filter((e) => { return e.TType == 'Purchase'})
        if(this.TPurUsd.length>0){
          this.totPurUsd = this.TPurUsd.map(a => parseFloat(a.InvAmount?a.InvAmount:'0')).reduce(function (a, b) {
            return a + b;
          });
        }else{
          this.totPurUsd = 0;
        }
        console.log('this.totDiscUsd',this.totDiscUsd,'this.totPayUsd', this.totPayUsd,'this.totPurUsd', this.totPurUsd)
      }

    // CNY Totals
      this.totCny = this.orders.filter((e) => { return e.ctype == 'CNY'})
      if(this.totCny.length>0){
        this.TDiscCny = this.totCny.filter((e) => { return e.TType == 'Discount'})
        if(this.TDiscCny.length>0){
          this.totDiscCny = this.TDiscCny.map(a => parseFloat(a.PaidAmount?a.PaidAmount:'0')).reduce(function (a, b) {
            return a + b;
          });
        }else{
          this.totDiscCny = 0;
        }
          
        this.TPayCny = this.totCny.filter((e) => { return e.TType == 'Payment'})
        if(this.TPayCny.length>0){
          this.totPayCny = this.TPayCny.map(a => parseFloat(a.PaidAmount?a.PaidAmount:'0')).reduce(function (a, b) {
            return a + b;
          });
        }else{
          this.totPayCny = 0;
        }
        
        this.TPurCny = this.totCny.filter((e) => { return e.TType == 'Purchase'})
        if(this.TPurCny.length>0){
          this.totPurCny = this.TPurCny.map(a => parseFloat(a.InvAmount?a.InvAmount:'0')).reduce(function (a, b) {
            return a + b;
          });
        }else{
          this.totPurCny = 0;
        }
      }
          // console.log('this.totInvCny',this.totInvCny,'this.totPaidCny', this.totPaidCny)
        console.log('this.totDiscCny',this.totDiscCny,'this.totPayCny', this.totPayCny,'this.totPurCny', this.totPurCny)
    }
      this.spinner.hide();

      if (this.orders.length < 1) {
     //   alert("No Data is Available");
        $("#WarningModal").modal('show');
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
  printdatadetail(data, type) {
    if (type == 'invoice') {
      this.router.navigateByUrl('/Supplier-Inv-Print?invqhid=' + data);
    }
  }
 //print Redirection
 printreport(){
  localStorage.setItem('orders', JSON.stringify(this.orders));
  this.router.navigate(['/admin-supplier-ledger-print'])
}
dataURLtoFile(ref_no, image) {
  if (image) {
    let blob: any = new Blob([image], { type: 'image/jpeg' });
    // const url = window.URL.createObjectURL(blob);
    const url = this.globalService.imageurl + image;
    window.open(url);
  }
}
}
