import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalServiceService } from '../../global-service.service';

@Component({
  selector: 'app-supplier-invoice-print',
  standalone: false,
  templateUrl: './supplier-invoice-print.component.html',
  styleUrls: ['./supplier-invoice-print.component.scss']
})
export class SupplierInvoicePrintComponent implements OnInit {
  loginUserData: any
  invoiceData: any
  bankDetails: any;
  totqty: any;
  PUrl: any;
  date20=new Date();
  constructor(private globalServicce: GlobalServiceService, private route: ActivatedRoute,) {
    this.route.queryParams.subscribe(params => {
      if (params['invqhid']) {
        this.globalServicce.getDatawithQueryPar('sup/get_sup_invoice/', params['invqhid']).subscribe((respdata: any) => {
          this.loginUserData = respdata.logindata;
          this.invoiceData = respdata.data
          this.getBankDetails()
          this.totqty= this.invoiceData.json_dtl.map(a => parseFloat(a.qty?a.qty:'0')).reduce(function (a, b) {
            return a + b;
          });
        })
      } else {
        this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
        this.invoiceData = JSON.parse(localStorage.getItem('supplierInvoicedata'));
        this.getBankDetails()
        this.totqty= this.invoiceData.json_dtl.map(a => parseFloat(a.qty?a.qty:'0')).reduce(function (a, b) {
          return a + b;
        });
      }
    });
  }

  ngOnInit() {
    this.PUrl = window.location.href.substr(window.location.href.length - 5)
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
        .printwrap {
          // padding: 0 1rem;
          // margin: 0 1rem;
          border: 1.5px solid #ddd;
          margin-top: 1rem;
      }
        .flexdiv{
          display:flex;
          width:100%;
        }
        .gsttable{
          width:65%;
        }
        .customwidth15{
          width:15% !important;
        }
        .customwidth20{
          width:20% !important;
        }
        .customwidth30{
          width:30% !important;
        }
        .customwidth35{
          width:35% !important;
        }
        .customwidth40{
          width:40% !important;
        }
        .customwidth70{
          width:70% !important;
        }
        .mb-2{
          margin-bottom:2rem;
        }
        .p-1{
          padding: 1rem;
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
        .printwrap{
          // margin-left:40%;
          // margin-right:1%;
          // position:relative;
          // left:48%;
          // width:70%;
        }
        @page {
          // size: landscape;
          // margin:0 !important;
          // scale:100 !important;
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
         // padding: 20px;
          box-shadow: 0px 3px 12px 0px #cccccc;
      }
      .invoce_address {
          // padding: 0 10px;
          margin:0 10px;
          // border: 1px dashed #000000;
      }
      .company_address{
          font-weight: 700;
          font-size: 12px;
          padding-right: 5px;
          color: #232f3e;
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
      .printwrap{
        padding: 0 1rem;
        margin:0 1rem;
        border: 1.5px solid #ddd;
    }
    .table-bordered{
      border:1px solid #fff !important;
  }
      </style>
      </head>
      <body class="container"  onload="window.print()">` + innerContents + '</html>');
    popupWinindow.document.close();
  }
  getBankDetails() {
    this.globalServicce.getDatawithQueryParams1(3.61, this.loginUserData.user_id).subscribe((d) => {
      if (d) {
        this.bankDetails = d[0];
      }
    })
  }
  // inWords(num) {
  //   num = Math.round(num)
  //   var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen ',];
  //   var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety',];
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


 

toWords(s)
{  

  var th = ['','Thousand','Million', 'Billion','Trillion'];
  var dg = ['Zero','One','Two','Three','Four', 'Five','Six','Seven','Eight','Nine']; 
  var tn = ['Ten','Eleven','Twelve','Thirteen', 'Fourteen','Fifteen','Sixteen', 'Seventeen','Eighteen','Nineteen'];
  var tw = ['Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety']; 

    s = s.toString(); 
    s = s.replace(/[\, ]/g,''); 
    if (s != parseFloat(s)) return 'not a number'; 
    var x = s.indexOf('.');
    if (x == -1) x = s.length; 
    if (x > 15) return 'too big'; 
    var n = s.split(''); 
    var str = ''; 
    var sk = 0; 
    for (var i=0; i < x; i++) 
    {
        if ((x-i)%3==2) 
        {
            if (n[i] == '1') 
            {
                str += tn[Number(n[i+1])] + ' '; 
                i++; 
                sk=1;
            }
            else if (n[i]!=0) 
            {
                str += tw[n[i]-2] + ' ';
                sk=1;
            }
        }
        else if (n[i]!=0) 
        {
            str += dg[n[i]] +' '; 
            if ((x-i)%3==0) str += 'Hundred ';
            sk=1;
        }

        if ((x-i)%3==1)
        {
            if (sk) str += th[(x-i-1)/3] + ' ';
            sk=0;
        }
    }
  
    if (x != s.length) {
      var y_val = s.length;
      str += 'Point ';
      for (var q = x + 1; q < y_val; q++)
          str += dg [n [q]] + ' ';
  }
  return str .replace(/\s+/g, ' ');

  
}


}
