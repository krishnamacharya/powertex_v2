import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { ToasterService } from '../../toastr-service.service';
import { GlobalServiceService } from '../../global-service.service';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';

declare var $: any;
@Component({
  selector: 'app-piedit',
  standalone: false,
  templateUrl: './piedit.component.html',
  styleUrls: ['./piedit.component.scss']
})
export class PieditComponent implements OnInit {
addExtras() {
throw new Error('Method not implemented.');
}
  loginUserData: any
  productdata: any = []
  p: any = 1
  searchText: any
  body: any
  date: string;
  constructor(private router: Router,private DatePipe: DatePipe, private route: ActivatedRoute,private toasterService: ToasterService, private globalService: GlobalServiceService, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getdata()
  }

  totalproductdata: any = []
  data1: any = []
  qtys: any
  getdata() {
      this.spinner.show();
    this.globalService.getDatawithMethod1("sup/getinvoicedata/").subscribe((data) => {
      // this.globalService.getDatawithMethodParams3("sup/orderplain/", this.loginUserData.user_id,'','').subscribe((data) => {
      this.data1 = data;
      this.productdata = this.data1.ProductDetails[0];
      // this.productdata = data;
      this.totalproductdata = this.data1.ProductDetails[0];
      this.qtys = this.productdata.map((e) => { return { qty: e.qty, ProductID: e.ProductID, invqty: e.invqty, poqhid: e.POQHID } })
      for (var i = 0; i < this.productdata.length; i++) {
        // if (this.productdata[i].invqty) {
        if (this.productdata[i]) {
          this.productdata[i].product_name = this.productdata[i].product_name +' '+ this.productdata[i].name1
          this.productdata[i].amount = this.productdata[i].balanceqty * this.productdata[i].price
          // this.productdata[i].qty = this.productdata[i].balanceqty;
          console.log(this.productdata[i].amount,'this.productdata[i].amount')
        }
      }
      this.spinner.hide();
    });
  }
  selectedlist: any = []
  qtychange(product) {
    if(product){
      for (let p of this.productdata) {
        if (p.POQHID == product.POQHID) {
          p.amount = JSON.parse(product.qty) * JSON.parse(product.price)
        }
    }

      // if (this.productdetail.length > 0) {
      //   for (let s in this.productdetail) {
      //     if (this.productdetail[s].poqhid == product.POQHID) {
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
    }
  }
  update(product){
    this.date = this.DatePipe.transform(new Date(), "yyyy-MM-dd")
    this.body = { "supplier_id": this.loginUserData.user_id,"date": this.date, product};
      this.spinner.show();
      this.globalService.postData(this.body, "sup/updatepilist/").subscribe((data) => {
      this.spinner.hide();
      if (data['msg'] == 'sucessfuly updated') {
        $("#successModal").modal('show');
        this.getdata();
      }else{
        this.toasterService.warning("Some Qty invoice has been done")
        this.getdata()
      //  this.router.navigateByUrl('Supplier-PI-Edit');
      }
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      })
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
        this.toasterService.warning("Unable To Delete")
      }
    },
      error => {
        this.spinner.hide();
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
  }



  totaltamount: any
  totaltqty: any
  transdata: any
  totTrUsd: any
  totTrUsdAmt: any
  totTrCny: any
  totTrCnyAmt: any
  transitclick(product){
   // alert("trans");
    if(product.invqty == 0){
      this.toasterService.warning("Invoice details not found")
      return false
    }
    this.totTrUsdAmt = '';
    this.totTrCnyAmt = '';
    this.totaltqty = '';
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
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      })
      
    $("#viewtransModal").modal('show');

  }


}
