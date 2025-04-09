import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServiceService } from '../../global-service.service';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';

declare var $;
@Component({
  selector: 'app-generate-import-grn',
  standalone: false,
  templateUrl: './generate-import-grn.component.html',
  styleUrls: ['./generate-import-grn.component.scss']
})
export class GenerateImportGrnComponent implements OnInit {
  grn_details: any;
  grnGetData: any;
  todayDate = new Date();
  headerData: any;
  grnList: any = [];
  grnprint: any;
  stockDataList: any = [];
  temp: any = 0;
  Sum: any = 0;
  loginUserData: any;
  billingAddress: any;
  shipingAddress: any;
  soldbyAddress: any;
  constructor(private router: Router, private globalService: GlobalServiceService, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    if (this.loginUserData === null) {
      this.router.navigateByUrl('home');
    }
    this.grnGetData = JSON.parse(localStorage.getItem('grnData'));
    console.log(this.grnGetData);

    this.getGrnDetails();
    this.getAddresses();
    // $('#grnSuccessfulModal').modal('show');
  };

  getAddresses() {
    this.spinner.show();
    let param1 = this.grnGetData.bill_to + "," + this.grnGetData.ship_to;
    this.globalService.getDatawithQueryParams1(7.8, param1).subscribe((data) => {
      this.spinner.hide();
      localStorage.setItem('addresses', JSON.stringify(data));
      this.billingAddress = data['Bill'];
      this.shipingAddress = data['SHIP'];
      this.soldbyAddress = this.loginUserData.company_address;
      //   console.log("sold", this.soldbyAddress);

    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  };

  getGrnDetails() {
    this.spinner.show();
    this.globalService.getDatawithQueryParams2('3.9', '26', this.grnGetData.seq_no).subscribe((resp) => {
      this.spinner.hide();
      this.grn_details = resp;
      console.log(resp);

      localStorage.setItem('grnPrintData', JSON.stringify(resp));
      this.getVal();
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  };

  getVal() {
    for (let i of this.grn_details) {
      let qty = i.inv_qty;
      this.temp = this.temp + qty;
      let val = i.tot_value;
      this.Sum = this.Sum + val;
    }
  }

  Generate_GRN(data) {
    this.spinner.show();
    this.headerData = {
      "document_no": 1,
      "document_date": formatDate(this.todayDate, 'yyyyMMdd', 'en-US'),
      "creditperiod": this.grnGetData.credit_period,
      "source_user_id": 7,
      "grn_type": "DOM",
      "dest_user_id": 1,
      "ship_to_company_code": "29@HYD_MAIN",
      "address1": "testst",
      "address2": "tesst",
      "address3": "",
      "address4": "",
      "city": "Dantewada",
      "inv_origin_company_code": "HYD_MAIN",
      "state": "Chhattisgarh",
      "paymentterms": this.grnGetData.payment_terms,
      "remarks1": this.grnGetData.remarks1,
      "remarks2": this.grnGetData.remarks2,
      "splinstr": this.grnGetData.splinstr,
      "currency_code": "INR",
      "exchange_rate": 0,
    }
    for (let i = 0; i < this.grn_details.length; i++) {
      let json_dtl = {
        "document_no": 0,
        "document_date": formatDate(this.todayDate, 'yyyyMMdd', 'en-US'),
        "srl_no": this.grn_details[i].po_srl_no,
        "financial_year": this.grn_details[i].financial_year,
        "inv_date": this.grn_details[i].inv_date,
        "inv_no": this.grn_details[i].inv_no,
        "inv_qty": this.grn_details[i].inv_qty,
        "inv_srl_no": this.grn_details[i].inv_srl_no,
        "inv_type": "PO",
        "po_no": this.grn_details[i].po_no,
        "po_date": this.grn_details[i].po_date,
        "po_srl_no": this.grn_details[i].po_srl_no,
        "productid": this.grn_details[i].productid,
        "modelno": this.grn_details[i].modelno,
        "barcode_qty": 0,     
        "seq_no": this.grn_details[i].seq_no,                    /* this.grn_details[i].barcode_qty*/
        "barcode_ship_pos_conf": 0,               /* this.grn_details[i].barcode_ship_pos_conf*/
        "mrp": this.grn_details[i].mrp,
        "net_price": this.grn_details[i].net_price,
        "tot_value": this.grn_details[i].tot_value,
        "discount_eff": this.grn_details[i].discount,
        "import_i" : "1"
      }
      this.grnList.push(json_dtl);
    }
    let body = {
      "process_in": 'GRN', "operation_in": "INSERT", "draft_final_in": "FINAL", "document_no_out": "", "message_out": "",
      "json_hdr": this.headerData, "json_dtl": this.grnList
    }
    let methodName = "insert_update/"
    this.globalService.postData(body, methodName).subscribe((data) => {
      this.spinner.hide();
      this.grnprint = data;
      console.log(this.grnprint);

      localStorage.setItem('grnprintData', JSON.stringify(this.grnprint));
      this.stockUpdate();
      if (data['Message'] == "GRN Sucessfully inserted ") {
        $('#grnSuccessfulModal').modal('show');
      }
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  };

  stockUpdate() {
    this.spinner.show();
    this.grn_details.forEach(data => {
      let stockData = {
        "productid": data.productid,
        "qty_in": data.inv_qty,
        "tot_amt_in": data.tot_value
      }
      this.stockDataList.push(stockData);
    });
    let body = {
      "period_in": formatDate(this.todayDate, 'yyyyMM', 'en-US'),
      "company_code_in": this.headerData.inv_origin_company_code,
      "product_details": this.stockDataList,
      "storage_location_in": "WAREHOUSE1",
      "process_type_in": "GRN"
    };
    let methodName = "proc_stock/"
    this.globalService.postData(body, methodName).subscribe((data) => {
      this.spinner.hide();
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        //console.log(error);
      });
  };

  confirm_grn() {
    this.router.navigateByUrl('/grn-print');
  }

  // getAddresses() {
  //   this.spinner.show();
  //   let param1 = this.grnData.bill_to_party_seq_no + "," + this.grnData.ship_to_party_seq_no;
  //   this.globalService.getDatawithQueryParams1(7.8, param1).subscribe((data) => {
  //     this.spinner.hide();
  //     localStorage.setItem('addresses', JSON.stringify(data));
  //     this.billingAddress = data.Bill;
  //     this.shipingAddress = data.SHIP;
  //   },
  //    error => {         this.spinner.hide();
  //       this.dialog.open(ErrorModalComponent, {
  //   data: { errorModal:true }
  // });
  //       // console.log(error);
  //     });
  // };


}
