import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../data-service.service';
import { GlobalServiceService } from '../../global-service.service';
import { Router } from '@angular/router';
import * as jspdf from 'jspdf';
import html2canvas from "html2canvas";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-purchase-order-print',
  standalone:false,
  templateUrl: './purchase-order-print.component.html',
  styleUrls: ['./purchase-order-print.component.scss']
})
export class PurchaseOrderPrintComponent implements OnInit {
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
  constructor(private dataservice: DataServiceService, private router: Router, private globalService: GlobalServiceService, private spinner: NgxSpinnerService) {
    // this.poData = this.dataservice.getpodata();

    //console.log(this.billing_seq_no);
  }
  poheaderdata: any
  line_amount: any
  final_amount: any
  promo_amount: any
  empdata: any
  promocode: any
  marketing_name: any
  bankdetails: any
  poaddress: any
  finalAmtBeforeround: any
  devicediscamount: any
  roundoffAmt: any
  cartonqty: number = 0
  totalqty: number = 0
  totalsp_discountamount: number = 0
  public freeqtyarr: any = []
  splitamount: any = []
  decimalamount: any
  promodecimalamount: any
  gst_amount: any
  splitgstamount: any = []
  decimalgstamount: any
  first: boolean = false
  totalfirsttaxable: number = 0
  totalfirstgst: number = 0
  second: boolean = false
  totalsecondtaxable: number = 0
  totalsecondgst: number = 0
  third: boolean = false
  totalthirdtaxable: number = 0
  totalthirdgst: number = 0
  fourth: boolean = false
  totalfourthtaxable: number = 0
  totalfourthgst: number = 0

