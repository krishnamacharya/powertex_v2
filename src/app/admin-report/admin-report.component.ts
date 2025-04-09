import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalServiceService } from '../global-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from './../toastr-service.service';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
import { MatDialog } from '@angular/material/dialog';
declare var $: any;
@Component({
  selector: 'app-admin-report',
  standalone: false,
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.scss']
})
export class AdminReportComponent implements OnInit {
  reporttypedata: any = [];
  type:any;
  constructor(private DatePipe: DatePipe, private router: Router, private route: ActivatedRoute, private dialog: MatDialog, private service: GlobalServiceService, private spinner: NgxSpinnerService, private toasterService: ToasterService) {
    this.getreporttypeDropdown();
   }
  resources2: any = [];
  d: any;
  e: any;
  company_code: any;
  changetype(type){
  
    this.type=type;

  }
  
  getDataadminreport(fromdate, tilldate, company, branch, shopee, dealer, type,Category,SubCategory,model) {
    this.spinner.show();
    fromdate = this.DatePipe.transform(fromdate, "yyyy-MM-dd");
    tilldate = this.DatePipe.transform(tilldate, "yyyy-MM-dd");

    if (dealer != undefined && dealer != null) {
      this.company_code = dealer;
    }
    else if (shopee != undefined && shopee != null) {
      this.company_code = shopee;
    }
    else if (branch != undefined && branch != null) {
      this.company_code = branch;
    }
    else if (company != undefined && company != null) {
      this.company_code = company;
    }
  }

  companydata: any = []
  getCompanycode(){
    return this.service.getCompanycode().subscribe((resp) => {
      console.log(resp);
      this.companydata = resp;
    },
      error => {
        // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal:true }
        });
      });

  }
  token: any;
  loginUserData: any = []
  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getCompanycode();
    
  }

  getreporttypeDropdown() {
   
    return this.service.getDatawithInput_id('62').subscribe((resp) => {
      console.log(resp);
      this.reporttypedata = resp;
      this.changetype(this.reporttypedata[0].process);
      console.log((this.reporttypedata))
    /*   ========condition check for dealer================= */
      if (this.loginUserData.role == 'Dealer') {
        this.reporttypedata = [{"process":"PO"},{"process":"Inv"}];
      }
      /* ========================== */
    },
      error => {
        // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal:true }
        });
      });
  };
}



