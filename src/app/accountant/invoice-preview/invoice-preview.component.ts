import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServiceService } from '../../global-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
@Component({
  selector: 'app-invoice-preview',
  standalone: false,
  templateUrl: './invoice-preview.component.html',
  styleUrls: ['./invoice-preview.component.scss']
})
export class InvoicePreviewComponent implements OnInit {
  invoiceData: any = {};
  inv_Address: any = {};
  billingAddress: any = {};
  loginUserData: any;
  shipingAddress: any = {};
  inv_dtl: any = [];
  grand_total: any;
  branchAddress: any;
  taxAmount: any;
  invheader:any
  proformaData: any;
  invoiceListData: any;
  invoiceModel: any = {};
  constructor(private route: Router,private globalService: GlobalServiceService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.proformaData = JSON.parse(localStorage.getItem('proformaData'));
    if (this.loginUserData === null) {
      this.route.navigateByUrl('home');
    }
this.getpoData()
  this.inv_printAddress()
   
    this.branchAddress = this.loginUserData.company_address;
   
 
  }
  getpoData() {
    // this.spinner.show();
    this.globalService.getDatawithQueryParams5(3.9, 21, this.proformaData.packing_l_no, this.proformaData.packing_l_date, this.loginUserData.company_code, this.proformaData.financial_year).subscribe((data) => {
      // this.spinner.hide();
      this.invoiceListData = data;
      this.invoiceListData.forEach(element => {
        this.invoiceModel[element.po_srl_no] = element.packing_qty+element.free_qty;
      });
      this.grand_total = this.invoiceListData.filter((item) => item.tot_value)
      .map((item) => +item.tot_value)
      .reduce((sum, current) => sum + current);

    this.taxAmount = this.invoiceListData.filter((item) => item.gst_amount)
      .map((item) => +item.gst_amount)
      .reduce((sum, current) => sum + current);
      console.log("inv_data",this.invoiceListData);

    },
      error => {
      
  this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      });
  };
  inv_printAddress() {
    let input_id = "7.8";
    let param1 = this.proformaData.bill_to_party_seq_no + "," + this.proformaData.ship_to_party_seq_no;
    return this.globalService.getDatawithQueryParams1(input_id, param1).subscribe(data => {
      this.billingAddress = data['Bill'];
      this.shipingAddress = data['SHIP'];
      
    });
  };
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
