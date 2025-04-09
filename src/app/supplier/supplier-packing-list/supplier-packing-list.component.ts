import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GlobalServiceService } from "../../global-service.service";
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-supplier-packing-list',
  standalone: false,
  templateUrl: './supplier-packing-list.component.html',
  styleUrls: ['./supplier-packing-list.component.scss']
})
export class SupplierPackingListComponent implements OnInit {
  loginUserData: any
  supplierdata: any = []
  p: any = 1
  searchText: any
  productdata: any = []
  headerdata: any = {}
  cpm: any;
  totalqty: any;
  totalgw: any;
  totalnw: any;
  totalctns: any;
  constructor(private globalServicce: GlobalServiceService, private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getinvoicedata()
  }
  url: any
  getinvoicedata() {
    this.spinner.show();
    this.globalServicce.getDatawithMethod1("sup/pendingpackinglist/").subscribe((data) => {
      this.supplierdata = data
      this.url = this.globalServicce.imageurl
      if (this.supplierdata.length > 0) {
        this.supplierdata.forEach(x => {
          if (x.productimage != null) {
            x.productimage = this.url + x.productimage
            x.doc1 = this.url + x.doc1
            x.doc2 = this.url + x.doc2
            x.doc3 = this.url + x.doc3
            x.doc4 = this.url + x.doc4
          }
        })
      }

      // console.log(this.supplierdata, "productimage")
      // console.log(this.supplierdata, "productdata")
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
  selected_image(data) {
    this.image = data
    $('#imageenlarge').modal('show');
  }
  invno: any
  viewMore(data) {
    this.invno = data.invqhid
    this.spinner.show();
    this.globalServicce.getDatawithMethodParam1("sup/invoice/", data.invqhid).subscribe((data) => {
      this.productdata = data
      this.url = this.globalServicce.imageurl
      this.spinner.hide();
      for (let p of this.productdata) {
        if (p.productid.long_name) {
          p.product_name = p.productid.long_name + ' ' + p.productid.modelno
          p.productimage = this.url + p.invqhid.productimage
          p.doc1 = this.url + p.invqhid.doc1
          p.doc2 = this.url + p.invqhid.doc2
          p.doc3 = this.url + p.invqhid.doc3
          p.doc4 = this.url + p.invqhid.doc4
        }
        else {
          p.product_name = p.productid.modelno
          p.productimage = this.url + p.invqhid.productimage
          p.doc1 = this.url + p.invqhid.doc1
          p.doc2 = this.url + p.invqhid.doc2
          p.doc3 = this.url + p.invqhid.doc3
          p.doc4 = this.url + p.invqhid.doc4
        }
      }
      console.log(this.productdata, "productdata")
      $('#viewpoModal1').modal('show');


    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  };
  // uploadMore(data) {
  //   localStorage.setItem('invoicedata', JSON.stringify(data));

  //   this.route.navigateByUrl('Supplier-Invoice-fileupload');

  // };

  showpackingmodal(data) {
    // this.invno = data.invqhid
    this.invno = data.inv_no
    this.spinner.show();
    this.globalServicce.getDatawithMethodParam1("sup/invoice/", data.invqhid).subscribe((data) => {
      this.productdata = data
      this.totals();
      this.url = this.globalServicce.imageurl
      this.spinner.hide();
      for (let p of this.productdata) {
        if (p.productid.long_name) {
          p.product_name = p.productid.long_name + ' ' + p.productid.modelno
          p.productimage = this.url + p.invqhid.productimage
          p.doc1 = this.url + p.invqhid.doc1
          p.doc2 = this.url + p.invqhid.doc2
          p.doc3 = this.url + p.invqhid.doc3
          p.doc4 = this.url + p.invqhid.doc4
        }
        else {
          p.product_name = p.productid.modelno
          p.productimage = this.url + p.invqhid.productimage
          p.doc1 = this.url + p.invqhid.doc1
          p.doc2 = this.url + p.invqhid.doc2
          p.doc3 = this.url + p.invqhid.doc3
          p.doc4 = this.url + p.invqhid.doc4
        }
        p.ctns = Math.ceil(p.qty / p.productid.piecepercarton);
        p.gw = p.qty * p.mappingid.exportcartongw;
        p.nw = p.qty * p.mappingid.exportcartonnw;
        p.cpm = p.qty * p.mappingid.exportcartoncbn;
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
  methodname: any
  body: any
  detailobj: any = [];
  confirmmodal() {
    $("#confirmModal").modal('show');
  }
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
      // if (data['msg'] == 'created successfully') {
      $('#viewpoModaledit').modal('hide');
      $("#successModal").modal('show');
      this.getinvoicedata()
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
  piecechange(view_d){
    let tnum = view_d.ctns = Math.ceil((JSON.parse(view_d.qty) / view_d.productid.piecepercarton))
    console.log(view_d, tnum)
    this.totals();
  }
  nwchange(view_d){
    this.totals();
  }
  gwchange(view_d){
    this.totals();
  }
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
    this.totalctns = this.productdata.map(a => parseFloat(a.ctns?a.ctns:'0')).reduce(function (a, b) {
    // this.totalctns = this.productdata.map(a => Math.ceil((a.qty/a.productid.piecepercarton))).reduce(function (a, b) {
      return a + b;
    });
    console.log(this.totalqty, this.totalgw,this.totalnw,this.totalctns,'4')
  }
  gotoprint() {
    this.route.navigateByUrl('Supplier-Packing-list-Print?S=PLP');
  }
  changenw(data) {
    if (parseInt(data.nw) > parseInt(data.gw)) {
      data.nw = "0"
      alert("Net WEight should not be greater than gross weight");
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
  keyfloat(event: any) {
    const pattern = /[.0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
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
  
}
