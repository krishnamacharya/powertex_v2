import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalServiceService } from '../global-service.service';
import { DataServiceService } from '../data-service.service';
import { ComponentCommunicationService } from '.././component-communication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { formatDate } from "@angular/common";
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from './../toastr-service.service';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
@Component({
  selector: 'app-online-purchase',
  standalone: false,
  templateUrl: './online-purchase.component.html',
  styleUrls: ['./online-purchase.component.scss']
})
export class OnlinePurchaseComponent implements OnInit {
reg: any;
viewMore(arg0: any) {
throw new Error('Method not implemented.');
}
  loginUserData: any;
  input_id: string;
  response1: any = [];
  response2: any;
  data: any;
  data2: any;
  page: any = 1;
  page1: any = 1;
  patch1: any = [];
  patching: any;
  searchText: any;
panelOpenState: any;

  constructor(private dialog: MatDialog, private _formBuilder: FormBuilder, private route: Router, public globalService: GlobalServiceService, public dataservice: DataServiceService, private activeRoute: ActivatedRoute, private eventemit: ComponentCommunicationService, private toasterService: ToasterService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getDatawith1Param()
    this.getDatawith2Param()
    this.spinner.show();
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.spinner.hide();
    /* this.getAddress = JSON.parse(localStorage.getItem('getAddress'));  */
  }
  param1: any
  podetail: any = [];
  prod: any[];
  responsedata: any = []
  getDatawith1Param() {


    this.spinner.show();
    this.param1 = 'online'
    this.globalService.getDatawithMethodParams1('online', this.param1).subscribe((data) => {
      /*   http://192.168.20.65:8000/online/?param_other1=Online */
      this.spinner.hide();
      this.response1 = data;
      this.responsedata = this.response1.data

      console.log(this.response1)
      console.log(this.responsedata)
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      });
  };
  patchingData: any;
  body: any
  patchDatawithparams1(res) {
    this.spinner.show();
    /*   http://192.168.20.65:8000/online245  */
    /* http://192.168.20.65:8000/online/?param_other1=245 */
    this.body = { "supp_company_code": res.supp_company_code }
    this.param1 = 'online'
    this.globalService.patchDatawithparam('online', res.seq_no, this.body).subscribe((data) => {
      this.spinner.hide();
      this.patch1 = this.data;
      this.toasterService.success("Branch Assighned Successfully")

      console.log(this.patchingData)
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      });
  };



  databranch: any;
  param2: any
  loginusertype: any;
  user_type: any[];
  getDatawith2Param() {

    this.spinner.show();
    this.param1 = 'online'
    this.globalService.getDatawithMethodParams2('online', 'Online', '5721').subscribe((data2) => {
      this.spinner.hide();
      this.response2 = data2;
      this.databranch = this.response2.branches
      console.log(this.response2);
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      });
  };
}
