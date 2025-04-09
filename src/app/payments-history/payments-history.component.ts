import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
// import { GlobalServiceService } from '../../global-service.service';
// import { DataServiceService } from '../../data-service.service';
import { MatDialog } from '@angular/material/dialog';
// import { ToasterService } from '../../toastr-service.service';
import { FormControl, Validators, NgForm } from "@angular/forms";
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ToasterService } from '../toastr-service.service';
import { GlobalServiceService } from '../global-service.service';
import { DataServiceService } from '../data-service.service';
@Component({
  selector: 'app-payments-history',
  standalone: false,
  templateUrl: './payments-history.component.html',
  styleUrls: ['./payments-history.component.scss']
})
export class PaymentsHistoryComponent implements OnInit {
  p: any = 1;
  searchText: any;
  loginUserData: any;
  // givercompanynames: any=[];
  selected: any;
  orders:  any =[];
  orders1:  any =[];
  giver_companyname: any;
  subcategory: any ={};
  marketing_manager: any;
  market_manager_list: any =[];
  
  fromdate: any;
  tilldate: any;
  maxdate: any;
  totalamount: any;
  constructor(private DatePipe: DatePipe, private router:Router,private toasterService: ToasterService, public globalService: GlobalServiceService, public dataService: DataServiceService, private spinner: NgxSpinnerService, private dialog: MatDialog) {
  }
  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    let frdt =  new Date().getUTCFullYear() + "-" + (new Date().getUTCMonth() + 1) + "-" + "01";
    this.fromdate = new Date(frdt);
    this.tilldate = new Date();
    this.maxdate = new Date();
    // this.getCompanyName();
    if(this.loginUserData.designation=='Marketing Manager'){
      this.comp_Code = this.loginUserData.user_id;
    }
    else{
      this.getmarketing_manager();
    }
    this.getdata();
  }
  // getCompanyName(){
  //   if(this.loginUserData.designation=='Marketing Manager'){
  //     this.comp_Code = this.loginUserData.user_id;
  //   }
  //   else{
  //     this.comp_Code = this.marketing_manager;
  //   }
  //   this.globalService.getDatawithMethodParams1('sup/superlistmrkwise/', this.comp_Code?this.comp_Code:'').subscribe(
  //     data => {
  //       this.spinner.hide();
  //       this.givercompanynames = data;
  //       console.log(this.givercompanynames)
  //     })
  //   }
  getmarketing_manager(): any {
    return this.globalService.getDatawithMethodParams1("market/manager_drop/",this.loginUserData.company_code).subscribe(data=>{
      this.market_manager_list = data;
      console.log("marketing",this.market_manager_list);
      
    })
   }
  comp_Code: any;
  getdata() {
    
    let from, till;
    // if (this.fromdate && this.tilldate) {
      from = this.DatePipe.transform(this.fromdate, "yyyy-MM-dd")
      till = this.DatePipe.transform(this.tilldate, "yyyy-MM-dd")
    // } else {
    //   from = this.DatePipe.transform(new Date('1900-01-01'), "yyyy-MM-dd");
    //   till = this.DatePipe.transform(new Date(), "yyyy-MM-dd");
    // }
    if(this.loginUserData.designation=='Marketing Manager'){
      this.globalService.getDatawithMethodParams3('sup/dealermonthwisepayment/', this.loginUserData.user_id, from, till).subscribe((data) => {
          this.orders = data;
          this.orders1 = data;
          if(this.orders.length>0){
            this.totalamount = this.orders.map(a => parseFloat(a.amount?a.amount:'0')).reduce(function (a, b) {
              return a + b;
            });
          }
        });
    }
    else{
      this.globalService.getDatawithMethodParams3('sup/dealermonthwisepayment/',this.marketing_manager?this.marketing_manager:'', from, till).subscribe((data) => {
          this.orders = data;
          this.orders1 = data;
          if(this.orders.length>0){
            this.totalamount = this.orders.map(a => parseFloat(a.amount?a.amount:'0')).reduce(function (a, b) {
              return a + b;
            });
          }
        });
    }

  }
  
  printreport(){
    localStorage.setItem('supplierdata', JSON.stringify(this.orders));

    this.router.navigate(['/Payments-History-List-Print'])
  }
}