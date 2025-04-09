import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { GlobalServiceService } from '../../global-service.service';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-supplier-reports-supplier',
  standalone: false,
  templateUrl: './supplier-reports-supplier.component.html',
  styleUrls: ['./supplier-reports-supplier.component.scss']
})
export class SupplierReportsSupplierComponent implements OnInit {
changenw(_t309: any) {
throw new Error('Method not implemented.');
}
  loginUserData: any;
  p: any = 1;
  orders: any = [];
  POhidden: boolean = true;
  DOhidden: boolean = false;
  SOhidden: boolean = false;
  removedata: any;
  fromdate: any;
  tilldate: any;
  maxdate: any;
searchText: any;

  constructor(private DatePipe: DatePipe, private globalServicce: GlobalServiceService, private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.fromdate = new Date().getUTCFullYear() + "-" + "01" + "-" + "01";
    this.tilldate = new Date();
    this.maxdate = new Date();
    this.getpidetails()
  }
  po() {
    this.POhidden = true;
    this.DOhidden = false;
    this.SOhidden = false;
    this.getpidetails()
  }
  getpidetails() {
    if (this.orders) {
      this.orders = []
    }
    this.spinner.show();
    let from, till;
    if (this.fromdate && this.tilldate) {
      from = this.DatePipe.transform(this.fromdate, "yyyy-MM-dd")
      till = this.DatePipe.transform(this.tilldate, "yyyy-MM-dd")
    } else {
      from = this.DatePipe.transform(new Date('1900-01-01'), "yyyy-MM-dd");
      till = this.DatePipe.transform(new Date(), "yyyy-MM-dd");
    }
    this.globalServicce.getDatawithMethodParams2dates('sup/piregister/', from, till).subscribe((data) => {
      if (this.orders) {
        this.orders = []
      }
      this.orders = data
      this.spinner.hide();
      // console.log(this.orders)

    },
      error => {
        this.spinner.hide();
        console.log(error);
      });

  };
  do() {
    this.POhidden = false;
    this.DOhidden = true;
    this.SOhidden = false;
    this.getinvregister()
  }
  getinvregister() {
    if (this.orders) {
      this.orders = []
    }
    this.spinner.show();
    let from, till;
    if (this.fromdate && this.tilldate) {
      from = this.DatePipe.transform(this.fromdate, "yyyy-MM-dd")
      till = this.DatePipe.transform(this.tilldate, "yyyy-MM-dd")
    } else {
      from = this.DatePipe.transform(new Date('1900-01-01'), "yyyy-MM-dd");
      till = this.DatePipe.transform(new Date(), "yyyy-MM-dd");
    }
    this.globalServicce.getDatawithMethodParams3('sup/getsupinvregister/', this.loginUserData.user_id, from, till).subscribe((data) => {
      if (this.orders) {
        this.orders = []
      }
      this.orders = data
      this.spinner.hide();
      // console.log(this.orders)

    },
      error => {
        this.spinner.hide();
        console.log(error);
      });

  };

