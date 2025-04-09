import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { GlobalServiceService } from '../../global-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-duty-paid-report',
  standalone: false,
  templateUrl: './duty-paid-report.component.html',
  styleUrls: ['./duty-paid-report.component.scss']
})
export class DutyPaidReportComponent implements OnInit {
  loginUserData: any;
  dischargeports: any;
  orders: any;
  totalinvoice: any;
  totalCtns: any;
  pro: any;
  currency: any;
  SNameExists: any;
  searchText: any;
  fromdate: any;
  tilldate: any;
  maxdate: any;
  dischargeprt: any;
  Category: any;
  ToTAssV: any;
  ToTDuty: any;
  ToTchaInv: any;
  Cat: any;
p: string|number;
  constructor(private router: Router,private DatePipe: DatePipe, private globalService: GlobalServiceService, private dialog: MatDialog, private spinner: NgxSpinnerService) {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getdischargeports();
    this.getsuppliers();
    this.getdata();
  }

  ngOnInit() {
    this.fromdate = new Date().getUTCFullYear() + "-" + "01" + "-" + "01";
    this.tilldate = new Date();
    this.maxdate = new Date();
  }

  getdischargeports() {
    this.globalService.getDataOnlyWithMethod("sup/dischargeport").subscribe((data) => {
      this.dischargeports = data;
    });

  }
  suppliers: any = [];
  getsuppliers() {
    this.globalService.getDataOnlyWithMethod("sup/skuprifix").subscribe((data) => {
      this.suppliers = data;
    });
  }
  getdata() {
    
    if (this.suppliers) {
      let supplier = this.suppliers.filter((e) => e.user_id == this.pro)
      // this.currency = supplier[0].currency
    }
    let from, till;
    if (this.fromdate && this.tilldate) {
      from = this.DatePipe.transform(this.fromdate, "yyyy-MM-dd")
      till = this.DatePipe.transform(this.tilldate, "yyyy-MM-dd")
    } else {
      from = this.DatePipe.transform(new Date('1900-01-01'), "yyyy-MM-dd");
      till = this.DatePipe.transform(new Date(), "yyyy-MM-dd");
    }
    this.globalService.getDatawithMethodParams4("sup/dutyreport/", from, till, this.dischargeprt?this.dischargeprt:'',this.pro?this.pro:'').subscribe((data) => {
      this.orders = data
      console.log(this.orders)
      if(this.orders){
        this.ToTAssV = this.orders.map(a => parseFloat(a.asses_val?a.asses_val:'0')).reduce(function (a, b) {
          return a + b;
        });
        this.ToTDuty = this.orders.map(a => parseFloat(a.duty_approx?a.duty_approx:'0')).reduce(function (a, b) {
          return a + b;
        });
        this.totalinvoice = this.orders.map(a => parseInt(a.POAmount?a.POAmount:0)).reduce(function (a, b) {
          return a + b;
        });
        this.totalCtns = this.orders.map(a => parseInt(a.ctns?a.ctns:'0')).reduce(function (a, b) {
          return a + b;
        });
        console.log(this.ToTAssV,'ToTAssV',this.ToTDuty,'ToTDuty')
      }
      console.log('totalinv=',this.totalinvoice,'totalCtns=', this.totalCtns)
      this.spinner.hide();
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
  printreport(){
    localStorage.setItem('orders', JSON.stringify(this.orders));

    this.router.navigate(['/Admin-Duty-Paid-Report-Print'])
  }

}
