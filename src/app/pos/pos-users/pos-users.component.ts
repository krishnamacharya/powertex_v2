import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../../global-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { formatDate } from "@angular/common";
declare var $: any;
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-pos-users',
  standalone: false,
  templateUrl: './pos-users.component.html',
  styleUrls: ['./pos-users.component.scss']
})
export class PosUsersComponent implements OnInit {
  isModal: boolean = false;
  httpdata2: any = [];
  httpdata3: any = [];
  mobile: any = "";
  httpdata4: any = [];
  bar_code: any = "";
  httpdata5: any = [];
  posModel: any = {};
  pay:any={};
  p: any = 1;
  todayDate = new Date();
  loginUserData: any;
  showMobile: boolean;
  showBarcode: boolean;
  invoiceListData: any = [];
  headerData: any = {};
  invoiceList: any[];
  keys: string[];
  newUserMsg: any = false;
  stockDataList: any = [];
  totalValue: any;
  total_gstAmount: any;
  displaMsg: boolean = false;
  loginMethod: string;
  resources: any;
  newAttribute1: any = {};
  selectedCategory_form: any;
  selectedSubCategory_form: any;
  mod_modalno: any[];
  selected_modalno: string;
  all_modals: any;
  POSorderVisible:boolean=true;
  POSpaymentVisible:boolean=false;
  PaymentDetails:any;
  mob_d: any=[];
  payment: {};
  pos_user:{};
  modelno:any;
  constructor(private service: GlobalServiceService, private dialog: MatDialog, private router: Router, private spinner: NgxSpinnerService) { }
  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    console.log(this.loginUserData);

