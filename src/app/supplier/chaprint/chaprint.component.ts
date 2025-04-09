import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalServiceService } from '../../global-service.service';

@Component({
  selector: 'app-chaprint',
  standalone: false,
  templateUrl: './chaprint.component.html',
  styleUrls: ['./chaprint.component.scss']
})
export class ChaprintComponent implements OnInit {
  PUrl: any;
  invoiceData: any;
  loginUserData: any;
  ToTreceipted: any;
  ToTnonreceipted: any;
  invtData: any;
  constructor(private globalServicce: GlobalServiceService, private route: ActivatedRoute) {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.route.queryParams.subscribe(params => {
      if (params['invqhid']) {
        // this.globalServicce.getDatawithQueryPar('sup/get_sup_invoice/', params['invqhid']).subscribe((respdata: any) => {
          this.globalServicce.getDatawithQueryPar('sup/chagetdetails/', params['invqhid']).subscribe((respdata: any) => {
          // this.loginUserData['headoffice_address'] = respdata.logindata.headoffice_address
          // this.invoiceData = respdata.data
          this.invoiceData = respdata
          this.invtData = respdata[0].chadtl
          console.log(this.invoiceData,"print data")
          this.ToTnonreceipted = this.invtData.map(a => parseFloat(a.nonreceipted?a.nonreceipted:'0')).reduce(function (a, b) {
            return a + b;
          });
          this.ToTreceipted = this.invtData.map(a => parseFloat(a.receipted?a.receipted:'0')).reduce(function (a, b) {
            return a + b;
          });
          console.log(this.ToTnonreceipted,'this.ToTnonreceipted',this.ToTreceipted,'this.ToTreceipted')
        })
      }
    })
  }
  sum(key) {
    return this.invoiceData[0].reduce((a, b) => a + (b[key] || 0), 0);
  }
  ngOnInit() {
    this.PUrl = window.location.href.substr(window.location.href.length - 5)

  }
  printCha() {
    let popupWinindow
    let innerContents = document.getElementById('printSectionId').innerHTML;
    popupWinindow = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWinindow.document.open();
    popupWinindow.document.write(`<html><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><link rel="stylesheet"  href="styles.scss" />
      <style>
      p{margin:0px;font-size: 12px;}
      table thead th {background: gray;color:white;}
      @media print {
        .shiptitle{
          padding-bottom: 0;text-align: center;font-weight: 600;font-size: 25px;margin-top: 0px;padding-top:0 !important;margin-bottom: 5px;
        }
        .nopadding {
          padding: 0 !important;
          margin: 0 !important;
       }
       p,address{
           margin:0 !important;
           line-height: 1.5;
       }
        .containter{
          padding:0 !important;
        }
        .col-md-2 {
          width: 16% !important;
      }
      .w-18{
        width:17.5% !important;
      }
      .w-20{
        width:20% !important;
      }
      .w-25{
        width:25% !important;
      }
      .w-30{
        width:30% !important;
      }
      .w-35{
        width:35% !important;
      }
      .w-37{
        width:37% !important;
      }
      .w-40{
        width:40% !important;
      }
      .w-50{
        width:50% !important;
      }
      .w-60{
        width:60% !important;
      }
      .w-70{
        width:70% !important;
      }
     .w-75{
      width:75% !important;
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
          // padding: 0 30px;
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
      .table-bordered{
        border:none !important;
      }
      </style>
      </head>
      <body class="container"  onload="window.print()">` + innerContents + '</html>');
    popupWinindow.document.close();
  }


//   toWords(s){  

//   var th = ['','Thousand','Million', 'Billion','Trillion'];
//   var dg = ['Zero','One','Two','Three','Four', 'Five','Six','Seven','Eight','Nine']; 
//   var tn = ['Ten','Eleven','Twelve','Thirteen', 'Fourteen','Fifteen','Sixteen', 'Seventeen','Eighteen','Nineteen'];
//   var tw = ['Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety']; 

//     s = s.toString(); 
//     s = s.replace(/[\, ]/g,''); 
//     if (s != parseFloat(s)) return 'not a number'; 
//     var x = s.indexOf('.');
//     if (x == -1) x = s.length; 
//     if (x > 15) return 'too big'; 
//     var n = s.split(''); 
//     var str = ''; 
//     var sk = 0; 
//     for (var i=0; i < x; i++) 
//     {
//         if ((x-i)%3==2) 
//         {
//             if (n[i] == '1') 
//             {
//                 str += tn[Number(n[i+1])] + ' '; 
//                 i++; 
//                 sk=1;
//             }
//             else if (n[i]!=0) 
//             {
//                 str += tw[n[i]-2] + ' ';
//                 sk=1;
//             }
//         }
//         else if (n[i]!=0) 
//         {
//             str += dg[n[i]] +' '; 
//             if ((x-i)%3==0) str += 'Hundred ';
//             sk=1;
//         }

//         if ((x-i)%3==1)
//         {
//             if (sk) str += th[(x-i-1)/3] + ' ';
//             sk=0;
//         }
//     }
  
//     if (x != s.length) {
//       var y_val = s.length;
//       str += 'Point ';
//       for (var q = x + 1; q < y_val; q++)
//           str += dg [n [q]] + ' ';
//   }
//   return str .replace(/\s+/g, ' ');

  
// }
 toWords(value) {
  var fraction = Math.round(this.frac(value)*100);
  var f_text  = "";

  if(fraction > 0) {
      f_text = "AND "+this.convert_number(fraction)+" PAISE";
  }

  return this.convert_number(value)+" RUPEES "+f_text+" ONLY";
}

