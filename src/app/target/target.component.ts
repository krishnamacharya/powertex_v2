import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { ToasterService } from '../toastr-service.service';
import { GlobalServiceService } from '../global-service.service';
import { DataServiceService } from '../data-service.service';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
declare var $: any;

@Component({
  selector: 'app-target',
  standalone: false,
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.scss']
})
export class TargetComponent implements OnInit {
  maxDate = new Date();
  p:any=1;
  businessname:any;
  formdata: any;
  obj: any = {};
  masterData: any = {};
  headerdata: any = {};
  currencycodes: any
  givercompanynames: any
  loginUserData: any
  Listdata: any = [];
  POhidden: boolean = true;
  DOhidden: boolean = false;
searchText: string;
  constructor(private DatePipe: DatePipe, private router:Router,private toasterService: ToasterService, public globalService: GlobalServiceService, public dataService: DataServiceService, private spinner: NgxSpinnerService, private dialog: MatDialog) {
  }
  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    if(this.loginUserData.designation=='Marketing Manager'){
      this.marktngid = this.loginUserData.user_id;
    }
    else{
      this.getmarketing_manager();
    }
    this.getdealerslist();
    this.getFinancialYear();
    this.po();
  }
  po() {
    this.POhidden = true;
    this.DOhidden = false;
      this.getdata();
  }
  getdata() {
    this.spinner.show();
    this.globalService.getDatawithMethod1("sup/dealertarget/").subscribe((resp:any) => {
    this.Listdata = resp.data;
    this.spinner.hide();
  });
}

