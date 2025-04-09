import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../../global-service.service';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-supplier-outstanding-amount',
  standalone: false,
  templateUrl: './supplier-outstanding-amount.component.html',
  styleUrls: ['./supplier-outstanding-amount.component.scss']
})
export class SupplierOutstandingAmountComponent implements OnInit {

  orders: any = [];
  p: any = 1;
  searchText: any;
  loginUserData: any;
  constructor(private globalServicce: GlobalServiceService, private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }


  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getorders()
  }
  getorders() {
    this.spinner.show();
    this.globalServicce.getDatawithMethod1("sup/outstanding_amount").subscribe((data) => {
      this.orders = data
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

}
