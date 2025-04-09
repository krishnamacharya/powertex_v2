import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../global-service.service';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
declare  var $: any;

@Component({
  selector: 'app-invoice-proforma-invoice',
  standalone: false,
  templateUrl: './invoice-proforma-invoice.component.html',
  styleUrls: ['./invoice-proforma-invoice.component.scss']
})
export class InvoiceProformaInvoiceComponent implements OnInit {
  loginUserData: any
  productdata: any = []
  invoicedata: any
   pro: any = {}
   productdetail: any = []
   headerdata: any = {}

  // EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  // EXCEL_EXTENSION = '.xlsx';
  // methodname1: string;
  // json: any;
   jsondata: any
  // jsondata1: any;
  // json_data1: any = {};
  // jsondata2: any;
  // json_data2: any = {};
  // jsondata3: any;
  // json_data3: any = {};
  // jsondata4: any;
  // json_data4: any = {};
  // XL_row_object: any = {};
  // flag: number;
  // uploadfile: any;
   url: string;
  // doc2: string;
  // doc3: string;
  // doc4: string;
   uploadAttrfile: any;
   attrurl: string;
  // prod_data: any;
  // uploadStockfile: any;
  // uploadlastfile: any
   stockurl: string;
   lasturl: string;
   qtys: any;
   shipmentports: any;
   dischargeports: any;
   deliverytermlist: any;
   finalform: any;

  constructor(private globalServicce: GlobalServiceService, private datePipe: DatePipe, private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.invoicedata = JSON.parse(localStorage.getItem('invoicedata'));
    
    this.getproductsdata()
    this.getshipmentports()
    this.getdischargeports()
    this.getdeliveryterms()
    this.getcurrency()
  }

