import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { GlobalServiceService } from '../global-service.service';

@Component({
  selector: 'app-adminchaledger',
  standalone: false,
  templateUrl: './adminchaledger.component.html',
  styleUrls: ['./adminchaledger.component.scss']
})
export class AdminchaledgerComponent implements OnInit {
  orders: any = [];
  orders1: any = [];
  p: any = 1;
  searchText: any;
  loginUserData: any;
  chaamount: any;
  totalpayment: any;
  PendingPayments: any = [];
  fromdate: any;
  tilldate: any;
  maxdate:any;
  suppliers: any = [];
  pro: any = {};
  Puserid: any;
  pro1 : any;
  SNameExists:any;
  constructor(private DatePipe: DatePipe, private globalService: GlobalServiceService, private router: Router, private globalServicce: GlobalServiceService, private route: Router,private spinner: NgxSpinnerService) { 

  }
  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.fromdate = new Date('2020-03-01')
    this.tilldate = new Date()
 //   this.getChaLedger();
    this.getsuppliers()
  }

  getsuppliers() {
    this.globalService.getDataOnlyWithMethod("sup/chalist").subscribe((data) => {
      this.suppliers = data;
     // console.log(data)
    });
  }

  // getChaLedger() {
  //   this.spinner.show();
  //   if(this.pro){
  //     this.Puserid =  this.pro.user_id;
  //   }

  //   this.pro1 = this.pro;
  //   if (this.suppliers) {
  //     let supplier = this.suppliers.filter((e) => e.user_id == this.pro.user_id)
  //   }

  //   let from, till;
  //   if (this.fromdate && this.tilldate) {
  //     from = this.DatePipe.transform(this.fromdate, "yyyy-MM-dd")
  //     till = this.DatePipe.transform(this.tilldate, "yyyy-MM-dd")
  //   } else {
  //     from = this.DatePipe.transform(new Date('1900-01-01'), "yyyy-MM-dd");
  //     till = this.DatePipe.transform(new Date(), "yyyy-MM-dd");
  //   }
     
  //   this.globalServicce.getDatawithMethodParams3('sup/chaledger/', this.pro.user_id?this.pro.user_id:'',from, till).subscribe((data) => {
  //     if (this.orders) {
  //       this.orders = []
  //     }
  //     this.orders = data
  //     this.spinner.hide();

  //     if(this.orders.length>0){
  //       this.chaamount = this.orders.map(a => parseFloat(a.chaamount ? a.chaamount : '0')).reduce(function (a, b) {
  //         return a + b;
  //       });
  //       this.totalpayment = this.orders.map(a => parseFloat(a.Payment ? a.Payment : '0')).reduce(function (a, b) {
  //         return a + b;
  //       });
  //     }
  //   },
  //     error => {
  //       this.spinner.hide();
  //       //this.ngxSmartService.getModal('errorModal').open();
// this.dialog.open(ErrorModalComponent, {
//       data: { errorModal:true }
//     });
  //     });
  // };



  
  getChaLedger() {
    this.spinner.show();
    if(this.pro){
      this.Puserid =  this.pro.user_id;
    }
    let from, till;
    if (this.fromdate && this.tilldate) {
      from = this.DatePipe.transform(this.fromdate, "yyyy-MM-dd")
      till = this.DatePipe.transform(this.tilldate, "yyyy-MM-dd")
    } else {
      from = this.DatePipe.transform(new Date('1900-01-01'), "yyyy-MM-dd");
      till = this.DatePipe.transform(new Date(), "yyyy-MM-dd");
    }
    this.globalServicce.getDatawithMethodParams3("sup/chaledger/", this.Puserid?this.Puserid:'', from, till).subscribe((data) => {
      this.orders = data;
      this.orders1 = data;
    
     console.log(this.orders)

     
      this.spinner.hide();

      if(this.orders.length>0){
        this.chaamount = this.orders.map(a => parseFloat(a.chaamount ? a.chaamount : '0')).reduce(function (a, b) {
          return a + b;
        });
        this.totalpayment = this.orders.map(a => parseFloat(a.Payment ? a.Payment : '0')).reduce(function (a, b) {
          return a + b;
        });
      }
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
// this.dialog.open(ErrorModalComponent, {
//       data: { errorModal:true }
//     });
        // console.log(error);
      });
  };

 printreport(){
  localStorage.setItem('orders', JSON.stringify(this.orders));
  localStorage.setItem('pro', JSON.stringify(this.pro));
 // console.log(this.pro,'lxx');
  this.router.navigate(['/adminchaledgerprint'])
}
}
