import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalServiceService } from '../../global-service.service';
import { DataServiceService } from '../../data-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
// import { ComponentCommunicationService } from '../component-communication.service';
import { MatDialog } from '@angular/material/dialog';


declare var $: any;

@Component({
  selector: 'app-pm-status',
  standalone: false,
  templateUrl: './pm-status.component.html',
  styleUrls: ['./pm-status.component.scss']
})
export class PmStatusComponent implements OnInit {

  POhidden: boolean = true;
  DOhidden: boolean = false;
  GRNhidden: boolean = false;
  PENhidden: boolean;
  sub: any;
  page: any = 1;
  orders: any;

  loginUserData: any;

  token: any;

  alert: boolean;
  obj: any = {};
  user_id: any;
  icon: boolean;
  panelOpenState = false;
searchText: string;
  constructor(private router: Router, private route: ActivatedRoute, private service: GlobalServiceService, public dataService: DataServiceService,
    private dialog: MatDialog, private spinner: NgxSpinnerService) {
    this.obj.id = 4;
  }

  ngOnInit() {
    this.alert = false;
    this.token = localStorage.getItem('token');
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));

    if(this.loginUserData===null){
      this.router.navigateByUrl('home');
    }
    this.sub = this.route.params.subscribe(params => {

      if (this.token == null) {
        this.user_id = '';
      } else {
        this.user_id = this.loginUserData.user_id;
      }


    });
    this.getOrders();

  }

  getOrders() {
    this.spinner.show();
    let param1 = "";
    let param2 = "";
    let param3 = "";
    this.service.getDatawithQueryParams4(7.6, param1, param2, param3, this.user_id).subscribe((resp) => {
      this.spinner.hide();
      console.log(resp);

      this.getorddata(resp);
    });
  }
  getorddata(resp) {
    console.log(resp.data)
    this.orders = resp.data;
    console.log(this.orders);
    // for(let p of this.orders){
    //   console.log(p.data);

    // }
  }
  po() {
    this.POhidden = true;
    this.DOhidden = false;
    this.GRNhidden = false;
  }
  do() {
    this.POhidden = false;
    this.DOhidden = true;
    this.GRNhidden = false;
  }
  grn() {
    // alert("In-Progress")
  }

  check_status(p) {
   
    for(let pd of p )
    {
      if(pd.status!=="Delivered") {
        return true;
      }
      return false;
    }
  }
  check_status1(p) {
    for (let pd of p) {
      if (pd.status == "Delivered") {
        return true;
      }
      return false;
    }
  }

}
