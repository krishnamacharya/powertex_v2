import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GlobalServiceService } from "../../global-service.service";
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
@Component({
  selector: 'app-invoiceslist',
  standalone: false,
  templateUrl: './invoiceslist.component.html',
  styleUrls: ['./invoiceslist.component.scss']
})
export class InvoiceslistComponent implements OnInit {
  loginUserData:any
  invoicedata:any=[]
  p:any=1
  searchText:any
  constructor(private globalServicce: GlobalServiceService, private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { } 

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getinvoicedata()
  }
  getinvoicedata() {
    this.spinner.show();
    this.globalServicce.getDatawithMethodParams1("sup/invoice/","abc").subscribe((data) => {
      this.invoicedata=data
     
      console.log(this.invoicedata,"productdata")
      this.spinner.hide();
     
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  };
  viewMore(data) {
    localStorage.setItem('invoicedata', JSON.stringify(data));
   
    this.route.navigateByUrl('Supplier-Invoice-fileupload');
    
  };


}
