import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../global-service.service';
import { ToasterService } from '../toastr-service.service';
import * as fileSaver from 'file-saver';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-be-entry',
  standalone: false,
  templateUrl: './be-entry.component.html',
  styleUrls: ['./be-entry.component.scss']
})
export class BeEntryComponent implements OnInit {
  loginUserData: any
  imgheight1:any;
  imgheight:any;
  pro: any = {};
  productdata: any = []
  selectedlist: any = []
  headerdata: any = {}
  p: any = 1
  searchText: any
  finalform: any;
  invoiceData: any = [];
  imagedata: { image: any; userid: any; processes: string; };
  response: any;
  PUrl: any;

  constructor(private toasterService: ToasterService, private Actroute: ActivatedRoute, private route: Router, private globalService: GlobalServiceService, private dialog: MatDialog, private spinner: NgxSpinnerService) {
    
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.invoiceData = JSON.parse(localStorage.getItem('invoiceData'));
    this.Actroute.queryParams.subscribe(params => {
      if (params['invqhid']) {
        this.globalService.getDatawithQueryPar('sup/getbedetails/', params['invqhid']).subscribe((data: any) => {
          this.productdata = data
          if(this.productdata[0].exerate){
            this.pro.exchange_rate = this.productdata[0].exerate
            // this.ex_rate(this.pro.exchange_rate);
            for (var i = 0; i < this.productdata.length; i++) {
              this.productdata[i].product_name = this.productdata[i].name1 + ' ' + this.productdata[i].modelno
             }

             this.pro.assvalue = this.productdata.map(a => parseFloat(a.amount?a.amount:'0')).reduce(function (a, b) {
              return a + b;
             });
             this.totTamount();

          }else{
            for (var i = 0; i < this.productdata.length; i++) {
              this.productdata[i].product_name = this.productdata[i].name1 + ' ' + this.productdata[i].modelno
              this.productdata[i].amount = ''
              this.productdata[i].Cus_duty = 10
              this.productdata[i].Exe_duty = 0
              this.productdata[i].Edu_cess = 0
              this.productdata[i].H_Edu_cess = 0
              this.productdata[i].Cus_Edu_cess = 0
              this.productdata[i].H_cus_Edu_cess = 0
              this.productdata[i].S_W_Cess = 10
              this.productdata[i].iGST = 18
            }
          }
          console.log(this.productdata,'BE entryyy')

        })
      } 
    });
  }

  ngOnInit() {
   this.PUrl = window.location.href.substr(window.location.href.length - 5)
    this.pro.sup_name = this.invoiceData.business_name
    this.pro.inv_num = this.invoiceData.inv_no
    this.pro.inv_dt = this.invoiceData.invdate
    this.pro.inv_val = this.invoiceData.Amount
    this.pro.be_no = this.invoiceData.be_no
    this.pro.be_date = this.invoiceData.be_date
    this.pro.billofentry = this.invoiceData.billofentry
    // this.image = this.pro.billofentry ? this.globalServicce.imageurl + this.pro.billofentry : ''
    this.image1 = this.invoiceData.billofentry ? this.alticonfunc(this.invoiceData.billofentry) : ''
    // if(this.invoiceData.billofentry){
    //   this.headerdata = { billofentry: this.invoiceData.billofentry }
    // }
    console.log(this.pro.billofentry,'img')
  }

