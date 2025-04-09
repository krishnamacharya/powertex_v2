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
  selector: 'app-seepacking-list',
  standalone: false,
  templateUrl: './seepacking-list.component.html',
  styleUrls: ['./seepacking-list.component.scss']
})
export class SeepackingListComponent implements OnInit {
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
  getinvoicelist3: any;
  // ngxSmartService: any;


  constructor(private DatePipe: DatePipe, private router: Router, private dialog: MatDialog, private bnIdle: BnNgIdleService, private route: Router, public globalservive: GlobalServiceService, private spinner: NgxSpinnerService) {
   
  }

  ngOnInit() {
    this.spinner.hide();

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

    if ((this.token != undefined && this.token != '') && (this.loginUserData.designation == 'Admin' || this.loginUserData.designation == 'Warehouse Manager' || this.loginUserData.designation == 'Branch Manager' || this.loginUserData.designation == 'Accounts Manager' || this.loginUserData.designation == 'Shopee Manager' || this.loginUserData.role == 'Marketing Manager' || this.loginUserData.role == 'Special')) {
      this.getNotificationCount();
    }
    if (this.loginUserData.user_type == 'Super' || this.loginUserData.designation == 'Admin') {
      this.postdataNotification1();
     
      this.postdataNotification3();
      this.postdataNotification4();
      this.postdataNotification5();
    }
  
    if ((this.token != undefined && this.token != '') && (this.loginUserData.role == 'Dealer')) {
      if (this.loginUserData.role == 'Dealer') {
        this.loginUserData.company_code = this.loginUserData.user_id + "@" + this.loginUserData.company_code
      }
      this.getNotificationCount();
    }

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

  printreport(){
    localStorage.setItem('getpackinglist3', JSON.stringify(this.getpackinglist3));
    this.router.navigate(['/seepacking-list-print'])
  }

  warehousepackingcount: any
  warehousechallancount: any
  accountsinvoicecount: any
  branchgrncount: any
  branchstatuscount: any
  totaloutstandingamount: any;
  wherehousepackinglistcount: any;

 
  // ===========================notification functionality1=================================
  getinvoicelistcount1: any
  totaal: any
  postdataNotification1() {


    this.globalservive.postdataonlywithmethod('get_pending_list').subscribe((resp) => {

      this.getinvoicelistcount1 = resp;
      this.totaal = this.getinvoicelistcount1.length

    },
      error => {
        //  this.spinner.hide()

        //  this.ngxSmartService.getModal('errorModal').open();

      }
    )
  }
  // ===========================notification functionality3=================================
  getpackinglist3: any
  packingpacklist: any
  totaal3: any
  postdataNotification3() {

    this.spinner.show();
    this.globalservive.postdataonlywithmethod('get_packing_list').subscribe((resp) => {
    //  alert("call spin");
     
      this.getpackinglist3 = resp;
      this.getpackinglist3.length;
      this.totaal3 = this.getpackinglist3.length
      this.spinner.hide();



    },
      error => {
          this.spinner.hide()

          this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });

      }
    )
  }

  // ===========================notification functionality4=================================
  getinvoicelist4: any;
  totaal4: any
  postdataNotification4() {
    // this.spinner.show()

    this.globalservive.postdataonlywithmethod('get_invoice_list').subscribe((resp) => {

      this.getinvoicelist4 = resp;
      this.getinvoicelist4.length
      this.totaal4 = this.getinvoicelist4.length
      //  this.spinner.hide()
      //console.log('this is get_invoice_list', this.getinvoicelist4)


    },
      error => {
        //  this.spinner.hide()

        //  this.ngxSmartService.getModal('errorModal').open();

      }
    )
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
          data: { errorModal:true }
        });


      }
    );
  };
  dashboard_icons() {

  }
}
