import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../../global-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-challan-print',
  standalone: false,
  
  templateUrl: './challan-print.component.html',
  styleUrl: './challan-print.component.scss'
})
export class ChallanPrintComponent implements OnInit {
  challanData: any;
  challanPrint: any;
  billing_seq_no: any;
  shipping_seq_no: any;
  billingAddress: any = {};
  shipingAddress: any = {};
  challantableData: any;
  Sum: any = 0;
  loginUserData: any;

  constructor(private globalService: GlobalServiceService, private spinner: NgxSpinnerService) {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.challanData = JSON.parse(localStorage.getItem('challanPrint'));
    this.challantableData = JSON.parse(localStorage.getItem('challanListData'));
    this.challanPrint = this.challanData.data.json_hdr;
    this.billing_seq_no = this.challanPrint.bill_to_party_seq_no;
    this.shipping_seq_no = this.challanPrint.ship_to_party_seq_no;
    console.log("data", this.challanData);
    console.log("sku",this.challantableData);
    
    this.getVal();
  }

  ngOnInit() {
    this.challan_printAddress();
  }

  challan_printAddress() {
    this.spinner.show();
    let input_id = "7.8";
    let param1 = this.billing_seq_no + "," + this.shipping_seq_no;
    console.log(param1);
    return this.globalService.getDatawithQueryParams1(input_id, param1).subscribe(data => { 
      this.spinner.hide();
      if (Object.keys(data).length > 0) {
        this.billingAddress = data['Bill'];
        this.shipingAddress = data['SHIP'];
      }
    });
  }

  getVal() {
    for (let i of this.challantableData) {
      // let qty = i.packing_qty;
      // this.temp = this.temp + qty;
      let val = i.net_value;
      console.log(val);
      this.Sum = this.Sum + val;
      console.log(this.Sum);
    }
  };

  printChallan() {
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
