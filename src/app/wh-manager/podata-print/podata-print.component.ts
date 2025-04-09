import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServiceService } from '../../global-service.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-podata',
  standalone: false,
  templateUrl: './podata-print.component.html',
  styleUrls: ['./podata-print.component.scss']
})
export class PodataPrintComponent implements OnInit {
 
  PUrl:any
  poData:any=[];
  loginUserData: any;
  poPrintData:any=[];
  constructor(private route: Router, private globalService: GlobalServiceService, private dialog: MatDialog, private spinner: NgxSpinnerService) { }
  freeqtyarr:any=[]
  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.PUrl = window.location.href.substr(window.location.href.length - 5)
    this.poData = JSON.parse(localStorage.getItem('podetailData'));
    if(JSON.parse(localStorage.getItem('poPrintData'))){
      this.poPrintData=JSON.parse(localStorage.getItem('poPrintData'));
      this.freeqtyarr=[]
      for (let i of this.poPrintData) {
        
        if(i.free_qty!=0){
        this.freeqtyarr.push({"productname": i.subcategory + i.modelno , "free_qty":i.free_qty})
        }
      }
    }
    else{
      this.getpoData(this.poData)
    }
 
  
  }

  getpoData(item) {
    this.spinner.show();
    this.freeqtyarr=[]
    this.globalService.getDatawithMethodParams3('printlist/', this.loginUserData.company_code, "dtl", item.print).subscribe((data) => {
      this.spinner.hide();
      this.poPrintData = data;
      for (let i of this.poPrintData) {
       
        if(i.free_qty!=0){
        this.freeqtyarr.push({"productname": i.subcategory + i.modelno , "free_qty":i.free_qty})
        }
      }
      console.log(this.poPrintData,"print1")
    },
      error => {
        this.spinner.hide();
        // this.ngxSmartService.getModal('errorModal').open();
        
      this.dialog.open(ErrorModalComponent, {
        data: { errorModal:true }
      });
        // console.log(error);
      });
  };
  print(){
    // this.globalService.printReport('market/poprint/',"PO",this.poData.seq_no).subscribe((resp) => {
    //   console.log(resp);
     
    // },
    //   error => {
    //     this.ngxSmartService.getModal('errorModal').open();
    //   });
  }
  printPO() {
    this.print()
    let popupWinindow
    let innerContents = document.getElementById('printSectionId').innerHTML;
    popupWinindow = window.open('', '_blank', 'top=0,left=0,height=100%,width=100%');
    popupWinindow.document.open();
    popupWinindow.document.write(`<html><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><link rel="stylesheet"  href="styles.scss" />
      <style>
      p{margin:0px;font-size: 11px;}
      .spnwidth{
        width:200px;
        display:inline-block;
      }
      table thead th {background: gray;color:white;}
      @media print {
b{
  margin-bottom:10px;
}
        td{
          padding:3px;
          font-weight:bold;
          font-size:10px !important;
        }
        th{
          font-weight:bold;
          font-size:10px !important;
        }
        p{margin:0px;font-size: 11px;
        line-height:10px;
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
        
        .col-md-4 {
           width:40%;
          float: left;
        }
       
      tfoot td
        {
          border: none!important;
      }
      .noBorder th{
        border: none!important;
      }
       .noBorder td{
        border: none!important;
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
          font-size: 9px;
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
        font-size: 9px;
        padding: 4px !important;
    }
    .printTable thead tr th{
      font-size: 9px;
      padding: 2px !important;
  }
      }
      table{
        margin:20px 0;
      }
      @page {
        @bottom-right {
         content: counter(page) " of " counter(pages);
        }
        margin: 25mm 25mm 25mm 25mm; 
     }
      </style>
    
      </head>
      <body class="container"  onload="window.print()">` + innerContents + '</html>');
    popupWinindow.document.close();
  }

}
