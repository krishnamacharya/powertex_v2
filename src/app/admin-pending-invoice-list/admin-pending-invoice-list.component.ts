import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GlobalServiceService } from "./../global-service.service";
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from '../toastr-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-admin-pending-invoice-list',
  standalone: false,
  templateUrl: './admin-pending-invoice-list.component.html',
  styleUrls: ['./admin-pending-invoice-list.component.scss']
})
export class AdminPendingInvoiceListComponent implements OnInit {
  loginUserData: any
  data:any = [];
  supplierdata: any = []
  supplierdata1: any = []
  productdata: any = []
  p: any = 1
  searchText: any
  constructor(private router: Router,private toasterService: ToasterService, private globalServicce: GlobalServiceService, private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getproductsdata()
    this.getpendingdata()
  }
  getproductsdata() {

    this.spinner.show();
    this.globalServicce.getDataOnlyWithMethod("sup/allinvoicerequestdata").subscribe((data: any) => {
      // this.supplierdata = data.filter((e) => {
      //   return e.profomaid != undefined || e.profomaid != null
      // })
      this.supplierdata = data
      this.supplierdata1 = data
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
  viewMore(data) {
    localStorage.setItem('invoicedata', JSON.stringify(data));

    this.route.navigateByUrl('Supplier-Proforma Invoice');
  };
  totalqty : any
  totalbalqty : any
  viewModal(data) {
    this.spinner.show();
    this.globalServicce.getDatawithMethodParams1("sup/invoicepenlist/", data.poqhid).subscribe((data) => {
      this.productdata = data
      this.totalqty = this.productdata.map(a => parseFloat(a.qty ? a.qty : '0')).reduce(function (a, b) {
        return a + b;
      });
      this.totalbalqty = this.productdata.map(a => parseFloat(a.qqty ? a.qqty : '0')).reduce(function (a, b) {
        return a + b;
      });
      this.spinner.hide();
      $('#viewpoModal').modal('show');
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
        this.toasterService.error("Cannot Cancel Already Invoice Done");
      }
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
      })
  }
  pendingdata :any;
  getpendingdata() {
    this.globalServicce.getcheckdata("sup/getsupoutstanding/",'').subscribe((data) => {
      this.pendingdata = data;
    });
  }
  comment(){
    this.route.navigateByUrl('/Admin-Feedback');
  }

  printreport(){
    localStorage.setItem('data', JSON.stringify(this.data));

    this.router.navigate(['/generate-invoice-print'])
  }

}
