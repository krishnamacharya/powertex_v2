import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../../global-service.service';
import { ToasterService } from '../../toastr-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $ : any;
@Component({
  selector: 'app-consolidate-pi',
  standalone: false,
  templateUrl: './consolidate-pi.component.html',
  styleUrls: ['./consolidate-pi.component.scss']
})
export class ConsolidatePiComponent implements OnInit {
  loginUserData: any
  searchText: any;
  productdata: any = []
  invoicedata: any
  pro: any = {}
  productdetail: any = [] 
  headerdata: any = {}
  suppliername:any;
  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  EXCEL_EXTENSION = '.xlsx';
  methodname1: string;
  json: any;
  jsondata: any
  jsondata1: any;
  json_data1: any = {};
  jsondata2: any;
  json_data2: any = {};
  jsondata3: any;
  json_data3: any = {};
  jsondata4: any;
  json_data4: any = {};
  XL_row_object: any = {};
  flag: number;
  uploadfile: any;
  url: string;
  doc2: string;
  doc3: string;
  doc4: string;
  uploadAttrfile: any;
  attrurl: string;
  prod_data: any;
  uploadStockfile: any;
  uploadlastfile: any
  stockurl: string;
  lasturl: string;
  qtys: any;
  shipmentports: any;
  dischargeports: any;
  deliverytermlist: any;
  finalform: any;
  currencies: any;
  constructor(private globalServicce: GlobalServiceService, private DatePipe: DatePipe, private toasterService: ToasterService, private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getshipmentports()
    this.getdischargeports()
    this.getdeliveryterms()
    this.getcurrency()
    this.getsuppliers()

  }

  suppliers: any = []
  getsuppliers() {
    this.globalServicce.getDataOnlyWithMethod("sup/skuprifix").subscribe((data) => {
      this.suppliers = data;
    });
  }
  totalproductdata: any = []
  data1: any = []
  Userdetails2: any = []
  Userprofile2: any = []
  productdata1: any = []
  totproductdata: any;
  supplierid: any;
  getproductsdata(supplier) { 
    for (let name of this.suppliers) {
      if (supplier.replace(/\s/g, '') === name.business_name.replace(/\s/g, '')) {
        this.supplierid = name.user_id
        break;
      }
    }
    // this.supplierid = supplier.user_id
    this.pro.podate = this.DatePipe.transform(new Date(), "yyyy-MM-dd");
    this.pro.currency = ''
    this.pro.invno = ''
    this.pro.discount = 0;
    this.pro.fright = 0;
    this.pro.insurance = 0;
    this.pro.others = 0;
    this.productdetail = []
    this.spinner.show();
    this.globalServicce.getDatawithMethodParams1("sup/getinvoicedata/",this.supplierid).subscribe((data) => {
      this.data1 = data;
      this.productdata = this.data1.ProductDetails[0];
      this.productdata1 = this.data1.ProductDetails[0];
      this.totproductdata = this.data1.ProductDetails[0];
      this.Userdetails2 = this.data1.Userdetails[0];
      this.Userprofile2 = this.data1.Userprofile[0];
      this.pro.payment_terms = this.Userdetails2.payment_terms + ' ' + this.Userdetails2.credit_period;
      this.pro.deliveryterms = this.Userdetails2.shipment_point;
      this.pro.deliverytime = this.Userprofile2.delivery_time;
      this.qtys = this.productdata.map((e) => { return { qty: e.qty, ProductID: e.ProductID, invqty: e.invqty, poqhid: e.POQHID } })
      this.totalproductdata = data[0];
      for (var i = 0; i < this.productdata.length; i++) {
        this.productdata[i]['disableinput'] = false
        if (this.productdata[i].invqty) {
          // this.productdata[i].qty = this.productdata[i].qty - this.productdata[i].invqty
          this.productdata[i].amount = this.productdata[i].balanceqty * this.productdata[i].price
          // this.productdata[i].qty = this.productdata[i].balanceqty;
          console.log(this.productdata[i].amount,'this.productdata[i].amount')
        }
        if (this.productdata[i]) {
          this.productdata[i].sub_category = this.productdata[i].name1
          this.productdata[i].amount = '';
        }
      }



      console.log(this.productdata, "productdata")
      this.spinner.hide();
      $(function() {
        $(document).ready(function () {
            var todaysDate = new Date();
            var year = todaysDate.getFullYear();
            var month = ("0" + (todaysDate.getMonth() + 1)).slice(-2);
            var day = ("0" + todaysDate.getDate()).slice(-2);
            var maxDate = (year +"-"+ month +"-"+ day);
            $('#invdate').attr('max',maxDate);
        });
    });
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        // console.log(error);
      });
  };
  onSelect(){
    if (this.pro.currency) {
      for (let supp of this.productdata) {
         supp.CType = this.pro.currency
          // this.pro.deliveryterms = supp.deliveryterms
      }
    }
  }
  getcurrency() {
    this.globalServicce.getDataOnlyWithMethod("sup/currencydrop").subscribe((data) => {
      this.currencies = data;
    });
  }
  image: any

