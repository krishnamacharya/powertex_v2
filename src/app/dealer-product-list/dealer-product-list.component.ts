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
  selector: 'app-dealer-product-list',
  standalone: false,
  templateUrl: './dealer-product-list.component.html',
  styleUrls: ['./dealer-product-list.component.scss']
})
export class DealerProductListComponent implements OnInit {
  p: any = 1;
  searchText: any;
  loginUserData: any;
  givercompanynames: any=[];
  selected: any;
  productslist: any =[];
  totalproducts_list: any =[];
  orders:  any =[];
  orders1:  any =[];
  giver_companyname: any;
  subcategory: any ={};
  marketing_manager: any;
  market_manager_list: any =[];
  constructor(private DatePipe: DatePipe, private router:Router,private toasterService: ToasterService, public globalService: GlobalServiceService, public dataService: DataServiceService, private spinner: NgxSpinnerService, private dialog: MatDialog) {
  }
  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getCompanyName();
    this.sel_product();
    // *ngIf="loginUserData.designation=='Marketing Manager'"
    if(this.loginUserData.designation=='Marketing Manager'){
      this.comp_Code = this.loginUserData.user_id;
    }
    else{
      this.getmarketing_manager();
    }
    this.getdata();
  }
  getCompanyName(){
    if(this.loginUserData.designation=='Marketing Manager'){
      this.comp_Code = this.loginUserData.user_id;
    }
    else{
      this.comp_Code = this.marketing_manager;
    }
    this.globalService.getDatawithMethodParams1('sup/superlistmrkwise/', this.comp_Code?this.comp_Code:'').subscribe(
      data => {
        this.spinner.hide();
        this.givercompanynames = data;
        console.log(this.givercompanynames)
      })
    }
  sel_product() {

    return this.globalService.getDatawithMethod1('getproductlist/').subscribe(data => {
      this.productslist = data;
    });
  }
  getmarketing_manager(): any {
    return this.globalService.getDatawithMethodParams1("market/manager_drop/",this.loginUserData.company_code).subscribe(data=>{
      this.market_manager_list = data;
      console.log("marketing",this.market_manager_list);
      
    })
   }
  comp_Code: any;
  getdata() {
    if(this.giver_companyname){
      for (let name of this.givercompanynames) {
        if (this.giver_companyname.replace(/\s/g, '') === name.business_name.replace(/\s/g, '')) {
          this.comp_Code = name.user_id;
          break;
        }
      }
    }
    // console.log(this.giver_companyname,'code')
    // console.log(this.comp_Code,'code')
    // console.log(this.subcategory?this.subcategory.productid:'','subcategory')
    if(this.loginUserData.designation=='Marketing Manager'){
      this.globalService.getDatawithMethodParams3('dealerproductsale/',this.giver_companyname?this.comp_Code:'', this.subcategory.productid?this.subcategory.productid:'',this.loginUserData.user_id).subscribe((data) => {
          this.orders = data;
          this.orders1 = data;
        });
    }
    else{
      this.globalService.getDatawithMethodParams3('dealerproductsale/',this.giver_companyname?this.comp_Code:'', this.subcategory.productid?this.subcategory.productid:'',this.marketing_manager?this.marketing_manager:'').subscribe((data) => {
          this.orders = data;
          this.orders1 = data;
        });
    }

  }
}