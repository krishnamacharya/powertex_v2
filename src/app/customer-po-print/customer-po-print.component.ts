import { Component, OnInit } from '@angular/core';
import { DataServiceService } from './../data-service.service';
import { GlobalServiceService } from './../global-service.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-customer-po-print',
  standalone: false,
  templateUrl: './customer-po-print.component.html',
  styleUrls: ['./customer-po-print.component.scss']
})
export class CustomerPoPrintComponent implements OnInit {
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
  checkoutModal: any;
  headerData: { document_no: number; dest_company_code: string; source_company_code: string; source_user_id: any; inv_type: string; shipment_point: number; payment_terms: any; currency_code: string; exchange_rate: number; spl_instr: string; transaction_id: any; };
  txnid: any;
  routeParams: number;
  itemsList: any[];
  carItems: any;
  buynowItem: any;
  grandtotal: any;
  newAddress: boolean;
  edipShipAddress: any;

  constructor(private dataservice: DataServiceService, private router: Router, private globalService: GlobalServiceService, private spinner: NgxSpinnerService) {
    // this.poData = this.dataservice.getpodata();

    //console.log(this.billing_seq_no);
  }


  /* gotoPayment() {
    this.headerData = {
      document_no: 1,
    
      dest_company_code: 'Online',
      source_company_code: this.loginUserData.user_id + '@Online',
      source_user_id: this.loginUserData.user_id,
      inv_type: 'Online',
      shipment_point: 0,
      payment_terms: this.checkoutModal.payment,
      currency_code: "",
      exchange_rate: 0.00,
      spl_instr: "",
      transaction_id: this.txnid
    };
    if (this.routeParams == 1) {
      this.itemsList = [];
      localStorage.setItem('BuyNow', '0');
      this.carItems.forEach(data => {
        var json_dtl =
        {
         
          "net_price": data.enduserprice,
          "mrp": data.mrp,
          "piecepercarton": data.qty,
          "discount_eff": data.discount_a,
          "productid": data.productid,
        
          "created_user_id": this.loginUserData.user_id,
          "document_no": 1,
          "qty": data.qty,
          "tot_value": data.total
        }
        this.itemsList.push(json_dtl);
      });
    } else {
      this.itemsList = [];
      localStorage.setItem('BuyNow', '1');
      var json_dtl =
      {
        "net_price": this.buynowItem.net_price,
        "mrp": this.buynowItem.mrp,
        "piecepercarton": this.buynowItem.qty,
        "discount_eff": this.buynowItem.discount,
        "productid": this.buynowItem.productid,
        
        "created_user_id": this.loginUserData.user_id,
        "document_no": 1,
        "qty": this.buynowItem.qty,
        "tot_value": this.grandtotal
      }
      this.itemsList.push(json_dtl);
    }


    let body = {
      "process_in": 'PO', "operation_in": "INSERT", "draft_final_in": "FINAL", "document_no_out": "", "message_out": "",
      "json_hdr": this.headerData, "json_dtl": this.itemsList
    }
    
    localStorage.setItem('onlineCheckoutData', JSON.stringify(body));
    
    console.log(body);
    if (this.checkoutModal.payment == 'COD') {
  
    }

  }; */

  onlineCheckoutData:any=[]
  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    // this.onlineCheckoutData = JSON.parse(localStorage.getItem('onlineCheckoutData'))
    this.poData = JSON.parse(localStorage.getItem('poprintData'))
       if (this.loginUserData === null) {

      this.router.navigateByUrl('home');
    }
    
    this.poData = JSON.parse(localStorage.getItem('poprintData')); 
 //   console.log("total data", this.poData);
 this.dtl_data = this.poData.data.json_dtl;
  //  console.log("dtl_data data", this.dtl_data);
    this.billing_seq_no = this.poData.data.json_hdr.bill_to_party_seq_no;
    this.shipping_seq_no = this.poData.data.json_hdr.ship_to_party_seq_no;
    this.po_printAddress();

    this.grand_total = this.dtl_data.filter((item) => item.tot_value)
      .map((item) => +item.tot_value)
      .reduce((sum, current) => sum + current);

    this.taxAmount = this.dtl_data.filter((item) => item.gst_amount)
      .map((item) => +item.gst_amount)
      .reduce((sum, current) => sum + current);
  
  }

    deleteAddress(seq_no: any) {
    throw new Error("Method not implemented.");
  }
  ;
  param1:string
  Address:any;
  po_printAddress() {
   
    let input_id = "7.8";
     let param = this.billing_seq_no + "," + this.shipping_seq_no;
     this.param1= param
    return this.globalService.getDatawithQueryParams1(input_id,  this.param1).subscribe((resp)=> {
      
      this.Address = resp;
      // this.billingAddress = data.Bill;
     this.shipingAddress = this.Address.SHIP;
     this.spinner.hide();
     console.log('this.Address',this.Address)
      console.log('this.shipingAddress',this.shipingAddress)
    });
  }

  printPO() {
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

