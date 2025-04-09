import { Component, OnInit } from '@angular/core';
import { ToasterService } from '../toastr-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentCommunicationService } from '../component-communication.service';
import { GlobalServiceService } from '../global-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-wish-listwh-pending-packing-moreinfo',
  standalone: false,
  
  templateUrl: './wish-listwh-pending-packing-moreinfo.component.html',
  styleUrl: './wish-listwh-pending-packing-moreinfo.component.scss'
})
export class WishListwhPendingPackingMoreinfoComponent implements OnInit {
  printdata: any = [];
  p: any = 1;
  loginUserData: any;
  searchText: any;
  obj: any = {};
  transport: any = {};
  poList: any = [];
  headerData: any;
  headeDetails: any;
  today = new Date();
  pendingdetail: any;
  po: any = [];
  public fieldArray: Array<any> = [];
  fieldArray1: any = [];
  private newAttribute1: any = {};
  constructor(
    private toaster: ToasterService,
    private router: ActivatedRoute,
    private route: Router,
    public dialog: MatDialog,
    private eventEmmit: ComponentCommunicationService,
    private globalService: GlobalServiceService,
    // private dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem("loginUserData"));
    if (this.loginUserData === null) {
      console.log("status111", this.loginUserData);
      this.route.navigateByUrl("home");
    }
    this.globalService
      .getHeaderDetails(1, this.loginUserData.user_id)
      .subscribe(
        data => {
          this.headeDetails = data[0];

          this.headerData = {
            document_no: 1,
            document_date: formatDate(this.today, "yyyyMMdd", "en-US"),
            dest_company_code: this.headeDetails.handling_company_code,
            dest_user_id: this.headeDetails.handling_company_wh_manager,
            source_company_code: this.printdata.po_origin_company_code,
            source_user_id: JSON.parse(this.printdata.po_origin_user_id),
            created_user_id: this.headeDetails.user_id,
            inv_type: "DOM",
            shipment_point: 0,
            currency_code: "",
            exchange_rate: 0.0
          };
        },
        error => {
          this.spinner.hide();
          this.dialog.open(ErrorModalComponent, {
            data: { errorModal:true }
          });
          // this.ngxSmartService.getModal('errorModal').open();
    
        });
    this.printdata = JSON.parse(localStorage.getItem("Podata"));
    this.fieldArray1 = [];
    this.pendingdetail = this.printdata.detail;
    for (let k of this.pendingdetail) {
      this.newAttribute1["seq_no"] = k.seq_no;
      this.newAttribute1["category"] = k.category;
      this.newAttribute1["subcategory"] = k.subcategory;
      this.newAttribute1["modelno"] = k.modelno;
      this.newAttribute1["qty"] = k.balance_qty;
      this.newAttribute1["carton"] = k.balance_qty / k.piecepercarton;
      this.newAttribute1["productid"] = k.productid;
      this.newAttribute1["net_price"] = k.net_price;
      this.newAttribute1["discount1"] = k.discount_eff;
      this.newAttribute1["po_srl_no"] = k.po_srl_no;
      this.newAttribute1["comment"] = k.comment;
      this.newAttribute1["mrp"] = k.mrp;
      this.newAttribute1["stock"] = k.stock_qty;
      this.newAttribute1["piecepercarton"] = k.piecepercarton;
      this.newAttribute1["document_date"] = formatDate(
        this.today,
        "yyyyMMdd",
        "en-US"
      );
      this.newAttribute1["created_user_id"] = this.loginUserData.user_id;
      this.newAttribute1["document_no"] = 1;
      this.newAttribute1["gst_amount"] = k.gst_amount;
      this.newAttribute1["tot_value"] = k.tot_value;
      this.newAttribute1["free_qty"] = k.free_qty;
      this.newAttribute1["type"] = k.offer_type;
      this.newAttribute1["total_value"] = k.total_value;
      this.newAttribute1["sp_discount"] = k.sp_discount;
      this.fieldArray.push(this.newAttribute1);
      // if (k.stock_qty >= k.balance_qty) {
      if (k.stock_qty > 0) {
        this.fieldArray1.push(this.newAttribute1);
      }
      this.newAttribute1 = {};
    }
    //  this.po = [ ...this.fieldArray];
    console.log("fieldArray1111", this.fieldArray1);
  }

