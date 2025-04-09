import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalServiceService } from '../../global-service.service';
import { DataServiceService } from '../../data-service.service';
// import { ComponentCommunicationService } from '../component-communication.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import * as fileSaver from 'file-saver';

import { ToasterService } from '../../toastr-service.service';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-dealer-status',
  standalone: false,
  templateUrl: './dealer-status.component.html',
  styleUrls: ['./dealer-status.component.scss']
})
export class DealerStatusComponent implements OnInit {
  POhidden: boolean = true;
  DOhidden: boolean = false;
  GRNhidden: boolean = false;
  PENhidden: boolean = false;
  searchText:any
  select: any;
  sub: any;
  page: any = 1;
  page1: any = 1;
  page2: any = 1;
  orders: any;
  loginUserData: any;
  token: any;
  alert: boolean;
  obj: any = {};
  user_id: any;
  icon: boolean;
  panelOpenState = false;
  userid_cc: any;
  grn_data: any;
  ven_POHidden: boolean = false;;
  placedorders: any = [];
  deliveredorders: any = [];
  loginuserid: any;


  dealers: any;
  userid: any;
  dealeruserid: any;
  param4: any;
  param5: any;
  commenting: any;
  constructor( private toasterService: ToasterService,private router: Router, private route: ActivatedRoute, private service: GlobalServiceService, public dataService: DataServiceService,
    private dialog: MatDialog, private spinner: NgxSpinnerService) {
    this.obj.id = 4;
  }

  ngOnInit() {
    this.alert = false;
    this.token = localStorage.getItem('token');
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
 
    this.sub = this.route.params.subscribe(params => {
      if (this.token == null) {
        this.user_id = '';
      } else {
        this.user_id = this.loginUserData.user_id;
       
        
      }
    });
    this.commenting=this.loginUserData.first_name+' '+this.loginUserData.last_name
    // this.getdealerslist()
  //   if (this.loginUserData.role == "Marketing Manager") {
  //   let data = this.route.params.subscribe(params1 => {
  //     this.user_id = params1['dealer'];
  //     console.log(this.user_id);
  //     if(this.user_id){
  //       this.param3=""
  //       this.getOrders();
  //       this.getdealerslist()
  //       this.POhidden = true;
  //       this.DOhidden = false;
  //       this.GRNhidden = false;
  //       this.PENhidden = false;
     
  //     }
  //   },
  //  error => {         this.spinner.hide();
  //     this.dialog.open(ErrorModalComponent, {
  //   data: { errorModal:true }
  // });
  //     // console.log(error);
  //   });
  // }
    // if (this.loginUserData.role != "Marketing Manager") {
      this.param3="Null"
      this.getOrders();
      // this.getGrn();
    // }
  
  }

  getdealerslist() {
    this.userid = this.loginUserData.user_id
    return this.service.getDatawithMethodParams1('market/drop', this.userid).subscribe((resp) => {
      this.dealers = resp;
    })
  }

  dealer_chn(event) {
    this.user_id = event.user
    this.param3=""
    this.getOrders()
    this.POhidden = true;
    this.DOhidden = false;
    this.GRNhidden = false;
    this.PENhidden = false;
  }

  getdealerOrders() {
   
    this.spinner.show();

    this.placedorders = []
    this.deliveredorders = []
    this.loginuserid = this.loginUserData.user_id
    this.service.getDatawithMethodParams3('market/status', this.dealeruserid, this.loginuserid,this.param3).subscribe((resp) => {
      this.spinner.hide();
      this.orders = resp;
      this.ven_POHidden = true
    });
  }

  getGrn(): any {
    this.grn_data = ''
    let param1 = "";
    let param2 = "";
    if (this.loginUserData.role == 'Marketing Manager') {
      this.userid_cc = this.user_id + "@" + this.loginUserData.company_code;
      this.param4 = this.user_id
      this.param5 = this.loginUserData.user_id
      this.service.getDatawithMethodParams5("market/grn/grn_hisotry", param1, param2, this.userid_cc, this.param4, this.param5).subscribe((resp) => {
        this.grn_data = resp;
      })
    }
    else {
      if (this.loginUserData.role == "Dealer") {
        this.userid_cc = this.user_id + "@" + this.loginUserData.company_code;
      } else {
        this.userid_cc = this.loginUserData.company_code;
      }
      this.service.getDatawithQueryParams3("8.0", param1, param2, this.userid_cc).subscribe((resp) => {
        this.grn_data = resp;
      });
    }
  }
param3:any
  getOrders() {
    this.spinner.show();
    
    this.service.getDatawithQueryParams3(7.6, this.user_id,"",this.param3).subscribe((resp) => {
      this.spinner.hide();
      this.ven_POHidden = true
      this.getorddata(resp);
    });
  }
  finalAmtBeforeround:any
  
