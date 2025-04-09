import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../../global-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-admin-pending-packing-list',
  standalone: false,
  templateUrl: './admin-pending-packing-list.component.html',
  styleUrls: ['./admin-pending-packing-list.component.scss']
})
export class AdminPendingPackingListComponent implements OnInit {
  loginUserData: any
  supplierdata: any = []
  p: any = 1
  searchText: any
  suppliers: any = [];
  currency: any;
  pro: any;
  pro1: any;
  supplierdata1: any = [];
  totalsupplierdata:  any = [];
  SNameExists:any;
  data:any = [];
  supplierid: any;
  constructor(private router: Router,private globalServicce: GlobalServiceService,  private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getsuppliers();
    this.getinvoicedata();
  }
  getsuppliers() {
    this.globalServicce.getDataOnlyWithMethod("sup/skuprifix").subscribe((data) => {
      this.suppliers = data;
      console.log(data)
    });
  }
  url: any
  getinvoicedata() {
    this.spinner.show();
    this.globalServicce.getDatawithMethod1("sup/pendingpackinglist/").subscribe((data) => {
      this.supplierdata = data
      this.totalsupplierdata = data
      // if(this.supplierdata1){
      //   this.supplierdata = this.supplierdata1.filter((e) => { return e.supplierid == this.pro})
      // }
      this.spinner.hide();

    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal:true }
        });
      });
  };
  getdata(sup){
    for (let name of this.suppliers) {
      if (sup.replace(/\s/g, '') === name.business_name.replace(/\s/g, '')) {
        this.pro = name.user_id
        break;
      }
    }
    if (this.suppliers) {
      let supplier = this.suppliers.filter((e) => e.user_id == this.pro)
      this.currency = supplier[0].currency
    }

    
    if (this.suppliers == undefined) {
      this.supplierdata = this.totalsupplierdata
    }
    if(this.supplierdata1){
        this.supplierdata = this.totalsupplierdata.filter((e) => { return e.supplierid == this.pro})
      }

      if (this.supplierdata.length < 1) {
        $("#WarningModal").modal('show');
       // alert("No Data is Available");
        }
      
  }


  printreport(){
    localStorage.setItem('supplierdata', JSON.stringify(this.supplierdata));

    this.router.navigate(['/admin-pending-packing-list-print'])
  }


}
