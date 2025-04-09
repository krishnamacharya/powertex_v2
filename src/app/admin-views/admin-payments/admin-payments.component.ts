import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../../global-service.service';
import { ToasterService } from '../../toastr-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;

@Component({
  selector: 'app-admin-payments',
  standalone: false,
  templateUrl: './admin-payments.component.html',
  styleUrls: ['./admin-payments.component.scss']
})
export class AdminPaymentsComponent implements OnInit {
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
  date: any;
  date3: any;
  constructor(private globalServicce: GlobalServiceService, private datePipe: DatePipe, private route: Router, private toasterService: ToasterService, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getinvoicedata()
    this.getsuppliers()
  }
  getsuppliers() {
    this.globalServicce.getDataOnlyWithMethod("sup/skuprifix").subscribe((data) => {
      this.suppliers = data;
    });
  }
  url: any
  totalsupplierdata: any = []
  Difference_In_Time: any
  Difference_In_Days: any
  dateSent: any
  days: any
  getinvoicedata() {
    this.spinner.show();
    // this.globalServicce.getDatawithMethodParams1("sup/pendingpaymentlist/", "abc").subscribe((data) => {
    this.globalServicce.getMethodData('sup/pendingpaymentlist/').subscribe((data: any) => {
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
          }

        })
      }

      for (var i = 0; i <= this.supplierdata.length; i++) {
        if (this.supplierdata[i]) {
          if (this.supplierdata[i].bldate) {
            let currentDate = new Date();
            this.dateSent = new Date(this.supplierdata[i].bldate);
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
        // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
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
        // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal:true }
        });
        // console.log(error);
      });
  };

  confirm_sub(comment) {
    if (!comment) {
      this.toasterService.warning('Please enter comment')
    }
    else {
      this.headerdata.comments = comment
      this.methodname = "sup/updateinvoice/"
      this.globalServicce.updateData(this.headerdata, this.methodname).subscribe((data) => {
        this.spinner.hide();
        console.log(data);
        // if (data['msg'] == 'created successfully') {
        $("#successModal1").modal('show');
        // form.reset();
        // }
      },
        error => {
          this.spinner.hide();
          // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
          this.dialog.open(ErrorModalComponent, {
            data: { errorModal:true }
          });
          // console.log(error);
        })
    }
  }

  gotopayment(data) {
    if (data.balance_amount == 0) {
      this.toasterService.warning("Payment done already")

    }
    else {
      localStorage.setItem('paymentinvoice', JSON.stringify(data));
      this.route.navigateByUrl('Admin-Invoice-Payments');
    }
  }
  value: any
  setFilteredItems() {

    if (this.supplier == undefined) {
      this.supplierdata = this.totalsupplierdata
    }

    else {

      this.supplierdata = this.totalsupplierdata.filter((item) => {
        return (
          item.business_name.toLowerCase().indexOf(this.supplier.toLowerCase()) > -1
        );
      });
    }

    if (this.supplierdata.length < 1) {
     // alert("No Data is Available");
      $("#WarningModal").modal('show');
      }
	  
  }
  headerdata: any = {}
  methodname: any
  updatemodal() {
    this.getinvoicedata()
  }
  printreport(){
    localStorage.setItem('orders', JSON.stringify(this.supplierdata));
    this.route.navigate(['/Admin-Payments-Print'])
  }
  gotodiscounts(data){
    if (data.balance_amount == 0) {
      this.toasterService.warning("Payment done already")

    }
    else {
      localStorage.setItem('paymentinvoice', JSON.stringify(data));
      this.route.navigateByUrl('Admin-Payment-Discounts');
    }
  }

}
