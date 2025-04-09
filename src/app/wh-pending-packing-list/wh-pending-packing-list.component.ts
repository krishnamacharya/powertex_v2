import { Component, OnInit } from '@angular/core';
import { ToasterService } from '../toastr-service.service';
import { Router } from '@angular/router';
import { ComponentCommunicationService } from '../component-communication.service';
import { GlobalServiceService } from '../global-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
import { DatePipe } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-wh-pending-packing-list',
  standalone: false,
  
  templateUrl: './wh-pending-packing-list.component.html',
  styleUrl: './wh-pending-packing-list.component.scss'
})
export class WhPendingPackingListComponent implements OnInit {

  poList: any = [];
  page: any = 1
page2:any=1
  pototalList:any=[]
  p: any = 1;
  o: any = 1;
  loginUserData: any;
  searchText: any;
  obj: any = {};
  transport: any = {}
  selected_list: any[] = [];
  currentmonth: number = 0;
  fromdate: any;
  tilldate: any;
  type:any;
  i:any;
  item:any=[];
  dealers:any
  orderspage:boolean=false
selectedObj: any;
  constructor(private DatePipe: DatePipe,public dialog: MatDialog, private toaster: ToasterService, private route: Router, private eventEmmit: ComponentCommunicationService, private globalService: GlobalServiceService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData')); 
    if (this.loginUserData === null) {
      console.log("status111", this.loginUserData);
      this.route.navigateByUrl('home');
    }
    var date = new Date();
    date.setDate(date.getDate() - 30);
    this.currentmonth = new Date().getUTCMonth() + 1
    this.fromdate = date.toISOString().split('T')[0];
    this.tilldate = new Date().getUTCFullYear() + "-" + this.currentmonth + "-" + new Date().getUTCDate();
    this.fromdate = this.DatePipe.transform(this.tilldate, "yyyy-MM-dd");
    this.tilldate = this.DatePipe.transform(this.tilldate, "yyyy-MM-dd");
    // this.getPOList();
    if(this.loginUserData.role=='Marketing Manager'){
     
      this.getdealerslist(this.loginUserData.user_id)
    }
  else{
    this.orderspage = true
    this.pendingPoListDealer(this.tilldate, this.tilldate);
   }

    // this.pendingPoList();

  }
  getdealerslist(userid) {
    
    return this.globalService.getDatawithMethodParams1('market/drop', userid).subscribe((resp) => {
      this.dealers = resp;
   
    })
  }
  dealer_userid:any
  dealer_chn(event) {
    this.orderspage = true
    this.dealer_userid = event.user
  
    this.pendingPoListDealer(this.tilldate, this.tilldate);

  } 
  
