import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../../global-service.service';
import { DataServiceService } from '../../data-service.service';
import { formatDate } from '@angular/common';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;

@Component({
  selector: 'app-import-po',
  standalone: false,
  templateUrl: './import-po.component.html',
  styleUrls: ['./import-po.component.scss']
})
export class ImportPoComponent implements OnInit {
  selectedObj: any;
  resources: any=[];
  resources1: any;
  paymentData: any = {};
  selectedCategory: any = '';
  selectedSub: any = '';
  selectedList: any = [];
  isHidden: boolean = false;
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
  poPrintData: any;
  poprint: any = {};
  vendors: any;
  ven_POHidden: boolean = false;
  selected_vendor: any;
  selected_vendor_code: any;
  selected_modalno: string;
  vendors_currency: any;
  modal_data: any;
  vendor_c:any;
  selected_code: any;
adv_det_disp: any;
adv_det: any;
dis: any;
selected: any;
onKey2: any;
draft: any;
  constructor(private service: GlobalServiceService, private dat_s: DataServiceService, private router: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    if (this.loginUserData === null) {
      this.router.navigateByUrl('home');
    }
    // console.log(this.loginUserData);
    // console.log(this.loginUserData.email);
    this.userid = this.loginUserData.user_id;
    this.service.getHeaderDetails(1, this.loginUserData.user_id).subscribe((data) => {
      this.headeDetails = data[0];
      this.headerData = {
        document_no: 1,
        document_date: formatDate(this.today, 'yyyyMMdd', 'en-US'),
        dest_user_id: this.headeDetails.handling_company_sales_manager,
        source_company_code: this.headeDetails.user_id + "@" + this.headeDetails.company_code,
        source_user_id: this.headeDetails.user_id,
        inv_type: "DOM",
        shipment_point: 0,
        currency_code: undefined,
        exchange_rate: undefined,
      }
      console.log("hd", this.headerData);
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      });
    this.getvendors();
    this.getShipAdd();
    this.getBillAdd();
    this.getcurrency();
  }
  getvendors() {
    this.spinner.show();
    return this.service.getDatawithInput_id(7.9).subscribe((resp) => {
      this.spinner.hide();
      console.log(resp);

      this.vendors = resp;
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      });
  }

  vendor_chn(event: any) {
    console.log(event);
    this.newAttribute1={};
    this.selectedList=[];
    this.addressHidden=false;
    this.poHidden=true;
    
    this.selected_vendor = event.first_name
    this.selected_vendor_code = event.vendorcode;
    this.selected_code=event.code;
    this.getprodimg(event.code);
  }
  prod_modal1(p, subp, m, ev) {
    if(ev.target.checked){
    let hit = this.getData(p.Category, subp.SubCategory, m);
    }
  }
  getData(catg, sub_catg, modal) {
    this.mod_modalno = [];
    let select = "Select";
    return this.service.getDatawithQueryParams1('10.1',modal).subscribe((resp) => {
      
      
      this.modal_data = resp;
      console.log("resp",this.modal_data);
      this.getDetail(catg, sub_catg);
    },
      error => {
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      });
  }

  getDetail(catg, sub_catg) {
    //alert("hii");
      
        console.log("model no",this.modal_data.modelno);
        
        let obj = {}
        obj['category']=catg;
        obj['subcategory'] = sub_catg;
        obj['stock'] = this.modal_data['stock'];
        obj['modelno'] = this.modal_data['modelno'];
        obj['forex_mrp'] = this.modal_data['mrp'];
        obj['piecepercarton'] = this.modal_data['piecepercarton'];
        obj['productid'] = this.modal_data['productid'];
       obj['created_user_id'] = this.loginUserData.user_id;
        obj['document_no'] = this.headerData.document_no;
        obj['confirm_status'] = 1;
        this.selectedList.push(obj);
       console.log("selected",this.selectedList);
        
      
  }
  getcurrency(){
    return this.service.getDatawithInput_id('1.06').subscribe((resp) => {
      this.spinner.hide();
      console.log(resp);

      this.vendors_currency = resp;
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      });
  }
  getBillAdd(): any {
    this.spinner.show();
    return this.service.getDatawithQueryParams2(5.1, this.userid, "bill").subscribe((resp) => {
      this.spinner.hide();
      console.log(resp);
      this.billAdd = resp;
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      });

  }

  getShipAdd(): any {
    this.spinner.show();
    return this.service.getDatawithQueryParams2(5.1, this.userid, "ship").subscribe((resp) => {
      this.spinner.hide();
      console.log(resp);

      this.shipAdd = resp;
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      });
  }

  getprodimg(code) {
    this.spinner.show();
    return this.service.getDatawithQueryParams1('14.5',code).subscribe((resp) => {
      this.spinner.hide();
      console.log('reour',resp);
      
      this.resources = resp;
      this.ven_POHidden = true;
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      });
  }

