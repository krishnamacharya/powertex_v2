import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../../global-service.service';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-supplier-invoices-list',
  standalone: false,
  templateUrl: './supplier-invoices-list.component.html',
  styleUrls: ['./supplier-invoices-list.component.scss']
})
export class SupplierInvoicesListComponent implements OnInit {
  loginUserData: any
  supplierdata: any = []
  p: any = 1
  searchText: any
  constructor(private globalServicce: GlobalServiceService, private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getproductsdata()
  }
  getproductsdata() {
    this.spinner.show();
    this.globalServicce.getDatawithMethodParams1("sup/invoicerequestdata", "profoma").subscribe((data: any) => {
      this.supplierdata = data.filter((e) => {
        return e.profomaid == undefined || e.profomaid == null
      })
      // this.supplierdata = data
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
  viewMore(data) {
    localStorage.setItem('invoicedata', JSON.stringify(data));

    this.route.navigateByUrl('Supplier-Invoice Profoma');

  };
}
