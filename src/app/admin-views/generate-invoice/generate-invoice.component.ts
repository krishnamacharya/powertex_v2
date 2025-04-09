import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import * as fileSaver from 'file-saver';
import { ToasterService } from '../../toastr-service.service';
import { GlobalServiceService } from '../../global-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';

declare var $: any;
@Component({
  selector: 'app-generate-invoice',
  standalone: false,
  templateUrl: './generate-invoice.component.html',
  styleUrls: ['./generate-invoice.component.scss']
})
export class GenerateInvoiceComponent implements OnInit {
  loginUserData: any
  supplierdata: any = []
  p: any = 1
  searchText: any
  pendingdata: any;
  orders: any = [];
  POhidden: boolean = true;
  // DOhidden: boolean = false;
  EOhidden: boolean = false;
  PAhidden: boolean = false;
  fromdate: any;
  tilldate: any;
  maxdate: any;
  totalqty: any;
  totalgw: any;
  totalnw: any;
  totalctns: any;
  methodname: string;
  cpm: any;
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
    this.PAhidden = false;
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
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        // console.log(error);
      });
  };
  PackingEdit(data) {
    localStorage.setItem('Packinginvoicedata', JSON.stringify(data));

    this.route.navigateByUrl('Admin-Packing-Before-invoice');

  };

  eo() {
    this.POhidden = false;
    this.EOhidden = true;
    // this.DOhidden = false;
    this.PAhidden = false;
    this.gotoeditinvoices()
  }
  gotoeditinvoices() {
    this.route.navigateByUrl('Admin-Consolidate-Pi');
  }

  InvEdit(data) {
    localStorage.setItem('invoicedata', JSON.stringify(data));

    this.route.navigateByUrl('Admin-Proforma-Invoice');

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
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      })
  }
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

      fileSaver.saveAs(this.globalServicce.imageurl + picopy, pi_no +"_Pi_Copy." + picopy.substr(picopy.length - 5).split('.')[1]);
    }
  }

  pa() {
    this.POhidden = false;
    // this.DOhidden = false;
    this.EOhidden = false;
    this.PAhidden = true;
    this.gotoConsolidatePacking();
  }
  gotoConsolidatePacking() {
    this.route.navigateByUrl('Admin-Consolidate-Packing');
  }
}
