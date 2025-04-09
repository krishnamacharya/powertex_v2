import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-print2',
  standalone: false,
  templateUrl: './invoice-print2.component.html',
  styleUrls: ['./invoice-print2.component.scss']
})
export class InvoicePrint2Component implements OnInit {
  invoiceData: any;
  getinvoicelist5: any={};
  inv_Address: any = {};
  billingAddress: any = {};
  loginUserData: any;
  shipingAddress: any = {};
  inv_dtl: any = [];
  grand_total: any;
  branchAddress: any;
  taxAmount: any;
  invheader:any
  bankdetails:any
  invoiceaddress:any
  finalAmtBeforeround:any
  roundoffAmt:any
  cartonqty:number=0
  totalqty:number=0
  totalsp_discountamount:number=0
  PUrl: string;
  invoiceData1: any = [];
  constructor(private route: Router) { }
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
  decimalgstamount:any
  gst_amount:any
  ngOnInit() {
    this.PUrl = window.location.href.substr(window.location.href.length - 5)
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.invoiceData = JSON.parse(localStorage.getItem('getinvoicelist5'));
    this.invoiceData1 = this.invoiceData.data.json_dtl
    // console.log("Admin Oustanding",this.invoiceData.data);

    this.invoiceaddress=this.invoiceData.data.address
    this.invheader=this.invoiceData.data.json_hdr

    this.line_amount = JSON.parse(this.invheader.line_amount).toFixed(2);
    this.splitamount=this.line_amount.split('.')
    this.invheader.line_amount=JSON.parse(this.splitamount[0])
    this.decimalamount=this.splitamount[1]
   

    this.bankdetails=this.invoiceData.data.bank
    this.inv_Address = JSON.parse(localStorage.getItem('Inv_Address'));
    // this.finalAmtBeforeround= this.invheader.final_amount;
    this.invheader.final_amount=Math.round(this.invheader.final_amount)

    this.roundoffAmt= this.invheader.roundvalue
    this.freeqtyarr=[]
    //  this.billingAddress = this.inv_Address.Bill;
    if(this.inv_Address){
    this.shipingAddress = this.inv_Address.Bill;
    }
    if((this.invoiceaddress && this.invoiceaddress.statecode == this.invheader.bill_to_party.statecode) ||  (!this.invoiceaddress && this.loginUserData.company_address.state_code == this.shipingAddress.state_code) ){
      this.gst_amount = (JSON.parse(this.invheader.gst_amount)/2).toFixed(2);
      this.splitamount=this.gst_amount.split('.')
      this.invheader.gst_amount=JSON.parse(this.splitamount[0])
      this.decimalgstamount=this.splitamount[1]
      console.log(this.invheader.gst_amount,"gstamount")
      }
  
      if((this.invoiceaddress && this.invoiceaddress.statecode != this.invheader.bill_to_party.statecode) ||  (!this.invoiceaddress && this.loginUserData.company_address.state_code != this.shipingAddress.state_code) ){
        this.gst_amount = JSON.parse(this.invheader.gst_amount).toFixed(2);
        this.splitamount=this.gst_amount.split('.')
        this.invheader.gst_amount=JSON.parse(this.splitamount[0])
        this.decimalgstamount=this.splitamount[1]
        }
    this.branchAddress = this.loginUserData.company_address;
   
    this.inv_dtl = this.invoiceData.data.json_dtl;
    for (let i of this.inv_dtl) {
     
      let npc = i.npc;
      this.cartonqty = this.cartonqty + npc;
      let qty=i.inv_qty+i.free_qty
      this.totalqty=this.totalqty+qty
     
      let sp_disc_amount = i.sp_dic_amount;
      this.totalsp_discountamount = this.totalsp_discountamount + sp_disc_amount;
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

  if((this.invoiceaddress && this.invoiceaddress.statecode == this.invheader.bill_to_party.statecode) || (!this.invoiceaddress && this.loginUserData.company_address.state_code == this.shipingAddress.state_code) ){
    console.log(this.totalfirstgst,"decimalfirstgst")
    this.line_amount = (this.totalfirstgst/2).toFixed(2);
      this.splitamount=this.line_amount.split('.')
      this.totalfirstgst=JSON.parse(this.splitamount[0])
      this.decimalfirstgstamount=parseInt(this.splitamount[1])
      console.log(this.totalfirstgst,"decimalfirstgst")

  }
  
  if((this.invoiceaddress && this.invoiceaddress.statecode != this.invheader.bill_to_party.statecode) || (!this.invoiceaddress && this.loginUserData.company_address.state_code != this.shipingAddress.state_code) ){
      this.line_amount = (this.totalfirstgst).toFixed(2);
      this.splitamount=this.line_amount.split('.')
      this.totalfirstgst=JSON.parse(this.splitamount[0])
      this.decimalfirstgstamount=parseInt(this.splitamount[1])
console.log(this.totalfirstgst,"this.decimalfirstgstamount")
  }
   }

   if(this.totalsecondtaxable){
this.line_amount = this.totalsecondtaxable.toFixed(2);
this.splitamount=this.line_amount.split('.')
this.totalsecondtaxable=JSON.parse(this.splitamount[0])
this.decimalsecondtaxableamount=this.splitamount[1]

if((this.invoiceaddress && this.invoiceaddress.statecode == this.invheader.bill_to_party.statecode) || (!this.invoiceaddress && this.loginUserData.company_address.state_code == this.shipingAddress.state_code) ){
this.line_amount = (this.totalsecondgst/2).toFixed(2);
this.splitamount=this.line_amount.split('.')
this.totalsecondgst=JSON.parse(this.splitamount[0])
this.decimalsecondgstamount=parseInt(this.splitamount[1])
}
if((this.invoiceaddress && this.invoiceaddress.statecode != this.invheader.bill_to_party.statecode) || (!this.invoiceaddress && this.loginUserData.company_address.state_code != this.shipingAddress.state_code) ){
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

if((this.invoiceaddress && this.invoiceaddress.statecode == this.invheader.bill_to_party.statecode) || (!this.invoiceaddress && this.loginUserData.company_address.state_code == this.shipingAddress.state_code) ){
  this.line_amount = (this.totalthirdgst/2).toFixed(2);
this.splitamount=this.line_amount.split('.')
this.totalthirdgst=JSON.parse(this.splitamount[0])
this.decimalthirdgstamount=parseInt(this.splitamount[1])
}
if((this.invoiceaddress && this.invoiceaddress.statecode != this.invheader.bill_to_party.statecode) || (!this.invoiceaddress && this.loginUserData.company_address.state_code != this.shipingAddress.state_code) ){
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

if((this.invoiceaddress && this.invoiceaddress.statecode == this.invheader.bill_to_party.statecode) || (!this.invoiceaddress && this.loginUserData.company_address.state_code == this.shipingAddress.state_code) ){
this.line_amount = (this.totalfourthgst/2).toFixed(2);
this.splitamount=this.line_amount.split('.')
this.totalfourthgst=JSON.parse(this.splitamount[0])
this.decimalfourthgstamount=parseInt(this.splitamount[1])
}

if((this.invoiceaddress && this.invoiceaddress.statecode != this.invheader.bill_to_party.statecode) || (!this.invoiceaddress && this.loginUserData.company_address.state_code != this.shipingAddress.state_code) ){
  this.line_amount = (this.totalfourthgst).toFixed(2);
  this.splitamount=this.line_amount.split('.')
  this.totalfourthgst=JSON.parse(this.splitamount[0])
  this.decimalfourthgstamount=parseInt(this.splitamount[1])
  }
}


    console.log(this.totalfirsttaxable,"totaltaxable")
    console.log( this.totalqty,"totalqty")
    this.grand_total = this.inv_dtl.filter((item) => item.tot_value)
      .map((item) => +item.tot_value)
      .reduce((sum, current) => sum + current);

    this.taxAmount = this.inv_dtl.filter((item) => item.gst_amount)
      .map((item) => +item.gst_amount)
      .reduce((sum, current) => sum + current);
  }

  printInvoice() {
    let popupWinindow
    let innerContents = document.getElementById('printSectionId').innerHTML;
    popupWinindow = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWinindow.document.open();
    popupWinindow.document.write(`<html><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><link rel="stylesheet"  href="styles.scss" />
      <style>
      th{
        font-size: 10px;color:#000000;padding:3px !important;border:none !important;
    }
    .thbg th{
      background-color: rgb(209, 202, 202) !important;
  }
    .invaddress{
      text-align: center;font-size: 18px;font-weight: 700; margin-top: 3px;margin-bottom: 1px;
    }
    .printTable{
      margin-bottom: 10px !important;table-layout: initial;
    }
    .shippingaddr{
      line-height: 1.9;float:left;padding-left: 4px !important;
      h5{
        margin-top: 7px;margin-bottom: 1px;font-size:12px;font-weight: 600;line-height: 1;
    }
    }
    .refinvnodiv{
      line-height: 1;float:right;margin-top:1px;padding-right: 25px;
    }
      p{margin:0px;font-size: 12px;}
      table thead th {background: gray;color:white;}
      @media print {
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
        .printwrap{
          // margin-left:40%;
          // margin-right:1%;
          position:relative;
          left:48%;
          width:70%;
        }
        @page {
          size: landscape;
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
          padding: 0 10px;
          // border: 1px dashed #000000;
      }
      .company_address{
          font-weight: 700;
          font-size: 12px;
          padding-right: 5px;
          color: #232f3e;
          .estimation{
            margin-top: 3px;margin-bottom: 3px;margin-top: 3px;
            }
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
      </style>
      </head>
      <body class="container"  onload="window.print()">` + innerContents + '</html>');
    popupWinindow.document.close();
  }


}

