import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { GlobalServiceService } from '../global-service.service';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
declare var $: any;

@Component({
  selector: 'app-sales-return-report',
  standalone: false,
  templateUrl: './sales-return-report.component.html',
  styleUrls: ['./sales-return-report.component.scss']
})
export class SalesReturnReportComponent implements OnInit {

  orders: any = [];
  orders1:any = [];
  p: any = 1;
  searchText: any;
  loginUserData: any;
  totalpaid: any;
  totalinvoice: any;
  fromdate: any;
  tilldate: any;
  maxdate: any;
  loginUserid: any;
  constructor(private router: Router,private DatePipe: DatePipe, private globalServicce: GlobalServiceService, private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }


  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    // this.getorders()
    if(this.loginUserData.user_type== 'supplier'){
      this.loginUserid = this.loginUserData.user_id;
    }else{
      this.loginUserid = '';
    }
    this.fromdate = new Date('2020-03-01')
    this.tilldate = new Date()
    this.getinvregister();
  }
  getinvregister() {
    if (this.orders) {
      this.orders = []
    }
    this.spinner.show();
    let from, till;
    if (this.fromdate && this.tilldate) {
      from = this.DatePipe.transform(this.fromdate, "yyyy-MM-dd")
      till = this.DatePipe.transform(this.tilldate, "yyyy-MM-dd")
    } else {
      from = this.DatePipe.transform(new Date('1900-01-01'), "yyyy-MM-dd");
      till = this.DatePipe.transform(new Date(), "yyyy-MM-dd");
    }
    this.globalServicce.getDatawithMethodParams2('sup/salertnreport/', from, till).subscribe((data) => {
      if (this.orders) {
        this.orders = []
      }
      this.orders = data;
      this.orders1 = data;
      this.spinner.hide();
      // console.log(this.orders)

    },
      error => {
        this.spinner.hide();
        console.log(error);
      });

  };
  productdata: any=[];
  viewMore(data) {
    // this.invno = data.invqhid
    this.spinner.show();
    let from, till;
    if (this.fromdate && this.tilldate) {
      from = this.DatePipe.transform(this.fromdate, "yyyy-MM-dd")
      till = this.DatePipe.transform(this.tilldate, "yyyy-MM-dd")
    } else {
      from = this.DatePipe.transform(new Date('1900-01-01'), "yyyy-MM-dd");
      till = this.DatePipe.transform(new Date(), "yyyy-MM-dd");
    }
    this.globalServicce.getDatawithMethodParams3("sup/salertnreport/", from, till, data.Seq_no).subscribe((data) => {
      this.productdata = data
      this.spinner.hide();
      $('#viewpoModal').modal('show');


    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  };

  printreport(){
    localStorage.setItem('orders', JSON.stringify(this.orders));
    this.router.navigate(['/supplier-invoices-supplier-print'])
  }

}