  getModal(p, q) {
    this.spinner.show();
    let select = "All";
    return this.service.getDatawithQueryParams4('10', p, q, select, this.mod_modalno).subscribe((resp) => {
      this.spinner.hide();
      this.httpdata = resp;
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      });
  }
//For Model's
  getModal1(p, q, r) {
    this.spinner.show();
    return this.service.getDatawithQueryParams4('10', p, q, r, this.mod_modalno).subscribe((resp) => {
      this.spinner.hide();
      this.httpdata2 = resp;
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      });
  }
//For Modal Details
  getModal2(p, q, r) {
    this.spinner.show();
    return this.service.getDatawithQueryParams1('10.1', this.mod_modalno).subscribe((resp) => {
      this.spinner.hide();
      this.disp(resp);
      this.httpdata3 = resp;
      console.log("updated",this.httpdata3);
      
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      });
  }

  // display() {
   
  // }
  adv_display() {
    this.isHidden = !this.isHidden;
  }

  addFieldValue() {
    this.newAttribute1.Field_Qaun = "true";
    this.fieldArray.push(this.newAttribute1);
    this.newAttribute1 = {};
  }

  add_disable(attr) {
    let arr = ["category", "subcategory", "modelno", "qty"];
    for (let i of arr) {
      if (attr[i] == null || attr[i] == undefined) {
        return true;
      }
    }
    return false;
  }

  placeorder_disable(sl, attr, field) {
    let arr = ["category", "subcategory", "modelno", "qty"];
    for (let i of arr) {
      if ((attr[i] == null || attr[i] == undefined) && sl.length == 0 && field.length == 0) {
        return true;
      }
    }
    return false;
  }

  deleteFieldValue2(index) {
    this.fieldArray.splice(index, 1);
  }

  change_form(val) {
    this.catg_change(val);
    this.selectedCategory_form = val;
  }

  catg_change(val) {
    let arr = ["subcategory", "modelno", "qty", "piecepercarton", "net_price", "tot_value"];
    console.log("vv", val);
    if (val == '') {
      for (let i of arr) {
        this.newAttribute1[i] = '';
        this.selectedSubCategory_form = undefined;
        this.selected_modalno == '';
      }
    }
  }

  sele_sub_catg() {
    if (this.selectedCategory_form == "") {
      return true;
    }
    return false;
  }

  sele_model() {
    if (this.selectedSubCategory_form == undefined) {
      return true;
    }
    return false;
  }

  sele_quan() {
    if ((this.selected_modalno == undefined) || (this.selected_modalno == '')) {
      return true;
    }
    return false;
  }

  disp(resp){
    console.log("http",resp);
    console.log("mrp",resp.mrp);
      this.newAttribute1['forex_mrp'] = resp.mrp;
      this.newAttribute1['stock'] = resp.stock;
      this.newAttribute1['productid'] = resp.productid;
      this.newAttribute1['piecepercarton'] = resp.piecepercarton;
      this.newAttribute1['document_date'] = this.headerData.document_date;
      this.newAttribute1['created_user_id'] = this.loginUserData.user_id;
      this.newAttribute1['document_no'] = this.headerData.document_no;
      this.newAttribute1['confirm_status'] = 1;
console.log("new",this.newAttribute1);

  }

  change1(val, v) {
    let s1 = v;
    let s2 = val;
    this.selectedSubCategory_form = s2;
    this.subcatg_change(val);
    let s = "All"
    return this.getModal1(s1, s2, s)
  }

  subcatg_change(val) {
    let arr = ["modelno", "qty", "piecepercarton", "net_price", "tot_value"];
    //console.log("vv", val);
    if (val == '') {
      for (let i of arr) {
        this.newAttribute1[i] = '';
      }
    }

  }
  change2(val) {
    this.mod_modalno = [];
    this.selected_modalno = '';
    this.selected_modalno = val;
    let select = "Select";
    this.modal_change(val);
    this.mod_modalno.push(val);
    return this.getModal2(this.selectedCategory_form, this.selectedSubCategory_form, select);

  }

  modal_change(val) {
    let arr = ["qty", "piecepercarton", "net_price", "tot_value"];
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
    obj['stock'] = r['stock_qty'];
    obj['piecepercarton'] = r['piecepercarton'];
    obj['discount_eff'] = r['discount'];
    obj['productid'] = r['productid'];
    obj['document_date'] = this.headerData.document_date;
    obj['created_user_id'] = this.loginUserData.user_id;
    obj['document_no'] = this.headerData.document_no;
    this.selectedList.push(obj);
  }

  deleteFieldValue(index) {
    this.selectedList.splice(index, 1);
  }



  prod_category(p, ev) {
    this.selected_cat = p.Category;
    console.log(this.selected_cat);
    this.selectedCategory = p.Category;
  }

  del(obj: any) {
    const index: number = this.sub.indexOf(obj);
    if (index !== -1) {
      this.sub.splice(index, 1);
      this.sub1 = '';
    }
  }

  prod_subcategory(p, pd, ev) {
    this.selected_sub_cat = pd.SubCategory;
    this.getModal(p.Category, pd.SubCategory)
  }

  del1(obj: any) {
    const index: number = this.Select_modal.indexOf(obj);
    if (index !== -1) {
      this.Select_modal.splice(index, 1);
    }
  }

