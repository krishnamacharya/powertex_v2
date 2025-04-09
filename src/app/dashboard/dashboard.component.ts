import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GlobalServiceService } from '../global-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false
})
export class DashboardComponent implements OnInit {
  token: string;
  loginUserData: any;
  math = Math;
  param1: any;
  loginUserid: any;
  search_val: string;
  masterData: any = {};
  notificationCount=0;
  // ngxSmartService: any;


  constructor(private DatePipe: DatePipe, private router: Router, public dialog: MatDialog,private route: Router, public globalservive: GlobalServiceService, private spinner: NgxSpinnerService) {
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

    // setInterval(() => {
    //   this.ngOnInit()
    // }, 900000)
  }

  ngOnInit() {
    this.from = new Date('2020-01-01')
    this.till = new Date()
    this.spinner.hide();
   // this.getNotificationCount1();
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
    if ((this.token != undefined && this.token != '') && (this.loginUserData.designation == 'Admin' || this.loginUserData.designation == 'Warehouse Manager' || this.loginUserData.designation == 'Branch Manager' || this.loginUserData.designation == 'Accounts Manager' || this.loginUserData.designation == 'Shopee Manager' || this.loginUserData.role == 'Marketing Manager' || this.loginUserData.role == 'Special' || this.loginUserData.role == 'Dealer')) {
      // commented for notification
     //  this.getNotificationCount1();
    }
    if(this.loginUserData.role == 'Dealer'){
      this.getNotificationCount1();
    }

    if(this.loginUserData.user_type== 'supplier'){
      this.loginUserid = this.loginUserData.user_id;
    }else{
      this.loginUserid = '';
    }

    if (this.loginUserData.user_type == 'Super') {
      this.postdataNotification1();
      // this.totallengthofgetpendinglist
      //this.postdataNotification2();
      this.postdataNotification3();
      this.postdataNotification4();
      this.postdataNotification5();

    }
    if (this.loginUserData.user_type == 'supplier') {
      this.getdashcount();
      this.MarkqueeText();
     // this.getorders();
      // this.getproductsdata();
      // this.getinvoicedata();
      // this.getorders2nd();
      // this.getpaymentslist();
     // this.getpendingdoc();
      // this.getgeneratedinvoice();
      // this.getSupplierSuppLedger();
      // this.getSupplierInvList();
    //  this.getCorrectioncount();
      // this.getinvoicedatadocuploadcount();
      this.getpendingdata();
    }


    if (this.loginUserData.user_type == 'Admin') {
      this.getdashcount();
     // this.getordersonetwo();
      // this.getinvoicedatathree();
      // this.getinvoicedatainadmin();
      // this.getPendingPaymentsadminsum();
      //this.getPendingdocsadminsum();
      // this.getSupPaymentsadminsum();
      // this.getPendingDutyListadminsum();
      // this.getpeningdoclistcount();
      // this.getpendingdutylist();
      // this.getPendingPaymentscountadmin();
      // this.getSPendingPackingListadmin();
      // this.getSupplierInvList();
     // this.getCorrectioncount();
     this.getpendingdata();
    }


    if (this.loginUserData.user_type == 'cha') {
      // this.getdashcount();
      this.getpendinginDoc();
      // this.getCompletedinDoc();
      // this.getinvoicedatasv();
      this.getChaCorrectioncount();
      this.getChaTrackReportCount();
      // this.getBlDetrailsEntryCount();
      // this.getChaOnPortSummaryCount();
      // this.getChaInvoicesCount();
     
    }

    // if ((this.token != undefined && this.token != '') && (this.loginUserData.designation == 'Accounts Manager' || this.loginUserData.designation == 'Warehouse Manager')) {
    //   this.getNotificationCount();
    // }

    if ((this.token != undefined && this.token != '') && (this.loginUserData.role == 'Dealer')) {
      if (this.loginUserData.role == 'Dealer') {
        this.loginUserData.company_code = this.loginUserData.user_id + "@" + this.loginUserData.company_code
      }
      // commented for notification
      // this.getNotificationCount();
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
        // //this.ngxSmartService.getModal('errorModal').open();
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
        // //this.ngxSmartService.getModal('errorModal').open();
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
  totaloutstandingamount1: any;
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

        //  //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });

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

        //  //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });

      }
    )
  }

  // ====================================================
  supplierpaymentsadmin: any;
  supplierpaymentsadmincount: any;

  getPendingPaymentscountadmin() {

    this.globalservive.getMethodData('sup/suppaymentlist/').subscribe((data) => {
      this.supplierpaymentsadmin = data;
      this.supplierpaymentsadmin.length
      this.supplierpaymentsadmincount = this.supplierpaymentsadmin.length
    },
      error => {

        // console.log(error);
      });
  };
    // ====================================================
    SPendingPackingListcnt: any;
    SPendingPackingList: any;
  
    getSPendingPackingListadmin() {
  
      this.globalservive.getMethodData('sup/pendingpackinglist/').subscribe((data) => {
        this.SPendingPackingListcnt = data;
        this.SPendingPackingListcnt.length
        this.SPendingPackingList = this.SPendingPackingListcnt.length
      },
        error => {
  
          // console.log(error);
        });
    };
  
  // ===========================================================
  // ===========================notification functionality4=================================
  getinvoicelist4: any
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

        //  //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });

      }
    )
  }
  //  ==================admin==sup pending payment count=============================
  PendingPaymentsadmin: any
  PendingPaymentcountAdmin: any

  getPendingPaymentsadminsum() {

    this.globalservive.getMethodData('sup/Supplierpenlist/').subscribe((data) => {
      this.PendingPaymentsadmin = data;
      this.PendingPaymentsadmin.length
      this.PendingPaymentcountAdmin = this.PendingPaymentsadmin.length
    },
      error => {

        // console.log(error);
      });
  };

  //  ==================admin==sup pending payment count=============================
  Pendingdocsadmin: any
  PendingDocAdmin: any

  getPendingdocsadminsum() {

    this.globalservive.getMethodData('sup/pendinggeninvoices/').subscribe((data) => {
      this.Pendingdocsadmin = data;
      this.Pendingdocsadmin.length
      this.PendingDocAdmin = this.Pendingdocsadmin.length
    },
      error => {

        // console.log(error);
      });
  };

  //  ==================admin==sup pending payment count=============================
  supplierpaymtsadmin: any
  SupPaymentsAdmincount: any

  getSupPaymentsadminsum() {

    this.globalservive.getMethodData('sup/pendingpaymentlist/').subscribe((data) => {
      this.supplierpaymtsadmin = data;
      this.supplierpaymtsadmin.length
      this.SupPaymentsAdmincount = this.supplierpaymtsadmin.length
    },
      error => {

        // console.log(error);
      });
  };

  //  ==================admin==sup pending payment count=============================
  PendingDutyListadmin: any
  PendingDutyList: any

  getPendingDutyListadminsum() {

    this.globalservive.getMethodData('sup/pendingdutylist/').subscribe((data) => {
      this.PendingDutyListadmin = data;
      this.PendingDutyListadmin.length
      this.PendingDutyList = this.PendingDutyListadmin.length
    },
      error => {

        // console.log(error);
      });
  };


  //  ==================admin==sup payment count=============================
  Paymentpaidadmin: any
  PaymentpaidcountAdmin: any

  getPaymentpaidadminsum() {

    this.globalservive.getMethodData('sup/suppaymentlist/').subscribe((data) => {
      this.Paymentpaidadmin = data;
      this.Paymentpaidadmin.length
      this.PaymentpaidcountAdmin = this.Paymentpaidadmin.length
    },
      error => {

        // console.log(error);
      });
  };


  //  ==================Pending DOC List=============================

  PendingPaymentsadmindoc: any
  PendingPaymentcountAdmindoc: any

  getpeningdoclistcount() {

    this.globalservive.getDatawithMethodParams1('sup/pendinggeninvoices/', this.loginUserData.user_id).subscribe((data) => {
      this.PendingPaymentsadmindoc = data;
      this.PendingPaymentsadmindoc.length
      this.PendingPaymentcountAdmindoc = this.PendingPaymentsadmindoc.length
    },
      error => {

        // console.log(error);
      });
  };

  //  ==================Pending Duty List=============================

  Pendingdutyadmindoc: any
  PendingdutycountAdmindoc: any

  getpendingdutylist() {

    this.globalservive.getMethodData('sup/pendingdutylist/').subscribe((data) => {
      this.Pendingdutyadmindoc = data;
      this.Pendingdutyadmindoc.length
      this.PendingdutycountAdmindoc = this.Pendingdutyadmindoc.length
    },
      error => {

        // console.log(error);
      });
  };
