import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supplier-packinglist-print',
  standalone: false,
  templateUrl: './supplier-packinglist-print.component.html',
  styleUrls: ['./supplier-packinglist-print.component.scss']
})
export class SupplierPackinglistPrintComponent implements OnInit {

  loginUserData: any
  invoiceData: any
  bankDetails: any;
  PUrl: any;
  date20=new Date();
  constructor() { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.invoiceData = JSON.parse(localStorage.getItem('supplierPackingInv'));
    this.PUrl = window.location.href.substr(window.location.href.length - 5)
  }
  sum(key) {
    return this.invoiceData.json_dtl.reduce((a, b) => a + (b[key] || 0), 0);
  }
  printInvoice() {
    let popupWinindow
    let innerContents = document.getElementById('printSectionId').innerHTML;
    popupWinindow = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWinindow.document.open();
    popupWinindow.document.write(`<html><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><link rel="stylesheet"  href="styles.scss" />
      <style>
      p{margin:0px;font-size: 12px;}
      table thead th {background: gray;color:white;}
      @media print {
        .toaddr .col-md-9{
          width:70%;
        }
        .toaddr{
          display:flex;
        }
        .toaddr .col-md-3{
          width:30%;
        }
        .gsttable{
          width:65%;
        }
        .alignright{
          text-align:right !important;
        }
        th{
          font-size:10px;
        }
        td{
          font-size:10px;
        }
        thead tr th{
          padding:3px !important;
        }
        .table-bordered{
          border:1px solid #fff !important;
      }
       
        .table-bordered{
          border:1px solid #fff !important;
      }
      .customwidth40{
        width:40%  !important;
      }
      .customwidth60{
        width:60%  !important;
      }
     
        @page {
          // size: landscape;
          // margin:0 !important;
          scale:100 !important;
        }
        // @page{
        //   margin:17px;
        // }
        th{
          padding:3px !important;
        }
        td{
          padding:3px !important;
          vertical-align: middle !important;
        }
        .container {
           padding-right: 0 !important;
           padding-left: 0 !important;
        }
        span{
          line-height:1.5 !important;
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
        padding: 10px 20px;
        border: 1px dashed #000000;
        margin: 10px 20px;
      }
      .company_address{
          font-weight: 700;
          font-size: 12px;
          padding-right: 5px;
          color: #232f3e;
      }
      .txt_right{
        text-align:right;
      }
      // .hr_line{
      //     border-bottom: 1px dashed #000000;
      //     border-top: 1px dashed #000000;
      // }
      .marg_t_b_15{
          margin-top: 15px;
          margin-bottom: 15px;
      }
      // .hr_line_botm{
      //     border-bottom: 1px dashed #000000;
      // }
      
      .f_left{
          float:left;
      }
      .f_right{
          float:right;
      }
      
      .fnt_size_12{
          font-size: 12px;
          line-height: 1.5;
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
  inWords(num) {
    num = Math.round(num)
    var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
    var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    if ((num = num.toString()).length > 9) return 'overflow';
    let n: any = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


}
