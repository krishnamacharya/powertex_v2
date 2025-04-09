import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { ToasterService } from '../../toastr-service.service';
import { GlobalServiceService } from '../../global-service.service';
import { DataServiceService } from '../../data-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;

@Component({
  selector: 'app-cha-payments',
  standalone: false,
  templateUrl: './cha-payments.component.html',
  styleUrls: ['./cha-payments.component.scss']
})
export class ChaPaymentsComponent implements OnInit {
  maxDate = new Date();
  businessname:any;
  formdata: any;
  obj: any = {};
  masterData: any = {};
  headerdata: any = {};
  currencycodes: any
  givercompanynames: any
  loginUserData: any
  invdetail: any = [];
  constructor(private DatePipe: DatePipe, private router:Router,private toasterService: ToasterService, public globalService: GlobalServiceService, public dataService: DataServiceService, private spinner: NgxSpinnerService, private dialog: MatDialog) {
  }
  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
      this.getdealerslist();
  }
  dealerslist: any = [];
  getdealerslist() {
    return this.globalService.getDatawithMethod1('sup/chalist/').subscribe((resp) => {
      this.dealerslist = resp;
    })
  }
  formdataa: any;
  onSubmit(form: NgForm) {
    console.log(this.masterData.giver_company_name,'sup')
      this.spinner.show();      
    if (this.masterData.amount > 0) {
      this.formdataa = form;
      $("#confirmation").modal('show');
    }
    else {
     this.toasterService.warning("Enter Valid Amount")

    }
    this.spinner.hide();    
  }
  methodname: any;
  company_name: any
  chequedata: any
  masterbankdata: any
  atributesData(form) {
    $("#confirmation").modal('hide');
    this.spinner.show();  
    this.masterData.check_date = this.DatePipe.transform(this.masterData.check_date, "yyyy-MM-dd");
    this.headerdata.chaid = this.masterData.giver_company_name.user_id;
    this.headerdata.transtype = this.masterData.mode_of_payment;
    this.headerdata.date = this.masterData.date;
    this.headerdata.amount = this.masterData.amount;
    this.headerdata. note = this.masterData.remarks?this.masterData.remarks:null;
    this.headerdata. refid = this.masterData.refno;

    this.headerdata. refid = this.masterData.businessname;

    this.methodname = "sup/chapayment/"
    this.globalService.postData(this.headerdata, this.methodname).subscribe((data) => {
      this.spinner.hide();
      this.masterData.giver_company_name = ''
      this.chequedata = data;
      console.log(data);
      this.spinner.hide();
      $("#successModal").modal('show');
      form.reset();
    },
      error => {
        // this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      }
    );
    // this.spinner.hide();
  }

  clear() {
    this.masterData = {};
  }
  keypress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  busname: any;

  onChange(data){
  this.busname = this.masterData.giver_company_name.businessname;
  }


}