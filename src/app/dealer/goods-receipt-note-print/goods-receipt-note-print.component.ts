import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../../global-service.service';
import { DataServiceService } from '../../data-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-goods-receipt-note-print',
  standalone: false,
  templateUrl: './goods-receipt-note-print.component.html',
  styleUrls: ['./goods-receipt-note-print.component.scss']
})
export class GoodsReceiptNotePrintComponent implements OnInit {
  billing_seq_no: any;
  shipping_seq_no: any;
  billingAddress: any;
  shipingAddress: any;
  grnData: any;
  addresses: any;
  grnPrintData: any;
  loginUserData: any;
  grand_total: any;
  total_value: any;
  grndata: any;
  finalAmtBeforeround: any;
  roundoffAmt: any;
  cartonqty:number=0
  totalqty:number=0
  totalsp_discountamount:number=0
  freeqtyarr:any=[]
  first:boolean=false
  totalfirsttaxable:number=0
  totalfirstgst:number=0
  second:boolean=false
  totalsecondtaxable:number=0
  totalsecondgst:number=0
  third:boolean=false
  totalthirdtaxable:number=0
  totalthirdgst:number=0
  fourth:boolean=false
  totalfourthtaxable:number=0
  totalfourthgst:number=0
  splitamount:any=[]
  decimalamount:any
  line_amount:any
  decimalsecondtaxableamount:any
  decimalsecondgstamount:number=0
  decimalfirsttaxableamount:any
  decimalfirstgstamount:number=0
  decimalthirdtaxableamount:any
  decimalthirdgstamount:number=0
  decimalfourthtaxableamount:any
  decimalfourthgstamount:number=0
  constructor(private dataservice: DataServiceService, private globalService: GlobalServiceService, private router: Router) {
  }
  grnqty: any = {}
  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    if (this.loginUserData === null) {
      this.router.navigateByUrl('home');
    }

