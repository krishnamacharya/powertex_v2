import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GlobalServiceService } from '../global-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BnNgIdleService } from 'bn-ng-idle';
import { DatePipe } from '@angular/common';
import { dateFormat } from 'highcharts';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
declare var $: any;


@Component({
  selector: 'app-seeinvoice-list',
  standalone: false,
  templateUrl: './seeinvoice-list.component.html',
  styleUrls: ['./seeinvoice-list.component.scss']
})
export class SeeinvoiceListComponent implements OnInit {
  token: string;
  loginUserData: any;
  math = Math;
  param1: any;
  search_val: string;
  masterData: any = {};
  searchText: any;
  p: any = 1
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
  constructor(private DatePipe: DatePipe, private router: Router, private dialog: MatDialog, private bnIdle: BnNgIdleService, private route: Router, public globalservive: GlobalServiceService, private spinner: NgxSpinnerService) {
    // interval(10 * 1000).subscribe(x => {

    //   if ((this.token != undefined && this.token != '') && (this.loginUserData.designation == 'Warehouse Manager' || this.loginUserData.designation == 'Accounts Manager' || this.loginUserData.designation == 'Branch Manager' || this.loginUserData.designation == 'Shopee Manager' || this.loginUserData.role == 'Dealer')) {
    //     this.getNotificationCount();
    //   }
    // });


    // this.bnIdle.startWatching(30 * 1000 * 60).subscribe((res) => {

    //   if (res) {
    //     if (this.token != '' && this.token != undefined) {
    //       this.gotoLogout();
    //     }
    //   }
    // });


  }

  ngOnInit() {
    //this.spinner.hide();

    localStorage.removeItem("fromactiveusers")
    localStorage.removeItem("urldata")
    if (localStorage.getItem('dealerledger')) {
      localStorage.removeItem("dealerledger")
    }
    this.token = localStorage.getItem('token');
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    console.log("status111", this.loginUserData);
    if ((this.token != undefined && this.token != '') && (this.loginUserData.user_type == 'Customer' || this.loginUserData.user_type == 'Guest')) {
      this.ItemsCount();
    }

    // if ((this.token != undefined && this.token != '') && (this.loginUserData.designation == 'Admin' )) {
    //   this.getNotificationCount();
    // }
    // if ((this.token != undefined && this.token != '') && (this.loginUserData.designation == 'Branch Manager' )) {
    //   this.getNotificationCount();
    // }
    if ((this.token != undefined && this.token != '') && (this.loginUserData.designation == 'Admin' || this.loginUserData.designation == 'Warehouse Manager' || this.loginUserData.designation == 'Branch Manager' || this.loginUserData.designation == 'Accounts Manager' || this.loginUserData.designation == 'Shopee Manager' || this.loginUserData.role == 'Marketing Manager' || this.loginUserData.role == 'Special')) {
      this.getNotificationCount();
    }
    if (this.loginUserData.user_type == 'Super' || this.loginUserData.designation == 'Admin') {
      this.postdataNotification1();
      // this.totallengthofgetpendinglist
      //this.postdataNotification2();
      this.postdataNotification3();
      this.postdataNotification4();
      this.postdataNotification5();
    }
    // if ((this.token != undefined && this.token != '') && (this.loginUserData.designation == 'Accounts Manager' || this.loginUserData.designation == 'Warehouse Manager')) {
    //   this.getNotificationCount();
    // }

    if ((this.token != undefined && this.token != '') && (this.loginUserData.role == 'Dealer')) {
      if (this.loginUserData.role == 'Dealer') {
        this.loginUserData.company_code = this.loginUserData.user_id + "@" + this.loginUserData.company_code
      }
      this.getNotificationCount();
    }

    // if (this.loginUserData.designation == 'Branch Manager') {
    //   this.loginUserData.display.map(item => {
    //     item.type = 'Admin'
    //   });
    // }   
    this.dashboard_icons();
  }
  gotourl() {
    this.route.navigate(['Dealer-Pricelist', 1]);
    // window.open(" https://gstbucket1.s3.ap-south-1.amazonaws.com/Powertexmodel/pricelist.pdf", '_blank')
  }
  cartItem_count: any;
  wishList_count: any;

