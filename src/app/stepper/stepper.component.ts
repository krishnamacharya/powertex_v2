import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalServiceService } from '../global-service.service';
import { DataServiceService } from '../data-service.service';
import { ComponentCommunicationService } from '.././component-communication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SHA512 } from 'crypto-js';
import { formatDate } from "@angular/common";
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatStepper } from '@angular/material/stepper';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
declare var $: any;

@Component({
  selector: 'app-stepper',
  standalone: false,
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;


  checkoutModal: any = {};
  newAddress: boolean = false;
  getAddress: any;
  loginUserData: any;
  secondFormGroup: FormGroup;
  input_id: string;
  user_id: string;
  count: number = 0;
  qty: number;
  carItems: any = [];
  setPosition: any;
  location: any;
  methodname: string;
  body: any;
  quantity: number;
  CartItem: any = {};
  grandtotal: any;
  prodId: any;
  test: any;
  hash: any;
  todayDate = new Date();
  headerData: any = {};
  itemsList: any = [];
  shipingAddress: any;
  edipShipAddress: any = {};
  countriesList: any;
  country: any;
  response1: any;
  state: any;
  response2: any;
  response3: any;
  payuShow: any;
  txnid: any = "";
  routeParams: any;
  buynowItem: any;
  addressId: any;
  modelno: any;
  message: any;
  payment: any = {};
  obj: any = {};
  orderId: any;
  wish_alert: any;
  alert: boolean;
  subcategory: any;

  constructor(private dialog: MatDialog, private _formBuilder: FormBuilder, private route: Router, public globalService: GlobalServiceService, public dataservice: DataServiceService, private activeRoute: ActivatedRoute, private eventemit: ComponentCommunicationService, private spinner: NgxSpinnerService) {
    this.activeRoute.params.subscribe((params:any) => { this.routeParams = params.id; });
  }

  ngOnInit() {
    this.alert = false;
    this.obj.id = 1;
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getAddress = JSON.parse(localStorage.getItem('getAddress'));
    this.countriesList = this.dataservice.getOnLoadServices(19);
    if (this.routeParams == 1) { // 1 for InternalUsers(Employee reg)
      this.viewcart();
    } else if (this.routeParams == 2) {
      this.buynowItem = JSON.parse(localStorage.getItem('buynowItem'));
      console.log("ddd", this.buynowItem);

      this.buynowItem.qty = 1;
      this.grandtotal = this.buynowItem.net_price * 1.18;
    } else if (this.routeParams == 3) {
      if (localStorage.getItem('BuyNow') == '1') {
        this.routeParams = 2;
      } else {
        this.routeParams = 1;
      }; this.generateOrderId(JSON.parse(localStorage.getItem('onlineCheckoutData')));
    }
    this.secondFormGroup = this._formBuilder.group({
      defaultAddress: ['', Validators.required]
    });
    this.checkoutModal.payment = 'COD'
    this.getUserAddresses();
    this.getPriceDetails();
  };

  getUserAddresses() {
    this.spinner.show();
    this.globalService.getDatawithQueryParams2(5.1, this.loginUserData.user_id, 'ship').subscribe((data) => {
      this.spinner.hide();
      this.shipingAddress = data;
      for (let as of this.shipingAddress) {
        if (as.default1 == 1) {
          this.headerData.shipping_seq_no = as.seq_no;
          this.headerData.billing_seq_no = as.seq_no;
        }
      }
      if (this.loginUserData.user_type == "Guest") {
        if (this.shipingAddress.length == 1 && data[0].city == "") {
          this.newAddress = true;
          this.edipShipAddress.mobile = this.shipingAddress[0].mobile;
          this.deleteAddress(data[0].seq_no);
        } else if (this.shipingAddress.length == 0) {
          this.newAddress = true;
        }
      }
      console.log(this.shipingAddress.length);
    })
  };

  deleteAddress(seqno) {
    this.spinner.show();
    this.globalService.getDatawithQueryParams1(7.4, seqno).subscribe((data) => {
      this.spinner.hide();
      console.log(data);
      this.getUserAddresses();
    })
  };

  addNewAdd(address, id) {
    this.addressId = id;
    if (id == 1) {
      this.edipShipAddress.seq_no = address.seq_no;
      this.edipShipAddress = address;
    } else {
      this.edipShipAddress = {};
    }
    this.newAddress = true;
  };

  cancelNewAdd() {
    this.newAddress = false;
  };

  saveAddress() {
    // this.spinner.show();
    this.edipShipAddress.user_id = this.loginUserData.user_id;
    this.edipShipAddress.address_category = "SHIP";
    this.edipShipAddress.default1 = 1;
    this.methodname = "insert_add/";
    this.globalService.postData(this.edipShipAddress, this.methodname).subscribe((data) => {
      // this.spinner.hide();
      if (data['status'] == "updated") {
        this.message = 'Updated Successfully!!!';
      } else if (data['status'] == "success") {
      } else {
        alert(data['status']);
      }
      this.newAddress = false;
      this.getUserAddresses();
    })
  };

  setasDefault(address) {
    this.headerData.shipping_seq_no = address.seq_no;
    this.headerData.billing_seq_no = address.seq_no;
    this.edipShipAddress = address;
    this.saveAddress();
  };

  onSelectCountry(country) {
    this.country = country;
    this.getDatawith1Param('15', country);
  }

  getDatawith1Param(input_id, param) {
    this.spinner.show();
    this.globalService.getDatawithQueryParams1(input_id, param).subscribe((data) => {
      this.spinner.hide();
      this.response1 = data;
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      });
  };

  onSelectState(state) {
    this.state = state;
    this.getDatawith2Param('16', this.country, state);
  }
  getDatawith2Param(input_id, param1, param2) {
    this.spinner.show();
    this.globalService.getDatawithQueryParams2(input_id, param1, param2).subscribe((data) => {
      this.spinner.hide();
      this.response2 = data;
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  };

  onSelectDistrict(district) {
    this.getDatawith3Param('17', this.country, this.state, district);
  };

  getDatawith3Param(input_id, param1, param2, param3) {
    this.spinner.show();
    this.globalService.getDatawithQueryParams3(input_id, param1, param2, param3).subscribe((data) => {
      this.spinner.hide();
      this.response3 = data;
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  };
  // =============================
  pricedetails: any = [];
  getPriceDetails() {
    let body;
    if (this.buynowItem) {
      body = { "net_amount": this.buynowItem.mrp, "gst": this.buynowItem.gst, "process": "PO" }
    } else {
      body = { "net_amount": (this.cartdata.grandtotal + this.pricedetails.trasnport_charges), "gst": this.gsttotal, "process": "PO" }
    }
    console.log(body);
    this.globalService.postData(body, "promocode/checkom/").subscribe((resp1) => {
      this.pricedetails = resp1

    })
  }
  // ==============================
  cartdata: any = [];
  gsttotal: number = 0
  viewcart() {

    this.spinner.show();
    this.input_id = "4.2";
    this.user_id = this.loginUserData.user_id;
    this.globalService.getDatawithQueryParams1(this.input_id, this.user_id).subscribe((data) => {
      this.spinner.hide();
      if (data['status'] == "success") {
        this.obj.cartItem_count = data['count'];
        this.eventemit.fire(this.obj);
        this.carItems = data['values'];
        this.cartdata = data;
        if (this.carItems.length == 0 && (this.orderId == '' || this.orderId == undefined)) {
          this.route.navigateByUrl('viewcart');
        }
      }
      this.grandtotal = 0;
      if (this.carItems.length > 0) {
        this.carItems.forEach(data => {
          this.grandtotal = this.grandtotal + ((data.aftergst));
          this.gsttotal = this.gsttotal + (data.gst_amount)
        });
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

  increment(data) {
    data.qty++;
    this.updateCart(data);
  }

  decrement(data) {
    if (data.qty > 1) {
      data.qty--;
      this.updateCart(data);
    }
  }

  updateCart(data) {

    this.spinner.show();
    this.methodname = "addtocart_site/";
    this.body = { "user_id": this.loginUserData.user_id, "productid": data.productid, "qty": data.qty }
    this.globalService.postData(this.body, this.methodname).subscribe((data) => {
      this.spinner.hide();
      if (data['Status'] == "Update sucessfully") {
        // this.message = data.Status;
        this.wish_alert = data['Status'];
        this.addwish();
        // this.icon = true;
        // $('#cartstepperModal').modal('show');
        //alert("cart Updated Successfully");
        this.viewcart();
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

  addwish() {
    this.alert = true;
    setInterval(() => {
      this.alert = false;
    }, 5000);
  }

  remove(item) {
    this.spinner.show();
    this.user_id = this.loginUserData.user_id;
    this.methodname = 'delete_cart/?user_id=' + this.user_id + '&productid=' + item;
    this.globalService.deleteData(this.methodname).subscribe((data) => {
      this.spinner.hide();
      this.viewcart();
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  };
  removebuyNowItem() {
    // this.buynowItemsList = [];
    this.buynowItem = "";
    localStorage.removeItem('buynowItem');
    alert('Item is removed');
    this.route.navigateByUrl('viewcart');
  };

  incrementbuyNowItem(data) {
    data.qty++;
    this.buynowItem.qty = data.qty;
    this.grandtotal = (this.buynowItem.net_price * (data.qty)) * 1.18;
  }

  decrementbuyNowItem(data) {
    if (data.qty > 1) {
      data.qty--;
      this.grandtotal = (this.buynowItem.net_price * (data.qty)) * 1.18;
    }
  }

  gotoPayment() {

    this.headerData = {
      document_no: 1,
      document_date: formatDate(this.todayDate, 'yyyyMMdd', 'en-US'),
      dest_company_code: 'HYD_MAIN',
      source_company_code: this.loginUserData.user_id + '@HYD_MAIN',
      source_user_id: this.loginUserData.user_id,
      inv_type: 'HYD_MAIN',
      shipment_point: 0,
      payment_terms: this.checkoutModal.payment,
      currency_code: "",
      exchange_rate: 0.00,
      spl_instr: "",
      transaction_id: this.txnid,
      shipping_seq_no: this.headerData.shipping_seq_no,
      billing_seq_no: this.headerData.billing_seq_no,
      created_user_id: this.loginUserData.user_id,
      creation_date: formatDate(this.todayDate, 'yyyyMMdd', 'en-US'),
      outstanding: 7,
      credit_period: 1000,
      credit_limit: 100000,
      business_name: 'customer',
      dest_user_id: this.headerData.handling_company_wh_manager


    };
    if (this.routeParams == 1) {
      this.itemsList = [];
      localStorage.setItem('BuyNow', '0');
      this.carItems.forEach(data => {
        var json_dtl =
        {
          "modelno": data.long_name,
          "net_price": data.enduserprice,
          "mrp": data.mrp,
          "piecepercarton": data.qty,
          "discount_eff": data.discount_a,
          "productid": data.productid,
          "document_date": formatDate(this.todayDate, 'yyyyMMdd', 'en-US'),
          "created_user_id": this.loginUserData.user_id,
          "document_no": 1,
          "qty": data.qty,
          "tot_value": data.total,
          "subcategory": data.long_name,
          "category": data.category,
        }
        if (this.loginUserData.user_type == "Customer") {
          json_dtl["confirm_status"] = 1
        }
        this.itemsList.push(json_dtl);
      });
    } else {
      this.itemsList = [];
      localStorage.setItem('BuyNow', '1');
      var json_dtl =
      {
        "net_price": this.buynowItem.net_price,
        "mrp": this.buynowItem.mrp,
        "piecepercarton": this.buynowItem.qty,
        "discount_eff": this.buynowItem.discount,
        "productid": this.buynowItem.productid,
        "document_date": formatDate(this.todayDate, 'yyyyMMdd', 'en-US'),
        "created_user_id": this.loginUserData.user_id,
        "document_no": 1,
        "qty": this.buynowItem.qty,
        "tot_value": this.grandtotal,
        "grandtotal": this.grandtotal,
      }
      if (this.loginUserData.user_type == "Customer") {
        json_dtl["confirm_status"] = 1
      }
      this.itemsList.push(json_dtl);
    }


    let body = {
      "process_in": 'PO', "operation_in": "INSERT", "draft_final_in": "FINAL", "document_no_out": "", "message_out": "",
      "json_hdr": this.headerData, "json_dtl": this.itemsList, "grandtotal": this.grandtotal, "po_no": this.orderId
    }
    localStorage.setItem('onlineCheckoutData', JSON.stringify(body));
    console.log(body);
    // //kd 1 line 439
    // this.route.navigateByUrl('paymentsuccessfull');
    if (this.checkoutModal.payment == 'COD') {
      this.generateOrderId(body);
      body = {
        "process_in": 'PO', "operation_in": "INSERT", "draft_final_in": "FINAL", "document_no_out": "", "message_out": "",
        "json_hdr": this.headerData, "json_dtl": this.itemsList, "grandtotal": this.grandtotal, "po_no": this.orderId
      }
      localStorage.setItem('onlineCheckoutData', JSON.stringify(body));
    }

  };

  generateOrderId(body) {
    this.spinner.show();
    let methodName = "insert_update/"
    this.globalService.postData(body, methodName).subscribe((data) => {
      this.spinner.hide();
      console.log(data);
      if (data['Message'] == 'PO Sucessfully inserted ') {
        localStorage.setItem('poprintData', JSON.stringify(data));
        this.orderId = data['PO'];
        if (this.routeParams == "2") {
          this.buynowItem = "";
          localStorage.removeItem('buynowItem');
        };
        localStorage.removeItem('onlineCheckoutData');
        $('#orderIdModal').modal('show');
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
  methodName: any;
  getPaymentMode(paymentType) {
    //this.spinner.show();
    if (paymentType == 'Online')
    /* if (paymentType == 'HYD_MAIN') */ {
      let methodName = "get_hash/"
      var txidbody = {
        "amount": this.cartdata.grandtotal ? this.cartdata.grandtotal : this.pricedetails.finalamount, "productinfo": "productinfo", "firstname": this.loginUserData.first_name,
        "email": this.loginUserData.email, "mobile": this.loginUserData.mobile
      }
      this.globalService.postData(txidbody, methodName).subscribe((data) => {
        this.spinner.hide();
        console.log(data);
        this.txnid = data['txnid'];
        this.payuShow = true;
        this.gotoPayu();
      },
        error => {
          this.spinner.hide();
          this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
          // console.log(error);
        });
    } else {
      this.payuShow = false;
    }
  }

  gotoPayu() {
    this.payment = {
      'amount': this.cartdata.grandtotal ? this.cartdata.grandtotal : this.pricedetails.finalamount,
      // 'amount': 1,
      'txnid': this.txnid,
      'key': 'sKRvVl',
      'salt': 'rHlRMHhl',
      'productinfo': 'payment',
      'firstname': this.loginUserData.first_name,
      'email': this.loginUserData.email,
      'phone': this.loginUserData.mobile
    };
    var stringData = this.payment.key + '|' + this.txnid + '|' + this.payment.amount + '|' + this.payment.productinfo + '|' + this.payment.firstname + '|' + this.payment.email + '|||||||||||' + this.payment.salt;
    this.hash = SHA512(stringData).toString();
    console.log(stringData);
  };

  closeModal() {
    if (this.routeParams == "1") {
      this.remove('All');
    };
    $('#orderIdModal').modal('hide');
    //  this.route.navigateByUrl('viewcart');
    /*  this.route.navigateByUrl('myOrders'); */
    /* this.route.navigateByUrl('/customer-po-print'); */
    this.route.navigateByUrl('/customer-order-print');
    this.gotoPrint(null)
    this.route.navigateByUrl('/customer-order-print');
  }

  gotoPrint(m) {
    if (m == "Your Cart Is Empty") {
    }
    else {
      this.route.navigateByUrl('/po-print');
    }
    // this.router.navigateByUrl('/po-print');
  }
};


