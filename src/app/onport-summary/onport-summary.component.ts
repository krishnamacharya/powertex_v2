import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../global-service.service';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-onport-summary',
  standalone: false,
  templateUrl: './onport-summary.component.html',
  styleUrls: ['./onport-summary.component.scss']
})
export class OnportSummaryComponent implements OnInit {
  p: any = 1
  loginUserData: any;
  PendingPayments: any = [];
  allPendingPayments: any = [];
  searchduedate: any;

  totalcartons: any;
  totalcontainers: any;
  totalamount:any;
  totalinvoicecny:any;
searchText: any;
 
  constructor(private route: Router,private globalServicce: GlobalServiceService, private dialog: MatDialog, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit() {

    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getPendingPayments();

  }

  filterduedate() {
    if (this.searchduedate) {
      this.PendingPayments = this.allPendingPayments.filter((e) => e.Due_date <= this.searchduedate)
    } else {
      this.PendingPayments = this.allPendingPayments;
    }

  }
  getPendingPayments() {
    this.spinner.show();
    this.globalServicce.getMethodData('sup/trackcha/').subscribe((data) => {
      this.PendingPayments = data;
      this.allPendingPayments = data;
      this.spinner.hide();
      console.log()
      this.totalcartons = this.PendingPayments.map(a => parseFloat(a.ctns ? a.ctns : '0')).reduce(function (a, b) {
        return a + b;
      });
      this.totalcontainers = this.PendingPayments.map(a => parseFloat(a.noofcontainer ? a.noofcontainer : '0')).reduce(function (a, b) {
        return a + b;
      });
      console.log(this.totalcartons, this.totalcontainers)

      this.totalinvoicecny = this.PendingPayments.map(a => parseFloat(a.duty_approx ? a.duty_approx : '0')).reduce(function (a, b) {
        return a + b;
      });
    },
      error => {
        this.spinner.hide();
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
    // if (data.doc6) {
    //   text = text + "OTHERS1/"
    // }
    // if (data.doc7) {
    //   text = text + "OTHERS2"
    // }
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
    // if (!data.doc6) {
    //   text = text + "OTHERS1/"
    // }
    // if (!data.doc7) {
    //   text = text + "OTHERS2"
    // }
    return text;
  }

//PRINT CODE
printdatadetail(data) {
  this.route.navigateByUrl('/Supplier-Inv-Print?invqhid=' + data +'&A=OPS'); 
}

 //print Redirection
 printreport(){
  localStorage.setItem('PendingPayments', JSON.stringify(this.PendingPayments));
  this.router.navigate(['/Onportsummaryprint'])
}




}
