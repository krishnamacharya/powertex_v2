import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { GlobalServiceService } from '../../global-service.service';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-supplier-po-history-tabs',
  standalone: false,
  templateUrl: './supplier-po-history-tabs.component.html',
  styleUrls: ['./supplier-po-history-tabs.component.scss']
})
export class SupplierPoHistoryTabsComponent implements OnInit {
  @Input() underProcessId: number = 1;
  loginUserData: any
  productdata: any = []
  orders: any = [];
  p: any = 1;
  searchText: any;
  fromdate: any = '';
  tilldate: any = '';
  maxdate: any = '';
  constructor(private DatePipe: DatePipe, private route: Router, private globalServicce: GlobalServiceService, private dialog: MatDialog, private spinner: NgxSpinnerService) { }
  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    // this.fromdate = new Date().getUTCFullYear() + "-" + "01" + "-" + "01";
    this.tilldate = new Date();
    this.maxdate = new Date();
    
    var fromdate = new Date();
    var today = new Date();
    this.fromdate = fromdate.setDate(today.getDate()-30);
    this.fromdate = this.DatePipe.transform(this.fromdate, "yyyy-MM-dd")
    this.getorders();
  }
  getorders() {
    this.spinner.show();
    let from, till;
    if (this.fromdate && this.tilldate) {
      from = this.DatePipe.transform(this.fromdate, "yyyy-MM-dd")
      till = this.DatePipe.transform(this.tilldate, "yyyy-MM-dd")
    } 
    else {
      // from = this.DatePipe.transform(new Date('1900-01-01'), "yyyy-MM-dd");
      // till = this.DatePipe.transform(new Date(), "yyyy-MM-dd");
      from = this.DatePipe.transform(new Date().getUTCFullYear() + "-" + "01" + "-" + "01", "yyyy-MM-dd");
      till = this.DatePipe.transform(new Date(), "yyyy-MM-dd");
    }
    ///
    if (this.underProcessId == 1) {
      // Pending
      this.globalServicce.getDatawithMethodParam12("sup/poqhdrhistory/", 0, from, till).subscribe((data: any) => {
        // this.orders = data.filter((e) => { return e.approve == 0; })
        this.orders = data
        
        if (this.orders.length>0) {
          for (let p of this.orders) {
              p.POAmount = Math.round(p.POAmount);
          }
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
    } else if (this.underProcessId == 2) {
      // Approved
      this.globalServicce.getDatawithMethodParam12("sup/poqhdrhistory/", 1, from, till).subscribe((data: any) => {
        this.orders = data
        this.spinner.hide();
      },
        error => {
          this.spinner.hide();
          this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
          // console.log(error);
        });
    } else if (this.underProcessId == 3) {
      // Cancelled
      this.globalServicce.getDatawithMethodParam12("sup/poqhdrhistory/", 2, from, till).subscribe((data: any) => {
        this.orders = data
        this.spinner.hide();
      },
        error => {
          this.spinner.hide();
          this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
          // console.log(error);
        });
    }
    ///
  };

  pono: any
  totqty: any
  totamount: any
  viewMore(data) {
    this.spinner.show();
    this.pono = data.POQHID
    this.globalServicce.getDatawithMethodParams1("sup/poqhdrhistory/", data.POQHID).subscribe((data) => {
      this.productdata = data
      this.totqty =  this.productdata.map(a => parseInt(a.qty?a.qty:'0')).reduce(function (a, b) {
        return a + b;
      });
      this.totamount =  this.productdata.map(a => parseInt(a.amount?a.amount:'0')).reduce(function (a, b) {
        return a + b;
      });
      this.spinner.hide();
      for (let p of this.productdata) {
        if (p.productid.long_name) {
          p.product_name = p.productid.long_name + ' ' + p.productid.modelno
        }
        else {
          p.product_name = p.productid.modelno
        }
      }

      console.log(this.productdata, "productdata")
      $('#viewpoModal1').modal('show');


    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  };
  printdatadetail(data, type) {
      if (type == 'po') {
        this.route.navigateByUrl('/Supplier-PO Print?po=' + data + '&S=Apo');
      }
  }
}