  pendingPoList() {
    this.spinner.show();
    this.globalService.getcheckdata('pendingpo/', 'HYD_MAIN').subscribe((data) => {
      this.spinner.hide();
      this.poList = data;
      this.pototalList=data
      this.obj.id = 5;
      this.eventEmmit.fire(this.obj);
    },
       error => {
            this.spinner.hide();
            this.dialog.open(ErrorModalComponent, {
              data: { errorModal:true }
            });
            // this.ngxSmartService.getModal('errorModal').open();
      
          });
  };
  pendingPoListDealer(fromdate, tilldate) {
    this.fromdate = this.DatePipe.transform(fromdate, "yyyy-MM-dd");
    this.tilldate = this.DatePipe.transform(tilldate, "yyyy-MM-dd");
    this.spinner.show();
    if(this.loginUserData.role=='Marketing Manager'){
      this.globalService.getDatawithMethodParams4userid('pendingpo/', 'HYD_MAIN', this.fromdate, this.tilldate,this.dealer_userid).subscribe((data) => {
        this.spinner.hide();
        this.poList = data;
        this.pototalList=data
        this.obj.id = 5;
        this.eventEmmit.fire(this.obj);
      },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal:true }
        });
        // this.ngxSmartService.getModal('errorModal').open();
  
      });
    }
    else{
    this.globalService.getDatawithMethodParams4userid('pendingpo/', 'HYD_MAIN', this.fromdate, this.tilldate,'').subscribe((data) => {
      this.spinner.hide();
      this.poList = data;
      this.pototalList=data
      this.obj.id = 5;
      this.eventEmmit.fire(this.obj);
    },
    error => {
      this.spinner.hide();
      this.dialog.open(ErrorModalComponent, {
        data: { errorModal:true }
      });
      // this.ngxSmartService.getModal('errorModal').open();

    });
    }
  };
  // SeeMorePendingPlist(data) {
  //     this.route.navigateByUrl('wh-pending-packing-moreinfo');
  //   }


  //   getPOList() {
  //     this.spinner.show();
  //     this.globalService.getDatawithQueryParams1nd4(3.9, 1, this.loginUserData.company_code).subscribe((data) => {
  //       this.spinner.hide();
  //       this.poList = data;
  //       this.obj.id = 5;
  //       this.eventEmmit.fire(this.obj);
  //     },
  //       error => {
  //         this.spinner.hide();
  //         this.dialog.open(ErrorModalComponent, {
  //   data: { errorModal:true }
  // });
  //       });
  //   };
  //   printdatadetail(data) {
  //     if(data.print==1){
  //       this.toaster.error('You have already taken print')
  //     }
  //     else{
  //     localStorage.setItem('podetailData', JSON.stringify(data));
  //     this.route.navigateByUrl('DCdetailprint');
  //     }
  //   }
  //   podata: any
  // /*   openpopup(item) {
  //     if(item.print==0){
  //       this.toaster.error('Please take print')
  //     }
  //     else{
  //     this.podata = item
  //     console.log("podata", this.podata)
  //     $('#openmodal').modal('show');
  //     }
  //   } */
  //   poListprint: any
  //   /* submit() {
  //     if(this.transport.delivery_type && this.transport.service_amount && this.transport.remark ){
  //     let body = { "delivery_type": this.transport.delivery_type, "service_amount": this.transport.service_amount, "remark": this.transport.remark, "po_pk": this.podata.seq_no, "tomobile": this.podata.b_mobile ,"po_no":this.podata.po_no,"po_date":this.podata.po_date}
  //     this.globalService.postData(body, "promocode/vehiclemsg/").subscribe((data) => {
  //       this.poListprint = data;
  //       if(this.poListprint.status==1){
  //         $('#openmodal').modal('hide');
  //         $('#successModal').modal('show');
  //       }
  //     },
  //       error => {

  //         this.dialog.open(ErrorModalComponent, {
  //   data: { errorModal:true }
  // });

  //       });
  //   }
  //   else{
  //     this.toaster.error('Please Fill All Fields')
  //       }
  // } */
  //   makePackingList(data) {

  //     if(data.print==0){
  //       this.toaster.error('Please take print')
  //     }
  //     else{
  //       localStorage.setItem('poData', JSON.stringify(data));
  //       this.route.navigateByUrl('packing-List');
  //     }

  //   };

  //   close() {
  //     //  window.close();
  //     // window.addEventListener("beforeunload", function (e) {
  //     //   console.log(e);

  //     // });
  //   }
  modal: any
  viewmoredeiails: any = [];
  viewmore(viewmore) {

    
    this.viewmoredeiails = viewmore.detail;
    $('#openmodal').modal('show');
    // this.spinner.show();
    // this.globalService.getcheckdata('pendingpo/', 'HYD_MAIN').subscribe((data) => {
    //   this.spinner.hide();
    //   this.poList = data;
    //   this.obj.id = 5;
    //   this.eventEmmit.fire(this.obj);

    // },
    //   error => {
    //     this.spinner.hide();
    //     this.dialog.open(ErrorModalComponent, {
  //   data: { errorModal:true }
  // });
    //     // console.log(error);
    //   });
  }

  print(viewmore) {

    localStorage.setItem('Podata', JSON.stringify(viewmore));
    this.route.navigateByUrl('wh-pending-packing-moreinfo');

  }
  delete(item) {

    this.selected_list = []
    for (let data of item.detail) {
      this.selected_list.push({
        'productid': data.productid, 'po_srl_no': data.po_srl_no, 'seq_no': data.seq_no, 'status': 0, 'qty': data.qty,
        'net_price': data.net_price, 'user_id': this.loginUserData.user_id, 'comment': data.comment
      })
    }
    let body = this.selected_list;
    let methodName = "cancel/"
    return this.globalService.postData(body, methodName).subscribe(data => {
      $("#confirm").modal('show');
      this.selected_list = []
      this.pendingPoListDealer(this.fromdate, this.tilldate);
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal:true }
        });
      }
        // this.ngxSmartService.getModal('errorModal').open();
  
      });

  }
  /* makePackingList(data) {
    if(data['remarks1']==null){
      data['remarks1']="" 
    }
    if(data['spl_instr']==null){
      data['spl_instr']=""
    }
    if(data['shipment_point']==null)
    {
      data['shipment_point']=""
    }
    data['shipment_point']=0
    data['company_code']= data['supp_company_code'];
   
      localStorage.setItem('poData', JSON.stringify(data));
      this.route.navigateByUrl('packing-List');
    
   
  };
   */
  newarray:any=[]
  detailsdata:any=[]
searchdata(data){

  
  if(data){
  this.poList=[]
 
for(var i=0;i<this.pototalList.length;i++){
  this.detailsdata=this.pototalList[i].detail
  for(var j=0;j<this.detailsdata.length;j++){
    if((this.detailsdata[j].modelno.toLowerCase()==data.toLowerCase()) || (this.pototalList[i].business_name.toLowerCase().includes(data.toLowerCase())) ){
      this.pototalList[i].detail=[]
      this.pototalList[i].detail.push(this.detailsdata[j])
      this.poList.push(this.pototalList[i])
      break;
    }
   
  }
}

}
else{
  this.poList=this.pototalList
}

  
}

}