  so() {
    this.POhidden = false;
    this.DOhidden = false;
    this.SOhidden = true;
    this.getpackingregister()
  }
  getpackingregister() {
    if (this.orders) {
      this.orders = []
    }
    this.spinner.show();
    let from, till;
    if (this.fromdate && this.tilldate) {
      from = this.DatePipe.transform(this.fromdate, "yyyy-MM-dd")
      till = this.DatePipe.transform(this.tilldate, "yyyy-MM-dd")
    } else {
      from = this.DatePipe.transform(new Date('1900-01-01'), "yyyy-MM-dd");
      till = this.DatePipe.transform(new Date(), "yyyy-MM-dd");
    }
    this.globalServicce.getDatawithMethodParams3('sup/packingregister/', this.loginUserData.user_id, from, till).subscribe((data) => {
      if (this.orders) {
        this.orders = []
      }
      this.orders = data
      this.spinner.hide();
      // console.log(this.orders)

    },
      error => {
        this.spinner.hide();
        console.log(error);
      });

  };
  invno : any;
  url :any;
  productdata : any;
  editpacking(data){
    // this.invno = data.invqhid
    this.invno = data.inv_no
    this.spinner.show();
    this.globalServicce.getDatawithMethodParam1("sup/invoice/", data.invqhid).subscribe((data) => {
      console.log(data,'aaaa')
      this.productdata = data
      this.cpm = this.productdata[0].cpm;
      this.totals();
      this.url = this.globalServicce.imageurl
      this.spinner.hide();
      for (let p of this.productdata) {
        p.ctns = p.qty / p.productid.piecepercarton;
        p.gw = p.gw;
        p.nw = p.nw;
        p.cpm = p.cpm;
        p.cont_size = 0
        this.totals();
      }
      console.log(this.productdata, "productdata")
      $('#viewpoModaledit').modal({
        backdrop: 'static',
        keyboard: true, 
        show: true
        });


    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  }
  piecechange(view_d){
    console.log(view_d,'ii')
    let tnum = view_d.ctns = Math.ceil((JSON.parse(view_d.qty) / view_d.productid.piecepercarton))
    console.log(view_d, tnum,'oo')
    this.totals();
  }
  nwchange(view_d){
    this.totals();
  }
  gwchange(view_d){
    this.totals();
  }
  totalqty : any;
  totalgw : any;
  totalnw : any;
  totalctns : any;
  totals(){
    this.totalqty = this.productdata.map(a => parseFloat(a.qty?a.qty:'0')).reduce(function (a, b) {
      return a + b;
    });
    this.totalgw = this.productdata.map(a => parseFloat(a.gw?a.gw:'0')).reduce(function (a, b) {
      return a + b;
    });
    this.totalnw = this.productdata.map(a => parseFloat(a.nw?a.nw:'0')).reduce(function (a, b) {
      return a + b;
    });
    // this.totalctns = this.productdata.map(a => (a.qty/a.productid.piecepercarton)).reduce(function (a, b) {
    this.totalctns = this.productdata.map(a => parseFloat(a.ctns?a.ctns:'0')).reduce(function (a, b) {
      return a + b;
    });
    console.log(this.totalqty, this.totalgw,this.totalnw,this.totalctns,'4')
  }
  confirmmodal() {
    $("#confirmModal").modal('show');
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
  detailobj:any;
  cpm:any
  body:any
  headerdata:any
  methodname:any
  generatepacking() {
    this.detailobj = [];
    this.productdata.cpm=this.cpm
    for (let p of this.productdata) {
      let obj = {
        id: p.id,
        ctns: p.ctns,
        gw: p.gw,
        nw: p.nw,
        weight: this.totalgw,
        // cpm: p.cpm,
        cpm: this.cpm,
        cont_size: p.cont_size,
        invqhid: p.invqhid.invqhid,
        piecepercarton: p.productid.piecepercarton
      }
      this.detailobj.push(obj);
    }
    // this.headerdata.invqhid=data.invqhid
    // this.headerdata.supplierid=data.supplierid
    // this.headerdata.packingmade= 1;
    console.log(this.headerdata, "pro");
    this.spinner.show();
  this.methodname = "sup/updateinvoicedtl/"
    this.body = { "json_hdr": this.headerdata1, "json_dtl": this.detailobj };
    this.globalServicce.updateData(this.body, this.methodname).subscribe((data: any) => {
      this.spinner.hide();
      // console.log(data);
      localStorage.setItem('supplierPackingInv', JSON.stringify(data.data))
      $('#viewpoModaledit').modal('hide');
      $("#successModal").modal('show');
      this.POhidden = false;
    this.DOhidden = false;
    this.SOhidden = true;
    this.getpackingregister()
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      })
  }
  gotoprint() {
    this.route.navigateByUrl('Supplier-Packing-list-Print');
  }
  invqhid1:any;
  delpack1(data){
    this.invqhid1 = data;
    $('#delpack1').modal('show');
  }
  delpack(){
    $('#delpack1').modal('hide');
    // this.body= {'invqhid': this.invqhid1};
    this.globalServicce.postData1( "sup/deletelpackinglist", this.invqhid1).subscribe((resp) => {
      console.log(resp);
      $('#deletePack').modal('show');
      this.POhidden = false;
      this.DOhidden = false;
      this.SOhidden = true;
      this.getpackingregister()
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      })
  }

  // Packing Upload
  uploadStockfile: any;
  stockexcelUpload(evt: any): void {

    this.uploadStockfile = evt.target.files[0].name;
    console.log("stock", this.uploadStockfile);
    this.onFileChange(evt.target, 'doc3');


  };
  file: File
  attrurl: string;
  imagedata: any
  response: any
  stockurl: string;
  lasturl: string;
  jsondata: any
  doc3: string;
  pro: any = {};
  headerdata1: any = {}
  onFileChange(evt: any, data) {

    /* wire up file reader */
    // const file: File = evt.files[0];

    // const reader: FileReader = new FileReader();
    this.file = evt.files[0]
    var reader = new FileReader();
    reader.onload = (e: any) => {
      if (data == "doc3") {
        this.stockurl = "https://img.icons8.com/color/50/000000/ms-excel.png";
      }
      else {
        this.lasturl = "https://img.icons8.com/color/50/000000/ms-excel.png";
      }

     
      if (data == "doc3") {
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
      this.headerdata1.doc3 = this.response.image
    })
  }

  printdatadetail(data, type) {
    if (type == 'invoice') {
      // this.route.navigateByUrl('/Supplier-Proforma Invoice Print?invqhid=' + data);
      this.route.navigateByUrl('/Supplier-Inv-Print?invqhid=' + data +'&S=Rep');
    } else
      if (type == 'po') {
        this.route.navigateByUrl('/Supplier-PO Print?po=' + data +'&S=Rep');
      }
      else
      if (type == 'packing') {
        this.route.navigateByUrl('/Reports-Packing-Print?invqhid=' + data +'&S=Rep');
      }
  }

}
