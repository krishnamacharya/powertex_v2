import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GlobalServiceService } from "../../global-service.service";
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import * as fileSaver from 'file-saver';
import { ToasterService } from '../../toastr-service.service';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-supplier-invoice-list',
  standalone: false,
  templateUrl: './supplier-invoice-list.component.html',
  styleUrls: ['./supplier-invoice-list.component.scss']
})
export class SupplierInvoiceListComponent implements OnInit {
  loginUserData: any
  supplierdata: any = []
  p: any = 1
  searchText: any
  pendingdata: any;
  orders: any = [];
  POhidden: boolean = true;
  // DOhidden: boolean = false;
  EOhidden: boolean = false;
  SCPhidden:boolean = false;
  fromdate: any;
  tilldate: any;
  maxdate: any;
  constructor(private DatePipe: DatePipe, private toasterService: ToasterService, private globalServicce: GlobalServiceService, private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.fromdate = new Date().getUTCFullYear() + "-" + "01" + "-" + "01";
    this.tilldate = new Date();
    this.maxdate = new Date();
    this.getproductsdata()
    this.getpendingdata()
  }
  po() {
    this.POhidden = true;
    // this.DOhidden = false;
    this.EOhidden = false;
    this.SCPhidden = false;
    this.getproductsdata()
  }
  getproductsdata() {
    this.spinner.show();
    this.globalServicce.getDataOnlyWithMethod("sup/allinvoicerequestdata").subscribe((data: any) => {
    // this.globalServicce.getDataOnlyWithMethod("sup/invoicerequestdata").subscribe((data: any) => {
      // this.supplierdata = data.filter((e) => {
      //   return e.profomaid != undefined || e.profomaid != null
      // })
      this.supplierdata = data
      console.log(this.supplierdata, "productdata")
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
  // do() {
  //   this.POhidden = false;
  //   this.DOhidden = true;
  //   this.EOhidden = false;
  //   this.getinvregister()
  // }
  // getinvregister() {
  //   if (this.orders) {
  //     this.orders = []
  //   }
  //   this.spinner.show();
  //   let from, till;
  //   if (this.fromdate && this.tilldate) {
  //     from = this.DatePipe.transform(this.fromdate, "yyyy-MM-dd")
  //     till = this.DatePipe.transform(this.tilldate, "yyyy-MM-dd")
  //   } else {
  //     from = this.DatePipe.transform(new Date('1900-01-01'), "yyyy-MM-dd");
  //     till = this.DatePipe.transform(new Date(), "yyyy-MM-dd");
  //   }
  //   this.globalServicce.getDatawithMethodParams3('sup/getsupinvregister/', this.loginUserData.user_id, from, till).subscribe((data) => {
  //     if (this.orders) {
  //       this.orders = []
  //     }
  //     this.orders = data
  //     this.spinner.hide();

  //   },
  //     error => {
  //       this.spinner.hide();
  //       console.log(error);
  //     });

  // };

  eo() {
    this.POhidden = false;
    this.EOhidden = true;
    this.SCPhidden = false;
    // this.DOhidden = false;
    this.gotoeditinvoices()
  }


  SCP() {
    this.POhidden = false;
    this.EOhidden = false;
    this.SCPhidden = true;
    // this.DOhidden = false;
    this.gotoSupplierConsolidatePacking()
  }

  gotoSupplierConsolidatePacking(){
    this.route.navigateByUrl('supplier-consolidate-packing');
  }

  gotoeditinvoices() {
    this.route.navigateByUrl('Supplier-Invoice-Edit');
  }

  viewMore(data) {
    localStorage.setItem('invoicedata', JSON.stringify(data));

    this.route.navigateByUrl('Supplier-Proforma Invoice');

  };
  getpendingdata() {
    this.globalServicce.getcheckdata("sup/getsupoutstanding/",this.loginUserData.user_id).subscribe((data) => {
      this.pendingdata = data;
    });
  }
  removedata : any;
  rejconfirm(data) {
    $('#reject').modal('show');
    this.removedata=data
  }
  reject(){
    this.globalServicce.getcheckdata("sup/sup_po_cancel/",this.removedata.poqhid).subscribe((resp) => {
      console.log(resp);
      $('#reject').modal('hide');
      if (resp['status'] == '1') {
        $("#deleteModal").modal('show');
        this.getproductsdata()
      }else{
        this.toasterService.warning("Cannot Cancel Already Invoice Done");
      }
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      })
  }
  // invqhid1 :any
  // delinv1(data){
  //   this.invqhid1 = data;
  //   $('#delinv1').modal('show');
  // }
  // body:any
  // delinv(){
  //   $('#delinv1').modal('hide');
  //   this.body= {'invqhid': this.invqhid1};
  //   this.globalServicce.postData(this.body, "sup/deletelInvoice/").subscribe((resp) => {
  //     console.log(resp);
  //     $('#deleteInv').modal('show');
  //     this.getinvregister();
  //   },
  //     error => {
  //       this.spinner.hide();
  //       this.dialog.open(ErrorModalComponent, {
  //   data: { errorModal:true }
  // });
  //     })
  // }
  // editinv(data){
  //   localStorage.setItem('invData', JSON.stringify(data));
  //   // this.route.navigateByUrl('/Supplier-Edit-Invoice?invqhid=' + data);
  //   this.route.navigateByUrl('/Supplier-Edit-Invoice');
  // }
  printdatadetail(data, type) {
    if (type == 'invoice') {
      // this.route.navigateByUrl('/Supplier-Proforma Invoice Print?invqhid=' + data);
      this.route.navigateByUrl('/Supplier-Inv-Print?invqhid=' + data);
    } else
      if (type == 'po') {
        this.route.navigateByUrl('/Supplier-PO Print?po=' + data);
      }
  }
  Pidownload(picopy, pi_no) {

    if (picopy) {
      let blob: any = new Blob([picopy], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;

      // var count = (billofentry.match(/media/g) || []).length;
      // if (count > 1) {
      //   billofentry = billofentry.replace(/\/media/, '')
      // }
      fileSaver.saveAs(this.globalServicce.imageurl + picopy, pi_no +"_Pi_Copy." + picopy.substr(picopy.length - 5).split('.')[1]);
    }
  }
}
