import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { GlobalServiceService } from '../../global-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-cha-charges-report',
  standalone: false,
  templateUrl: './cha-charges-report.component.html',
  styleUrls: ['./cha-charges-report.component.scss']
})
export class ChaChargesReportComponent implements OnInit {
  loginUserData: any;
  dischargeports: any;
  orders: any;
  orders1:any;
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
  ToTnonreceipted: any;
  ToTreceipted: any;
  ToTchaInv: any;
  Cat: any;
p: string|number;
  constructor(private router: Router,private DatePipe: DatePipe, private globalService: GlobalServiceService, private dialog: MatDialog, private spinner: NgxSpinnerService) {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getdischargeports();
    this.getparticulars();
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
  particulars1: any = [];
  getparticulars() {
    this.globalService.getDataOnlyWithMethod("sup/getchaparticulars").subscribe((data) => {
      this.particulars1 = data;
    });

  }
  getdata() {
    this.Cat = this.Category
    let from, till;
    if (this.fromdate && this.tilldate) {
      from = this.DatePipe.transform(this.fromdate, "yyyy-MM-dd")
      till = this.DatePipe.transform(this.tilldate, "yyyy-MM-dd")
    } else {
      from = this.DatePipe.transform(new Date('1900-01-01'), "yyyy-MM-dd");
      till = this.DatePipe.transform(new Date(), "yyyy-MM-dd");
    }
    this.globalService.getDatawithMethodParams4("sup/chachargesreport/", from, till, this.dischargeprt?this.dischargeprt:'',this.Category?this.Category:'').subscribe((data) => {
      this.orders = data
      this.orders1 = data

      console.log(this.orders)
      this.totalinvoice = this.orders.map(a => parseInt(a.POAmount?a.POAmount:0)).reduce(function (a, b) {
        return a + b;
      });
      this.totalCtns = this.orders.map(a => parseInt(a.ctns?a.ctns:'0')).reduce(function (a, b) {
        return a + b;
      });
      console.log('totalinv=',this.totalinvoice,'totalCtns=', this.totalCtns)
      if(this.Category){
        this.ToTnonreceipted = this.orders.map(a => parseFloat(a.nonreceipted?a.nonreceipted:'0')).reduce(function (a, b) {
          return a + b;
        });
        this.ToTreceipted = this.orders.map(a => parseFloat(a.receipted?a.receipted:'0')).reduce(function (a, b) {
          return a + b;
        });
        console.log(this.ToTnonreceipted,'ToTnonreceipted',this.ToTreceipted,'ToTreceipted')
      }else{
        this.ToTchaInv = this.orders.map(a => parseFloat(a.chainvamount?a.chainvamount:'0')).reduce(function (a, b) {
          return a + b;
        });
      }
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
  printdatadetail(data) {
        this.router.navigateByUrl('/Supplier-Cha-Print?invqhid=' + data +'&A=CCR');
  }
  header: any = {}
  printreport(){
    this.header = {'dischargeprt': this.dischargeprt, 'Category': this.Category};
    localStorage.setItem('header', JSON.stringify(this.header));
    localStorage.setItem('orders', JSON.stringify(this.orders));

    this.router.navigate(['/Admin-Cha-Charges-Report-Print'])
  }

}
