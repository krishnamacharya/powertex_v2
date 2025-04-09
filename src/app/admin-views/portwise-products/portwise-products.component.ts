import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../../global-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-portwise-products',
  standalone: false,
  templateUrl: './portwise-products.component.html',
  styleUrls: ['./portwise-products.component.scss']
})
export class PortwiseProductsComponent implements OnInit {
  loginUserData: any
  supplierdata: any = []
  p: any = 1
  searchText: any
  productdata: any = []
  supplier: any
  suppliers: any = []
  date2: any = new Date()
  date1: any
  commenting: any
  transportdata: any;
  constructor(private globalServicce: GlobalServiceService, private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getinvoicedata()
    // this.getsuppliers()

  }
  url: any
  totalsupplierdata: any = []
  Difference_In_Time: any
  Difference_In_Days: any
  dateSent: any
  days: any
  getinvoicedata() {
    this.spinner.show();
    this.globalServicce.getDatawithMethod1("sup/onportproductlist/").subscribe((data: any) => {
      // const resp = data.filter((e) => { return e.doc1 == null || e.doc2 == null || e.doc3 == null })
      this.supplierdata = data
      this.totalsupplierdata = data
      this.url = this.globalServicce.imageurl
      if (this.supplierdata.length > 0) {
        this.supplierdata.forEach(x => {
          if (x.productimage != null) {
            x.productimages = this.url + x.productimage
            x.document1 = this.url + x.doc1
            x.document2 = this.url + x.doc2
            x.document3 = this.url + x.doc3
            x.document4 = this.url + x.doc4
            x.document5 = this.url + x.doc5
          }

        })
      }

      for (var i = 0; i <= this.supplierdata.length; i++) {
        if (this.supplierdata[i]) {
          if (this.supplierdata[i].updateon) {
            let currentDate = new Date();
            this.dateSent = new Date(this.supplierdata[i].updateon);

            this.supplierdata[i].days = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(this.dateSent.getFullYear(), this.dateSent.getMonth(), this.dateSent.getDate())) / (1000 * 60 * 60 * 24));
            console.log(this.supplierdata, "days")
          }
        }

      }





      console.log(this.supplierdata, "productimage")
      console.log(this.supplierdata, "productdata")
      this.spinner.hide();

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

  printreport(){
    localStorage.setItem('orders', JSON.stringify(this.supplierdata));
    this.route.navigate(['/Admin-Portwise-Products-Print'])
  }
}
