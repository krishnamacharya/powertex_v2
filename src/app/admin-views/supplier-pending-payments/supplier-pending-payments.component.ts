import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../../global-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-supplier-pending-payments',
  standalone: false,
  templateUrl: './supplier-pending-payments.component.html',
  styleUrls: ['./supplier-pending-payments.component.scss']
})
export class SupplierPendingPaymentsComponent implements OnInit {
  loginUserData: any;
  p: any = 1;
  PendingPayments: any = [];
  allPendingPayments: any = [];
  totalinvoiceusd: any;
  totalinvoicecny: any;
  searchduedate: any;
searchText: any;
  constructor( private route: Router,private router: Router,private globalServicce: GlobalServiceService, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getPendingPayments();
  }
  filterduedate() {
    if (this.searchduedate) {
      this.PendingPayments = this.allPendingPayments.filter((e) => e.Due_date <= this.searchduedate)
    } else {
      this.PendingPayments = this.allPendingPayments;
    }

  }
  getPendingPayments() {
    this.spinner.show();
    this.globalServicce.getMethodData('sup/Supplierpenlist/').subscribe((data) => {
      this.PendingPayments = data;
      this.allPendingPayments = data;
      this.spinner.hide();

      console.log()
      this.totalinvoiceusd = this.PendingPayments.map(a => parseFloat(a.CType=='USD' ? a.Invoice_Amount : '0')).reduce(function (a, b) {
        return a + b;
      });
      this.totalinvoicecny = this.PendingPayments.map(a => parseFloat(a.CType=='CNY' ? a.Invoice_Amount : '0')).reduce(function (a, b) {
        return a + b;
      });
      console.log(this.totalinvoiceusd, this.totalinvoicecny)
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

  printdatadetail(data) {
    this.route.navigateByUrl('/Supplier-Inv-Print?invqhid=' + data +'&A=OPS'); 
  }
  
   //print Redirection
   printreport(){
    localStorage.setItem('PendingPayments', JSON.stringify(this.PendingPayments));
    this.router.navigate(['/Supplier-Pending-Payments-Print'])
  }
  PortwiseProducts(){
    this.router.navigate(['/Admin-Portwise-Products'])
  }
  
  



}
