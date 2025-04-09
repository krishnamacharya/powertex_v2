import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-adminchaledgerprint',
  standalone: false,
  templateUrl: './adminchaledgerprint.component.html',
  styleUrls: ['./adminchaledgerprint.component.scss']
})
export class AdminchaledgerprintComponent implements OnInit {
  orders: any = [];
  p: any = 1;
  searchText: any;
  loginUserData: any;
  chaamount: any;
  totalpayment: any;
  PendingPayments: any = [];
  fromdate: any;
  tilldate: any;
  pro: any;
  constructor(private DatePipe: DatePipe,private router: Router,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getOrdersummery();
    this.pro = JSON.parse(localStorage.getItem('pro'));
    console.log(this.pro,'lxx');
  }

  getOrdersummery() {
    this.orders = JSON.parse(localStorage.getItem('orders'));
  //  console.log(this.PendingPayments,'lxx');

  this.chaamount = this.orders.map(a => parseFloat(a.chaamount ? a.chaamount : '0')).reduce(function (a, b) {
    return a + b;
  });
  this.totalpayment = this.orders.map(a => parseFloat(a.Payment ? a.Payment : '0')).reduce(function (a, b) {
    return a + b;
  });

  };

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
