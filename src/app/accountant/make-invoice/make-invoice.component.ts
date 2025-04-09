import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServiceService } from '../../global-service.service';
import { ToasterService } from '../../toastr-service.service';
import { formatDate } from "@angular/common";
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;

@Component({
  selector: 'app-make-invoice',
  standalone: false,
  templateUrl: './make-invoice.component.html',
  styleUrls: ['./make-invoice.component.scss']
})
export class MakeInvoiceComponent implements OnInit {

  
  proformaData: any;
  invoiceModel: any = {};
  invoiceListData: any;
  p: any = 1;
  todayDate = new Date();
  headerData: any;
  invoiceList: any = [];
  keys: string[];
  loginUserData: any;
  approveBtn: boolean = false;
  stockDataList: any = [];
  invoice_No: any;
  invoiceData: any;
  billingAddress: any;
  shipingAddress: any;
  a_invoice: boolean = true;
  response: any
  body: any
  grand_total: any
  taxAmount: any
  cartonqty: number = 0
  totalqty: number = 0
  totalfreecartoons: number = 0
  totalsp_discountamount: number = 0
  freeqtyarr: any = []
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
  splitamount: any = []
  decimalamount: any
  line_amount: any
  decimalsecondtaxableamount: any
  decimalsecondgstamount: number = 0
  decimalfirsttaxableamount: any
  decimalfirstgstamount: number = 0
  decimalthirdtaxableamount: any
  decimalthirdgstamount: number = 0
  decimalfourthtaxableamount: any
  decimalfourthgstamount: number = 0
  decimalfinalamount: number = 0
  constructor(private route: Router, private globalService: GlobalServiceService,public dialog: MatDialog, private spinner: NgxSpinnerService, private toasterService: ToasterService) {

  }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    if (this.loginUserData === null) {
      this.route.navigateByUrl('home');
    }
    this.proformaData = JSON.parse(localStorage.getItem('proformaData'));
    this.proformaData.remarks3 = this.loginUserData.first_name + ' ' + this.loginUserData.last_name
    console.log("proform", this.proformaData);

    if (this.proformaData.due > 0 || this.proformaData.outstanding > 0) {
      $('#alertpopup1').modal('show')
    }
    this.headerData = {
      document_no: this.proformaData.seq_no,
      document_date: formatDate(this.todayDate, 'yyyyMMdd', 'en-US'),
      dest_company_code: this.proformaData.ship_to_company_code,
      source_company_code: this.proformaData.inv_origin_company_code,
      inv_type: this.proformaData.inv_type,
      shipment_point: "",
      payment_terms: "",
      currency_code: "",
      exchange_rate: this.proformaData.exchange_rate,
      credit_period: this.proformaData.credit_period,
      spl_instr: "",
      fin_year: this.proformaData.financial_year,
      bill_to_party_seq_no: this.proformaData.bill_to_party_seq_no,
      ship_to_party_seq_no: this.proformaData.ship_to_party_seq_no,
      created_user_id: this.loginUserData.user_id,
      tcs_percent: 0.1,
      // tcs:
      tcs: 0.00075

    }

