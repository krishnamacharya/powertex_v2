import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServiceService } from '../../global-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ComponentCommunicationService } from '../../component-communication.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-get-proforma-list',
  standalone: false,
  templateUrl: './get-proforma-list.component.html',
  styleUrls: ['./get-proforma-list.component.scss']
})
export class GetProformaListComponent implements OnInit {

  proformaList: any = [];
  p: any = 1;
  loginUserData: any;
  searchText: any;
  obj: any = {};
  constructor(private route: Router, private eventEmmit: ComponentCommunicationService, private globalService: GlobalServiceService, public dialog: MatDialog,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    if (this.loginUserData === null) {
      this.route.navigateByUrl('home');
    }
    this.getPOList();
  }
  getPOList() {
    this.spinner.show();
    this.globalService.getDatawithQueryParams1(101, this.loginUserData.company_code).subscribe((data) => {
      this.spinner.hide();
      this.proformaList = data;
      this.obj.id = 5;
      this.eventEmmit.fire(this.obj);
    },
      error => {
        this.spinner.hide();
        // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal:true }
        });
      });
  };

  makeInvoice(data) {
    localStorage.setItem('proformaData', JSON.stringify(data));
    this.route.navigateByUrl('invoice');
  }

}
