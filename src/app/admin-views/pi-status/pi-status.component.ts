import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../../global-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-pi-status',
  standalone: false,
  templateUrl: './pi-status.component.html',
  styleUrls: ['./pi-status.component.scss']
})
export class PiStatusComponent implements OnInit {

  orders: any = [];
  p: any = 1;
  loginUserData: any;
  pro: any;
searchText: string;
  constructor(private globalServicce: GlobalServiceService, private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }


  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    // this.getdata();
  }
  getdata() {

    this.spinner.show();
    this.globalServicce.getDatawithMethodParams1("sup/pistatus/", this.pro).subscribe((data) => {
      this.orders = data
      console.log(this.orders)
      this.spinner.hide();
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      });
  }

}
