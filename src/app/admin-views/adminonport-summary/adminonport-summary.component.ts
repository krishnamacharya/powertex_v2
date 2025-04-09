import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../../global-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-adminonport-summary',
  standalone: false,
  templateUrl: './adminonport-summary.component.html',
  styleUrls: ['./adminonport-summary.component.scss']
})
export class AdminonportSummaryComponent implements OnInit {

  searchText:any;
  p: any = 1
  loginUserData: any;
  PendingPayments: any = [];
  allPendingPayments: any = [];
  searchduedate: any;

  totalcartons: any;
  totalcontainers: any;
  totalamount:any;
  totalinvoicecny:any;
  dischargeports: any = []
  dischargeprt: any;
  constructor(private route: Router,private router: Router,private globalServicce: GlobalServiceService, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getPendingPayments();
    this.getdischargeports();
  }



  filterduedate() {
    if (this.allPendingPayments > 0) {
      this.PendingPayments = this.allPendingPayments.filter((e) => e.Due_date <= this.searchduedate)
    } else {
      this.PendingPayments = this.allPendingPayments;
    }

  }

  getdischargeports() {
    this.globalServicce.getDataOnlyWithMethod("sup/dischargeport").subscribe((data) => {
      this.dischargeports = data;
    });

  }
  getPendingPayments() {
    this.spinner.show();
    this.globalServicce.getcheckdata('sup/trackcha/',this.dischargeprt?this.dischargeprt:'').subscribe((data) => {
      this.PendingPayments = data;
      this.allPendingPayments = data;
      this.spinner.hide();
      console.log()
    //  if(this.PendingPayments>0){
        this.totalcartons = this.PendingPayments.map(a => parseInt(a.ctns ? a.ctns : '0')).reduce(function (a, b) {
          return a + b;
        });
        this.totalcontainers = this.PendingPayments.map(a => parseFloat(a.noofcontainer ? a.noofcontainer : '0')).reduce(function (a, b) {
          return a + b;
        });
        console.log(this.totalcartons, this.totalcontainers)
  
        this.totalinvoicecny = this.PendingPayments.map(a => parseFloat(a.duty_approx ? a.duty_approx : '0')).reduce(function (a, b) {
          return a + b;
        });
      // }
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



  getdocavailabl(data) {
    let text = "";
    if (data.productimage) {
      text = text + "IMG/"
    }
    if (data.doc1) {
      text = text + "BL/"
    }
    if (data.doc2) {
      text = text + "INV/"
    }
    if (data.doc3) {
      text = text + "PL/"
    }
    if (data.doc4) {
      text = text + "CO/"
    }
    if (data.doc5) {
      text = text + "INS/"
    }
    return text;
  }


  getpendingdoc(data) {
    let text = "";
    // if (!data.productimage) {
    //   text = text + "IMG/"
    // }
    if (!data.doc1) {
      text = text + "BL/"
    }
    if (!data.doc2) {
      text = text + "INV/"
    }
    if (!data.doc3) {
      text = text + "PL/"
    }
    if (!data.doc4) {
      text = text + "CO/"
    }
    if (!data.doc5) {
      text = text + "INS/"
    }
    return text;
  }

//PRINT CODE



  printdatadetail(data) {
      this.route.navigateByUrl('/Supplier-Inv-Print?invqhid=' + data +'&A=OPS'); 
  }


  printreport(){
    localStorage.setItem('PendingPayments', JSON.stringify(this.PendingPayments));
    localStorage.setItem('dischargeprt', JSON.stringify(this.dischargeprt));
    this.router.navigate(['/adminonport-summary-print'])
  }

}
