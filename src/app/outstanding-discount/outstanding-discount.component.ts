import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GlobalServiceService } from '../global-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BnNgIdleService } from 'bn-ng-idle';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
declare var $: any;

@Component({
  selector: 'app-outstanding-discount',
  standalone: false,
  templateUrl: './outstanding-discount.component.html',
  styleUrls: ['./outstanding-discount.component.scss']
})
export class OutstandingDiscountComponent implements OnInit {
  loginUserData: any;
  searchText: any;
  p: any = 1
  masterData: any = {};
  maxDate = new Date();
  formdata: any;
  obj: any = {};
  currencycodes: any
  paymentagainst: any
  paymentmodes: any = []
  paymentstatus: any = [];
  givercompanynames: any
  customSelected: string;
  paymentstatus1: any = [];
  invdetail: any = [];
  showBankdetail: boolean = false;
  details: any;
  TotOutstanding: any;
  TotCreditLimit: any;
  TotDueAmount: any;
  constructor(public globalService: GlobalServiceService, private DatePipe: DatePipe, private router: Router, private dialog: MatDialog, private bnIdle: BnNgIdleService, private route: Router, public globalservive: GlobalServiceService, private spinner: NgxSpinnerService, ) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.postdataNotification5();
  }
  getinvoicelist5: any

  postdataNotification5() {
    this.spinner.show();
  return this.globalservive.postdataonlywithmethod('payment_history_sadmin').subscribe((resp) => {
    this.getinvoicelist5 = resp;


    console.log(this.getinvoicelist5)
    if(this.getinvoicelist5){
      this.TotOutstanding = this.getinvoicelist5.map(a => parseFloat(a.Outstanding?a.Outstanding:'0')).reduce(function (a, b) {
        return a + b;
      });
       this.TotCreditLimit = this.getinvoicelist5.map(a => parseFloat(a.due[0].credit_limit?a.due[0].credit_limit:'0')).reduce(function (a, b) {
         return a + b;
       });
       this.TotDueAmount = this.getinvoicelist5.map(a => parseFloat(a.due[0].due?a.due[0].due:'0')).reduce(function (a, b) {
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
         console.log(error);
      });
  };

  printreport(){
    localStorage.setItem('getinvoicelist5', JSON.stringify(this.getinvoicelist5));
    this.router.navigate(['/outstanding-discount-print'])
  }


  printreport1(){
    //retutn only not equal to zero values.......display other than 0 in outstanding amount
    this.details = this.getinvoicelist5.filter((a) => { return a.Outstanding != 0})
    localStorage.setItem('getinvoicelist5', JSON.stringify(this.details));
    this.router.navigate(['/outstanding-discount-print'])
  }

}
