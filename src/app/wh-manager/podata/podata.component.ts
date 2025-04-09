import { Component, OnInit } from '@angular/core';
import { ToasterService } from '../../toastr-service.service';
import { Router } from '@angular/router';
import { ComponentCommunicationService } from '../../component-communication.service';
import { GlobalServiceService } from '../../global-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-podata',
  standalone: false,
  
  templateUrl: './podata.component.html',
  styleUrl: './podata.component.scss'
})
export class PodataComponent implements OnInit {
  poList: any = [];
  p: any = 1;
  loginUserData: any;
  searchText: any;
  obj: any = {};
  transport: any = {}
  constructor(private toaster:ToasterService,private route: Router, private eventEmmit: ComponentCommunicationService, private globalService: GlobalServiceService, private dialog:MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    if (this.loginUserData === null) {
      console.log("status111", this.loginUserData);
      this.route.navigateByUrl('home');
    }
    this.getPOList();
  }
  podata: any
  openpopup(item) {
    this.podata = item
    console.log("podata", this.podata)
    $('#openmodal').modal('show');
  }
   makePackingList(data) {
    if(data.print==0){
      this.toaster.error('Please take print')
    }
    else{
      localStorage.setItem('poData', JSON.stringify(data));
      this.route.navigateByUrl('packing-List');
    }
   
  };
  getPOList() {
    this.spinner.show();
    this.globalService.getDatawithQueryParams1nd4(3.9, 1, this.loginUserData.company_code).subscribe((data) => {
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
  }
  printdatadetail(data) {
    localStorage.setItem('podetailData', JSON.stringify(data));
    this.route.navigateByUrl('DCdetailprint');
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

}

