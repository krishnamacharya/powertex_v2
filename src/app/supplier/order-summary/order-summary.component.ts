import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from '../../toastr-service.service';
import { GlobalServiceService } from '../../global-service.service';
declare var $: any;
@Component({
  selector: 'app-order-summary',
  standalone: false,
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  loginUserData: any
  orders: any = []
  suppliers: any = []
  p: any = 1
  searchText: any;
  SNameExists: any;
  constructor(private toasterService: ToasterService, private router: Router, private globalServicce: GlobalServiceService, private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }
  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getsuppliers()
  }
  getsuppliers() {
    this.globalServicce.getDataOnlyWithMethod("sup/skuprifix").subscribe((data) => {
      this.suppliers = data;
    });
  }
  getsupplierproducts(supplier) {
    for (let name of this.suppliers) {
      if (supplier.replace(/\s/g, '') === name.business_name.replace(/\s/g, '')) {
        this.pro1 = name.user_id
        break;
      }
    }
  }
  pro: any;
  pro1: any;
  getOrdersummery() {
    if(!this.pro){
      this.toasterService.error("Please Select Supplier");
      return false;
    }
    // this.pro1 = this.pro;
    // if (this.suppliers) {
    //   let supplier = this.suppliers.filter((e) => e.user_id == this.pro.user_id)
    //   // this.currency = supplier[0].currency
    // }

    if (this.orders) {
      this.orders = []
    }
    this.spinner.show();
    this.globalServicce.getDatawithMethodParams1('sup/orderqtyoutstanding/', this.pro1 ? this.pro1 : '').subscribe((data) => {
      if (this.orders) {
        this.orders = []
      }
      this.orders = data
    
      this.spinner.hide();
      // console.log(this.orders)
      if (this.orders.length < 1) {

      // alert("No Data is Available");
   //   this.toasterService.error("No Data is Available");
      $("#WarningModal").modal('show');

      }
    },
      error => {
        this.spinner.hide();
        console.log(error);
      });

  };
  printreport() {
    localStorage.setItem('orders', JSON.stringify(this.orders));
    localStorage.setItem('Supplier-Details', JSON.stringify(this.pro));

    this.router.navigate(['/Supplier-Order-Summary-Print'])
  }


}