do() {
  this.POhidden = false;
  this.DOhidden = true; 
  this.getTargetReports();
}
market_manager_list: any=[];
getmarketing_manager(): any {
  return this.globalService.getDatawithMethodParams1("market/manager_drop/",this.loginUserData.company_code).subscribe(data=>{
    this.market_manager_list = data;
    
  })
 }
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
  selectedyear: any;
  marktngid: any;
  supplierdata: any=[];
  totTar: any;
  totJAN: any;
  totFEB: any;
  totMAR: any;
  totAPRIL: any;
  totMAY: any;
  totJUN: any;
  totJULY: any;
  totAUG: any;
  totSEP: any;
  totOCT: any;
  totNOV: any;
  totDEC: any;
  totrowTot: any;
  getTargetReports() {
    this.spinner.show();
    this.globalService.getDatawithMethodParams2('sup/monthwisetarget/', this.marktngid?this.marktngid:'',this.selectedyear?this.selectedyear:this.year[0].dt).subscribe((data) => {
      this.supplierdata = data;
      this.spinner.hide();
      // console.log(this.supplierdata)
      if (this.supplierdata.length>0) {
        for (var i = 0; i < this.supplierdata.length; i++) {
          this.supplierdata[i].rowTot = this.supplierdata[i].JAN + 
                                  this.supplierdata[i].FEB + 
                                  this.supplierdata[i].MAR + 
                                  this.supplierdata[i].APRIL + 
                                  this.supplierdata[i].MAY + 
                                  this.supplierdata[i].JUN + 
                                  this.supplierdata[i].JULY + 
                                  this.supplierdata[i].AUG + 
                                  this.supplierdata[i].SEP + 
                                  this.supplierdata[i].OCT + 
                                  this.supplierdata[i].NOV + 
                                  this.supplierdata[i].DEC
        }
        this.totTar = this.supplierdata.map(a => parseInt(a.mtar?a.mtar:'0')).reduce(function (a, b) {
          return a + b;
        });
        this.totJAN = this.supplierdata.map(a => parseInt(a.JAN?a.JAN:'0')).reduce(function (a, b) {
          return a + b;
        });
        this.totFEB = this.supplierdata.map(a => parseInt(a.FEB?a.FEB:'0')).reduce(function (a, b) {
          return a + b;
        });
        this.totMAR = this.supplierdata.map(a => parseInt(a.MAR?a.MAR:'0')).reduce(function (a, b) {
          return a + b;
        });
        this.totAPRIL = this.supplierdata.map(a => parseInt(a.APRIL?a.APRIL:'0')).reduce(function (a, b) {
          return a + b;
        });
        this.totMAY = this.supplierdata.map(a => parseInt(a.MAY?a.MAY:'0')).reduce(function (a, b) {
          return a + b;
        });
        this.totJUN = this.supplierdata.map(a => parseInt(a.JUN?a.JUN:'0')).reduce(function (a, b) {
          return a + b;
        });
        this.totJULY = this.supplierdata.map(a => parseInt(a.JULY?a.JULY:'0')).reduce(function (a, b) {
          return a + b;
        });
        this.totAUG = this.supplierdata.map(a => parseInt(a.AUG?a.AUG:'0')).reduce(function (a, b) {
          return a + b;
        });
        this.totSEP = this.supplierdata.map(a => parseInt(a.SEP?a.SEP:'0')).reduce(function (a, b) {
          return a + b;
        });
        this.totOCT = this.supplierdata.map(a => parseInt(a.OCT?a.OCT:'0')).reduce(function (a, b) {
          return a + b;
        });
        this.totNOV = this.supplierdata.map(a => parseInt(a.NOV?a.NOV:'0')).reduce(function (a, b) {
          return a + b;
        });
        this.totDEC = this.supplierdata.map(a => parseInt(a.DEC?a.DEC:'0')).reduce(function (a, b) {
          return a + b;
        });
        this.totrowTot = this.supplierdata.map(a => parseInt(a.rowTot?a.rowTot:'0')).reduce(function (a, b) {
          return a + b;
        });
        
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
  dealerslist: any = [];
  getdealerslist() {
    this.globalService.getDatawithQueryParams1nd4new('A', this.loginUserData.company_code,'Dealer').subscribe((data) => {
      // this.globalService.getDatawithMethodParams1('sup/superlistmrkwise/', '').subscribe(data => {
        this.spinner.hide();
        this.givercompanynames = data;
        console.log(this.givercompanynames)
      })
  }
  targetChange(data){
    data.monthtarget = Math.ceil(data.yeartarget / 12);
  }
  ViewDetails(data){}
  Editbtn:Boolean=false;
  edtdealercode: any;
  editInfo(data){
    this.Editbtn=true;
    this.masterData =data;
    this.edtdealercode =data.dealercode;
    this.masterData.giver_companyname = data.business_name;
  }
  formdataa: any;
  onSubmit(form: NgForm) {
      this.spinner.show();      
    if (this.masterData.yeartarget > 0) {
      this.formdataa = form;
      // $("#confirmation").modal('show');
      if(this.Editbtn){
        this.UpdateatributesData(this.formdataa)
      }else{
        this.atributesData(this.formdataa)
      }
      
    }
    else {
     this.toasterService.warning("Enter Valid Amount")

    }
    this.spinner.hide();    
  }
  methodname: any;
  company_name: any
  chequedata: any;
  masterbankdata: any;
  dealer_Code: any;
  atributesData(form) {
    if(this.masterData.giver_companyname){
      for (let name of this.givercompanynames) {
        if (this.masterData.giver_companyname.replace(/\s/g, '') === name.business_name.replace(/\s/g, '')) {
          this.dealer_Code = name.user_id;
          break;
        }
      }
    }
    // $("#confirmation").modal('hide');
    this.spinner.show();  
    // this.masterData.check_date = this.DatePipe.transform(this.masterData.check_date, "yyyy-MM-dd");
    this.headerdata.dealercode = this.dealer_Code;
    this.headerdata. yeartarget = this.masterData.yeartarget?this.masterData.yeartarget:null;
    this.headerdata. monthtarget = this.masterData.monthtarget;

    this.methodname = "sup/dealertarget/"
    this.globalService.postData(this.headerdata, this.methodname).subscribe((data:any) => {
      this.spinner.hide();
      this.masterData.giver_company_name = ''
      this.chequedata = data;
      this.Listdata = data.data;
      console.log(data);
      this.spinner.hide();
      $("#successModal").modal('show');
      form.reset();
    },
      error => {
        // this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      }
    );
    // this.spinner.hide();
  }
  UpdateatributesData(form) {
    if(this.masterData.giver_companyname){
      for (let name of this.givercompanynames) {
        if (this.masterData.giver_companyname.replace(/\s/g, '') === name.business_name.replace(/\s/g, '')) {
          this.dealer_Code = name.user_id;
          break;
        }
      }
    }
    // $("#confirmation").modal('hide');
    this.spinner.show();  
    // this.masterData.check_date = this.DatePipe.transform(this.masterData.check_date, "yyyy-MM-dd");
    this.headerdata.dealercode = this.edtdealercode;
    this.headerdata. yeartarget = this.masterData.yeartarget?this.masterData.yeartarget:null;
    this.headerdata. monthtarget = this.masterData.monthtarget;

    this.methodname = "sup/dealertarget/"
    this.globalService.updateData(this.headerdata, this.methodname).subscribe((data:any) => {
      this.spinner.hide();
      this.Editbtn=false;
      this.masterData.giver_company_name = '';
      this.edtdealercode='';
      this.chequedata = data;
      this.Listdata = data.data;
      console.log(data);
      this.spinner.hide();
      $("#successModal").modal('show');
      form.reset();
    },
      error => {
        // this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      }
    );
    // this.spinner.hide();
  }

  clear() {
    this.masterData = {};
  }
  keypress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  printreport() {
    let popupWinindow
    let innerContents = document.getElementById('printsuppndng').innerHTML;
    popupWinindow = window.open('', '_blank', 'top=0,left=0,height=100%,width=100%');
    popupWinindow.document.open();
    popupWinindow.document.write(`<html><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><link rel="stylesheet"  href="styles.scss" />
      <style>
      #printsuppndng{
        width: 100% !important;
        margin:0 !important;
      }
      
      body{
        width: 100% !important;
      }
      table{
        width: 100% !important;
      }
      table thead th,table tbody td{
        font-size: 9px !important;
      }
      table, th, td, tr{
        border: 1px solid #DDDDDD !important;
        border-collapse: collapse !important;
      }
      .busname {
        display: contents;
      }
      .Phide{
        display:none !important;
      }
      .printwrap{ 
        // margin-left:0px !important;
        // margin-right:1% !important;
        position:relative;
        left:0% !important;
        width:100% !important;
      }
      @page { size: landscape; }
      p{margin:0px;font-size: 12px;}
      table thead th {background: gray;color:white;}
      @media print {
        .col-md-3 {
          width:30%;
          float: left;
        }
        #printPageButton,.page {
          display: none !important;
        }
        .total_invoice_page {
          background: #fff;
          padding: 20px;
          box-shadow: 0px 3px 12px 0px #cccccc;
      }
      .invoce_address {
          padding: 0 30px;
          border: 1px dashed #37475a;
      }
      .company_address{
          font-weight: 700;
          font-size: 12px;
          padding-right: 5px;
          color: #232f3e;
      }
      
      .hr_line{
          border-bottom: 1px dashed #37475a;
          border-top: 1px dashed #37475a;
      }
      .marg_t_b_15{
          margin-top: 15px;
          margin-bottom: 15px;
      }
      .hr_line_botm{
          border-bottom: 1px dashed #37475a;
      }
      
      .f_left{
          float:left;
      }
      .f_right{
          float:right;
      }
      
      .fnt_size_12{
          font-size: 12px;
      }
      
      .pad_r_15{
          padding-right: 15px;
      }
      .pad_l_15{
          padding-left: 15px;
      }
      
      .theme_bgclr {
          font-size: 11px !important;
          padding: 3px 12px !important;
        }
      
        .mar_b_30{
          margin-bottom: 30px;
      }
      
      .marg_t_15 {
          margin-top: 15px;
      }
      .date{
        width:7% !important;
      }
      .cwidth{
        width:7% !important;
      }
      .printTable tbody tr td{
        font-size: 11px;
    }
      }
      </style>
      </head>
      <body class="container"  onload="window.print()">` + innerContents + '</html>');
    popupWinindow.document.close();
  }


}