  getorddata(resp) {
    this.orders = resp.data;
    for(let i of this.orders){
      this.finalAmtBeforeround= i.final_amount;
    i.final_amount=Math.round(i.final_amount)
    i.roundoffAmt=(i.final_amount-this.finalAmtBeforeround)
   
    }
    console.log(this.orders,"ordersfinal")
  }
 
  po() {
    this.indexExpanded = -1;
    this.POhidden = true;
    this.DOhidden = false;
    this.GRNhidden = false;
    this.PENhidden=false
    this.param3="Null"
    this.searchText=''
    // if (this.loginUserData.role == "Marketing Manager") {
    //   this.getdealerOrders()
    // }
    // else {
      this.getOrders()
    // }
  }

  do() {
    this.indexExpanded = -1;
    this.POhidden = false;
    this.DOhidden = true;
    this.GRNhidden = false;
    this.PENhidden=false
    this.param3="Delivered"
    this.searchText=''
    // if (this.loginUserData.role == "Marketing Manager") {
    //   this.getdealerOrders()
    // }
    // else {
      // this.getOrders()
      this.getdeliveredorders()
    // }
  }
  getdeliveredorders(){
    this.spinner.show();
    return this.service.getDatawithMethodParams1('grn_list/', this.loginUserData.user_id).subscribe((resp) => {
      this.orders = resp;
      this.spinner.hide();
    },
    error => {     
          this.spinner.hide();
          this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
          // console.log(error);
        });
  }
  getdeliveredOrdersdetail(p,i){
    this.indexExpanded = i == this.indexExpanded ? -1 : i;
    this.spinner.show();
    return this.service.getDatawithMethodParams1('grn_list_detail/',p.refinvno).subscribe((resp) => {
      this.ordersdetail = resp;
      this.spinner.hide();
    },
    error => {     
          this.spinner.hide();
          this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
          // console.log(error);
        });
  }
  pen() {
    this.indexExpanded = -1;
    this.POhidden = false;
    this.DOhidden = false;
    this.GRNhidden = false;
    this.PENhidden=true
    this.param3="Placed"
    this.searchText=''
    // if (this.loginUserData.role == "Marketing Manager") {
    //   this.getdealerOrders()
    // }
    // else {
      this.getpendingOrders()
    // }
  }
  getpendingOrders(){
    this.spinner.show();
    return this.service.getDatawithMethodParams1('get_marketing_list/', this.loginUserData.user_id).subscribe((resp) => {
      this.orders = resp;
      this.spinner.hide();
    },
    error => {     
          this.spinner.hide();
          this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
          // console.log(error);
        });
  }
  indexExpanded: number = -1;
  ordersdetail:any
  getpendingOrdersdetail(p,i){
    this.indexExpanded = i == this.indexExpanded ? -1 : i;
    this.spinner.show();
    return this.service.getDatawithMethodParams1('get_marketing_details/',p.spo_no).subscribe((resp) => {
      this.ordersdetail = resp;
      this.spinner.hide();
    },
    error => {     
          this.spinner.hide();
          this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
          // console.log(error);
        });
  }
  grn() {
    this.indexExpanded = -1;
    this.searchText=''
    this.POhidden = false;
    this.DOhidden = false;
    this.GRNhidden = true;
   
    this.PENhidden=false
    // this.getGrn();
    this.getcancelledorderslist()
  }
  response:any
  cancelledorders:any=[]
  orderscount:any
  outstanding:any
  getcancelledorderslist() {
    if (this.page2 == 1) {
      this.spinner.show();
     
     
        this.service.getDatawithMethod1('UserRecordsView/?uid=0&search=' + this.searchText).subscribe((resp) => {
          this.response = resp
          this.cancelledorders = this.response.results
          for(let a of this.cancelledorders){
            if(a.userprofiledtl.outstanding){
            this.outstanding=(a.userprofiledtl.outstanding).toFixed(2)
            this.splitamount=this.outstanding.split('.')
            a.userprofiledtl.outstanding=JSON.parse(this.splitamount[0])
            a.userprofiledtl.decimal=this.splitamount[1]
            }
          }
          this.orderscount = this.response.count
          window.scrollTo(0, 0)
          this.spinner.hide();
        })
      }
    
    else {
      this.onpagechange(this.page2)
    }
  }
  onpagechange(event) {
   
        this.page2 = event
        this.spinner.show();
        this.service.getDatawithMethod1('UserRecordsView/?page=' + event + '&search=' + this.searchText + '&uid=0').subscribe((resp) => {
          this.response = resp
          this.cancelledorders = this.response.results
          for(let a of this.cancelledorders){
            if(a.userprofiledtl.outstanding){
            this.outstanding=(a.userprofiledtl.outstanding).toFixed(2)
            this.splitamount=this.outstanding.split('.')
            a.userprofiledtl.outstanding=JSON.parse(this.splitamount[0])
            a.userprofiledtl.decimal=this.splitamount[1]
            }
          }
          window.scrollTo(0, 0)
          this.spinner.hide();
        })
  }
  final_amount:any
  splitamount:any=[]
  getcancelledorders(company, i) {
    this.indexExpanded = i == this.indexExpanded ? -1 : i;
    this.spinner.show();
    let param2 = "0";
    let param3 = "";
    // if(this.branch){
    this.service.getDatawithQueryParams4('3.9', '1.21', param2, param3, company.user_id + '@' + company.company_code).subscribe((resp) => {
      this.orders = resp;
      for (let o of this.orders) {

        this.final_amount = (JSON.parse(o.final_amount)).toFixed(2);
        this.splitamount = this.final_amount.split('.')
        o.final_amount = JSON.parse(this.splitamount[0])
        o.decimalamount = this.splitamount[1]
      }
      this.spinner.hide();
      // this.getplacedorddata(resp)
    });
  }
  searchdata(searchtext) {
   
  
      this.spinner.show();
     
        this.service.getDatawithMethod1('UserRecordsView/?uid=0&search=' + searchtext).subscribe((resp) => {
          this.response = resp
          this.page2 = 1
          this.cancelledorders = this.response.results
          for(let a of this.cancelledorders){
            if(a.userprofiledtl.outstanding){
            this.outstanding=(a.userprofiledtl.outstanding).toFixed(2)
            this.splitamount=this.outstanding.split('.')
            a.userprofiledtl.outstanding=JSON.parse(this.splitamount[0])
            a.userprofiledtl.decimal=this.splitamount[1]
            }
          }
          this.orderscount = this.response.count
          window.scrollTo(0, 0)
          this.spinner.hide();
        })
   
    
    
  }
  check_status(p) {

    for (let pd of p) {
      if (pd.status !== "Delivered") {

        return true;
      }
      else {

        return false;
      }
    }
  }
  count = 0
  check_status1(p) {
    for (let pd of p) {
      if (pd.status == "Delivered") {
        console.log(p, "orders")
        this.count++
        return true;
      }

      return false;
    }
    console.log(this.count, "count")

  }

