import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServiceService } from "../../global-service.service";
import { MatDialog } from '@angular/material/dialog';
import { formatDate } from "@angular/common";
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;

@Component({
  selector: 'app-import-make-invoice',
  standalone: false,
  templateUrl: './import-make-invoice.component.html',
  styleUrls: ['./import-make-invoice.component.scss']
})
export class ImportMakeInvoiceComponent implements OnInit {
  importPoData: any;
  loginUserData: any;
  poPackingListData: any;
  packingListModel: any = {};
  p: any = 1;
  todayDate = new Date();
  headerData: any;
  packingList: any = [];
  keys: string[];
  message: any;
  packingListNo: any;
  stockDataList: any = [];
  approveBtn: any = false;
  index: any;
  invoiceData: any;
  billingAddress: any;
  shipingAddress: any;
  importinvoiceData: any;

  constructor(private globalService: GlobalServiceService, private dialog: MatDialog, private route: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    console.log("log in",this.loginUserData);
    
    // if (this.loginUserData === null) {
    //   this.route.navigateByUrl('home');
    // }
    this.importPoData = JSON.parse(localStorage.getItem('importPoData'));
    console.log(this.importPoData);

    this.getpoData();
    this.headerData = {
      document_no: 1,
      document_date: formatDate(this.todayDate, 'yyyyMMdd', 'en-US'),
      dest_company_code: this.importPoData.po_origin_company_code,
      source_company_code: this.importPoData.company_code,
      inv_type: 'DOM',
      shipment_point: this.importPoData.shipment_point,
      payment_terms: this.importPoData.payment_terms,
      currency_code: this.importPoData.currency_code,
      exchange_rate: this.importPoData.exchange_rate,
      spl_instr: this.importPoData.spl_instr,
      remarks1: this.importPoData.remarks1,
      remarks2: this.importPoData.remarks2,
      ship_to_party_seq_no: this.importPoData.ship_to_party_seq_no,
      bill_to_party_seq_no: this.importPoData.bill_to_party_seq_no,
      credit_period: this.importPoData.credit_period,
      created_user_id: this.loginUserData.user_id
    };

    this.inv_printAddress();
  };

  getpoData() {
    this.spinner.show();
    this.globalService.getDatawithQueryParams4(3.9, 5, this.importPoData.po_no, this.importPoData.po_date, this.importPoData.po_origin_company_code).subscribe((data) => {
      this.spinner.hide();
      this.poPackingListData = data;
      this.poPackingListData.forEach(element => {
        this.packingListModel[element.po_srl_no] = element.balance_qty;
      });
      console.log(this.packingListModel);

    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  };

  checkQty(qty, packQty) {
    if (packQty > qty) {
      this.approveBtn = true;
    } else {
      this.approveBtn = false;
    }
  }
  makePackingLiat() {
    this.spinner.show();
    this.approveBtn = false;
    this.packingList = [];
    this.keys = Object.keys(this.packingListModel);

    for (let i = 0; i < this.poPackingListData.length; i++) {
      for (let j = 0; j < this.keys.length; j++) {
        if (this.poPackingListData[i].po_srl_no == this.keys[j]) {
          if (this.packingListModel[this.keys[j]] <= this.poPackingListData[i].qty) {
            let json_dtl = {
              "document_no": i,
              "document_date": formatDate(this.todayDate, 'yyyyMMdd', 'en-US'),
              "po_no": this.poPackingListData[i].po_no,
              "po_date": (this.poPackingListData[i].po_date).replace(/-/g, ""),
              "discount_eff": this.poPackingListData[i].discount_eff,
              "performainv_date": formatDate(this.todayDate, 'yyyyMMdd', 'en-US'),
              "po_srl_no": this.poPackingListData[i].po_srl_no,
              "productid": this.poPackingListData[i].productid,
              "inv_qty": this.packingListModel[this.keys[j]],
              "net_price": this.poPackingListData[i].fr_effectiveprice,
              "performa_inv_qty": 0,
              "mrp": this.poPackingListData[i].forex_mrp,
              "tot_value": this.poPackingListData[i].forex_value,
              "srl_no": i + 1,
              "inv_srl_no": 0,
              "packing_qty": 0,
              "inv_date": formatDate(this.packingListModel.inv_date, 'yyyyMMdd', 'en-US'),
              "inv_no": this.packingListModel.inv_no
            }
            this.packingList.push(json_dtl);
          } else {
            this.packingList = [];
            this.approveBtn = true;
            break;
          }
        }
      }
    };

    console.log(this.packingList);


    if (!this.approveBtn) {

      this.headerData.inv_date = formatDate(this.packingListModel.inv_date, 'yyyyMMdd', 'en-US');
      this.headerData.inv_no = this.packingListModel.inv_no;

      let body = {
        "process_in": 'IMPORT', "operation_in": "INSERT", "draft_final_in": "FINAL", "document_no_out": "", "message_out": "",
        "json_dtl": this.packingList, "json_hdr": this.headerData
      }
      console.log(body);
      let methodName = "insert_update/"
      this.globalService.postData(body, methodName).subscribe((data) => {
        this.spinner.hide();
        if (data['Message'] == "Sucessfully inserted ") {
          this.message = data['Message'];
          this.importinvoiceData = data;
          localStorage.setItem('importinvoiceData', JSON.stringify(this.importinvoiceData));
          console.log("invoice", this.invoiceData);
          $('#makeinvoiceModal').modal('show');
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
  };

  gotoPrevious() {
    this.route.navigateByUrl('product-manager-Invoice');
  };

  print_invoice() {
    this.route.navigateByUrl('/import-invoice-print');
  }

  inv_printAddress() {
    let input_id = "7.8";
    let param1 = this.importPoData.bill_to_party_seq_no + "," + this.importPoData.ship_to_party_seq_no;
    console.log(param1);
    return this.globalService.getDatawithQueryParams1(input_id, param1).subscribe(data => {
      console.log(data);
      this.billingAddress = data['Bill'];
      this.shipingAddress = data['SHIP'];
      localStorage.setItem('Inv_Address', JSON.stringify(data));
    });
  }

}
