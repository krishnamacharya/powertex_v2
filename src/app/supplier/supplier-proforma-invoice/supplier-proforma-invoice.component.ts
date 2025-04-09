import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GlobalServiceService } from "../../global-service.service";
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from "@angular/forms";
import { ToasterService } from '../../toastr-service.service';
import { DatePipe } from '@angular/common';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-supplier-proforma-invoice',
  standalone: false,
  templateUrl: './supplier-proforma-invoice.component.html',
  styleUrls: ['./supplier-proforma-invoice.component.scss']
})
export class SupplierProformaInvoiceComponent implements OnInit {
  loginUserData: any
  productdata: any = []
  invoicedata: any
  pro: any = {}
  productdetail: any = []
  headerdata: any = {}

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
  constructor(private globalServicce: GlobalServiceService, private datePipe: DatePipe, private toasterService: ToasterService, private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.invoicedata = JSON.parse(localStorage.getItem('invoicedata'));
    // this.pro.shipmentport = this.invoicedata.shipmentport
    // this.pro.dischargeport = this.invoicedata.dischargeport
    // this.pro.payment_terms = this.invoicedata.payment_terms
    // this.pro.deliveryterms = this.invoicedata.deliveryterms
    // this.pro.deliverytime = this.invoicedata.deliverytime
    // this.pro.description = this.invoicedata.description
    // this.pro.description2 = this.invoicedata.description2
    // this.pro.description3 = this.invoicedata.description3
    // this.pro.podate = this.datePipe.transform(this.invoicedata.podate, 'yyyy-MM-dd');
    // this.pro.discount = 0;
    // this.pro.fright = 0;
    // this.pro.insurance = 0;
    // this.pro.others = 0;
    // this.pro.poamount = this.invoicedata.poamount
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
    this.globalServicce.getDatawithMethodParams1("sup/poqhdrdata/", this.invoicedata.poqhid).subscribe((data) => {
      this.productdata = data
      this.pro.currency = this.productdata[0].ctype
      this.pro.shipmentport = this.productdata[0].poqhid.shipmentport
      this.pro.dischargeport = this.productdata[0].poqhid.dischargeport
      this.pro.payment_terms = this.productdata[0].poqhid.payment_terms
      this.pro.deliveryterms = this.productdata[0].poqhid.deliveryterms
      this.pro.deliverytime = this.productdata[0].poqhid.deliverytime
      this.pro.description = this.productdata[0].poqhid.description
      this.pro.description2 = this.productdata[0].poqhid.description2
      this.pro.description3 = this.productdata[0].poqhid.description3
      this.pro.podate = this.datePipe.transform(this.productdata[0].poqhid.podate, 'yyyy-MM-dd');
      this.pro.discount = 0;
      this.pro.fright = 0;
      this.pro.insurance = 0;
      this.pro.others = 0;
      this.qtys = this.productdata.map((e) => { return { qty: e.qty, productid: e.productid.productid, invqty: e.invqty } })
      this.totalproductdata = data
      for (var i = 0; i < this.productdata.length; i++) {
        this.productdata[i]['disableinput'] = false
        if (this.productdata[i].invqty) {
          this.productdata[i].qty = this.productdata[i].qty - this.productdata[i].invqty
          this.productdata[i].amount = this.productdata[i].qty * this.productdata[i].price
        }
        if (this.productdata[i].productid.long_name) {
          // this.productdata[i].product_name = this.productdata[i].productid.long_name + ' ' + this.productdata[i].productid.modelno
          // this.productdata[i].product_name = this.productdata[i].mappingid.product_name
          this.productdata[i].product_name = this.productdata[i].productid.modelno
          this.productdata[i].sub_category = this.productdata[i].productid.name1
          this.productdata[i].brand = this.productdata[i].productid.brand

        }
        else {
          this.productdata[i].product_name = this.productdata[i].productid.modelno
          // this.productdata[i].product_name = this.productdata[i].mappingid.product_name
          this.productdata[i].sub_category = this.productdata[i].productid.name1
          this.productdata[i].brand = this.productdata[i].productid.brand
        }
        // this.productdetail.push({
        //   productid:this.productdata[i].productid.productid,
        //   product_name: this.productdata[i].product_name,
        //   brand: this.productdata[i].brand,
        //   qty: this.productdata[i].qty,
        //   price: this.productdata[i].price,
        //   amount: this.productdata[i].amount,
        //   aviqty:this.productdata[i].aviqty,
        //   mothsqty:this.productdata[i].mothsqty,
        //   ctype:this.productdata[i].ctype,
        //   design:this.productdata[i].design,
        //   packing:this.productdata[i].packing
        // })
      }



      console.log(this.productdata, "productdata")
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

    /* wire up file reader */
    // const file: File = evt.files[0];

    // const reader: FileReader = new FileReader();
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
      // this.url = "https://img.icons8.com/color/50/000000/ms-excel.png";
      // /* read workbook */
      // const result: string = e.target.result;
      // const wb: XLSX.WorkBook = XLSX.read(result, { type: 'binary', cellDates: true, cellText: false, dateNF: 'yyyy/mm/dd' });

      // /* grab first sheet */
      // const wsname: string = wb.SheetNames[0];
      // const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      //   if (data == "doc1") {
      //   this.jsondata1 = (XLSX.utils.sheet_to_json(ws));
      //   this.json_data1 = JSON.stringify(this.jsondata1);
      //   console.log("json",this.json_data1);
      //   this.uploaddata()

      //   }
      //   else if (data == "doc2") {
      //   this.jsondata2 = (XLSX.utils.sheet_to_json(ws));
      //   this.json_data2= JSON.stringify(this.jsondata2);
      //   console.log("json",this.json_data2);
      //   }
      //   else if (data == "do6
      //   this.jsondata3 = (XLSX.utils.sheet_to_json(ws));
      //   this.json_data3= JSON.stringify(this.jsondata3);
      //   console.log("json",this.json_data3);
      //   }
      //   else {
      //   this.jsondata4= (XLSX.utils.sheet_to_json(ws));
      //   this.json_data4= JSON.stringify(this.jsondata4);
      //   console.log("json",this.json_data4);
      //   }
      // }
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
    // reader.readAsBinaryString(evt.files[0]);
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
  totqty:any;
  onSubmit(form: NgForm) {
    // $("#confirmModal").modal('show');
    // this.atributesData(form);
    this.finalform = form
    if(this.productdetail.length>0){ 
      this.totqty= this.productdetail.map(a => parseFloat(a.qty?a.qty:'0')).reduce(function (a, b) {
        return a + b;
      });
    }else{
      this.toasterService.warning("Please Select products")
      return false;
    }
    if(this.productdetail){
      $("#viewInvModal").modal('show');
    }
  }
  confirmmodal() {
    this.atributesData(this.finalform);
  }
  methodname: any
  body: any
  atributesData(form) {
    // this.pro.invoicedate = this.datePipe.transform(this.pro.invoicedate, 'yyyy-MM-dd');
    this.headerdata.invdate = this.pro.podate
    this.headerdata.pono = this.productdata[0].poqhid.pono
    this.headerdata.pono_ref = this.productdata[0].poqhid.pono_ref
    this.headerdata.podate = this.productdata[0].poqhid.podate
    this.headerdata.inv_no = this.pro.invno
    this.headerdata.noofitems = this.productdetail.length
    this.headerdata.supplierid = this.productdata[0].poqhid.supplierid.user_id
    this.headerdata.payment_terms = this.pro.payment_terms
    this.headerdata.deliveryterms = this.pro.deliveryterms
    this.headerdata.poamount = (this.pro.poamount).toFixed(2);
    this.headerdata.discount = (this.pro.discount).toFixed(2);
    this.headerdata.fright = (this.pro.fright).toFixed(2); 
    this.headerdata.insurance = (this.pro.insurance).toFixed(2);
    this.headerdata.others = (this.pro.others).toFixed(2);
    this.headerdata.poqhid = this.productdata[0].poqhid.poqhid
    this.headerdata.description = this.pro.description
    this.headerdata.description2 = this.pro.description2
    this.headerdata.description3 = this.pro.description3
    this.headerdata.deliverytime = this.pro.deliverytime
    this.headerdata.shipmentport = this.pro.shipmentport
    this.headerdata.dischargeport = this.pro.dischargeport
    // this.headerdata.productimage = this.image
    this.headerdata.invmade = 1;

    console.log(this.headerdata, "pro");
    this.spinner.show();
    this.body = { "json_hdr": this.headerdata, "json_dtl": this.productdetail };
    this.methodname = "sup/invoice/"
    this.globalServicce.postData(this.body, this.methodname).subscribe((data) => {
      this.spinner.hide();
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
    this.route.navigateByUrl('Supplier-Proforma Invoice Print?S=IMK');
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
      if (p.productid == product.productid.productid) {
        console.log(JSON.parse(product.qty), p.qty);
        if (JSON.parse(product.qty) > (p.qty - p.invqty)) {
          product.qty = p.qty - p.invqty;
          // alert("cannot proceed more than PI quantity")
          $("#alertpopup").modal('show');
        }
      }
    }
    // if(this.productdetail.length>0){
    //   for(let s in this.productdetail){
    //   if(this.productdetail[s].productid==product.productid.productid){
    // this.productdetail.splice(s,1)
    //   }
    //   }
    // }
    // console.log(this.total345,"totalproductdata")
    if (product.qty == "") {
      this.pro.poamount = ""

    }
    else {
      for (let p of this.productdata) {
        if (p.productid.productid == product.productid.productid) {
          p.amount = JSON.parse(product.qty) * JSON.parse(product.price)
        }
      }
      console.log(this.productdata, "productdata", this.productdetail)
      if (this.productdetail.length > 0) {
        for (let s in this.productdetail) {
          if (this.productdetail[s].productid == product.productid.productid) {
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
          if (this.productdetail[s].productid == product.productid.productid) {
            this.productdetail.splice(s, 1)
          }
        }
      }
      product.disableinput = false;
    }
    else {

      product.disableinput = true;
      this.productdetail.push({
        poqhid: product.poqhid.poqhid,
        productid: product.productid.productid,
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
        mappingid: product.mappingid.mappingid,
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
      this.totqty = ""
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
    this.body = { 'inv_no': invno , 'user_id' : this.loginUserData.user_id } 
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
