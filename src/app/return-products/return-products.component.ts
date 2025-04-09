import { Component, OnInit } from '@angular/core';
import { ToasterService } from './../toastr-service.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators, NgForm } from "@angular/forms";
import { formatDate, JsonPipe } from "@angular/common";
import { DataServiceService } from './../data-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../global-service.service';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-return-products',
  standalone: false,
  templateUrl: './return-products.component.html',
  styleUrls: ['./return-products.component.scss']
})
export class ReturnProductsComponent implements OnInit {
  loginUserData: any
  masterData: any = {};
  invoicedata: any = {};
  //fieldArray: Array<any> = [];
  todayDate = new Date();
  resources: any;
  resources1: any = {};
  paymentData: any = {};
  selectedCategory: any = '';
  selectedSub: any = '';
  selectedList: any = [];
  isHidden: boolean = false;
  isAdvHidden: boolean = false;
  mod_modalno: any = [];
  newAttribute: any = {};
  selectedCategory_form: any = '';
  selectedSubCategory_form: any;
  httpdata3: any;
  po: any = [];
  fieldArray: Array<any> = [];
  fieldArray1: any;
  newAttribute1: any = {};
  httpdata: any;
  httpdata2: any;
  h;
  public addamount2: any;
  public sub: any;
  public sub1: any;
  public cat: any;
  public Select_modal = [];
  public detail = [];
  //loginUserData: any;
  today = new Date();
  tday = +this.today;
  headeDetails: any;
  headerData: any;
  loginMethod: string;
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
  Page: any = 1
  datepipe: any;
  invamountfinal: any
  constructor(public route: ActivatedRoute, private dat_s: DataServiceService, private router: Router, private dialog: MatDialog, private spinner: NgxSpinnerService, private service: GlobalServiceService, private toaster: ToasterService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getdealerdropdown()
    this.invoicedata.code = "RP"
    this.getCurrentFinancialYear()
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.userid = this.loginUserData.user_id;
    this.service.getHeaderDetails(1, this.loginUserData.user_id).subscribe((data) => {
      this.headeDetails = data[0];
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
    },
      error => {
        // this.spinner.hide();
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
        this.change2(this.newAttribute1.modelno)
      }
    },
      error => {
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });

