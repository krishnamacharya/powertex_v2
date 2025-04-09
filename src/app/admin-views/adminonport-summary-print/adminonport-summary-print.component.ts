import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-adminonport-summary-print',
  standalone: false,
  templateUrl: './adminonport-summary-print.component.html',
  styleUrls: ['./adminonport-summary-print.component.scss']
})
export class AdminonportSummaryPrintComponent implements OnInit {

  
  p: any = 1;
  searchText:any;
  loginUserData: any;
  PendingPayments: any = [];
  allPendingPayments: any = [];
  searchduedate: any;

  totalcartons: any;
  totalcontainers: any;
  totalamount:any;
  totalinvoicecny:any;
  dischargeports: any = []
  dischargeprt: any;
  constructor(private route: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    //this.getPendingPayments();
   // this.getdischargeports();
    this.getOrdersummery();
    this.dischargeprt = JSON.parse(localStorage.getItem('dischargeprt'));
   
  }

  getOrdersummery() {
  
    this.PendingPayments = JSON.parse(localStorage.getItem('PendingPayments'));
  //  this.dischargeprt = JSON.parse(localStorage.getItem('dischargeprt'));
    this.totalcartons = this.PendingPayments.map(a => parseFloat(a.ctns ? a.ctns : '0')).reduce(function (a, b) {
      return a + b;
    });
    this.totalcontainers = this.PendingPayments.map(a => parseFloat(a.noofcontainer ? a.noofcontainer : '0')).reduce(function (a, b) {
      return a + b;
    });
    console.log(this.totalcartons, this.totalcontainers)

    this.totalinvoicecny = this.PendingPayments.map(a => parseFloat(a.duty_approx ? a.duty_approx : '0')).reduce(function (a, b) {
      return a + b;
    });

  };


  filterduedate() {
    if (this.allPendingPayments > 0) {
      this.PendingPayments = this.allPendingPayments.filter((e) => e.Due_date <= this.searchduedate)
    } else {
      this.PendingPayments = this.allPendingPayments;
    }

  }


  getdocavailabl(data) {
    let text = "";
    if (data.productimage) {
      text = text + "IMG/"
    }
    if (data.doc1) {
      text = text + "BL/"
    }
    if (data.doc2) {
      text = text + "INV/"
    }
    if (data.doc3) {
      text = text + "PL/"
    }
    if (data.doc4) {
      text = text + "CO/"
    }
    if (data.doc5) {
      text = text + "INS/"
    }
    return text;
  }


  getpendingdoc(data) {
    let text = "";
    if (!data.doc1) {
      text = text + "BL/"
    }
    if (!data.doc2) {
      text = text + "INV/"
    }
    if (!data.doc3) {
      text = text + "PL/"
    }
    if (!data.doc4) {
      text = text + "CO/"
    }
    if (!data.doc5) {
      text = text + "INS/"
    }
    return text;
  }

//PRINT CODE



  printdatadetail(data) {
      this.route.navigateByUrl('/Supplier-Inv-Print?invqhid=' + data +'&A=OPS'); 
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
      table, th, td, tr{
        border: 1px solid #DDDDDD !important;
        border-collapse: collapse !important;
      }
      .bussname{
        display: contents;
        text-align:center !important;
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
          display: none;
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