// ---------------------------------------------------------------------------------------------------------------------------------------------------
                                                // CHA Count
// ---------------------------------------------------------------------------------------------------------------------------------------------------

   //  ===================CHA total count 1st============================
   pendoclist: any;
   pendoclist1: any;
   pendinginDoc: any;
   comdocList: any;
   CompletedinDoc: any;
   ChaBlDetrailsEntrysum1: any
   ChaBlDetrailsEntrysum: any
   ChaBlDetrailsEntryCount: any
   ChaInvoicessum1: any;
   ChaInvoicessum: any;
   ChaInvoicesCount: any
   getpendinginDoc() {
 
     this.globalservive.getDatawithMethodParams2("sup/documenton/",this.loginUserData.shipment_point,'').subscribe((data:any) => {
  // ------------------Cha Pending Shipment List Count---------------------------
       this.pendoclist1 = data.filter((e) => { return e.Status == 0 }) 
       this.pendoclist = this.pendoclist1.filter((e) => { return e.doc1 != null || e.doc2 != null || e.doc3 != null || e.doc5 != null })
       this.pendoclist.length
       this.pendinginDoc = this.pendoclist.length 
  // ------------------Cha Bl Detrails Entry Count---------------------------
       this.ChaBlDetrailsEntrysum1 = data.filter((e) => { return e.Status == 0 }) 
       this.ChaBlDetrailsEntrysum = this.ChaBlDetrailsEntrysum1.filter((e) => { return e.doc1 != null || e.doc2 != null || e.doc3 != null })
       this.ChaBlDetrailsEntrysum.length
       this.ChaBlDetrailsEntryCount = this.ChaBlDetrailsEntrysum.length 
  // ------------------Cha Completed Shipment List Count---------------------------
       this.comdocList = data.filter((e) => { return e.Status == 1})
       this.comdocList.length
       this.CompletedinDoc = this.comdocList.length
  // ------------------Cha Invoices Count---------------------------
       this.ChaInvoicessum1 = data.filter((e) => { return e.Status == 1})
       this.ChaInvoicessum = this.ChaInvoicessum1.filter((e) => { return e.bill_no == null}) 
       this.ChaInvoicessum.length
       this.ChaInvoicesCount = this.ChaInvoicessum.length 
 
     },
       error => {
 
         // console.log(error);
       });
   };

  // ------------------Cha On-Port Summary Count And Track Report Count---------------------------

  ChaTrackReportsum: any
  ChaTrackReportCount: any
  ChaOnPortSummaryCount: any

  getChaTrackReportCount() {

    this.globalservive. getMethodData('sup/trackcha/').subscribe((data) => { 
      this.ChaTrackReportsum = data
      this.ChaTrackReportsum.length
      this.ChaTrackReportCount = this.ChaTrackReportsum.length
      this.ChaOnPortSummaryCount = this.ChaTrackReportsum.length 
    },
      error => {

        // console.log(error);
      });
  };

      // ------------------Cha Correction Count---------------------------
      ChaCorrectioncount: any
      ChaCorrectioncountsum: any
    
      getChaCorrectioncount() {
    
        this.globalservive.getDatawithMethodParams2("sup/documenton/",'','').subscribe((data: any) => {
            this.ChaCorrectioncountsum = data.filter((e) => { return (e.invmodpath != null || e.packmodpath != null) && (e.be_no == null)});
          this.ChaCorrectioncountsum.length
          this.ChaCorrectioncount = this.ChaCorrectioncountsum.length
        },
          error => {
    
            // console.log(error);
          });
      };
    // //  ===================CHA total count 2st============================

    // getCompletedinDoc() {
  
    //   this.globalservive.getDatawithMethodParams2("sup/documenton/",this.loginUserData.shipment_point,'').subscribe((data:any) => {
    //     this.comdocList = data.filter((e) => { return e.Status == 1})
    //     this.comdocList.length
    //     this.CompletedinDoc = this.comdocList.length
  
    //   },
    //     error => {
  
    //       // console.log(error);
    //     });
    // };

  //  ===================supplier total count 1st============================
  orders: any
  suppliercount1: any
  getorders() {

    this.globalservive.getDatawithMethodParam1("sup/poqhdrdata/", 0).subscribe((data) => {
      this.orders = data

      this.orders.length
      this.suppliercount1 = this.orders.length

    },
      error => {

        // console.log(error);
      });
  };
  // =========================2nd===========================
  supplierdata: any
  suppliercount: any
  getproductsdata() {

    this.globalservive.getDataOnlyWithMethod("sup/allinvoicerequestdata").subscribe((data: any) => {

      this.supplierdata = data
      this.supplierdata.length
      this.suppliercount = this.supplierdata.length

    },
      error => {

        // console.log(error);
      });
  };

  // ======================supplier 3rd===============================
  supplierdatathree: any
  supplierdatathreecount: any
  getinvoicedata() {


    this.globalservive.getDatawithMethod1("sup/pendingpackinglist/").subscribe((data) => {
      this.supplierdatathree = data
      this.supplierdatathree.length
      this.supplierdatathreecount = this.supplierdatathree.length





    },
      error => {



      });
  };

  // ==================================4th========================================

  ordersone: any
  suppliercount1one: any
  getorders2nd() {


    this.globalservive.getDatawithMethodParam1("sup/poqhdrrevaiseddata/", 0).subscribe((data) => {
      this.ordersone = data

      this.ordersone.length
      this.suppliercount1one = this.ordersone.length

    },
      error => {

        // console.log(error);
      });
  };
  // ==================================5th========================================

  pendingpaymentlist: any
  pendingpaylist: any
  getpaymentslist() {


    this.globalservive.getMethodData('sup/pendingpaymentlist/').subscribe((data) => {
      this.pendingpaymentlist = data

      this.pendingpaymentlist.length
      this.pendingpaylist = this.pendingpaymentlist.length

    },
      error => {

        // console.log(error);
      });
  };
  //==========================6th==========================================
  pendingdoc: any
  pendingdoclist: any
  getpendingdoc() {

    this.globalservive.getDatawithMethodParams1('sup/pendinggeninvoices/', this.loginUserData.user_id).subscribe((data) => {
      this.pendingdoc = data
      this.pendingdoclist = this.pendingdoc.length

    },
      error => {


        // console.log(error);
      });
  };

  //==========================7th==========================================
  generatedinvoice: any
  generatedinvoicelist: any
  getgeneratedinvoice() {

    this.globalservive.getDatawithMethod1("sup/documentslist/").subscribe((data: any) => {
      const resp = data.filter((e) => { return e.doc1 != null && e.doc2 != null && e.doc3 != null && e.doc5 != null })
      this.generatedinvoice = resp
      this.generatedinvoicelist = this.generatedinvoice.length

    },
      error => {


        // console.log(error);
      });
  };

  // ==================================8th========================================

  supSuppliersLedger: any
  SuppliersLedger: any
  getSupplierSuppLedger() {


    this.globalservive.getDatawithMethodParams1("sup/payments/", this.loginUserData.user_id).subscribe((data) => {
      this.supSuppliersLedger = data

      this.supSuppliersLedger.length
      this.SuppliersLedger = this.supSuppliersLedger.length

    },
      error => {

        // console.log(error);
      });
  };
  // ==================================9th========================================

  supInvregList: any
  supplierinvlistcount: any
  from :any
  till :any
  getSupplierInvList() {

    this.from = this.DatePipe.transform(this.from, "yyyy-MM-dd");
    this.till = this.DatePipe.transform(this.till, "yyyy-MM-dd");
    this.globalservive.getDatawithMethodParams3('sup/getsupinvregister/', this.loginUserid, this.from, this.till).subscribe((data) => {
      this.supInvregList = data

      this.supInvregList.length
      this.supplierinvlistcount = this.supInvregList.length

    },
      error => {

        // console.log(error);
      });
  };

  // =======================================================
  // invoicedatadocupload: any
  // invoicedatadoccountings: any
  // getinvoicedatadocuploadcount() {

  //   this.globalservive.getDatawithMethodParams1("sup/invoice/", "abc").subscribe((data: any) => {
  //     this.invoicedatadocupload = data
  //     this.invoicedatadocupload.length
  //     this.invoicedatadoccountings = this.invoicedatadocupload.length
  //   },
  //     error => {