  totalproductdata: any = []
  getproductsdata() {
    this.productdetail = []
    this.spinner.show();
    this.globalServicce.getDatawithMethodParams1("sup/pendinginvdtl/", this.invoicedata.invqhid).subscribe((data:any) => {
      this.productdata = data.dtl
      // console.log(this.productdata,"zzzz");
      this.pro.currency = this.productdata[0].ctype
      this.pro.shipmentport = this.invoicedata.shipmentport
      this.pro.dischargeport = this.invoicedata.dischargeport
      this.pro.payment_terms = this.invoicedata.payment_terms
      this.pro.deliveryterms = this.invoicedata.deliveryterms
      this.pro.deliverytime = this.invoicedata.deliverytime
      this.pro.description = this.invoicedata.description
      this.pro.description2 = this.invoicedata.description2
      this.pro.description3 = this.invoicedata.description3
      this.pro.invno = this.invoicedata.inv_no
      this.pro.podate = this.datePipe.transform(this.invoicedata.invdate, 'yyyy-MM-dd');
      this.pro.discount = 0;
      this.pro.fright = 0;
      this.pro.insurance = 0;
      this.pro.others = 0;
      this.qtys = this.productdata.map((e) => { return { qty: e.qty, productid: e.productid } })
      this.totalproductdata = data
      for (var i = 0; i < this.productdata.length; i++) {
        this.productdata[i]['disableinput'] = false
        if (this.productdata[i]) {
          this.productdata[i].product_name = this.productdata[i].prodtl[0].modelno
          this.productdata[i].sub_category = this.productdata[i].prodtl[0].subcategory
          this.productdata[i].brand = this.productdata[i].prodtl[0].brand
          this.productdata[i].sku_no = this.productdata[i].prodtl[0].sku_no
          this.productdata[i].amount = this.productdata[i].qty * this.productdata[i].price

        }
      }

      console.log(this.productdata,"product data");


      this.spinner.hide();
      if (this.productdata.length == 0) {
        var res = confirm("This invoice already completed")
        if (res) {
          this.route.navigateByUrl('Supplier-Invoice');
        } else {
          this.route.navigateByUrl('Supplier-Invoice');
        }
      }
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
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  };
  currencies :any;
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
  
  attrexcelUpload(evt: any): void {
    // alert("hii");
    this.uploadAttrfile = evt.target.files[0].name;
    this.onFileChange(evt.target, 'doc2');
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
      
       if (data == "doc2") {
        this.jsondata = e.target.result
        console.log("json", this.jsondata);
        this.uploaddata2()
      }
      
    };

    reader.readAsDataURL(this.file);
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
   
  }

 
  uploaddata2() {
    this.methodname = "FileUploadView/";
    this.imagedata = { "image": this.jsondata, "userid": this.loginUserData.user_id, "processes": "import" }
    this.globalServicce.postData(this.imagedata, this.methodname).subscribe((data) => {
      this.response = data;
      this.headerdata.doc2 = this.response.image
    })
  }
 
  totqty:any;
  onSubmit(form: NgForm) {
   
    this.finalform = form
    if(this.productdetail){
      $("#viewInvModal").modal('show');
    }
    if(this.productdetail.length>0){ 
      this.totqty= this.productdetail.map(a => parseFloat(a.qty?a.qty:'0')).reduce(function (a, b) {
        return a + b;
      });
    }
  }
  confirmmodal() {
    this.atributesData(this.finalform);
  }
  methodname: any
  body: any
  PData: any;
  atributesData(form) {
    console.log(this.pro.currency,'currency');
    // this.pro.invoicedate = this.datePipe.transform(this.pro.invoicedate, 'yyyy-MM-dd');
    this.headerdata.invdate = this.pro.podate
    this.headerdata.invmade = 1
    this.headerdata.invqhid = this.invoicedata.invqhid
    this.headerdata.inv_no = this.pro.invno
    this.headerdata.noofitems = this.productdetail.length
    this.headerdata.supplierid = this.invoicedata.supplierid
    this.headerdata.payment_terms = this.pro.payment_terms
    this.headerdata.deliveryterms = this.pro.deliveryterms
   
    this.headerdata.poamount = (this.pro.poamount).toFixed(2);
    this.headerdata.discount = (this.pro.discount).toFixed(2);
    this.headerdata.fright = (this.pro.fright).toFixed(2); 
    this.headerdata.insurance = (this.pro.insurance).toFixed(2);
    this.headerdata.others = (this.pro.others).toFixed(2);
    this.headerdata.poqhid = this.productdata[0].poqhid
    this.headerdata.description = this.pro.description
    this.headerdata.description2 = this.pro.description2
    this.headerdata.description3 = this.pro.description3
    this.headerdata.deliverytime = this.pro.deliverytime
    this.headerdata.shipmentport = this.pro.shipmentport
    this.headerdata.dischargeport = this.pro.dischargeport
    // this.headerdata.productimage = this.image

    console.log(this.headerdata, "pro");
    this.spinner.show();
    this.body = { "json_hdr": this.headerdata, "json_dtl": this.productdetail };
    // this.methodname = "sup/invoice/"
    //alert("service calling");
    this.methodname = "sup/makeinv/"
    this.globalServicce.postData(this.body, this.methodname).subscribe((data) => {
      this.spinner.hide();
      this.PData = data
      console.log(data);
      localStorage.setItem("supplierInvoicedata", JSON.stringify(data))
      // if (data['msg'] == 'created successfully') {
      $("#successModal").modal('show');
      // form.reset();
      // }
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      })
  }
  updatemodal() {
    // this.route.navigateByUrl('Supplier-Proforma Invoice Print');
    this.route.navigateByUrl('/Supplier-Inv-Print?invqhid=' + this.invoicedata.invqhid +'&A=IPI');
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
  
    if (product.qty == "") {
      this.pro.poamount = ""

    }
    else {
      for (let p of this.productdata) {
        if (p.poqhid == product.poqhid) {
          p.amount = JSON.parse(product.qty) * JSON.parse(product.price)
        }
      }
      console.log(this.productdata, "productdata", this.productdetail)
      if (this.productdetail.length > 0) {
        // for (let s in this.productdetail) {
        //   if (this.productdetail[s].productid == product.productid) {
        //     this.productdetail[s].amount = JSON.parse(product.qty) * JSON.parse(product.price)
        //   }
        // }
        for (let s in this.productdetail) {
          if (this.productdetail[s].poqhid == product.poqhid) {
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
  selecteditems(event, product) { 
    if(product.qty==0){
      if(event.target.checked == true){
        event.target.checked = false;
      }
      return false;
    }
    this.pro.poamount = ""
    this.pro.discount = 0;
    this.pro.fright = 0;
    this.pro.insurance = 0;
    this.pro.others = 0;
    if (event.target.checked == false) {
      if (this.productdetail.length > 0) {
        for (let s in this.productdetail) {
          if (this.productdetail[s].poqhid == product.poqhid && this.productdetail[s].productid == product.productid) {
            this.productdetail.splice(s, 1) 
          }
        }
      }
      product.disableinput = false;
    }
    else {

      product.disableinput = true;
      this.productdetail.push({
        invqhid: this.invoicedata.invqhid,
        productid: product.productid,
        poqhid: product.poqhid,
        product_name: product.product_name,
        brand: product.brand,
        qty: JSON.parse(product.qty),
        price: product.price,
        amount: product.amount,
        aviqty: product.aviqty,
        mothsqty: product.mothsqty,
        // ctype: product.ctype,
        ctype: this.pro.currency,
        design: product.design,
        // mappingid: product.mappingid.mappingid,
        packing: product.packing
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
  errmsg: boolean = false
  checkinv(invno) {
    this.body = { 'inv_no': invno , 'user_id' : this.productdata[0].supplierid } 
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