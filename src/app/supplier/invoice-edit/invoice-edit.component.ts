import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../../global-service.service';
import { ToasterService } from '../../toastr-service.service';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-invoice-edit',
  standalone: false,
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.scss']
})
export class InvoiceEditComponent implements OnInit {
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
  totqty: any;
  constructor(private globalServicce: GlobalServiceService, private datePipe: DatePipe, private toasterService: ToasterService, private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.invoicedata = JSON.parse(localStorage.getItem('invData'));
    this.getproductsdata()
    this.getshipmentports()
    this.getdischargeports()
    this.getdeliveryterms()
    this.getcurrency()
  }

  totalproductdata: any = []
  invccdata: any = []
  getproductsdata() {
    this.productdetail = []
    this.spinner.show();
        this.globalServicce.postDatawithQueryPar('sup/invoice2/',  this.invoicedata.INVQHID).subscribe((data: any) => {
          // this.globalServicce.getDatawithMethodParams1("sup/invoice2/", this.invoicedata.INVQHID).subscribe((data) => {
      this.productdata = data.json_dtl
      this.invccdata = data.json_hdr[0]
      this.pro.currency = this.productdata[0].ctype
      this.pro.invno = this.invccdata.inv_no
      this.pro.shipmentport = this.invccdata.shipmentport
      this.pro.dischargeport = this.invccdata.dischargeport
      this.pro.payment_terms = this.invccdata.payment_terms
      this.pro.deliveryterms = this.invccdata.deliveryterms
      this.pro.deliverytime = this.invccdata.deliverytime
      this.pro.description = this.invccdata.description
      this.pro.description2 = this.invccdata.description2
      this.pro.description3 = this.invccdata.description3
      this.pro.podate = this.datePipe.transform(this.invccdata.invdate, 'yyyy-MM-dd');
      this.pro.discount = this.invccdata.discount;
      this.pro.fright =  this.invccdata.fright;
      this.pro.insurance =  this.invccdata.insurance;
      this.pro.others =  this.invccdata.others;
      this.pro.poamount = this.invccdata.poamount;
      this.qtys = this.productdata.map((e) => { return { qty: e.qty, productid: e.productid.productid, invqty: e.invqty } })
      this.totalproductdata = data
      for (var i = 0; i < this.productdata.length; i++) {
        this.productdata[i]['disableinput'] = false
        console.log(this.productdata[i].invqty,'this.productdata[i].invqty')
        // if (this.productdata[i].id) {
        //   this.productdata[i].qty = this.productdata[i].qty - this.productdata[i].invqty
        //   this.productdata[i].amount = this.productdata[i].qty * this.productdata[i].price
        // }
        if (this.productdata[i]) {
          // this.productdata[i].product_name = this.productdata[i].productid.long_name + ' ' + this.productdata[i].productid.modelno
          this.productdata[i].product_name = this.productdata[i].productid.modelno
          this.productdata[i].sub_category = this.productdata[i].productid.name1
          this.productdata[i].brand = this.productdata[i].productid.brand
          this.productdata[i].amount = this.productdata[i].qty * this.productdata[i].price
          this.pro.poamount = this.productdata.map(a => parseFloat(a.amount?a.amount:'0')).reduce(function (a, b) {
            return a + b;
          });
          this.addExtras();
          if(this.productdata.length > 0){
            this.totqty= this.productdata.map(a => parseFloat(a.qty?a.qty:'0')).reduce(function (a, b) {
              return a + b;
            })
          }
        }
        else {
          // this.productdata[i].product_name = this.productdata[i].productid.modelno
          this.productdata[i].product_name = this.productdata[i].productid.modelno
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
      // if (this.productdata.length == 0) {
      //   var res = confirm("This invoice already completed")
      //   if (res) {
      //     this.route.navigateByUrl('Supplier-Invoice');
      //   } else {
      //     this.route.navigateByUrl('Supplier-Invoice');
      //   }
      // }
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
  onSubmit(form: NgForm) {
    $("#confirmModal").modal('show');
    // this.atributesData(form);
    this.finalform = form
  }
  obj :any;
  confirmmodal() {
    this.obj={}
    this.productdetail = [];
    for (let product of this.productdata) {
      if(product.qty!=0){
         this.obj = {
          invqhid : this.invccdata.invqhid,
          poqhid: product.poqhid,
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
        }
        this.productdetail.push(this.obj);
      }else{
        this.deletedproducts.push({
         invqhid: this.invccdata.invqhid,
         poqhid: product.poqhid,
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
    }
    if(this.productdetail.length==0){
      this.toasterService.warning("No Products Added");
      return false;
    }
    this.atributesData(this.finalform);
  }
  methodname: any
  body: any
  atributesData(form) {
    // this.pro.invoicedate = this.datePipe.transform(this.pro.invoicedate, 'yyyy-MM-dd');
    this.headerdata.invdate = this.pro.podate
    this.headerdata.pono = this.invccdata.pono
    this.headerdata.pono_ref = this.invccdata.pono_ref
    this.headerdata.podate = this.invccdata.podate 
    this.headerdata.invqhid = this.invccdata.invqhid
    this.headerdata.inv_no = this.pro.invno
    this.headerdata.noofitems = this.productdetail.length
    this.headerdata.supplierid = this.invccdata.supplierid.user_id
    this.headerdata.payment_terms = this.pro.payment_terms
    this.headerdata.deliveryterms = this.pro.deliveryterms
    // this.headerdata.poamount = this.pro.poamount
    this.headerdata.poamount = (this.pro.poamount).toFixed(2);
    this.headerdata.discount = this.pro.discount
    this.headerdata.fright = this.pro.fright
    this.headerdata.insurance = this.pro.insurance
    this.headerdata.others = this.pro.others
    this.headerdata.poqhid = this.invccdata.poqhid
    this.headerdata.description = this.pro.description
    this.headerdata.description2 = this.pro.description2
    this.headerdata.description3 = this.pro.description3
    this.headerdata.deliverytime = this.pro.deliverytime
    this.headerdata.shipmentport = this.pro.shipmentport
    this.headerdata.dischargeport = this.pro.dischargeport
    // this.headerdata.productimage = this.image
    if(!this.pro.doc2){
      this.headerdata.doc2 = this.invccdata.doc2
    }

    console.log(this.headerdata, "pro");
    this.spinner.show();
    this.body = { "json_hdr": this.headerdata, "json_dtl": this.productdetail, "deleted": this.deletedproducts };
    this.methodname = "sup/invoicedit/"
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
    // this.route.navigateByUrl('Supplier-Proforma Invoice Print');
    this.route.navigateByUrl('Supplier-Inv-Print?invqhid=' + this.invccdata.invqhid);
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
    if (product.qty == "") {
      this.pro.poamount = ""

    }
    else {
      for (let p of this.productdata) {
        // if (p.productid.productid == product.productid.productid && p.id == product.id) {
        if (p.id == product.id) {
          p.amount = JSON.parse(product.qty) * JSON.parse(product.price)
        }
      }
      console.log(this.productdata, "productdata", this.productdetail)
      // if (this.productdetail.length > 0) {
      //   for (let s in this.productdetail) {
      //     if (this.productdetail[s].productid == product.productid.productid && this.productdetail[s].id == product.id) {
      //       this.productdetail[s].amount = JSON.parse(product.qty) * JSON.parse(product.price)
      //     }
      //   }
      //   if (this.productdetail.length == 1) {
      //     this.pro.poamount = this.productdetail.filter((item) => item.amount)
      //       .map((item) => +item.amount).reduce((sum, current) => 0 + current);
      //   }
      //   if (this.productdetail.length > 1) {
      //     this.pro.poamount = this.productdetail.filter((item) => item.amount)
      //       .map((item) => +item.amount)
      //       .reduce((sum, current) => sum + current);
      //   }
      //   console.log(this.pro)
      // }
      this.pro.poamount = this.productdata.map(a => parseFloat(a.amount?a.amount:'0')).reduce(function (a, b) {
        return a + b;
      });
      this.totqty= this.productdata.map(a => parseFloat(a.qty?a.qty:'0')).reduce(function (a, b) {
        return a + b;
      })
      this.addExtras()
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
    // this.pro.poamount = ""
    // this.pro.discount = 0;
    // this.pro.fright = 0;
    // this.pro.insurance = 0;
    // this.pro.others = 0;
    if (event.target.checked == false) {
      if (this.productdetail.length > 0) {
        for (let s in this.productdetail) {
          if (this.productdetail[s].productid == product.productid.productid  && this.productdetail[s].id == product.id) {
            this.productdetail.splice(s, 1)
          }
        }
      }
      product.disableinput = false;
    }
    else {

      product.disableinput = true;
      this.productdetail.push({
        invqhid : this.invccdata.invqhid,
        poqhid: product.poqhid,
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
    }
  }
  deletedproducts : any = []
  delpro(i,product){
    if (this.productdata.length > 1) {
          this.deletedproducts.push({
                 invqhid: this.invccdata.invqhid,
                poqhid: product.poqhid,
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
               this.productdata.splice(i, 1)
               console.log( this.deletedproducts,' this.deletedproducts');
              }
              this.pro.poamount = this.productdata.map(a => parseFloat(a.amount?a.amount:'0')).reduce(function (a, b) {
                return a + b;
              });
              this.addExtras()
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
    // Invoice Upload
    // uploadStockfile: any; 
    attrexcelUpload(evt: any): void {
  
      this.uploadStockfile = evt.target.files[0].name;
      console.log("stock", this.uploadStockfile);
      this.onFileChange(evt.target, 'doc2');
  
  
    };
    file: File
    // attrurl: string;
    imagedata: any
    response: any
    // stockurl: string;
    // lasturl: string;
    // jsondata: any
    // doc3: string;
    // pro: any = {};
    headerdata1: any = {}
    onFileChange(evt: any, data) {
  
      /* wire up file reader */
      // const file: File = evt.files[0];
  
      // const reader: FileReader = new FileReader();
      this.file = evt.files[0]
      var reader = new FileReader();
      reader.onload = (e: any) => {
        if (data == "doc2") {
          this.stockurl = "https://img.icons8.com/color/50/000000/ms-excel.png";
        }
        else {
          this.lasturl = "https://img.icons8.com/color/50/000000/ms-excel.png";
        }
  
       
        if (data == "doc2") {
          this.jsondata = e.target.result
          console.log("json", this.jsondata);
          this.uploaddata3()
        }
      };
  
      reader.readAsDataURL(this.file);
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
    uploaddata3() {
      this.methodname = "FileUploadView/";
      this.imagedata = { "image": this.jsondata, "userid": this.loginUserData.user_id, "processes": "import" }
      this.globalServicce.postData(this.imagedata, this.methodname).subscribe((data) => {
        this.response = data;
        this.headerdata.doc2 = this.response.image
      })
    }

}
