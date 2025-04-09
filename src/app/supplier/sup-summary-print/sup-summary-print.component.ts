import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-sup-summary-print',
  standalone: false,
  templateUrl: './sup-summary-print.component.html',
  styleUrls: ['./sup-summary-print.component.scss']
})
export class SupSummaryPrintComponent implements OnInit {
  loginUserData: any
  SupplierData: any
  orders: any = [] 
  suppliers: any = []
  searchText:any;
  constructor(private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }
  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    if(this.loginUserData.user_type == 'Admin'){
      //this.SupplierData = JSON.parse(localStorage.getItem('Supplier-Details'));
      this.getOrdersummery();
    }
    this.getOrdersummery1();
  }
  getOrdersummery() {
  
    this.orders = JSON.parse(localStorage.getItem('orders'));
    this.SupplierData = JSON.parse(localStorage.getItem('Supplier-Details'));
  };
  getOrdersummery1() {
    this.orders = JSON.parse(localStorage.getItem('orders'));
  };
  //print
  printreport() {
    let popupWinindow
    let innerContents = document.getElementById('printsuppndng').innerHTML;
    popupWinindow = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWinindow.document.open();
    popupWinindow.document.write(`<html><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><link rel="stylesheet"  href="styles.scss" />
      <style>
      p{margin:0px;font-size: 12px;}
      table thead th {background: gray;color:white;}
      @media print {
        .col-md-3 {
          width:30%;
          float: left;
        }
        .table{
          margin-right: 5px !important;
        }
        .table thead tr th,
        .table thead tr td,
        .table tbody tr th,
        .table tbody tr td{
          padding: 3px;
          line-height: 0.9;
          vertical-align: top;
          border-top: 1px solid #ddd;
          font-size: 12px;
      }
      table, th, td, tr{
        border: 1px solid #DDDDDD !important;
        border-collapse: collapse !important;
      }
        .busname{
          display: contents;
          font-size: 13px !important;
        }
        #printPageButton{
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
