import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalServiceService } from '../../global-service.service';
import { DataServiceService } from '../../data-service.service';
import { DatePipe } from '@angular/common';
declare var $: any;
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-acc-status',
  standalone: false,
  templateUrl: './acc-status.component.html',
  styleUrls: ['./acc-status.component.scss']
})
export class AccStatusComponent implements OnInit {
  POhidden:boolean=false;
  DOhidden:boolean=true;
  math=Math;
  p: any = 1;
  searchText: any;
  fromdate: any;
  tilldate: any;
  maxdate: any = '';
  // GRNhidden:boolean=false;
  PENhidden:boolean=false;
  sub: any;
  page: any = 1;
  page1: any = 1;
  page2: any = 1;
  orders: any;
  loginUserData: any;
  token: any;
  alert: boolean;
  obj: any = {};
  user_id: any;
  icon: boolean;
  panelOpenState = false;
  inv_data: any;
  gen_challans: any;
  constructor(private DatePipe: DatePipe,private router: Router, private route: ActivatedRoute, private service: GlobalServiceService, public dataService: DataServiceService,
    public dialog: MatDialog, private spinner: NgxSpinnerService) {
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
    // this.getOrders();
    this.fromdate = new Date().getUTCFullYear() + "-" + "01" + "-" + "01";
    this.tilldate = new Date();
    this.maxdate = new Date();
    this.invoice();
  
  }

  // getOrders(){
  //   let param1="";
  //   let param2="";
  //   let param3="";
  //   let param4="";

  //   this.service.getDatawithQueryParams5(7.6, param1, param2, param3,param4,this.loginUserData.company_code).subscribe((resp) => {
     
  //     this.getorddata(resp);
  //   });
  // }
  invoice(){
    let from, till;
    if (this.fromdate && this.tilldate) {
      from = this.DatePipe.transform(this.fromdate, "yyyy-MM-dd")
      till = this.DatePipe.transform(this.tilldate, "yyyy-MM-dd")
    } else {
      from = this.DatePipe.transform(new Date('1900-01-01'), "yyyy-MM-dd");
      till = this.DatePipe.transform(new Date(), "yyyy-MM-dd");
    }
    // this.service.getDatawithQueryParams3(7.6, param1,param2,this.loginUserData.company_code).subscribe((resp) => {
      this.service.getDatawithMethodParams3('invoicelist/', this.loginUserData.company_code, from, till).subscribe((resp) => {
      
      this.getinvdata(resp);
    });
  }
  getorddata(resp){
    this.orders=resp;
   }
  getinvdata(resp){
    this.inv_data=resp.data;
   }
   seq:any
 
   delete(data){
    
     this.seq={'seq':data}
     this.service.postData( this.seq,'invcancel/').subscribe((resp) => {
       console.log(resp);
       if(resp['status'] == 1){
         $("#check").modal('show');
       }
       else{
         $("#warng").modal('show');
       }
      },
      error => {        
        //  //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal:true }
        });
         // console.log(error);
      
     })
   }
   refresh(){
    $("#success").modal('show');
    this.invoice()
   }
   getchallan(){
    this.spinner.show();
    
    this.service.getDatawithQueryParams1('8.1',this.loginUserData.company_code).subscribe((resp) => {
      this.spinner.hide();
      console.log("challans",resp);
      this.gen_challans=resp;
      //this.getinvdata(resp);
    },
     error => {         this.spinner.hide();
        // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal:true }
        });
        // console.log(error);
      });
  }
  // po() {
  //   this.POhidden = true;
  //   this.DOhidden = false;
  //   this.PENhidden = false;
  //   this.getOrders();
  // }
  do() {
    this.POhidden = false;
    this.DOhidden = true;
    // this.GRNhidden = false;
    this.PENhidden = false;
    this.invoice();
  }
  pen() {
    this.POhidden = false;
    this.DOhidden = false;
    // this.GRNhidden = false;
    this.PENhidden = true;
    this.getchallan();
  }
// grn(){
//   this.POhidden = false;
//   this.DOhidden = false;
//   // this.GRNhidden = true;
//   this.PENhidden = false;
// }
  // check_status(p) {
    
  //   for(let pd of p )
  //   {
  //     if(pd.status!=="Delivered") {
  //       return true;
  //     }
  //     return false;
  //   }
  // }
  // check_status1(p){
  //   for(let pd of p )
  //   {
  //     if(pd.status =="Delivered") {
  //       return true;
  //     }
  //     return false;
  //   }
  // }

}
