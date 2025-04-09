import { Component, OnInit } from '@angular/core';
import { ToasterService } from '../../toastr-service.service';
import { Router } from '@angular/router';
import { ComponentCommunicationService } from '../../component-communication.service';
import { GlobalServiceService } from '../../global-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
import { MatDialog } from '@angular/material/dialog';
declare var $: any;
@Component({
  selector: 'app-packing-list',
  standalone: false,
  
  templateUrl: './packing-list.component.html',
  styleUrl: './packing-list.component.scss'
})
export class PackingListComponent implements OnInit {
  poList: any = [];
  p: any = 1;
  loginUserData: any;
  searchText: any;
  obj:any = {};
  transport: any = {}
  constructor(private toaster:ToasterService,private route: Router, private eventEmmit: ComponentCommunicationService, private globalService: GlobalServiceService,private dialog:MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    
    if (this.loginUserData === null) {
      console.log("status111", this.loginUserData);
      this.route.navigateByUrl('home');
    }
    this.getPOList();
  }
  getPOList() {
    this.spinner.show();
    // this.globalService.getDatawithQueryParams1nd4(3.9, 1, this.loginUserData.company_code).subscribe((data) => {
      this.globalService.getDatawithMethodParams1('get_dcdetails/', this.loginUserData.company_code).subscribe((data) => {
      this.spinner.hide();
      this.poList = data; 
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
  // printdatadetail(data) {
  //   if(data.print==1){
  //     this.toaster.error('You have already taken print')
  //   }
  //   else{
  //   localStorage.setItem('podetailData', JSON.stringify(data));
  //   this.route.navigateByUrl('DCdetailprint');
  //   }
  // }
  podata: any
  openpopup(item) {
    if(item.print==0){
      this.toaster.error('Please take print')
    }
    else{
    this.podata = item
    console.log("podata", this.podata)
    $('#openmodal').modal('show');
    }
  }
  poListprint: any
  submit() {
    if(this.transport.delivery_type && this.transport.service_amount && this.transport.remark ){
    let body = { "delivery_type": this.transport.delivery_type, "service_amount": this.transport.service_amount, "remark": this.transport.remark, "po_pk": this.podata.seq_no, "tomobile": this.podata.b_mobile ,"po_no":this.podata.po_no,"po_date":this.podata.po_date}
    this.globalService.postData(body, "promocode/vehiclemsg/").subscribe((data) => {
      this.poListprint = data;
      if(this.poListprint.status==1){
        $('#openmodal').modal('hide');
        $('#successModal').modal('show');
      }
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
    this.toaster.error('Please Fill All Fields')
      }
}
  // makePackingList(data) {
    
  //   if(data.print==0){
  //     this.toaster.error('Please take print')
  //   }
  //   else{
  //     localStorage.setItem('poData', JSON.stringify(data));
  //     this.route.navigateByUrl('packing-List');
  //   }
   
  // };

  close() {
    //  window.close();
    // window.addEventListener("beforeunload", function (e) {
    //   console.log(e);

    // });
  }
  checkedvalue=""
  event:any
  checked:any
  seq:any
  poheaderdata:any=[];
  selecteduser:any;
  seqarray:any=[];
  checkValue(event: any,item){
    if(!this.selecteduser){
      this.selecteduser=item.po_origin_id;
    }
    this.checked=event.currentTarget.checked
    // console.log(this.checked,inv_no);
   
if(this.checked==true){
    // this.checkedvalue.push(seq_no)
    // this.poheaderdata.push(item)
    this.seqarray.push(item.seq_no);
    console.log(this.seqarray)
    this.seq=item.seq_no;
    //================ rk ============
    // if( this.checkedvalue==''){
    //   this.checkedvalue=this.seq
    // }
    // else{
    // this.checkedvalue=this.checkedvalue + ',' + this.seq
    // console.log(this.checkedvalue)
    // }
   // ==============rk ===============
}
else{
  for(let s in this.seqarray){
    if(this.seqarray[s]==item.seq_no){
      this.seqarray.splice(s,1)
    }
     console.log(this.seqarray)
  }
  this.selecteduser=null;
}
// else{
// for(var i=0;i<this.checkedvalue.length;i++){
//  if(this.checked==false && this.checkedvalue[i]==seq_no){

//   this.checkedvalue.splice(i,1)
 
//   break;
// }


// }
console.log(this.checkedvalue)
}

 
body:any
 mergelist(){
  this.checkedvalue='';
  //  // ===============rk ==========
   for(let i of this.seqarray){
     if(!this.checkedvalue || this.checkedvalue==""){
      this.checkedvalue=i
     }
     else{
      this.checkedvalue=this.checkedvalue+','+i;
     }
  }
   // ===============rk ==========
   this.body={"seq_no":this.checkedvalue}
  this.globalService.postData(this.body, "printo/").subscribe((data) => {
    this.poListprint = data;
   //  ====== RK ==========
    localStorage.setItem('poPrintData', JSON.stringify(data['dtl']));
    localStorage.setItem('podetailData', JSON.stringify(data['hdr']));
   //  ====== ==========

    this.route.navigateByUrl('DCdetailprint');
  })
 }
 poListDetail:any
 view(item){
  this.globalService.getDatawithQueryParams4(3.9, 5, item.po_no, item.po_date, item.po_origin_company_code).subscribe((data) => {
    this.spinner.hide();
    this.poListDetail = data;
    this.poListDetail.forEach(element => {
      // this.packingListModel[element.po_srl_no] = element.balance_qty;
       element.carton =element.qty/element.piecepercarton;
       element.carton =Math.round(( element.carton + Number.EPSILON) * 100) / 100
  
     
    });
    $('#makepodetailModal').modal('show');
  })
 }
 selected_list:any=[]
 delete(item){

  console.log(item,'item')

 this.globalService.getDatawithQueryParams4(3.9, 5, item.po_no, item.po_date, item.po_origin_company_code).subscribe((data) => {
  this.spinner.hide();
  this.poListDetail = data;
  this.poListDetail.forEach(element => {
    // this.packingListModel[element.po_srl_no] = element.balance_qty;
     element.carton =element.qty/element.piecepercarton;
     element.carton =Math.round(( element.carton + Number.EPSILON) * 100) / 100

   
  });
  for(let data of this.poListDetail){
    this.selected_list.push({'productid': data.productid,'po_srl_no': data.po_srl_no,'seq_no': item.seq_no,'status': 0, 'qty': data.qty,
     'net_price': data.net_price,'user_id': this.loginUserData.user_id, 'comment': data.comment})
    }
    let body = this.selected_list;
    let methodName = "cancel/"
    return this.globalService.postData(body, methodName).subscribe(data => {
      $("#confirm").modal('show');
      this.selected_list=[]
      this.getPOList()
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal:true }
        });
      }
        // this.ngxSmartService.getModal('errorModal').open();
  
      });
})
 
 
}
reload_list(data){
  if(data){
    this.globalService.getDatawithMethodParams1('dcrefresh/', data).subscribe((data) => {
      this.spinner.hide();
      // this.poList = data;
    })
  }
}
}
