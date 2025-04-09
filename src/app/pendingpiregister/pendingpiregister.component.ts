import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../global-service.service';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
@Component({
  selector: 'app-pendingpiregister',
  standalone: false,
  templateUrl: './pendingpiregister.component.html',
  styleUrls: ['./pendingpiregister.component.scss']
})
export class PendingpiregisterComponent implements OnInit {
  searchText: any;
  p: any = 1
  loginUserData: any;
  SupplierDtls: any;
  user_id: any = []
  orders: any = []
  PendingPayments: any = [];
  allPendingPayments: any = [];
  suppliers: any = []
  supplierid: any;
  constructor(private route: Router, private globalServicce: GlobalServiceService, private dialog: MatDialog, private spinner: NgxSpinnerService, private router: Router) { }
  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getPendingPayments();
    this.getsuppliers();
  }
  getsuppliers() {
    this.globalServicce.getDataOnlyWithMethod("sup/skuprifix").subscribe((data) => {
      this.suppliers = data;
      // console.log(this.suppliers);
    });
  }
  getPendingPayments() {
    if(this.SupplierDtls){
      for (let name of this.suppliers) {
        if (this.SupplierDtls.replace(/\s/g, '') === name.business_name.replace(/\s/g, '')) {
          this.supplierid = name.user_id
          break;
        }
      }
    }
    this.spinner.show();
    //  this.globalServicce.getMethodData('sup/pendingpiregister/').subscribe((data) => {

    // this.globalServicce.getcheckdata('sup/pendingpiregister/',this.dischargeprt?this.dischargeprt:'').subscribe((data) => {
    this.globalServicce.getcheckdata('sup/pendingpiregister/', this.supplierid ? this.supplierid : '').subscribe((data) => {
      this.PendingPayments = data;
      this.allPendingPayments = data;
      //  console.log(this.PendingPayments);
      this.spinner.hide();

      if (this.PendingPayments.length < 1) {
        alert("No Data is Available");
        }
      
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  };
  printreport() {
    localStorage.setItem('PendingPayments', JSON.stringify(this.PendingPayments));
    localStorage.setItem('SupplierDtls', JSON.stringify(this.SupplierDtls));
    this.router.navigate(['/pendingpiregisterprint'])
  }

}
