import { Component, OnInit } from '@angular/core';

import { DataServiceService } from '../../data-service.service';
import { GlobalServiceService } from '../../global-service.service'
import 'bootstrap';
import { DropEvent } from 'angular-draggable-droppable';
import { ToasterService } from '../../toastr-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-outstanding-positiondetail',
  standalone: false,
  templateUrl: './outstanding-positiondetail.component.html',
  styleUrls: ['./outstanding-positiondetail.component.scss']
})
export class OutstandingPositiondetailComponent implements OnInit {
  panelOpenState = false;
  page: any = 1
  Page: any = 1;
  Pages: any = 1

  POhidden: boolean = true;

  DOhidden: boolean = false;
  GRNhidden: boolean = false;
  REChidden: boolean = false;
  loginUserData: any
  paymentstatus: any
  adjustamount: boolean = false;
searchText: string;
  constructor(private toasterService: ToasterService, private spinner: NgxSpinnerService, private service: DataServiceService, private globalservice: GlobalServiceService, private dialog: MatDialog) { }
  abc: any
  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    // this.getallchequedetails()
    this.invoice()
    this.checkedvalue = []

  }
  do() {
    this.checkedvalue = []
    this.POhidden = false;
    this.DOhidden = true;
    this.GRNhidden = false;
    this.REChidden = false;
    this.dealerdata = true
    this.invoicedetails = false
  }
  po() {
    this.checkedvalue = []
    this.POhidden = true;
    this.DOhidden = false;
    this.GRNhidden = false;
    this.REChidden = false;
    this.dealerdata = true
    this.invoicedetails = false
  }
  methodname1: any
  param: any
  allchequedetails: any
  rec() {
    this.checkedvalue = []
    this.REChidden = true
    this.POhidden = false;
    this.DOhidden = false;
    this.GRNhidden = false;
    this.dealerdata = true
    this.invoicedetails = false
    this.getallchequedetails()
    this.paymentstatus = this.service.getOnLoadServices('62.3');
  }
  grn() {
    this.POhidden = false;
    this.DOhidden = false;
    this.GRNhidden = true;
    this.REChidden = false;
    this.dealerdata = true
    this.checkedvalue = []
    this.invoicedetails = false
    this.invoice()
  }

  getallchequedetails() {

    this.methodname1 = "cheque/"
    let param1 = this.loginUserData.company_code
    this.globalservice.getcheckdata(this.methodname1, param1).subscribe((resp1) => {
      this.allchequedetails = resp1;
    });
  }
  updatedstatus: any
  methodName: any
  updatechequestatus: any
  newstatus: any
  cdata: any;
  cheqstatus: any = null;
  cdataamount: number;
  onChange(cd) {
    this.cdata = [];
    this.cheqstatus = cd.status;
    this.cdata = cd
    this.cdataamount = this.cdata.amount;
    this.cdataamount = + this.cdata.amount;
    this.amountafteradjusted = this.cdataamount;
    this.param2 = cd.giver_company_code;
    console.log("cdataamount", this.cdataamount)
    console.log("cdataamounttt", this.cdata.amount)

    if (this.cdata.status == "1") {
      this.invoice();
    }
    else {
      $("#paymentstatus").modal('show');
      this.invdetail = [];


    }
  }
  statusupdate(cdata) {

    this.methodName = "api/ChequeTransactionViewset/" + cdata.transid + "/"
    this.globalservice.updateData(cdata, this.methodName).subscribe((resp) => {

      this.updatechequestatus = resp
      this.getallchequedetails();
      if (this.cdata.status == 1) {
        this.postdropdataa();

      }
    })
  }

  statuschange() {
    this.getallchequedetails()

  }
  getinvdata: any = [];
  count: any
  detail: any
  count2: any
  outstandingdetails: any = []
  invoice() {


    let param1 = this.loginUserData.company_code;
    this.spinner.show();
    // if(this.outstandingdetails.length==0){
    this.service.getOnLoadServicesparam1(1000.01, param1).subscribe((resp) => {
      this.spinner.hide();
      this.outstandingdetails = resp;


      // console.log( this.getinvdata," this.getinvdata")
      if (this.outstandingdetails) {
        this.service.outstandingdetails.next(resp);
        this.getinvdata = this.outstandingdetails.outstanding_detail
        console.log(this.outstandingdetails, " this.outstandingdetails")
        for (var i = 0; i < this.getinvdata.length; i++) {
          if (this.param2 == this.getinvdata[i].company_code) {
            if (this.getinvdata[i].detail) {

              this.invdetail = this.getinvdata[i].detail;

              console.log(this.invdetail.length, " this.invdetail")
              if (this.cheqstatus == "1") {
                this.adustinvAmount(this.cdataamount)
                this.spinner.hide();


              }

            }
            else {
              this.invdetail = ""
              console.log(this.invdetail.length, " this.invdetail")
               this.spinner.hide();

            }
            break;
          }
          else {
            this.spinner.hide();
            this.invdetail = ""
            console.log(this.invdetail.length, " this.invdetail")
          }
        }
        this.spinner.hide();


      }
      else {
        this.spinner.hide();
        this.getinvdata = ''
      }

      this.spinner.hide();

    });


  }
  detail1: any = []
  sub_detail: any = []
  productdetail: any = []
  getinvoiceproducts(seqno) {
    this.detail1 = []
    this.productdetail = []
    this.globalservice.printReport('market/poprint/', 'Inv', seqno).subscribe((resp) => {
      console.log(resp);
      this.detail1 = resp
      this.productdetail.push(this.detail1.data)
      this.sub_detail = this.detail1.data.json_dtl
      console.log(this.productdetail, "subdetail")
    })
  }
  checkedvalue: any = []
  event: any
  checked: any
  checkValuee(event: any, inv_no) {
    this.checked = event.target.checked;
    // console.log(this.checked,inv_no);
    if (this.checked == true) {
      this.checkedvalue.push(inv_no)
      console.log(this.checkedvalue)
    }
    else {
      for (var i = 0; i < this.checkedvalue.length; i++) {
        if (this.checked == false && this.checkedvalue[i] == inv_no) {

          this.checkedvalue.splice(i, 1)

          break;
        }
      }
      console.log(this.checkedvalue)
    }

  }

  droppedData: any;
  balance: any
  received: any = []
  status: any = "pending"
  payment_terms: any
  body: any
  invoicedata: any
  invoicenum: any
  methodname: any;
  updatedata: any
  createddate: any
  invbalance: any
  checkbalanceamount: any
  balanceamount: any = []
  dropData: any
  checkbal: any
  onDrop({ dropData }: DropEvent<any>): void {
    if (this.checkedvalue.length == 0) {
      $("#alertpopup").modal('show');
    }
    else {
      $("#adjustpayment").modal('show');
      this.dropData = dropData
    }
  }
  adjustpayment(dropData) {

    let stringToSplit = dropData;
    let x = stringToSplit.split(",");
    this.droppedData1 = x[0]
    dropData = x[1]

    for (var k = 0; k < this.checkedvalue.length; k++) {
      if (dropData != 0) {
        for (var i = 0; i < this.invdetail.length; i++) {


          if (this.checkedvalue[k] == this.invdetail[i].inv_no) {

            if (dropData >= this.invdetail[i].due_amount) {

              this.droppedData = this.invdetail[i].due_amount;

              this.received.push(this.droppedData)
              this.balance = dropData - this.invdetail[i].due_amount;
              this.invbalance = this.invdetail[i].due_amount - this.received[k];


              this.balanceamount.push(parseFloat(this.invbalance).toFixed(2))
              console.log(this.balanceamount, "balanceamount")

              dropData = parseFloat(this.balance).toFixed(2)
              console.log(this.received, "this.received")
            }


            else if (dropData < this.invdetail[i].due_amount && dropData != 0) {

              this.droppedData = dropData
              this.received.push(this.droppedData)
              this.balance = dropData - dropData;
              dropData = parseFloat(this.balance).toFixed(2)

              this.invbalance = this.invdetail[i].due_amount - this.received[k];


              this.balanceamount.push(parseFloat(this.invbalance).toFixed(2))
              console.log(this.received, "this.received")
              console.log(this.balanceamount, "this.balanceamount")
            }

            this.createddate = new Date()

            for (var j = i; j < this.invdetail.length; j++) {
              this.body = { "inv_seq_no": this.invdetail[j].inv_seq_no, "total_amount": this.invdetail[j].line_amount, "adj_amount": this.droppedData, "balance_amount": this.balanceamount[k], "remaining_amount": this.invdetail[j].due_amount, "adv_no": this.droppedData1, "created_date": this.createddate }

              this.array.push(this.body)
              break;
            }

            break;
          }

        }


      }

    }
    this.methodname = "InvCheqDtl/"
    this.postdropdata()


  }
  array = []
  postdropdata() {
    this.globalservice.postData(this.array, this.methodname).subscribe((resp) => {

      this.toasterService.success("Amount Adjusted Successfully")
      this.updatedata = resp;

      this.invoice()
      this.dealercheques(this.param1, this.param2)
      this.array = []
      this.received = []
      this.balanceamount = []

      this.droppedData1 = ""
      this.checkedvalue = []

    },
      error => {

        // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal:true }
        });

      }
    )
  }


  droppedData1: any


  invoicedetails: boolean = false
  checkdetails: any
  invdetail: any
  param1: any
  param2: any
  data: any
  edit1(pi) {

    $("#successModal1").modal('show');
    this.data = pi
  }
  amount: any = []
  edit(data) {
    this.dealerdata = false
    this.invoicedetails = true
    this.invdetail = data.detail
    this.param1 = this.loginUserData.company_code
    this.param2 = data.company_code


    this.dealercheques(this.param1, this.param2)



  }
  dealercheques(param1, param2) {

    this.globalservice.getDatawithQueryParams2(1000.02, param1, param2).subscribe((data) => {
      this.checkdetails = data;

    }
    )
  }

  dealerdata: boolean = true
  alloutstanding() {
    this.dealerdata = true
    this.invoicedetails = false
    this.checkedvalue = []
  }
  invoicepayment: any
  getinvoicepayment(invoice_seqno) {
    $('#viewinvoicepayment').modal('show');
    this.globalservice.getDatawithQueryParams1(122, invoice_seqno).subscribe((data) => {
      this.invoicepayment = data;

    })

  }

  printpayment() {
    let popupWinindow
    let innerContents = document.getElementById('invoicepayment').innerHTML;
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
  printdata: boolean = false
  printoutstanding() {
    let popupWinindow
    let innerContents = document.getElementById('outstandprint').innerHTML;

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
      .outstanding{
        color:#d9534f
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
  // ================new changes===================

  amountt: number;
  amounttt: number;
  adjustedarray: any = [];
  amountafteradjusted: any;
  adustinvAmount(amount) {
    amount = parseInt(amount);
    this.amountt = amount;
    this.amounttt = amount;
    this.amountafteradjusted = amount;
    console.log("amount", amount)
    console.log("amountt", this.amountt)
    console.log("erfrerrere", this.adjustedarray)

    this.adjustedarray = [];
    if (this.Adjusttype != 'Manual') {
      for (var i = 0; i < this.invdetail.length; i++) {
        this.invdetail[i].balanceamount = null;
        this.invdetail[i].adjustedAmount = null;
      }
      if (amount && this.invdetail.length > 0) {
        for (var i = 0; i < this.invdetail.length; i++) {
          if (amount > 0 && amount > this.invdetail[i].due_amount) {
            this.invdetail[i].adjustedAmount = this.invdetail[i].due_amount;
            this.invdetail[i].balanceamount = this.invdetail[i].due_amount - this.invdetail[i].adjustedAmount;
            amount = amount - this.invdetail[i].due_amount;

            this.adjustedarray.push(this.invdetail[i])

          }
          else if (amount > 0 && amount < this.invdetail[i].due_amount) {
            this.invdetail[i].adjustedAmount = amount;
            this.invdetail[i].balanceamount = this.invdetail[i].due_amount - amount;
            amount = amount - this.invdetail[i].due_amount;
            this.adjustedarray.push(this.invdetail[i])

          }
        }
        this.amountafteradjusted = amount;
      }
      // if(amount<=0){
      //       this.toasterService.info("given Amount is completed ")
      // }
      console.log('this.adjustedarray', this.adjustedarray)
    }
  }

  checkValue(i, ev) {
    if (ev.target.checked == true) {
      if (this.amountt > 0 && this.amountt >= this.invdetail[i].due_amount) {
        this.invdetail[i].adjustedAmount = this.invdetail[i].due_amount;
        this.invdetail[i].balanceamount = this.invdetail[i].due_amount - this.invdetail[i].adjustedAmount;
        this.amountt = this.amountt - this.invdetail[i].adjustedAmount;

        this.adjustedarray.push(this.invdetail[i])

      }
      else if (this.amountt > 0 && this.amountt <= this.invdetail[i].due_amount) {
        this.invdetail[i].adjustedAmount = this.amountt;
        this.invdetail[i].balanceamount = this.invdetail[i].due_amount - this.amountt;
        this.amountt = this.amountt - this.invdetail[i].adjustedAmount;
        this.adjustedarray.push(this.invdetail[i])

      }
      this.amountafteradjusted = this.amountt;
    }
    else {
      this.amountt = this.amountt + this.invdetail[i].adjustedAmount;
      this.invdetail[i].adjustedAmount = null;
      this.invdetail[i].balanceamount = null;
    }
    if (this.amountt <= 0) {
      this.toasterService.info("Given amount is adjustd completly ")
    }
    console.log('this.adjustedarray', this.adjustedarray)
  }


  Adjusttype: any = "Auto";
  adjusttype(val) {
    this.Adjusttype = val;
    this.adjustedarray = [];
    this.amountafteradjusted = this.amounttt;
    if (val == 'Manual') {
      for (var i = 0; i < this.invdetail.length; i++) {
        this.invdetail[i].balanceamount = null;
        this.invdetail[i].adjustedAmount = null;
      }
    }
    else {
      this.adustinvAmount(this.amounttt)
    }

  }
  // updatedata: any = [];
  // array: any = [];
  // body: any = {};
  // createddate: any;
  postdropdataa() {
    // if(this.amountt>0){
    //   this.toasterService.warning("Given Amount Not Adjusted Completely "+this.amountt+ 'Left')

    // }
    // else{
    this.createddate = new Date()
    for (var j = 0; j < this.adjustedarray.length; j++) {
      this.body = {
        "inv_seq_no": this.adjustedarray[j].inv_seq_no,
        "total_amount": this.adjustedarray[j].final_amount,
        "adj_amount": Math.round((this.adjustedarray[j].adjustedAmount + Number.EPSILON) * 100) / 100,
        "balance_amount": Math.round((this.adjustedarray[j].balanceamount + Number.EPSILON) * 100) / 100,
        "remaining_amount": Math.round((this.adjustedarray[j].due_amount + Number.EPSILON) * 100) / 100,
        "adv_no": this.cdata['transid'],
        "created_date": this.createddate
      }
      this.array.push(this.body);
    }
    console.log('array', this.array)
    console.log('updatedata', this.updatedata)
    this.spinner.show();
    this.globalservice.postData(this.array, 'InvCheqDtl/').subscribe((resp) => {
      this.toasterService.success("Amount Adjusted Successfully")
      this.updatedata = resp;
      this.invdetail = [];
      this.amountt = null;
      this.amounttt = null;
      this.cdata = [];
      this.array = [];
      this.cheqstatus = null;
      this.spinner.hide();

    },
      error => {
        this.spinner.hide();
        this.invdetail = [];
        this.array = [];
        this.amountt = null;
        this.amounttt = null;
        this.cdata = [];
        this.adjusttype('Manual');
        // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal:true }
        });

      }
    )
    // }
  }

  adjustchequedetails() {
    // if(this.amountafteradjusted>0 && this.adjustedarray.length<this.invdetail.l){
    //   this.toasterService.warning("Given Amount Not Adjusted Completely. Remaining "+Math.round(this.amountt)+ ' is there')
    // }
    // else{
    $("#paymentstatus").modal('show');

  }

  // }


}
