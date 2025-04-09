import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../../global-service.service';

@Component({
  selector: 'app-import-po-print',
  standalone: false,
  templateUrl: './import-po-print.component.html',
  styleUrls: ['./import-po-print.component.scss']
})
export class ImportPoPrintComponent implements OnInit {

  company_details: any;
  print_po_data: any;
  item: any;
  podata: any;
  poData: any = [];
  shipping_seq_no: any;
  billing_seq_no: any;
  billingAddress: any = {};
  shipingAddress: any = {};
  loginUserData: any;
  grand_total: any;
  dtl_data: any = [];
  PO_Date: any;
  taxAmount: any;
  // printSectionId :any;
  constructor( private router: Router, private globalService: GlobalServiceService, private spinner: NgxSpinnerService) {
    // this.poData = this.dataservice.getpodata();

    //console.log(this.billing_seq_no);
  }

  ngOnInit() {

    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    console.log("login", this.loginUserData);


    if (this.loginUserData === null) {
      this.router.navigateByUrl('home');
    }

    this.poData = JSON.parse(localStorage.getItem('importpoprintData'));
    console.log("total data",this.poData);
    this.dtl_data = this.poData.data.json_dtl;


    this.grand_total = this.dtl_data.filter((item) => item.forex_value)
      .map((item) => +item.forex_value)
      .reduce((sum, current) => sum + current);

    this.taxAmount = this.dtl_data.filter((item) => item.gst_amount)
      .map((item) => +item.gst_amount)
      .reduce((sum, current) => sum + current);


    this.billing_seq_no = this.poData.data.json_hdr.bill_to_party_seq_no;
    this.shipping_seq_no = this.poData.data.json_hdr.ship_to_party_seq_no;
    this.po_printAddress();
  }

  po_printAddress() {
    this.spinner.show();
    let input_id = "7.8";
    let param1 = this.billing_seq_no + "," + this.shipping_seq_no;
    console.log(param1);
    return this.globalService.getDatawithQueryParams1(input_id, param1).subscribe(data => {
      this.spinner.hide();
      console.log(data);
      // this.PO_Date=formatDate(this.poData.data.json_hdr.document_date, 'yyyyMMdd', 'en-US');
      this.billingAddress = data['Bill'];
      this.shipingAddress = data['SHIP'];
    });
  }

  printPO() {
    let popupWinindow;
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
