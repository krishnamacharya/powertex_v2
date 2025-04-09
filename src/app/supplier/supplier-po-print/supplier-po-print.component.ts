import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalServiceService } from '../../global-service.service';
@Component({
  selector: 'app-supplier-po-print',
  standalone: false,
  templateUrl: './supplier-po-print.component.html',
  styleUrls: ['./supplier-po-print.component.scss']
})
export class SupplierPoPrintComponent implements OnInit {
  loginUserData: any
  poData: any;
  totqty: any;
  PUrl: any;
  bankDetails: any;
  todaydate = new Date();
  constructor(private globalServicce: GlobalServiceService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params['po']) {
        this.globalServicce.getDatawithQueryPars('sup/get_sup_po/', params['po']).subscribe((respdata: any) => {
          this.poData = respdata
          if (this.poData.data.json_hdr.supplierid.user_id) {
            this.getBankDetails(this.poData.data.json_hdr.supplierid.user_id)
          }     
           this.totqty= this.poData.data.json_dtl.map(a => parseFloat(a.qty?a.qty:'0')).reduce(function (a, b) {
            return a + b;
          });
        })
      } else {
        this.poData = JSON.parse(localStorage.getItem('supplierpodata'));
        if (this.poData.data.json_hdr.supplierid.user_id) {
          this.getBankDetails(this.poData.data.json_hdr.supplierid.user_id)
        }
        this.totqty= this.poData.data.json_dtl.map(a => parseFloat(a.qty?a.qty:'0')).reduce(function (a, b) {
          return a + b;
        });
      } 
    });
  }
  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.PUrl = window.location.href.substr(window.location.href.length - 5)
  }
  getBankDetails(id) {
    this.globalServicce.getDatawithQueryParams1(3.61, id).subscribe((d) => {
      if (d) {
        this.bankDetails = d[0];
      }
    })
  }
  printPO() {
    let popupWinindow
    let innerContents = document.getElementById('printSectionId').innerHTML;
    // console.log(innerContents)
    popupWinindow = window.open('', '_blank', 'top=0,left=0,height=100%,width=100%');
    popupWinindow.document.open();
    popupWinindow.document.write(`<html><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><link rel="stylesheet"  href="/styles.scss" />
      <style>
      p{margin:0px;font-size: 12px;}
      table thead th {background: gray;color:white;}
      @media print {
        .deliverytitle{
          margin:5px !important;
          line-height: 1;
       }
       .gstspan{
        line-height: 1.5;font-size: 9px !important;
     }
      //   .spnleft{
      //     display: inline-block;
      //    width:300px;
      // }
      .nopadding{
        padding:0 !important;
      }
        .text-right{
          text-align:right;
        }
        .customwidth20{
          width:12% !important;
        }
        .customwidth30{
          width:25% !important;
        }
        .alignright{
          text-align:right !important;
          // padding-right:15px;
        }
        th{
            font-size: 10px;
        }
        p{
          font-size:10px !important;
        }
        .gsttable{
          width:60%;
        }
        .tqtywidth{
          width:10%;
        }
        // span{
        //   color:gray;
        // }
        .fnt_size_12 span{
          line-height:1 !important;
          font-size:10px !important;
         }
        strong{
          font-size:10px !important;
        }
        span{
          display:inline-block;
          line-heght:1;
        }
        .col-md-7{
          padding-right: 0 !important; 
          padding-left: 0 !important;
        }
        .col-md-5{
          padding-right: 0 !important; 
          padding-left: 0 !important;
        }
        .poheadLeft{
          // width:80% !important;
          padding-right: 0 !important; 
          padding-left: 0 !important;
        }
        .container {
           padding-right: 0 !important; 
          padding-left: 0 !important;
        }
        .txt_right{
          text-align:right;
        }
        .poheadRight{
          // width:20% !important;
          float:right;
          padding-right: 0 !important; 
          padding-left: 0 !important;
        }
        .col-md-4 {
           width:40%;
          float: left;
        }
        .col-md-6{
          // width:50% !important;
          padding-right: 0 !important; 
          padding-left: 0 !important;
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
        margin:0 6px;
    }
    .mb-1half{
      margin-bottom: 1.5rem;
  }
    .printwrap{
      border: 1px dashed #37475a;
      margin: 0 20px;
    }
    .mt-1{
      margin-top:1rem;
    }
    .pt-1{
      padding-top:1rem
    }
      .company_address{
          font-weight: 700;
          font-size: 12px;
          padding-right: 5px;
          color: #232f3e;
          text-align: left;
          margin-bottom: 5px !important;
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
          font-size: 9px;
          line-height:1.5 !important;
      }
      .fnt_size_12 span{
        line-height:1.5 !important;
    }
      .pad_r_15{
          padding-right: 1px;
      }
      .pad_l_15{
          padding-left: 1px;
      }
      .theme_bgclr {
          font-size: 11px !important;
          padding: 3px 8px !important;
        }
        .mar_b_30{
          margin-bottom: 30px;
      }
      .marg_t_15 {
          margin-top: 15px;
      }
      .printTable tbody tr td{
        font-size: 9px !important;
        padding: 3px !important;
    }
    .printTable thead tr th{
      font-size: 9px;
      padding: 2px !important;
  }
  strong{
    font-size:10px !important;
  }
  .padding_0{
    padding:0 !important;
  }
  .width70{
    width:70%;
  }
  .width30{
    width:30%;
  }
      }
      </style>
      </head>
      <body class="container"  onload="window.print()"><br><br>` + innerContents + '</html>');
    popupWinindow.document.close();
  }
  toWords(s) {
    var th = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];
    var dg = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    var tn = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    var tw = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    s = s.toString();
    s = s.replace(/[\, ]/g, '');
    if (s != parseFloat(s)) return 'not a number';
    var x = s.indexOf('.');
    if (x == -1) x = s.length;
    if (x > 15) return 'too big';
    var n = s.split('');
    var str = '';
    var sk = 0;
    for (var i = 0; i < x; i++) {
      if ((x - i) % 3 == 2) {
        if (n[i] == '1') {
          str += tn[Number(n[i + 1])] + ' ';
          i++;
          sk = 1;
        }
        else if (n[i] != 0) {
          str += tw[n[i] - 2] + ' ';
          sk = 1;
        }
      }
      else if (n[i] != 0) {
        str += dg[n[i]] + ' ';
        if ((x - i) % 3 == 0) str += 'Hundred ';
        sk = 1;
      }
      if ((x - i) % 3 == 1) {
        if (sk) str += th[(x - i - 1) / 3] + ' ';
        sk = 0;
      }
    }
    if (x != s.length) {
      var y_val = s.length;
      str += 'Point ';
      for (var q = x + 1; q < y_val; q++)
        str += dg[n[q]] + ' ';
    }
    return str.replace(/\s+/g, ' ');
  }
  // inWords(num) {
  //   num = Math.round(num)
  //   var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
  //   var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  //   if ((num = num.toString()).length > 9) return 'overflow';
  //   let n: any = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  //   if (!n) return; var str = '';
  //   str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
  //   str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
  //   str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
  //   str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
  //   str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
  //   return str.charAt(0).toUpperCase() + str.slice(1);
  // }
}