  ItemsCount() {
    this.spinner.show();

    this.globalservive.getDatawithQueryParams1('4.4', this.loginUserData.user_id).subscribe((data) => {

      this.spinner.hide();
      this.cartItem_count = data['cartcount'];
      this.wishList_count = data['wishlist_count'];

    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  }

  gotoLogout() {

    this.spinner.show();
    var methodname = "logout/"
    var body = { "token": this.token }

    this.globalservive.postData(body, methodname).subscribe((data) => {

      this.spinner.hide();
      this.token = "";
      this.loginUserData = "";
      localStorage.clear();

      this.route.navigateByUrl('home');



    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  }
  warehousepackingcount: any
  warehousechallancount: any
  accountsinvoicecount: any
  branchgrncount: any
  branchstatuscount: any
  totaloutstandingamount: any;
  wherehousepackinglistcount: any;

  // =======================================================

  // detectArraylength1() {
  //   
  //   this.getinvoicelistcount1.length

  // }


  // constructor() {
  //   this.data.forEach((d) => {
  //     length = length + d.values.length;
  //   });
  //   console.log('length', length);
  // }
  // ===========================notification functionality1=================================
  getinvoicelistcount1: any
  totaal: any
  postdataNotification1() {


    this.globalservive.postdataonlywithmethod('get_pending_list').subscribe((resp) => {

      this.getinvoicelistcount1 = resp;
      this.totaal = this.getinvoicelistcount1.length

      //  this.totallengthofgetpendinglist = this.getinvoicelistcount1.length
      //  this.spinner.hide()
      // console.log('this is get_pending_list', this.getinvoicelistcount1)
      // console.log('this is the total count of get pending list', this.getinvoicelistcount1)


    },
      error => {
        //  this.spinner.hide()

        //  this.ngxSmartService.getModal('errorModal').open();

      }
    )
  }
  // ===========================notification functionality2===============================

  //  getsalesvsotschart2: any
  // totaal2:[]
  //  postdataNotification2(){


  //     this.globalservive.postdataonlywithmethod('get_sales_vs_outs_chart').subscribe((resp) => {

  //        this.getsalesvsotschart2=resp;
  //        this.totaal2 = this.getsalesvsotschart2.length



  //     },
  //     error => {    


  //     }
  //     )
  //   }
  // ===========================notification functionality3=================================
  getpackinglist3: any
  packingpacklist: any
  totaal3: any
  postdataNotification3() {


    this.globalservive.postdataonlywithmethod('get_packing_list').subscribe((resp) => {

      this.getpackinglist3 = resp;
      this.getpackinglist3.length;
      this.totaal3 = this.getpackinglist3.length



    },
      error => {
        //  this.spinner.hide()

        //  this.ngxSmartService.getModal('errorModal').open();

      }
    )
  }

  // ===========================notification functionality4=================================
  getinvoicelist4: any
  totaal4: any
  postdataNotification4() {
     this.spinner.show()
    this.globalservive.postdataonlywithmethod('get_invoice_list').subscribe((resp) => {
      this.getinvoicelist4 = resp;
      this.getinvoicelist4.length
      this.totaal4 = this.getinvoicelist4.length
        this.spinner.hide()
    },
      error => {
          this.spinner.hide()
          this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      }
    )
  }

	printreport(){
    localStorage.setItem('getinvoicelist4', JSON.stringify(this.getinvoicelist4));
    this.router.navigate(['/seeinvoice-list-print'])
  }


  // ===========================notification 5=================================
  getinvoicelist5: any
  postdataNotification5() {


    this.globalservive.postdataonlywithmethod('payment_history_sadmin').subscribe((resp) => {

      this.getinvoicelist5 = resp;
      // this.getinvoicelist5.length

      //console.log('payment_history_sadmin', this.getinvoicelist5)


    },
      error => {


        //  this.ngxSmartService.getModal('errorModal').open();

      }
    )
  }
  // =================redirection to customer ledger===============================
  dealerdata: any = []
  fromdates: any
  todates: any
  gotoledger() {
    var toDate = new Date()
    var priorDate = new Date('2020-04-01');
    this.fromdates = this.DatePipe.transform(priorDate, "yyyy-MM-dd")
    this.todates = this.DatePipe.transform(toDate, "yyyy-MM-dd")
    this.dealerdata.push({ 'companycode': this.masterData.giver_name + '-(' + this.masterData.giver_company_code + ')', 'fromdate': this.fromdates, 'todate': this.todates })
    localStorage.setItem('dealerledger', JSON.stringify(this.dealerdata))
    this.router.navigate(['customerledger'])
  }
  // ==================search functionality=====================
  tempvar: any
  searching: any
  resp1 = [];
  search_btn(search_val) {

    if (search_val == "" || search_val == undefined) {
      // alert('please enter some text to search')
      // this.ngxSmartService.getModal('emptysearcherror').open();
      this.dialog.open(ErrorModalComponent, {
        data: { emptysearcherror:true }
      });
    }
    else if (this.search_val != "") {
      this.globalservive.getDatawithMethodParams1('search', search_val).subscribe((resp1) => {

        this.searching = resp1
        $('#detail').modal('show');
      });
    }
  }
  // ========================================================

  getNotificationCount() {


    this.globalservive.getDatawithQueryParams1nd4('4.21', this.loginUserData.user_id, this.loginUserData.company_code).subscribe((data) => {
      this.totaloutstandingamount = data['outstanding'];
      this.branchstatuscount = data['status'];
      this.warehousepackingcount = data['packing'];
      this.warehousechallancount = data['challan'];
      this.accountsinvoicecount = data['inv'];
      this.branchgrncount = data['grn'];
      this.wherehousepackinglistcount = data['packing1'];



    },
      error => {
        // this.ngxSmartService.getModal('servererror').open();
        this.dialog.open(ErrorModalComponent, {
          data: { servererror:true }
        });


      }
    );
  };
  dashboard_icons() {

  }
}

