import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../../global-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-pending-duty-list',
  standalone: false,
  templateUrl: './pending-duty-list.component.html',
  styleUrls: ['./pending-duty-list.component.scss']
})
export class PendingDutyListComponent implements OnInit {
  loginUserData: any;
  orders: any = [];
searchText: any;
p: string|number;

  constructor(private globalServicce: GlobalServiceService, private router: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getPendingPayments();
  }
  getPendingPayments() {
    this.spinner.show();
    this.globalServicce.getMethodData('sup/pendingdutylist/').subscribe((data) => {
      this.orders = data;
      this.spinner.hide();
      console.log(this.orders)
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        // console.log(error);
      });
  };
  printdatadetail(data, type) {
    if (type == 'invoice') {
      this.router.navigateByUrl('/Supplier-Inv-Print?invqhid=' + data);
    }
  }


  //print Redirection
  printreport(){
  localStorage.setItem('orders', JSON.stringify(this.orders));
  this.router.navigate(['/PendingDutyListPrint'])

  //this.router.navigate(['/Onportsummaryprint'])
}

}
