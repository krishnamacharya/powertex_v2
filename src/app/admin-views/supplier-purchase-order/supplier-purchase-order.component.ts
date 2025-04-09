import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { GlobalServiceService } from "../../global-service.service";
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from '../../toastr-service.service';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-supplier-purchase-order',
  standalone: false,
  templateUrl: './supplier-purchase-order.component.html',
  styleUrls: ['./supplier-purchase-order.component.scss']
})
export class SupplierPurchaseOrderComponent implements OnInit {
  loginUserData: any
  suppliers: any
  pro: any = {}
  // clicked = false;
  subcategories: any
  radio: any
  suppliername: boolean = false
  subcategoryname: boolean = false
  productdata: any = []
  selectedlist: any = []
  headerdata: any = {}
  shipmentports: any = []
  deliveryterms: any = []
  dischargeports: any = []
  payment_terms: any;
  p: any = 1
  searchText: any
  show: boolean = true
  productobject: any = {
    productid: '',
    aviqty: '',
    mothsqty: '',
    qty: '',
    price: '',
    ctype: '',
    mappingid: '',
    amount: '',
    design: '',
    packing: ''
  }
  dispatchobject: any = {
    dispatch_date: '',
    dispatch_qty: ''
  }
  finalform: any;
  sup_sku: any;
  currentdate: Date;
  schedule: any;
  supplierid: any;
  productid: any;
  pendingdata: any = [];
  supplier: any;
  supplierpendingdata: any = [];
  pro1: any = [];
  PUrl: any;
  constructor(private toasterService: ToasterService, private route: Router, private globalService: GlobalServiceService, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));

    this.supplierselect("supplier")
    this.getshipmentports()
    this.getdeliveryterms()
    this.getdischargeports()
    this.getpendingdata()
    this.getcurrency()
    this.currentdate = new Date();
    this.PUrl = window.location.href.substr(window.location.href.length - 5)
  }
  supplierselect(data) {

    this.productdata = []
    this.pro.suppliername = undefined
    this.pro.subcategory = undefined
    if (data == 'supplier') {

      this.suppliername = true
      this.subcategoryname = false
      this.getsuppliers()
    }
    if (data == "subcategory") {

      this.suppliername = false
      this.subcategoryname = true
      this.getsubcategories()
    }
  }
  getsuppliers() {
    this.globalService.getDataOnlyWithMethod("sup/skuprifix").subscribe((data) => {
      this.suppliers = data;
    });
  }
  getpendingdata() {
    this.globalService.getcheckdata("sup/getsupoutstanding/",'').subscribe((data) => {
      this.pendingdata = data;
    });
    if(this.pro.suppliername){
    this.supplierpendingdata = this.pendingdata.filter((a) => { return a.ID == this.supplierid})
  }
  }

  getsubcategories() {
    this.globalService.getDataOnlyWithMethod("sup/supcategorylist").subscribe((data) => {
      this.subcategories = data;
    });
    this.globalService.getDataOnlyWithMethod("sup/get_payments_terms").subscribe((data) => {
      this.payment_terms = data;
    });
  }
  currencies :any;
  getcurrency() {
    this.globalService.getDataOnlyWithMethod("sup/currencydrop").subscribe((data) => {
      this.currencies = data;
    });
  }
  totalproductdata: any = []
  productdata1: any = []
  suppliercny: any;
  getsupplierproducts(supplier) {
    for (let name of this.suppliers) {
      if (supplier.replace(/\s/g, '') === name.business_name.replace(/\s/g, '')) {
        this.supplierid = name.user_id
        this.suppliercny = name.currency
        // this.pro.suppliername = name
        this.pro1 = name
        break;
      }
    }

    // this.suppliercny = supplier.currency
    // this.supplierid = supplier.user_id
    this.sup_sku = supplier.sku
    this.productlist = []
    this.productobject = {}
    this.selectedlist = []
    this.pro.poamount = ""
    this.spinner.show();
    this.globalService.getDatawithMethodParams1("sup/productsupplierlist/", this.supplierid).subscribe((data) => {
      this.productdata = data;
      this.productdata1 = data;
      this.totalproductdata = data
      this.spinner.hide();
      if (this.pro.suppliername) {
        for (let supp of this.suppliers) {
          // if (this.pro.suppliername.business_name == supp.business_name) {
          if (supplier.replace(/\s/g, '') === supp.business_name.replace(/\s/g, '')) {
            this.pro.payment_terms = supp.payment_terms
            this.pro.deliveryterms = supp.deliveryterms
            this.pro.deliverytime = supp.delivery_time
            this.pro.currency = supp.currency
            // this.pro.shipmentport = supp.shipmentport
            // this.pro.dischargeport = supp.dischargeport
          }
        }
        // this.prob = this.pro.suppliername.user_id
      }
      for (var i = 0; i < this.productdata.length; i++) {
        if (this.productdata[i]) {
          this.productdata[i].linvsale = this.productdata[i].linvsale[0].Price
          this.productdata[i].amounts = (this.productdata[i].purchase_price * this.productdata[i].qty).toFixed(2);
          if (this.productdata[i].qty == 0 || this.productdata[i].qty=="") {
            this.productdata[i].qty = '';
          }
        }
      }
      // if (this.selectedlist == []) {
      //   this.selectedlist = [];
      this.productlist.push(this.productobject);
      // }
    this.totalsAmt();
  });
    this.getpendingdata();
  }
  refresh(){
    this.globalService.getDatawithMethodParams1("sup/productsupplierlist/", this.supplierid).subscribe((data) => {
      this.productdata = data;
      for (var i = 0; i < this.productdata.length; i++) {
        if (this.productdata[i]) {
          this.productdata[i].linvsale = this.productdata[i].linvsale[0].Price
          this.productdata[i].amounts = (this.productdata[i].purchase_price * this.productdata[i].qty).toFixed(2);

        if (this.productdata[i].qty==0 || this.productdata[i].qty=="") {
          this.productdata[i].qty = '';
        }

        }
      }
    this.totalsAmt();
    });
    this.searchText = undefined;
    // this.totalsAmt();
  }
  errmsg: boolean = false
  productlist: any = []
  getproductdata(productname, i) {
    this.productid = productname.productid
    this.errmsg = false;
    if (this.productlist.length > 1) {
      for (var j = 0; j < this.productlist.length - 1; j++) {
        if (this.productlist[j].product_name == productname) {
          this.errmsg = true;
          break;
        }
        else {
          this.errmsg = false
          for (let p of this.productdata) {
            if (p.product_name == productname) {
              this.productlist[i].product_name = p.product_name
              this.productlist[i].piecepercarton = p.piecepercarton
              this.productlist[i].avl_balance = p.avl_balance
              this.productlist[i].twomonthssale = p.twomonthssale
              this.productlist[i].purchase_price = p.purchase_price
              this.productlist[i].zpoqty = p.zpoqty
              this.productlist[i].zTransitQty = p.zTransitQty
              this.productlist[i].TotalStock = p.TotalStock

              this.productlist[i].currency = p.currency
              this.productlist[i].mappingid = p.mappingid
              this.productlist[i].productid = p.productid
              // this.selectedlist.push(p)
              break;
            }
          }
        }
      }
    }
    else {
      for (let p of this.productdata) {
        if (p.product_name == productname) {
          this.productlist[i].product_name = p.product_name
          this.productlist[i].piecepercarton = p.piecepercarton
          this.productlist[i].avl_balance = p.avl_balance
          this.productlist[i].twomonthssale = p.twomonthssale
          this.productlist[i].purchase_price = p.purchase_price
          this.productlist[i].zpoqty = p.zpoqty
          this.productlist[i].zTransitQty = p.zTransitQty
          this.productlist[i].TotalStock = p.TotalStock

          this.productlist[i].currency = p.currency
          this.productlist[i].mappingid = p.mappingid
          this.productlist[i].productid = p.productid
          // this.selectedlist.push(p)

        }
      }
    }
    console.log(productname, "productdata")

  }
  rows: any = []
  removerow(i) {
    this.productlist.splice(i, 1)
    this.selectedlist.splice(i, 1)
    // this.pro.poamount=this.pro.poamounts- product.amount
    if (this.productlist.length == 0 || this.productlist == null) {
      this.productobject = {
        product_name: '', productid: '', aviqty: '',
        mothsqty: '',
        qty: '',
        price: '',
        ctype: '',
        mappingid: '',
        amount: '',
        design: '',
        packing: ''
      }
      this.productlist.push(this.productobject);
      this.pro.poamount = ""
    }
    if (this.selectedlist.length == 1) {
      this.pro.poamount = this.selectedlist.filter((item) => item.amount)
        .map((item) => +item.amount).reduce((sum, current) => 0 + current);
      this.pro.poamounts = this.pro.poamount
      this.pro.poamount = (this.pro.poamount).toLocaleString('en-IN');

      this.pro.totqty = this.selectedlist.map(a => parseInt(a.qty?a.qty:'0')).reduce(function (a, b) {
        return a + b;
      });

    }
    if (this.selectedlist.length > 1) {
      this.pro.poamount = this.selectedlist.filter((item) => item.amount)
        .map((item) => +item.amount)
        .reduce((sum, current) => sum + current);
      this.pro.poamounts = this.pro.poamount
      this.pro.poamount = (this.pro.poamount).toLocaleString('en-IN');

      this.pro.totqty = this.selectedlist.map(a => parseInt(a.qty?a.qty:'0')).reduce(function (a, b) {
        return a + b;
      });
    }
    if (this.selectedlist.length == 0) {
      this.pro.poamount = ""
      this.pro.totqty = ""
    }
    if (this.productlist[i].product_name != this.productdata.productname) {
      this.errmsg = false;
    }
  }
  addrow(i) {

    if ((i + 1) < this.productdata.length) {

      this.productobject = {
        product_name: '', productid: '', aviqty: '',
        mothsqty: '',
        qty: '',
        price: '',
        ctype: '',
        mappingid: '',
        amount: '',
        design: '',
        packing: ''
      }
      // this.itemEducation = { degree: '', university: '', yearOfPasssing: '' };
      if (this.productlist == null) {
        this.productlist = [];
        this.productlist.push(this.productobject);
      } else {

        this.productlist.push(this.productobject);
      }
    }
    else {
      this.toasterService.warning("No Products Left To Add")
    }
  }
  getsubcategoryproducts(subcategory) {
    this.globalService.getDatawithMethodParams1("sup/productcategorylist/", subcategory).subscribe((data) => {
      this.productdata = data;
    });

  }
  getshipmentports() {
    this.globalService.getDataOnlyWithMethod("sup/shipmentport").subscribe((data) => {
      this.shipmentports = data;
    });

  }
  getdeliveryterms() {
    this.globalService.getDatawithInput_id('15.2').subscribe((data) => {
      this.deliveryterms = data;
    });
  }
  getdischargeports() {
    this.globalService.getDataOnlyWithMethod("sup/dischargeport").subscribe((data) => {
      this.dischargeports = data;
    });

  }
  keynumber(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  keyfloat(event: any) {
    const pattern = /[.0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  totalsAmt(){
    this.pro.totqty = this.productdata.map(a => parseInt(a.qty?a.qty:'0')).reduce(function (a, b) {
      return a + b;
    });
    this.tat = this.productdata.map(a => parseFloat(a.amounts?a.amounts:'0')).reduce(function (a, b) {
      return a + b;
    });
    this.pro.poamount =Math.round(this.tat);
    // this.pro.poamount = this.tat;

    console.log(this.pro.totqty, "pro.totqty")
    console.log(this.tat, "tat")
  }
  tat:any;
  qtychange(product) {
    console.log(product)
    let tnum = product.qty = Math.ceil(JSON.parse(product.qty?product.qty:0) / product.piecepercarton) * JSON.parse(product.piecepercarton)
    product.amounts = (JSON.parse(product.qty) * JSON.parse(product.purchase_price)).toFixed(2);
    console.log(product, tnum)
    if(tnum != 0){
      this.addd(product);
    }
    else{
      product.qty = '';
    }
    // for (let p of this.productdata) {

    //   if (p.productid == product.productid) {
    //     p.amount = JSON.parse(product.qty) * JSON.parse(product.purchase_price)
    //     p.amounts = (p.amount).toLocaleString('en-IN')
    //     product.amount = JSON.parse(product.qty) * JSON.parse(product.purchase_price)
    //     product.amounts = (product.amount).toLocaleString('en-IN')
    //     break;
    //   }
    // }

    console.log(this.productdata, "productdata")
    // this.pro.poamount = ""
    // if (this.selectedlist.length > 0) {
    //   for (let s in this.selectedlist) {
    //     if (this.selectedlist[s].productid == product.productid) {
    //       this.selectedlist.splice(s, 1)
    //     }
    //   }
    // }
    console.log(product)

    this.totalsAmt();
    // if(product.qty != 0){
    //   this.selectedlist.push({
    //     product_name: product.product_name,
    //     productid: product.productid,
    //     aviqty: product.avl_balance,
    //     mothsqty: product.twomonthssale,
    //     qty: JSON.parse(product.qty),
    //     price: JSON.parse(product.purchase_price),
    //     ctype: product.currency,
    //     mappingid: product.mappingid,
    //     amount: JSON.parse(product.amount),
    //      // detailid,
    //     design: false,
    //     packing: false
    //   })
    // }
    // this.tat = this.selectedlist.map(a => parseInt(a.amount?a.amount:'0')).reduce(function (a, b) {
    //   return a + b;
    // });
    if (this.tat <= 0) {
      this.pro.poamount = 0;
      this.pro.poamounts = 0;
    }
    // if (this.selectedlist.length == 1) {
    //   this.pro.poamount = this.selectedlist.filter((item) => item.amount)
    //     .map((item) => +item.amount).reduce((sum, current) => 0 + current);
    //   this.pro.poamounts = this.pro.poamount
    //   this.pro.poamount = (this.pro.poamount).toLocaleString('en-IN');

    //   this.pro.totqty = this.selectedlist.map(a => parseInt(a.qty?a.qty:'0')).reduce(function (a, b) {
    //     return a + b;
    //   });

    // }
    // if (this.selectedlist.length > 1) {
    //   this.pro.poamount = this.selectedlist.filter((item) => item.amount)
    //     .map((item) => +item.amount)
    //     .reduce((sum, current) => sum + current);
    //   this.pro.poamounts = this.pro.poamount
    //   this.pro.poamount = (this.pro.poamount).toLocaleString('en-IN');

    //   this.pro.totqty = this.selectedlist.map(a => parseInt(a.qty?a.qty:'0')).reduce(function (a, b) {
    //     return a + b;
    //   });
    // }
    // if (this.selectedlist.length == 0) {
    //   this.pro.poamount = ""
    //   this.pro.totqty = ""
    // }
    console.log(this.pro.poamount, "poamount")
  }
  packingselect(event, product) {

    if (event.target.checked == true) {
      for (let s in this.selectedlist) {
        if (this.selectedlist[s].productid == product.productid) {
          this.selectedlist[s].packing = true
        }
      }
    }
    else {
      for (let s in this.selectedlist) {
        if (this.selectedlist[s].productid == product.productid) {
          this.selectedlist[s].packing = false
        }
      }
    }
  }
  designselect(event, product) {


    if (event.target.checked == true) {
      for (let s in this.selectedlist) {
        if (this.selectedlist[s].productid == product.productid) {
          this.selectedlist[s].design = true
        }
      }
    }
    else {
      for (let s in this.selectedlist) {
        if (this.selectedlist[s].productid == product.productid) {
          this.selectedlist[s].design = false
        }
      }
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
  add_disable1(attr) {

    let arr = ["suppliername", "payment_terms", "deliveryterms", "poamount", "dischargeport"];
    for (let i of arr) {
      if (attr[i] == null || attr[i] == undefined) {

        return true;
      }
    }

    return false;
  }
  productslist: any = []
  selecteditems(event, product) {

    if (event.target.checked == false) {
      if (this.selectedlist.length > 0) {
        for (let s in this.selectedlist) {
          if (this.selectedlist[s].productid == product.productid) {
            this.selectedlist.splice(s, 1)
          }
        }
      }
    }
    else {
      if (!product.designchange) {
        product.design = false
      }
      else {
        product.design = true
      }
      if (!product.packingchange) {
        product.packing = false
      }
      else {
        product.packing = true
      }

      this.selectedlist.push({
        product_name: product.product_name,
        productid: product.productid,
        aviqty: product.avl_balance,
        mothsqty: product.twomonthssale,
        qty: JSON.parse(product.qty),
        price: JSON.parse(product.purchase_price),
        ctype: product.currency,
        amount: JSON.parse(product.amount),
        // detailid,
        design: product.design,
        packing: product.packing
      })


      // this.selectedlist.push(this.productslist)
      console.log(this.selectedlist, "selectedlist")
      // this.pro.poamount = this.selectedlist.filter((item) => item.amount)
      //   .map((item) => +item.amount)
      //   .reduce((sum, current) => sum + current);
    }
    if (this.selectedlist.length == 1) {
      this.pro.poamount = this.selectedlist.filter((item) => item.amount)
        .map((item) => +item.amount).reduce((sum, current) => 0 + current);
      this.pro.poamounts = this.pro.poamount
      this.pro.poamount = (this.pro.poamount).toLocaleString('en-IN');

      this.pro.totqty = this.selectedlist.map(a => parseInt(a.qty?a.qty:'0')).reduce(function (a, b) {
        return a + b;
      });


    }
    if (this.selectedlist.length > 1) {
      this.pro.poamount = this.selectedlist.filter((item) => item.amount)
        .map((item) => +item.amount)
        .reduce((sum, current) => sum + current);
      this.pro.poamounts = this.pro.poamount
      this.pro.poamount = (this.pro.poamount).toLocaleString('en-IN');

      this.pro.totqty = this.selectedlist.map(a => parseInt(a.qty?a.qty:'0')).reduce(function (a, b) {
        return a + b;
      });

    }
    if (this.selectedlist.length == 0) {
      this.pro.poamount = ""
      this.pro.totqty = ""
    }

  }
  totpamt : any;
  onSubmit(form: NgForm) {
    // console.log(this.searchText,'this.searchText')
    // if(this.searchText!=null && this.searchText!=undefined){
    //   this.toasterService.error("Please clear Search")
    //   return false;
    // }
    this.selectedlist = [];
    if (!this.pro.dischargeport) {
      this.toasterService.error("Enter Discharge Port")
      return false
    }
    else{
      // ----
      for (var i = 0; i < this.productdata.length; i++) {
        if (this.productdata[i].qty != 0) {
          this.selectedlist.push({
             product_name: this.productdata[i].product_name,
             productid: this.productdata[i].productid,
             aviqty: this.productdata[i].avl_balance,
             mothsqty: this.productdata[i].twomonthssale,
             qty: (this.productdata[i].qty),
             price: (this.productdata[i].purchase_price),
            //  ctype: this.productdata[i].currency,
             ctype: this.pro.currency,
             mappingid: this.productdata[i].mappingid,
             amount: (this.productdata[i].amounts),
              // detailid,
             design: false,
             packing: false
           })
        }
      }
    if(this.selectedlist.length == 0){
      this.pro.poamount = ""
      this.pro.totqty = ""
      this.toasterService.error("Please Add Products")
      return false
    }
      // ----
      this.totpamt = this.pro.poamount
      $("#viewpoModal").modal('show');
    }
    console.log(this.selectedlist,"selectedlistm")
    // $("#viewpoModal").modal('show');
    
    // $("#confirmModal").modal('show');
    // this.atributesData(form);
    this.finalform = form
  }
  confirmmodal() {
    this.atributesData(this.finalform);
  }
  methodname: any
  body: any
  atributesData(form) {

    this.spinner.show();
    this.headerdata.noofitems = this.selectedlist.length
    // this.headerdata.supplierid = this.pro.suppliername.user_id
    this.headerdata.supplierid = this.supplierid
    this.headerdata.payment_terms = this.pro.payment_terms
    this.headerdata.deliveryterms = this.pro.deliveryterms
    // this.headerdata.poamount = this.pro.poamounts
    this.headerdata.poamount = this.pro.poamount
    this.headerdata.description = this.pro.description
    this.headerdata.shipmentport = this.pro.shipmentport
    this.headerdata.dischargeport = this.pro.dischargeport
    this.headerdata.deliverytime = this.pro.deliverytime
    this.body = { "json_hdr": this.headerdata, "json_dtl": this.selectedlist, "userdata": this.loginUserData };
    console.log("body", this.body)
    this.spinner.show();
    this.methodname = "sup/quote/"
    this.globalService.postData(this.body, this.methodname).subscribe((data) => {
      this.spinner.hide();
      console.log(data);
      if (data['msg'] == 'sucesses') {
        this.spinner.hide();
        $("#successModal").modal('show');
        localStorage.setItem("supplierpodata", JSON.stringify(data))
        form.reset();
        this.selectedlist = []
        this.productobject = {}
        this.productlist = []
        this.productdata = []
        this.pro.suppliername = undefined
        this.pro.subcategory = undefined
        // this.getshipmentports()
        // this.getdischargeports()
      }
      this.spinner.hide();
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        // console.log(error);
      })
      this.spinner.hide();

  }
  openmodel(i){
    $("#dispatchdate").modal('show');

  }
  updatemodal() {

    this.route.navigateByUrl('Supplier-PO Print');
  }
  searchdata(data) {
    if (data) {
      this.productdata = []
      for (var i = 0; i < this.totalproductdata.length; i++) {
        if ((this.totalproductdata[i].product_name.toLowerCase().includes(data.toLowerCase()))) {
          this.productdata.push(this.totalproductdata[i])
        }
      }
    }
    else {
      this.productdata = this.totalproductdata
    }
    this.totalsAmt();
  }
  // Dispatch variable 
  //fieldArray: Array<any> = [];
  // fieldArray :[]
  avl_balance :any
  // adddispatch(dispatchdata){

  //   if ((dispatchdata + 1) < this.productdata.length) {

  //     this.fieldArray.push({
  //       dispatch_date: dispatchdata.dispatch_date,
  //       dispatch_qty: dispatchdata.dispatch_qty,
  //     });
  //     dispatchdata.reset()
  //   }
  // }
  distotalqty : any;
  dispatchdata = [];
 dispath(data){
  // document.getElementsByName("currentdatee")[0].setAttribute('min', 'this.currentdate');
  this.distotalqty =data;
    this.dispatchdata = [];
    this.dispatchobject = {}
    this.dispatchlist.push(this.dispatchobject);
  }

  dispatchlist: any = []
  adddispatch(dispatchdata) {

    if (dispatchdata) {

      this.dispatchobject = {
        dispatch_date: '',
        dispatch_qty: ''
      }
      if (this.dispatchlist == null) {
        this.dispatchlist = [];
        this.dispatchlist.push(this.dispatchobject);
      } else {

        this.dispatchlist.push(this.dispatchobject);
      }
    }
    else {
      this.toasterService.warning("No Products Left To Add")
    }
    this.distotqty = this.dispatchlist.map(a => parseInt(a.dispatch_qty?a.dispatch_qty:'0')).reduce(function (a, b) {
      return a + b;
    });
  }
  distotqty : any;
  removedispatch(i){
    this.dispatchlist.splice(i, 1)
    // this.dispatchlist.splice(i, 1)
    if (this.dispatchlist.length == 0 || this.dispatchlist == null) {
      this.dispatchobject = {
        dispatch_date: '',
        dispatch_qty: ''
      }
      this.dispatchlist.push(this.dispatchobject);
  }
  this.distotqty = this.dispatchlist.map(a => parseInt(a.dispatch_qty?a.dispatch_qty:'0')).reduce(function (a, b) {
    return a + b;
  });
}
disconfirm(dispatchdata) {
  console.log("body schedule", this.supplierid, this.productid)
  if (this.distotalqty != this.distotqty) {
    this.toasterService.error("Total Qty should be equal to productTotal Qty")
    return false
  }
  // this.schedule.dispatch_qty = this.dispatchdata.dispatch_qty;
  // this.schedule.dispatch_date = this.dispatchdata.dispatch_date;

    this.dispatchlist.supplierid  = this.supplierid
    this.dispatchlist.productid  = this.productid
  this.body = { "schedule": this.dispatchlist};
  console.log("body schedule", this.body)
    this.spinner.show();
    this.methodname = ""
    this.globalService.postData(this.body, this.methodname).subscribe((data) => {
      this.spinner.hide();
      console.log(data);
        // form.reset();
        this.dispatchlist = []
        this.dispatchobject = {}
        // this.productlist = []
        this.dispatchdata = []
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      })

}
// view details

totalpamount: any
  totalpqty: any
  pidata: any = []
  totPiUsd: any
  totPiUsdAmt: any
  totPiCny: any
  totPiCnyAmt: any
  piclick(product){
    this.totPiUsdAmt = '';
    this.totPiCnyAmt = '';
    if(product.zpoqty == 0){
      return false
    }
    this.body = {product};
      this.spinner.show();
      this.globalService.postData(this.body,"sup/piqtydetails/").subscribe((data) => {
      this.pidata = data;
      this.spinner.hide();
      this.totalpqty = this.pidata.map(a => parseInt(a.Poqty?a.Poqty:'0')).reduce(function (a, b) {
        return a + b;
      });
      // this.totalpamount = this.pidata.map(a => parseInt(a.amount?a.amount:'0')).reduce(function (a, b) {
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
    this.totTrUsdAmt = '';
    this.totTrCnyAmt = '';
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
    this.body = {'productid' : product.productid ,'poqty' :product.qty ,'supplierid' : this.supplierid,'price' : product.purchase_price};
      // this.spinner.show();
      this.globalService.postData(this.body,"sup/Supcart/").subscribe((data) => {
      this.transdata = data;
      this.spinner.hide();
      // this.toasterService.success("Item Added..");
      // if(this.searchText!=null || this.searchText!=undefined){
      //   this.refresh();
      // }
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      })
      
  }
  addProduct(){
    this.route.navigateByUrl('/Admin-PRODUCT MAPPING?Supplier_id=' + this.supplierid +'&A=APO');
    // this.route.navigateByUrl('/Supplier-Cha-Print?invqhid=' + data +'&A=Rep');

  }


}
