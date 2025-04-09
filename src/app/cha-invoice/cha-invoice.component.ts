import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../global-service.service';
import { DatePipe } from '@angular/common';
import { ToasterService } from '../toastr-service.service';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-cha-invoice',
  standalone: false,
  templateUrl: './cha-invoice.component.html',
  styleUrls: ['./cha-invoice.component.scss']
})
export class ChaInvoiceComponent implements OnInit {
  loginUserData: any;
  p: any = 1;
  orders: any = [];
  orders1: any = [];
  POhidden: boolean = true;
  SOhidden: boolean = false;
  removedata: any;
searchText: any;

  constructor(private DatePipe: DatePipe, private globalServicce: GlobalServiceService, private route: Router, private toasterService: ToasterService, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getPendingChaInv()
  }
  po() {
    this.POhidden = true;
    this.SOhidden = false;
    this.getPendingChaInv()
  }
  getPendingChaInv() {
    if (this.orders) {
      this.orders = []
    }
    this.spinner.show();
    this.globalServicce.getDatawithMethodParams2("sup/documenton/", this.loginUserData.shipment_point,'').subscribe((data: any) => {
        this.orders1 = data.filter((e) => { return e.Status == 1})
        this.orders = this.orders1.filter((e) => { return e.bill_no == null}) 
        console.log(this.orders, "Pending Cha invoice");
        this.spinner.hide();
      // console.log(this.orders)

    },
      error => {
        this.spinner.hide();
        console.log(error);
      });

  };

  so() {
    this.POhidden = false;
    this.SOhidden = true;
    this.getCompletedChaInv()
  }
  getCompletedChaInv() {
    if (this.orders) {
      this.orders = []
      this.orders1 = []
    }
    this.spinner.show();
    this.globalServicce.getDatawithMethodParams2("sup/documenton/", this.loginUserData.shipment_point,'').subscribe((data: any) => {
      this.orders1 = data.filter((e) => { return e.Status == 1})
      this.orders = this.orders1.filter((e) => { return e.bill_no != null}) 
        console.log(this.orders, "Completed Cha invoice");
      this.spinner.hide();
      // console.log(this.orders)

    },
      error => {
        this.spinner.hide();
        console.log(error);
      });

  };
  // ----------------------------------------------------------------------------------------------------------------------------------
    // Cha Invoice
    whapprov: boolean = false;
    cha_inv: any;
    cha_invqhid: any;
    invoiceData: any = [];
    headerdata: any = {};
    chaPrint(data) {
      if(data.whapproval == '1' && this.SOhidden == true){
        this.whapprov = true
        // this.toasterService.error("Stock Already Recieved");
        // return false;
      }
      else{
        this.whapprov = false
       }
      this.getparticulars();
      this.cha_inv = data.inv_no
      this.cha_invqhid = data.invqhid
      this.newAttribute1 = {};
      this.fieldArray= [];
      this.clearcha();
      this.headerdata = { invqhid: data.invqhid }
      this.globalServicce.getDatawithQueryPar('sup/chagetdetails/', this.cha_invqhid).subscribe((respdata: any) => {
        this.invoiceData = respdata;
        this.fieldArray = respdata[0].chadtl;
        if(this.fieldArray.length > 0){
          this.ToTnonreceipted = this.fieldArray.map(a => parseFloat(a.nonreceipted?a.nonreceipted:'0')).reduce(function (a, b) {
            return a + b;
          });
          this.ToTreceipted = this.fieldArray.map(a => parseFloat(a.receipted?a.receipted:'0')).reduce(function (a, b) {
            return a + b;
          });
        }else{
          this.ToTnonreceipted = '';
          this.ToTreceipted = '';
        }

        this.bill_no = this.invoiceData[0].bill_no;
        this.bill_date = this.invoiceData[0].bill_date;
        this.job_no = this.invoiceData[0].chadtl[0].job_no;
        this.job_date = this.DatePipe.transform(this.invoiceData[0].chadtl[0].job_date, "yyyy-MM-dd")
      })
      $(function() {
        $(document).ready(function () { 
            var todaysDate = new Date();
            var year = todaysDate.getFullYear();
            var month = ("0" + (todaysDate.getMonth() + 1)).slice(-2);
            var day = ("0" + todaysDate.getDate()).slice(-2);
            var maxDate = (year +"-"+ month +"-"+ day);
            $('#job_date').attr('max',maxDate);
        });
    });
        $('#ChaInvoiceModal').modal('show');
      // if (data.bill_no) {
      //   this.router.navigateByUrl('/Supplier-Cha-Print?invqhid=' + data.invqhid);
      // } else {
      //   $('#editmodal2').modal('show');
      // }
  
    }
    // ---------------------------------------------------------------