  productlist: any = []
  rows: any = []
  keynumber(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  keyfloat(event: any) {
    const pattern = /[.0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  ex_rate(ex_rate){
    for (var i = 0; i < this.productdata.length; i++) {
      this.productdata[i].amount = (((this.productdata[i].price * ex_rate)*this.productdata[i].qty).toFixed(4));
      this.productdata[i].Cus_amount = (((this.productdata[i].amount * this.productdata[i].Cus_duty) / 100).toFixed(4));
      this.productdata[i].Exe_amount = (((this.productdata[i].amount * this.productdata[i].Exe_duty) / 100).toFixed(4));
      this.productdata[i].Edu_amount = (((this.productdata[i].Exe_amount * this.productdata[i].Edu_cess) / 100).toFixed(4));
      this.productdata[i].H_Edu_cess_amout = (((this.productdata[i].Exe_amount * this.productdata[i].H_Edu_cess) / 100).toFixed(4));
      this.productdata[i].Cus_Edu_cess_amount = (((this.productdata[i].Cus_amount * this.productdata[i].Cus_Edu_cess) / 100).toFixed(4));
      this.productdata[i].H_cus_Edu_cess_amout = (((this.productdata[i].Cus_amount * this.productdata[i].H_cus_Edu_cess) / 100).toFixed(4));
      this.productdata[i].S_W_Cess_amount = (((this.productdata[i].Cus_amount * this.productdata[i].S_W_Cess) / 100).toFixed(4));
      this.productdata[i].IGSTAmount = (((this.productdata[i].price * ex_rate)*this.productdata[i].qty) + ((this.productdata[i].Cus_amount * this.productdata[i].H_cus_Edu_cess) / 100) + ((this.productdata[i].Cus_amount * this.productdata[i].Cus_Edu_cess) / 100) + ((this.productdata[i].Exe_amount * this.productdata[i].H_Edu_cess) / 100) + ((this.productdata[i].Exe_amount * this.productdata[i].Edu_cess) / 100) + ((this.productdata[i].amount * this.productdata[i].Cus_duty) / 100) + ((this.productdata[i].amount * this.productdata[i].Exe_duty) / 100) + ((this.productdata[i].Cus_amount * this.productdata[i].S_W_Cess) / 100)) * this.productdata[i].iGST / 100
      this.productdata[i].tamounts = (((this.productdata[i].Cus_amount * this.productdata[i].H_cus_Edu_cess) / 100) + ((this.productdata[i].Cus_amount * this.productdata[i].Cus_Edu_cess) / 100) + ((this.productdata[i].Exe_amount * this.productdata[i].H_Edu_cess) / 100) + ((this.productdata[i].Exe_amount * this.productdata[i].Edu_cess) / 100) + ((this.productdata[i].amount * this.productdata[i].Cus_duty) / 100) + ((this.productdata[i].amount * this.productdata[i].Exe_duty) / 100) + ((this.productdata[i].Cus_amount * this.productdata[i].S_W_Cess) / 100) + (((this.productdata[i].price * ex_rate)*this.productdata[i].qty) + ((this.productdata[i].Cus_amount * this.productdata[i].H_cus_Edu_cess) / 100) + ((this.productdata[i].Cus_amount * this.productdata[i].Cus_Edu_cess) / 100) + ((this.productdata[i].Exe_amount * this.productdata[i].H_Edu_cess) / 100) + ((this.productdata[i].Exe_amount * this.productdata[i].Edu_cess) / 100) + ((this.productdata[i].amount * this.productdata[i].Cus_duty) / 100) + ((this.productdata[i].amount * this.productdata[i].Exe_duty) / 100) + ((this.productdata[i].Cus_amount * this.productdata[i].S_W_Cess) / 100)) * this.productdata[i].iGST / 100).toFixed(4);
    }
    
    this.pro.assvalue = this.productdata.map(a => parseFloat(a.amount?a.amount:'0')).reduce(function (a, b) {
      return a + b;
    });
    this.totTamount();
  }
  CusDuty(product){
    product.Cus_amount = (((product.amount * product.Cus_duty) / 100).toFixed(4));
    product.Cus_Edu_cess_amount = (((product.Cus_amount * product.Cus_Edu_cess) / 100).toFixed(4));
    product.H_cus_Edu_cess_amout = (((product.Cus_amount * product.H_cus_Edu_cess) / 100).toFixed(4));
    product.S_W_Cess_amount = (((product.Cus_amount * product.S_W_Cess) / 100).toFixed(4));
    product.IGSTAmount = (((product.price * this.pro.exchange_rate) * product.qty) + ((product.Cus_amount * product.H_cus_Edu_cess) / 100) + ((product.Cus_amount * product.Cus_Edu_cess) / 100) + ((product.Exe_amount * product.H_Edu_cess) / 100) + ((product.Exe_amount * product.Edu_cess) / 100) + ((product.amount * product.Cus_duty) / 100) + ((product.amount * product.Exe_duty) / 100) + ((product.Cus_amount * product.S_W_Cess) / 100)) * product.iGST / 100
    product.tamounts = (((product.Cus_amount * product.H_cus_Edu_cess) / 100) + ((product.Cus_amount * product.Cus_Edu_cess) / 100) + ((product.Exe_amount * product.H_Edu_cess) / 100) + ((product.Exe_amount * product.Edu_cess) / 100) + ((product.amount * product.Cus_duty) / 100) + ((product.amount * product.Exe_duty) / 100) + ((product.Cus_amount * product.S_W_Cess) / 100) + (((product.price * this.pro.exchange_rate) * product.qty) + ((product.Cus_amount * product.H_cus_Edu_cess) / 100) + ((product.Cus_amount * product.Cus_Edu_cess) / 100) + ((product.Exe_amount * product.H_Edu_cess) / 100) + ((product.Exe_amount * product.Edu_cess) / 100) + ((product.amount * product.Cus_duty) / 100) + ((product.amount * product.Exe_duty) / 100) + ((product.Cus_amount * product.S_W_Cess) / 100)) * product.iGST / 100).toFixed(4);
      console.log(product.Cus_amount,'Cus_amount')
      this.totTamount();
  }
  ExeDuty(product){
    product.Exe_amount = (((product.amount * product.Exe_duty) / 100).toFixed(4));
    product.Edu_amount = (((product.Exe_amount * product.Edu_cess) / 100).toFixed(4));
    product.H_Edu_cess_amout = (((product.Exe_amount * product.H_Edu_cess) / 100).toFixed(4));
    product.IGSTAmount = (((product.price * this.pro.exchange_rate) * product.qty) + ((product.Cus_amount * product.H_cus_Edu_cess) / 100) + ((product.Cus_amount * product.Cus_Edu_cess) / 100) + ((product.Exe_amount * product.H_Edu_cess) / 100) + ((product.Exe_amount * product.Edu_cess) / 100) + ((product.amount * product.Cus_duty) / 100) + ((product.amount * product.Exe_duty) / 100) + ((product.Cus_amount * product.S_W_Cess) / 100)) * product.iGST / 100
    product.tamounts = (((product.Cus_amount * product.H_cus_Edu_cess) / 100) + ((product.Cus_amount * product.Cus_Edu_cess) / 100) + ((product.Exe_amount * product.H_Edu_cess) / 100) + ((product.Exe_amount * product.Edu_cess) / 100) + ((product.amount * product.Cus_duty) / 100) + ((product.amount * product.Exe_duty) / 100) + ((product.Cus_amount * product.S_W_Cess) / 100) + (((product.price * this.pro.exchange_rate) * product.qty) + ((product.Cus_amount * product.H_cus_Edu_cess) / 100) + ((product.Cus_amount * product.Cus_Edu_cess) / 100) + ((product.Exe_amount * product.H_Edu_cess) / 100) + ((product.Exe_amount * product.Edu_cess) / 100) + ((product.amount * product.Cus_duty) / 100) + ((product.amount * product.Exe_duty) / 100) + ((product.Cus_amount * product.S_W_Cess) / 100)) * product.iGST / 100).toFixed(4);
      console.log(product.Exe_amount,'Exe_amount')
      this.totTamount();
  }
  EduCess(product){
    product.Edu_amount = (((product.Exe_amount * product.Edu_cess) / 100).toFixed(4));
    product.IGSTAmount = (((product.price * this.pro.exchange_rate) * product.qty) + ((product.Cus_amount * product.H_cus_Edu_cess) / 100) + ((product.Cus_amount * product.Cus_Edu_cess) / 100) + ((product.Exe_amount * product.H_Edu_cess) / 100) + ((product.Exe_amount * product.Edu_cess) / 100) + ((product.amount * product.Cus_duty) / 100) + ((product.amount * product.Exe_duty) / 100) + ((product.Cus_amount * product.S_W_Cess) / 100)) * product.iGST / 100
    product.tamounts = (((product.Cus_amount * product.H_cus_Edu_cess) / 100) + ((product.Cus_amount * product.Cus_Edu_cess) / 100) + ((product.Exe_amount * product.H_Edu_cess) / 100) + ((product.Exe_amount * product.Edu_cess) / 100) + ((product.amount * product.Cus_duty) / 100) + ((product.amount * product.Exe_duty) / 100) + ((product.Cus_amount * product.S_W_Cess) / 100) + (((product.price * this.pro.exchange_rate) * product.qty) + ((product.Cus_amount * product.H_cus_Edu_cess) / 100) + ((product.Cus_amount * product.Cus_Edu_cess) / 100) + ((product.Exe_amount * product.H_Edu_cess) / 100) + ((product.Exe_amount * product.Edu_cess) / 100) + ((product.amount * product.Cus_duty) / 100) + ((product.amount * product.Exe_duty) / 100) + ((product.Cus_amount * product.S_W_Cess) / 100)) * product.iGST / 100).toFixed(4);
      console.log(product.Edu_amount,'Edu_amount')
      this.totTamount();
  }
  HEduCess(product){
    product.H_Edu_cess_amout = (((product.Exe_amount * product.H_Edu_cess) / 100).toFixed(4));
    product.IGSTAmount = (((product.price * this.pro.exchange_rate) * product.qty) + ((product.Cus_amount * product.H_cus_Edu_cess) / 100) + ((product.Cus_amount * product.Cus_Edu_cess) / 100) + ((product.Exe_amount * product.H_Edu_cess) / 100) + ((product.Exe_amount * product.Edu_cess) / 100) + ((product.amount * product.Cus_duty) / 100) + ((product.amount * product.Exe_duty) / 100) + ((product.Cus_amount * product.S_W_Cess) / 100)) * product.iGST / 100
    product.tamounts = (((product.Cus_amount * product.H_cus_Edu_cess) / 100) + ((product.Cus_amount * product.Cus_Edu_cess) / 100) + ((product.Exe_amount * product.H_Edu_cess) / 100) + ((product.Exe_amount * product.Edu_cess) / 100) + ((product.amount * product.Cus_duty) / 100) + ((product.amount * product.Exe_duty) / 100) + ((product.Cus_amount * product.S_W_Cess) / 100) + (((product.price * this.pro.exchange_rate) * product.qty) + ((product.Cus_amount * product.H_cus_Edu_cess) / 100) + ((product.Cus_amount * product.Cus_Edu_cess) / 100) + ((product.Exe_amount * product.H_Edu_cess) / 100) + ((product.Exe_amount * product.Edu_cess) / 100) + ((product.amount * product.Cus_duty) / 100) + ((product.amount * product.Exe_duty) / 100) + ((product.Cus_amount * product.S_W_Cess) / 100)) * product.iGST / 100).toFixed(4);
      console.log(product.H_Edu_cess_amout,'H_Edu_cess_amout')
      this.totTamount();
  }
  CusEduCess(product){
    product.Cus_Edu_cess_amount = (((product.Cus_amount * product.Cus_Edu_cess) / 100).toFixed(4));
    product.IGSTAmount = (((product.price * this.pro.exchange_rate) * product.qty) + ((product.Cus_amount * product.H_cus_Edu_cess) / 100) + ((product.Cus_amount * product.Cus_Edu_cess) / 100) + ((product.Exe_amount * product.H_Edu_cess) / 100) + ((product.Exe_amount * product.Edu_cess) / 100) + ((product.amount * product.Cus_duty) / 100) + ((product.amount * product.Exe_duty) / 100) + ((product.Cus_amount * product.S_W_Cess) / 100)) * product.iGST / 100
    product.tamounts = (((product.Cus_amount * product.H_cus_Edu_cess) / 100) + ((product.Cus_amount * product.Cus_Edu_cess) / 100) + ((product.Exe_amount * product.H_Edu_cess) / 100) + ((product.Exe_amount * product.Edu_cess) / 100) + ((product.amount * product.Cus_duty) / 100) + ((product.amount * product.Exe_duty) / 100) + ((product.Cus_amount * product.S_W_Cess) / 100) + (((product.price * this.pro.exchange_rate) * product.qty) + ((product.Cus_amount * product.H_cus_Edu_cess) / 100) + ((product.Cus_amount * product.Cus_Edu_cess) / 100) + ((product.Exe_amount * product.H_Edu_cess) / 100) + ((product.Exe_amount * product.Edu_cess) / 100) + ((product.amount * product.Cus_duty) / 100) + ((product.amount * product.Exe_duty) / 100) + ((product.Cus_amount * product.S_W_Cess) / 100)) * product.iGST / 100).toFixed(4);
      console.log(product.Cus_Edu_cess_amount,'Cus_Edu_cess_amount')
      this.totTamount();
  }
  HCusEduCess(product){
    product.H_cus_Edu_cess_amout = (((product.Cus_amount * product.H_cus_Edu_cess) / 100).toFixed(4));
    product.IGSTAmount = (((product.price * this.pro.exchange_rate) * product.qty) + ((product.Cus_amount * product.H_cus_Edu_cess) / 100) + ((product.Cus_amount * product.Cus_Edu_cess) / 100) + ((product.Exe_amount * product.H_Edu_cess) / 100) + ((product.Exe_amount * product.Edu_cess) / 100) + ((product.amount * product.Cus_duty) / 100) + ((product.amount * product.Exe_duty) / 100) + ((product.Cus_amount * product.S_W_Cess) / 100)) * product.iGST / 100
    product.tamounts = (((product.Cus_amount * product.H_cus_Edu_cess) / 100) + ((product.Cus_amount * product.Cus_Edu_cess) / 100) + ((product.Exe_amount * product.H_Edu_cess) / 100) + ((product.Exe_amount * product.Edu_cess) / 100) + ((product.amount * product.Cus_duty) / 100) + ((product.amount * product.Exe_duty) / 100) + ((product.Cus_amount * product.S_W_Cess) / 100) + (((product.price * this.pro.exchange_rate) * product.qty) + ((product.Cus_amount * product.H_cus_Edu_cess) / 100) + ((product.Cus_amount * product.Cus_Edu_cess) / 100) + ((product.Exe_amount * product.H_Edu_cess) / 100) + ((product.Exe_amount * product.Edu_cess) / 100) + ((product.amount * product.Cus_duty) / 100) + ((product.amount * product.Exe_duty) / 100) + ((product.Cus_amount * product.S_W_Cess) / 100)) * product.iGST / 100).toFixed(4);
      console.log(product.H_cus_Edu_cess_amout,'H_cus_Edu_cess_amout')
      this.totTamount();
  }
  SWCess(product){
    product.S_W_Cess_amount = (((product.Cus_amount * product.S_W_Cess) / 100).toFixed(4));
    product.IGSTAmount = (((product.price * this.pro.exchange_rate) * product.qty) + ((product.Cus_amount * product.H_cus_Edu_cess) / 100) + ((product.Cus_amount * product.Cus_Edu_cess) / 100) + ((product.Exe_amount * product.H_Edu_cess) / 100) + ((product.Exe_amount * product.Edu_cess) / 100) + ((product.amount * product.Cus_duty) / 100) + ((product.amount * product.Exe_duty) / 100) + ((product.Cus_amount * product.S_W_Cess) / 100)) * product.iGST / 100
    product.tamounts = (((product.Cus_amount * product.H_cus_Edu_cess) / 100) + ((product.Cus_amount * product.Cus_Edu_cess) / 100) + ((product.Exe_amount * product.H_Edu_cess) / 100) + ((product.Exe_amount * product.Edu_cess) / 100) + ((product.amount * product.Cus_duty) / 100) + ((product.amount * product.Exe_duty) / 100) + ((product.Cus_amount * product.S_W_Cess) / 100) + (((product.price * this.pro.exchange_rate) * product.qty) + ((product.Cus_amount * product.H_cus_Edu_cess) / 100) + ((product.Cus_amount * product.Cus_Edu_cess) / 100) + ((product.Exe_amount * product.H_Edu_cess) / 100) + ((product.Exe_amount * product.Edu_cess) / 100) + ((product.amount * product.Cus_duty) / 100) + ((product.amount * product.Exe_duty) / 100) + ((product.Cus_amount * product.S_W_Cess) / 100)) * product.iGST / 100).toFixed(4);
      console.log(product.S_W_Cess_amount,'S_W_Cess_amount')
      this.totTamount();
  }
  iGSTt(product){
    product.IGSTAmount = (((product.price * this.pro.exchange_rate) * product.qty) + ((product.Cus_amount * product.H_cus_Edu_cess) / 100) + ((product.Cus_amount * product.Cus_Edu_cess) / 100) + ((product.Exe_amount * product.H_Edu_cess) / 100) + ((product.Exe_amount * product.Edu_cess) / 100) + ((product.amount * product.Cus_duty) / 100) + ((product.amount * product.Exe_duty) / 100) + ((product.Cus_amount * product.S_W_Cess) / 100)) * product.iGST / 100
    product.tamounts = (((product.Cus_amount * product.H_cus_Edu_cess) / 100) + ((product.Cus_amount * product.Cus_Edu_cess) / 100) + ((product.Exe_amount * product.H_Edu_cess) / 100) + ((product.Exe_amount * product.Edu_cess) / 100) + ((product.amount * product.Cus_duty) / 100) + ((product.amount * product.Exe_duty) / 100) + ((product.Cus_amount * product.S_W_Cess) / 100) + (((product.price * this.pro.exchange_rate) * product.qty) + ((product.Cus_amount * product.H_cus_Edu_cess) / 100) + ((product.Cus_amount * product.Cus_Edu_cess) / 100) + ((product.Exe_amount * product.H_Edu_cess) / 100) + ((product.Exe_amount * product.Edu_cess) / 100) + ((product.amount * product.Cus_duty) / 100) + ((product.amount * product.Exe_duty) / 100) + ((product.Cus_amount * product.S_W_Cess) / 100)) * product.iGST / 100).toFixed(4);
      console.log(product.IGSTAmount,'IGSTAmount')
      this.totTamount();
  }
  totTamount(){
    this.pro.dutyvalue = this.productdata.map(a => parseFloat(a.tamounts?a.tamounts:'0')).reduce(function (a, b) {
      return a + b;
    });
  }
  alticonfunc(filename) {
    if (filename.includes('.pdf')) {
      return 'https://img.icons8.com/color/50/000000/pdf.png';
    } else if (filename.includes('.xls')) {
      return 'https://img.icons8.com/color/50/000000/ms-excel.png';
    } else if (filename.includes('.doc')) {
      return 'https://img.icons8.com/color/50/000000/ms-excel.png';
    } else {
      return this.globalService.imageurl + filename;
    }
  }
  tat:any;
  totpamt : any;
  onSubmit(form: NgForm) {
    this.selectedlist=[];
    this.body = {};
    console.log(this.productdata,'productdata')
    // console.log(this.productdata[i].productid,'productid')
    if(!this.pro.exchange_rate){
      this.toasterService.error("Please Add Products")
      return false
    }else{
      console.log('shekhar')
      // this.headerdata.billofentry= this.pro.billofentry?this.pro.billofentry:null;
      this.headerdata.billofentry= this.response.image;
      this.headerdata.be_no = this.pro.be_no
      this.headerdata.be_date = this.pro.be_date
      for (var i = 0; i < this.productdata.length; i++) {
        this.selectedlist.push({
        productid : this.productdata[i].ProductID,
        invqhid : this.productdata[i].invqhid,
        amount : this.productdata[i].amount,
        qty : this.productdata[i].qty,
        price : this.productdata[i].price,
        cus_duty : this.productdata[i].Cus_duty,
        cus_amount : this.productdata[i].Cus_amount,
        exe_duty : this.productdata[i].Exe_duty,
        exe_amount : this.productdata[i].Exe_amount,
        edu_cess : this.productdata[i].Edu_cess,
        edu_amount : this.productdata[i].Edu_amount,
        h_edu_cess : this.productdata[i].H_Edu_cess,
        h_edu_cess_amout : this.productdata[i].H_Edu_cess_amout,
        cus_edu_cess : this.productdata[i].Cus_Edu_cess,
        cus_edu_cess_amount : this.productdata[i].Cus_Edu_cess_amount,
        h_cus_edu_cess : this.productdata[i].H_cus_Edu_cess,
        h_cus_edu_cess_amout : this.productdata[i].H_cus_Edu_cess_amout,
        s_w_cess : this.productdata[i].S_W_Cess,
        s_w_cess_amount : this.productdata[i].S_W_Cess_amount,
        igst : this.productdata[i].iGST,
        igstamount : this.productdata[i].IGSTAmount.toFixed(4),
        tamount : this.productdata[i].tamounts,
        assvalue : this.pro.assvalue.toFixed(4),
        dutyvalue : this.pro.dutyvalue.toFixed(4),
        exerate : this.pro.exchange_rate
      })

    }
      $("#viewpoModal").modal('show');
    }
    console.log(this.selectedlist,'end')
    // this.finalform = form
  }
  confirmmodal() {
    this.atributesData(this.finalform);
  }
  methodname: any
  body: any
  postD: any
  atributesData(form) {
    // console.log("body", this.body)
    // this.spinner.show();
    this.methodname = "sup/bedetailpost/"
    this.body = { "json_hdr": this.headerdata, "json_dtl": this.selectedlist };
    this.globalService.postData(this.body, this.methodname).subscribe((data) => {
      this.postD = data;
      this.spinner.hide();
      console.log(data);
        $("#succModal").modal('show');
      //   form.reset();
        this.selectedlist = []
        this.productdata = []
      this.spinner.hide();
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal:true }
        });
        // console.log(error);
      })
      this.spinner.hide();

  }