  grnPrint(data) {
    localStorage.setItem('grnstatusprintData', JSON.stringify(data));
    this.router.navigateByUrl('/grnstatusprint');
  }

  reorder(data) {

    let b = btoa(data.category);
    let c = btoa(data.subcategory);
    let d = btoa(data.modelno);
    let e = btoa(data.piecepercarton);
    let f = btoa(data.inv_qty);
    let g = btoa(data.tot_value);

    this.router.navigate(['/Dealer-ORDERS', b, c, d, e, f, g]);
    // this.router.navigateByUrl('/Dealer-ORDERS',data.productid);
  }
  po_no: any
  state: any
  action: boolean = false
  sel_act: any;
  selected: boolean = true;
  selected_list: any[] = [];
  // select_action(ev, p) {
  //   if (p.detail) {
  //     for (let d of p.detail) {
  //       this.state = d.status
  //       if (this.state != "cancelled" && this.state != "Invoice Made") {
  //         this.action = true;
  //       }
  //       else {
  //         this.action = false
  //         this.toasterService.error("Unable to cancel")
  //       }
  //     }
  //   }
  //   this.selected = false;
  //   this.selected_list = [];
  //   console.log("selected", this.selected);
  //   console.log("event", ev.target.value);
  //   this.sel_act = ev.target.value;
  //   this.po_no = p.po_no
  // }
  select_action(ev) {
   
    if (this.orders) {
      for(let p of this.orders){
      if(p.detail){
      for (let d of p.detail) {
        this.state = d.status
        if (this.state != "cancelled" && this.state != "Invoice Made") {
          this.action = true;
        }
        else {
          this.action = false
          this.toasterService.error("Unable to cancel")
        }
      }
      }
    }
    }
    this.selected = false;
    this.selected_list = [];
    console.log("selected", this.selected);
    console.log("event", ev.target.value);
    this.sel_act = ev.target.value;
    // this.po_no = p.po_no
  }
  checke: any;
  checkc: any;
  podetail: any = [];
  status: any
  po_no1: any
  totalqty: any = []
  netamount: any = []
  // approveall(ev, data, p) {

