import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../../global-service.service';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-supplier-invoice-profoma',
  standalone: false,
  templateUrl: './supplier-invoice-profoma.component.html',
  styleUrls: ['./supplier-invoice-profoma.component.scss']
})
export class SupplierInvoiceProfomaComponent implements OnInit {

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
  constructor(private globalServicce: GlobalServiceService, private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.invoicedata = JSON.parse(localStorage.getItem('invoicedata'));
    this.pro.shipmentport = this.invoicedata.shipmentport
    this.pro.dischargeport = this.invoicedata.dischargeport
    this.pro.payment_terms = this.invoicedata.payment_terms
    this.pro.deliveryterms = this.invoicedata.deliveryterms
    this.pro.poamount = this.invoicedata.poamount
    this.getproductsdata()
  }

  totalproductdata: any = []
  getproductsdata() {
    this.productdetail = []
    this.spinner.show();
    this.globalServicce.getDatawithMethodParams1("sup/poqhdrdata", this.invoicedata.poqhid).subscribe((data) => {
      this.productdata = data
      this.totalproductdata = data
      for (var i = 0; i < this.productdata.length; i++) {
        if (this.productdata[i].invqty) {
          this.productdata[i].qty = this.productdata[i].qty - this.productdata[i].invqty
          this.productdata[i].amount = this.productdata[i].qty * this.productdata[i].price
        }
        if (this.productdata[i].productid.long_name) {
          this.productdata[i].product_name = this.productdata[i].productid.long_name + ' ' + this.productdata[i].productid.modelno
          this.productdata[i].brand = this.productdata[i].productid.brand

        }
        else {
          this.productdata[i].product_name = this.productdata[i].productid.modelno
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

    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  };
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
      //   else if (data == "doc3") {
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
    this.methodname = "ImageUploadView/";

    this.imagedata = { "image": this.jsondata, "userid": this.loginUserData.user_id, "processes": "import" }
    this.globalServicce.postData(this.imagedata, this.methodname).subscribe((data) => {
      this.response = data;
      this.headerdata.doc1 = this.response.image
    })
  }
  uploaddata2() {
    this.methodname = "ImageUploadView/";
    this.imagedata = { "image": this.jsondata, "userid": this.loginUserData.user_id, "processes": "import" }
    this.globalServicce.postData(this.imagedata, this.methodname).subscribe((data) => {
      this.response = data;
      this.headerdata.doc2 = this.response.image
    })
  }
  uploaddata3() {
    this.methodname = "ImageUploadView/";
    this.imagedata = { "image": this.jsondata, "userid": this.loginUserData.user_id, "processes": "import" }
    this.globalServicce.postData(this.imagedata, this.methodname).subscribe((data) => {
      this.response = data;
      this.headerdata.doc3 = this.response.image
    })
  }
  uploaddata4() {
    this.methodname = "ImageUploadView/";

    this.imagedata = { "image": this.jsondata, "userid": this.loginUserData.user_id, "processes": "import" }
    this.globalServicce.postData(this.imagedata, this.methodname).subscribe((data) => {
      this.response = data;
      this.headerdata.doc4 = this.response.image
    })
  }
  onSubmit(form: NgForm) {
    this.atributesData(form);
  }
  methodname: any
  body: any
  proformadata:any
  atributesData(form) {
    this.headerdata.pono = this.invoicedata.pono
    this.headerdata.podate = this.invoicedata.podate
    this.headerdata.inv_no = this.pro.invno
    this.headerdata.noofitems = this.productdetail.length
    this.headerdata.supplierid = this.invoicedata.supplierid.user_id
    this.headerdata.payment_terms = this.invoicedata.payment_terms
    this.headerdata.deliveryterms = this.invoicedata.deliveryterms
    this.headerdata.poamount = this.pro.poamount
    this.headerdata.poqhid = this.invoicedata.poqhid
    this.headerdata.description = this.invoicedata.description
    this.headerdata.shipmentport = this.invoicedata.shipmentport
    this.headerdata.dischargeport = this.invoicedata.dischargeport
    // this.headerdata.productimage = this.image

    console.log(this.headerdata, "pro");
    this.spinner.show();
    this.body = { "json_hdr": this.headerdata, "json_dtl": this.productdetail, "profoma": true };
    this.methodname = "sup/invoice/"
    this.globalServicce.postData(this.body, this.methodname).subscribe((data) => {
      this.spinner.hide();
      this.proformadata=data
      console.log(data);
      // if (data['msg'] == 'created successfully') {
        localStorage.setItem("supplierInvoicedata", JSON.stringify(this.proformadata.data))
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
    this.route.navigateByUrl('Supplier-Proforma Invoice Print');
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
    // if(this.productdetail.length>0){
    //   for(let s in this.productdetail){
    //   if(this.productdetail[s].productid==product.productid.productid){
    // this.productdetail.splice(s,1)
    //   }
    //   }
    // }
    // console.log(this.totalproductdata,"totalproductdata")
    if (product.qty == "") {
      this.pro.poamount = ""

    }
    else {
      for (let p of this.productdata) {
        if (p.productid.productid == product.productid.productid) {
          p.amount = JSON.parse(product.qty) * JSON.parse(product.price)
        }
      }
      console.log(this.productdata, "productdata")
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
  productslist: any = []
  selecteditems(event, product) {

    if (event.target.checked == false) {
      if (this.productdetail.length > 0) {
        for (let s in this.productdetail) {
          if (this.productdetail[s].productid == product.productid.productid) {
            this.productdetail.splice(s, 1)
          }
        }
      }
    }
    else {


      this.productdetail.push({
        productid: product.productid.productid,
        product_name: product.product_name,
        brand: product.brand,
        qty: JSON.parse(product.qty),
        price: product.price,
        amount: product.amount,
        aviqty: product.aviqty,
        mothsqty: product.mothsqty,
        ctype: product.ctype,
        design: product.design,
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
    }
  }
}
