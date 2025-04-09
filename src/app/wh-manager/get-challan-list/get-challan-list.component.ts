import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { GlobalServiceService } from '../../global-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-get-challan-list',
  standalone: false,
  
  templateUrl: './get-challan-list.component.html',
  styleUrl: './get-challan-list.component.scss'
})
export class GetChallanListComponent  implements OnInit {
  searchText: any;
  challanList: any = [];
  p: any = 1;
  q: any = 1;
  loginUserData: any;
  totalchallanlist: any = []
  POhidden: boolean = true;
  DOhidden: boolean = false;
  fromdate: any;
  tilldate: any;
  constructor(private DatePipe: DatePipe,private route: Router,private dialog:MatDialog, private globalService: GlobalServiceService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    localStorage.removeItem('challanData')
    localStorage.removeItem('Transportdata')
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    console.log(this.loginUserData);
    if (this.loginUserData === null) {
      this.route.navigateByUrl('home');
    }
    this.getChallanList();
    // const d = new Date();
    // this.fromdate = d.getUTCFullYear() + "-" + d.getUTCMonth() + "-" + d.getUTCDate();
      // this.fromdate =  this.DatePipe.transform(new Date(), "2022-01-01");
      this.fromdate =  this.DatePipe.transform(new Date(), "yyyy-MM-dd");
      this.tilldate =  this.DatePipe.transform(new Date(), "yyyy-MM-dd");
  }
  do() {
   
    this.POhidden = false;
    this.DOhidden = true;
    this.gettransportList();
  }
  transportlistdetail:any=[]
  view(item){
    this.spinner.show();

    this.globalService.getDatawithMethodParams1("transport_details/",item.seq_no).subscribe((data) => {
      this.spinner.hide();
      this.transportlistdetail = data;
      $('#detail').modal('show');
      // this.totalchallanlist = data
     
    },
    error => {
              this.spinner.hide();
              this.dialog.open(ErrorModalComponent, {
                data: { errorModal:true }
              });
              // this.ngxSmartService.getModal('errorModal').open();
        
            });
  }
  po() {
  
    this.POhidden = true;
    this.DOhidden = false;
    this.getChallanList();
  }
  transportlist:any=[]
  gettransportList(){
    this.spinner.show();

    let from =  this.DatePipe.transform(this.fromdate, "yyyy-MM-dd");
    let till =  this.DatePipe.transform(this.tilldate, "yyyy-MM-dd");
    this.globalService.getDatawithMethodParams2dates('transport_list/', from, till).subscribe((data) => {
    // this.globalService.getDatawithMethod1("transport_list/").subscribe((data) => {
      this.spinner.hide();
      this.transportlist = data;
      // this.totalchallanlist = data
     
    },
    error => {
      this.spinner.hide();
      this.dialog.open(ErrorModalComponent, {
        data: { errorModal:true }
      });
      // this.ngxSmartService.getModal('errorModal').open();

    });
  }
  getChallanList() {
    this.spinner.show();

    this.globalService.getDatawithQueryParams1nd4(3.9, 22, this.loginUserData.company_code).subscribe((data) => {
      this.spinner.hide();
      this.challanList = data;
      this.totalchallanlist = data
      console.log(this.challanList, "this.challanList")
    },
    error => {
      this.spinner.hide();
      this.dialog.open(ErrorModalComponent, {
        data: { errorModal:true }
      });
      // this.ngxSmartService.getModal('errorModal').open();

    });
  };
  makeInvoice(data) {
    localStorage.setItem('challanData', JSON.stringify(data));

    this.route.navigateByUrl('transport-generation');
  }
  edittransport(data) {
    localStorage.setItem('Transportdata', JSON.stringify(data));
    
    this.route.navigateByUrl('transport-generation');
  }
  searchdata(data) {
    if (data) {
      this.challanList = []
      for (var i = 0; i < this.totalchallanlist.length; i++) {
       
        if ( (this.totalchallanlist[i].company_name.toLowerCase().includes(data.toLowerCase())) ) {
          this.challanList.push(this.totalchallanlist[i])
        }
        if(this.totalchallanlist[i].refinvno){
          if(this.totalchallanlist[i].refinvno.includes(data)){
            this.challanList.push(this.totalchallanlist[i])
          }

        }
       
      }
    }
    else {
      this.challanList = this.totalchallanlist
    }
  }
  print(data) {

    this.globalService.printReport('market/poprint/', "Inv", data).subscribe((resp) => {
      console.log(resp);
      // if (this.types == "Inv") {
        localStorage.setItem('InvoiceData', JSON.stringify(resp))
        this.route.navigateByUrl('/invoice-Print?seqno=' + data +'&W=TRP');
      // }

    },
     error => {
                this.spinner.hide();
                this.dialog.open(ErrorModalComponent, {
                  data: { errorModal:true }
                });
                // this.ngxSmartService.getModal('errorModal').open();
          
              });
  }
}
