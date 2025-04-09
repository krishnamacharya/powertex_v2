import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../../global-service.service';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-stock-acceptance',
  standalone: false,
  templateUrl: './stock-acceptance.component.html',
  styleUrls: ['./stock-acceptance.component.scss']
})
export class StockAcceptanceComponent implements OnInit {
  poList: any = [];
  poList1: any = [];
  p: any = 1;
  searchText : any;
  loginUserData: any;
  constructor(private globalService: GlobalServiceService, private dialog: MatDialog,private route: Router,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getPOList();
    console.log(this.loginUserData,'pppp')
    console.log(this.loginUserData.first_name,'uuuu')
  }
  getPOList() {
    this.spinner.show();
    this.globalService.getDatawithMethod1("sup/chaproductdetails/").subscribe((data) => {
      this.spinner.hide();
      this.poList = data; 
      console.log(this.poList.INVQHID,"stock")
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      });
  };
  view(item){
    this.spinner.show();
    this.globalService.getDatawithMethodParams1("sup/chaproductdetails/",item.INVQHID).subscribe((data) => {
      this.spinner.hide();
      this.poList1 = data; 
      console.log(this.poList1.INVQHID,"stock1")
    $('#makepodetailModal').modal('show');

    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      });
  };
  stockt(p){
    this.spinner.show();
    this.globalService.postData(this.poList1,"promocode/new_arivals3/").subscribe((data) => {
      this.globalService.getDatawithMethodParams2("sup/updateinvqhdr/",this.poList1[0].INVQHID,this.loginUserData.first_name).subscribe((data) => {}),
      this.spinner.hide();
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      });
      $('#makepodetailModal').modal('hide');
      this.route.navigateByUrl('dashboard');
  }
  
}
