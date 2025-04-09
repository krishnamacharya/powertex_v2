import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../../global-service.service';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-discounts',
  standalone: false,
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent implements OnInit {
  loginUserData:any
  // AChidden:boolean=false
  AChidden:boolean=true
  INhidden:boolean=false
  PENhidden:boolean=false
  param2:any
  page: any = 1;
searchText: any;
  constructor(private dialog: MatDialog, private spinner: NgxSpinnerService, private service:GlobalServiceService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    // this.param2='p'
    this.param2='A'
    this.getdealerdiscounts()
  }
pen(){
  this.PENhidden=true
  this.AChidden=false
  this.INhidden=false
  this.param2='p'
  this.getdealerdiscounts()
}
ac(){
  this.PENhidden=false
  this.AChidden=true
  this.INhidden=false
  this.param2='A'
  this.getdealerdiscounts()
}
in(){
  this.PENhidden=false
  this.AChidden=false
  this.INhidden=true
  this.param2='I'
  this.getdealerdiscounts()
}
  param1:any
  discounts:any=[]
  getdealerdiscounts(){
    this.spinner.show();
    this.param1 = this.loginUserData.user_id
    this.service.getDatawithMethodParams2('market/drop/', this.param1,this.param2).subscribe(resp => {
      if(resp){
        this.discounts = resp;
        this.spinner.hide();
      }
    },
    error => {
      this.spinner.hide();
      this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      // console.log(error);
    })
  }
  dealerdata:any
  viewInfo(data) {
    this.dealerdata = data
    $('#viewpoModal1').modal('show');
  };
}
