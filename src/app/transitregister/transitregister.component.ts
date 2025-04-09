import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../global-service.service';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';


@Component({
  selector: 'app-transitregister',
  standalone: false,
  templateUrl: './transitregister.component.html',
  styleUrls: ['./transitregister.component.scss']
})
export class TransitregisterComponent implements OnInit {
  searchText:any;
  p: any = 1
  loginUserData: any;
  SupplierDtls: any;
  user_id:any = []
  orders: any = [] 
  PendingPayments: any = [];
  allPendingPayments: any = [];
  suppliers: any = []
  supplierid: any;
  constructor(private route: Router,private router: Router,private globalServicce: GlobalServiceService, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getTransitRegister();
   this.getsuppliers();
  }

  getsuppliers() {
    this.globalServicce.getDataOnlyWithMethod("sup/skuprifix").subscribe((data) => {
      this.suppliers = data;
      console.log(this.suppliers);
    });
  }

   getTransitRegister() {
    if(this.SupplierDtls){
      for (let name of this.suppliers) {
        if (this.SupplierDtls.replace(/\s/g, '') === name.business_name.replace(/\s/g, '')) {
          this.supplierid = name.user_id
          break;
        }
      }
    }
//call getTransitRegister method in dropdown list
    this.spinner.show();
    //here calling dropdownid ...modelname.columnname...,,,here model name is SupplierDtls and column name is user_id
     this.globalServicce.getcheckdata('sup/transitregister/',this.supplierid?this.supplierid:'').subscribe((data) => {
      this.PendingPayments = data;
      this.allPendingPayments = data;
      this.spinner.hide();
    
      if (this.PendingPayments.length < 1) {
        alert("No Data is Available");
        }
      

    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      
      });
  };

  
  printreport(){
    localStorage.setItem('PendingPayments', JSON.stringify(this.PendingPayments));
    localStorage.setItem('SupplierDtls', JSON.stringify(this.SupplierDtls));
    this.router.navigate(['/transitregisterprint'])
  }
 

}
