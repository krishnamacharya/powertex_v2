import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { GlobalServiceService } from '../../global-service.service';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-supplier-ledger',
  standalone: false,
  templateUrl: './supplier-ledger.component.html',
  styleUrls: ['./supplier-ledger.component.scss']
})
export class SupplierLedgerComponent implements OnInit {

  orders: any = [];
  p: any = 1;
  searchText: any;
  loginUserData: any;
  totalpaid: any;
  totalinvoice: any;
  fromdate: any;
  tilldate: any;
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
  constructor(private router: Router,private DatePipe: DatePipe, private globalServicce: GlobalServiceService, private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    // this.getorders()
    this.fromdate = new Date('2020-03-01')
    this.tilldate = new Date()
    this.getorders();
  }
  totInvUsd: any;
  totPaidUsd: any;
  totInvCny: any;
  totPaidCny: any;
  totUsd: any = [];
  totCny: any = [];
  getorders() {
    this.spinner.show();
    let from, till;
    if (this.fromdate && this.tilldate) {
      from = this.DatePipe.transform(this.fromdate, "yyyy-MM-dd")
      till = this.DatePipe.transform(this.tilldate, "yyyy-MM-dd")
    } else {
      from = this.DatePipe.transform(new Date('1900-01-01'), "yyyy-MM-dd");
      till = this.DatePipe.transform(new Date(), "yyyy-MM-dd");
    }
    this.globalServicce.getDatawithMethodParams3("sup/payments/", this.loginUserData.user_id, from, till).subscribe((data) => {
      this.orders = data
      // console.log(this.orders)
      // if (this.orders.length > 0) {
      //   this.totalinvoice = this.orders.map(a => parseInt(a.InvAmount)).reduce(function (a, b) {
      //     return a + b;
      //   });
      //   this.totalpaid = this.orders.map(a => parseInt(a.PaidAmount)).reduce(function (a, b) {
      //     return a + b;
      //   });
      // }
       // USD Totals
       this.totUsd = this.orders.filter((e) => { return e.ctype == 'USD'})
       if(this.totUsd.length>0){ 
        //  this.totInvUsd = this.totUsd.map(a => parseFloat(a.InvAmount?a.InvAmount:'0')).reduce(function (a, b) {
        //    return a + b;
        //  });
        //  this.totPaidUsd = this.totUsd.map(a => parseFloat(a.PaidAmount?a.PaidAmount:'0')).reduce(function (a, b) {
        //    return a + b;
        //  });
        //  console.log('this.totInvUsd',this.totInvUsd,'this.totPaidUsd', this.totPaidUsd)
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
        // this.totDiscUsd = this.totUsd.map(a => parseFloat(a.TType=='Discount'?a.PaidAmount:'0')).reduce(function (a, b) {
        //   return a + b;
        // });
        // this.totPayUsd = this.totUsd.map(a => parseFloat(a.TType=='Payment'?a.PaidAmount:'0')).reduce(function (a, b) {
        //   return a + b;
        // });
        // this.totPurUsd = this.totUsd.map(a => parseFloat(a.TType=='Purchase'?a.InvAmount:'0')).reduce(function (a, b) {
        //   return a + b;
        // });
        console.log('this.totDiscUsd',this.totDiscUsd,'this.totPayUsd', this.totPayUsd,'this.totPurUsd', this.totPurUsd)
       }

     // CNY Totals
       this.totCny = this.orders.filter((e) => { return e.ctype == 'CNY'})
       if(this.totCny.length>0){
        //  this.totInvCny = this.totCny.map(a => parseFloat(a.InvAmount?a.InvAmount:'0')).reduce(function (a, b) {
        //    return a + b;
        //  });
        //  this.totPaidCny = this.totCny.map(a => parseFloat(a.PaidAmount?a.PaidAmount:'0')).reduce(function (a, b) {
        //    return a + b;
        //  });
        // console.log('this.totInvCny',this.totInvCny,'this.totPaidCny', this.totPaidCny)
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
        // this.totDiscCny = this.totUsd.map(a => parseFloat(a.TType=='Discount'?a.PaidAmount:'0')).reduce(function (a, b) {
        //   return a + b;
        // });
        // this.totPayCny = this.totUsd.map(a => parseFloat(a.TType=='Payment'?a.PaidAmount:'0')).reduce(function (a, b) {
        //   return a + b;
        // });
        // this.totPurCny = this.totUsd.map(a => parseFloat(a.TType=='Purchase'?a.InvAmount:'0')).reduce(function (a, b) {
        //   return a + b;
        // });
        console.log('this.totDiscCny',this.totDiscCny,'this.totPayCny', this.totPayCny,'this.totPurCny', this.totPurCny)
       }
      // console.log(this.totalinvoice, this.totalpaid)
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
      this.route.navigateByUrl('Supplier-PO-Approval');
    }
  };


  //print Redirection
 printreport(){
  localStorage.setItem('orders', JSON.stringify(this.orders));
  this.router.navigate(['/supplier-ledger-print'])
 // this.router.navigateByUrl('supplier-ledger-print');
}
dataURLtoFile(ref_no,image) {
  if (image) {
    let blob: any = new Blob([image], { type: 'image/jpeg' });
    // const url = window.URL.createObjectURL(blob);
    const url = this.globalServicce.imageurl + image;
    window.open(url);
    //window.location.href = response.url;
    // var count = (image.match(/media/g) || []).length;
    // if (count > 1) {
    //   image.replace(/media/g, '')
    // }
    // fileSaver.saveAs(this.globalServicce.imageurl + image, ref_no + "_Payment_image." + image.substr(image.length - 5).split('.')[1]);
  }
}

}
