import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from "../../global-service.service";
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from '../../toastr-service.service';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-order-planning',
  standalone: false,
  templateUrl: './order-planning.component.html',
  styleUrls: ['./order-planning.component.scss']
})
export class OrderPlanningComponent implements OnInit {
  loginUserData: any
  suppliers: any
  pro: any = {}
  // suppliername: boolean = false
  productdata: any = []
  selectedlist: any = []
  headerdata: any = {}
  payment_terms: any;
  p: any = 1
  searchText: any
  show: boolean = true;
  finalform: any;
  sup_sku: any;
  supplierid: any;
  pendingdata: any = [];
  body: any
  supplier: any;
  supplierpendingdata: any = [];
  constructor(private toasterService: ToasterService, private route: Router, private globalService: GlobalServiceService, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));

    this.supplierselect("supplier")
    this.getsupplierproducts("supplier");
  }
  supplierselect(data) {

    this.productdata = []
    this.pro.suppliername = undefined
    this.pro.subcategory = undefined
    if (data == 'supplier') {

      // this.suppliername = true
      this.getsuppliers()
    }
  }
  getsuppliers() {
    this.globalService.getDataOnlyWithMethod("sup/skuprifix").subscribe((data) => {
      this.suppliers = data;
    });
  }
    /* =========================SUB category dropdown=========================== */
    resources1: any;
    subcategory: any;
    getsubcategoryData(Category) {
      let category = Category;
  
      // return this.globalService.getDatawithQueryParams1('4.8', category).subscribe((resp) => {
      return this.globalService.getDatawithMethodParams2('sup/subcategorylistsupplier/', this.supplierid?this.supplierid:'', category).subscribe((resp) => {
        this.resources1 = resp;
        this.subcategory = undefined
        console.log((this.resources1))
      })
    }
  resources: any = [];
  pro1: any;
  getsupplierproducts(supplier) {
    this.resources = [];
    for (let name of this.suppliers) {
      if (supplier.replace(/\s/g, '') === name.business_name.replace(/\s/g, '')) {
        this.pro1 = name.user_id
        break;
      }
    }
    if(supplier){
      this.supplierid = this.pro1
      this.pro.category = undefined
      this.subcategory = undefined
    }
          // return this.globalService.getDatawithMethod1('get_products_category/').subscribe((resp) => {
            return this.globalService.getDatawithMethodParams1('sup/categorylistsupplier/', this.pro1?this.pro1:'').subscribe((resp) => {
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
  supname: boolean = false
  totalproductdata: any = []
  productdata1: any = []
  suppliercny: any;
  getdata() {
    if(!this.pro.suppliername){
      this.toasterService.error("Please Select Supplier")
      return false
    }
    
    if(!this.pro.suppliername){
      this.supname = true;
      this.supplierid = '';
    }
    else{
      this.supname = false;
    }
    // if(this.supplierid){
    //   this.supname = false;
    // }
    this.selectedlist = []
    this.spinner.show();
    this.globalService.getDatawithMethodParams3("sup/orderplain/", this.supplierid?this.supplierid:'', this.pro.category?this.pro.category:'',this.subcategory?this.subcategory:'').subscribe((data) => {
      this.productdata = data;
      this.productdata1 = data;
      this.totalproductdata = data

      for (var i = 0; i < this.productdata.length; i++) {
          this.productdata[i].qty = 0;
      }

    this.spinner.hide();

      
    if (this.productdata.length < 1) {
     // alert("No Data is Available");
     $("#WarningModal").modal('show');
      }

  });
  }
  update(product){
    this.body = { "supplier_id": this.supplierid, product};
    this.supplierid
    this.spinner.show();
    this.globalService.postData(this.body, "sup/updatesku/").subscribe((data) => {
      this.spinner.hide();
      if (data['msg'] == 'sucessfuly updated') {
        $("#successModal").modal('show');
      }
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      })
  }
  keynumber(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  keyfloat(event: any) {
    const pattern = /[.0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  add_disable(attr) {

    let arr = ["product_name", "avl_balance", "twomonthssale", "qty", "purchase_price", "amounts"];
    for (let i of arr) {
      if (attr[i] == null || attr[i] == undefined) {

        return true;
      }
    }

    return false;
  }

  searchdata(data) {
    if (data) {
      this.productdata = []
      for (var i = 0; i < this.totalproductdata.length; i++) {
        if ((this.totalproductdata[i].product_name.toLowerCase().includes(data.toLowerCase()))) {
          this.productdata.push(this.totalproductdata[i])
        }
      }
      this.productdata
    }
    else {
      this.productdata = this.totalproductdata
    }
  }
  delete(product){
    this.body = {product};
      this.spinner.show();
      this.globalService.postData(this.body, "sup/deletesku/").subscribe((data) => {
     this.spinner.hide();
      if (data['status'] == '1') {
        $("#deleteModal").modal('show');
        this.getdata()
      }else{
        this.toasterService.warning("Cannot Delete Item already exists in PI")
      }
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
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
      this.globalService.postData(this.body,"sup/piqtydetails/").subscribe((data) => {
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
  transitclick(product){
    if(product.zTransitQty == 0){
      return false
    }
    this.body = {product};
      this.spinner.show();
      this.globalService.postData(this.body,"sup/transitdetails/").subscribe((data) => {
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
  addd(product){
    let tnum = product.qty = Math.ceil(JSON.parse(product.qty?product.qty:0) / product.piecepercarton) * JSON.parse(product.piecepercarton)
    this.body = {'productid' : product.productid ,'poqty' :product.qty ,'supplierid' : product.Supplier_id,'price' : product.purchase_price};
      // this.spinner.show();
      this.globalService.postData(this.body,"sup/Supcart/").subscribe((data) => {
      this.spinner.hide();
      this.toasterService.success("Item Added..");
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      })
      
  }

}
