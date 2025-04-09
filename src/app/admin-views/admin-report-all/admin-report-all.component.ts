import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalServiceService } from '../../global-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from '../../toastr-service.service';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import moment from 'moment';

// import * as jsPDF from 'jspdf';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: '',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-admin-report-all',
  standalone: false,
  templateUrl: './admin-report-all.component.html',
  styleUrls: ['./admin-report-all.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AdminReportAllComponent implements OnInit {
  currentmonth: number = 0
  searchText: any;
  amount: any

  @Input() public type: any;
  brand: any;
days: any;
  ngOnChanges() {
    this.resources2 = [];
    this.searchText = ''
    this.fromdate = '';
    this.tilldate = '';
    this.branch = undefined;
    this.dealer = undefined;
    this.shopee = undefined;
    this.month = undefined;
    this.year = undefined;

    if (this.type == 'Stock') {

    this.spinner.show();
    this.cdate = this.DatePipe.transform(new Date(), "yyyy-MM-dd");
    this.currentmonth = new Date().getUTCMonth() + 1
      this.fromdate = new Date().getUTCFullYear() + "-" + this.currentmonth + "-" + "01";
      this.tilldate = new Date().getUTCFullYear() + "-" + this.currentmonth + "-" + new Date().getUTCDate();

      // return this.service.getDataadminreport('repo', this.fromdate, this.tilldate, 'HYD_MAIN', '', '', '', 'Stock', 'P', '').subscribe((resp) => {
        return this.service.getDatawithMethodParams5('getstockr/', '', '', this.cdate,'' , '').subscribe((resp) => {
          // return this.service.getDatawithMethodParams3("sup/orderplain/", '','', '').subscribe((resp) => {

        this.spinner.hide();

        this.resources2 = resp;
        this.company_code = ""
        console.log("this.resources2", this.resources2);
        this.count = this.resources2.length
        this.companycode = this.company_code;
     /*  this.companycode='' */;
        if (this.resources2.length > 0) {
          this.toasterService.success('TOTAL COUNT FOR THE SELECTED CATEGORY IS ' + '  ' + this.count);
          this.typename = 'Stock'
        }
        if (this.resources2.length <= 0) {
          this.toasterService.warning("no records present")
        }
        this.types = 'Stock';
      },
        error => {
          this.spinner.hide();
        });
    }
    if (this.type == 'Market') {

      this.getmarketreports()
    }

  }
  marketingproducts: any = []
  pageya: any = 1;
  p: any = 1
  s: any = 1
  g: any = 1
  i: any = 1
  o: any = 1
  page: any = 1
  n: any = 1
  m: any = 1
  Page: any = 1
  page1: any = 1
  constructor(private DatePipe: DatePipe, private router: Router, private route: ActivatedRoute, private dialog: MatDialog, private service: GlobalServiceService, private spinner: NgxSpinnerService, private toasterService: ToasterService) {

  }
  math = Math;
  resources2: any = [];
  d: any;
  e: any;
  companycode: any;
  branchcode: any;
  resource3: any = [];
  company_code: any;
  category: any;
  subcategory: string;
  types: any;
  view_d: any = [];
  Role: string;
  branchesList: any;
  // type: any;
  count: any;
  years = [];
  name: any;
  sampleTime: any
  Category: any;

  // getDates() {
  today = new Date('yyyy-MM-01');
  min = new Date('2019-mm-01');
  max = new Date('3000-mm-01');
  date = new FormControl(moment());
  year: any;
  month: any;
  fromdate: any;
  tilldate: any;
  company: any;
  branch: any;
  shopee: any;
  dealer: any;
  model: any;
  selected: any;
  chosenYearHandler(normalizedYear: moment.Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);

  }

  chosenMonthHandler(normalizedMonth: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }
  itemsPerPage = 20;
  itemsPerPagee(itemsPerPage) {
    this.itemsPerPage = itemsPerPage
  }
  months = [
    { val: '01', name: 'Jan' },
    { val: '02', name: 'Feb' },
    { val: '03', name: 'Mar' },
    { val: '04', name: 'Apr' },
    { val: '05', name: 'May' },
    { val: '06', name: 'Jun' },
    { val: '07', name: 'Jul' },
    { val: '08', name: 'Aug' },
    { val: '09', name: 'Sep' },
    { val: '10', name: 'Oct' },
    { val: '11', name: 'Nov' },
    { val: '12', name: 'Dec' }
  ];
  onPageChange(Page: number) {
    this.Page = Page;
    window.scrollTo(0, 0);
  }
  getDates() {
    this.years = []
    var date = new Date();
    var currentYear = date.getFullYear();
    currentYear = currentYear
    for (var i = 0; i <= 10; i++) {
      this.years.push(currentYear - i);
    }
  }
  fromdates: any
  tilldates: any
  getbothdates(days) {
    var today = new Date()
    var priorDate = new Date();
    priorDate.setDate(priorDate.getDate() - days)
    this.fromdates = this.DatePipe.transform(priorDate, "yyyy-MM-dd")
    this.tilldates = this.DatePipe.transform(today, "yyyy-MM-dd")
    console.log(this.fromdates, this.tilldates, "days")
  }

  market_manager_list: any
  getmarketing_manager(param1): any {

    if (param1 == undefined) {
      param1 = this.loginUserData.company_code
    }
    return this.service.getDatawithMethodParams1("market/manager_drop/", param1).subscribe(data => {
      this.market_manager_list = data;
      console.log("marketing", this.market_manager_list);


    })

  }
  urldata: any = {}
  cdate: any;
  typename: any;
  param: any;
  totaloutstanding: any
  resources3: any
  getDataadminreport(year, month, fromdate, tilldate, company, branch, shopee, dealer, type, Category, SubCategory, model) {

      this.cdate = this.DatePipe.transform(new Date(), "yyyy-MM-dd");
    // if(!month){
    //   if(!year){
    //     this.cdate = this.DatePipe.transform(new Date(), "yyyy-MM-dd");
    //   }else{
    //     this.cdate = year + "-" + new Date().getMonth() + "-" + new Date().getUTCDate();
    //   }
    // }else{
    //   if(!year){
    //     this.cdate = new Date().getUTCFullYear() + "-" + month + "-" + new Date().getUTCDate();
    //   }else{
    //     this.cdate = year + "-" + month + "-" + new Date().getUTCDate();
    //   }
    // }

    this.totaloutstanding = ''

    if (this.loginUserData.role == 'Dealer' && type == "PO") {
      this.company_code = this.loginUserData.user_id + "@" + this.loginUserData.company_code;
      this.param = "";
    }
    else if (this.loginUserData.role == 'Shopee Manager' && type == "PO" || type == "GRN" || type == "Stock" || type == "Outstanding" || type == "Packing") {
      if (company == "" || company == undefined) {
        this.company_code = this.loginUserData.company_code
      }
      this.param = "";
    }
    else if (this.loginUserData.role == 'Branch Manager' && type == "PO" || type == "GRN" || type == "Stock" || type == "Outstanding" || type == "Packing") {
      if (company == "" || company == undefined) {
        this.company_code = this.loginUserData.company_code
      }
      this.param = "";
    }
    else if (this.loginUserData.role == 'Admin' && type == "PO" || type == "GRN" || type == "Stock" || type == "Outstanding" || type == "Packing") {

      if (company == "") {
        this.company_code = this.loginUserData.company_code
      }
      this.param = "";
    }

    else if (this.loginUserData.user_type == 'Super' && type == "PO" || type == "GRN" || type == "Stock" || type == "Outstanding" || type == "Packing") {

      if (company == "" || company == undefined) {

        this.company_code = this.loginUserData.company_code
      }
      this.param = "";
    }


    if (this.loginUserData.role == 'Dealer' && type == "Inv") {

      this.company_code = this.loginUserData.user_id + "@" + this.loginUserData.company_code;
      this.param = "P";
    }
    else if (this.loginUserData.role == 'Shopee Manager' && type == "Inv") {

      if (company == "" || company == undefined) {
        this.company_code = this.loginUserData.company_code
      }
      this.param = "P";
    }
    else if (this.loginUserData.role == 'Branch Manager' && type == "Inv") {
      if (company == "" || company == undefined) {
        this.company_code = this.loginUserData.company_code
      }
      this.param = "P";
    }
    else if (this.loginUserData.role == 'Admin' && type == "Inv") {
      if (company == "") {
        this.company_code = this.loginUserData.company_code
      }
      this.param = "P";
    }
    else if (this.loginUserData.user_type == 'Super' && type == "Inv") {

      if (company == "" || company == undefined) {

        this.company_code = this.loginUserData.company_code
      }
      this.param = "P";
    }


    this.spinner.show();
    if (type != 'Stock') {
      fromdate = this.DatePipe.transform(fromdate, "yyyy-MM-dd");
      tilldate = this.DatePipe.transform(tilldate, "yyyy-MM-dd");
    }
    if (type == 'Stock') {

      // fromdate = year + "-" + month + "-" + "01";
      // tilldate = year + "-" + month + "-" + new Date().getDay();

    }
    if (dealer != undefined && dealer != null) {

      this.company_code = dealer;
    }
    else if (shopee != undefined && shopee != null) {
      this.company_code = shopee;
    }
    else if (branch != undefined && branch != null) {

      this.company_code = branch;

    }
    else if (company != undefined && company != null) {
      this.company_code = company;
    }

    if (Category == undefined) {
      Category = ''
    }

    if (SubCategory == undefined) {
      SubCategory = ''
    }
    if (model == undefined) {
      model = ''
    }
    // if (type == 'Stock' && year == undefined) {
    //   this.toasterService.error("Please Select Year !")

    // }
    // if (type == 'Stock' && month == undefined) {
    //   this.toasterService.error("Please Select Month !")

    // }
    // if (type == 'Stock' && type == undefined) {
    //   this.toasterService.error("Please Select Type of Report !")

    // }
    if (tilldate == undefined) {

      this.toasterService.error("Select To Date !")
    }
    if (fromdate == undefined) {

      this.toasterService.error("Select from Date !")
    }
    if (this.type == undefined) {
      this.toasterService.error("Select Type of Report !")
    }
    if (this.company_code == undefined) {
      this.toasterService.error("Select Company Code !")
    }


    if (this.company_code == company && type != 'Stock' && type != 'Outstanding' && type != 'Packing') {
      return this.service.getDatamainadminreport('repo', fromdate, tilldate, this.company_code, Category, SubCategory, model, type, 'A', this.param).subscribe((resp) => {

        this.spinner.hide();

        this.resources2 = resp;
        this.company_code = ""
        //  this.view_d=""
        console.log("this.resources2", this.resources2);
        this.count = this.resources2.length
        this.companycode = this.company_code;
     /*  this.companycode='' */;
        if (this.resources2.length > 0) {
          this.toasterService.success('TOTAL COUNT FOR THE SELECTED CATEGORY IS ' + '  ' + this.count);
          this.typename = type
          // this.urldata={'fromdate':fromdate,'tilldate':tilldate,'type':type}
          // localStorage.setItem('urldata',JSON.stringify(this.urldata))
        }
        if (this.resources2.length <= 0) {
          this.toasterService.warning("no records present")
        }
        this.types = type;
      },
        error => {
          this.spinner.hide();
        });
    }
    else {


      if(type != 'Stock'){
        if (dealer || shopee) {
          this.param = "p"
        }
        return this.service.getDataadminreport('repo', fromdate, tilldate, this.company_code, Category, SubCategory, model, type, 'P', this.param).subscribe((resp) => {
  
          this.spinner.hide();
  
          this.resources2 = resp;
          if (shopee) {
            this.totaloutstanding = this.resources2.filter((item) => item.Outstanding_amount)
              .map((item) => +item.Outstanding_amount)
              .reduce((sum, current) => sum + current);
          }
          if(type == 'Outstanding'){
            this.totaloutstanding = this.resources2.map(a => parseInt(a.Outstanding_amount?a.Outstanding_amount:'0')).reduce(function (a, b) {
              return a + b;
            });
          }
          this.resources3 = this.resources2.filter((e) => { return e.Outstanding_amount != 0}) 
          this.company_code = ""
          console.log("this.resources2", this.resources2);
          this.count = this.resources2.length
          this.companycode = this.company_code;
       /*  this.companycode='' */;
          // if (this.resources2.length > 0) {
          //   this.toasterService.success('TOTAL COUNT FOR THE SELECTED CATEGORY IS ' + '  ' + this.count);
          //   this.typename = type
          // }
          if (this.resources2.length <= 0) {
            this.toasterService.warning("no records present")
          }
          this.types = type;
        },
          error => {
            this.spinner.hide();
          });
      }
      if(type == 'Stock'){
////////

return this.service.getDatawithMethodParams5('getstockr/', Category, SubCategory, this.cdate,this.brand?this.brand:'' , tilldate).subscribe((resp) => {
// return this.service.getDatawithMethodParams3("sup/orderplain/", '',Category, SubCategory).subscribe((resp) => {
          
          this.spinner.hide();

          this.resources2 = resp;
          if (shopee) {
            this.totaloutstanding = this.resources2.filter((item) => item.Outstanding_amount)
              .map((item) => +item.Outstanding_amount)
              .reduce((sum, current) => sum + current);
          }
          this.company_code = ""
          console.log("this.resources2", this.resources2);
          this.count = this.resources2.length
          this.companycode = this.company_code;
        /*  this.companycode='' */;
          if (this.resources2.length > 0) {
            this.toasterService.success('TOTAL COUNT FOR THE SELECTED CATEGORY IS ' + '  ' + this.count);
            this.typename = type
          }
          if (this.resources2.length <= 0) {
            this.toasterService.warning("no records present")
          }
          this.types = type;
        },
          error => {
            this.spinner.hide();
          });




        //////
      }

      
    }


  }
  getnotsoldreport(type) {

    this.spinner.show();
    return this.service.getDatawithMethodParams3('saleproducts/', 'HYD_MAIN', this.fromdates, this.tilldates).subscribe((resp) => {

      this.spinner.hide();

      this.resources2 = resp;
      this.count = this.resources2.length
      if (this.resources2.length > 0) {
        this.toasterService.success('TOTAL COUNT FOR THE SELECTED CATEGORY IS ' + '  ' + this.count);
        this.typename = type
      }
      if (this.resources2.length <= 0) {
        this.toasterService.warning("no records present")
      }
      this.types = type;
    })
  }

  catAttrGet: any;
  selectSubcat(data) {
    this.subcategory = data;
    this.catAttrGet();
  }


  param1: any;
  branchdata: any = []
  getBranchDropdown(param1) {

    this.spinner.show();
    return this.service.getDatawithQueryParams2('5.12', param1, 'BRANCH').subscribe((resp) => {
      //console.log(resp);
      this.branchdata = resp;
      this.spinner.hide();
      this.getShopeeDropdown(param1)
      this.getdealerDropdown(param1)
      this.getmarketing_manager(param1)
      //console.log(JSON.stringify(this.branchdata))
    },
      error => {
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      });
  }

  /* ============================category dropdown=========================== */
  resources: any;
  getprodimg() {

    return this.service.getDatawithMethod1('get_products_category/').subscribe((resp) => {
      this.resources = resp;
      console.log("JSON.stringify" + JSON.stringify(this.resources))
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });

      });
  }

  /* =========================SUB ategory dropdown=========================== */
  resources1: any;
  getsubcategoryData(Category) {
    let category = Category;

    return this.service.getDatawithQueryParams1('4.8', category).subscribe((resp) => {
      this.resources1 = resp;
      this.subcategory = undefined
      console.log((this.resources1))
    })
  }
  /* ============================reporttypeDropdown========================= */
  reporttypedata: any = []
  getreporttypeDropdown() {

    return this.service.getDatawithInput_id('62').subscribe((resp) => {
      console.log(resp);
      this.reporttypedata = resp;
      console.log((this.reporttypedata))
      /*   ========condition check for dealer================= */
      if (this.loginUserData.role == 'Dealer') {
        this.reporttypedata = [{ "process": "PO" }, { "process": "INV" }];
      }
      /* ========================== */
    },
      error => {
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      });
  };

  disabledel() {
    this.dealer = undefined;
    this.Category = undefined
    this.subcategory = undefined
  }

  disableshop() {
    this.shopee = undefined;
    this.Category = undefined
    this.subcategory = undefined

  }

  /*  ==================================Shopee Dropdown================================= */
  param2: any;
  shopeedata: any = []

  getShopeeDropdown(param1) {
    if (param1 == undefined) {
      param1 = this.loginUserData.company_code
    }
    return this.service.getDatawithQueryParams2('5.12', param1, 'SHOPEE').subscribe((resp) => {
      console.log(resp);
      this.shopeedata = resp;
      this.shopee = undefined
      this.Category = undefined
      this.subcategory = undefined
    },
      error => {
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      });
  }
  /* ==============================modal popup Po====================================   */
  podata: any
  view_Po_More(data, po) {

    this.view_d = data;
    this.po = po
    console.log(this.view_d);
    this.podata = this.resources2
    $('#viewpoModal1').modal('show');
  }

  /* ==============================modal popup inv============================= */
  invdata: any
  po: any
  inv: any
  remarks2: any;
  remarks3: any;
  view_inv_More(data, inv, remarks2, remarks3) {


    this.view_d = data;
    this.inv = inv
    this.view_d.remarks2 = remarks2
    this.view_d.remarks3 = remarks3
    console.log(this.view_d);
    this.podata = this.resources2
    $('#viewinvModal1').modal('show');
  }
  view_transport(data) {


    this.view_d = []
    this.view_d.push(data);
    this.inv = data.sinv_no
    console.log(this.view_d);

    $('#viewinvtransportModal1').modal('show');

  }
  /* ==============================modal popup packing============================= */
  packingno: any
  view_Packing_More(data, packing) {
    this.view_d = data;
    this.packingno = packing
    $('#viewpackingModal1').modal('show');
  }
  /* ==============================modal popup GRN============================= */
  grndata: any
  view_data: any = []
  view_Grn_More(data) {


    this.view_data = data;
    console.log(this.view_d);
    this.podata = this.resources2
    $('#viewgrnModal1').modal('show');
  }
  // clearcat() {
  //   alert('no');
  // }
  /* ==============================modal popup STOCK============================= */
  stockdata: any = []
  view_Stock_More(data) {

    this.stockdata = data;
    console.log(this.view_d);
    this.podata = this.resources2
    $('#viewstockModal1').modal('show');
  }

  /* ===============================dealer Dropdown======================================= */
  dealerdata: any = []
  getdealerDropdown(param1) {

    if (param1 == undefined) {
      param1 = this.loginUserData.company_code
    }
    return this.service.getDatawithQueryParams2('5.12', param1, 'DEALER').subscribe((resp) => {
      console.log(resp);
      this.dealerdata = resp;
      this.dealer = undefined
      this.Category = undefined
      this.subcategory = undefined
      this.getmarketing_manager(param1)
    },
      error => {
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      });
  }

  /*  ================================Companycode Dropdown==================================== */






  companydata: any = []
  getCompanycode() {
    return this.service.getCompanycode().subscribe((resp) => {
      console.log(resp);
      this.companydata = resp;
    },
      error => {
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      });
  }



  /*  =============================================== */
  token: any;
  loginUserData: any = [];
  paramcode: any
  getsearchdata: any
  ngOnInit() {
    let frdt =  new Date().getUTCFullYear() + "-" + (new Date().getUTCMonth() + 1) + "-" + "01";
    this.fromdate = new Date(frdt);
    this.tilldate = new Date();

    // this.getsearchdata=JSON.parse(localStorage.getItem('urldata'));
    // console.log(this.getsearchdata,"getsearchdata")

    this.token = localStorage.getItem('token');
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.paramcode = this.loginUserData.company_code;
    this.getBranchDropdown(this.paramcode)
    this.getCompanycode();
    this.getreporttypeDropdown();
    this.getprodimg();
    this.getBrands();

    //  this.getDatawithInput_id();
    //  alert(this.loginUserData.company_code)
    if (this.loginUserData.role == 'Admin' || this.loginUserData.user_type == 'Super') {

      this.company = this.loginUserData.company_code;
    }
    if (this.loginUserData.role == 'Branch Manager') {
      /*  alert(this.loginUserData.role) */
      this.getShopeeDropdown(this.loginUserData.company_code)
      this.company_code = this.loginUserData.company_code;
    }

    if (this.loginUserData.role == 'Branch Manager') {
      /*  alert(this.loginUserData.role) */
      this.getdealerDropdown(this.loginUserData.company_code)
      /*  alert(this.getdealerDropdown) */
      this.company_code = this.loginUserData.company_code;
    }

    if (this.loginUserData.role == 'Accounts Manager') {
      /*  alert(this.loginUserData.role) */
      this.getShopeeDropdown(this.loginUserData.company_code)
      this.company_code = this.loginUserData.company_code;
    }
    if (this.loginUserData.role == 'Warehouse Manager') {
      /*  alert(this.loginUserData.role)  */
      this.getShopeeDropdown(this.loginUserData.company_code)
      this.company_code = this.loginUserData.company_code;
    }


    if (this.loginUserData.role == 'Dealer') {
      /*   alert(this.loginUserData.role)  */
      this.companycode = this.loginUserData.company_code;
      this.company_code = this.loginUserData.user_id + "@" + this.companycode;
    }
    if (this.loginUserData.role == 'Shopee Manager') {
      /*  alert(this.loginUserData.role)  */
      this.company_code = this.loginUserData.company_code;


    }
    //   if(this.getsearchdata){
    //     
    //   this.getDataadminreport(this.getsearchdata.year,this.getsearchdata.month, this.getsearchdata.fromdate, this.getsearchdata.tilldate,  this.company,  this.getsearchdata.branch,  this.getsearchdata.shopee,  this.getsearchdata.dealer,  this.getsearchdata.type,  this.getsearchdata.Category,  this.getsearchdata.SubCategory,  this.getsearchdata.model) 
    // //  localStorage.removeItem("urldata")
    // }

  }
  brands: any = []
  getBrands() {
    this.spinner.show()
    this.service.getDatawithInput_id('brand').subscribe((resp) => {
      console.log(resp);
      this.spinner.hide()
      this.brands = resp
    })
  }

  final_amount: any
  splitamount: any = []
  decimalamount: any;
  TotMarketingAmt: any;

  getmarketreports() {

      
    let from, till;
    if (this.fromdate && this.tilldate) {
      from = this.DatePipe.transform(this.fromdate, "yyyy-MM-dd")
      till = this.DatePipe.transform(this.tilldate, "yyyy-MM-dd")
    } else {
      // from = this.DatePipe.transform(new Date('2021-01-01'), "yyyy-MM-dd");
      from = new Date().getUTCFullYear() + "-" + (new Date().getUTCMonth()+1) + "-" + '01';
      till = this.DatePipe.transform(new Date(), "yyyy-MM-dd");
    }
    // if (this.month && this.year) {
    if (this.fromdate && this.tilldate) {

      // this.fromdate = this.year + "-" + this.month + "-" + "01";
      // // this.tilldate = this.year + "-" + this.month + "-" + new Date().getUTCDate();
      // // this.tilldate = new Date(this.year,this.month, 0);
      // this.tilldate = this.DatePipe.transform(new Date(this.year,this.month, 0), "yyyy-MM-dd")

      // // this.fromdate = this.DatePipe.transform(this.fromdate, "yyyy-MM-dd");
      // // this.tilldate = this.DatePipe.transform(this.tilldate, "yyyy-MM-dd");
      // this.service.getDatawithMethodParams3('marketrepo/', this.loginUserData.company_code, this.fromdate, this.tilldate).subscribe((resp) => {
      this.service.getDatawithMethodParams3('marketrepo/', this.loginUserData.company_code, from, till).subscribe((resp) => {
      console.log(resp);
        this.resources2 = resp
        if (this.resources2.length > 0) {
          for (var i = 0; i < this.resources2.length; i++) {
            this.final_amount = (this.resources2[i].final_amount).toFixed(2);
            this.splitamount = this.final_amount.split('.')
            this.resources2[i].final_amount = JSON.parse(this.splitamount[0])
            this.resources2[i].decimalamount = this.splitamount[1]
          }
        }
        this.company_code = ""
        console.log("this.resources2", this.resources2);
        this.count = this.resources2.length
        this.companycode = this.company_code;
     /*  this.companycode='' */;
        if (this.resources2.length > 0) {
          this.toasterService.success('TOTAL COUNT FOR THE SELECTED CATEGORY IS ' + '  ' + this.count);
          this.typename = 'Market'
          this.TotMarketingAmt = this.resources2.map(a => parseFloat(a.final_amount?a.final_amount:'0')).reduce(function (a, b) {
            return a + b;
          });
        }
        if (this.resources2.length <= 0) {
          this.toasterService.warning("no records present")
        }
        this.types = 'Market';
      },
        error => {
          this.spinner.hide();

        })
    }
    else {
      // this.service.getDatawithMethodParams1('marketrepo/', this.loginUserData.company_code).subscribe((resp) => {
      this.service.getDatawithMethodParams3('marketrepo/', this.loginUserData.company_code, from, till).subscribe((resp) => {

        console.log(resp);
        this.resources2 = resp
        if (this.resources2.length > 0) {
          for (var i = 0; i < this.resources2.length; i++) {
            this.final_amount = (this.resources2[i].final_amount).toFixed(2);
            this.splitamount = this.final_amount.split('.')
            this.resources2[i].final_amount = JSON.parse(this.splitamount[0])
            this.resources2[i].decimalamount = this.splitamount[1]
          }
        }
        this.company_code = ""
        console.log("this.resources2", this.resources2);
        this.count = this.resources2.length
        this.companycode = this.company_code;
   /*  this.companycode='' */;
        if (this.resources2.length > 0) {
          this.toasterService.success('TOTAL COUNT FOR THE SELECTED CATEGORY IS ' + '  ' + this.count);
          this.typename = 'Market'
          this.TotMarketingAmt = this.resources2.map(a => parseFloat(a.final_amount?a.final_amount:'0')).reduce(function (a, b) {
            return a + b;
          });
        }
        if (this.resources2.length <= 0) {
          this.toasterService.warning("no records present")
        }
        this.types = 'Market';
      },
        error => {
          this.spinner.hide();

        })
    }
  }
  Page1: any = 1
  marketingdealers: any = []
  view_marketprod_more(res) {
    this.spinner.show()
    let from, till;
    if (this.fromdate && this.tilldate) {
      from = this.DatePipe.transform(this.fromdate, "yyyy-MM-dd")
      till = this.DatePipe.transform(this.tilldate, "yyyy-MM-dd")
    } else {
      // from = this.DatePipe.transform(new Date('2021-01-01'), "yyyy-MM-dd");
      from = new Date().getUTCFullYear() + "-" + (new Date().getUTCMonth()+1) + "-" + '01';
      till = this.DatePipe.transform(new Date(), "yyyy-MM-dd");
    }
    // this.service.getDatawithMethodParams1('dtlproduct/', res.handling_marketing_manager,).subscribe((resp) => {
    this.service.getDatawithMethodParams3('dtlproduct/', res.handling_marketing_manager,from,till).subscribe((resp) => {
      console.log(resp);
      this.spinner.hide()
      this.marketingproducts = resp
      this.Page = 1
      $('#viewmarketModal1').modal('show');
    })
  }
  totalmarketingdealers: any = []
  TotMarkAmt: any;
  view_marketdel_more(res) {
    let from, till;
    if (this.fromdate && this.tilldate) {
      from = this.DatePipe.transform(this.fromdate, "yyyy-MM-dd")
      till = this.DatePipe.transform(this.tilldate, "yyyy-MM-dd")
    } else {
      // from = this.DatePipe.transform(new Date('2021-01-01'), "yyyy-MM-dd");
      from = new Date().getUTCFullYear() + "-" + (new Date().getUTCMonth()+1) + "-" + '01';
      till = this.DatePipe.transform(new Date(), "yyyy-MM-dd");
    }
    this.spinner.show()
    // this.service.getDatawithMethodParams1('dtldealer/', res.handling_marketing_manager).subscribe((resp) => {
    this.service.getDatawithMethodParams3('dtldealer/', res.handling_marketing_manager,from,till).subscribe((resp) => {
      console.log(resp);
      this.spinner.hide()
      this.marketingdealers = resp
      this.totalmarketingdealers = resp
      for (var i = 0; i < this.totalmarketingdealers.length; i++) {
        this.totalmarketingdealers.finalamount = this.totalmarketingdealers.final_amount
      }
      this.TotMarkAmt = this.marketingdealers.map(a => parseFloat(a.final_amount?a.final_amount:'0')).reduce(function (a, b) {
        return a + b;
      });
      this.Page1 = 1
      $('#viewmarketdelModal1').modal('show');
    })
  }

  searchdata() {


    if (this.amount) {
      this.marketingdealers = []

      for (var i = 0; i < this.totalmarketingdealers.length; i++) {
        if (this.amount == "zero") {
          if (this.totalmarketingdealers[i].final_amount == 0) {
            this.marketingdealers.push(this.totalmarketingdealers[i])


          }
        }
        else if (this.amount == ">0") {
          if (this.totalmarketingdealers[i].final_amount > 0) {
            this.marketingdealers.push(this.totalmarketingdealers[i])


          }
        }
      }
    }
    else {
      this.marketingdealers = this.totalmarketingdealers
    }



  }
  // =============================printing reports=====================================
  print(data) {

    this.service.printReport('market/poprint/', this.types, data).subscribe((resp) => {
      console.log(resp);
      if (this.types == "PO") {
        resp['fromreportspage'] = true;
        localStorage.setItem('poprintData', JSON.stringify(resp));
        this.router.navigateByUrl('/po-print');
      }
      if (this.types == "Inv") {
        localStorage.setItem('InvoiceData', JSON.stringify(resp))
        this.router.navigateByUrl('/invoice-Print')
      }
      if (this.types == "Packing") {
        resp['fromreportspage'] = true;
        localStorage.setItem('packingListprint', JSON.stringify(resp))
        this.router.navigateByUrl('/packing_list_print')
      }

    },
      error => {
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      });
  }
  // seq:any

  // delete(data){
  //   
  //   this.seq={'seq':data}
  //   this.service.postData( this.seq,'invcancel/').subscribe((resp) => {
  //     console.log(resp);
  //   })
  // }
  printreport() {
    if(this.types=='Outstanding'){
      localStorage.setItem('reportdata', JSON.stringify(this.resources3));
      localStorage.setItem('type', this.types);
      this.router.navigate(['/PRINT-REPORT'])
    }
    else{
    localStorage.setItem('reportdata', JSON.stringify(this.resources2));
    localStorage.setItem('type', this.types);
    this.router.navigate(['/PRINT-REPORT'])
    }
  }
  printdealersalesreport() {
    $('#viewmarketdelModal1').modal('hide');
    localStorage.setItem('delsalesreportdata', JSON.stringify(this.marketingdealers));
    // localStorage.setItem('type', this.types);
    this.router.navigate(['/Admin-DEALERSALES-REPORT'])
  }
  // pdfdata:any
  // detail:any=[]
  // convert(){
  //   
  //   this.service.getDatawithMethodParams1('singledoc/','389').subscribe((resp) => {
  //     this.pdfdata=resp;
  //     console.log(this.pdfdata,"pdfdata");

  //     var doc = new jsPDF();


  //     function headRows(rowCount) {
  //       rowCount = rowCount || 10;
  //       let head = [];
  //       for (var j = 0; j < rowCount; j++) {
  //           head.push({
  //               id:"S.No",
  //               product_name:"Product Name",

  //               mrp: "Mrp",
  //               discount: "Disc(%)",
  //               qty:"Qty",
  //              net_price:"Net Price",
  //              gst_amount:"GST Amount",
  //              total_value:"Total Value"

  //           });
  //       }
  //       return head;
  //   }
  //   function bodyRows(rowCount,detail) {
  //     rowCount = rowCount || 10;
  //     let body = [];
  //     for (var j = 0; j < rowCount; j++) {
  //         body.push({
  //             id: j+1,
  //             product_name: detail[j].subcategory+detail[j].modelno,

  //             mrp: detail[j].mrp,
  //             discount: detail[j].discount_eff,
  //             qty:detail[j].qty,
  //             net_price: detail[j].net_price,
  //             gst_amount:detail[j].gst_amount,
  //             total_value:detail[j].total_value
  //         });
  //     }
  //     return body;
  // }
  // for(var i=0;i<this.pdfdata.length;i++){
  //   if(i==0){
  //     doc.setFontSize(12);
  //     doc.setFontStyle('bold');
  //     doc.text('PO', 14, 16); //default
  //     doc.autoTable({
  //         head: headRows(1),
  //         body: bodyRows(this.pdfdata[i].json_dtl.length,this.pdfdata[i].json_dtl),
  //         startY: 20,
  //         theme: 'grid'
  //     });
  //   }
  //   else{
  //     doc.text('Theme "grid"', 14, doc.autoTable.previous.finalY + 10);
  //     doc.autoTable({
  //         head: headRows(1),
  //         body: bodyRows(this.pdfdata[i].json_dtl.length,this.pdfdata[i].json_dtl),
  //         startY: doc.autoTable.previous.finalY + 14,
  //         theme: 'grid'
  //     });
  //   }
  // }


  //     doc.save('Orders.pdf');
  //   })


  // }
  convert(data) {
    this.service.getDatawithMethodParams1('singledoc/', data).subscribe((resp: any) => {
      resp.map((e, i) => {
        if (i == (resp.length - 1)) {
          let qty = 0, cartonqty = 0, Sum = 0, totalfreeqty = 0, totalfreecartoons = 0, totalsp_discountamount = 0, freeqtyarr = []
          for (let i of e.json_dtl) {
            qty = i.packing_qty;
            Sum = Sum + qty;
            let npc = i.npc
            cartonqty = cartonqty + npc
            let sp_disc_amount = i.sp_dic_amount;
            totalsp_discountamount = totalsp_discountamount + sp_disc_amount;
          }
          totalfreeqty = e.json_hdr.totalqty - Sum
          totalfreecartoons = e.json_hdr.totalcartoons - cartonqty
          let dtl = e.json_dtl
          for (let i of dtl) {

            if (i.free_qty != 0) {
              freeqtyarr.push({ "productname": i.subcategory + i.modelno, "free_qty": i.free_qty })
            }
          }
          this.service.pdfpostData({ user: JSON.parse(localStorage.getItem('loginUserData')), data: resp, freeqtyarr: freeqtyarr, totalfreeqty: totalfreeqty, totalfreecartoons: totalfreecartoons, totalsp_discountamount: totalsp_discountamount }, "reports/GeneratePdf/").subscribe((res: any) => {
            var fileName = "test.pdf";
            var a = document.createElement("a");
            document.body.appendChild(a);
            var file = new Blob([res], { type: 'application/pdf' });
            var fileURL = window.URL.createObjectURL(file);
            a.href = fileURL;
            a.target = '_blank';
            // a.download = fileName;
            a.click();
          })
        }
      })

    })
  }
  totalamount: any
  totalqty: any
  pidata: any = []
  totPiUsd: any
  totPiUsdAmt: any
  totPiCny: any
  totPiCnyAmt: any
  piclick(product){
    if(product.zpoqty == 0){
      return false
    }
    this.body = {product};
      this.spinner.show();
      this.service.postData(this.body,"sup/piqtydetails/").subscribe((data) => {
      this.pidata = data;
      this.spinner.hide();
      this.totalqty = this.pidata.map(a => parseInt(a.Poqty?a.Poqty:'0')).reduce(function (a, b) {
        return a + b;
      });
      // this.totalamount = this.pidata.map(a => parseInt(a.amount?a.amount:'0')).reduce(function (a, b) {
      //   return a + b;
      // });

      // USD Totals
      this.totPiUsd = this.pidata.filter((e) => { return e.CType == 'USD'})
      if(this.totPiUsd.length>0){ 
        this.totPiUsdAmt= this.totPiUsd.map(a => parseFloat(a.amount?a.amount:'0')).reduce(function (a, b) {
          return a + b;
        });
        console.log('this.totPiUsdAmt',this.totPiUsdAmt)
      }

    // CNY Totals
      this.totPiCny = this.pidata.filter((e) => { return e.CType == 'CNY'})
      if(this.totPiCny.length>0){
        this.totPiCnyAmt = this.totPiCny.map(a => parseFloat(a.amount?a.amount:'0')).reduce(function (a, b) {
          return a + b;
        });
        console.log('this.totPiCnyAmt',this.totPiCnyAmt)
      }
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      })
      
    $("#viewpiModal").modal('show');

  }
  totaltamount: any
  totaltqty: any
  transdata: any
  totTrUsd: any
  totTrUsdAmt: any
  totTrCny: any
  totTrCnyAmt: any
  body: {};
  transitclick(product){
    if(product.zTransitQty == 0){
      return false
    }
    this.body = {product};
      this.spinner.show();
      this.service.postData(this.body,"sup/transitdetails/").subscribe((data) => {
      this.transdata = data;
      this.spinner.hide();
      this.totaltqty = this.transdata.map(a => parseInt(a.qty?a.qty:'0')).reduce(function (a, b) {
        return a + b;
      });
      // this.totaltamount = this.transdata.map(a => parseInt(a.amount?a.amount:'0')).reduce(function (a, b) {
      //   return a + b;
      // });
      // USD Totals
      this.totTrUsd = this.transdata.filter((e) => { return e.CType == 'USD'})
      if(this.totTrUsd.length>0){ 
        this.totTrUsdAmt= this.totTrUsd.map(a => parseFloat(a.amount?a.amount:'0')).reduce(function (a, b) {
          return a + b;
        });
        console.log('this.totTrUsdAmt',this.totTrUsdAmt,'this.totTrUsd',this.totTrUsd)
      }
      
    // CNY Totals
      this.totTrCny = this.transdata.filter((e) => { return e.CType == 'CNY'})
      if(this.totTrCny.length>0){
        this.totTrCnyAmt = this.totTrCny.map(a => parseFloat(a.amount?a.amount:'0')).reduce(function (a, b) {
          return a + b;
        });
        console.log('this.totTrCnyAmt',this.totTrCnyAmt,'this.totTrCny',this.totTrCny)
      }
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      })
      
    $("#viewtransModal").modal('show');

  }

}