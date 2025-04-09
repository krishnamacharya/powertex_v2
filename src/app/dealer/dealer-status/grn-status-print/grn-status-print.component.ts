import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../../../global-service.service';
import { DataServiceService } from '../../../data-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-grn-status-print',
  standalone: false,
  templateUrl: './grn-status-print.component.html',
  styleUrls: ['./grn-status-print.component.scss']
})
export class GrnStatusPrintComponent implements OnInit {

  billing_seq_no: any;
  shipping_seq_no: any;
  billingAddress: any;
  shipingAddress: any;
  grnData: any;
  addresses: any;
  grnPrintData: any;
  loginUserData: any;
  grand_total: any;

  constructor(private dataservice: DataServiceService, private globalService: GlobalServiceService, private router: Router) {
  }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    if (this.loginUserData === null) {
      this.router.navigateByUrl('home');
    }

    //this.addresses = JSON.parse(localStorage.getItem('addresses'));
    this.grnPrintData = JSON.parse(localStorage.getItem('grnstatusprintData'));
    console.log(this.grnPrintData);

    this.billingAddress = this.grnPrintData.shiptoaddress;
    // this.shipingAddress = this.addresses.SHIP;
    this.grand_total = this.grnPrintData.detail.filter((item) => item.final_value)
    .map((item) => +item.final_value)
     .reduce((sum, current) => sum + current);

  }

  print_grn() {
    let popupWinindow
    let innerContents = document.getElementById('printSectionId').innerHTML;
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
        #printPageButton {
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
