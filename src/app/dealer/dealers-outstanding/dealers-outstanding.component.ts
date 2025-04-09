import { Component, OnInit } from '@angular/core';
import {GlobalServiceService} from '../../global-service.service'
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
@Component({
  selector: 'app-dealers-outstanding',
  standalone: false,
  templateUrl: './dealers-outstanding.component.html',
  styleUrls: ['./dealers-outstanding.component.scss']
})
export class DealersOutstandingComponent implements OnInit {
  loginUserData:any
  dealerslist:any = []
  dealerslist1:any = []
  Page:any=1
  p:any=1;
  types: string;
searchText: any;
  constructor(private service:GlobalServiceService,private router: Router,private spinner: NgxSpinnerService , private dialog: MatDialog,public globalservive: GlobalServiceService,private route: Router) { }
  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getdealerslist()
  }
  getdealerslist() {
    this.spinner.show();
    return this.service.getDatawithMethodParams1('market/drop/', this.loginUserData.user_id).subscribe((resp) => {
      // this.dealerslist = resp;
      this.dealerslist1 = resp;
      if (this.dealerslist1) {
        for (var i = 0; i < this.dealerslist1.length; i++) {
          if ((this.dealerslist1[i].due[0] && this.dealerslist1[i].outstanding_amount)
           || (this.dealerslist1[i].due[0] && this.dealerslist1[i].outstanding_amount==0)
           || (!this.dealerslist1[i].due[0] && this.dealerslist1[i].outstanding_amount)
           ) {
          // if (this.dealerslist1[i].due[0]) {
            // if (this.dealerslist1[i].due[0].due != 0) {
            this.dealerslist.push(this.dealerslist1[i]);
            // }
          }
        }
      }
      // this.dealerslist = this.dealerslist1.filter((e) => { return e.due[0].due != 0 || e.due != '' })
      this.spinner.hide();
    
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
         console.log(error);
      });
  };
  viewinvoice(del)
  {
    let userid = btoa(del.user);
    this.router.navigate(['/Marketing Manager-PAYMENT HISTORY',userid])
  }
  // printreport1(){
  //   localStorage.setItem('dealerslist', JSON.stringify(this.dealerslist));
  //   this.router.navigate(['/dealers-outstanding-print'])
  // }
  printreport2() {
    localStorage.setItem('dealerslist', JSON.stringify(this.dealerslist));
    this.router.navigate(['/dealers-outstanding-print'])
  }
  printreport1() {
    //retutn only not equal to zero values.......display other than 0 in outstanding amount
    this.dealerslist = this.dealerslist.filter((a) => { return a.outstanding_amount != 0 })
    localStorage.setItem('dealerslist', JSON.stringify(this.dealerslist));
    this.router.navigate(['/dealers-outstanding-print'])
  }

  
  print(data) {
    this.types = "Inv";
    this.globalservive.printReport('market/poprint/', this.types, data).subscribe((resp) => {
        localStorage.setItem('dealerslist', JSON.stringify(resp))
        this.route.navigateByUrl('/invoice-Print?A=DSL');
    },
      error => {
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      });
  }

}