    this.inv_printAddress();
  };


  getpoData() {
    // this.spinner.show();
    this.freeqtyarr = []
    this.globalService.getDatawithQueryParams5(3.9, 21, this.proformaData.packing_l_no, this.proformaData.packing_l_date, this.loginUserData.company_code, this.proformaData.financial_year).subscribe((data) => {
      // this.spinner.hide();
      this.invoiceListData = data;
      this.invoiceListData.forEach(element => {
        this.invoiceModel[element.po_srl_no] = element.packing_qty + element.free_qty;
      });
      this.headerData.line_amount = this.proformaData.line_amount
      // this.headerData.gst_amount=this.proformaData.gst_amount
      this.headerData.gst_amount = this.invoiceListData.filter((item) => item.gst_amount)
        .map((item) => +item.gst_amount)
        .reduce((sum, current) => sum + current);

      this.headerData.final_amount = this.headerData.line_amount + this.headerData.gst_amount
      this.headerData.tcs = (this.headerData.final_amount / 100) * JSON.parse(this.headerData.tcs_percent)
      // console.log(this.headerData.tcs,"tcs")
      this.headerData.final_amount = this.headerData.final_amount + this.headerData.tcs
      this.headerData.tcs = JSON.parse(this.headerData.tcs.toFixed(2))
      // console.log(this.headerData.final_amount,"finalamount")
      // this.line_amount =  this.headerData.final_amount.toFixed(2);
      // this.splitamount=this.line_amount.split('.')
      // this.headerData.final_amount=JSON.parse(this.splitamount[0])
      // console.log(this.headerData.final_amount,"finalamount")
      // this.decimalfinalamount=this.splitamount[1]
      this.headerData.devicediscamount = this.proformaData.devicediscamount
      this.headerData.promo_amount = this.proformaData.promo_amount
      this.finalAmtBeforeround = this.headerData.final_amount;
      // this.headerData.final_amount = Math.round(this.headerData.final_amount)
      // this.roundoffAmt = (this.headerData.final_amount - this.finalAmtBeforeround)
      this.roundoffAmt = (Math.round(this.headerData.final_amount) - this.finalAmtBeforeround)
      this.headerData.roundvalue = this.roundoffAmt
      this.headerData.final_amount = this.headerData.final_amount + this.headerData.roundvalue

      for (let i of this.invoiceListData) {

        let npc = i.npc;
        this.cartonqty = this.cartonqty + npc;
        let qty = i.packing_qty + i.free_qty
        this.totalqty = this.totalqty + qty
        let freecarton = i.free_qty / i.piecepercarton
        this.totalfreecartoons = this.totalfreecartoons + freecarton
        let sp_disc_amount = i.sp_dic_amount * i.packing_qty;
        this.totalsp_discountamount = this.totalsp_discountamount + sp_disc_amount;
        if (i.free_qty != 0) {
          this.freeqtyarr.push({ "productname": i.subcategory + i.modelno, "free_qty": i.free_qty })
        }

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

      if (this.totalfirsttaxable) {
        this.line_amount = this.totalfirsttaxable.toFixed(2);
        this.splitamount = this.line_amount.split('.')
        this.totalfirsttaxable = JSON.parse(this.splitamount[0])
        this.decimalfirsttaxableamount = this.splitamount[1]

        if (this.loginUserData.company_address.state_code == this.billingAddress.state_code) {
          this.line_amount = (this.totalfirstgst / 2).toFixed(2);
          this.splitamount = this.line_amount.split('.')
          this.totalfirstgst = JSON.parse(this.splitamount[0])
          this.decimalfirstgstamount = parseInt(this.splitamount[1])

        }
        if (this.loginUserData.company_address.state_code != this.billingAddress.state_code) {
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

        if (this.loginUserData.company_address.state_code == this.billingAddress.state_code) {
          this.line_amount = (this.totalsecondgst / 2).toFixed(2);
          this.splitamount = this.line_amount.split('.')
          this.totalsecondgst = JSON.parse(this.splitamount[0])
          this.decimalsecondgstamount = parseInt(this.splitamount[1])
        }
        if (this.loginUserData.company_address.state_code != this.billingAddress.state_code) {
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

        if (this.loginUserData.company_address.state_code == this.billingAddress.state_code) {
          this.line_amount = (this.totalthirdgst / 2).toFixed(2);
          this.splitamount = this.line_amount.split('.')
          this.totalthirdgst = JSON.parse(this.splitamount[0])
          this.decimalthirdgstamount = parseInt(this.splitamount[1])
        }
        if (this.loginUserData.company_address.state_code != this.billingAddress.state_code) {
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

        if (this.loginUserData.company_address.state_code == this.billingAddress.state_code) {
          this.line_amount = (this.totalfourthgst / 2).toFixed(2);
          this.splitamount = this.line_amount.split('.')
          this.totalfourthgst = JSON.parse(this.splitamount[0])
          this.decimalfourthgstamount = parseInt(this.splitamount[1])
        }

        if (this.loginUserData.company_address.state_code != this.billingAddress.state_code) {
          this.line_amount = (this.totalfourthgst).toFixed(2);
          this.splitamount = this.line_amount.split('.')
          this.totalfourthgst = JSON.parse(this.splitamount[0])
          this.decimalfourthgstamount = parseInt(this.splitamount[1])
        }
      }

      this.cartonqty = this.cartonqty + this.totalfreecartoons
      //   this.grand_total = this.invoiceListData.filter((item) => item.tot_value)
      //   .map((item) => +item.tot_value)
      //   .reduce((sum, current) => sum + current);

      // this.taxAmount = this.invoiceListData.filter((item) => item.gst_amount)
      //   .map((item) => +item.gst_amount)
      //   .reduce((sum, current) => sum + current);
      //   console.log("inv_data",this.invoiceListData);
      //   console.log("inv_data",this.invoiceListData);

    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal:true }
        });
        // this.spinner.hide();
        // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      });
  };
  keypress1(event: any) {
    const pattern = /[.0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  // isNumberKey(event)
  //       {
  //         if (event.keyCode >= 96 && event.keyCode <= 105) {
  //           return event.keyCode - 96;
  //       } else if (event.keyCode >= 48 && event.keyCode <= 57) {
  //           return event.keyCode - 48;
  //       }
  //           // var charCode = (evt.which) ? evt.which : evt.keyCode;
  //           // if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
  //           //       return false;
  //           // return true;
  //       } 

  @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }
  @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
    e.preventDefault();
  }
  errmsg: boolean = false
  checkinv(invno) {
    this.body = { 'refinvno': invno , 'fin_year' : this.proformaData.financial_year } 
    this.globalService.postData(this.body, "invlist/").subscribe((resp1) => {
      this.spinner.hide()
      this.response = resp1
      if (this.response.msg == "this number already exists") {
        this.errmsg = true
      }
      else {
        this.errmsg = false
      }
    })
  }
  splprice(event, item) {

    if (event.target.checked == true) {

      this.invoiceListData.forEach(element => {
        if (item.productid == element.productid && item.seq_no == element.seq_no && item.po_srl_no == element.po_srl_no) {

          element.discount_eff = 0

        }
      })
    }
    else {
      this.invoiceListData.forEach(element => {
        if (item.productid == element.productid && item.seq_no == element.seq_no && item.po_srl_no == element.po_srl_no) {
          element.discount_eff = ((item.mrp - item.net_price) / item.mrp) * 100
          element.discount_eff = Math.round((element.discount_eff + Number.EPSILON) * 100) / 100
          element.discount_eff = element.discount_eff
        }
      })
    }
  }
  discountchange(item) {


    this.totalfirsttaxable = 0
    this.totalfirstgst = 0

    this.totalsecondtaxable = 0
    this.totalsecondgst = 0

    this.totalthirdtaxable = 0
    this.totalthirdgst = 0

    this.totalfourthtaxable = 0
    this.totalfourthgst = 0


    this.decimalsecondgstamount = 0

    this.decimalfirstgstamount = 0

    this.decimalthirdgstamount = 0

    this.decimalfourthgstamount = 0
    this.decimalfinalamount = 0
    this.invoiceListData.forEach(element => {
      if (item.productid == element.productid && item.seq_no == element.seq_no && item.po_srl_no == element.po_srl_no) {
        element.discount_eff = JSON.parse(item.discount_eff)
        element.net_price = element.mrp - ((element.mrp * JSON.parse(item.discount_eff)) / 100)
        element.net_price = Math.round((element.net_price + Number.EPSILON) * 100) / 100

        if (!item.spl) {
          this.spinner.show()
          return this.globalService.getDatawithQueryParams4User_id("121", element.productid, element.packing_qty, element.net_price, element.discount_eff, this.loginUserData.user_id).subscribe(data => {

            element.net_price = Math.round((data['net'] + Number.EPSILON) * 100) / 100


            element.sp_discount = data['sp_discount'];
            element.sp_dic_amount = data['sp_dic_amount'];
            element.type = data['type'];
            element.free_qty = data['free_qty'];
            if (element.sp_discount === null) {
              console.log("spl", element.sp_discount);

              element.sp_discount = 0;
              element.sp_dic_amount = 0;
            }
            if (element.free_qty === null) {
              element.free_qty = 0;
            }

            element.tot_value = element.packing_qty * element.net_price;
            // element.gst_amount = (element.tot_value / 100) * element.gst
            element.gst_amount = (element.tot_value * element.gst)  / 100



            this.headerData.line_amount = this.invoiceListData.filter((item) => item.tot_value)
              .map((item) => +item.tot_value)
              .reduce((sum, current) => sum + current);

            this.headerData.gst_amount = this.invoiceListData.filter((item) => item.gst_amount)
              .map((item) => +item.gst_amount)
              .reduce((sum, current) => sum + current);
            console.log(this.invoiceListData, "invoicelistdata")




            this.body = { "net_amount": this.headerData.line_amount, "gst": this.headerData.gst_amount, "process": "PACKING", "po_no": this.proformaData.po_no, "po_date": this.proformaData.po_date, "po_origin_company_code": this.proformaData.ship_to_company_code }
            this.globalService.postData(this.body, "promocode/checkom/").subscribe((resp1) => {
              this.spinner.hide()
              this.response = resp1

              this.headerData.gst_amount = this.response.gst
              this.headerData.final_amount = this.response.finalamount
              this.headerData.tcs = (this.headerData.final_amount / 100) * JSON.parse(this.headerData.tcs_percent)
              console.log(this.headerData.tcs, "tcs")
              this.headerData.final_amount = this.headerData.final_amount + this.headerData.tcs
              this.headerData.tcs = JSON.parse(this.headerData.tcs.toFixed(2))
              // this.line_amount =  this.headerData.final_amount.toFixed(2);
              // this.splitamount=this.line_amount.split('.')
              // this.headerData.final_amount=JSON.parse(this.splitamount[0])
              // console.log(this.headerData.final_amount,"finalamount")
              // this.decimalfinalamount=this.splitamount[1]
              this.headerData.devicediscamount = this.response.devicediscamount
              this.finalAmtBeforeround = this.response.finalamount;
              // this.headerData.final_amount=Math.round(this.response.finalamount) 
              // this.headerData.final_amount = Math.round(this.response.finalamount) + this.headerData.tcs

              // this.roundoffAmt = (this.headerData.final_amount - this.finalAmtBeforeround)
              this.roundoffAmt = (Math.round(this.headerData.final_amount) - this.headerData.final_amount)
              this.headerData.roundvalue = this.roundoffAmt
              this.headerData.final_amount = this.headerData.final_amount + this.headerData.roundvalue
              this.getgsts()
            })

          })
        }
        else {
          this.totalfirsttaxable = 0
          this.totalfirstgst = 0

          this.totalsecondtaxable = 0
          this.totalsecondgst = 0

          this.totalthirdtaxable = 0
          this.totalthirdgst = 0

          this.totalfourthtaxable = 0
          this.totalfourthgst = 0


          this.decimalsecondgstamount = 0

          this.decimalfirstgstamount = 0

          this.decimalthirdgstamount = 0

          this.decimalfourthgstamount = 0
          this.decimalfinalamount = 0
          element.sp_dic_amount = (element.net_price * JSON.parse(item.sp_discount)) / 100
          element.net_price = element.net_price - ((element.net_price * JSON.parse(item.sp_discount)) / 100)
          element.net_price = Math.round((element.net_price + Number.EPSILON) * 100) / 100
          element.tot_value = element.packing_qty * element.net_price;
          element.gst_amount = (element.tot_value / 100) * element.gst



          this.headerData.line_amount = this.invoiceListData.filter((item) => item.tot_value)
            .map((item) => +item.tot_value)
            .reduce((sum, current) => sum + current);

          this.headerData.gst_amount = this.invoiceListData.filter((item) => item.gst_amount)
            .map((item) => +item.gst_amount)
            .reduce((sum, current) => sum + current);
          console.log(this.invoiceListData, "invoicelistdata")



          this.spinner.show()
          this.body = { "net_amount": this.headerData.line_amount, "gst": this.headerData.gst_amount, "process": "PACKING", "po_no": this.proformaData.po_no, "po_date": this.proformaData.po_date, "po_origin_company_code": this.proformaData.ship_to_company_code }
          this.globalService.postData(this.body, "promocode/checkom/").subscribe((resp1) => {
            this.spinner.hide()
            this.response = resp1

            this.headerData.gst_amount = this.response.gst
            this.headerData.final_amount = this.response.finalamount
            this.headerData.tcs = (this.headerData.final_amount / 100) * JSON.parse(this.headerData.tcs_percent)
            console.log(this.headerData.tcs, "tcs")
            this.headerData.final_amount = this.headerData.final_amount + this.headerData.tcs
            this.headerData.tcs = JSON.parse(this.headerData.tcs.toFixed(2))
            // this.line_amount =  this.headerData.final_amount.toFixed(2);
            // this.splitamount=this.line_amount.split('.')
            // this.headerData.final_amount=JSON.parse(this.splitamount[0])
            // console.log(this.headerData.final_amount,"finalamount")
            // this.decimalfinalamount=this.splitamount[1]
            this.headerData.devicediscamount = this.response.devicediscamount
            this.finalAmtBeforeround = this.response.finalamount;
            // this.headerData.final_amount = Math.round(this.response.finalamount)
            // this.roundoffAmt = (this.headerData.final_amount - this.finalAmtBeforeround)
            this.roundoffAmt = (Math.round(this.headerData.final_amount) - this.headerData.final_amount)
            this.headerData.roundvalue = this.roundoffAmt
            this.headerData.final_amount = this.headerData.final_amount + this.headerData.roundvalue
            this.getgsts()
          })


        }
      }

    })
    console.log(this.invoiceListData, "invoicelistdata")




  }
  getgsts() {
    for (let i of this.invoiceListData) {
      if (i.gst == "18.00") {
        this.first = true

        let taxable = JSON.parse(i.tot_value)
        this.totalfirsttaxable = this.totalfirsttaxable + taxable

        let gst = JSON.parse(i.gst_amount)
        this.totalfirstgst = this.totalfirstgst + gst
        console.log(this.totalfirstgst, "totalfirstgstamount")

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
    if (this.totalfirsttaxable) {
      this.line_amount = this.totalfirsttaxable.toFixed(2);
      this.splitamount = this.line_amount.split('.')
      this.totalfirsttaxable = JSON.parse(this.splitamount[0])
      this.decimalfirsttaxableamount = this.splitamount[1]

      if (this.loginUserData.company_address.state_code == this.billingAddress.state_code) {
        this.line_amount = (this.totalfirstgst / 2).toFixed(2);
        this.splitamount = this.line_amount.split('.')
        this.totalfirstgst = JSON.parse(this.splitamount[0])
        this.decimalfirstgstamount = parseInt(this.splitamount[1])

      }
      if (this.loginUserData.company_address.state_code != this.billingAddress.state_code) {
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

      if (this.loginUserData.company_address.state_code == this.billingAddress.state_code) {
        this.line_amount = (this.totalsecondgst / 2).toFixed(2);
        this.splitamount = this.line_amount.split('.')
        this.totalsecondgst = JSON.parse(this.splitamount[0])
        this.decimalsecondgstamount = parseInt(this.splitamount[1])
      }
      if (this.loginUserData.company_address.state_code != this.billingAddress.state_code) {
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

      if (this.loginUserData.company_address.state_code == this.billingAddress.state_code) {
        this.line_amount = (this.totalthirdgst / 2).toFixed(2);
        this.splitamount = this.line_amount.split('.')
        this.totalthirdgst = JSON.parse(this.splitamount[0])
        this.decimalthirdgstamount = parseInt(this.splitamount[1])
      }
      if (this.loginUserData.company_address.state_code != this.billingAddress.state_code) {
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

      if (this.loginUserData.company_address.state_code == this.billingAddress.state_code) {
        this.line_amount = (this.totalfourthgst / 2).toFixed(2);
        this.splitamount = this.line_amount.split('.')
        this.totalfourthgst = JSON.parse(this.splitamount[0])
        this.decimalfourthgstamount = parseInt(this.splitamount[1])
      }

      if (this.loginUserData.company_address.state_code != this.billingAddress.state_code) {
        this.line_amount = (this.totalfourthgst).toFixed(2);
        this.splitamount = this.line_amount.split('.')
        this.totalfourthgst = JSON.parse(this.splitamount[0])
        this.decimalfourthgstamount = parseInt(this.splitamount[1])
      }
    }

  }

  pricechange(item) {
    this.totalfirsttaxable = 0
    this.totalfirstgst = 0

    this.totalsecondtaxable = 0
    this.totalsecondgst = 0

    this.totalthirdtaxable = 0
    this.totalthirdgst = 0

    this.totalfourthtaxable = 0
    this.totalfourthgst = 0


    this.decimalsecondgstamount = 0

    this.decimalfirstgstamount = 0

    this.decimalthirdgstamount = 0

    this.decimalfourthgstamount = 0
    this.decimalfinalamount = 0
    this.invoiceListData.forEach(element => {
      if (item.productid == element.productid && item.seq_no == element.seq_no && item.po_srl_no == element.po_srl_no) {
        // element.net_price = JSON.parse(item.net_price)
        element.net_price = (item.net_price)
        element.tot_value = item.packing_qty * JSON.parse(item.net_price)
        element.gst_amount = ((item.packing_qty * JSON.parse(item.net_price)) / 100) * item.gst
        console.log(element.gst_amount,'gst_amount(i)')
        if (element.discount_eff != 0) {
          element.discount_eff = ((item.mrp - item.net_price) / item.mrp) * 100
          element.discount_eff = Math.round((element.discount_eff + Number.EPSILON) * 100) / 100
        }
      }

    })
    this.headerData.line_amount = this.invoiceListData.filter((item) => item.tot_value)
      .map((item) => +item.tot_value)
      .reduce((sum, current) => sum + current);
    this.headerData.gst_amount = this.invoiceListData.filter((item) => item.gst_amount)
      .map((item) => +item.gst_amount)
      .reduce((sum, current) => sum + current);

    this.body = { "net_amount": this.headerData.line_amount, "gst": this.headerData.gst_amount, "process": "PACKING", "po_no": this.proformaData.po_no, "po_date": this.proformaData.po_date, "po_origin_company_code": this.proformaData.ship_to_company_code }
    this.globalService.postData(this.body, "promocode/checkom/").subscribe((resp1) => {
      this.response = resp1

      this.headerData.gst_amount = this.response.gst
      this.headerData.final_amount = this.response.finalamount
      this.headerData.tcs = (this.headerData.final_amount / 100) * JSON.parse(this.headerData.tcs_percent)
      console.log(this.headerData.tcs, "tcs")
      this.headerData.final_amount = this.headerData.final_amount + this.headerData.tcs
      this.headerData.tcs = JSON.parse(this.headerData.tcs.toFixed(2))
      // this.line_amount =  this.headerData.final_amount.toFixed(2);
      // this.splitamount=this.line_amount.split('.')
      // this.headerData.final_amount=JSON.parse(this.splitamount[0])
      // console.log(this.headerData.final_amount,"finalamount")
      // this.decimalfinalamount=this.splitamount[1]
      this.headerData.devicediscamount = this.response.devicediscamount
      this.finalAmtBeforeround = this.response.finalamount;
      // this.headerData.final_amount = Math.round(this.response.finalamount) + this.headerData.tcs
      // this.roundoffAmt = (this.headerData.final_amount - this.finalAmtBeforeround)
      this.roundoffAmt = (Math.round(this.headerData.final_amount) - this.headerData.final_amount)
      this.headerData.roundvalue = this.roundoffAmt
      this.headerData.final_amount = this.headerData.final_amount + this.headerData.roundvalue
      this.getgsts()
    })
  }
  checkQty(qty, packQty) {
    if (packQty > qty) {
      this.approveBtn = true;
    } else {
      this.approveBtn = false;
    }
  }
  input: boolean = false
  specialdiscountchange(item) {
    this.totalfirsttaxable = 0
    this.totalfirstgst = 0

    this.totalsecondtaxable = 0
    this.totalsecondgst = 0

    this.totalthirdtaxable = 0
    this.totalthirdgst = 0

    this.totalfourthtaxable = 0
    this.totalfourthgst = 0


    this.decimalsecondgstamount = 0

    this.decimalfirstgstamount = 0

    this.decimalthirdgstamount = 0

    this.decimalfourthgstamount = 0
    this.decimalfinalamount = 0
    this.invoiceListData.forEach(element => {
      if (item.productid == element.productid && item.seq_no == element.seq_no && item.po_srl_no == element.po_srl_no) {
        element.discount_eff = JSON.parse(item.discount_eff)
        element.sp_discount = JSON.parse(item.sp_discount)

        element.net_price = element.mrp-((element.mrp* JSON.parse(item.discount_eff))/100)
        element.sp_dic_amount = (element.net_price * JSON.parse(item.sp_discount)) / 100
        element.net_price = element.net_price - ((element.net_price * JSON.parse(item.sp_discount)) / 100)
        console.log(element.net_price, "netprice")
        element.net_price = Math.round((element.net_price + Number.EPSILON) * 100) / 100

        element.tot_value = element.packing_qty * element.net_price;
        element.gst_amount = (element.tot_value / 100) * element.gst



        this.headerData.line_amount = this.invoiceListData.filter((item) => item.tot_value)
          .map((item) => +item.tot_value)
          .reduce((sum, current) => sum + current);

        this.headerData.gst_amount = this.invoiceListData.filter((item) => item.gst_amount)
          .map((item) => +item.gst_amount)
          .reduce((sum, current) => sum + current);
        console.log(this.invoiceListData, "invoicelistdata")




        this.body = { "net_amount": this.headerData.line_amount, "gst": this.headerData.gst_amount, "process": "PACKING", "po_no": this.proformaData.po_no, "po_date": this.proformaData.po_date, "po_origin_company_code": this.proformaData.ship_to_company_code }
        this.globalService.postData(this.body, "promocode/checkom/").subscribe((resp1) => {
          this.spinner.hide()
          this.response = resp1

          this.headerData.gst_amount = this.response.gst
          this.headerData.final_amount = this.response.finalamount
          this.headerData.tcs = (this.headerData.final_amount / 100) * JSON.parse(this.headerData.tcs_percent)
          console.log(this.headerData.tcs, "tcs")
          this.headerData.final_amount = this.headerData.final_amount + this.headerData.tcs
          this.headerData.tcs = JSON.parse(this.headerData.tcs.toFixed(2))
          // this.line_amount =  this.headerData.final_amount.toFixed(2);
          // this.splitamount=this.line_amount.split('.')
          // this.headerData.final_amount=JSON.parse(this.splitamount[0])
          // console.log(this.headerData.final_amount,"finalamount")
          // this.decimalfinalamount=this.splitamount[1]
          this.headerData.devicediscamount = this.response.devicediscamount
          this.finalAmtBeforeround = this.response.finalamount;
          // this.headerData.final_amount = Math.round(this.response.finalamount)
          // this.roundoffAmt = (this.headerData.final_amount - this.finalAmtBeforeround)
          this.roundoffAmt = (Math.round(this.headerData.final_amount) - this.headerData.final_amount)
          this.headerData.roundvalue = this.roundoffAmt
          this.headerData.final_amount = this.headerData.final_amount + this.headerData.roundvalue
          this.getgsts()
        })

      }
    })
  }
  specialdiscount: boolean = false
  spldiscount(event, i, item) {

    if (event.target.checked == true) {

      this.invoiceListData[i].spl = true
    }
    else {

      this.invoiceListData[i].spl = false
      this.discountchange(item)
    }
  }
  showpreview() {

    this.route.navigateByUrl('/Accounts Manager-invoicepreview');
  }
  showremarks: boolean = false;
  finalAmtBeforeround: any
  roundoffAmt: any
  makeInvoice() {
    // if(this.proformaData.due>0 || this.proformaData.outstanding==0){
    //   $('#alertpopup1').modal('show')
    // }
    if (this.proformaData.due > 0) {
      $('#alertpopup1').modal('show')
    }
    else {
      this.showremarks = true;
      if (this.proformaData.remarks3 == undefined) {
        this.toasterService.warning("please give your comments")

      }
      if (this.proformaData.remarks3) {

        this.headerData.remarks3 = this.proformaData.remarks3
        this.spinner.show();
        this.approveBtn = false;
        this.invoiceList = [];
        this.a_invoice = false;
        // this.keys = Object.keys(this.invoiceModel);
        for (let i = 0; i < this.invoiceListData.length; i++) {
          // for (let j = 0; j < this.keys.length; j++) {
          // if (this.invoiceListData[i].po_srl_no == this.keys[j]) {
          // if (this.invoiceModel[this.keys[j]] <= (this.invoiceListData[i].packing_qty+this.invoiceListData[i].free_qty)) {
          let json_dtl = {
            "document_no": this.invoiceListData[i].seq_no,
            "document_date": formatDate(this.todayDate, 'yyyyMMdd', 'en-US'),
            "po_no": this.invoiceListData[i].po_no,
            // "discount_eff": ((this.invoiceListData[i].mrp-this.invoiceListData[i].net_price)/this.invoiceListData[i].mrp)*100,
            "discount_eff": this.invoiceListData[i].discount_eff,
            "performainv_date": formatDate(this.todayDate, 'yyyyMMdd', 'en-US'),
            "po_srl_no": this.invoiceListData[i].po_srl_no,
            "po_date": (this.invoiceListData[i].po_date).replace(/-/g, ""),
            "productid": this.invoiceListData[i].productid,
            "packing_qty": this.invoiceListData[i].balance_qty,
            "performa_inv_qty": this.invoiceListData[i].performa_inv_qty,
            "performa_inv_no": this.invoiceListData[i].packing_l_no,
            "inv_srl_no": this.invoiceListData[i].inv_srl_no,
            "inv_qty": this.invoiceListData[i].packing_qty,
            "mrp": this.invoiceListData[i].mrp,
            "cost": this.invoiceListData[i].cost,
            "offer_type": this.invoiceListData[i].offer_type,
            "sp_discount": this.invoiceListData[i].sp_discount,
            "sp_dic_amount": this.invoiceListData[i].sp_dic_amount,
            "free_qty": this.invoiceListData[i].free_qty,
            "net_price": JSON.parse(this.invoiceListData[i].net_price),
            "tot_value": JSON.parse(this.invoiceListData[i].packing_qty) * JSON.parse(this.invoiceListData[i].net_price),
            "final_amount": JSON.parse(this.invoiceListData[i].packing_qty) * JSON.parse(this.invoiceListData[i].net_price),
            "gst_amount": ((JSON.parse(this.invoiceListData[i].packing_qty) * JSON.parse(this.invoiceListData[i].net_price)) / 100) * JSON.parse(this.invoiceListData[i].gst),
            "created_user_id": this.loginUserData.user_id,
            "srl_no": this.invoiceListData[i].srl_no
          }
          this.invoiceList.push(json_dtl);
        }
        // else {
        //   this.invoiceList = [];
        //   this.approveBtn = true;
        //   break;
        // }
        // }
        // }
        // }   
        this.headerData.line_amount = this.invoiceList.filter((item) => item.tot_value)
          .map((item) => +item.tot_value)
          .reduce((sum, current) => sum + current);
        this.headerData.gst_amount = this.invoiceListData.filter((item) => item.gst_amount)
          .map((item) => +item.gst_amount)
          .reduce((sum, current) => sum + current);
        this.body = { "net_amount": this.headerData.line_amount, "gst": this.headerData.gst_amount, "process": "PACKING", "po_no": this.proformaData.po_no, "po_date": this.proformaData.po_date, "po_origin_company_code": this.proformaData.ship_to_company_code }

        this.globalService.postData(this.body, "promocode/checkom/").subscribe((resp1) => {
          this.response = resp1
          this.headerData.gst_amount = this.response.gst
          this.headerData.final_amount = this.response.finalamount
          this.headerData.tcs = (this.headerData.final_amount / 100) * JSON.parse(this.headerData.tcs_percent)
          console.log(this.headerData.tcs, "tcs")
          this.headerData.final_amount = this.headerData.final_amount + this.headerData.tcs
          console.log(this.headerData.final_amount, this.headerData.tcs)
          this.headerData.tcs = JSON.parse(this.headerData.tcs.toFixed(2))
          this.finalAmtBeforeround = this.response.finalamount;
          this.roundoffAmt = (Math.round(this.headerData.final_amount) - this.headerData.final_amount)
          console.log(this.roundoffAmt, "roundamt")
          this.headerData.final_amount = Math.round(this.headerData.final_amount)
          // this.roundoffAmt = (this.headerData.final_amount - this.finalAmtBeforeround)
          // this.roundoffAmt = (Math.round(this.headerData.final_amount) - this.headerData.final_amount)
          this.headerData.roundvalue = this.roundoffAmt
          this.headerData.devicediscamount = this.response.devicediscamount

          if (!this.approveBtn) {
            this.headerData.credit_period = this.proformaData.credit_period;
            this.headerData.payment_terms = this.proformaData.payment_terms;
            this.headerData.spl_instr = this.proformaData.spl_instr;
            this.headerData.remarks1 = this.proformaData.remarks1;
            this.headerData.remarks2 = this.proformaData.remarks2;
            this.headerData.remarks3 = this.proformaData.remarks3;
            this.headerData.refinvno = this.proformaData.refinvno;
            this.headerData.tcs = this.headerData.tcs;
            this.headerData.tcs_percent = JSON.parse(this.headerData.tcs_percent);
            let body = {
              "process_in": 'INV', "operation_in": "UPDATE", "draft_final_in": "FINAL", "document_no_out": "", "message_out": "",
              "json_hdr": this.headerData, "json_dtl": this.invoiceList
            }
            this.spinner.show();
            let methodName = "insert_update/"
            this.globalService.postData(body, methodName).subscribe((data) => { 
              if(this.pro.invcopy){
                  this.Uploadinvcopy()
              }
              this.spinner.hide();
              if (data['Message'] == "Invoice Sucessfully inserted ") {
                this.spinner.hide();

                this.invoiceData = data;
                this.invoice_No = this.invoiceData.data.json_hdr.refinvno;
                localStorage.setItem('InvoiceData', JSON.stringify(this.invoiceData));
                this.showremarks = true;

                if (localStorage.getItem('remarks3') == "") {
                  this.toasterService.warning("please give your comments")
                }
                $('#makeinvoiceModal').modal('show');
                this.stockUpdate();
              }
              this.spinner.hide();
            },
              error => {
                this.spinner.hide();
                // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
                this.dialog.open(ErrorModalComponent, {
                  data: { errorModal:true }
                });
              });

          };
        })
      }
      this.spinner.hide();
    }
  };

  gotoPrevious() {
    this.route.navigateByUrl('profomaList');
  };



  invoice_cnfm() {
    this.route.navigateByUrl('/invoice-Print');
  }



  inv_printAddress() {
    let input_id = "7.8";
    let param1 = this.proformaData.bill_to_party_seq_no - 1 + "," + this.proformaData.bill_to_party_seq_no;
    return this.globalService.getDatawithQueryParams1(input_id, param1).subscribe(data => {
      this.billingAddress = data['Bill'];
      this.shipingAddress = data['SHIP'];
      localStorage.setItem('Inv_Address', JSON.stringify(data));
      this.getpoData();
    });
  };

  stockUpdate() {
    this.spinner.show();
    this.invoiceList.forEach(data => {
      let stockData = {
        "productid": data.productid,
        "qty_in": data.inv_qty,
        "tot_amt_in": data.tot_value
      }
      this.stockDataList.push(stockData);
    });
    let body = {
      "period_in": formatDate(this.todayDate, 'yyyyMM', 'en-US'),
      "company_code_in": this.proformaData.inv_origin_company_code,
      "product_details": this.stockDataList,
      "storage_location_in": "WAREHOUSE1",
      "process_type_in": "INV"
    };
    let methodName = "proc_stock/"
    this.globalService.postData(body, methodName).subscribe((data) => {
      this.spinner.hide();
    },
      error => {
        // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal:true }
        });
      });

  }

  tcspercentchange(headerData) {
    this.headerData.tcs_percent = JSON.parse(headerData.tcs_percent)
    this.headerData.tcs = ((this.headerData.line_amount + this.headerData.gst_amount) / 100) * this.headerData.tcs_percent
    console.log(this.headerData.tcs, "tcs")
    this.headerData.final_amount = (this.headerData.line_amount + this.headerData.gst_amount) + this.headerData.tcs
    this.headerData.tcs = JSON.parse(this.headerData.tcs.toFixed(2))
    // this.finalAmtBeforeround = this.headerData.final_amount;
    // console.log(this.finalAmtBeforeround, "finalAmtBeforeround")
    // this.headerData.final_amount = Math.round(this.headerData.final_amount)
    // this.roundoffAmt = (this.headerData.final_amount - this.finalAmtBeforeround)
    this.roundoffAmt = (Math.round(this.headerData.final_amount) - this.headerData.final_amount)
    this.headerData.roundvalue = this.roundoffAmt
    this.headerData.final_amount = this.headerData.final_amount + this.headerData.roundvalue
  }
  discountt: any;
  applyDisc(data){
    for (var i = 0; i < this.invoiceListData.length; i++) {
      this.invoiceListData[i].discount_eff = this.discountt;
      this.discountchange(this.invoiceListData[i])
    }
    console.log(this.invoiceListData,'this.invoiceListDatadsc')
  }

  jsondata: any
  uploadAttrfile: any;
  file: File
  methodname: any
  imagedata: any
  pro: any={};
  headrdata: any={};
  attrexcelUpload(evt: any): void {
    // alert("hii");
    this.uploadAttrfile = evt.target.files[0].name;
    this.onFileChange(evt.target, 'doc2');
  };
  onFileChange(evt: any, data) {

    /* wire up file reader */
    // const file: File = evt.files[0];

    // const reader: FileReader = new FileReader();
    this.file = evt.files[0]
    var reader = new FileReader();
    reader.onload = (e: any) => {
      if (data == "doc2") {
        this.jsondata = e.target.result
        console.log("json", this.jsondata);
        this.uploaddata2()
      }
    };

    reader.readAsDataURL(this.file);
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
    // reader.readAsBinaryString(evt.files[0]);
  }
  
  uploaddata2() {
    this.methodname = "FileUploadView/";
    this.imagedata = { "image": this.jsondata, "userid": this.loginUserData.user_id, "processes": "import" }
    this.globalService.postData(this.imagedata, this.methodname).subscribe((data) => {
      this.response = data;
      this.headrdata.invcopy = this.response.image
    })
  }
  Uploadinvcopy() {
    this.spinner.show();
    let body = {
      "seq_no": this.invoiceListData[0].seq_no,
      "invcopy": this.headrdata.invcopy,
    };
    let methodName = "customerinvupdate/"
    this.globalService.postData(body, methodName).subscribe((data) => {
      this.spinner.hide();
    },
      error => {
        // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal:true }
        });
      });

  }
}