// 

  //     });
  // };


  //==========================5th==========================================
  ordersonetwo: any
  suppliercount1onetwo: any
  getordersonetwo() {

    this.globalservive.getDatawithMethodParam1("sup/poqhdrdata/", 0).subscribe((data) => {
      this.ordersonetwo = data
      this.suppliercount1onetwo = this.ordersonetwo.length

    },
      error => {


        // console.log(error);
      });
  };

  // ===========================================================
  supplierdatacountthreesum: any
  supplierdatacountthree: any
  getinvoicedatathree() {


    this.globalservive.getDatawithMethod1("sup/documentslist/").subscribe((data: any) => {
      // const resp = data.filter((e) => { return e.doc1 != null && e.doc2 != null && e.doc3 != null && e.doc5 != null })
      const resp = data.filter((e) => { return e.doc1 != null || e.doc2 != null || e.doc3 != null || e.doc5 != null })
      this.supplierdatacountthree = resp
      this.supplierdatacountthree.length
      this.supplierdatacountthreesum = this.supplierdatacountthree.length

    },
      error => {

        // console.log(error);
      });
  };
  // ============================================================
  // ===========================================================

  supplierdatacountfoursum: any
  supplierdatacountfour: any
  getinvoicedatainadmin() {


    this.globalservive.getDataOnlyWithMethod("sup/allinvoicerequestdata").subscribe((data) => {
      // this.supplierdata = data.filter((e) => {
      //   return e.profomaid != undefined || e.profomaid != null
      // })
      this.supplierdatacountfour = data
      this.supplierdatacountfour.length
      this.supplierdatacountfoursum = this.supplierdatacountfour.length

    },
      error => {

        // console.log(error);
      });
  };
  // ============================================================
  // ===========================notification 5=================================
  getinvoicelist5: any
  postdataNotification5() {


    this.globalservive.postdataonlywithmethod('payment_history_sadmin').subscribe((resp) => {

      this.getinvoicelist5 = resp;
      // this.getinvoicelist5.length

      //console.log('payment_history_sadmin', this.getinvoicelist5)


    },
      error => {


        //  //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });

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
      this.dialog.open(ErrorModalComponent, {
        data: { emptysearcherror:true }
      });
      // this.ngxSmartService.getModal('emptysearcherror').open();
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
        this.dialog.open(ErrorModalComponent, {
          data: { servererror:true }
        });
        // this.ngxSmartService.getModal('servererror').open();


      }
    );
  };



  getNotificationCount1() {

//alert("totaloutstandingamount1");
    this.globalservive.getcheckdata("get_outstanding/", this.loginUserData.user_id).subscribe((data) => {
      // this.totaloutstandingamount1 = data['outstanding'];
      this.totaloutstandingamount1 = data[0]['Outstanding'];
   //   console.log(data[0]['Outstanding'],data,"outstaNDING");



    },
      error => {
        this.dialog.open(ErrorModalComponent, {
          data: { servererror:true }
        });
        // this.ngxSmartService.getModal('servererror').open();


      }
    );
  };












  dashboard_icons() {

  }
  pendingdata : any;
  getpendingdata() {
    this.globalservive.getcheckdata("sup/getsupoutstanding/",this.loginUserData.user_id).subscribe((data) => {
      this.pendingdata = data;
    });
  }
  marque : any = [];
  MarkqueeText(){
    this.globalservive.getDatawithMethod1("sup/markqlist/").subscribe((data) => {
      this.marque = data;
    });
  }
  // ------------------Correction Count---------------------------
  Correctioncount: any
  Correctioncountsum: any

  getCorrectioncount() {

    this.globalservive.getDatawithMethodParams2("sup/documenton/",'',this.loginUserid).subscribe((data: any) => {
        this.Correctioncountsum = data.filter((e) => { return (e.invmodpath != null || e.packmodpath != null) && (e.be_no == null)});
      this.Correctioncountsum.length
      this.Correctioncount = this.Correctioncountsum.length
    },
      error => {

        // console.log(error);
      });
  };


  
  // ------------------Dashboard Count---------------------------

  dashcnt: any = [];
  getdashcount() {
      this.from = this.DatePipe.transform(this.from, "yyyy-MM-dd");
      this.till = this.DatePipe.transform(this.till, "yyyy-MM-dd");

      this.globalservive.getDatawithMethodParams3("sup/dashboardcountlist/",'', this.from, this.till).subscribe((data) => {
      this.dashcnt = data
      console.log(this.dashcnt,'dashcnt')
    },
      error => {

        console.log(this.dashcnt,'error')

        // console.log(error);
      });
  };

}
