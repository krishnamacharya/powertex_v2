import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { GlobalServiceService } from '../global-service.service';
import { ToasterService } from '../toastr-service.service';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
declare var $: any;

@Component({
  selector: 'app-product-identification',
  standalone: false,
  templateUrl: './product-identification.component.html',
  styleUrls: ['./product-identification.component.scss']
})
export class ProductIdentificationComponent implements OnInit {
  loginUserData: any
  supplierdata: any = []
  p: any = 1
  searchText: any
  productData: any = []
  supplier: any
  states: any = []
  date2: any = new Date()
  date1: any
  commenting: any;
  transportdata: any;
  productnames: any = []
  bedata: any;
  constructor(private datepipe: DatePipe, private globalServicce: GlobalServiceService, private route: Router, private toasterService: ToasterService, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getStates();
    this.getproductnames();
  }
  getStates() {
    this.globalServicce.getDataOnlyWithMethod("sup/statelist").subscribe((data:any) => {
      this.states = data.dataset;
    });
  }
  getproductnames() {
    this.spinner.show();
    this.globalServicce.getDataOnlyWithMethod("sup/subcategory").subscribe((data) => {
      this.spinner.hide();
      this.productnames = data;
    });
  }
  getsubcategory(productname) {
    for (let name of this.productnames) {
      if (productname.replace(/\s/g, '') === name.productname.replace(/\s/g, '')) {
        this.productid = name.productid
        break;
      }
    }
  }
  product_name: any;
  productid: any;
  state: any;
  getData(){
    if(!this.product_name || !this.state){
      this.toasterService.warning("Please Select Required Fields");
      return false;
    }
    this.spinner.show();
    this.globalServicce.getDatawithMethodParams2("sup/sateproductsale/", this.state,this.productid).subscribe((data) => {
      this.productData = data;
      this.spinner.hide();
      if (this.productData.length < 1) {

        $("#WarningModal").modal('show');
        }
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      });
  }
  url: any
  totalsupplierdata: any = []
  Difference_In_Time: any
  Difference_In_Days: any
  dateSent: any
  days: any

  value: any
  setFilteredItems() {

    if (this.supplier == undefined) {
      this.supplierdata = this.totalsupplierdata
    }

    else {

      this.supplierdata = this.totalsupplierdata.filter((item) => {
        return (
          item.businessname.toLowerCase().indexOf(this.supplier.toLowerCase()) > -1
        );
      });
    }
  }
  headerdata: any = {}
  methodname: any
  approve(data) {

    if (!data.doc1) {
      this.toasterService.warning("Documents are not uploaded for this invoice")
    }

    else if (data.documentapproval == 1) {
      this.toasterService.warning("Documents has been approved already")
    }
    else {
      this.headerdata.invqhid = data.invqhid
      this.headerdata.supplierid = data.supplierid
      this.headerdata.productimage = data.productimage
      this.headerdata.doc1 = data.doc1
      this.headerdata.doc2 = data.doc2
      this.headerdata.doc3 = data.doc3
      this.headerdata.doc4 = data.doc4
      this.headerdata.doc5 = data.doc5
      this.headerdata.doc6 = data.doc6
      this.headerdata.doc7 = data.doc7
      this.headerdata.inv_no = data.inv_no
      this.headerdata.documentapproval = 1
      this.headerdata.approveddate = this.datepipe.transform(new Date(), "yyyy-MM-dd");
      console.log(this.headerdata, "pro");
      this.spinner.show();

      this.methodname = "sup/updateinvoice/"
      this.globalServicce.updateData(this.headerdata, this.methodname).subscribe((data) => {
        this.spinner.hide();
        console.log(data);
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
  }
  updatemodal() {
    // this.getinvoicedata()
  }
  printreport(){
   // alert("print");
    localStorage.setItem('orders', JSON.stringify(this.supplierdata));
    localStorage.setItem('Type', JSON.stringify('Documents List'));
    // this.route.navigate(['/Admin-Documents-List-Print'])
    this.route.navigate(['/pending-invoices-print'])
  }
}
