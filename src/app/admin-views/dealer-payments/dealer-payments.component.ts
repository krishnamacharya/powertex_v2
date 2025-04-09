import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../../global-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from '../../toastr-service.service';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-dealer-payments',
  standalone: false,
  templateUrl: './dealer-payments.component.html',
  styleUrls: ['./dealer-payments.component.scss']
})
export class DealerPaymentsComponent implements OnInit {
  loginUserData: any;
  dealerpayments: any = [];
  dealers: any = [];
  p: any = 1
  searchText: any
  seq: { seq: any; };
  pro: any;
  currency: any;
  srno: { srno: any; };
SNameExists: any;

  constructor(private globalServicce: GlobalServiceService, private dialog: MatDialog, private spinner: NgxSpinnerService, private toasterService: ToasterService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getdealers();
  }
  getdealers() {
    return this.globalServicce.getDatawithQueryParams2('5.12', this.loginUserData.company_code, 'DEALER').subscribe((data) => {
      this.dealers = data;
      console.log(this.dealers,"dealers");
    })
  }


  getDealersPayments() {
  
    if(!this.pro){
     
      this.toasterService.warning("Select Dealer");
      return false;
    }
    if (this.dealers) {
      let dealer = this.dealers.filter((e) => e.user_id == this.pro)
      this.currency = dealer[0].currency
    }
    this.spinner.show();
    this.globalServicce. getDatawithMethodParams1('paymentdetails/',this.pro).subscribe((data) => {
      this.dealerpayments=data;
      this.spinner.hide();

      if (this.dealerpayments.length < 1) {
      
        $("#WarningModal").modal('show');
  
        }

    //  console.log(this.dealerpayments)
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        // console.log(error);
      });
  };


  dataa : {}
  delete(dt){
    console.log(dt,'dt');
    $("#warng").modal('show');
    this.dataa={'giver_company_code':dt.giver_company_code,'Check_no':dt.Check_no,'Check_date':dt.Check_date,'amount':dt.amount,'transID':dt.transID,'user_id':this.loginUserData.user_id}  
    // this.srno=dt.srno

  }
  confrm(){
    this.globalServicce.postData(this.dataa,'paymentcancel/').subscribe((resp) => {
    $("#success").modal('show');
    this.getDealersPayments();
     },
     error => {        
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
    })
    $("#success").modal('hide');
  }

}