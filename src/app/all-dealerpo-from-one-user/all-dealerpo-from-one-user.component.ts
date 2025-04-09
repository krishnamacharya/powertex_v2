import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '.././global-service.service';
import { DataServiceService } from '.././data-service.service';
import { formatDate } from '@angular/common';
import { Router, ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from '../toastr-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ComponentCommunicationService } from '../component-communication.service';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
import { LoginModalComponent } from '../authentication-views/login-modal/login-modal.component';
import { filter } from 'rxjs';
declare var $: any;


@Component({
  selector: 'app-all-dealerpo-from-one-user',
  standalone: false,
  templateUrl: './all-dealerpo-from-one-user.component.html',
  styleUrls: ['./all-dealerpo-from-one-user.component.scss']
})
export class AllDealerpoFromOneUserComponent implements OnInit {
  grandtotal: any;
  input_id: string;
  carItems: any = [];
  resources: any;
  resources1: any = {};
  paymentData: any = {};
  selectedCategory: any = '';
  selectedSub: any = '';
  selectedList: any[] = [];
  isHidden: boolean = false;
  isAdvHidden: boolean = false;
  mod_modalno: any = [];
  private newAttribute: any = {};
  selectedCategory_form: any = '';
  selectedSubCategory_form: any;
  httpdata3: any;
  po: any = [];
   fieldArray: Array<any> = [];
   newAttribute1: any = {};
  httpdata: any;
  httpdata2: any;
  h;
  public sub: any;
  public sub1: any;
  public cat;
  public Select_modal = [];
  public detail = [];
  loginUserData: any;
  today = new Date();
  tday = +this.today;
  headeDetails: any;
  headerData: any;
  loginMethod: string;
  body: any;
  placeOrder: any = [];
  billAdd: any;
  shipAdd: any;
  shipping_seq_no: any;
  billing_seq_no: any;
  myJSON: any;
  seq: any = [];
  poHidden: boolean = true;
  addressHidden = !this.poHidden;
  selected_cat = "";
  selected_sub_cat = "";
  userid: any;
  user_id: any;
  poPrintData: any;
  poprint: any = {};
  Field_Qaun: boolean = false;
  selected_modalno: any;
  selected_ship = '';
  selected_bill = '';
  isheck: boolean = false;
  modal_data: any;
  saved_l: any[];
  s_Array: any = [];
  Message: any;
  edipShipAddress: any = {};
  newAddress: any;
  country: any = 'INDIA';
  state: any;
  response2: any;
  response3: any;
  response1: any;
  new_add: boolean = true;
  co_check: boolean = true;
  a_order: boolean = true;
  ev_hit: any;
  attributes: any;
  detailed_class: boolean = false;
  attr_image: any;
  // upd: number;
  adv_det: any;
  a_detail: any;
  adv_det_disp: boolean;
  cnt: number = 0;
  Spl_netprice: any;
  order_items: any = 0;
  dealer_userid: any
  dealer_creditperiod: any
  dealer_creditlimit: any
  dealer: boolean = false;
  dealers: any;
  orderspage: boolean = false;
  category: any
  subcategory: any
  modelno: any
  Page: any = 1;
  cart: any = false;
  cartobj: any = {};
  company_code: any;
selectedObj: any;
dealer_outstanding: any;
selected: any;
ev: any;
  constructor(private service: GlobalServiceService, public route: ActivatedRoute, private dat_s: DataServiceService, private router: Router, private toasterService: ToasterService, private dialog: MatDialog, private eventemit: ComponentCommunicationService, private spinner: NgxSpinnerService) {
    this.cartobj['id'] = 1;
  }
  branchcode: any
  obj: any
  ngOnInit() {
    this.route.queryParams
    .pipe(
      filter((params:any) => params.cart)
    )
      .subscribe(params => {
        this.cart = params.cart;
        if (this.cart == "true") {
          this.poHidden = !this.poHidden;
          this.addressHidden = !this.poHidden;
        }
      });
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));

    this.getoffers()
    this.user_id = this.loginUserData.user_id
    this.user_id = this.loginUserData.user_id;
    this.service.getHeaderDetails(1, this.loginUserData.user_id).subscribe((data) => {
      this.headeDetails = data[0];
      if (this.loginUserData.role == "Dealer") {
        this.headerData = {
          document_no: 1,
          document_date: formatDate(this.today, 'yyyyMMdd', 'en-US'),
          dest_user_id: this.headeDetails.handling_company_wh_manager,
          source_company_code: this.headeDetails.user_id + "@" + this.headeDetails.company_code,
          source_user_id: this.headeDetails.user_id,
          created_user_id: this.headeDetails.user_id,
          inv_type: "DOM",
          shipment_point: 0,
          currency_code: "",
          exchange_rate: 0.00,
          dest_company_code: this.headeDetails.company_code
        }
      }
      else if (this.loginUserData.role == "Special") {
        this.headerData = {
          document_no: 1,
          document_date: formatDate(this.today, 'yyyyMMdd', 'en-US'),
          dest_user_id: this.headeDetails.handling_company_wh_manager,
          created_user_id: this.headeDetails.user_id,
          inv_type: "DOM",
          shipment_point: 0,
          currency_code: "",
          exchange_rate: 0.00,

        }
      }
      else {
        this.headerData = {
          document_no: 1,
          document_date: formatDate(this.today, 'yyyyMMdd', 'en-US'),
          dest_company_code: this.headeDetails.handling_company_code,
          dest_user_id: this.headeDetails.handling_company_wh_manager,
          source_company_code: this.headeDetails.company_code,
          source_user_id: this.headeDetails.user_id,
          created_user_id: this.headeDetails.user_id,
          inv_type: "DOM",
          shipment_point: 0,
          currency_code: "",
          exchange_rate: 0.00,
        }
      }
    },
      error => {
        // this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });

      });

    let data = this.route.params.subscribe(params => {
      if (params['category']) {
        this.selectedCategory_form = atob(params['category']);
        this.newAttribute1.category = atob(params['category']);
        this.newAttribute1.subcategory = atob(params['subcategory']);
        this.selectedSubCategory_form = atob(params['subcategory']);
        this.newAttribute1.modelno = atob(params['modelno']);
        this.newAttribute1.carton = atob(params['cartoon']);
        this.newAttribute1.qty = atob(params['qty']);
        this.newAttribute1.tot_value = atob(params['tot_value']);
        this.change2(this.newAttribute1.modelno, undefined)
      }
    },
      error => {
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        // console.log(error);
      });

    this.getprodimg();
    if (this.loginUserData.role != "Special") {
      this.orderspage = true;
      this.getShipAdd();
      this.getBillAdd();
      this.getNotificationCount()
      var list = document.getElementsByTagName("h3")[0];
      //  var p=list.getElementsByTagName("span")[0].innerHTML;
    }

    if (this.loginUserData.role == "Special") {
      this.getdealerslist(this.user_id)
    }
    if (this.cart == "true") {
      this.viewcart();
      if (this.loginUserData.role == "Dealer") {
        this.change();
      }
      if (this.loginUserData.role == "Special") {
        this.change();
      }

      this.getnetamount();
    }
  }
  viewcart() {
    this.spinner.show();
    this.input_id = "4.2";
    this.user_id = this.loginUserData.user_id;
    this.service.getDatawithQueryParams1(this.input_id, this.user_id).subscribe((data) => {
      this.spinner.hide();
      if (data['status'] == "success") {
        // this.fieldArray=data['values'];
        // this.po = [ ...this.fieldArray];
        this.disp1(data['values']);
        this.promo_amount = ""
        this.final_amount = data['grandtotal']
        this.promocode = ""
        this.gstamount = data['grand_tax']
        this.obj.cartItem_count = this.carItems.length;

      }
      // console.log(this.carItems);
      // this.grandtotal = 0;
      // this.carItems.forEach(data => {
      //   this.grandtotal = this.grandtotal + ((data.aftergst));
      // });
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        // console.log(error);
      });
  }

  /* disp1(resp: Response): any {
    this.fieldArray=[];
     this.h = resp;
     for (let k of this.h) {
      this.newAttribute1['category'] = k.category;
      this.newAttribute1['subcategory'] = k.subcategory;
      this.newAttribute1['modelno'] = k.modelno;
      this.newAttribute1['qty'] = k.qty;
      this.newAttribute1['carton'] = k.qty/k.piecepercarton;
       this.newAttribute1['productid'] = k.productid;
       this.newAttribute1['net_price'] = k.enduserprice;
       this.newAttribute1['discount1'] = k.discount_a;
       this.newAttribute1['mrp'] = k.mrp;
       this.newAttribute1['stock'] = k.stock_qty;
       this.newAttribute1['piecepercarton'] = k.piecepercarton;
       this.newAttribute1['document_date'] = this.headerData.document_date;
       this.newAttribute1['created_user_id'] = this.loginUserData.user_id;
       this.newAttribute1['document_no'] = this.headerData.document_no;
       this.newAttribute1['gst_amount']=k.gst;
       this.newAttribute1['tot_value']=k.total;
      this.newAttribute1['free_qty']=0;
       this.newAttribute1['sp_discount']=0;
       this.fieldArray.push(this.newAttribute1);
       this.newAttribute1={};
     }
     this.po = [ ...this.fieldArray];
   } */
  disp1(resp: Response): any {
    this.fieldArray = [];
    this.h = resp;
    for (let k of this.h) {
      this.newAttribute1['category'] = k.category;
      this.newAttribute1['subcategory'] = k.subcategory;
      this.newAttribute1['modelno'] = k.modelno;
      this.newAttribute1['qty'] = k.qty;
      this.newAttribute1['carton'] = k.qty / k.piecepercarton;
      this.newAttribute1['productid'] = k.productid;
      this.newAttribute1['net_price'] = k.enduserprice;
      this.newAttribute1['discount1'] = k.discount_a;
      this.newAttribute1['mrp'] = k.mrp;
      this.newAttribute1['stock'] = k.stock_qty;
      this.newAttribute1['piecepercarton'] = k.piecepercarton;
      this.newAttribute1['document_date'] = this.headerData.document_date;
      this.newAttribute1['created_user_id'] = this.loginUserData.user_id;
      this.newAttribute1['document_no'] = this.headerData.document_no;
      this.newAttribute1['gst_amount'] = k.gst;
      this.newAttribute1['tot_value'] = k.total;
      this.newAttribute1['free_qty'] = 0;
      this.newAttribute1['sp_discount'] = 0;
      this.fieldArray.push(this.newAttribute1);
      this.newAttribute1 = {};
    }
    this.po = [...this.fieldArray];

    this.onchangecartons1(null, null)


  }
  getnetamount() {
    this.net_amount = 0;
    this.taxAmount = 0;
    this.net_amount = 0;
    this.grand_total = this.fieldArray.filter((item) => item.tot_value)
      .map((item) => +item.tot_value)
      .reduce((sum, current) => sum + current);
    console.log(this.grand_total, "grandtotal");
    this.taxAmount = this.fieldArray.filter((item) => (item.gstt_amount = item.gst_amount * item.qty))
      .map((item) => +item.gstt_amount)
      .reduce((sum, current) => sum + current);
    console.log(this.taxAmount, "taxAmount");
    this.net_amount = this.grand_total + this.taxAmount
    console.log(this.net_amount, "net_amount");
    this.gstamount = this.taxAmount;
    this.final_amount = this.net_amount;


  }
  specialdisc: any = [];
  async onchangecartons1(cartons, index) {
    this.spinner.show();
    let response = [];
    for (var i = 0; i < this.fieldArray.length; i++) {
      this.Spl_netprice = this.fieldArray[i].net_price;

      response.push(await this.service.getDatawithQueryParams4User_id("121", this.fieldArray[i].productid,
        this.fieldArray[i].qty, this.Spl_netprice, this.fieldArray[i].discount1,
        this.loginUserData.user_id).toPromise());
      if (response[i]) {
        this.fieldArray[i].sp_discount = response[i].sp_discount;
        this.fieldArray[i].free_qty = response[i].free_qty;
        this.fieldArray[i].net_price = Math.round((response[i].net + Number.EPSILON) * 100) / 100;
        this.fieldArray[i].sp_dic_amount = response[i].sp_dic_amount;
        this.fieldArray[i].gst_amount = (this.fieldArray[i].net_price / 100) * 18;
        let n = (this.fieldArray[i].qty * this.fieldArray[i].net_price);
        this.fieldArray[i].tot_value = n;
        if (this.fieldArray[i].sp_discount === null) {
          this.fieldArray[i].sp_discount = 0;
        }
        if (this.fieldArray[i].free_qty === null) {
          this.fieldArray[i].free_qty = 0;
        }
        if (this.fieldArray[i].sp_dic_amount === null) {
          this.fieldArray[i].sp_dic_amount = 0;
        }
        this.spinner.hide();

      }
    }
    if (this.fieldArray.length > 0) {
      this.getnetamount()
    }
  }
  totaloutstandingamount: any
  getNotificationCount() {
    this.service.getDatawithQueryParams1nd4('4.21', this.loginUserData.user_id, this.loginUserData.company_code).subscribe((data) => {
      this.totaloutstandingamount = data['outstanding'];
    },
      // error => {
      //   //this.ngxSmartService.getModal('errorModal').open();
// this.dialog.open(ErrorModalComponent, {
//       data: { errorModal:true }
//     });


      // }
    );
  };
  getdealerslist(user_id) {
    return this.service.getDatawithMethodParams1('market/drop', user_id).subscribe((resp) => {
      this.dealers = resp;
    })
  }

  dealer_companycode: any;
  dest_companycode: any
  dealer_chn(event) {
    this.orderspage = true
    this.newAttribute1 = {}
    this.dealer_userid = event.user_id
    this.dealer_companycode = event.user_id + "@" + event.company_code;
    this.dest_companycode = event.company_code
    this.dealer_creditperiod = event.credit_period
    this.dealer_creditlimit = event.credit_limit
    this.getShipAdd();
    this.getBillAdd();
    this.dealer = true

    // this.dealer_companycode=event.company_code;
  }

  addNewAdd() {
    this.new_add = false;
    this.getDatawith1Param('15', this.country);
    this.newAddress = true;
  };

  cancelNewAdd() {
    this.newAddress = false;
    this.new_add = true;
  };

  getDatawith1Param(input_id, param) {
    this.spinner.show();
    this.service.getDatawithQueryParams1(input_id, param).subscribe((data) => {
      this.spinner.hide();
      this.response1 = data;
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
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
    this.service.getDatawithQueryParams2(input_id, param1, param2).subscribe((data) => {
      this.spinner.hide();
      this.response2 = data;
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      });
  };

  onSelectDistrict(district) {
    this.getDatawith3Param('17', this.country, this.state, district);
  };

  getDatawith3Param(input_id, param1, param2, param3) {
    this.spinner.show();
    this.service.getDatawithQueryParams3(input_id, param1, param2, param3).subscribe((data) => {
      this.spinner.hide();
      this.response3 = data;
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      });
  };

  saveAddress(form) {

    this.spinner.show();
    if (this.loginUserData.role == "Special") {
      this.edipShipAddress.user_id = this.dealer_userid
    }
    else {
      this.edipShipAddress.user_id = this.loginUserData.user_id;
    }
    this.edipShipAddress.address_category = "SHIP";
    this.edipShipAddress.default1 = 1;
    var methodname = "insert_add/";
    this.service.postData(this.edipShipAddress, methodname).subscribe((data) => {
      this.spinner.hide();
      if (data['status'] == "success") {
        form.reset();
        $("#addresModal").modal('show');
      }
      else {
        alert(data['status']);
      }
      this.newAddress = false;
      this.getShipAdd();
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      });
  }

  getBillAdd(): any {
    if (this.loginUserData.role == "Special") {
      this.user_id = this.dealer_userid
    }
    return this.service.getDatawithQueryParams2(5.1, this.user_id, "bill").subscribe((resp) => {
      this.spinner.hide();
      this.billAdd = resp;
    },
      error => {
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });

      });
  }

  getShipAdd(): any {

    if (this.loginUserData.role == "Special") {
      this.user_id = this.dealer_userid
    }
    return this.service.getDatawithQueryParams2(5.1, this.user_id, "ship").subscribe((resp) => {
      this.spinner.hide();
      this.shipAdd = resp;
    },
      error => {
        // this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      });
  }

  getprodimg() {
    return this.service.getDatawithMethod1('get_products_category/').subscribe((resp) => {
      this.resources = resp;
    },
      error => {
        // this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });

      });
  }
  httpdatadet: any
  getModal(p, q) {

    let select = "All";
    return this.service.getDatawithQueryParams4('10', p, q, select, this.mod_modalno).subscribe((resp) => {
      this.httpdata = resp;
      this.httpdatadet = this.httpdata.data
    },
      error => {
        // this.spinner.hide();
        // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      });
  }

  httpdata2data: any
  getModal1(p, q, r) {


    this.mod_modalno = [];
    if (this.loginUserData.role == "Special") {
      return this.service.getDatawithQueryParams4User_id('10', p, q, r, this.mod_modalno, this.dealer_userid).subscribe((resp) => {
        this.httpdata2 = resp;
        this.httpdata2data = this.httpdata2.data
        //console.log('httpdata2',this.httpdata2);
      })
    }
    else {
      return this.service.getDatawithQueryParams4User_id('10', p, q, r, this.mod_modalno, this.loginUserData.user_id).subscribe((resp) => {
        this.httpdata2 = resp;
        this.httpdata2data = this.httpdata2.data
        //console.log('httpdata2',this.httpdata2);
      }
        // ,
        //   error => {
        //     // this.spinner.hide();
        //     //this.ngxSmartService.getModal('errorModal').open();
// this.dialog.open(ErrorModalComponent, {
//       data: { errorModal:true }
//     });
        //   }
      );
    }
  }

  httpdata3data: any
  getModal2(p, q, r) {


    this.spinner.show();
    if (this.loginUserData.role == "Special") {

      return this.service.getDatawithQueryParams4User_id('10', p, q, r, this.mod_modalno, this.dealer_userid).subscribe((resp) => {

        this.httpdata3 = resp;
        this.httpdata3data = this.httpdata3.data

        this.disp(this.httpdata3data);
        this.spinner.hide();
      },
        error => {
          // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        });
    }
    else {
      return this.service.getDatawithQueryParams4User_id('10', p, q, r, this.mod_modalno, this.loginUserData.user_id).subscribe((resp) => {
        this.httpdata3 = resp;
        this.httpdata3data = this.httpdata3.data
        this.disp(this.httpdata3data);
        if (this.httpdata2data == undefined) {
          this.httpdata2data = this.httpdata3.data
        }

        this.spinner.hide();
      },
        error => {
          //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        });
    }
  }


  display() {
    this.isHidden = !this.isHidden;
    this.isAdvHidden = false;
  }

  adv_display() {
    this.isAdvHidden = !this.isAdvHidden;
    this.isHidden = false;
  }
  cartbody: any = {};
  count: any = 0;
  addFieldValue() {
    this.count = 0;

if (this.newAttribute1.carton == "") {

  this.toasterService.warning ("Please Fill All The Required Fields")
  
} else {


  for (let i of this.fieldArray) {
    if (i.productid == this.newAttribute1.productid) {
      this.toasterService.warning("Product already exist")
      this.count++
      break;
    }
  }
  if (this.count == 0) {
    this.cnt = 0;
    this.Spl_netprice = '';
    this.newAttribute1.Field_Qaun = "true";
    this.fieldArray.push(this.newAttribute1);
    this.cartbody = this.newAttribute1;
    this.newAttribute1 = {};
    this.order_items = this.selectedList.length + this.fieldArray.length;

    if (this.cart == "true") {
      this.addToCart(this.cartbody)
      this.cartobj['cartItem_count'] = this.data['count'];
      this.eventemit.fire(this.cartobj);
    }
  }
}
  }
  add_disable(attr) {
    let arr = ["category", "carton", "subcategory", "modelno", "qty", "piecepercarton", "net_price"];
    for (let i of arr) {
      if (attr[i] == null || attr[i] == undefined) {

        return true;
      }
    }

    return false;
  }

  placeorder_disable(attr, sl, field) {
    let arr = ["category", "carton", "subcategory", "modelno", "qty", "piecepercarton", "net_price"];
    for (let i of arr) {
      if (this.newAttribute1[i] == null || this.newAttribute1[i] == undefined) {
        return true
      }
    }
    return false;
  }

  placeorder_disable2() {
    let arr = ["category", "carton", "subcategory", "modelno", "qty", "piecepercarton", "net_price"];
    if (this.selectedList['category'] !== '' && this.selectedList['subcategory'] !== '' && this.selectedList['modelno'] !== '' && this.selectedList['category'] !== 'qty') {
      for (let i of arr) {
        if ((this.newAttribute1[i] == null || this.newAttribute1[i] == undefined) && (this.selectedList[i] == null || this.selectedList[i] == undefined)) {
          return true
        }
      }
      return false;
    }
  }

  deleteFieldValue2(index) {
    this.order_items = this.fieldArray.length - 1;
    this.fieldArray.splice(index, 1);
    this.cartobj['cartItem_count'] = this.data['count'];
    this.eventemit.fire(this.order_items);
  }
  deleteFieldValue3() {
    this.newAttribute1.category = '';
   this.newAttribute1.stock_qty = '';
   this.newAttribute1.stock = '';
   this.newAttribute1.subcategory = '';
   this.newAttribute1.modelno = '';
   this.newAttribute1.net_price = '';
   this.newAttribute1.mrp = '';
   this.newAttribute1.qty = '';
   this.newAttribute1.piecepercarton = '';
   this.newAttribute1.carton = '';
   this.newAttribute1.tot_value = '';
  }

  change_form(val) {
    this.catg_change(val);
    this.selectedCategory_form = val;
  }
  add: boolean = false
  catg_change(val) {

    let arr = ["subcategory", "carton", "modelno", "qty", "piecepercarton", "net_price", "tot_value"];
    if (val == '') {
      this.add = true
      for (let i of arr) {
        this.newAttribute1[i] = '';
        this.selectedSubCategory_form = undefined;
        this.selected_modalno == '';

      }
    }
  }


  sele_sub_catg() {

    if (this.selectedCategory_form == "") {
      this.add = true
      return true;
    }

    return false;
  }

  total = 0;
  disablee() {
    this.total = 0;
    for (let i of this.selectedList) {
      if (i.tot_value != null && i.tot_value != undefined && i.tot_value > 0) {
        this.total++
      }
    }
    if (this.selectedList.length == this.total) {
      return false
    }
    else {
      return true;
    }
  }
  sele_model() {
    if ((this.selectedSubCategory_form == undefined) || (this.selectedSubCategory_form == 'undefined')) {
      this.add = true
      return true;
    }

    return false;
  }

  sele_quan() {
    if ((this.selected_modalno == undefined) || (this.selected_modalno == '')) {
      this.add = true
      return true;
    }

    return false;
  }

  disp(resp: Response): any {

    this.h = resp;
    for (let k of this.h) {
      if (k.offer) {
      } else {

      }
      this.newAttribute1['productid'] = k.productid;
      this.newAttribute1['net_price'] = k.net_price;
      this.newAttribute1['discount1'] = k.discount;
      this.newAttribute1['mrp'] = k.mrp;
      if (this.loginUserData.role != 'Special') {
        if (k.stock_qty > 0) {

          this.newAttribute1['stock'] = 'Y';
        }
        else {
          this.newAttribute1['stock'] = 'N';
        }
      }
      else {

        this.newAttribute1['stock'] = k.stock_qty;


      }

      this.newAttribute1['piecepercarton'] = k.piecepercarton;
      this.newAttribute1['document_date'] = this.headerData.document_date;
      this.newAttribute1['created_user_id'] = this.loginUserData.user_id;
      this.newAttribute1['document_no'] = this.headerData.document_no;
      this.newAttribute1['gst_amount'] = k.gst_amount;
      if (this.httpdata2data == undefined) {
        this.onKey1(this.newAttribute1)
      }
    }
  }

  change1(val, v) {

    let s1 = v;
    let s2 = encodeURIComponent(val);
    this.selectedSubCategory_form = s2;
    this.subcatg_change(val);
    let s = "All"
    if (val) {
      return this.getModal1(s1, s2, s);
    }

  }

  subcatg_change(val) {

    let arr = ["modelno", "carton", "qty", "piecepercarton", "net_price", "tot_value"];
    if (val == '') {
      this.add = true
      for (let i of arr) {
        this.newAttribute1[i] = '';


      }
    }
  }

  change2(val, d) {
    this.mod_modalno = [];
    this.selected_modalno = '';
    this.selected_modalno = encodeURIComponent(val);
    let select = "Select";
    this.modal_change(this.selected_modalno);
    this.mod_modalno.push(this.selected_modalno);
    if (val) {
      return this.getModal2(this.selectedCategory_form, this.selectedSubCategory_form, select);
    }
  }

  modal_change(val) {
    let arr = ["qty", "carton", "stock", "piecepercarton", "net_price", "tot_value"];
    if (val == '') {
      for (let i of arr) {
        this.newAttribute1[i] = '';
      }
    }
  }

  prod_modal(r, ev) {

    let obj = {}
    obj['category'] = r['category'];
    obj['subcategory'] = r['subcategory'];
    obj['modelno'] = r['modelno'];
    obj['net_price'] = r['net_price'];
    obj['mrp'] = r['mrp'];
    if (this.loginUserData.role != 'Special') {
      if (r['stock_qty'] > 0) {

        obj['stock'] = 'Y';
      }
      else {
        obj['stock'] = 'N';
      }
    }
    else {

      obj['stock'] = r['stock_qty'];


    }
    // obj['stock'] = r['stock_qty'];
    obj['piecepercarton'] = r['piecepercarton'];
    obj['discount1'] = r['discount'];
    obj['productid'] = r['productid'];
    obj['document_date'] = this.headerData.document_date;
    obj['created_user_id'] = this.loginUserData.user_id;
    obj['document_no'] = this.headerData.document_no;
    this.selectedList.push(obj);
  }

  prod_modal1(p, subp, m, ev) {

    this.cnt = 0;
    this.Spl_netprice = '';
    if (ev.target.checked) {
      let hit = this.getData(p.Category, encodeURIComponent(subp.SubCategory), encodeURIComponent(m));
    }

  }
  adv_detdata: any
  pro_detail(p, subp, m) {

    let select = "Select";
    // return this.service.getDatawithQueryParams4User_id('10', p, q, r, this.mod_modalno,this.loginUserData.user_id)
    return this.service.getDatawithQueryParams4User_id('10', p.Category, subp.SubCategory, select, m, this.loginUserData.user_id).subscribe((resp) => {
      this.adv_detdata = resp
      this.adv_det = this.adv_detdata.data;
      this.adv_det_disp = true;
    },
      error => {
        // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      });
  }
  dis() {
    this.adv_det_disp = false;
  }
  getadv_data() {
    for (let p of this.adv_det) {

    }
    this.a_detail = this.adv_det;
    $('#orderdetail1').modal('show');

  }
  modaldata: any
  getData(catg, sub_catg, modal) {

    this.mod_modalno = [];
    let select = "Select";
    if (this.loginUserData.role == "Special") {
      return this.service.getDatawithQueryParams4User_id('10', catg, sub_catg, select, modal, this.dealer_userid).subscribe((resp) => {
        //console.log("resp",resp);

        this.modal_data = resp;
        this.modaldata = this.modal_data.data
        this.getDetail();
      },
        error => {
          // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        });
    }
    else {
      return this.service.getDatawithQueryParams4User_id('10', catg, sub_catg, select, modal, this.loginUserData.user_id).subscribe((resp) => {
        //console.log("resp",resp);

        this.modal_data = resp;
        this.modaldata = this.modal_data.data
        this.getDetail();
      },
        error => {
          // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        });
    }
  }

  getDetail() {

    for (let r of this.modaldata) {
      let obj = {}
      obj['category'] = r['category'];
      obj['subcategory'] = r['subcategory'];
      obj['modelno'] = r['modelno'];
      obj['net_price'] = r['net_price'];
      obj['mrp'] = r['mrp'];
      if (this.loginUserData.role != 'Special') {
        if (r['stock_qty'] > 0) {

          obj['stock'] = 'Y';
        }
        else {
          obj['stock'] = 'N';
        }
      }
      else {

        obj['stock'] = r['stock_qty'];


      }
      // obj['stock'] = r['stock_qty'];
      obj['sku_no'] = r['sku_no'];
      obj['piecepercarton'] = r['piecepercarton'];
      obj['discount1'] = r['discount'];
      obj['gst_amount'] = r['gst_amount'];
      obj['productid'] = r['productid'];
      obj['document_date'] = this.headerData.document_date;
      obj['created_user_id'] = this.loginUserData.user_id;
      obj['document_no'] = this.headerData.document_no;
      this.selectedList.push(obj);
      this.order_items = this.selectedList.length + this.fieldArray.length;
    }
  }

  deleteFieldValue(index) {
    this.selectedList.splice(index, 1);
  }

  prod_category(p, ev) {
    //console.log("event",ev.target.checked);
    if (ev.target.checked) {
      this.selected_cat = p.Category;
      this.selectedCategory = p.Category;
    }
    else {
      this.selected_cat = '';
      this.selectedCategory = '';
      this.httpdata = [];
    }

  }

  del(obj: any) {
    const index: number = this.sub.indexOf(obj);
    if (index !== -1) {
      this.sub.splice(index, 1);
      this.sub1 = '';
    }
  }

  prod_subcategory(p, pd, ev) {

    if (ev.target.checked) {
      this.selected_sub_cat = pd.SubCategory;
      this.getModal(p.Category, pd.SubCategory)
    }
    else {
      this.httpdata = [];
    }

  }


  del1(obj: string) {
    const index: number = this.selectedList.indexOf(obj);
    if (index !== -1) {
      alert("trying to delete");
      this.selectedList.splice(index, 1);
    }
  }
  onKey(catg) {

    console.log("catg_data", catg);

    this.cnt = 0;
    this.Spl_netprice = '';
    catg.carton = catg.qty / catg.piecepercarton;
    let a = catg.qty * catg.net_price;
    this.cnt++;
    if (this.cnt == 1) {
      this.Spl_netprice = catg.net_price;
      console.log("hii", this.cnt);

    }
    //if()

    return this.service.getDatawithQueryParams4User_id("121", catg.productid, catg.qty, this.Spl_netprice, catg.discount1, this.loginUserData.user_id).subscribe(data => {

      catg.net_price = Math.round((data['net'] + Number.EPSILON) * 100) / 100;
      catg.gst_amount = (catg.net_price / 100) * 18
      catg.sp_discount = data['sp_discount'];
      catg.type = data['type'];
      catg.free_qty = data['free_qty'];
      catg.sp_dic_amount = data['sp_dic_amount'];
      if (catg.sp_discount === null) {
        console.log("spl", catg.sp_discount);

        catg.sp_discount = 0;
        catg.sp_dic_amount = 0
      }
      if (catg.free_qty === null) {
        catg.free_qty = 0;
      }
      // catg.carton = (catg.qty+catg.free_qty) / catg.piecepercarton;
      catg.tot_value = catg.qty * catg.net_price;
    })
    catg.tot_value = Math.round(a);
  }
  isNumberKey(event) {
    if (event.keyCode >= 96 && event.keyCode <= 105) {
      return event.keyCode - 96;
    } else if (event.keyCode >= 48 && event.keyCode <= 57) {
      return event.keyCode - 48;
    }
    // var charCode = (evt.which) ? evt.which : evt.keyCode;
    // if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
    //       return false;
    // return true;
  }

  onKey1(newAttribute1) {

    this.add = false
    console.log("offer data", newAttribute1);
    //  newAttribute1.qty = newAttribute1.carton * newAttribute1.piecepercarton;
    newAttribute1.carton = newAttribute1.qty / newAttribute1.piecepercarton;
    // this.cnt;
    this.cnt++;
    if (this.cnt == 1) {
      this.Spl_netprice = newAttribute1.net_price;
      console.log("hii", this.cnt);

    }
    return this.service.getDatawithQueryParams4User_id("121", newAttribute1.productid, newAttribute1.qty, this.Spl_netprice, newAttribute1.discount1, this.loginUserData.user_id).subscribe(data => {

      newAttribute1.net_price = Math.round((data['net'] + Number.EPSILON) * 100) / 100;
      newAttribute1.gst_amount = (newAttribute1.net_price / 100) * 18;
      newAttribute1.sp_discount = data['sp_discount'];
      newAttribute1.type = data['type'];
      newAttribute1.free_qty = data['free_qty'];
      newAttribute1.sp_dic_amount = data['sp_dic_amount'];
      if (newAttribute1.sp_discount === null) {
        console.log("spl", newAttribute1.sp_discount);

        newAttribute1.sp_discount = 0;
        newAttribute1.sp_dic_amount = 0
      }
      if (newAttribute1.free_qty === null) {
        newAttribute1.free_qty = 0;
      }
      // newAttribute1.carton = (newAttribute1.qty+newAttribute1.free_qty) / newAttribute1.piecepercarton;

      newAttribute1.tot_value = newAttribute1.qty * newAttribute1.net_price;

      // if(data.offer_type){
      //   var disc=newAttribute1.discount1 + data.offer_value;
      //   this.newAttribute1.offer_value=data.offer_value;
      //   this.newAttribute1.offer_type=data.offer_type;
      //   newAttribute1.net_price=newAttribute1.mrp*(1-disc/100);
      //   newAttribute1.tot_value = newAttribute1.qty * newAttribute1.net_price;
      //   console.log("offerdata",data);
      //   console.log("offerdata_disc",newAttribute1.net_price);
      // }
      // else{
      //   newAttribute1.tot_value = newAttribute1.qty * newAttribute1.net_price;
      // }



    })

  }
  onKey2(field) {
    field.qty = field.carton * field.piecepercarton;
    field.tot_value = field.qty * field.net_price;
  }
  //Place Order
  addupd(selected, attr, field) {
    attr = []
    this.count = 0;
    for (let i of this.fieldArray) {
      if (i.productid == attr.productid) {
        this.count++
        break;
      }
    }
    if (attr['productid'] && this.count == 0) {
      this.fieldArray.push(attr);

      this.po = [...selected, ...this.fieldArray];
    }
    else {
      this.po = [...selected, ...this.fieldArray];
    }
    this.poHidden = !this.poHidden;
    this.addressHidden = !this.poHidden;
    this.check_po(this.po);
    console.log("total", this.po);
    window.scrollTo(0, 0)

  }
  gst_total: any
  taxAmount: any
  net_amount: any
  gst: any
  response: any = {}
  check_po(data) {

    // this.gst=data.gst_amount*data.qty
    console.log(data, "data")
    if (data.length == 0) {
      this.Message = "Make Order"
      $('#check').modal('show');

      this.poHidden = true;
      this.addressHidden = false;

    }
    else {
      this.grand_total = data.filter((item) => item.tot_value)
        .map((item) => +item.tot_value)
        .reduce((sum, current) => sum + current);
      console.log(this.grand_total, "grandtotal")
      // this.gst_total = data.filter((item) => (item.gst_amount = item.gst_amount * item.qty))
      //   .map((item) => +item.gst_amount)
      //   .reduce((sum, current) => sum + current);
        this.gst_total = data.filter((item) => (item.gt = item.gst_amount * item.qty))
        .map((item) => +item.gt)
        .reduce((sum, current) => sum + current);
      console.log(this.grand_total, "grandtotal")

      let body = { "net_amount": this.grand_total, "gst": this.gst_total, "process": "PO" }
      this.service.postData(body, "promocode/checkom/").subscribe((resp1) => {
        this.response = resp1
      })
      // this.taxAmount = data.filter((item) => (item.gst_amount = item.gst_amount * item.qty))
      //   .map((item) => +item.gst_amount)
      //   .reduce((sum, current) => sum + current);
        this.taxAmount = data.filter((item) => (item.tx = item.gst_amount * item.qty))
        .map((item) => +item.tx)
        .reduce((sum, current) => sum + current);
      console.log(this.taxAmount, "taxAmount")
      this.net_amount = this.grand_total + this.taxAmount
      console.log(this.net_amount, "net_amount")
    }
    for (let p of data) {
      if (p.carton == null) {
        this.newAttribute1 = {};
        this.Message = "Please Enter Cartons"
        $('#check').modal('show');
        this.poHidden = true;
        this.addressHidden = false;
      }
    }

  }


  //Address Part
  shipping(num, checkVal) {
    if (checkVal) {
      this.selected_ship = num.seq_no;
      this.shipping_seq_no = num.seq_no;
    } else {
      this.selected_ship = '';
      this.shipping_seq_no = '';
    }
  }

  billing(n, checkVal) {
    if (checkVal) {
      this.selected_bill = n.seq_no;
      this.billing_seq_no = n.seq_no;
    } else {
      this.selected_bill = '';
      this.billing_seq_no = '';
    }
  }
  c_order() {
    this.poHidden = !this.poHidden;
    this.addressHidden = !this.poHidden;
    this.newAttribute1 = {}
  }
  //disable confirm order button
  con_disable() {
    if (this.shipping_seq_no != undefined && this.shipping_seq_no != '' && this.billing_seq_no != undefined && this.billing_seq_no != '' && this.co_check == true) {
      return false;
    } else {
      return true;
    }
  }
  viewcode() {
    $('#viewpromocodesmodal').modal('show');
  }
  offerdetails: any
  promocodedata: any = []
  getoffers() {
    this.service.getDataOnlyWithMethod("promocode/available").subscribe((resp1) => {
      this.offerdetails = resp1;
      for (var i = 0; i < this.offerdetails.length; i++) {
        if (this.offerdetails[i].promocodename != null && this.offerdetails[i].active != 0 && (this.offerdetails[i].applicable == 'Web' || this.offerdetails[i].applicable == 'Web/Mobile')) {
          this.promocodedata.push(this.offerdetails[i])

        }
        console.log(this.promocodedata, "promocodedata")
      }

    });
  }
  deletecode() {
    this.promocode = ''
    this.applycodedetails = ''
    this.message = false
    this.applyprice(this.promocode, this.applycodedetails, false)
  }
  applycodedetails: any
  data: any
  message: boolean = false
  applyfor: any
  applycode(promocode) {
    $('#viewpromocodesmodal').modal('hide');
    this.promocode = promocode
    for (let d of this.promocodedata) {
      if (d.promocodename == promocode) {
        this.applyfor = d.applyfor
      }
    }
    this.data = { "promocode": promocode, "net_amount": this.response.price, "applyfor": this.applyfor, "user_id": this.loginUserData.user_id }
    this.service.postData(this.data, "promocode/check/").subscribe((resp1) => {
      this.applycodedetails = resp1;
      console.log(this.applycodedetails, "this.applycodedetails")
      if (this.applycodedetails.apply == true) {
        this.message = true;
        this.applyprice(this.promocode, this.applycodedetails, true)
      }
      //  else{
      //    this.applycodedetails=""
      //    this.message=false
      //    console.log(this.applycodedetails,"this.applycodedetails")
      //  }

    })
  }
  promo_amount: any
  final_amount: any
  promocode: any
  gstamount: any
  applyprice(code, data, event) {

    if (event == true) {
      this.promo_amount = data.promo_amount
      this.final_amount = data.finalamount
      this.promocode = code
      this.gstamount = data.gst
    }
    else {
      this.promo_amount = ""
      this.final_amount = this.response.finalamount
      this.promocode = ""
      this.gstamount = this.response.gst
    }
  }
  /* ======================= */
  addToCart(body) {

    if (localStorage.getItem('token') != '' && localStorage.getItem('token') != undefined) {
      this.methodname = "addtocart_site/";
      this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
      body = { "user_id": this.loginUserData.user_id, "productid": body.productid, "qty": body.qty }

      return this.service.postData(body, this.methodname).subscribe((data) => {

        this.spinner.hide();
        if (this.cart == "true") {
          if (data['Status'] == "Inserted sucessfully") {
            this.cartobj['cartItem_count'] = data['count'];
            this.eventemit.fire(this.cartobj);
            //   $('#insertItemModal').modal('show');
          }
        }
      },
        error => {
          this.spinner.hide();
          //this.ngxSmartService.getModal('errorModal').open();
// this.dialog.open(ErrorModalComponent, {
//       data: { errorModal:true }
//     });

        });
    } else {
      // this.ngxSmartService.getModal('loginModal').open();
      this.dialog.open(LoginModalComponent, {
        data: {  }
      });

    }

  };
  cartItem_count: any;
  wishList_count: any;
  methodname: string;
  deleteConfirm() {
    this.spinner.show();
    this.user_id = this.loginUserData.user_id;
    this.methodname = 'delete_cart/?user_id=' + this.user_id + '&productid=' + 'all';
    this.service.deleteData(this.methodname).subscribe((data) => {
      this.spinner.hide();
      /*  this.viewcart(); */
      /* this.obj.cartItem_count = 0;
      this.eventemit.fire(this.obj); */


    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        // console.log(error);
      });
  }
  /* ====================== */
  keypress(event: any) {
    const pattern = /^[A-Za-z0-9' '.&,]+$/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  item: any
  removeItem: any
  spl_instr: any
  // Confirmation Of Order-inserting PO-Confirm Order
  confirm_order() {
    // this.spinner.show();

    this.a_order = false;
    this.co_check = false;
    this.headerData.spl_instr = this.spl_instr;
    this.headerData.shipping_seq_no = this.shipping_seq_no;
    this.headerData.billing_seq_no = this.billing_seq_no;
    this.headerData.credit_period = this.loginUserData.credit_period;
    this.headerData.payment_terms = this.loginUserData.credit_limit;

    this.headerData.devicediscamount = this.response.devicediscamount
    if (this.final_amount) {
      this.headerData.final_amount = this.final_amount
      this.headerData.gst_amount = this.gstamount
      this.headerData.promocode = this.promocode
    }
    else {
      this.headerData.final_amount = this.response.finalamount
      this.headerData.gst_amount = this.response.gst
    }
    this.headerData.promo_amount = this.promo_amount

    if (this.loginUserData.role == 'Special') {
      this.headerData.source_user_id = this.dealer_userid;
      // this.headerData.source_company_code= this.dealer_userid+ "@" + this.headeDetails.company_code,
      this.headerData.source_company_code = this.dealer_companycode;
      this.headerData.dest_company_code = this.dest_companycode;
      this.headerData.credit_period = this.dealer_creditperiod;
      this.headerData.payment_terms = this.dealer_creditlimit;
      this.headerData.company_code = this.dest_companycode
      // this.headerData.credit_limit = this.dealer_creditlimit;

    }
    // this.po.promocodeprice=
    let process_in = 'PO';
    let operation_in = 'INSERT';
    let draft_final_in = 'FINAL';
    let document_no_out = '';
    let message_out = '';
    this.loginMethod = 'insert_update/';

    this.body = { "process_in": process_in, "json_hdr": this.headerData, "json_dtl": this.po, "operation_in": operation_in, "draft_final_in": draft_final_in, "document_no_out": document_no_out, "message_out": message_out };

    this.myJSON = JSON.stringify(this.body);


    this.service.postData(this.myJSON, this.loginMethod).subscribe((data) => {
      // this.spinner.hide();   
      this.poprint = data;
      localStorage.setItem('poprintData', JSON.stringify(data));
      this.Message = data['Message'] + ", With PO no : " + data['PO'];
      if (data['Message'] == "PO Sucessfully inserted ") {
        $('#orderSuccessfulModal').modal('show');
        if (this.cart == "true") {
          this.deleteConfirm();
          this.cartobj['cartItem_count'] = data['count'];
          this.eventemit.fire(this.cartobj);
        }
      }
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });

      });
  }

  gotoPrint(m) {
    if (m == "Your Cart Is Empty") {
    }
    else {
      this.router.navigateByUrl('/po-print');
    }
    // this.router.navigateByUrl('/po-print');
  }

  cart_data: any;


  cart_update() {
    for (let r of this.cart_data.values) {
      let obj = {}
      obj['category'] = r['category'];
      obj['subcategory'] = r['subcategory'];
      obj['modelno'] = r['modelno'];
      obj['net_price'] = r['enduserprice'];
      obj['mrp'] = r['mrp'];
      obj['piecepercarton'] = r['piecepercarton'];
      obj['discount1'] = r['discount_a'];
      obj['productid'] = r['productid'];
      obj['sku_no'] = r['sku_no'];
      obj['document_date'] = this.headerData.document_date;
      obj['created_user_id'] = this.loginUserData.user_id;
      obj['document_no'] = this.headerData.document_no;
      this.selectedList.push(obj);
    }

  }

  change() {
    this.poHidden = true;
    this.addressHidden = false;
    this.newAttribute1 = {}
  }

  // Cart List
  cart_list() {
    let user = this.loginUserData.user_id;
    return this.service.getDatawithQueryParams1('4.2', user).subscribe((resp) => {

      this.Message = "";
      this.cart_data = resp;
      if (this.cart_data.values.length == 0) {
        this.Message = "Your Cart Is Empty";
        $('#orderSuccessfulModal').modal('show');

      }
      else {
        this.cart_update();
      }


    },
      error => {
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      });
  }
  grand_total: any
  //saved Items
  saved_list() {
    alert("Under-Process");
  }

  draft(selected, attr, field) {
    if (attr['category']) {
      this.s_Array.push(attr);
      this.saved_l = [...selected, ...this.s_Array];
      this.selectedList = [];
      this.fieldArray = [];
    }
    else {
      this.saved_l = [...selected, ...this.s_Array];
      this.fieldArray = [];
      this.selectedList = [];
    }

    let body = {
      "process_in": 'PO', "operation_in": "INSERT", "draft_final_in": "DRAFT", "document_no_out": "", "message_out": "",
      "json_hdr": this.headerData, "json_dtl": this.s_Array
    }
    let methodName = "insert_update/"
    this.service.postData(body, methodName).subscribe((data) => {
      // this.spinner.hide();
      this.Message = "Saved Successfully...!!!";
      $('#orderSuccessfulModal').modal('show');

    },
      error => {
        // this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      });

  }
  info_s(data) {

    console.log("data", data)
    this.attr_image = data;
    this.attributes = data.details;
    console.log("attr", this.attributes);

    $('#orderdetail').modal('show');
    // this.detailed_class=true;

  }
  info_h() {
    $('#orderdetail').modal('hide');
    //this.detailed_class=false;
  }
}