 frac(f) {
  return f % 1;
}

 convert_number(number)
{
  if ((number < 0) || (number > 999999999)) 
  { 
      return "NUMBER OUT OF RANGE!";
  }
  var Gn = Math.floor(number / 10000000);  /* Crore */ 
  number -= Gn * 10000000; 
  var kn = Math.floor(number / 100000);     /* lakhs */ 
  number -= kn * 100000; 
  var Hn = Math.floor(number / 1000);      /* thousand */ 
  number -= Hn * 1000; 
  var Dn = Math.floor(number / 100);       /* Tens (deca) */ 
  number = number % 100;               /* Ones */ 
  var tn= Math.floor(number / 10); 
  var one=Math.floor(number % 10); 
  var res = ""; 

  if (Gn>0) 
  { 
      res += (this.convert_number(Gn) + " CRORE"); 
  } 
  if (kn>0) 
  { 
          res += (((res=="") ? "" : " ") + 
          this.convert_number(kn) + " LAKH"); 
  } 
  if (Hn>0) 
  { 
      res += (((res=="") ? "" : " ") +
          this.convert_number(Hn) + " THOUSAND"); 
  } 

  if (Dn) 
  { 
      res += (((res=="") ? "" : " ") + 
          this.convert_number(Dn) + " HUNDRED"); 
  } 


  var ones = Array("", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX","SEVEN", "EIGHT", "NINE", "TEN", "ELEVEN", "TWELVE", "THIRTEEN","FOURTEEN", "FIFTEEN", "SIXTEEN", "SEVENTEEN", "EIGHTEEN","NINETEEN"); 
var tens = Array("", "", "TWENTY", "THIRTY", "FOURTY", "FIFTY", "SIXTY","SEVENTY", "EIGHTY", "NINETY"); 

  if (tn>0 || one>0) 
  { 
      if (!(res=="")) 
      { 
          res += " AND "; 
      } 
      if (tn < 2) 
      { 
          res += ones[tn * 10 + one]; 
      } 
      else 
      { 

          res += tens[tn];
          if (one>0) 
          { 
              res += ("-" + ones[one]); 
          } 
      } 
  }

  if (res=="")
  { 
      res = "zero"; 
  } 
  return res;
}

}