  final_amount: any;
  gst_amount: any;
  deleteFieldValue2(index) {
    this.fieldArray.splice(index, 1);
    //   this.po.splice(index, 1);
    //   console.log(this.po,"this.po")
    //   this.final_amount=  this.po.filter((item) => item.total_value)
    //   .map((item) => +item.total_value).reduce((sum, current) => 0 + current);
    //   this.gst_amount=  this.po.filter((item) => item.gst_amount)
    //   .map((item) => +item.gst_amount).reduce((sum, current) => 0 + current);
  }

  promo_amount: any;

  promocode: any;

  loginMethod: string;
  body: any;
  myJSON: any;
  poprint: any;
  Message: any;
  line_amount: any;
  selected_list: any = [];
  confirm_order() {
    if (this.fieldArray1.length > 0) {
      this.spinner.show();
      // this.a_order=false;
      // this.co_check=false;
      if (this.printdata.spl_instr) {
        this.headerData.spl_instr = this.printdata.spl_instr;
      } else {
        this.headerData.spl_instr = "";
      }

      this.headerData.shipping_seq_no = this.printdata.ship_to_party_seq_no;
      this.headerData.billing_seq_no = this.printdata.bill_to_party_seq_no;
      this.headerData.credit_period = this.printdata.credit_period;
      this.headerData.payment_terms = this.printdata.payment_terms;

      this.headerData.devicediscamount = this.printdata.devicediscamount;
      this.headerData.line_amount = this.fieldArray1
        .filter(item => item.tot_value)
        .map(item => +item.tot_value)
        .reduce((sum, current) => sum + current);
      this.gst_amount = this.fieldArray1
        .filter(item => item.gst_amount)
        .map(item => +item.gst_amount)
        .reduce((sum, current) => sum + current);

      console.log(this.line_amount, "this.line_amount");
      this.headerData.final_amount =
        this.headerData.line_amount + this.gst_amount;
      this.headerData.gst_amount = this.gst_amount;
      if (this.printdata.code1) {
        this.headerData.promo_amount = this.printdata.promo_amount;
        this.headerData.promocode = this.printdata.code1;
      } else {
        this.headerData.promo_amount = 0.0;
        this.headerData.promocode = "";
      }
      let process_in = "PO";
      let operation_in = "INSERT";
      let draft_final_in = "FINAL";
      let document_no_out = "";
      let message_out = "";
      this.loginMethod = "insert_update/";

      this.body = {
        process_in: process_in,
        json_hdr: this.headerData,
        json_dtl: this.fieldArray1,
        operation_in: operation_in,
        draft_final_in: draft_final_in,
        document_no_out: document_no_out,
        message_out: message_out
      };

      this.myJSON = JSON.stringify(this.body);

      this.globalService.postData(this.myJSON, this.loginMethod).subscribe(
        data => {
          this.spinner.hide();
          this.poprint = data;
          for (let data of this.fieldArray1) {
            this.selected_list.push({
              productid: data.productid,
              po_srl_no: data.po_srl_no,
              seq_no: data.seq_no,
              status: 0,
              qty: data.qty,
              net_price: data.net_price,
              user_id: this.loginUserData.user_id,
              comment: data.comment
            });
          }
          let body = this.selected_list;
          let methodName = "cancel/";
          this.globalService.postData(body, methodName).subscribe(data => {
            this.selected_list = [];

            error => {
              // this.spinner.hide();
              // this.ngxSmartService.getModal("errorModal").open();
              this.dialog.open(ErrorModalComponent, {
                data: { errorModal:true }
              });
              // console.log(error);
            };
          });
          this.poprint.status = "pendingpo";
          this.final_amount = "";
          this.gst_amount = "";
          this.fieldArray1 = [];
          localStorage.setItem("poprintData", JSON.stringify(data));
          this.Message = data["Message"] + ", With PO no :" + data["PO"];
          if (data["Message"] == "PO Sucessfully inserted ") {
            $("#orderSuccessfulModal").modal("show");
          }
        },
        error => {
             this.spinner.hide();
             this.dialog.open(ErrorModalComponent, {
               data: { errorModal:true }
             });
             // this.ngxSmartService.getModal('errorModal').open();
       
           });
    } else {
      this.toaster.warning("stock not available for this products");
    }
  }

  gotoPrint(m) {
    this.route.navigateByUrl("/po-print");
  }
}
