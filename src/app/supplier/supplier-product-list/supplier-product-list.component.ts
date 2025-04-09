import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from "../../global-service.service";
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from '../../toastr-service.service';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-supplier-product-list',
  standalone: false,
  templateUrl: './supplier-product-list.component.html',
  styleUrls: ['./supplier-product-list.component.scss']
})
export class SupplierProductListComponent implements OnInit {
  loginUserData: any
  productdata: any = []
  p: any = 1
  searchText: any
  body: any
  constructor(private toasterService: ToasterService, private route: Router, private globalService: GlobalServiceService, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getdata()
  }

  totalproductdata: any = []
  totproductdata: any = []
  getdata() {
      this.spinner.show();
      this.globalService.getDatawithMethodParams3("sup/orderplain/", this.loginUserData.user_id,'','').subscribe((data) => {
      this.productdata = data;
      this.totalproductdata = data
      this.totproductdata = data
      this.spinner.hide();
    });
  }
  update(product){
    this.body = { "supplier_id": this.loginUserData.user_id, product};
      this.spinner.show();
      this.globalService.postData(this.body, "sup/updatesku/").subscribe((data) => {
      this.spinner.hide();
      if (data['msg'] == 'sucessfuly updated') {
        $("#successModal").modal('show');
      }
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      })
  }
  delete(product){
    this.body = {product};
      this.spinner.show();
      this.globalService.postData(this.body, "sup/deletesku/").subscribe((data) => {
     this.spinner.hide();
      if (data['status'] == '1') {
        $("#deleteModal").modal('show');
        this.getdata()
      }else{
        this.toasterService.warning("Unable To Delete")
      }
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      })
  }
  keynumber(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  keyfloat(event: any) {
    const pattern = /[.0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  searchdata(data) {
    if (data) {
      this.productdata = []
      for (var i = 0; i < this.totalproductdata.length; i++) {
        if ((this.totalproductdata[i].product_name.toLowerCase().includes(data.toLowerCase()))) {
          this.productdata.push(this.totalproductdata[i])
        }
      }
    }
    else {
      this.productdata = this.totalproductdata
    }
  }

}
