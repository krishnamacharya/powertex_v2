import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../../global-service.service';

@Component({
  selector: 'app-supplier-order-summary',
  standalone: false,
  templateUrl: './supplier-order-summary.component.html',
  styleUrls: ['./supplier-order-summary.component.scss']
})
export class SupplierOrderSummaryComponent implements OnInit {
  loginUserData: any
  orders: any = [] 
  suppliers: any = []
  p: any = 1
  searchText: any
  constructor( private router: Router, private globalServicce: GlobalServiceService, private route: Router, private spinner: NgxSpinnerService) { }
  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getOrdersummery();
  }
  getOrdersummery() {
  
    if (this.orders) {
      this.orders = []
    }
    this.spinner.show();
    this.globalServicce.getDatawithMethodParams1('sup/orderqtyoutstanding/', this.loginUserData.user_id).subscribe((data) => {
      if (this.orders) {
        this.orders = []
      }
      this.orders = data
      this.spinner.hide();
      // console.log(this.orders)

    },
      error => {
        this.spinner.hide();
        console.log(error);
      });

  };

  //print
  printreport(){
    localStorage.setItem('orders', JSON.stringify(this.orders));

    this.router.navigate(['/Supplier-Order-Summary-Print'])
  }
  


}
