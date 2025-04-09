import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../../../global-service.service';
import { ErrorModalComponent } from '../../../authentication-views/error-modal/error-modal.component';
declare var $: any;

@Component({
  selector: 'app-wh-modal',
  standalone: false,
  templateUrl: './wh-modal.component.html',
  styleUrls: ['./wh-modal.component.scss']
})
export class WhModalComponent implements OnInit {
selected_sub_cat(arg0: any) {
throw new Error('Method not implemented.');
}
  Page: any = 1;
  category: any;
  sub_c: any;
  sub: any;
  d: any;
  e: any;
  
  resources: any;
  option: any;
  modal: any = [];
  range: any = [];
  select: any;
  loginUserData: any;
  methodname: string;
  token: any;
  alert: boolean;
  user_id: string;
  
  constructor( private service:GlobalServiceService,private router: Router, private route: ActivatedRoute, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    // $("#success-alert").hide();
    this.alert = false;
    this.token = localStorage.getItem('token');
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.sub = this.route.params.subscribe(params => {
      
      if (this.token == null) {
        this.user_id = '';
      } else {
        this.user_id = this.loginUserData.user_id;
      }
      
     
        this.d = params['b'];
        this.sub_c = params['c'];
        this.modal = atob(params['d']);
        this.select = atob(params['e']);
        // this.d=this.category;
        this.e = atob(this.sub_c);
        //console.log(this.d, "", this.e, "", this.select, this.modal, this.user_id);
        this.getdata1();
     

    },
      error => {
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });

  }
  resourcesresp:any
  getdata1() {
    
    this.spinner.show();
    return this.service.getDatawithQueryParams4User_id('10', this.d, this.e, this.select, this.modal, this.user_id).subscribe((resp) => {
      this.spinner.hide();
      console.log(resp);

      this.resourcesresp = resp;
      this.resources=this.resourcesresp.data
    },
      error => {
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });

  }
}
