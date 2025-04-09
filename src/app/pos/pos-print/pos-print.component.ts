import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pos-print',
  standalone: false,
  templateUrl: './pos-print.component.html',
  styleUrls: ['./pos-print.component.scss']
})
export class PosPrintComponent implements OnInit {
  loginUserData: any;
  posPrintData: any;
  grand_total: any;
  taxAmount: any;
    pos_user: any=[];

  constructor() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.posPrintData = JSON.parse(localStorage.getItem('posPrint'));
    this.pos_user = JSON.parse(localStorage.getItem('mobile_user'));
    console.log("pos_det",this.pos_user);
    
    console.log(this.posPrintData);
    let printDetail = this.posPrintData.data.json_dtl
    this.grand_total = printDetail.filter((item) => item.tot_value)
      .map((item) => +item.tot_value)
      .reduce((sum, current) => sum + current);
    this.taxAmount = printDetail.filter((item) => item.gst_amount)
      .map((item) => +item.gst_amount)
      .reduce((sum, current) => sum + current);
  }

  ngOnInit() {
  };

  printInvoice() {
    let popupWinindow
    let innerContents = document.getElementById('printSectionId').innerHTML;
    popupWinindow = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWinindow.document.open();
    popupWinindow.document.write(`<html><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><link rel="stylesheet"  href="styles.scss" />
    </head>
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
    <body class="container"  onload="window.print()">` + innerContents + '</html>');
    popupWinindow.document.close();
  }

}
