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
  selector: 'app-outstanding-list',
  standalone: false,
  templateUrl: './outstanding-list.component.html',
  styleUrls: ['./outstanding-list.component.scss']
})
export class OutstandingListComponent implements OnInit {
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
  LastInvoiceAmount:any;
  productdata: any = []
  types: string;
  constructor(public globalService: GlobalServiceService, private DatePipe: DatePipe, private router: Router, private dialog: MatDialog, private bnIdle: BnNgIdleService, private route: Router, public globalservive: GlobalServiceService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.postdataNotification5();
  }
  getinvoicelist5: any

  postdataNotification5() {
    this.spinner.show();
    return this.globalservive.postdataonlywithmethod('payment_history_sadmin').subscribe((resp) => {
       this.getinvoicelist5 = resp;
      this.productdata = resp;
// console.log(this.getinvoicelist5,'respinv')
// console.log(this.productdata,'resppdtl')
  //     for (var i = 0; i < this.productdata.length; i++) {
  //       if (this.productdata[i]) {
  //         this.getinvoicelist5[i].mrk = this.productdata[i].mrk;
  //         this.getinvoicelist5[i].credit_limit = this.productdata[i].credit_limit;
  //         this.getinvoicelist5[i].credit_period = this.productdata[i].credit_period;
  //         this.getinvoicelist5[i].business_name = this.productdata[i].business_name;
  //         this.getinvoicelist5[i].Outstanding = this.productdata[i].Outstanding;
  //         this.getinvoicelist5[i].due = this.productdata[i].due;
  //         this.getinvoicelist5[i].LastInvAmount = this.productdata[i].LastInvAmount;
  //        this.getinvoicelist5[i].productdtl = this.productdata[i].productdtl;
         
  //       // console.log("productdtl",this.getinvoicelist5[i].productdtl);
  //       }
    
  // }
 
      if (this.getinvoicelist5) {
        this.TotOutstanding = this.getinvoicelist5.map(a => parseFloat(a.Outstanding ? a.Outstanding : '0')).reduce(function (a, b) {
          return a + b;
        });
        this.TotCreditLimit = this.getinvoicelist5.map(a => parseFloat(a.credit_limit ? a.credit_limit : '0')).reduce(function (a, b) {
          return a + b;
        });
        this.TotDueAmount = this.getinvoicelist5.map(a => parseFloat(a.due ? a.due : '0')).reduce(function (a, b) {
          return a + b;
        });

        this.LastInvoiceAmount = this.getinvoicelist5.map(a => parseFloat(a.LastInvAmount ? a.LastInvAmount : '0')).reduce(function (a, b) {
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

  // =================redirection to customer ledger===============================
  dealerdata: any = []
  fromdates: any
  todates: any
  getinv: any

  gotoledger(getinv) {
    var toDate = new Date()
    var priorDate = new Date('2020-04-01');
    this.fromdates = this.DatePipe.transform(priorDate, "yyyy-MM-dd")
    this.todates = this.DatePipe.transform(toDate, "yyyy-MM-dd")
    this.masterData.giver_company_code = getinv.company_code;
    this.dealerdata.push({ 'companycode': getinv.business_name + '-(' + this.masterData.giver_company_code + ')', 'fromdate': this.fromdates, 'todate': this.todates })
    // this.dealerdata.push({'companycode':this.masterData.,'fromdate':this.fromdates,'todate':this.todates})
    localStorage.setItem('dealerledger', JSON.stringify(this.dealerdata))
   // this.router.navigate(['customerledger?A=OSD'])
  //Navigate not supported parameter...Navigate By Url supported passing parameters....
    this.route.navigateByUrl('/customerledger?A=OSD');



  }
  printreport2() {
    localStorage.setItem('getinvoicelist5', JSON.stringify(this.getinvoicelist5));
    this.router.navigate(['/outstanding-list-print'])
  }


  printreport1() {
    //retutn only not equal to zero values.......display other than 0 in outstanding amount
    this.details = this.getinvoicelist5.filter((a) => { return a.Outstanding != 0 })
    localStorage.setItem('getinvoicelist5', JSON.stringify(this.details));
    this.router.navigate(['/outstanding-list-print'])
  }

  // pidata: any=[];
  // piclick(product){
  
  //   this.pidata = product.productdtl;
  
  //  $("#viewpiModal").modal('show');
  // }


  print(data) {
    this.types = "Inv";
    this.globalservive.printReport('market/poprint/', this.types, data).subscribe((resp) => {
        localStorage.setItem('getinvoicelist5', JSON.stringify(resp))
        // this.route.navigateByUrl('/invoice-Print?A=OSL');
        this.route.navigateByUrl('/Admin-Invoice-Print?A=OSL');
    },
      error => {
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      });
  }

}
