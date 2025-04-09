import { Component, OnInit } from '@angular/core';
import {GlobalServiceService} from '../../global-service.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
import { MatDialog } from '@angular/material/dialog';
declare var $: any;
@Component({
  selector: 'app-orders-approval',
  standalone: false,
  templateUrl: './orders-approval.component.html',
  styleUrls: ['./orders-approval.component.scss']
})
export class OrdersApprovalComponent implements OnInit {
  loginUserData:any
  customerdata:any
  POhidden: boolean = true;
  DOhidden: boolean = false;
  OUThidden: boolean = false;
  p:any=1
  body:any
  searchText:any;
  page1:any=1
  page2:any=1
  customerdata1:any
  constructor(private globalservice:GlobalServiceService,private ngxspinner:NgxSpinnerService,private dialog: MatDialog) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
   
    this.getpackinginapproved()
  }
  po(){
    this.POhidden= true;
    this.DOhidden=false
    this.OUThidden=false
    this.getpackinginapproved()
  }
  do(){
    this.POhidden= false;
    this.OUThidden=false
    this.DOhidden=true
    this.getdealerdropdown()
  }
  out(){
    this.POhidden= false;
    this.OUThidden=true
    this.DOhidden=false
    this.getoutstanding()
  }
  getdealerdropdown() {
    this.ngxspinner.show()
    return this.globalservice.getDatawithMethodParams1('market/invapprov',this.loginUserData.company_code).subscribe((resp) => {
      console.log(resp);
      this.ngxspinner.hide()
      this.customerdata = resp;
      console.log(this.customerdata,"customerdata")
    })
  }
  outstandingdata:any
  getoutstanding(){
    this.ngxspinner.show()
    return this.globalservice.getDatawithMethodParams1('market/drop',this.loginUserData.user).subscribe((resp) => {
      console.log(resp);
      this.ngxspinner.hide()
      this.outstandingdata = resp;
      console.log(this.outstandingdata,"outstandingdata")
    })
  }
  approve(item){

if(item.due==0 && item.camount>0 ){
    this.body={'seq_no':item.seq_no,'credit_period':item.credit_period,'payment_terms':item.creditamount}
}
else if(item.due>0 && item.camount==0){
  this.body={'seq_no':item.seq_no,'credit_period':item.days,'payment_terms':item.payment_terms}
}
else if(item.due>0 && item.camount>0){

  this.body={'seq_no':item.seq_no,'credit_period':item.days,'payment_terms':item.creditamount}
}

    return this.globalservice.postData(this.body,'market/invapprov/').subscribe((resp) => {
      console.log(resp);
      
      this.getdealerdropdown()
      $("#success").modal('show');
      console.log(this.customerdata,"customerdata")
    },
    error => {
     
      this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
    });
   
  }

  getpackinginapproved() {
    this.ngxspinner.show()
    return this.globalservice.getDatawithMethodParams1('dueatpacking',this.loginUserData.company_code).subscribe((resp) => {
      console.log(resp);
      this.ngxspinner.hide()
      this.customerdata1 = resp;
      console.log(this.customerdata,"customerdata")
    })
  }

  packingapprove(item){

      this.body={'print':item.print,'credit_period':item.days,'payment_terms':item.payment_terms}
    
        return this.globalservice.postData(this.body,'dueatpacking/').subscribe((resp) => {
          console.log(resp);
         
          this.getpackinginapproved()
          $("#success").modal('show');
          console.log(this.customerdata1,"customerdata1")
        },
        error => {
         
          this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        });
       
      }
      
 outstandingapprove(item){
        this.body={"company_code": item.company_code,"amount": item.outstanding}
    
        return this.globalservice.postData(this.body,'market/superadmin/').subscribe((resp) => {
          console.log(resp);
         
          this.getoutstanding()
          $("#success").modal('show');
          // console.log(this.customerdata1,"customerdata1")
        },
        error => {
         
          this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        });
      }
}
