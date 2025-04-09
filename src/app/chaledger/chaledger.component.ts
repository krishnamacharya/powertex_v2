import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { GlobalServiceService } from '../global-service.service';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-chaledger',
  standalone: false,
  templateUrl: './chaledger.component.html',
  styleUrls: ['./chaledger.component.scss']
})
export class ChaledgerComponent implements OnInit {
  orders: any = [];
  p: any = 1;
  searchText: any;
  loginUserData: any;
  chaamount: any;
  totalpayment: any;
  PendingPayments: any = [];
  fromdate: any;
  tilldate: any;
  constructor(private DatePipe: DatePipe,private router: Router, private globalServicce: GlobalServiceService, private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.fromdate = new Date('2020-03-01')
    this.tilldate = new Date()
    this.getChaLedger();
  }



  getChaLedger() {
    this.spinner.show();
    let from, till;
    if (this.fromdate && this.tilldate) {
      from = this.DatePipe.transform(this.fromdate, "yyyy-MM-dd")
      till = this.DatePipe.transform(this.tilldate, "yyyy-MM-dd")
    } else {
      from = this.DatePipe.transform(new Date('1900-01-01'), "yyyy-MM-dd");
      till = this.DatePipe.transform(new Date(), "yyyy-MM-dd");
    }
    this.globalServicce.getDatawithMethodParams3("sup/chaledger/", this.loginUserData.user_id, from, till).subscribe((data) => {
      this.orders = data
    
    // console.log(this.orders)

     
      this.spinner.hide();

      this.chaamount = this.orders.map(a => parseFloat(a.chaamount ? a.chaamount : '0')).reduce(function (a, b) {
        return a + b;
      });
      this.totalpayment = this.orders.map(a => parseFloat(a.Payment ? a.Payment : '0')).reduce(function (a, b) {
        return a + b;
      });
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  };
 //print Redirection
 printreport(){
  localStorage.setItem('orders', JSON.stringify(this.orders));
  this.router.navigate(['/chaledgerprint'])
}

}
