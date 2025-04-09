import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../../global-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-packing-list-print',
  standalone: false,
  
  templateUrl: './packing-list-print.component.html',
  styleUrl: './packing-list-print.component.scss'
})
export class PackingListPrintComponent implements OnInit {
  plData: any;
  billing_seq_no: any;
  shipping_seq_no: any;
  billingAddress: any = {};
  shipingAddress: any = {};
  Sum: any = 0;
  poData:any
  loginUserData: any;
  dtl:any
  freeqtyarr:any=[]
  constructor(private globalService: GlobalServiceService, private spinner: NgxSpinnerService) {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.plData = JSON.parse(localStorage.getItem('packingListprint'));
    this.poData = JSON.parse(localStorage.getItem('poData'));
    console.log(this.plData);
    this.getVal();
    this.freeqtyarr=[]
    this.billing_seq_no = this.plData.data.json_hdr.bill_to_party_seq_no;
    this.shipping_seq_no = this.plData.data.json_hdr.ship_to_party_seq_no;
    this.dtl= this.plData.data.json_dtl
    for (let i of this.dtl) {
     
      if(i.free_qty!=0){
      this.freeqtyarr.push({"productname": i.subcategory + i.modelno , "free_qty":i.free_qty})
      }
    }
  }

  ngOnInit() {
    this.pl_printAddress();
  }

  pl_printAddress() {
    this.spinner.show();
    let input_id = "7.8";
    let param1 = this.billing_seq_no + "," + this.shipping_seq_no;
    console.log(param1);
    return this.globalService.getDatawithQueryParams1(input_id, param1).subscribe(data => {
      this.spinner.hide();
      console.log(data);
      this.billingAddress = data['Bill'];
      this.shipingAddress = data['SHIP'];
      console.log(this.shipingAddress,"this.shipingAddress")
    });
  }
  cartonqty:number=0
  totalfreeqty:number=0
  totalfreecartoons:number=0
  getVal() {
   
    for (let i of this.plData.data.json_dtl) {
      let qty = i.packing_qty ;
      this.Sum = this.Sum + qty;
      let npc= i.npc
      this.cartonqty=this.cartonqty+npc
      // let freeqty = i.free_qty
      // this.totalfreeqty = this.totalfreeqty + freeqty
      // let freecarton = i.free_qty / i.piecepercarton
      // this.totalfreecartoons = this.totalfreecartoons + freecarton
    }
    this.totalfreeqty =this.plData.data.json_hdr.totalqty-this.Sum
    this.totalfreecartoons=this.plData.data.json_hdr.totalcartoons-this.cartonqty

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
        p{
          color:#0000000 !important;
        }
        .hidebr{
          display:none;
        }
        .printbtm{
          margin-bottom:0 !important;
        }
        thead tr th{
          padding: 3px !important;
        }
        .printwrap{
           margin-left:2%;
          // margin-right:1%;
          position:relative;
          left:50%;
          width:70%;
        }
        @page {
          size: landscape;
          // margin:0 !important;
          scale:95 !important;
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

