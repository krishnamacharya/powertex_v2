import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { GlobalServiceService } from '../../global-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
@Component({
  selector: 'app-admin-track-report',
  standalone: false,
  templateUrl: './admin-track-report.component.html',
  styleUrls: ['./admin-track-report.component.scss']
})
export class AdminTrackReportComponent implements OnInit {

  p: any = 1;
  searchText: any;
  loginUserData: any;
  supplierpayments: any = [];
  supplierpayments1: any = [];
  tot_ctns: any;
  tot_cont: any;
  tot_amt: any;
  totalbalance_amount: any;
  dischargeprt: any;
  dischargeports: any = []
  constructor(private globalServicce: GlobalServiceService,private router: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getPendingPayments();
    this.getdischargeports()
  }

  getdischargeports() {
    this.globalServicce.getDataOnlyWithMethod("sup/dischargeport").subscribe((data) => {
      this.dischargeports = data;
    });

  }


  getPendingPayments() {
    this.spinner.show();
    // this.globalServicce. getMethodData('sup/trackcha/').subscribe((data) => {
      this.globalServicce.getcheckdata('sup/trackcha/',this.dischargeprt?this.dischargeprt:'').subscribe((data) => {
      this.supplierpayments=data;
      this.supplierpayments1=data;
      this.spinner.hide();
      console.log(this.supplierpayments)
      this.tot_ctns = this.supplierpayments.map(a => parseFloat(a.ctns ? a.ctns : '0')).reduce(function (a, b) {
        return a + b;
      });
      this.tot_cont = this.supplierpayments.map(a => parseFloat(a.noofcontainer ? a.noofcontainer : '0')).reduce(function (a, b) {
        return a + b;
      });
      this.tot_amt = this.supplierpayments.map(a => parseFloat(a.duty_approx ? a.duty_approx : '0')).reduce(function (a, b) {
        return a + b;
      });
      console.log(this.tot_ctns, this.tot_cont)
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

  printreport(){
    localStorage.setItem('supplierpayments', JSON.stringify(this.supplierpayments));
    localStorage.setItem('dischargeprt', JSON.stringify(this.dischargeprt));
    this.router.navigate(['/admin-track-report-print'])
  }

}