  //   this.selected_list = [];
  //   if (ev.target.checked) {
  //     let status;

  //     this.podetail = p.detail;
  //     if (this.sel_act == "Approve") {
  //       status = 1;
  //       this.checke = true;
  //     }
  //     else {
  //       status = 0;
  //       this.checkc = true;
  //     }
  //     for (var s = 0; s < this.podetail.length; s++) {

  //       let obj = {};
  //       obj['productid'] = this.podetail[s].productid
  //       obj['po_srl_no'] = this.podetail[s].po_srl_no
  //       obj['seq_no'] = this.podetail[s].dtl_seq_no
  //       obj['status'] = status;
  //       obj['qty'] = this.podetail[s].qty
  //       obj['net_price'] = this.podetail[s].net_price
  //       obj['user_id'] = this.loginUserData.user_id;
  //       this.selected_list.push(obj);

  //       console.log("selected_list", this.selected_list);
  //       this.po_no1 = p.po_no;

  //     }
  //     this.totalqty = []
  //     this.netamount = []
  //     // this.srlno=[]
  //   }
  //   if (!ev.target.checked) {
  //     this.checke = (data);
  //     this.checkc = false;
  //     this.selected_list = [];
  //   }
  // }
  detail:any
  approveall(ev) {

    this.selected_list = [];
    if (ev.target.checked) {
      let status;
      for(let d of this.orders){
        this.detail=d.detail;
        if(this.detail){
        for(let det of this.detail){
        this.podetail.push(det)
        }
      }
      }
     
      if (this.sel_act == "Approve") {
        status = 1;
        this.checke = true;
      }
      else {
        status = 0;
        this.checkc = true;
      }
      for (var s = 0; s < this.podetail.length; s++) {

        let obj = {};
        obj['productid'] = this.podetail[s].productid
        obj['po_srl_no'] = this.podetail[s].po_srl_no
        obj['seq_no'] = this.podetail[s].dtl_seq_no
        obj['status'] = status;
        obj['qty'] = this.podetail[s].qty
        obj['net_price'] = this.podetail[s].net_price
        obj['user_id'] = this.loginUserData.user_id;
        this.selected_list.push(obj);

        console.log("selected_list", this.selected_list);
        // this.po_no1 = p.po_no;

      }
      this.totalqty = []
      this.netamount = []
      // this.srlno=[]
    }
    if (!ev.target.checked) {
      this.checke = false;
      this.checkc = false;
      this.selected_list = [];
      this.podetail=[]
    }
  }
  quantity: any = []
  net_price: any = []
  srlno: any = []
  // sel_action_check(ev, data, p) {


