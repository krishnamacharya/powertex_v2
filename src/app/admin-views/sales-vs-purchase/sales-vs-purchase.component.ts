import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../../global-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-sales-vs-purchase',
  standalone: false,
  templateUrl: './sales-vs-purchase.component.html',
  styleUrls: ['./sales-vs-purchase.component.scss']
})
export class SalesVsPurchaseComponent implements OnInit {
  loginUserData: any;
  supplierdata: any = [];
  supplierdata1: any = [];
  market_manager_list: any = [];
  p: any = 1;
  searchText:any;
  marktngid:any;

  // year=[
  //       {yr:'22-23', dt:'2023-03-31'},
  //       {yr:'21-22', dt:'2022-03-31'},
  //       {yr:'20-21', dt:'2021-03-31'},
  //       {yr:'19-20', dt:'2020-03-31'},
  //       {yr:'18-19', dt:'2019-03-31'},]
  constructor(private globalServicce: GlobalServiceService, private router: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }
  curfullyr: any;
  ngOnInit() {
    this.curfullyr = ((new Date().getFullYear()+1)+"-03-31");
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    if(this.loginUserData.designation=='Marketing Manager'){
      this.marktngid = this.loginUserData.user_id;
    }
    else{
      this.getmarketing_manager();
    }
    this.getFinancialYear();
    this.getPendingPayments();
    this.selectedyear = this.year[0].yr
  }
  getmarketing_manager(): any {
    return this.globalServicce.getDatawithMethodParams1("market/manager_drop/",this.loginUserData.company_code).subscribe(data=>{
      this.market_manager_list = data;
      console.log("marketing",this.market_manager_list);
      
    })
   }
   selectedyear: any;
   totAPRILI: any;
   totAPRILP: any;
   totMAYI: any;
   totMAYP: any;
   totJUNI: any;
   totJUNP: any;
   totJULYI: any;
   totJULYP: any;
   totAUGI: any;
   totAUGP: any;
   totSEPI: any;
   totSEPP: any;
   totOCTI: any;
   totOCTP: any;
   totNOVI: any;
   totNOVP: any;
   totDECI: any;
   totDECP: any;
   totJANI: any;
   totJANP: any;
   totFEBI: any;
   totFEBP: any;
   totMARI: any;
   totMARP: any;
   getTotals(){
    if(this.supplierdata.length>0){
      this.totAPRILI = this.supplierdata.map(a => parseInt(a.APRILI?a.APRILI:'0')).reduce(function (a, b) {
        return a + b;
      });
      this.totAPRILP = this.supplierdata.map(a => parseInt(a.APRILP?a.APRILP:'0')).reduce(function (a, b) {
        return a + b;
      });
      this.totMAYI = this.supplierdata.map(a => parseInt(a.MAYI?a.MAYI:'0')).reduce(function (a, b) {
        return a + b;
      });
      this.totMAYP = this.supplierdata.map(a => parseInt(a.MAYP?a.MAYP:'0')).reduce(function (a, b) {
        return a + b;
      });
      this.totJUNI = this.supplierdata.map(a => parseInt(a.JUNI?a.JUNI:'0')).reduce(function (a, b) {
        return a + b;
      });
      this.totJUNP = this.supplierdata.map(a => parseInt(a.JUNP?a.JUNP:'0')).reduce(function (a, b) {
        return a + b;
      });
      this.totJULYI = this.supplierdata.map(a => parseInt(a.JULYI?a.JULYI:'0')).reduce(function (a, b) {
        return a + b;
      });
      this.totJULYP = this.supplierdata.map(a => parseInt(a.JULYP?a.JULYP:'0')).reduce(function (a, b) {
        return a + b;
      });
      this.totAUGI = this.supplierdata.map(a => parseInt(a.AUGI?a.AUGI:'0')).reduce(function (a, b) {
        return a + b;
      });
      this.totAUGP = this.supplierdata.map(a => parseInt(a.AUGP?a.AUGP:'0')).reduce(function (a, b) {
        return a + b;
      });
      this.totSEPI = this.supplierdata.map(a => parseInt(a.SEPI?a.SEPI:'0')).reduce(function (a, b) {
        return a + b;
      });
      this.totSEPP = this.supplierdata.map(a => parseInt(a.SEPP?a.SEPP:'0')).reduce(function (a, b) {
        return a + b;
      });
      this.totOCTI = this.supplierdata.map(a => parseInt(a.OCTI?a.OCTI:'0')).reduce(function (a, b) {
        return a + b;
      });
      this.totOCTP = this.supplierdata.map(a => parseInt(a.OCTP?a.OCTP:'0')).reduce(function (a, b) {
        return a + b;
      });
      this.totNOVI = this.supplierdata.map(a => parseInt(a.NOVI?a.NOVI:'0')).reduce(function (a, b) {
        return a + b;
      });
      this.totNOVP = this.supplierdata.map(a => parseInt(a.NOVP?a.NOVP:'0')).reduce(function (a, b) {
        return a + b;
      });
      this.totDECI = this.supplierdata.map(a => parseInt(a.DECI?a.DECI:'0')).reduce(function (a, b) {
        return a + b;
      });
      this.totDECP = this.supplierdata.map(a => parseInt(a.DECP?a.DECP:'0')).reduce(function (a, b) {
        return a + b;
      });
      this.totJANI = this.supplierdata.map(a => parseInt(a.JANI?a.JANI:'0')).reduce(function (a, b) {
        return a + b;
      });
      this.totJANP = this.supplierdata.map(a => parseInt(a.JANP?a.JANP:'0')).reduce(function (a, b) {
        return a + b;
      });
      this.totFEBI = this.supplierdata.map(a => parseInt(a.FEBI?a.FEBI:'0')).reduce(function (a, b) {
        return a + b;
      });
      this.totFEBP = this.supplierdata.map(a => parseInt(a.FEBP?a.FEBP:'0')).reduce(function (a, b) {
        return a + b;
      });
      this.totMARI = this.supplierdata.map(a => parseInt(a.MARI?a.MARI:'0')).reduce(function (a, b) {
        return a + b;
      });
      this.totMARP = this.supplierdata.map(a => parseInt(a.MARI?a.MARI:'0')).reduce(function (a, b) {
        return a + b;
      });
    }
   }
  getPendingPayments() {
    this.spinner.show();
    this.globalServicce.getDatawithMethodParams2('sup/SalesVSPurchase/', this.marktngid?this.marktngid:'',this.selectedyear?this.selectedyear:this.year[0].dt).subscribe((data) => {
      this.supplierdata = data;
      this.supplierdata1 = data;
      this.getTotals();
      this.spinner.hide();
      console.log(this.supplierdata)
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
  curfull: any;
  year: any = [];
  getFinancialYear(){
    this.curfull = (new Date().getFullYear()).toString();
    const curyr = this.curfull.split("20")[1];
    for (var i = 0; i < 5; i++) {
        let yr = curyr - i + 1;
        let yr2 = curyr - i;
        this.year.push({'yr': yr2+'-'+yr,'dt':"20"+yr+"-03-31"});
    }
    console.log(this.year,"year");
  }
  searchdata(data) {
    if (data) {
      this.supplierdata = []
      for (var i = 0; i < this.supplierdata1.length; i++) {
        if ((this.supplierdata1[i].business_name.toLowerCase().includes(data.toLowerCase()))) {
          this.supplierdata.push(this.supplierdata1[i])
          this.getTotals();
        }
      }
    }
    else {
      this.supplierdata = this.supplierdata1
      this.getTotals();
    }
    // this.getTotals();
  }
}