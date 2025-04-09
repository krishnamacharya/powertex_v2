import { Component, OnInit } from "@angular/core";
import { GlobalServiceService } from "../global-service.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToasterService } from "./../toastr-service.service";
import * as fileSaver from 'file-saver';
import { MatDialog } from "@angular/material/dialog";
import { ErrorModalComponent } from "../authentication-views/error-modal/error-modal.component";
declare var $: any;

@Component({
  selector: "app-my-orders",
  standalone: false,
  templateUrl: "./my-orders.component.html",
  styleUrls: ["./my-orders.component.scss"]
})
export class MyOrdersComponent implements OnInit {
  loginUserData: any;
  myOrders: any = [];
  orderdetail: any = [];
  today: Date = new Date();
  wish_alert: any;
  icon: boolean;
  alert: boolean;
  P: any = 1;
  searchText: any;
  Page: number = 1;
  review: any = {};
  serial_no: any;
  pid: any;
  rating: any;
  can_d: any;
  cancel: any = {};
  shipto: any;
  billto: any;
  math = Math;
  constructor(
    private myOrderService: GlobalServiceService,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private toasterService: ToasterService
  ) {
    /*  if (this.date.shipto) {
      this.shipto = this.date.shipto;
      this.billto = this.date.billto;
    }
    else if (this.date.ship_to_party) {
      this.shipto = this.date.ship_to_party;
      this.billto = this.date.bill_to_party;
    } */
  }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem("loginUserData"));
    console.log(this.loginUserData);
    this.myOrdersget();
  }

  myOrdersget() {
    this.spinner.show();
    this.myOrderService
    // previous service
      // .getDatawithQueryParams1(7.6, this.loginUserData.user_id)
      .getDatawithMethodParams1('statuslist/', this.loginUserData.user_id)
      .subscribe(
        data => {
          this.spinner.hide();
          console.log(data);
          if (data["status"] == 1) {
            this.myOrders = data["data"];
            console.log(this.myOrders);
          } else if (data["status"] == 0) {
            //alert("No data is available.")
            // this.wish_alert = "No data is available."
            // this.addwish();
          } else {
          }
        },
        error => {
          this.spinner.hide();
          this.dialog.open(ErrorModalComponent, {
            data: { errorModal:true }
          });
          // console.log(error);
        }
      );
  }

  // addwish() {
  //   this.alert = true;
  //   setInterval(() => {
  //     this.alert = false;
  //   }, 5000);
  // }
  feedback(order) {
    console.log("tt", order.seqno);
    this.serial_no = order.seqno;
    this.pid = order.productid;
    this.rating = order.rating;

    $("#reviewfulModal").modal("show");
  }
  submit_review(rev) {
    this.spinner.show();
    console.log(rev);
    let loginMethod = "review/";
    let body = {
      sno: this.serial_no,
      userid: this.loginUserData.user_id,
      productid: this.pid,
      comments: rev.comment,
      title: rev.title,
      rating: this.rating,
      permission: 0
    };
    return this.myOrderService.postData(body, loginMethod).subscribe(data => {
      this.spinner.hide();
      if (data["status"] == "inserted" || "updated") {
        console.log(data["status"]);
      }
    });
  }
  get_detail(order) {
    console.log(order);
  }
  transportdetails: any
  amounts: boolean = false
  date: any = [];
  index: any
  mergedpocount: any = []
  pocount: any
  track_product(i, data) {
    this.amounts = false
    this.transport = false
    this.pocount = 0
    // 
    if (this.index == i) {
      this.index = null
    }
    else {
      this.index = i

      console.log(data, "data");
      // if (data.showw1 == true) {
      //   this.myOrders[i].showw1 = false;
      // } else {
      // if (data.status != "cancelled") {
      this.myOrderService
        .getcheckdata("statusseq/", data.seq_no)
        .subscribe(resp => {
          console.log("status12details", resp);
          this.date = resp[0];
          this.transportdetails = resp[0].transport_dtls
          //  this.date=data
          if (this.date['Packed'] == 1) {
            this.mergedpocount = this.date.mergedPO.split(',')
            console.log(this.mergedpocount, 'this.mergedpocount')
            if (this.mergedpocount.length > 1) {
              this.pocount = this.mergedpocount.length
            }
          }
          if (this.date['invoicemade'] == 1) {
            this.amounts = true
          }
          console.log(this.date, "data");
          // $("#trackModal").modal("show");

        });
      // this.myOrders[i].showw1 = true;

      // } else {
      //   this.toasterService.warning("cannot track product cancelled allready");
      // }
      // }
    }
  }
  transport: boolean = false
  view_transport() {
    if (this.transport == true) {
      this.transport = false
    }
    else {
      this.transport = true
    }

  }
  data: any;
  cancel_product2() {
    let loginMethod = "cancel/";
    let body = {
      seq_no: this.can_d.dtl_seq_no,
      productid: this.can_d.productid
    };

    return this.myOrderService
      .getDatawithdeleteQuery(
        loginMethod,
        this.can_d.dtl_seq_no,
        this.can_d.productid
      )
      .subscribe(data => {
        console.log("cancel", data);
        this.myOrdersget();
        this.spinner.hide();
      });
  }
  can_product(data) {
    if (data.status == "cancelled") {
      this.toasterService.warning("allready cancelled");
    } else {
      console.log("order", data);
      this.can_d = data;
      $("#cancelModalpopup").modal("show");
    }
  }

  submit_Can() {
    let data = this.can_d;
    console.log("del-data", data);
    this.spinner.show();
    let loginMethod = "cancel/";
    let body = { seq_no: data.dtl_seq_no, productid: data.productid };
    return this.myOrderService
      .getDatawithdeleteQuery(
        loginMethod,
        this.can_d.dtl_seq_no,
        this.can_d.productid
      )
      .subscribe(data => {
        console.log("cancel", data);
        this.myOrdersget();
        this.spinner.hide();
        // if (data.status == "inserted" || "updated") {
        //   console.log(data.status);

        // }
      });
  }
  index1: any
  mergedpo: any
  showProducts(i, value) {

    if (this.index1 == i) {
      this.index1 = null
    }
    else {
      this.index1 = i
      // if (value.showw == true) {
      //   this.myOrders[i].showw = false;
      // } else {
      this.spinner.show();
      this.myOrderService
        .getcheckdata("get_marketing_details/", value.spo_no)
        .subscribe(resp => {
          console.log("status12details", resp);
          this.myOrders[i].detail = resp;
          this.mergedpo = resp[0].mergedPO
          this.spinner.hide();
        });
      // this.myOrderService
      // .getcheckdata("statusseq/", value.seq_no)
      // .subscribe(resp => {
      //   console.log("status12details", resp);
      //   this.myOrders[i].detail = resp[0].detail;
      //     this.mergedpo=resp[0].mergedPO
      //     this.spinner.hide();
      // })
      //   this.myOrders[i].showw = true;
      // }
    }
  }
  dataURLtoFile(image,inv_no) {
    // let image = this.ordersdetail[0].invcopy;
    // let inv_no = this.ordersdetail[0].refinvno;
    if (image) {
      let blob: any = new Blob([image], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;
      var count = (image.match(/media/g) || []).length;
      if (count > 1) {
        image = image.replace(/\/media/, '')
      }
      fileSaver.saveAs(this.myOrderService.imageurl + image, inv_no+"_Inv_Copy." + image.substr(image.length - 5).split('.')[1]);
    }
    else{
        this.toasterService.error("Data Not Available..!")
    }
  }
}