    particulars1: any = [];
    getparticulars() {
      this.globalServicce.getDataOnlyWithMethod("sup/getchaparticulars").subscribe((data) => {
        this.particulars1 = data;
      });
  
    }
    fieldArray: any = []
    // private newAttribute1: any = {};
      newAttribute1: any = {};
      selectedList: any = [];
      added_items: any;
    
      cartbody: any = {};
      count: any = 0;
      ToTnonreceipted: any;
      ToTreceipted: any;
      addFieldValue(newAttribute1) {
          
          // this.toasterService.warning ("Please Fill All The Required Fields")
          // this.fieldArray.push(this.newAttribute1);
          this.fieldArray.push({
            invqhid: this.cha_invqhid,
            particulars: newAttribute1.particulars,
            receiptdetails: newAttribute1.receiptdetails,
            nonreceipted: newAttribute1.nonreceipted?JSON.parse(newAttribute1.nonreceipted):null,
            receipted: newAttribute1.receipted?JSON.parse(newAttribute1.receipted):null
          })
          this.newAttribute1 = {};
          // this.added_items = this.fieldArray.length;
          console.log(this.fieldArray,'this.fieldArray')
          if(this.fieldArray.length > 0){
              this.ToTnonreceipted = this.fieldArray.map(a => parseFloat(a.nonreceipted?a.nonreceipted:'0')).reduce(function (a, b) {
                return a + b;
              });
              this.ToTreceipted = this.fieldArray.map(a => parseFloat(a.receipted?a.receipted:'0')).reduce(function (a, b) {
                return a + b;
              });
          }else{
            this.ToTnonreceipted = '';
            this.ToTreceipted = '';
          }
      }
      clearcha() {
        this.newAttribute1.particulars = '';
       this.newAttribute1.receiptdetails = '';
       this.newAttribute1.nonreceipted = '';
       this.newAttribute1.ReceiptAmt = '';
      }
    add_disable(attr) {
      // let arr = ["particulars", "nonreceipted", "receipted"];
      let arr = ["particulars"];
      for (let i of arr) {
        if (attr[i] == null || attr[i] == undefined) {
    
          return true;
        }
      }
    
      return false;
    }
    deleteFieldValue2(index) {
       this.fieldArray.splice(index, 1);
       if(this.fieldArray.length > 0){
        this.ToTnonreceipted = this.fieldArray.map(a => parseFloat(a.nonreceipted?a.nonreceipted:'0')).reduce(function (a, b) {
          return a + b;
        });
        this.ToTreceipted = this.fieldArray.map(a => parseFloat(a.receipted?a.receipted:'0')).reduce(function (a, b) {
          return a + b;
        });
      }else{
        this.ToTnonreceipted = '';
        this.ToTreceipted = '';
      }
     }
     fieldList: any = [];
     bill_no: any;
     bill_date: any;
     job_no: any;
     job_date: any;
     description: any;
     body: any;
     chainvamount: any;
      submitInv(){
      // localStorage.setItem("ChaInvdata", JSON.stringify(this.fieldArray))
        this.spinner.show();
        for (var i = 0; i < this.fieldArray.length; i++) {
        if(this.fieldArray[i].particulars){
          this.fieldList.push({
            invqhid: this.cha_invqhid,
            particulars: this.fieldArray[i].particulars,
            receiptdetails: this.fieldArray[i].receiptdetails,
            nonreceipted: this.fieldArray[i].nonreceipted,
            receipted: this.fieldArray[i].receipted,
            bill_no: this.bill_no,
            bill_date: this.bill_date,
            job_no: this.job_no,
            job_date: this.job_date,
            // description: this.description,
          })
        }
  
      }
      this.ToTnonreceipted = this.fieldList.map(a => parseFloat(a.nonreceipted?a.nonreceipted:'0')).reduce(function (a, b) {
        return a + b;
      });
      this.ToTreceipted = this.fieldList.map(a => parseFloat(a.receipted?a.receipted:'0')).reduce(function (a, b) {
        return a + b;
      });
      this.chainvamount = this.ToTnonreceipted + this.ToTreceipted;
      $('#ChaInvoiceModal').modal('hide');
      this.body = { "main": { 'chainvamount' : this.chainvamount }, "json_dtl": this.fieldList };
      this.globalServicce.postData(this.body, "sup/chainvoice/").subscribe((resp) => {
        this.spinner.hide();
        // this.toasterService.success("Successfully Updated");
      this.route.navigateByUrl('/Supplier-Cha-Print?invqhid=' + this.cha_invqhid +'&C=CSL');
    },
        error => {
          this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        })
  
  
     }


  printdatadetail(data, type) {
    if (type == 'invoice') {
      this.route.navigateByUrl('/Supplier-Inv-Print?invqhid=' + data +'&C=CHI');
    }
  }

}