  // onKey(catg) {
  //   console.log(catg.quantity);
  //   catg.qty = catg.carton * catg.piecepercarton;
  //   let a = catg.qty * catg.net_price;
  //   catg.tot_value = Math.round(a);
  // }

  // onKey1(newAttribute1) {
  //   newAttribute1.qty = newAttribute1.carton * newAttribute1.piecepercarton;
  //   newAttribute1.tot_value = newAttribute1.qty * newAttribute1.net_price;
  // }
  disc(newAttribute1) {
    //alert("enter");
    //newAttribute1.exchange_rate=this.vendor_c.exchange_rate;
    let temp=newAttribute1.forex_mrp * (newAttribute1.discount_eff/100);
    newAttribute1.fr_effectiveprice=newAttribute1.forex_mrp-temp;
    newAttribute1.forex_value=newAttribute1.fr_effectiveprice*newAttribute1.qty;
    newAttribute1.tot_value=newAttribute1.forex_value * this.headerData.exchange_rate;
    console.log("data",newAttribute1.tot_value,"forex",newAttribute1.forex_value,"header",this.headerData.exchange_rate);
    
  };
  disc1(catg){
    //catg.exchange_rate=this.vendor_c.exchange_rate;
    let temp=catg.forex_mrp * (catg.discount_eff/100);
    catg.fr_effectiveprice=catg.forex_mrp-temp;
    catg.forex_value=catg.fr_effectiveprice*catg.qty;
    catg.tot_value=catg.forex_value * this.headerData.exchange_rate;
  }
  //Place Order 
  addupd(selected, attr, field) {
    if (attr['category']) {
      this.fieldArray.push(attr);
      this.po = [...selected, ...this.fieldArray];
    }
    else {
      this.po = [...selected, ...this.fieldArray];
    }
    this.poHidden = !this.poHidden;
    this.addressHidden = !this.poHidden;
  }

  selected_ship = '';
  selected_bill = '';
  isheck: boolean = false;
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

  //disable confirm order button
  con_disable() {
    if (this.shipping_seq_no != undefined && this.shipping_seq_no != '' && this.billing_seq_no != undefined && this.billing_seq_no != '') {
      return false;
    } else {
      return true;
    }
  }


  // Confirmation Of Order-inserting PO-Confirm Order
  confirm_order() {
    this.spinner.show();
    this.headerData.dest_company_code = this.selected_vendor_code.toString();
    this.headerData.shipping_seq_no = this.shipping_seq_no;
    this.headerData.billing_seq_no = this.billing_seq_no;
    this.headerData.credit_period = this.paymentData.creditperiod;
    this.headerData.payment_terms = this.paymentData.paymentterms;
    this.headerData.spl_instr = this.paymentData.splinstr;
    this.headerData.remarks1 = this.paymentData.remarks1;
    this.headerData.remarks2 = this.paymentData.remarks2;
    this.headerData.import_i = 1;
    this.headerData.vendor={"vendorcode":this.selected_vendor_code.toString(),"vendorname":this.selected_vendor}


    let process_in = 'PO';
    let operation_in = 'INSERT';
    let draft_final_in = 'FINAL';
    let document_no_out = '';
    let message_out = '';
    this.loginMethod = 'insert_update/';
    // console.log("total orders:", this.po);
    this.body = { "process_in": process_in, "json_hdr": this.headerData, "json_dtl": this.po, "operation_in": operation_in, "draft_final_in": draft_final_in, "document_no_out": document_no_out, "message_out": message_out };
    // console.log(this.body);
    this.myJSON = JSON.stringify(this.body);
    // console.log(this.myJSON);

    this.service.postData(this.myJSON, this.loginMethod).subscribe((data) => {
      this.spinner.hide();
      console.log("po data",data);
      this.poprint = data;
      localStorage.setItem('importpoprintData', JSON.stringify(data));
      if (data['Message'] == "PO Sucessfully inserted ") {
        $('#orderSuccessfulModal').modal('show');
        
      }
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        
      });
  }

  gotoPrint() {
    this.router.navigateByUrl('/import-po-print');
  }

  cart_data: any;
  cart_list() {
    this.spinner.show();
    let user = this.loginUserData.user_id;
    return this.service.getDatawithQueryParams1('4.2', user).subscribe((resp) => {
      this.spinner.hide();
      this.cart_data = resp;
      this.cart_update();

    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      });
  }
  cart_update() {
    for (let r of this.cart_data.values) {
      let obj = {}
      obj['category'] = r['category'];
      obj['subcategory'] = r['subcategory'];
      obj['modelno'] = r['modelno'];
      obj['net_price'] = r['enduserprice'];
      obj['mrp'] = r['mrp'];
      obj['piecepercarton'] = r['piecepercarton'];
      obj['discount_eff'] = r['discount_a'];
      obj['productid'] = r['productid'];
      obj['document_date'] = this.headerData.document_date;
      obj['created_user_id'] = this.loginUserData.user_id;
      obj['document_no'] = this.headerData.document_no;
      this.selectedList.push(obj);
    }
    // console.log("from cart", this.selectedList);

  }

}