  //   console.log("pl data", data);
  //   if (ev.target.checked) {
  //     let status;
  //     this.podetail = p.detail;
  //     if (this.sel_act == "Approve") {
  //       status = 1;
  //     }
  //     else {
  //       status = 0;
  //     }
  //     let obj = {};
  //     obj['productid'] = data['productid'];
  //     obj['po_srl_no'] = data['po_srl_no'];
  //     obj['seq_no'] = data['dtl_seq_no'];
  //     obj['status'] = status;
  //     obj['qty'] = data["qty"];
  //     obj['net_price'] = data['net_price'];
  //     obj['user_id'] = this.loginUserData.user_id;
  //     this.selected_list.push(obj);
  //     this.quantity = []
  //     this.net_price = []
  //     this.srlno = []
  //     console.log("total", this.selected_list);
  //     this.po_no1 = p.po_no
  //   }
  //   else {
  //     // alert("Un-Check");
  //     this.check(data);
  //   }
  // }
  // check(data: any): any {
  //   console.log("un-check", data);
  //   console.log("un-check", data.productid);
  //   for (let i = 0; i < this.selected_list.length; i++) {
  //     if (data.productid == this.selected_list[i].productid) {
  //       console.log("index", i);
  //       this.selected_list.splice(i, 1);
  //       console.log("after removed", this.selected_list);


  //     }
  //   }

  // }
  sel_action_check(ev,  p) {


    // console.log("pl data", data);
    if (ev.target.checked) {
      let status;
      this.podetail = p.detail;
      if (this.sel_act == "Approve") {
        status = 1;
      }
      else {
        status = 0;
      }
      for (var pd = 0; pd < this.podetail.length; pd++) {
      let obj = {};
      obj['productid'] = this.podetail[pd]['productid'];
      obj['po_srl_no'] = this.podetail[pd]['po_srl_no'];
      obj['seq_no'] = this.podetail[pd]['dtl_seq_no'];
      obj['status'] = status;
      obj['qty'] = this.podetail[pd]["qty"];
      obj['net_price'] = this.podetail[pd]['net_price'];
      obj['user_id'] = this.loginUserData.user_id;
      this.selected_list.push(obj);
      }
      this.quantity = []
      this.net_price = []
      this.srlno = []
      console.log("total", this.selected_list);
      // this.po_no1 = p.po_no
    }
    else {
      // alert("Un-Check");
      this.podetail = p.detail
      this.check(this.podetail);
    }
  }
  check(data: any): any {
    console.log("un-check", data);
    console.log("un-check", data.productid);
    for (let j = 0; j < data.length; j++) {
    for (let i = 0; i < this.selected_list.length; i++) {
      if (data[j].productid == this.selected_list[i].productid) {
        console.log("index", i);
        this.selected_list.splice(i, 1);
        console.log("after removed", this.selected_list);
      }

      }
    }

  }
  sub_sel_data() {
    console.log("dat_sel", this.selected_list);
    // this.pd=pd
    $('#confirm').modal('show');
  }
  keypress2(event: any) {
    const pattern = /^[A-Za-z0-9' ']+$/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
 
  confirm_sub(commentings) {
    
    if (commentings == undefined) {
      this.toasterService.warning("please give your comments")
    }
    else {
      if (this.totalqty.length > 0 || this.netamount.length > 0) {
        for (var s = 0; s < this.selected_list.length; s++) {
          for (var l = 0; l < this.netamount.length; l++) {
            if (this.selected_list[s].po_srl_no == this.netamount[l].srlno) {
              this.selected_list[s].net_price = this.netamount[l].net_price
            }
          }
          for (var t = 0; t < this.totalqty.length; t++) {
            if (this.selected_list[s].po_srl_no == this.totalqty[t].srlno) {
              this.selected_list[s].qty = this.totalqty[t].quantity
            }
          }
        }
      }
      for (var h = 0; h < this.selected_list.length; h++) {
        this.selected_list[h].comment = commentings
      }
      let body = this.selected_list;
      let methodName = "cancel/"
      return this.service.postData(body, methodName).subscribe(data => {
        this.sel_act = ''
        this.totalqty = []
        this.netamount = []
        this.selected_list=[]
        this.checke = false;
        this.select=undefined
        // this.commenting = "";
        this.checkc = false
        if (this.POhidden == true) {
          this.getOrders();
        }
      

      });

    }
  }
  dataURLtoFile() {
    let image = this.ordersdetail[0].invcopy;
    let inv_no = this.ordersdetail[0].refinvno;
    if (image) {
      let blob: any = new Blob([image], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;
      var count = (image.match(/media/g) || []).length;
      if (count > 1) {
        image = image.replace(/\/media/, '')
      }
      fileSaver.saveAs(this.service.imageurl + image, inv_no+"_Inv_Copy." + image.substr(image.length - 5).split('.')[1]);
    }
    else{
        this.toasterService.error("Data Not Available..!")
    }
  }
}
