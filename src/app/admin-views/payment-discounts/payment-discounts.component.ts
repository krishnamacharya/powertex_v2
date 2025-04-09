import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../../global-service.service';
import { ToasterService } from '../../toastr-service.service';
import { DataServiceService } from '../../data-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-payment-discounts',
  standalone: false,
  templateUrl: './payment-discounts.component.html',
  styleUrls: ['./payment-discounts.component.scss']
})
export class PaymentDiscountsComponent implements OnInit {
  loginUserData: any
  payment: any = {}
  paymentmodes: any = []
  paymentinvoice: any
  amount: boolean = false
  tdate: boolean = false
  finalform: any;
  invdetail: any;
  page: any = 1;
  adjustedarray: any = []
  alltotal_balance_amount: any = 0;
  total_balance_amount: any = 0;
  amountt: number = 0;
  constructor(private globalServicce: GlobalServiceService, private toasterservice: ToasterService, private dataService: DataServiceService, private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.paymentmodes = this.dataService.getOnLoadServices('62.1');
    this.paymentinvoice = JSON.parse(localStorage.getItem('paymentinvoice'));
    this.payment.mode_of_payment = "Import Payment"
    this.globalServicce.getDatawithMethodParams2("sup/pendingpaymentlist/", this.paymentinvoice.supplierid,this.paymentinvoice.currency).subscribe((data) => {
      this.invdetail = data
      this.invdetail.map((e) => {
        e['adjustedAmount'] = 0
      })
      this.alltotal_balance_amount = this.total_balance_amount = this.invdetail.filter((item) => item.balance_amount)
        .map((item) => +item.balance_amount)
        .reduce((sum, current) => sum + current);
    });
  }
  
  keypress(event: any) {
    const pattern = /[A-Za-z0-9.]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  checkValue(i, ev) {
    if (ev.target.checked == true) {
      this.invdetail[i].balance_amountt = this.invdetail[i].balance_amount
      if (this.amountt > 0) {
        if (this.amountt > this.invdetail[i].balance_amount) {
          this.invdetail[i].adjustedAmount = this.invdetail[i].balance_amount;
          this.amountt -= this.invdetail[i].balance_amount
          this.invdetail[i].balance_amount = 0
        } else if (this.amountt <= this.invdetail[i].balance_amount) {
          this.invdetail[i].adjustedAmount = this.amountt;
          this.invdetail[i].balance_amount = this.invdetail[i].balance_amount - this.amountt
          this.amountt -= this.invdetail[i].adjustedAmount
        }
        this.total_balance_amount -= this.invdetail[i].adjustedAmount
        this.adjustedarray.push(this.invdetail[i])
      }
    } else {
      for (let j in this.adjustedarray) {
        if (this.invdetail[i].inv_no == this.adjustedarray[j].inv_no) {
          this.amountt += this.invdetail[i].adjustedAmount
          this.total_balance_amount += this.invdetail[i].adjustedAmount
          this.invdetail[i].balance_amount = this.invdetail[i].balance_amountt
          this.invdetail[i].adjustedAmount = 0
          this.adjustedarray.splice(j, 1);
        }
      }
    }
    console.log(this.adjustedarray)
  }
  checkamount(amount) {
    this.amountt = parseFloat(amount)
    this.total_balance_amount = this.alltotal_balance_amount
    if (this.amountt > this.alltotal_balance_amount) {
      this.amount = true
      this.toasterservice.warning("Amount should Not be greater than Invoice Amount")
    }
    else {
      if (this.adjustedarray) {
        this.adjustedarray.map((e) => {
          if (this.amountt > e.balance_amount) {
            e.adjustedAmount = e.balance_amount;
            this.amountt -= e.balance_amount
            e.balance_amount = 0
          } else if (this.amountt <= e.balance_amount) {
            e.adjustedAmount = this.amountt;
            e.balance_amount = e.balance_amount - this.amountt
            this.amountt -= e.adjustedAmount
          }
        })
      }
      this.amount = false
    }
    if (this.amountt <= 0) {
      this.total_balance_amount = this.alltotal_balance_amount
      this.toasterservice.info("Given amount is adjustd completly ")
    }
    console.log(this.adjustedarray, this.total_balance_amount)
  }
  checkdate(tdate) {

    if (this.payment.tdate == undefined) {
      this.toasterservice.warning("please select date")

    }
  }
  onSubmit(form: NgForm) {
    if (this.adjustedarray.length == 0) {
      this.toasterservice.warning("Please, Select at least 1 invoice")
    } else {
      $("#confirmModal").modal('show');
      // this.atributesData(form);
      this.finalform = form
    }
  }
  confirmmodal() {
    this.atributesData(this.finalform);
  }
  methodname: any
  body: any
  atributesData(form) {
    if (this.amount == true) {
      this.toasterservice.warning("Amount should not be greater than invoice amount")
    }
    else {
      this.spinner.show();
      this.methodname = "sup/supplier_payment/"
      let finaladj = []
      for (let i = 0; i < this.adjustedarray.length; i++) {
        finaladj.push(
          {
            "invqhid": this.adjustedarray[i].invqhid,
            "amount": this.adjustedarray[i].adjustedAmount,
            "tdate": this.payment.tdate,
            "user_ref_no": this.payment.user_ref_no,
            "ctype": this.paymentinvoice.currency,
            "supplierid": this.paymentinvoice.supplierid,
            // "email":this.paymentinvoice.email,
            "email":"Discount",
            "bank_transactionid":this.payment.bank_transactionid
          }
        )
      }
      this.body = finaladj
      this.spinner.show();
      this.globalServicce.postData(this.body, this.methodname).subscribe((data) => {
        this.spinner.hide();
        // console.log(data);
        // if (data['msg'] == 'created successfully') {
        $("#successModal").modal('show');
        this.adjustedarray = []
        this.amount = false
        form.reset();
        // }
      },
        error => {
          this.spinner.hide();
          //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
          // console.log(error);
        })
    }
  }
  updatemodal() {
    this.route.navigateByUrl('Admin-PAYMENTS');
  }
}