  decimalsecondtaxableamount: any
  decimalsecondgstamount: number = 0
  decimalfirsttaxableamount: any
  decimalfirstgstamount: number = 0
  decimalthirdtaxableamount: any
  decimalthirdgstamount: number = 0
  decimalfourthtaxableamount: any
  decimalfourthgstamount: number = 0
  ngOnInit() {

    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));

    console.log("login", this.loginUserData);
    this.freeqtyarr = []

    if (this.loginUserData === null) {
      this.router.navigateByUrl('home');
    }

    this.poData = JSON.parse(localStorage.getItem('poprintData'));
    this.poaddress = this.poData.data.address
    console.log(this.poaddress, "this.poaddress")
    console.log("total data", this.poData);
    this.dtl_data = this.poData.data.json_dtl;
    for (let i of this.dtl_data) {
      // this.freeqtyarr=[]
      let npc = (i.qty + i.free_qty) / i.piecepercarton;
      this.cartonqty = this.cartonqty + npc;
      let qty = i.qty + i.free_qty
      this.totalqty = this.totalqty + qty
      let sp_disc_amount = i.sp_dic_amount;
      this.totalsp_discountamount = this.totalsp_discountamount + sp_disc_amount;
      if (i.free_qty != 0) {
        this.freeqtyarr.push({ "productname": i.subcategory + i.modelno, "free_qty": i.free_qty })
        console.log(this.freeqtyarr, "freeqty")
      }
      console.log(this.freeqtyarr, "globalfreeqty")
      if (i.gst == "18.00") {
        this.first = true

        let taxable = JSON.parse(i.tot_value)
        this.totalfirsttaxable = this.totalfirsttaxable + taxable

        let gst = JSON.parse(i.gst_amount)
        this.totalfirstgst = this.totalfirstgst + gst
      }
      if (i.gst == "5.00") {
        this.second = true

        let taxable = JSON.parse(i.tot_value)
        this.totalsecondtaxable = this.totalsecondtaxable + taxable

        let gst = JSON.parse(i.gst_amount)
        this.totalsecondgst = this.totalsecondgst + gst

      }
      if (i.gst == "12.00") {
        this.third = true

        let taxable = JSON.parse(i.tot_value)
        this.totalthirdtaxable = this.totalthirdtaxable + taxable

        let gst = JSON.parse(i.gst_amount)
        this.totalthirdgst = this.totalthirdgst + gst
      }
      if (i.gst == "28.00") {
        this.fourth = true

        let taxable = JSON.parse(i.tot_value)
        this.totalfourthtaxable = this.totalfourthtaxable + taxable

        let gst = JSON.parse(i.gst_amount)
        this.totalfourthgst = this.totalfourthgst + gst

      }
    }

    this.poheaderdata = this.poData.data.json_hdr

    this.line_amount = JSON.parse(this.poheaderdata.line_amount).toFixed(2);
    this.splitamount = this.line_amount.split('.')
    this.poheaderdata.line_amount = JSON.parse(this.splitamount[0])
    this.decimalamount = this.splitamount[1]


    this.devicediscamount = JSON.parse(this.poheaderdata.devicediscamount)
    this.bankdetails = this.poData.data.bank
    this.finalAmtBeforeround = this.poheaderdata.final_amount;
    this.final_amount = Math.round(this.poheaderdata.final_amount)
    this.roundoffAmt = (this.final_amount - this.finalAmtBeforeround)
    // this.promo_amount=this.poheaderdata.promo_amount
    if (this.poheaderdata.promo_amount) {
      this.promo_amount = JSON.parse(this.poheaderdata.promo_amount).toFixed(2);
      this.splitamount = this.promo_amount.split('.')
      this.poheaderdata.promo_amount = JSON.parse(this.splitamount[0])
      this.promodecimalamount = this.splitamount[1]
    }
    this.promocode = this.poheaderdata.code1

    this.grand_total = this.dtl_data.filter((item) => item.tot_value)
      .map((item) => +item.tot_value)
      .reduce((sum, current) => sum + current);

    this.taxAmount = this.dtl_data.filter((item) => item.gst_amount)
      .map((item) => +item.gst_amount)
      .reduce((sum, current) => sum + current);


    this.billing_seq_no = this.poData.data.json_hdr.bill_to_party_seq_no;
    this.shipping_seq_no = this.poData.data.json_hdr.ship_to_party_seq_no;
    this.po_printAddress();
    this.getNotificationCount()
    //this.captureScreen();
  }
  public captureScreen() {
    setTimeout(function () {
      var data = document.getElementById('contentToConvert');
      html2canvas(data).then(canvas => {
        // Few necessary setting options
        var imgWidth = 208;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jspdf.jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
        var position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
        pdf.save('MYPdf.pdf'); // Generated PDF
      });
    }, 3000)

  }
  totaloutstandingamount: any
  getNotificationCount() {
    //   this.globalService.getDatawithQueryParams1nd4('4.21', this.loginUserData.user_id, this.loginUserData.company_code).subscribe((data) => {
    // this.totaloutstandingamount= data['outstanding'];
    //   },
    //     // error => {
    //     //   this.ngxSmartService.getModal('errorModal').open();


    //     // }
    //     );
    this.globalService.getDatawithQueryParams1nd4('4.21', this.poData.data.json_hdr.po_origin_user_id, this.poData.data.json_hdr.po_origin_company_code).subscribe((data) => {
      this.totaloutstandingamount = data['outstanding'];
    },
      // error => {
      //   this.ngxSmartService.getModal('errorModal').open();


      // }
    );

  };
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
      if (this.loginUserData.company_address.state == this.billingAddress.state) {
        this.gst_amount = (JSON.parse(this.poheaderdata.gst_amount) / 2).toFixed(2);
        this.splitgstamount = this.gst_amount.split('.')
        this.poheaderdata.gst_amount = JSON.parse(this.splitgstamount[0])
        this.decimalgstamount = this.splitgstamount[1]
      }
      if (this.loginUserData.company_address.state != this.billingAddress.state) {
        this.gst_amount = JSON.parse(this.poheaderdata.gst_amount).toFixed(2);
        this.splitgstamount = this.gst_amount.split('.')
        this.poheaderdata.gst_amount = JSON.parse(this.splitgstamount[0])
        this.decimalgstamount = this.splitgstamount[1]
      }
      if (this.totalfirsttaxable) {
        this.line_amount = this.totalfirsttaxable.toFixed(2);
        this.splitamount = this.line_amount.split('.')
        this.totalfirsttaxable = JSON.parse(this.splitamount[0])
        this.decimalfirsttaxableamount = this.splitamount[1]

        if (this.loginUserData.company_address.state == this.billingAddress.state) {
          this.line_amount = (this.totalfirstgst / 2).toFixed(2);
          this.splitamount = this.line_amount.split('.')
          this.totalfirstgst = JSON.parse(this.splitamount[0])
          this.decimalfirstgstamount = parseInt(this.splitamount[1])

        }
        if (this.loginUserData.company_address.state != this.billingAddress.state) {
          this.line_amount = (this.totalfirstgst).toFixed(2);
          this.splitamount = this.line_amount.split('.')
          this.totalfirstgst = JSON.parse(this.splitamount[0])
          this.decimalfirstgstamount = parseInt(this.splitamount[1])
          console.log(this.decimalfirstgstamount, "this.decimalfirstgstamount")
        }
      }

      if (this.totalsecondtaxable) {
        this.line_amount = this.totalsecondtaxable.toFixed(2);
        this.splitamount = this.line_amount.split('.')
        this.totalsecondtaxable = JSON.parse(this.splitamount[0])
        this.decimalsecondtaxableamount = this.splitamount[1]

        if (this.loginUserData.company_address.state == this.billingAddress.state) {
          this.line_amount = (this.totalsecondgst / 2).toFixed(2);
          this.splitamount = this.line_amount.split('.')
          this.totalsecondgst = JSON.parse(this.splitamount[0])
          this.decimalsecondgstamount = parseInt(this.splitamount[1])
        }
        if (this.loginUserData.company_address.state != this.billingAddress.state) {
          this.line_amount = (this.totalsecondgst).toFixed(2);
          this.splitamount = this.line_amount.split('.')
          this.totalsecondgst = JSON.parse(this.splitamount[0])
          this.decimalsecondgstamount = parseInt(this.splitamount[1])
        }
      }
      if (this.totalthirdtaxable) {
        this.line_amount = this.totalthirdtaxable.toFixed(2);
        this.splitamount = this.line_amount.split('.')
        this.totalthirdtaxable = JSON.parse(this.splitamount[0])
        this.decimalthirdtaxableamount = this.splitamount[1]

        if (this.loginUserData.company_address.state == this.billingAddress.state) {
          this.line_amount = (this.totalthirdgst / 2).toFixed(2);
          this.splitamount = this.line_amount.split('.')
          this.totalthirdgst = JSON.parse(this.splitamount[0])
          this.decimalthirdgstamount = parseInt(this.splitamount[1])
        }
        if (this.loginUserData.company_address.state != this.billingAddress.state) {
          this.line_amount = (this.totalthirdgst).toFixed(2);
          this.splitamount = this.line_amount.split('.')
          this.totalthirdgst = JSON.parse(this.splitamount[0])
          this.decimalthirdgstamount = parseInt(this.splitamount[1])
        }
      }
      if (this.totalfourthtaxable) {
        this.line_amount = this.totalfourthtaxable.toFixed(2);
        this.splitamount = this.line_amount.split('.')
        this.totalfourthtaxable = JSON.parse(this.splitamount[0])
        this.decimalfourthtaxableamount = this.splitamount[1]

        if (this.loginUserData.company_address.state == this.billingAddress.state) {
          this.line_amount = (this.totalfourthgst / 2).toFixed(2);
          this.splitamount = this.line_amount.split('.')
          this.totalfourthgst = JSON.parse(this.splitamount[0])
          this.decimalfourthgstamount = parseInt(this.splitamount[1])
        }

        if (this.loginUserData.company_address.state != this.billingAddress.state) {
          this.line_amount = (this.totalfourthgst).toFixed(2);
          this.splitamount = this.line_amount.split('.')
          this.totalfourthgst = JSON.parse(this.splitamount[0])
          this.decimalfourthgstamount = parseInt(this.splitamount[1])
        }
      }
    });
  }

  printPO() {
    let popupWinindow
    let innerContents = document.getElementById('printSectionId').innerHTML;
    console.log(innerContents)
    popupWinindow = window.open('', '_blank', 'top=0,left=0,height=100%,width=100%');
    popupWinindow.document.open();
    popupWinindow.document.write(`<html><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><link rel="stylesheet"  href="styles.scss" />
      <style>
      h3{
        padding-top:1rem;
      }
      p{margin:0px;font-size: 12px;}
      table thead th {background: gray;color:white;}
      @media print {
        .alignright{
          text-align:right !important;
          // padding-right:15px;
        }
        th{
            font-size: 10px;
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
        .col-md-9{
          padding-right: 0 !important; 
          padding-left: 0 !important;
        }
        .col-md-3{
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
          // float:right;
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
          padding: 0 20px;
          border: 1px dashed #37475a;
           margin:0 15px;
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
  .row{
    display:flex;
    width:100%;
  }
  .customwidth70{
width:70% !important;
  }
  .customwidth25{
    width:25% important;
      }
      .gstspan{
        line-height: 1;font-size: 9px !important;margin-left: 1px;
    }
    .poaddrspan{
      display:inline-block;
      width:300px;
    }
    .companyaddr{
      margin-top: 1px;margin-bottom: 1px;font-weight: 600;line-height: 1;
  }
  .gstspan{
    line-height: 1;font-size: 10px !important;margin-left: 2px;
}
span{
  line-height: 1;
  display:inline-block;
}
h6{
  text-decoration:underline;margin-top: 2px;margin-bottom: 2px;
}
      }
      </style>
      </head>
      <body class="container"  onload="window.print()">` + innerContents + '</html>');
    popupWinindow.document.close();
  }

}