    if (this.loginUserData === null) {
      this.router.navigateByUrl('home');
    }
    this.getuserdata();
    this.barcode();
    this.getprodimg();
    this.get_all_modals();
  }
  
  open() {
    $('#new_user').modal('show');
  }
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
  change_form(val) {
    //this.catg_change(val);
    this.selectedCategory_form = val;
  }
  sele_sub_catg() {
    if (this.selectedCategory_form == "") {
      return true;
    }
    return false;
  }
  change1(val, v) {
    let s1 = v;
    let s2 = val;
    this.selectedSubCategory_form = s2;
    this.subcatg_change(val);
     let s = "All"
    return this.getModal1(s1, s2, s)
  }
  change2(val, d) {
    this.mod_modalno = [];
    this.selected_modalno = '';
    this.selected_modalno = val;
    
    let select = "Select";
    //this.modal_change(val);
    this.mod_modalno.push(val);
    return this.getModal2(this.selectedCategory_form, this.selectedSubCategory_form, select);
  }
  subcatg_change(val) {
    let arr = ["modelno","carton","qty", "piecepercarton", "net_price","tot_value"];
    if(val==''){
      for (let i of arr) {
        this.newAttribute1[i] = '';
      }
    }
  }
  getModal1(p, q, r) {
    this.mod_modalno = [];
    return this.service.getDatawithQueryParams4User_id('10', p, q, r, this.mod_modalno,this.loginUserData.user_id).subscribe((resp) => {
      this.httpdata2 = resp;
      console.log('httpdata2',this.httpdata2);
      
    },
      error => {
        // this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      });
  }
  getModal2(p, q, r) {
    this.spinner.show();
    return this.service.getDatawithQueryParams4User_id('10', p, q, r, this.mod_modalno,this.loginUserData.user_id).subscribe((resp) => {
      //this.disp(resp);
      this.httpdata3 = resp;
      this.spinner.hide();
    },
      error => {
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      });
  }
  mod_disable(){
    if (this.selectedSubCategory_form == undefined) {
      return true;
    }
    return false;
  }
  sele_model() {
    if (this.selectedSubCategory_form == undefined && this.selectedCategory_form == undefined && this.httpdata2.length==0) {
      return true;
    }
    return false;
  }
  get_barcode(data){
    console.log("model",this.modelno);
     return this.service.getDatawithQueryParams1('3.71',data).subscribe((resp)=>{
      let d=resp;
      this.modelno="";
      console.log("resp",d);
      this.code_fetch(d);
      
    })
  }
  get_all_modals(){
    return this.service.getDatawithInput_id('3.7').subscribe((resp)=>{
      this.all_modals=resp;
      //console.log("modals",d);
      // this.code_fetch(d);
      
    })
  }
  code_fetch(data){
    console.log("barcode",data.barcode);
    this.bar_code_fetch(data.barcode);
  }
  pro(ev) {
    this.isModal = ev;
  }

  getuserdata() {
    this.service.getDatawithQueryParams2('5.2', "", "POS").subscribe((resp) => {
      this.httpdata2 = resp;

    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      });
  };

  getMobile(mobile) {
    this.mobile = mobile;
    this.showMobile = false;
  };

  changeMobile() {
    this.showMobile = true;
  };
  changeBarCode() {
    this.showBarcode = true;
  };
  getBarCode(barCode) {
    this.bar_code = barCode;
    this.showBarcode = false;
  }

  fetch(p) {
    // this.spinner.show();
    console.log(p);
    this.service.getDatawithQueryParams3('5.2', "", "POS", p).subscribe((resp) => {
      this.mob_d = resp;
      console.log("dataaa",this.mob_d);
     
      if (this.mob_d.length == 0) {
        // this.isModal = true;
        this.newUserMsg = true;
      }
      else{
        console.log("data");
        localStorage.setItem('mobile_user',JSON.stringify(this.mob_d));
       // this.store(this.mob_d);
      
      }
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      });
  };

  

  barcode() {
    //  this.spinner.show();
    return this.service.getDatawithInput_id('4.3').subscribe((resp) => {
      this.httpdata4 = resp;
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      });
  };

  userdata: any = {};
  bar_code_fetch(bar_code) {
    this.service.getDatawithQueryParams1('4.6', bar_code).subscribe((resp) => {
      this.bar_code = "";
      this.httpdata5 = resp;
      if (this.httpdata5.length > 0) {
        this.displaMsg = false;

        this.invoiceListData.push(this.httpdata5[0]);
        console.log("datsa",this.httpdata5);
        
      } else {
        this.displaMsg = true;
      }
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      });
  };


  getGrandTotalVal(item, val, gst?) {
    Object.defineProperties(item, { 'totalVal': { value: val }, 'gstVal': { value: gst } });

    this.totalValue = this.invoiceListData.filter((item) => item.totalVal)
      .map((item) => +item.totalVal)
      .reduce((sum, current) => sum + current);
    this.total_gstAmount = this.invoiceListData.filter((item) => item.gstVal)
      .map((item) => +item.gstVal)
      .reduce((sum, current) => sum + current);
  }


  deleteItem(item, totalVal) {
    this.invoiceListData = this.invoiceListData.filter(order => order.productid !== item.productid);
    this.getGrandTotalVal(totalVal, 1);
  }
  makepayment() {
    this.POSorderVisible=false;
    this.POSpaymentVisible=true;
    let val=this.totalValue + this.total_gstAmount;
    this.pay.collected=val.toFixed(2);
  }
 
  make_pay(data) {
    console.log("pay_info",data);
    if(data.payment=="card"){
      //data.collected=null;
      for(let p of this.mob_d){
        data.user_id=p.user_id;
        
        data.final_amount=this.totalValue + this.total_gstAmount;
      }
      this.PaymentDetails=data;
      return this.makeInvoice();
    }
    else if(data.payment=="cash"){
      //data.Reference=null;
      for(let p of this.mob_d){
        data.user_id=p.user_id;
        data.final_amount=this.totalValue + this.total_gstAmount
      }
      this.PaymentDetails=data;
      return this.makeInvoice();
    }
  }

  makeInvoice() {
// console.log("userid",this.httpdata3);
    this.headerData = {
      document_no: "",
      document_date: formatDate(this.todayDate, 'yyyyMMdd', 'en-US'),
      dest_company_code: this.mobile,
      source_company_code: this.loginUserData.company_code,
      inv_type: 'POS',
      shipment_point: 0,
      payment_terms: 0,
      currency_code: "",
      exchange_rate: 0,
      credit_period: 0,
      spl_instr: "",
      fin_year: "",
      bill_to_party_seq_no: 0,
      ship_to_party_seq_no: 0,
      created_user_id: this.loginUserData.user_id,
      pos_user_id: this.PaymentDetails.user_id,
      final_amount:this.PaymentDetails.final_amount,
      payment_type: this.PaymentDetails.payment,
      payment_rrn:this.PaymentDetails.Reference,
      payment_collected:this.PaymentDetails.collected
    }
    this.payment={
      pos_user_id: this.PaymentDetails.user_id,
      final_amount:this.PaymentDetails.final_amount,
      payment_type: this.PaymentDetails.payment,
      payment_rrn:this.PaymentDetails.Reference,
      payment_collected:this.PaymentDetails.collected
    }
    this.invoiceList = [];
    this.keys = Object.keys(this.posModel);
    for (let i = 0; i < this.invoiceListData.length; i++) {
      for (let j = 0; j < this.keys.length; j++) {
        if (this.invoiceListData[i].productid == this.keys[j]) {
          let json_dtl = {
            "document_no": i,
            "document_date": formatDate(this.todayDate, 'yyyyMMdd', 'en-US'),
            "discount_eff": this.invoiceListData[i].discount_eu3,
            "performainv_date": formatDate(this.todayDate, 'yyyyMMdd', 'en-US'),
            "po_date": formatDate(this.todayDate, 'yyyyMMdd', 'en-US'),
            "productid": this.invoiceListData[i].productid,
            "packing_qty": this.posModel[this.keys[j]],
            "net_price": this.posModel[this.keys[j]] * this.invoiceListData[i].net_price,
            "performa_inv_qty": 0,
            "mrp": this.invoiceListData[i].mrp,
            "tot_value": this.posModel[this.keys[j]] * this.invoiceListData[i].net_price,
            "srl_no": i + 1,
            "inv_srl_no": 0,
            "inv_qty": 0
          }
          this.invoiceList.push(json_dtl);
        }
      }
    }

    let body = {
      "process_in": 'INVPOS', "operation_in": "INSERT", "draft_final_in": "FINAL", "document_no_out": "", "message_out": "",
      "json_dtl": this.invoiceList, "json_hdr": this.headerData,"payment":this.payment
    }
    console.log(body);
    let methodName = "insert_update/"
    // this.spinner.show();
    this.service.postData(body, methodName).subscribe((data) => {
      console.log(data);
      // this.spinner.hide();
      if (data['Message'] == "POS Invoice  Sucessfully inserted") {
        this.stockUpdate();
        localStorage.setItem('posPrint', JSON.stringify(data));
        $('#succModal').modal('show');
      }
    },
      error => {
        this.spinner.hide();
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      });
  };

  gotoPrevious() {
    this.newUserMsg = false;
    this.mobile = "";
    this.invoiceListData = [];
    this.router.navigateByUrl('Pos-Print');
  };

  stockUpdate() {
    this.invoiceList.forEach(data => {
      let stockData = {
        "productid": data.productid,
        "qty_in": data.packing_qty,
        "tot_amt_in": data.tot_value
      }
      this.stockDataList.push(stockData);
    });
    let body = {
      "period_in": formatDate(this.todayDate, 'yyyyMM', 'en-US'),
      "company_code_in": this.loginUserData.company_code,
      "product_details": this.stockDataList,
      "storage_location_in": "WAREHOUSE1",
      "process_type_in": "INV"
    };
    console.log(body);
    let methodName = "proc_stock/"
    this.service.postData(body, methodName).subscribe((data) => {
      console.log(data);
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        //console.log(error);
      });

  };
  user_data(data) {
    this.userdata.user_type = "POS";
    // this.userdata.passing_param = 1;
    this.loginMethod = 'guest_user/';
    console.log("total orders:", this.userdata);
    this.service.postData(this.userdata, this.loginMethod).subscribe((data) => {
      console.log(data);
      this.spinner.hide();
      
    },
     error => {         this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  }

}
