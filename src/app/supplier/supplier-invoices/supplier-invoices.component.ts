import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { ToasterService } from '../../toastr-service.service';
import { GlobalServiceService } from '../../global-service.service';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-supplier-invoices',
  standalone: false,
  templateUrl: './supplier-invoices.component.html',
  styleUrls: ['./supplier-invoices.component.scss']
})
export class SupplierInvoicesComponent implements OnInit {

  orders: any = [];
  orders1:any = [];
  p: any = 1;
  searchText: any;
  loginUserData: any;
  totalpaid: any;
  totalinvoice: any;
  fromdate: any;
  tilldate: any;
  maxdate: any;
  loginUserid: any;
  constructor(private router: Router,private DatePipe: DatePipe, private toasterService: ToasterService, private globalServicce: GlobalServiceService, private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }


  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    // this.getorders()
    if(this.loginUserData.user_type== 'supplier'){
      this.loginUserid = this.loginUserData.user_id;
    }else{
      this.loginUserid = '';
    }
    this.fromdate = new Date('2020-03-01')
    this.tilldate = new Date()
    this.getinvregister();
  }
  getinvregister() {
    if (this.orders) {
      this.orders = []
    }
    this.spinner.show();
    let from, till;
    if (this.fromdate && this.tilldate) {
      from = this.DatePipe.transform(this.fromdate, "yyyy-MM-dd")
      till = this.DatePipe.transform(this.tilldate, "yyyy-MM-dd")
    } else {
      from = this.DatePipe.transform(new Date('1900-01-01'), "yyyy-MM-dd");
      till = this.DatePipe.transform(new Date(), "yyyy-MM-dd");
    }
    this.globalServicce.getDatawithMethodParams3('sup/getsupinvregister/', this.loginUserid, from, till).subscribe((data) => {
      if (this.orders) {
        this.orders = []
      }
      this.orders = data;
      this.orders1 = data;
      this.spinner.hide();
      // console.log(this.orders)

    },
      error => {
        this.spinner.hide();
        console.log(error);
      });

  };
  editinv(data){
     this.globalServicce.getcheckdata('sup/checkinvedit/', data.INVQHID).subscribe((resp) => {
      console.log(resp);
      if (resp['status'] == '1') {
        localStorage.setItem('invData', JSON.stringify(data));
        // this.route.navigateByUrl('/Supplier-Edit-Invoice?invqhid=' + data);
        this.route.navigateByUrl('/Supplier-Edit-Invoice');
      }else{
        this.toasterService.error("Cannot Edit Invoice Already Dispatched");
      }
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      })
  }
  invqhid1 :any
  delinv1(data){
    this.invqhid1 = data;
    $('#delinv1').modal('show');
  }
  body:any
  delinv(){
    $('#delinv1').modal('hide');
    this.body= {'invqhid': this.invqhid1};
    this.globalServicce.postData(this.body, "sup/deletelInvoice/").subscribe((resp) => {
      console.log(resp);
      if (resp['status'] == '1') {
      $('#deleteInv').modal('show');
      this.getinvregister();
      }else{
        this.toasterService.warning("Cannot Delete Already Dispatched");
      }
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      })
  }
  printdatadetail(data, type) {
    if (type == 'invoice') {
      // this.route.navigateByUrl('/Supplier-Proforma Invoice Print?invqhid=' + data);
      this.route.navigateByUrl('/Supplier-Inv-Print?invqhid=' + data +'&A=Inv');
    }
    //  else
    //   if (type == 'po') {
    //     this.route.navigateByUrl('/Supplier-PO Print?po=' + data);
    //   }
  }


  printreport(){
    localStorage.setItem('orders', JSON.stringify(this.orders));
    this.router.navigate(['/supplier-invoices-supplier-print'])
  }

}
