import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalServiceService } from '../../global-service.service';
import { DataServiceService } from '../../data-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
// import { ComponentCommunicationService } from '../component-communication.service';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from '../../toastr-service.service';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';

declare var $: any;

@Component({
  selector: 'app-wh-status',
  standalone: false,
  templateUrl: './wh-status.component.html',
  styleUrls: ['./wh-status.component.scss']
})
export class WhStatusComponent implements OnInit {
  POhidden: boolean = true;
 
  GRNhidden: boolean = false;
  PENhidden: boolean= false;
  sub: any;
  page: any = 1;
  page1: any = 1;
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
  p:any=1
  searchText:any;
  
  constructor(private toaster:ToasterService,private router: Router, private route: ActivatedRoute, private service: GlobalServiceService, public dataService: DataServiceService,
    private dialog: MatDialog, private spinner: NgxSpinnerService) {
    this.obj.id = 4;
  }

  ngOnInit() {
    this.alert = false;
    
    this.token = localStorage.getItem('token');
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    // if(this.loginUserData===null){
    //   this.router.navigateByUrl('home');
    // }
 
    this.sub = this.route.params.subscribe(params => {
      console.log(this.loginUserData);

      if (this.token == null) {
        this.user_id = '';
      } else {
        this.user_id = this.loginUserData.user_id;
      }


    });
    this.getOrders();
    // this.invoice();
    
  }

  getOrders() {
  

    
    this.spinner.show();
    let param1 = "";
    let param2 = "";
    let param3 = "";
    let param4 = "";
    this.service.getDatawithQueryParams5(7.6, param1, param2, param3, param4, this.loginUserData.company_code).subscribe((resp) => {
      this.spinner.hide();
      this.getorddata(resp);
    },
     error => {     
           this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  }
  
  invoice() {
    
    this.spinner.show();
    let param1 = "";
    let param2 = "";
    this.service.getDatawithQueryParams3(7.6, param1, param2, this.loginUserData.company_code).subscribe((resp) => {
      this.spinner.hide();
      console.log(resp);
      this.getinvdata(resp);
    },
     error => {      
          this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });

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
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  }
  getorddata(resp) {
    console.log(resp.data)
    this.orders = resp;
   
    console.log(this.orders);
  }
  getinvdata(resp) {
    this.inv_data = resp;
    console.log("inv", this.inv_data);
  }
  po() {
    this.POhidden = true;
   
    // this.GRNhidden = false;
    this.PENhidden = false;
    this.getOrders()
  }
  pen() {
    this.POhidden = false;
   
    // this.GRNhidden = false;
    this.PENhidden = true;
    this.getchallan()
  }
  // grn() {
  //   this.POhidden = false;
   
  //   // this.GRNhidden = true;
  //   this.PENhidden = false;
  // }

  printdatadetail(data) {
    this.service.printReport('market/poprint/','PACKING',data.seq_no).subscribe((resp) => {
      console.log(resp);
   
      localStorage.setItem('packingListprint', JSON.stringify(resp));
      this.router.navigateByUrl('packing_list_print');
      localStorage.removeItem('poData')
 
    })
   
  }

  makePackingList(data) {
    
  if(data.inv_no==0){
      localStorage.setItem('poData', JSON.stringify(data));
      this.router.navigateByUrl('packing-List');
  }
  else{
    this.toaster.error('Invoice Completed')
  }
   
  };
}
