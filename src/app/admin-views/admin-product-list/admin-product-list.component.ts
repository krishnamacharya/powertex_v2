import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../../global-service.service';
import { ToasterService } from '../../toastr-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-admin-product-list',
  standalone: false,
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.scss']
})
export class AdminProductListComponent implements OnInit {
  orders: any = [];
  p: any = 1;
  searchText: any;
  loginUserData: any;
  totalpaid: any;
  totalinvoice: any;
  suppliers: any = [];
  currency: any;
  pro: any;
  SNameExists:any;
  pro1:any;
  DataHidden :boolean=false;
  constructor(private globalServicce: GlobalServiceService,private toasterService: ToasterService, private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getsuppliers();
  }
  getsuppliers() {
    this.globalServicce.getDataOnlyWithMethod("sup/skuprifix").subscribe((data) => {
      this.suppliers = data;
    });
  }
  getsku(supplier) {
    if(!supplier){
      this.toasterService.warning("Please Select Supplier");
      return false;
    }else{
      for (let name of this.suppliers) {
        if (supplier.replace(/\s/g, '') === name.business_name.replace(/\s/g, '')) {
          this.pro = name.user_id
          break;
        }
      }

      if (this.suppliers) {
        let supplier = this.suppliers.filter((e) => e.user_id == this.pro)
        this.currency = supplier[0].currency
      }
    }

    if (this.orders) {
      this.orders = []
    }


    this.spinner.show();
    this.globalServicce.getDatawithMethodParams1("ProductMapping/", this.pro).subscribe((data) => {
    

      if (this.orders) {
        this.orders = []
      }

      this.orders = data
   
      this.spinner.hide();
      if(data['status']=="no data"){
        $("#WarningModal").modal('show');
        this.orders.length = 0;

      }

      // if (this.orders.length < 1) {
      //   $("#WarningModal").modal('show');
      //   }
     
      
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      });
      
   
  }
  printreport2(){
    this.DataHidden=true;
  }
  cancell(){
    this.DataHidden=false;
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
        table, th, td, tr{
          border: 1px solid #DDDDDD !important;
          border-collapse: collapse !important;
        }
        .busname {
          display: contents !important;
        }
        .cwidth{
          width: 7% !important;
        }
        .bg_clr{
          background-color: rgb(204, 196, 196) !important;
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
