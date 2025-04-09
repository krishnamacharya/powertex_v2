import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../../global-service.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-goods-receipt-note',
  standalone: false,
  templateUrl: './goods-receipt-note.component.html',
  styleUrls: ['./goods-receipt-note.component.scss']
})
export class GoodsReceiptNoteComponent implements OnInit {
  grn_details: any = [];
  inw_details: any;
  searchText: any;
  grnheader: string;
  loginUserData: any;
  p: any = 1;
  source_company_code: string;
  ven_POHidden: boolean = false;
selectedObj: any;
  constructor(private service: GlobalServiceService, private router: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    if (this.loginUserData === null) {
      this.router.navigateByUrl('home');
    }
    console.log(this.loginUserData);
    this.getdealerslist()
    if(this.loginUserData.designation != 'Marketing Manager') {
      this.ven_POHidden=true
      this.getInward();
     
      }
   
  }
  dealers: any
  userid: any
  getdealerslist() {
    this.userid = this.loginUserData.user_id
    return this.service.getDatawithMethodParams1('market/drop/', this.userid).subscribe((resp) => {
      this.dealers = resp;
    })
  }
  dealeruserid:any
  dealer_chn(event) {
    
    this.dealeruserid = event.user
    this.getInward()
  
  }
  loginuserid:any
  getInward() {
    this.spinner.show();
    if (this.loginUserData.designation == 'Marketing Manager') {
      this.loginuserid=this.loginUserData.user_id
      return this.service.getDatawithMethodParams2('market/grn/header/', this.dealeruserid, this.loginuserid).subscribe((resp) => {
        this.spinner.hide();
        
        console.log(resp);
        this.inw_details = resp;
        this.ven_POHidden=true
        console.log("Details", this.inw_details);
      },
        error => {
          this.spinner.hide();
          this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
          // console.log(error);
        });
    }
    else{
    if (this.loginUserData.user_type == 'Dealer') {
      this.source_company_code = this.loginUserData.user_id + "@" + this.loginUserData.company_code;
    } else {
      this.source_company_code = this.loginUserData.company_code;
    }
    
    return this.service.getDatawithQueryParams1nd4('3.9', '24', this.source_company_code).subscribe((resp) => {
      this.spinner.hide();
      this.ven_POHidden=true
      console.log(resp);
      this.inw_details = resp; 
      console.log("Details", this.inw_details);
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
    }
     
  }

  temp: any = 0;
  Sum: any = 0;
  qty: any;

  getVal() {
    for (let i of this.grn_details) {
      let qty = i.packing_qty;
      this.temp = this.temp + qty;
      console.log(this.temp);
      let val = i.tot_value;
      this.Sum = this.Sum + val;
      console.log(this.Sum);
    }
  }

  invoice_data(data) {
    
    console.log(data.inv_date);
    localStorage.setItem('grnData', JSON.stringify(data));
    let Date = formatDate(data.inv_date, 'yyyyMMdd', 'en-US');
    console.log(Date);
    // let invoice_no = btoa(data.inv_no);
    // let invoice_date = btoa(data.inv_date);
    let company_code = btoa(data.ship_to_company_code);
    let packing_date = btoa(data.packing_l_date);
    let packing_l_no = btoa(data.packing_l_no);
   
    console.log( "company code", company_code, "packing data", packing_date);
    this.router.navigate(['/grn_detail', packing_l_no, packing_date, company_code, packing_date]);
    // let ii= atob(i);
    // let dd= atob(d);
    // let cc= atob(c);
    // let pp = atob(p);

    // console.log("invoice number",ii,"invoice date",dd,"company code",cc,"packing data",pp);
  }
}
