import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../../global-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from '../../toastr-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-pending-orders',
  standalone: false,
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.scss']
})
export class PendingOrdersComponent implements OnInit {
  PENhidden: boolean = true;
  PACKhidden: boolean = false;
  loginUserData:any
  param2:any
  searchText: any;
  p:any=1
  constructor(private toaster:ToasterService,private route: Router,private service: GlobalServiceService,private spinner: NgxSpinnerService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getPOList()
  }
  grn() {
    this.PACKhidden = true;
    this.PENhidden=false
    this.param2="FULLPACK"
    this.getPOList()
  }
  pen(){
    this.PACKhidden = false;
    this.PENhidden=true
    this.param2=""
    this.getPOList()
  }
  poList:any
  getPOList() {
    this.spinner.show();
    let param1 =  this.loginUserData.company_code;
    let param2 = "hdr";
  /*   GET /printlist/?param_other1=HYD_MAIN&param_other2=hdr */
    this.service.getDatawithMethodParams2('printlist/', param1, param2).subscribe((data) => {
      this.spinner.hide();
      this.poList = data;
   
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      });
  }
  podata: any
  viewmore(item) {
    this.spinner.show();    
      /* GET /printlist/?param_other1=HYD_MAIN&param_other2=dtl&param_other3=159 */
      
      this.service.getDatawithMethodParams3('printlist/', this.loginUserData.company_code, "dtl", item.print).subscribe((data) => {
        this.spinner.hide();
        this.podata = data;
        console.log("podata", this.podata)
        $('#openmodal').modal('show');
      },
        error => {
          this.spinner.hide();
          //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
          // console.log(error);
        });
 
  
 
  }
  printdatadetail(data) {
    
    localStorage.setItem('podetailData', JSON.stringify(data));
    this.route.navigateByUrl('DCdetailprint?A=DcP');
    
  }
}
