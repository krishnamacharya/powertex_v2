import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-market-dealersales-reportsprint',
  standalone: false,
  templateUrl: './market-dealersales-reportsprint.component.html',
  styleUrls: ['./market-dealersales-reportsprint.component.scss']
})
export class MarketDealersalesReportsprintComponent implements OnInit {
  reportdata:any
  loginUserData:any
  constructor() { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.reportdata = JSON.parse(localStorage.getItem('delsalesreportdata'));
  }
  printPL() {
    let popupWinindow
    let innerContents = document.getElementById('printSectionId').innerHTML;
    popupWinindow = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWinindow.document.open();
    popupWinindow.document.write(`<html><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><link rel="stylesheet"  href="styles.scss" />
      <style>
      p{margin:0px;font-size: 12px;}
      table thead th {background: gray;color:white;}
      @media print {
        thead tr th{
          padding: 3px !important;
        }
        .text-right{
          text-algin:right;
        }
        .printwrap{
          //  margin-left:2%;
          // // margin-right:1%;
          // position:relative;
          // left:55%;
          // width:70%;
        }
        @page {
          // size: landscape;
          // // margin:0 !important;
          // scale:95 !important;
        }
        th{
          padding:4px !important;
        }
        td{
          padding:4px !important;
        }
        tfoot tr td
        {
          border: none!important;
      }
      .noBorder th{
        border: none!important;
      }
       .noBorder td{
        border: none!important;
      }
        .col-md-3 {
          width:30%;
          float: left;
        }
        #printPageButton {
          display: none;
        }
        .total_invoice_page {
          background: #fff;
          padding: 20px;
          box-shadow: 0px 3px 12px 0px #cccccc;
      }
      .invoce_address {
          padding: 0 10px;
          // border: 1px dashed #37475a;
      }
      .company_address{
          font-weight: 700;
          font-size: 12px;
          padding-right: 5px;
          color: #232f3e;
          text-align:right;
      }
      
      .hr_line{
          border-bottom: 1px dashed #000000;
          border-top: 1px dashed #000000;
      }
      .marg_t_b_15{
          margin-top: 15px;
          margin-bottom: 15px;
      }
      .hr_line_botm{
          border-bottom: 1px dashed #000000;
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