    this.addresses = JSON.parse(localStorage.getItem('addresses'));
    this.grnPrintData = JSON.parse(localStorage.getItem('grnprintData'));
    this.grndata = JSON.parse(localStorage.getItem('grnData'));
    console.log(this.grnPrintData);
    this.grnPrintData.data.json_dtl.forEach(element => {
      this.grnqty[element.receiving_qty] = Math.round(element.receiving_qty);
    });
    this.billingAddress = this.addresses.Bill;
    this.shipingAddress = this.addresses.SHIP;
    // this.finalAmtBeforeround = this.grndata.line_amount + this.grndata.gst_amount - this.grndata.promo_amount;
    this.finalAmtBeforeround = this.grndata.line_amount + this.grndata.gst_amount + this.grndata.tcs;
    this.grndata.final_amount = Math.round(this.grndata.final_amount)
    this.roundoffAmt = (this.grndata.final_amount - this.finalAmtBeforeround)
    this.freeqtyarr=[]
    for (let i of this.grnPrintData.data.json_dtl) {
    let npc = ((JSON.parse(i.receiving_qty))+i.free_qty)/i.piecepercarton;
    this.cartonqty = this.cartonqty + npc;
    let qty=(JSON.parse(i.receiving_qty))+i.free_qty
    this.totalqty=this.totalqty+qty
    
    // let sp_disc_amount = i.sp_dic_amount;
    // this.totalsp_discountamount = this.totalsp_discountamount + sp_disc_amount;
    if(i.free_qty!=0){
    this.freeqtyarr.push({"productname": i.subcategory + i.modelno , "free_qty":i.free_qty})
    }
    if(i.gst=="18.00"){
      this.first=true
   
        let taxable=JSON.parse(i.tot_value)
        this.totalfirsttaxable=this.totalfirsttaxable + taxable
     
        let gst=JSON.parse(i.gst_amount)
        this.totalfirstgst=this.totalfirstgst + gst
     

    }
    if(i.gst=="5.00"){
      this.second=true
     
        let taxable=JSON.parse(i.tot_value)
        this.totalsecondtaxable=this.totalsecondtaxable + taxable
     
        let gst=JSON.parse(i.gst_amount)
        this.totalsecondgst=this.totalsecondgst + gst
        
       
      

    }
    if(i.gst=="12.00"){
      this.third=true
    
        let taxable=JSON.parse(i.tot_value)
        this.totalthirdtaxable=this.totalthirdtaxable + taxable
     
        let gst=JSON.parse(i.gst_amount)
        this.totalthirdgst=this.totalthirdgst + gst

       

    }
    if(i.gst=="28.00"){
      this.fourth=true
     
        let taxable=JSON.parse(i.tot_value)
        this.totalfourthtaxable=this.totalfourthtaxable + taxable
     
        let gst=JSON.parse(i.gst_amount)
        this.totalfourthgst=this.totalfourthgst + gst

       
     

    }
  }

if(this.totalfirsttaxable){
  this.line_amount = this.totalfirsttaxable.toFixed(2);
  this.splitamount=this.line_amount.split('.')
  this.totalfirsttaxable=JSON.parse(this.splitamount[0])
  this.decimalfirsttaxableamount=this.splitamount[1]

if(this.loginUserData.company_address.state_code == this.billingAddress.state_code ){
  this.line_amount = (this.totalfirstgst/2).toFixed(2);
  this.splitamount=this.line_amount.split('.')
  this.totalfirstgst=JSON.parse(this.splitamount[0])
  this.decimalfirstgstamount=parseInt(this.splitamount[1])

}
if(this.loginUserData.company_address.state_code != this.billingAddress.state_code ){
  this.line_amount = (this.totalfirstgst).toFixed(2);
  this.splitamount=this.line_amount.split('.')
  this.totalfirstgst=JSON.parse(this.splitamount[0])
  this.decimalfirstgstamount=parseInt(this.splitamount[1])
console.log(this.decimalfirstgstamount,"this.decimalfirstgstamount")
}
}

if(this.totalsecondtaxable){
this.line_amount = this.totalsecondtaxable.toFixed(2);
this.splitamount=this.line_amount.split('.')
this.totalsecondtaxable=JSON.parse(this.splitamount[0])
this.decimalsecondtaxableamount=this.splitamount[1]

if(this.loginUserData.company_address.state_code == this.billingAddress.state_code ){
this.line_amount = (this.totalsecondgst/2).toFixed(2);
this.splitamount=this.line_amount.split('.')
this.totalsecondgst=JSON.parse(this.splitamount[0])
this.decimalsecondgstamount=parseInt(this.splitamount[1])
}
if(this.loginUserData.company_address.state_code != this.billingAddress.state_code ){
this.line_amount = (this.totalsecondgst).toFixed(2);
this.splitamount=this.line_amount.split('.')
this.totalsecondgst=JSON.parse(this.splitamount[0])
this.decimalsecondgstamount=parseInt(this.splitamount[1])
}
}
if(this.totalthirdtaxable){
this.line_amount = this.totalthirdtaxable.toFixed(2);
this.splitamount=this.line_amount.split('.')
this.totalthirdtaxable=JSON.parse(this.splitamount[0])
this.decimalthirdtaxableamount=this.splitamount[1]

if(this.loginUserData.company_address.state_code == this.billingAddress.state_code ){
this.line_amount = (this.totalthirdgst/2).toFixed(2);
this.splitamount=this.line_amount.split('.')
this.totalthirdgst=JSON.parse(this.splitamount[0])
this.decimalthirdgstamount=parseInt(this.splitamount[1])
}
if(this.loginUserData.company_address.state_code != this.billingAddress.state_code ){
this.line_amount = (this.totalthirdgst).toFixed(2);
this.splitamount=this.line_amount.split('.')
this.totalthirdgst=JSON.parse(this.splitamount[0])
this.decimalthirdgstamount=parseInt(this.splitamount[1])
}
}
if(this.totalfourthtaxable){
this.line_amount = this.totalfourthtaxable.toFixed(2);
this.splitamount=this.line_amount.split('.')
this.totalfourthtaxable=JSON.parse(this.splitamount[0])
this.decimalfourthtaxableamount=this.splitamount[1]

if(this.loginUserData.company_address.state_code == this.billingAddress.state_code ){
this.line_amount = (this.totalfourthgst/2).toFixed(2);
this.splitamount=this.line_amount.split('.')
this.totalfourthgst=JSON.parse(this.splitamount[0])
this.decimalfourthgstamount=parseInt(this.splitamount[1])
}

if(this.loginUserData.company_address.state_code != this.billingAddress.state_code ){
this.line_amount = (this.totalfourthgst).toFixed(2);
this.splitamount=this.line_amount.split('.')
this.totalfourthgst=JSON.parse(this.splitamount[0])
this.decimalfourthgstamount=parseInt(this.splitamount[1])
}

  }
    this.grand_total = this.grnPrintData.data.json_dtl.filter((item) => item.final_amount)
      .map((item) => +item.final_amount)
      .reduce((sum, current) => sum + current);

    this.total_value = this.grnPrintData.data.json_dtl.filter((item) => item.tot_value)
      .map((item) => +item.tot_value)
      .reduce((sum, current) => sum + current);

    //   console.log("t_val", this.grnPrintData.data.json_dtl.tot_value);


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