  goto(){
    this.route.navigateByUrl('/dashboard');
    // this.route.navigateByUrl("['/Invoice-Documents','Completed']"); 
  }

  image1: any
  file1: File
  productfileUpload(fileInput: any) {
    this.file1 = <File>fileInput.target.files[0];
    this.preview3();///
  }
  preview3() {
    // Show preview 
    // var mimeType = this.file1.type;
    // if (mimeType.match(/image\/*/) == null) {
    //   return;
    // }

    var reader = new FileReader();
    reader.readAsDataURL(this.file1);
    reader.onload = (_event) => {
      this.image1 = reader.result;
     this. productimageupload()
    }
  }
  productimageupload() {
    this.spinner.show()
    this.methodname = "FileUploadView/";

    this.imagedata = { "image": this.image1, "userid": this.loginUserData.user_id, "processes": "import" }
    this.globalService.postData(this.imagedata, this.methodname).subscribe((data) => {
      this.response = data;
      console.log(this.response.image,'shekhar')
      this.headerdata.billofentry = this.response.image
      this.spinner.hide()
    })
  }
  downloadBEimage(BEpath, inv_no) {
    if (BEpath) {
      let blob: any = new Blob([BEpath], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;

      // var count = (packmodpath.match(/media/g) || []).length;
      // if (count > 1) {
      //   packmodpath = packmodpath.replace(/\/media/, '')
      // }
      fileSaver.saveAs(this.globalService.imageurl + BEpath, inv_no +"_BE_Image." + BEpath.substr(BEpath.length - 5).split('.')[1]);
    }
  }
}