    this.getprodimg();
    if (this.loginUserData.role != "Marketing Manager") {
      this.orderspage = true;
      this.getNotificationCount()
      var list = document.getElementsByTagName("h3")[0];
      //  var p=list.getElementsByTagName("span")[0].innerHTML;
    }
    if (this.loginUserData.role == "Marketing Manager") {
      this.getdealerslist(this.userid)
    }
  }
  // ===================upload-stock data=====starts==========================
  totaloutstandingamount: any
  getNotificationCount() {
    this.service.getDatawithQueryParams1nd4('4.21', this.loginUserData.user_id, this.loginUserData.company_code).subscribe((data) => {
      this.totaloutstandingamount = data['outstanding'];
    },
      // error => {
      //   this.ngxSmartService.getModal('errorModal').open();


      // }
    );
  };
  getdealerslist(userid) {
    return this.service.getDatawithMethodParams1('market/drop', userid).subscribe((resp) => {
      this.dealers = resp;
    })
  }


  dealer_chn(event) {
    this.orderspage = true
    this.newAttribute1 = {}
    this.dealer_userid = event.user
    this.dealer_creditperiod = event.credit_period
    this.dealer_creditlimit = event.credit_limit
    this.dealer = true
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
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      });
  };



  getprodimg() {
    return this.service.getDatawithMethod1('get_products_category/').subscribe((resp) => {
      this.resources = resp;
    },
      error => {
        // this.spinner.hide();
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
        // this.ngxSmartService.getModal('errorModal').open();
      });
  }

  httpdata2data: any
  getModal1(p, q, r) {


    this.mod_modalno = [];
    if (this.loginUserData.role == "Marketing Manager") {
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
        //     this.dialog.open(ErrorModalComponent, {
  //   data: { errorModal:true }
  // });
        //   }
      );
    }
  }

  httpdata3data: any
  getModal2(p, q, r) {


    this.spinner.show();
    if (this.loginUserData.role == "Marketing Manager") {

      return this.service.getDatawithQueryParams4User_id('10', p, q, r, this.mod_modalno, this.dealer_userid).subscribe((resp) => {

        this.httpdata3 = resp;
        this.httpdata3data = this.httpdata3.data

        this.disp(this.httpdata3data);
        this.spinner.hide();
      },
        error => {
          // this.ngxSmartService.getModal('errorModal').open();
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

  addFieldValue() {
    this.cnt = 0;
    this.Spl_netprice = '';
    this.newAttribute1.Field_Qaun = "true";
    this.newAttribute1.company_code = "";
    this.newAttribute1.stock_date = "";
    this.newAttribute1.avg_pur_mrp = Math.round((this.newAttribute1.avg_pur_mrp + Number.EPSILON) * 100) / 100;
    this.newAttribute1.gstamount1 = this.newAttribute1.gstamount1
    this.newAttribute1.gstinamount = Math.round((JSON.parse(this.newAttribute1.qty) * JSON.parse(this.newAttribute1.avg_pur_mrp))/100 *JSON.parse(this.newAttribute1.gstamount1))+Math.round(JSON.parse(this.newAttribute1.qty) * JSON.parse(this.newAttribute1.avg_pur_mrp))

    // this.newAttribute1.gstinamount = Math.round(((JSON.parse(this.newAttribute1.qty) * JSON.parse(this.newAttribute1.avg_pur_mrp)) * (JSON.parse(this.newAttribute1.gstamount1)/100)))
    // this.invoicedata.final_amount = this.invoicedata.final_amount + (this.newAttribute1.qty * this.newAttribute1.avg_pur_mrp)
    //this.invoicedata.final_amount = Math.round(this.invoicedata.final_amount) + Math.round( (this.newAttribute1.qty * this.newAttribute1.avg_pur_mrp) + ((this.newAttribute1.gstamount1 /100)*(this.newAttribute1.qty * this.newAttribute1.avg_pur_mrp)))
    this.invoicedata.invamountfinal = Math.round(JSON.parse(this.newAttribute1.qty) * JSON.parse(this.newAttribute1.avg_pur_mrp)),
      //  this.invoicedata.invamount = Math.round(this.newAttribute1.qty * JSON.parse(this.newAttribute1.avg_pur_mrp)),
      // this.invoicedata.bindingamount = Math.round(this.invoicedata.invamountfinal + this.invoicedata.invamount),
      // this.invoicedata.final_amount2 = Math.round(parseInt(this.newAttribute1.gstinamount)),
      this.newAttribute.anyvar = Math.round(parseInt(this.newAttribute1.gstinamount)),
      this.invoicedata.anyvar = this.newAttribute.anyvar,
      // this.newAttribute.final_amount = this.newAttribute.anurag,
      // this.invoicedata.final_amount = (this.invoicedata.invamountfinal) ,
      this.invoicedata.final_amount = this.invoicedata.final_amount != undefined ? (this.invoicedata.final_amount + this.newAttribute1.gstinamount) : this.newAttribute1.gstinamount,
      // this.invoicedata.gst_percent = this.invoicedata.gst_percent != undefined ? (JSON.parse(this.invoicedata.gst_percent) + JSON.parse(this.newAttribute1.gstamount1)) : this.newAttribute1.gstamount1,
      this.invoicedata.gst_percent = this.invoicedata.gst_percent != undefined ? (JSON.parse(this.invoicedata.gst_percent) + (JSON.parse(this.newAttribute1.qty) * JSON.parse(this.newAttribute1.avg_pur_mrp))/100 *JSON.parse(this.newAttribute1.gstamount1)) : (JSON.parse(this.newAttribute1.qty) * JSON.parse(this.newAttribute1.avg_pur_mrp))/100 *JSON.parse(this.newAttribute1.gstamount1),
      // this.invoicedata.invamount = (this.newAttribute1.qty) * (this.newAttribute1.avg_pur_mrp)
      //this.invoicedata.invamount = Math.round((JSON.parse(this.newAttribute1.qty)* JSON.parse(this.newAttribute1.avg_pur_mrp))) ,
      this.invoicedata.invamount = (this.invoicedata.final_amount) - (this.invoicedata.gst_percent)
    this.fieldArray.push(this.newAttribute1);
    this.newAttribute1 = {};
    this.order_items = this.selectedList.length + this.fieldArray.length;
  }

  add_disable(attr) {

    let arr = ["category", "carton", "subcategory", "modelno", "qty", "piecepercarton", "avg_pur_mrp", "gstamount1"];
    for (let i of arr) {
      if (attr[i] == null || attr[i] == undefined) {

        return true;
      }
    }

    return false;
  }

  placeorder_disable(attr, sl, field) {
    let arr = ["category", "carton", "subcategory", "modelno", "qty", "piecepercarton", "avg_pur_mrp"];
    for (let i of arr) {
      if (this.newAttribute1[i] == null || this.newAttribute1[i] == undefined) {
        return true
      }
    }
    return false;
  }

  placeorder_disable2() {
    let arr = ["category", "carton", "subcategory", "modelno", "qty", "piecepercarton", "avg_pur_mrp"];
    if (this.selectedList['category'] !== '') {
      for (let i of arr) {
        if ((this.newAttribute1[i] == null || this.newAttribute1[i] == undefined) && (this.selectedList[i] == null || this.selectedList[i] == undefined)) {
          return true
        }
      }
      return false;
    }
  }

  deleteFieldValue2(index,data) {
    this.fieldArray.splice(index, 1);
    this.order_items = this.order_items - 1;
    this.invoicedata.gst_percent = this.invoicedata.gst_percent - (JSON.parse(data.qty) * JSON.parse(data.avg_pur_mrp))/100 *JSON.parse(data.gstamount1)
    this.invoicedata.invamount -= (JSON.parse(data.qty) * JSON.parse(data.avg_pur_mrp));
    this.invoicedata.final_amount -=  (data.gstinamount);
  }

  change_form(val) {
    this.catg_change(val);
    this.selectedCategory_form = val;
  }
  add: boolean = false
  catg_change(val) {

    let arr = ["subcategory", "carton", "modelno", "qty", "piecepercarton", "avg_pur_mrp", "tot_value"];
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

  // =============================
  // sele_gstper()
  // {
  //   if((this.sele_gstper1 == undefined))
  // }
  // ===========================


  disp(resp: Response): any {
    this.h = resp;
    for (let k of this.h) {
      if (k.offer) {
      } else {

      }
      this.newAttribute1['productid'] = k.productid;
      this.newAttribute1['avg_pur_mrp'] = k.avg_pur_mrp;
      this.newAttribute1['discount1'] = k.discount;
      this.newAttribute1['mrp'] = k.mrp;
      this.newAttribute1['stock'] = k.stock_qty;
      this.newAttribute1['piecepercarton'] = k.piecepercarton;
      this.newAttribute1['document_date'] = this.headerData.document_date;
      this.newAttribute1['created_user_id'] = this.loginUserData.user_id;
      this.newAttribute1['document_no'] = this.headerData.document_no;
      this.newAttribute1['gst_amount'] = k.gst_amount;
      this.newAttribute1['cost'] = 0;
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

    let arr = ["modelno", "carton", "qty", "piecepercarton", "avg_pur_mrp", "tot_value"];
    if (val == '') {
      this.add = true
      for (let i of arr) {
        this.newAttribute1[i] = '';


      }
    }
  }

  change2(val) {

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
    let arr = ["qty", "carton", "stock", "piecepercarton", "avg_pur_mrp", "tot_value"];
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
    obj['avg_pur_mrp'] = Math.round((r['avg_pur_mrp'] + Number.EPSILON) * 100) / 100;
    obj['mrp'] = r['mrp'];
    obj['stock'] = r['stock_qty'];
    obj['piecepercarton'] = r['piecepercarton'];
    obj['discount1'] = r['discount'];
    obj['productid'] = r['productid'];
    obj['document_date'] = this.headerData.document_date;
    obj['created_user_id'] = this.loginUserData.user_id;
    obj['document_no'] = this.headerData.document_no;
    obj['company_code'] = this.headerData.company_code;
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
        // this.ngxSmartService.getModal('errorModal').open();
      });
  }
  dis() {
    this.adv_det_disp = false;
  }
  modaldata: any
  getData(catg, sub_catg, modal) {

    this.mod_modalno = [];
    let select = "Select";
    return this.service.getDatawithQueryParams4User_id('10', catg, sub_catg, select, modal, this.loginUserData.user_id).subscribe((resp) => {
      //console.log("resp",resp);

      this.modal_data = resp;
      this.modaldata = this.modal_data.data
      this.getDetail();
    },
      error => {
        // this.ngxSmartService.getModal('errorModal').open();
      });

  }

  getDetail() {
    for (let r of this.modaldata) {
      let obj = {}
      obj['category'] = r['category'];
      obj['subcategory'] = r['subcategory'];
      obj['modelno'] = r['modelno'];
      obj['avg_pur_mrp'] = Math.round((r['avg_pur_mrp'] + Number.EPSILON) * 100) / 100;
      obj['mrp'] = Math.round((r['mrp'] + Number.EPSILON) * 100) / 100;
      obj['stock'] = r['stock_qty'];
      obj['sku_no'] = r['sku_no'];
      obj['piecepercarton'] = r['piecepercarton'];
      obj['discount1'] = r['discount'];
      obj['gst_amount'] = r['gst_amount'];
      obj['productid'] = r['productid'];
      obj['cost'] = 0;
      obj['document_date'] = this.headerData.document_date;
      obj['created_user_id'] = this.loginUserData.user_id;
      obj['document_no'] = this.headerData.document_no;
      obj['company_code'] = this.headerData.company_code;
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
  user_id: any
  onKey(catg) {

    console.log("catg_data", catg);

    this.cnt = 0;
    this.Spl_netprice = '';
    catg.carton = catg.qty / catg.piecepercarton;
    let a = catg.qty * catg.avg_pur_mrp;
    this.cnt++;
    if (this.cnt == 1) {
      this.Spl_netprice = catg.avg_pur_mrp;
      console.log("hii", this.cnt);

    }

    return this.service.getDatawithQueryParams4User_id("121", catg.productid, catg.qty, this.Spl_netprice, catg.discount1, this.loginUserData.user_id).subscribe(data => {

      catg.avg_pur_mrp = Math.round((data['net'] + Number.EPSILON) * 100) / 100;
      catg.gst_amount = (catg.avg_pur_mrp / 100) * 18
      catg.sp_discount = data['sp_discount'];
      catg.type = data['type'];
      catg.free_qty = data['free_qty'];
      if (catg.sp_discount === null) {
        console.log("spl", catg.sp_discount);

        catg.sp_discount = 0;
      }
      if (catg.free_qty === null) {
        catg.free_qty = 0;
      }

      catg.tot_value = catg.qty * catg.avg_pur_mrp;
    })
    // catg.tot_value = Math.round(a);
  }
  isNumberKey(event) {
    if (event.keyCode >= 96 && event.keyCode <= 105) {
      return event.keyCode - 96;
    } else if (event.keyCode >= 48 && event.keyCode <= 57) {
      return event.keyCode - 48;
    }

  }

  onKey1(newAttribute1) {
    this.add = false
    newAttribute1.carton = newAttribute1.qty / newAttribute1.piecepercarton;
    this.cnt++;
    if (this.cnt == 1) {
      this.Spl_netprice = newAttribute1.net_price;
    }
    return this.service.getDatawithQueryParams4User_id("121", newAttribute1.productid, newAttribute1.qty, this.Spl_netprice, newAttribute1.discount1, this.loginUserData.user_id).subscribe(data => {

      newAttribute1.avg_pur_mrp = Math.round((data['net'] + Number.EPSILON) * 100) / 100;
      newAttribute1.gst_amount = (newAttribute1.avg_pur_mrp / 100) * 18;
      newAttribute1.sp_discount = data['sp_discount'];
      newAttribute1.type = data['type'];
      newAttribute1.free_qty = data['free_qty'];
      if (newAttribute1.sp_discount === null) {
        newAttribute1.sp_discount = 0;
      }
      if (newAttribute1.free_qty === null) {
        newAttribute1.free_qty = 0;
      }

      newAttribute1.tot_value = newAttribute1.qty * newAttribute1.avg_pur_mrp;
    })
  }
  onKey2(field) {
    field.qty = field.carton * field.piecepercarton;
    field.tot_value = field.qty * field.avg_pur_mrp;
  }
  //Place Order
  addupd(selected, attr, field) {
    if (attr['category']) {
      attr['avg_pur_mrp'] = Math.round((attr['avg_pur_mrp'] + Number.EPSILON) * 100) / 100;
      this.fieldArray.push(attr);
      this.po = [...selected, ...this.fieldArray];
    }
    else {
      this.po = [...selected, ...this.fieldArray];
    }
    this.check_po(this.po);
    console.log("total", this.po);
    window.scrollTo(0, 0)

  }
  check_po(data) {

    // this.gst=data.gst_amount*data.qty
    console.log(data, "data")
    if (data.length == 0) {
      this.Message = "Make Order"
      $('#check').modal('show');

    } else {
      this.grand_total = data.filter((item) => item.avg_pur_mrp)
        .map((item) => +item.avg_pur_mrp)
        .reduce((sum, current) => sum + current);
      console.log(this.grand_total, "grandtotal")
      let body = { "avg_pur_mrp": this.grand_total }
      this.confirm_order();
    }

  }
  keypress(event: any) {
    const pattern = /^[A-Za-z0-9' '.&,]+$/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  spl_instr: any
  // Confirmation Of Order-inserting PO-Confirm Order
  confirm_order() {
    // this.spinner.show();
    this.loginMethod = "promocode/new_arivals/";
    let company_code = this.headerData.source_company_code;
    this.po.map((e) => {
      e.company_code = company_code;
    })
    let date = new Date();
    let latest_date = this.datepipe.transform(date, 'yyyy-MM-dd');
    this.po.map((e) => {
      e.stock_date = latest_date;
      e.tot_value = Math.round(e.tot_value);
    })
    this.myJSON = JSON.stringify(this.po);
    console.log(this.po)
    let postdata = this.po.map((e) => {
      return {
        in_stock: e.qty,
        productid: e.productid,
        date: e.stock_date
      }
    })
    this.service.postData(postdata, this.loginMethod).subscribe((data) => {
      // this.spinner.hide();   
      if (data['msg'] == "Successfully uploaded ") {
        this.service.getMethodData("send_noti_dealers/").subscribe(resp => {
        })
        this.Message = data['msg'];
        $('#orderSuccessfulModal').modal('show');
        this.selectedList = [];
        this.fieldArray = [];
        this.newAttribute1 = {};
        this.order_items = 0;
      } else {
        this.Message = data['msg'];
        $('#check').modal('show');
      }
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });

      });
  }
  cart_data: any;


  cart_update() {
    for (let r of this.cart_data.values) {
      let obj = {}
      obj['category'] = r['category'];
      obj['subcategory'] = r['subcategory'];
      obj['modelno'] = r['modelno'];
      obj['avg_pur_mrp'] = r['enduserprice'];
      obj['mrp'] = r['mrp'];
      obj['piecepercarton'] = r['piecepercarton'];
      obj['discount1'] = r['discount_a'];
      obj['productid'] = r['productid'];
      obj['sku_no'] = r['sku_no'];
      obj['document_date'] = this.headerData.document_date;
      obj['created_user_id'] = this.loginUserData.user_id;
      obj['document_no'] = this.headerData.document_no;
      obj['company_code'] = this.headerData.company_code;
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
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      });
  }
  grand_total: any


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
  // ===================upload-stock data=====ends===============================
  keypress1(event: any) {
    const pattern = /[0-9.]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  // ==================FOR KEY press change===================================
  addamount(invoicedata, gst) {
    invoicedata.final_amount = ((parseInt(invoicedata.invamount) * parseInt(gst.target.value)) / 100) + parseInt(invoicedata.invamount)

  }
  // =========================================================================
  addamount1(invoicedata, gst) {
    invoicedata.final_amount = ((parseInt(invoicedata.invamount) * parseInt(gst.target.value)) / 100) + parseInt(invoicedata.invamount)

  }
  // ====================================================================
  // =========================================================================
  //  addamount2(newAttribute1) {
  //    
  //    this.invoicedata.invamount = (newAttribute1.qty) * (newAttribute1.avg_pur_mrp)
  // }
  // ====================================================================
  // =========================================================================
  /*  addamount3(newAttribute1) {
     
    
     this.invoicedata.gstamount = newAttribute1.gstamount1
     this.invoicedata.final_amount =this.invoicedata.final_amount!=undefined?(this.invoicedata.final_amount+this.newAttribute1.gstinamount):this.newAttribute1.gstinamount 
 
  } */
  // ====================================================================
  customerdata: any = []
  getdealerdropdown() {
    return this.service.getDatawithQueryParams2('5.12', this.loginUserData.company_code, 'DEALER').subscribe((resp) => {
      console.log(resp);
      this.customerdata = resp;
    })
  }

  twoDigitYear1: any
  twoDigitYear2: any
  getCurrentFinancialYear() {

    var fiscalyear = "";
    if (this.invoicedata.invdate) {
      this.today = new Date(this.invoicedata.invdate)
      console.log(this.today, "lastyear")
    }
    else {
      this.today = new Date();
      console.log(this.today, "today")
    }
    if ((this.today.getMonth() + 1) <= 3) {
      fiscalyear = (this.today.getFullYear() - 1) + "-" + this.today.getFullYear()
    } else {
      fiscalyear = this.today.getFullYear() + "-" + (this.today.getFullYear() + 1)
    }
    console.log(fiscalyear, "financialyear")
    var oneYear = fiscalyear.split('-');
    console.log(oneYear, "oneYear")
    this.twoDigitYear1 = oneYear[0].toString().substr(-2);
    this.twoDigitYear2 = oneYear[1].toString().substr(-2);
    console.log(this.twoDigitYear1, "twoDigitYear1")
    console.log(this.twoDigitYear2, "twoDigitYear2")
    this.invoicedata.year = this.twoDigitYear1 + "-" + this.twoDigitYear2
    return fiscalyear
  }

  // document.getElementById("spFY").innerHTML=getCurrentFinancialYear();
  changedate(invdate) {

  }
  add_disable1(attr) {

    // let arr = ["invno", "invdate", "invamount"];
    let arr = ["invno", "invdate", "invamount", "gstamount", "gstamount1"];
    for (let i of arr) {
      if (attr[i] == null || attr[i] == undefined) {

        return true;
      }
    }

    return false;
  }
  customerchange(customername) {
    for (let c of this.customerdata) {
      if (c.company_code == customername) {
        this.masterData.credit_period = c.credit_period
        this.masterData.credit_limit = c.credit_limit
      }
    }
  }
  deleteFieldValue3(index) {
    this.fieldArray1.splice(index, 1);


  }
  addFieldValue1() {
    this.fieldArray1.push({
      //   inv_origin_company_code: this.loginUserData.company_code,
      // inv_no: JSON.parse(this.invoicedata.invno),
      inv_seq_no: JSON.parse(this.invoicedata.invno),
      // inv_date: this.invoicedata.invdate,
      // ==================================
      return_date: this.invoicedata.invdate,
      // =========================================
      // ship_to_company_code: this.masterData.customername,
      user_id: this.masterData.customername,
      //  due_amount: JSON.parse(this.invoicedata.invamount),
      final_amount: (JSON.parse(this.invoicedata.invamount)) + (this.invoicedata.invamount * (this.invoicedata.gstamount / 100)),
      // =========================================================

      final_amount_total: this.invoicedata.final_amount,
      gst_percent: this.invoicedata.gstamount,
      // final_amount1 : this.invoicedata.gstamount ,
      gst_amount: this.invoicedata.invamount * (this.invoicedata.gstamount / 100),
      line_of_total: (this.invoicedata.final_amount) - (this.invoicedata.gst_percent),
      tot_value: this.newAttribute1.line_of_total,
      final_amount2: Math.round(parseInt(this.newAttribute1.gstinamount)),
      final_amount3: Math.round(parseInt(this.newAttribute1.gstinamount)),
      // ===========================================,
      remark3: this.masterData.comment,
      // credit_period: this.masterData.credit_period,
      //  payment_terms: this.masterData.credit_limit,
      return_inv_no: this.invoicedata.code + "-" + JSON.parse(this.invoicedata.invno) + "/" + this.invoicedata.year
    }
    )
    this.invoicedata = {}
    this.invoicedata.code = "RP"
    this.invoicedata.year = this.twoDigitYear1 + "-" + this.twoDigitYear2
    // console.log(this.fieldArray, "this.fieldArray")

  }

  body: any = []
  sub_final(masterDataForm: NgForm) {


    if (this.order_items == 0) {
      this.toaster.error("Please add the Product first")
    } else {
      if (this.masterData.customername && this.invoicedata.invno && this.invoicedata.invdate && this.invoicedata.code && this.invoicedata.year && this.invoicedata.invamount) {
        let company_code = this.customerdata.filter((e) => e.user_id === this.masterData.customername)
        this.fieldArray1 = {
          json_hdr: {
            receiver_company_code: this.loginUserData.company_code,
            company_code: company_code[0].company_code,
            // inv_no: JSON.parse(this.invoicedata.invno),
            business_name: company_code[0].business_name,
            inv_seq_no: parseInt(this.invoicedata.invno),
            // inv_date: this.invoicedata.invdate,
            // ============================================
            return_date: this.invoicedata.invdate,
            // ===========================================
            // ship_to_company_code: this.masterData.customername,
            user_id: this.masterData.customername,
            // category_name: this.newAttribute1.category,
            // subcategory_name: this.newAttribute1.subcategory,
            // model_no: this.newAttribute1.modelno,
            // quantity: this.newAttribute1.qty,
            // mrp_price: this.newAttribute1.mrp,

            //  due_amount: JSON.parse(this.invoicedata.invamount),
            //  final_amount: (parseInt(this.invoicedata.invamount)) + (parseInt(this.invoicedata.invamount) * (this.invoicedata.gstamount / 100)),
            final_amount_total: this.invoicedata.final_amount,
            // gst_percent: this.invoicedata.gstamount,
            //  GST_Percent: Math.round(((this.invoicedata.gst_percent)*100) / this.invoicedata.final_amount),
            gst_amount: this.invoicedata.gst_percent.toFixed(2),
            final_amount1: this.invoicedata.finalamount1,
            line_of_total: (this.invoicedata.final_amount) - (this.invoicedata.gst_percent),
            tot_value: this.newAttribute1.line_of_total,
            // ================================================
            remark3: this.masterData.comment,
            // credit_period: this.masterData.credit_period,
            // payment_terms: this.masterData.credit_limit,
            return_inv_no: this.invoicedata.code + "-" + this.invoicedata.invno + "/" + this.invoicedata.year
          },
          json_dtl: this.fieldArray
        }
        // console.log(this.fieldArray1, "this.fieldArray1")

        // let methodName = "Opening/"
        // let methodName = "sales_return/"
        let methodName = "api/sales_return/"
        this.service.postData(this.fieldArray1, methodName).subscribe((data) => {

          this.body = data
          $('#success').modal('show');
          this.fieldArray1 = []
          this.fieldArray = []
          this.invoicedata = {}

          masterDataForm.reset()
          this.masterData.customername = undefined
          this.invoicedata.code = "RP"
          this.invoicedata.year = this.twoDigitYear1 + "-" + this.twoDigitYear2

        },
          error => {
            this.fieldArray1.splice(this.fieldArray1.length - 1, 1);
            this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
          });

      }
      else {

        this.toaster.error("Please fill all fields")
      }
    }

  }
  reset(masterDataForm: NgForm) {
    masterDataForm.reset()
    this.fieldArray1 = []
    this.invoicedata = {}
    this.masterData.customername = undefined
    this.invoicedata.code = "RP"
    this.invoicedata.year = this.twoDigitYear1 + "-" + this.twoDigitYear2
    this.order_items = []
    this.cart_data = []
    this.subcategory = []
    this.category = []
  }
}
