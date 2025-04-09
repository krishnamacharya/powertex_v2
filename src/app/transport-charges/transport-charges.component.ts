import { Component, OnInit } from '@angular/core';
import { ToasterService } from './../toastr-service.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators, NgForm } from "@angular/forms";
import { GlobalServiceService } from '../global-service.service';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-transport-charges',
  standalone: false,
  templateUrl: './transport-charges.component.html',
  styleUrls: ['./transport-charges.component.scss']
})
export class TransportChargesComponent implements OnInit {
  loginUserData: any
  masterData: any = {};

  invoicedata: any = {};
  fieldArray: Array<any> = [];
  todayDate = new Date();
  constructor(private service: GlobalServiceService, private toaster: ToasterService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getdealerdropdown()
    this.invoicedata.code = "TC"
    this.getCurrentFinancialYear()
  }
  keypress(event: any) {
    const pattern = /[0-9.]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  customerdata: any = []
  getdealerdropdown() {
    return this.service.getDatawithQueryParams2('5.12', this.loginUserData.company_code, 'DEALER').subscribe((resp) => {
      console.log(resp);
      this.customerdata = resp;
    })
  }
  today: any
  twoDigitYear1: any
  twoDigitYear2: any
  getCurrentFinancialYear() {

    var fiscalyear = "";
    if (this.invoicedata.invdate) {
      this.today = new Date(this.invoicedata.invdate)
      console.log(this.today, "lastyear")
    }
    else {
      this.today = new Date();
      console.log(this.today, "today")
    }
    if ((this.today.getMonth() + 1) <= 3) {
      fiscalyear = (this.today.getFullYear() - 1) + "-" + this.today.getFullYear()
    } else {
      fiscalyear = this.today.getFullYear() + "-" + (this.today.getFullYear() + 1)
    }
    console.log(fiscalyear, "financialyear")
    var oneYear = fiscalyear.split('-');
    console.log(oneYear, "oneYear")
    this.twoDigitYear1 = oneYear[0].toString().substr(-2);
    this.twoDigitYear2 = oneYear[1].toString().substr(-2);
    console.log(this.twoDigitYear1, "twoDigitYear1")
    console.log(this.twoDigitYear2, "twoDigitYear2")
    this.invoicedata.year = this.twoDigitYear1 + "-" + this.twoDigitYear2
    return fiscalyear
  }

  // document.getElementById("spFY").innerHTML=getCurrentFinancialYear();
  changedate(invdate) {

  }
  add_disable(attr) {

    let arr = ["invno", "invdate", "invamount"];
    for (let i of arr) {
      if (attr[i] == null || attr[i] == undefined) {

        return true;
      }
    }

    return false;
  }
  customerchange(customername) {
    for (let c of this.customerdata) {
      if (c.company_code == customername) {
        this.masterData.credit_period = c.credit_period
        this.masterData.credit_limit = c.credit_limit
      }
    }
  }
  deleteFieldValue2(index) {
    this.fieldArray.splice(index, 1);

  }
  addFieldValue() {

    this.fieldArray.push({
      inv_origin_company_code: this.loginUserData.company_code,
      inv_no: JSON.parse(this.invoicedata.invno),
      inv_date: this.invoicedata.invdate,
      ship_to_company_code: this.masterData.customername,
      created_user_id: this.loginUserData.user_id,
      due_amount: JSON.parse(this.invoicedata.invamount),
      final_amount: JSON.parse(this.invoicedata.invamount),
      remark3: this.masterData.comment,
      credit_period: this.masterData.credit_period,
      payment_terms: this.masterData.credit_limit,
      sinv_no: this.invoicedata.code + "-" + JSON.parse(this.invoicedata.invno) + "/" + this.invoicedata.year
    }
    )
    this.invoicedata = {}
    this.invoicedata.code = "TC"
    this.invoicedata.year = this.twoDigitYear1 + "-" + this.twoDigitYear2
    // console.log(this.fieldArray, "this.fieldArray")

  }

  body: any = []
  sub_final(masterDataForm: NgForm) {


    if (this.masterData.customername && this.invoicedata.invno && this.invoicedata.invdate && this.invoicedata.code && this.invoicedata.year && this.invoicedata.invamount) {
      this.fieldArray.push({
        inv_origin_company_code: this.loginUserData.company_code,
        inv_no: JSON.parse(this.invoicedata.invno),
        inv_date: this.invoicedata.invdate,
        ship_to_company_code: this.masterData.customername,
        created_user_id: this.loginUserData.user_id,
        due_amount: JSON.parse(this.invoicedata.invamount),
        final_amount: JSON.parse(this.invoicedata.invamount),
        remark3: this.masterData.comment,
        credit_period: this.masterData.credit_period,
        payment_terms: this.masterData.credit_limit,
        sinv_no: this.invoicedata.code + "-" + JSON.parse(this.invoicedata.invno) + "/" + this.invoicedata.year
      }
      )
      console.log(this.fieldArray, "this.fieldArray")

      // let methodName = "Opening/"
      let methodName = "transport_charges/"
      this.service.postData(this.fieldArray, methodName).subscribe((data) => {

        this.body = data
        $('#success').modal('show');
        this.fieldArray = []

        this.invoicedata = {}

        masterDataForm.reset()
        this.masterData.customername = undefined
        this.invoicedata.code = "TC"
        this.invoicedata.year = this.twoDigitYear1 + "-" + this.twoDigitYear2

      },
        error => {
          this.fieldArray.splice(this.fieldArray.length - 1, 1);
          this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        });

    }
    else {

      this.toaster.error("Please fill all fields")
    }
  }
  reset(masterDataForm: NgForm) {
    masterDataForm.reset()
    this.fieldArray = []
    this.invoicedata = {}
    this.masterData.customername = undefined
    this.invoicedata.code = "TC"
    this.invoicedata.year = this.twoDigitYear1 + "-" + this.twoDigitYear2
  }
}
