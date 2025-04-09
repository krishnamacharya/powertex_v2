import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../global-service.service';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-paymentsuccessfull',
  standalone: false,
  templateUrl: './paymentsuccessfull.component.html',
  styleUrls: ['./paymentsuccessfull.component.scss']
})
export class PaymentsuccessfullComponent implements OnInit {
  loginUserData: any;
  onlineCheckoutData: any;
  user_id: any;
  methodname: string;
  constructor( private dialog: MatDialog,private spinner: NgxSpinnerService,public globalService: GlobalServiceService,private router: Router) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.onlineCheckoutData = JSON.parse(localStorage.getItem('onlineCheckoutData'));
    this.ClearCart();
    setTimeout(() => {
      this.router.navigate(['home']);
    }, 4000);  //4000ms or 4s
    this.generateOrderId(this.onlineCheckoutData);
  }
  generateOrderId(body) {
    this.spinner.show();
    let methodName = "insert_update/"
    this.globalService.postData(body, methodName).subscribe((data) => {
      this.spinner.hide();
      console.log(data);
      if (data['Message'] == 'PO Sucessfully inserted ') {
        // localStorage.setItem('poprintData', JSON.stringify(data));
        // this.orderId = data['PO'];
        // if (this.routeParams == "2") {
        //   this.buynowItem = "";
        //   localStorage.removeItem('buynowItem');
        // };
        localStorage.removeItem('onlineCheckoutData');
        // $('#orderIdModal').modal('show');
      }
    },
      error => {
        this.spinner.hide();

        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  }
  
  ClearCart(){

    this.user_id = this.loginUserData.user_id;
    this.methodname = 'delete_cart/?user_id=' + this.user_id + '&productid=' + 'All';
    this.globalService.deleteData(this.methodname).subscribe((data) => {
      // this.spinner.hide();
    });
  }

}