  file: File
  productfileUpload(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0]
      var reader = new FileReader();
      reader.onload = (event: any) => {
        //me.modelvalue = reader.result;
        this.image = event.target.result
        console.log(event.target.result);
      };
      reader.readAsDataURL(this.file);
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  };
  //excelUpload
  productexcelUpload(evt: any): void {
    this.uploadfile = evt.target.files[0].name;
    this.onFileChange(evt.target, 'doc1');
  };
  attrexcelUpload(evt: any): void {
    // alert("hii");
    this.uploadAttrfile = evt.target.files[0].name;
    this.onFileChange(evt.target, 'doc2');
  };

  stockexcelUpload(evt: any): void {

    this.uploadStockfile = evt.target.files[0].name;
    console.log("stock", this.uploadStockfile);
    this.onFileChange(evt.target, 'doc3');


  };
  fileupload4(evt: any): void {

    this.uploadlastfile = evt.target.files[0].name;
    console.log("stock", this.uploadlastfile);
    this.onFileChange(evt.target, 'doc4');


  };
  imagedata: any
  response: any
  onFileChange(evt: any, data) {

    this.file = evt.files[0]
    var reader = new FileReader();
    reader.onload = (e: any) => {
      if (data == "doc1") {
        this.url = "https://img.icons8.com/color/50/000000/ms-excel.png";
      }
      else if (data == "doc2") {
        this.attrurl = "https://img.icons8.com/color/50/000000/ms-excel.png";
      } else if (data == "doc3") {
        this.stockurl = "https://img.icons8.com/color/50/000000/ms-excel.png";
      }
      else {
        this.lasturl = "https://img.icons8.com/color/50/000000/ms-excel.png";
      }

      if (data == "doc1") {
        this.jsondata = e.target.result
        console.log("json", this.jsondata);
        this.uploaddata1()
      }
      else if (data == "doc2") {
        this.jsondata = e.target.result
        console.log("json", this.jsondata);
        this.uploaddata2()
      }
      else if (data == "doc3") {
        this.jsondata = e.target.result
        console.log("json", this.jsondata);
        this.uploaddata3()
      }
      else {
        this.jsondata = e.target.result
        console.log("json", this.jsondata);
        this.uploaddata4()
      }
    };

    reader.readAsDataURL(this.file);
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  uploaddata1() {
    this.methodname = "FileUploadView/";

    this.imagedata = { "image": this.jsondata, "userid": this.loginUserData.user_id, "processes": "import" }
    this.globalServicce.postData(this.imagedata, this.methodname).subscribe((data) => {
      this.response = data;
      this.headerdata.doc1 = this.response.image
    })
  }
  uploaddata2() {
    this.methodname = "FileUploadView/";
    this.imagedata = { "image": this.jsondata, "userid": this.loginUserData.user_id, "processes": "import" }
    this.globalServicce.postData(this.imagedata, this.methodname).subscribe((data) => {
      this.response = data;
      this.headerdata.doc2 = this.response.image
    })
  }
  uploaddata3() {
    this.methodname = "FileUploadView/";
    this.imagedata = { "image": this.jsondata, "userid": this.loginUserData.user_id, "processes": "import" }
    this.globalServicce.postData(this.imagedata, this.methodname).subscribe((data) => {
      this.response = data;
      this.headerdata.doc3 = this.response.image
    })
  }
  uploaddata4() {
    this.methodname = "FileUploadView/";

    this.imagedata = { "image": this.jsondata, "userid": this.loginUserData.user_id, "processes": "import" }
    this.globalServicce.postData(this.imagedata, this.methodname).subscribe((data) => {
      this.response = data;
      this.headerdata.doc4 = this.response.image
    })
  }
  totqty: any;
  onSubmit(form: NgForm) {
    // if()
    // $("#confirmModal").modal('show');
    // this.atributesData(form);

    for (var i = 0; i < this.productdetail.length; i++) {
      if (this.productdetail[i]) {
        this.productdetail[i].ctype = this.pro.currency
      }
    }

    if(this.productdetail.length<1){ 
      this.toasterService.warning("Add products");
      return false;
    }
    if(!this.pro.podate){
      this.toasterService.warning("Enter Invoice Date");
      return false;
    }
    if(this.productdetail){
      $("#viewConInvModal").modal('show');
      this.totqty= this.productdetail.map(a => parseFloat(a.qty?a.qty:'0')).reduce(function (a, b) {
        return a + b;
      });
    }

    this.finalform = form
  }
  confirmmodal() {
     this.atributesData(this.finalform);
  }
  methodname: any
  body: any
  PData: any
  atributesData(form) {
    // this.pro.invoicedate = this.datePipe.transform(this.pro.invoicedate, 'yyyy-MM-dd');
    this.headerdata.invdate = this.pro.podate
    this.headerdata.pono = 0
    this.headerdata.pono_ref = ""
    this.headerdata.inv_no = this.pro.invno
    this.headerdata.noofitems = this.productdetail.length
    this.headerdata.supplierid = this.supplierid
    this.headerdata.payment_terms = this.pro.payment_terms
    this.headerdata.deliveryterms = this.pro.deliveryterms
    // this.headerdata.poamount = this.pro.poamount
    this.headerdata.poamount = (this.pro.poamount).toFixed(2);
    this.headerdata.discount = (this.pro.discount).toFixed(2);
    this.headerdata.fright = (this.pro.fright).toFixed(2);
    this.headerdata.insurance = (this.pro.insurance).toFixed(2);
    this.headerdata.others = (this.pro.others).toFixed(2);
    this.headerdata.poqhid = 0
    this.headerdata.description = this.pro.description
    this.headerdata.description2 = this.pro.description2
    this.headerdata.description3 = this.pro.description3
    this.headerdata.deliverytime = this.pro.deliverytime
    this.headerdata.shipmentport = this.pro.shipmentport
    this.headerdata.dischargeport = this.pro.dischargeport
    this.headerdata.invmade = 1;

    console.log(this.headerdata, "pro");
    this.spinner.show();
    this.body = { "json_hdr": this.headerdata, "json_dtl": this.productdetail };
    this.methodname = "sup/invoice3/"
    this.globalServicce.postData(this.body, this.methodname).subscribe((data) => {
      this.spinner.hide();
      console.log(data);
      this.PData = data;
      // localStorage.setItem("supplierInvoicedata", JSON.stringify(data))
      // if (data['msg'] == 'created successfully') {
      $("#successModal").modal('show');
      // form.reset();
      // }
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        // console.log(error);
      })
  }
  updatemodal() {
    // this.route.navigateByUrl('Supplier-Proforma Invoice Print');
    this.route.navigateByUrl('/Supplier-Inv-Print?invqhid=' + this.PData.json_hdr.invqhid +'&A=CPi');

  }
  add_disable(attr) {

    let arr = ["product_name", "brand", "qty", "price", "amount"];
    for (let i of arr) {
      if (attr[i] == null || attr[i] == undefined) {

        return true;
      }
    }

    return false;
  }

  selectedlist: any = []
  qtychange(product) {
    for (let p of this.qtys) {
      if (p.poqhid == product.POQHID && p.ProductID == product.ProductID) {
        console.log(JSON.parse(product.qty), p.qty);
      }
    }
    if(this.productdetail.length>0){
      for(let s in this.productdetail){
      if(this.productdetail[s].poqhid==product.POQHID && this.productdetail[s].productid == product.ProductID){
         this.productdetail.splice(s,1)
      }
      }
    }
    // console.log(this.total345,"totalproductdata")
    if (product.qty == "") {
      this.pro.poamount = ""

    }
    else {
      for (let p of this.productdata) {
        if (p.POQHID == product.POQHID  && p.ProductID ==product.ProductID) {
          p.amount = JSON.parse(product.qty) * JSON.parse(product.price)
        }
      }
      console.log(this.productdata, "productdata", this.productdetail)
      if (this.productdetail.length > 0) {
        for (let s in this.productdetail) {
          if (this.productdetail[s].poqhid == product.POQHID  && this.productdetail[s].ProductID ==product.ProductID) {
            this.productdetail[s].amount = JSON.parse(product.qty) * JSON.parse(product.price)
          }
        }
        if (this.productdetail.length == 1) {
          this.pro.poamount = this.productdetail.filter((item) => item.amount)
            .map((item) => +item.amount).reduce((sum, current) => 0 + current);
        }
        if (this.productdetail.length > 1) {
          this.pro.poamount = this.productdetail.filter((item) => item.amount)
            .map((item) => +item.amount)
            .reduce((sum, current) => sum + current);
        }
        console.log(this.pro)
      }
    }
  }
  keynumber(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  keynumber2(event: any) {
    const pattern = /^-?\d*\.?\d{0,6}$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  productslist: any = []
  prd: any
  selecteditems(event, product) {
    if(product.qty==0){
      if(event.target.checked == true){
        event.target.checked = false;
      }
      return false;
    }
    if(!this.pro.currency){
      this.toasterService.warning("Select Currency");
      if(event.target.checked == true){
        event.target.checked = false;
      }
      return false;
    }
    this.prd = product.CType
    if(this.productdetail){
      this.productdetail.filter((a) => { return a.ctype == product.CType})
    }
    this.pro.poamount = ""
    this.pro.discount = 0;
    this.pro.fright = 0;
    this.pro.insurance = 0;
    this.pro.others = 0;
    if (event.target.checked == false) {
      if (this.productdetail.length > 0) {
        for (let s in this.productdetail) {
          if (this.productdetail[s].poqhid == product.POQHID && this.productdetail[s].productid == product.ProductID) {
            this.productdetail.splice(s, 1)
          }
        }
      }
      product.disableinput = false;
    }
    else {

      product.disableinput = true;
      this.productdetail.push({
        poqhid: product.POQHID,
        productid: product.ProductID,
        product_name: product.product_name,
        brand: product.brand,
        qty: JSON.parse(product.qty),
        price: product.price,
        amount: product.amount,
        aviqty: product.AviQty,
        mothsqty: product.MothsQty,
        ctype: this.pro.currency,
        design: product.Design,
        mappingid: product.mappingid,
        packing: product.Packing
      })
    }
    if(this.productdetail.length > 0){
      this.totqty= this.productdetail.map(a => parseFloat(a.qty?a.qty:'0')).reduce(function (a, b) {
        return a + b;
      })
    }
    console.log(this.productdetail, "productdetail")

    if (this.productdetail.length == 1) {
      this.pro.poamount = this.productdetail.filter((item) => item.amount)
        .map((item) => +item.amount).reduce((sum, current) => 0 + current);
    }
    if (this.productdetail.length > 1) {
      this.pro.poamount = this.productdetail.filter((item) => item.amount)
        .map((item) => +item.amount)
        .reduce((sum, current) => sum + current);
    }
    if (this.productdetail.length == 0) {
      this.pro.poamount = ""
      this.pro.discount = 0;
      this.pro.fright = 0;
      this.pro.insurance = 0;
      this.pro.others = 0;
      this.totqty = "";
    }
  }
  getshipmentports() {
    this.globalServicce.getDataOnlyWithMethod("sup/shipmentport").subscribe((data) => {
      this.shipmentports = data;
    });

  }
  getdischargeports() {
    this.globalServicce.getDataOnlyWithMethod("sup/dischargeport").subscribe((data) => {
      this.dischargeports = data;
    });

  }
  getdeliveryterms() {
    this.globalServicce.getDatawithInput_id(15.2).subscribe((data) => {
      this.deliverytermlist = data;
    });
  }
  addDiscount(event) {
    this.pro.poamount = parseFloat(this.pro.poamount) + parseFloat(this.pro.discount)
    this.pro.discount = parseFloat(event.target.value)
    if (isNaN(this.pro.discount)) {
      this.pro.discount = 0
    }
    this.pro.poamount = parseFloat(this.pro.poamount) - parseFloat(this.pro.discount)
  }
  addfright(event) {
    this.pro.poamount = parseFloat(this.pro.poamount) - parseFloat(this.pro.fright)
    this.pro.fright = parseFloat(event.target.value)
    if (isNaN(this.pro.fright)) {
      this.pro.fright = 0
    }
    this.pro.poamount = parseFloat(this.pro.poamount) + parseFloat(this.pro.fright)
  }
  addinsurance(event) {
    this.pro.poamount = parseFloat(this.pro.poamount) - parseFloat(this.pro.insurance)
    this.pro.insurance = parseFloat(event.target.value)
    if (isNaN(this.pro.insurance)) {
      this.pro.insurance = 0
    }
    this.pro.poamount = parseFloat(this.pro.poamount) + parseFloat(this.pro.insurance)
  }
  addothers(event) {
    this.pro.poamount = parseFloat(this.pro.poamount) - parseFloat(this.pro.others)
    this.pro.others = parseFloat(event.target.value)
    if (isNaN(this.pro.others)) {
      this.pro.others = 0
    }
    this.pro.poamount = parseFloat(this.pro.poamount) + parseFloat(this.pro.others)
  }
  addExtras() {
    if (this.pro.discount) {
      this.pro.poamount = this.pro.poamount - this.pro.discount
    }
    if (this.pro.fright > 0) {
      this.pro.poamount = this.pro.poamount + this.pro.fright
    }
    if (this.pro.insurance > 0) {
      this.pro.poamount = this.pro.poamount + this.pro.insurance
    }
    if (this.pro.others > 0) {
      this.pro.poamount = this.pro.poamount + this.pro.others
    }

  }
  searchdata(data) {
    if (data) {
      this.productdata = []
      for (var i = 0; i < this.totproductdata.length; i++) {
        if ((this.totproductdata[i].product_name.toLowerCase().includes(data.toLowerCase()))) {
          this.productdata.push(this.totproductdata[i])
        }
      }
    }
    else {
      this.productdata = this.totproductdata
    }
  }
  errmsg: boolean = false
  checkinv(invno) {
    this.body = { 'inv_no': invno , 'user_id' : this.supplierid } 
    this.globalServicce.postData(this.body, "sup/checksupinvnumber/").subscribe((resp1) => { 
      this.spinner.hide()
      this.response = resp1
      if (this.response.msg == "this number already exists") {
        this.errmsg = true
      }
      else {
        this.errmsg = false
      }
    })
  }
}