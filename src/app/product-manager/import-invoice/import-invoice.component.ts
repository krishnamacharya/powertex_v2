import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServiceService } from '../../global-service.service'
import { DataServiceService } from "../../data-service.service";
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-import-invoice',
  standalone: false,
  templateUrl: './import-invoice.component.html',
  styleUrls: ['./import-invoice.component.scss']
})
export class ImportInvoiceComponent implements OnInit {
  vendorsList: any;
  selectedObj: any;
  searchText: any;
  p: any = 1;
  openProformaList: any = false;
  proformaList: any = [];
  loginUserData: any;

  constructor(private dataService: DataServiceService, private globalService: GlobalServiceService, private spinner: NgxSpinnerService, private dialog: MatDialog, private route: Router) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    if(this.loginUserData===null){
      this.route.navigateByUrl('home');
    }
    
    this.vendorsList = this.dataService.getOnLoadServices(7.9);
  };

  getVendorCode(vendorCode) {
    this.spinner.show();
    this.globalService.getDatawithQueryParams1nd4(3.9, 1, vendorCode).subscribe((data) => {
      this.spinner.hide();
      this.proformaList = data;
      this.openProformaList = true;
    },
     error => {         this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  };

  makeInvoice(data) {
    localStorage.setItem('importPoData', JSON.stringify(data));
    this.route.navigateByUrl('product-Invoice');
  }

}
