import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalServiceService } from '../../global-service.service';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DataServiceService } from '../../data-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;

@Component({
  selector: 'app-goods-receipt-detail',
  standalone: false,
  templateUrl: './goods-receipt-detail.component.html',
  styleUrls: ['./goods-receipt-detail.component.scss']
})
export class GoodsReceiptDetailComponent implements OnInit {

  sub: any;
  packing_num: any;
  invoice_date: any;
  packing_date: any;
  company_code: any;
  grn_details: any;
  showbtn: boolean = true;
  grndata: any = {};
  todayDate = new Date();
  headerData: { "document_no": number; "document_date": string; "creditperiod": number; "source_user_id": number; "grn_type": string; "dest_user_id": number; "ship_to_company_code": string; "address1": string; "address2": string; "address3": string; "address4": string; "city": string; "inv_origin_company_code": string; "state": string; "paymentterms": number; "remarks1": string; "remarks2": string; "splinstr": string; "currency_code": string; "exchange_rate": number;"line_amount":number;"final_amount":string;"promo_amount":string;"code1":string ,"tcs":number,"tcs_percent":number};
  grnList: any = [];
  loginUserData: any;
  stockDataList: any = [];
  grnprint: any;
  temp: any = 0;
  Sum: any = 0;

  qty: any;
  grnGetData: any;
  shipingAddress: any = {};
  billingAddress: any = {};
  soldbyAddress: any = {};
  source_company_code: string;
  a_grn: boolean = true;
  finalAmtBeforeround:any;
  roundoffAmt:any;
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
  finalamount:any
  final_amount:any
  decimalfinalamount:any
  lineamount:any
  decimaltaxableamount:any
  constructor(private dat_s: DataServiceService, private router: Router, private route: ActivatedRoute, private globalService: GlobalServiceService, private dialog: MatDialog, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    if (this.loginUserData === null) {
      this.router.navigateByUrl('home');
    }
    this.grnGetData = JSON.parse(localStorage.getItem('grnData'));
    this.line_amount = (this.grnGetData.line_amount).toFixed(2);
    this.splitamount=this.line_amount.split('.')
    this.lineamount=JSON.parse(this.splitamount[0])
    this.decimaltaxableamount=this.splitamount[1]
    this.finalamount = (this.grnGetData.final_amount).toFixed(2);
    this.splitamount=this.finalamount.split('.')
    this.final_amount=JSON.parse(this.splitamount[0])
    this.decimalfinalamount=this.splitamount[1]
    // this.finalAmtBeforeround= this.grnGetData.line_amount+this.grnGetData.gst_amount-this.grnGetData.promo_amount;
    this.finalAmtBeforeround= this.grnGetData.line_amount+this.grnGetData.gst_amount+this.grnGetData.tcs;
    this.grnGetData.final_amount=Math.round(this.grnGetData.final_amount)
    this.roundoffAmt=(this.grnGetData.final_amount-this.finalAmtBeforeround)
    
    console.log("grn data", this.grnGetData);
    this.getAddresses();
    this.sub = this.route.params.subscribe(params => {

      let d = params['invoice_no'];
      let e = params['invoice_date'];
      let f = params['company_code'];
      let g = params['packing_date'];
      
      this.packing_num = atob(d);
      this.packing_date = atob(e);
      this.company_code = atob(f);
      this.packing_date = atob(g);
      this.getData();
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  };

  getAddresses() {
   
    this.spinner.show();
    let param1 = this.grnGetData.bill_to_party_seq_no + "," + this.grnGetData.ship_to_party_seq_no;
    this.globalService.getDatawithQueryParams1(7.8, param1).subscribe((data) => {
      this.spinner.hide();
      if (data) {
        localStorage.setItem('addresses', JSON.stringify(data));
        if (data['Bill'] != '') {
          this.billingAddress = data['Bill'];
          console.log("grnbill",this.billingAddress);
          
        }
        if (data['SHIP'] != '') {
          this.shipingAddress = data['Bill'];
          console.log("grnbill",this.shipingAddress);
        }
        this.soldbyAddress = this.loginUserData.company_address;
      }


    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  };

  getData() {
  
    this.spinner.show();
    if(this.loginUserData.designation == 'Marketing Manager'){
      this.source_company_code = this.company_code;
    }
    else
    if (this.loginUserData.user_type == 'Dealer'  ) {
      this.source_company_code = this.loginUserData.user_id + "@" + this.loginUserData.company_code;
    } else {
      this.source_company_code = this.loginUserData.company_code;
    }
    
    return this.globalService.getDatawithQueryParams4('3.9', '23', this.packing_num, this.packing_date, this.source_company_code).subscribe((resp) => {
      this.spinner.hide();
      this.grn_details = resp; console.log("Details-GRN Detail", this.grn_details);
      for (var i = 0; i < this.grn_details.length; i++) {
        if (!this.grn_details[i].refinvno) {
          this.grn_details[i].refinvno = 0;
        }
      }
      this.getVal();
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  }
  cartonqty:number=0
  totalsp_discountamount:number=0
  freeqtyarr:any=[]
  getVal() {
    this.freeqtyarr=[]
    this.temp=0
    this.cartonqty=0
    this.totalsp_discountamount=0
    for (let i of this.grn_details) {
      let qty = i.inv_qty + i.free_qty;
      this.temp = this.temp + qty;
      let val = i.net_value;
      this.Sum = this.Sum + val;
    //  console.log("final",this.Sum);
    let npc = (i.inv_qty+i.free_qty)/i.piecepercarton;
    this.cartonqty = this.cartonqty + npc;
    
    
    let sp_disc_amount = i.sp_dic_amount;
    this.totalsp_discountamount = this.totalsp_discountamount + sp_disc_amount;
    if(i.free_qty!=0){
    this.freeqtyarr.push({"productname": i.subcategory + i.modelno , "free_qty":i.free_qty})
    }
    if(i.gst_percentage=="18.00"){
      this.first=true
   
        let taxable=JSON.parse(i.tot_value)
        this.totalfirsttaxable=this.totalfirsttaxable + taxable
     
        let gst=JSON.parse(i.gst_amount)
        this.totalfirstgst=this.totalfirstgst + gst
     

    }
    if(i.gst_percentage=="5.00"){
      this.second=true
     
        let taxable=JSON.parse(i.tot_value)
        this.totalsecondtaxable=this.totalsecondtaxable + taxable
     
        let gst=JSON.parse(i.gst_amount)
        this.totalsecondgst=this.totalsecondgst + gst
        
       
      

    }
    if(i.gst_percentage=="12.00"){
      this.third=true
    
        let taxable=JSON.parse(i.tot_value)
        this.totalthirdtaxable=this.totalthirdtaxable + taxable
     
        let gst=JSON.parse(i.gst_amount)
        this.totalthirdgst=this.totalthirdgst + gst

       

    }
    if(i.gst_percentage=="28.00"){
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

    
  }

  Generate_GRN(data, grndata) {
  
    this.a_grn = false;
    // this.spinner.show();
    this.grndata.data = data;
    console.log(this.grndata.data.ship_to_company_code);
    if(this.grnGetData.promo_amount){
    this.headerData = {
      "document_no": 1,
      "document_date": formatDate(this.todayDate, 'yyyyMMdd', 'en-US'),
      "creditperiod": grndata.creditperiod,
      "source_user_id": 7,
      "grn_type": "DOM",
      "dest_user_id": 1,
      "ship_to_company_code": data[0].ship_to_company_code,
      "address1": "testst",
      "address2": "tesst",
      "address3": "",
      "address4": "",
      "city": "Dantewada",
      "inv_origin_company_code": data[0].inv_origin_company_code,
      "state": "Chhattisgarh",
      "paymentterms": grndata.paymentterms,
      "remarks1": grndata.remarks1,
      "remarks2": grndata.remarks2,
      "splinstr": grndata.splinstr,
     
      "currency_code": "INR",
      "exchange_rate": 0,
      "line_amount":this.grnGetData.line_amount,
      
      "final_amount":this.grnGetData.final_amount,
      "promo_amount":this.grnGetData.promo_amount,
      "code1":this.grnGetData.code1,
      "tcs":this.grnGetData.tcs,
      "tcs_percent":this.grnGetData.tcs_percent
    }
  }
  else{
    this.headerData = {
      "document_no": 1,
      "document_date": formatDate(this.todayDate, 'yyyyMMdd', 'en-US'),
      "creditperiod": grndata.creditperiod,
      "source_user_id": 7,
      "grn_type": "DOM",
      "dest_user_id": 1,
      "ship_to_company_code": data[0].ship_to_company_code,
      "address1": "testst",
      "address2": "tesst",
      "address3": "",
      "address4": "",
      "city": "Dantewada",
      "inv_origin_company_code": data[0].inv_origin_company_code,
      "state": "Chhattisgarh",
      "paymentterms": grndata.paymentterms,
      "remarks1": grndata.remarks1,
      "remarks2": grndata.remarks2,
      "splinstr": grndata.splinstr,
     
      "currency_code": "INR",
      "exchange_rate": 0,
      "line_amount":this.grnGetData.line_amount,
      
      "final_amount":this.grnGetData.line_amount,
      "promo_amount":"",
      "code1":"",
      "tcs":this.grnGetData.tcs,
      "tcs_percent":this.grnGetData.tcs_percent
    }
  }
    for (let i = 0; i < this.grn_details.length; i++) {
      console.log(this.grn_details[i].po_srl_no)
      //   const element = array[index];
      let json_dtl = {
        "document_no": 0,
        "document_date": formatDate(this.todayDate, 'yyyyMMdd', 'en-US'),
        "srl_no": this.grn_details[i].srl_no,
        "financial_year": this.grn_details[i].financial_year,
        "inv_date": this.grn_details[i].inv_date,
        "inv_no": this.grn_details[i].inv_no,
        "inv_qty": this.grn_details[i].inv_qty,
        "free_qty":this.grn_details[i].free_qty,
        "sp_discount":this.grn_details[i].sp_discount,
        "sp_dic_amount":this.grn_details[i].sp_dic_amount,
        "inv_srl_no": this.grn_details[i].inv_srl_no,
        "inv_type": "PO",
        "po_no": this.grn_details[i].po_no,
        "po_date": this.grn_details[i].po_date,
        "po_srl_no": this.grn_details[i].po_srl_no,
        "productid": this.grn_details[i].productid,
        "modelno": this.grn_details[i].modelno,
        "Material_recd_at_customer": this.grn_details[i].Material_recd_at_customer,
        "barcode_qty": 0,                          /* this.grn_details[i].barcode_qty*/
        "barcode_ship_pos_conf": 0,               /* this.grn_details[i].barcode_ship_pos_conf*/
        "grn_qty": 175,
        "mrp": this.grn_details[i].mrp,
        "net_price": this.grn_details[i].net_price,
        "tot_value": this.grn_details[i].tot_value,
        "gst": this.grn_details[i].gst_percentage,
        "gst_amount": this.grn_details[i].gst_amount,
        "discount1": this.grn_details[i].discount1,
        "discount2": this.grn_details[i].discount2,
        "discount3": this.grn_details[i].discount3,
        "discount_eff": this.grn_details[i].discount_eff,
        "net_value": this.grn_details[i].net_value,
        "sinv_no": this.grn_details[i].sinv_no,
        "refinvno":this.grn_details[i].refinvno
      }
      this.grnList.push(json_dtl);
    }
    let body = {
      "process_in": 'GRN', "operation_in": "INSERT", "draft_final_in": "FINAL", "document_no_out": "", "message_out": "",
      "json_hdr": this.headerData, "json_dtl": this.grnList
    }
 
    let methodName = "insert_update/"
    this.globalService.postData(body, methodName).subscribe((data) => {
      // this.spinner.hide();
      this.grnprint = data;
      localStorage.setItem('grnprintData', JSON.stringify(this.grnprint));
      if (this.loginUserData.designation == 'Branch Manager' || this.loginUserData.designation == 'Shopee Manager') {
        this.stockUpdate();
      }
      if (data['Message'] == "GRN Sucessfully inserted ") {
        $('#grnSuccessfulModal').modal('show');
      }
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  }

  confirm_grn() {
    this.router.navigateByUrl('/grn-print');
  };

  stockUpdate() {
    this.spinner.show();
    this.grn_details.forEach(data => {
      let stockData = {
        "productid": data.productid,
        "qty_in": data.inv_qty,
        "tot_amt_in": data.tot_value
      }
      this.stockDataList.push(stockData);
    });
    let body = {
      "period_in": formatDate(this.todayDate, 'yyyyMM', 'en-US'),
      "company_code_in": this.headerData.ship_to_company_code,
      "product_details": this.stockDataList,
      "storage_location_in": "WAREHOUSE1",
      "process_type_in": "GRN"
    };
    console.log(body);
    let methodName = "proc_stock/"
    this.globalService.postData(body, methodName).subscribe((data) => {
      this.spinner.hide();
      console.log(data);
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        //console.log(error);
      });
  };

}
