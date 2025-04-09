import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalServiceService } from '../../global-service.service';
import { DataServiceService } from '../../data-service.service';
// import { ComponentCommunicationService } from '../component-communication.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from '../../toastr-service.service';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;

@Component({
  selector: 'app-branch-manager-status',
  standalone: false,
  templateUrl: './branch-manager-status.component.html',
  styleUrls: ['./branch-manager-status.component.scss']
})
export class BranchManagerStatusComponent implements OnInit {

  POhidden: boolean = true;
  DOhidden: boolean = false;
  GRNhidden: boolean = false;
  AOhidden: boolean = false;

  sub: any;
  detpage: any = 1
  page: any = 1;
  page1: any = 1;
  page2: any = 1
  page3: any = 1
  commenting: any;
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
  sel_act: any;
  s_a: any = {};
  sel_act1: any;
  selected: boolean = true;
  selected_list: any[] = [];
  cancel_list: any[] = [];
  cmp_d: any;
  branchdata: any = []
  searchText: any
  constructor(private router: Router, private route: ActivatedRoute, private service: GlobalServiceService, public dataService: DataServiceService,
    private dialog: MatDialog, private spinner: NgxSpinnerService, private toasterService: ToasterService) {
    this.obj.id = 4;

  }

  ngOnInit() {

    this.alert = false;
    this.token = localStorage.getItem('token');
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    if (this.loginUserData.role == 'Admin') {
      this.getBranchDropdown()
    }


    console.log("branchdata", this.branchdata)
    this.commenting = this.loginUserData.first_name + ' ' + this.loginUserData.last_name
    if (this.loginUserData === null) {
      this.router.navigateByUrl('home');
    }
    // this.po();
    if (localStorage.getItem('lastvisited') == "Cancelled Order") {

      this.do();
    }
    if (localStorage.getItem('lastvisited') == "Approved Order") {

      this.Ao();
    }
    if (localStorage.getItem('lastvisited') == "Placed Order") {

      this.po();
    }
    if (localStorage.getItem('lastvisited') == "Closed Order") {

      this.grn();
    }

    // localStorage.setItem("lastvisited", "");
    if (!localStorage.getItem('lastvisited')) {

      this.po();
    }
    this.sub = this.route.params.subscribe(params => {
      if (this.token == null) {
        this.user_id = '';
      } else {
        this.user_id = this.loginUserData.user_id;
        this.userid_cc = this.user_id + "@" + this.loginUserData.company_code;
      }
    });


  }
  orderscount: any
  onpagechange(event) {
    if (this.POhidden == true) {

      if (this.branch) {
        this.page3 = event
        this.service.getDatawithMethod1('UserRecordsView/?page=' + event + '&search=' + this.searchText + '&company=' + this.branch).subscribe((resp) => {
          this.response = resp
          this.placedorders = this.response.results
          for(let a of this.placedorders){
            if(a.userprofiledtl.outstanding){
            this.outstanding=(a.userprofiledtl.outstanding).toFixed(2)
            this.splitamount=this.outstanding.split('.')
            a.userprofiledtl.outstanding=JSON.parse(this.splitamount[0])
            a.userprofiledtl.decimal=this.splitamount[1]
            }
          }
          // this.orderscount=this.response.count
          window.scrollTo(0, 0)
          this.spinner.hide();
        })
      }
      else {
        this.page3 = event
        this.spinner.show();
        this.service.getDatawithMethod1('UserRecordsView/?page=' + event + '&search=' + this.searchText).subscribe((resp) => {
          this.response = resp
          this.placedorders = this.response.results
          for(let a of this.placedorders){
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
    }
    else if (this.AOhidden == true) {

      if (this.branch) {
        this.page = event
        this.service.getDatawithMethod1('UserRecordsView/?page=' + event + '&search=' + this.searchText + '&uid=1' + '&company=' + this.branch).subscribe((resp) => {
          this.response = resp
          this.approvedorders = this.response.results
          // this.orderscount=this.response.count
          for(let a of this.approvedorders){
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
      else {
        this.page = event
        this.spinner.show();
        this.service.getDatawithMethod1('UserRecordsView/?page=' + event + '&search=' + this.searchText + '&uid=1').subscribe((resp) => {
          this.response = resp
          this.approvedorders = this.response.results
          for(let a of this.approvedorders){
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
    }
    else if (this.DOhidden == true) {

      if (this.branch) {
        this.page1 = event
        this.service.getDatawithMethod1('UserRecordsView/?page=' + event + '&search=' + this.searchText + '&uid=0' + '&company=' + this.branch).subscribe((resp) => {
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
          // this.orderscount=this.response.count
          window.scrollTo(0, 0)
          this.spinner.hide();
        })
      }
      else {
        this.page1 = event
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
    }
    else if (this.GRNhidden == true) {

      if (this.branch) {
        this.page2 = event
        this.service.getDatawithMethod1('UserRecordsView/?page=' + event + '&param=Delivered&search=' + this.searchText + '&uid=1' + '&company=' + this.branch).subscribe((resp) => {
          this.response = resp
          this.deliveredorders = this.response.results
          for(let a of this.deliveredorders){
            if(a.userprofiledtl.outstanding){
            this.outstanding=(a.userprofiledtl.outstanding).toFixed(2)
            this.splitamount=this.outstanding.split('.')
            a.userprofiledtl.outstanding=JSON.parse(this.splitamount[0])
            a.userprofiledtl.decimal=this.splitamount[1]
            }
          }
          // this.orderscount=this.response.count
          window.scrollTo(0, 0)
          this.spinner.hide();
        })
      }
      else {
        this.page2 = event
        this.spinner.show();
        this.service.getDatawithMethod1('UserRecordsView/?page=' + event + '&param=Delivered&search=' + this.searchText + '&uid=1').subscribe((resp) => {
          this.response = resp
          this.deliveredorders = this.response.results
          for(let a of this.deliveredorders){
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

    }
  }
  getGrn(): any {


    console.log("dnm", this.userid_cc);
    let param1 = "";
    let param2 = "";

    this.service.getDatawithQueryParams3("8.0", param1, param2, this.loginUserData.company_code).subscribe((resp) => {
      console.log(resp);

      this.grn_data = resp;

    });
  }
  po_no: any
  state: any
  action: boolean = false
  select_action(ev, p) {

    if (p.dt) {
      for (let po of p.dt) {
        if (po.detail) {
          for (let d of po.detail) {
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
    this.po_no = p.company

  }
  select_placed_action(ev, p) {

    if (p) {
      for (let po of this.orders) {
        if (po.detail) {
          for (let d of po.detail) {
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
    this.po_no = p.user_id + '@' + p.company_code

  }
 
  select_placed_action1(ev, p) {


    if (p) {
    
      // this.spinner.show()
      for (let po of this.orders) {
        this.service.getDatawithMethodParams1('get_marketing_details/', po.spo_no).subscribe((resp) => {
          this.ordersdetail = resp;

          if (this.ordersdetail) {
            for (let d of this.ordersdetail) {
              this.state = d.Status
              po.state = true
              if (this.state == "Invoice Made" || this.state == "Packed") {
                po.state = false
                // this.toasterService.error("Unable to cancel")
               
                break;
              }
              else {
                this.action = true
                //   this.toasterService.error("Unable to cancel")
              }
            }
          }

        })

      }
    }
    console.log(this.orders, "orders")
   
    this.selected = false;
    this.selected_list = [];
    console.log("selected", this.selected);

    console.log("event", ev.target.value);
    this.sel_act = ev.target.value;
    this.po_no = p.user_id + '@' + p.company_code


  }
  netprice: any = []
  net_price: any = []
  srlno: any = []
  netamount: any = []
  select_price(netprice, po, pd) {

    if (netprice) {
      for (var n = 0; n < this.netprice.length; n++) {

        if (netprice < this.netprice[n].net_price) {

          if (po.po_no == this.netprice[n].po_no && pd.modelno == this.netprice[n].model_no) {
            if (this.netamount.length > 0) {

              for (var k = 0; k < this.netamount.length; k++) {
                if (this.netamount[k].srlno == pd.po_srl_no) {
                  this.netamount[k].srlno = pd.po_srl_no
                  this.netamount[k].net_price = netprice
                }
                else {
                  this.netamount.push({ "net_price": netprice, "srlno": pd.po_srl_no })
                  break;
                }
              }
            }

            else {
              this.netamount.push({ "net_price": netprice, "srlno": pd.po_srl_no })
              // this.net_price.push(netprice)
              // this.srlno.push(pd.po_srl_no)
              console.log(this.netamount, "this.netamount")
            }

          }

        }
      }
    }
  }
  quantity: any = []
  totalqty: any = []
  select_qty(qty, po, pd) {


    if (qty) {
      for (var s = 0; s < this.qty.length; s++) {
        if (qty < this.qty[s].qty) {
          if (po.po_no == this.qty[s].po_no && pd.modelno == this.qty[s].model_no) {
            if (this.totalqty.length > 0) {

              for (var k = 0; k < this.totalqty.length; k++) {
                if (this.totalqty[k].srlno == pd.po_srl_no) {
                  this.totalqty[k].srlno = pd.po_srl_no
                  this.totalqty[k].quantity = qty
                }
                else {
                  this.totalqty.push({ "quantity": qty, "srlno": pd.po_srl_no })
                  break;
                }

              }
            }

            else {
              this.totalqty.push({ "quantity": qty, "srlno": pd.po_srl_no })
              // this.net_price.push(netprice)
              // this.srlno.push(pd.po_srl_no)
              console.log(this.totalqty, "this.totalqty")
            }
            // this.quantity.push(qty)
            // console.log(this.quantity,"this.quantity")

          }
        }
      }
    }
  }
  // po_no1: any
  // sel_action_check(ev, data, po) {



  //   console.log("pl data", data);
  //   if (ev.target.checked) {
  //     let status;
  //     this.podetail = po.detail;
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
  //     this.po_no1 = po.po_no
  //   }
  //   else {
  //     // alert("Un-Check");
  //     this.check(data);
  //   }
  // }
  po_no1: any
  data: any
  sel_action_check(ev, po) {



    // console.log("pl data", data);
    if (ev.target.checked) {
      let status;
      this.podetail = po.detail
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
      this.po_no1 = po.company_code
    }
    else {
      // alert("Un-Check");

      this.podetail = po.detail
      this.check(this.podetail);
      // this.po_no1 = po.po_no
    }
  }

  // sel_action_check1(ev, po) {


  //   // console.log("pl data", data);
  //   if (ev.target.checked) {
  //     let status;
  //     this.podetail = po.detail;
  //     if (this.sel_act == "Approve") {
  //       status = 1;
  //     }
  //     else {
  //       status = 0;
  //     }
  //     for (var pd = 0; pd < this.podetail.length; pd++) {
  //       let obj = {};
  //       obj['productid'] = this.podetail[pd]['productid'];
  //       obj['po_srl_no'] = this.podetail[pd]['po_srl_no'];
  //       obj['seq_no'] = this.podetail[pd]['dtl_seq_no'];
  //       obj['status'] = status;
  //       obj['process'] = 'cancelled';
  //       obj['net_price'] = this.podetail[pd]['net_price'];
  //       obj['qty'] = this.podetail[pd]['qty']

  //       this.selected_list.push(obj);
  //       console.log("total", this.selected_list);
  //       this.po_no1 = po.company_code
  //     }
  //   }
  //   else {
  //     // alert("Un-Check");

  //     this.podetail = po.detail;
  //     this.check(this.podetail);
  //   }
  // }
  sel_action_check1(ev, po) {

    this.podetail = []
    // console.log("pl data", data);
    if (ev.target.checked) {
      let status;
      this.service.getDatawithMethodParams1('get_marketing_details/', po.spo_no).subscribe((resp) => {
        this.ordersdetail = resp;
        this.podetail = this.ordersdetail;
        status = 0;
        for (var pd = 0; pd < this.podetail.length; pd++) {
          let obj = {};
          obj['productid'] = this.podetail[pd]['productid'];
          obj['po_srl_no'] = this.podetail[pd]['po_srl_no'];
          obj['seq_no'] = this.podetail[pd]['Seq_no'];
          obj['status'] = status;
          obj['process'] = 'cancelled';
          obj['net_price'] = this.podetail[pd]['net_price'];
          obj['qty'] = this.podetail[pd]['qty']
          this.selected_list.push(obj);
          console.log("total", this.selected_list);
          this.po_no1 = po.user_id + '@' + po.company_code
        }

      })

    }
    else {
      // alert("Un-Check");
      this.service.getDatawithMethodParams1('get_marketing_details/', po.spo_no).subscribe((resp) => {
        this.ordersdetail = resp;
        this.podetail = this.ordersdetail;
        this.check(this.podetail);
      })
    }
  }

  checke: any;
  checkc: any;
  podetail: any = [];
  status: any
  detail: any
  dt: any
  approveall(ev, data, p) {


    this.selected_list = [];
    this.podetail = []
    if (ev.target.checked) {
      let status;
      this.dt = p.dt
      for (let d of this.dt) {
        this.detail = d.detail;
        for (let det of this.detail) {
          this.podetail.push(det)
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
      for (var pd = 0; pd < this.podetail.length; pd++) {

        let obj = {};
        obj['productid'] = this.podetail[pd].productid
        obj['po_srl_no'] = this.podetail[pd].po_srl_no
        obj['seq_no'] = this.podetail[pd].dtl_seq_no
        obj['status'] = status;
        obj['qty'] = this.podetail[pd].qty
        obj['net_price'] = this.podetail[pd].net_price
        obj['user_id'] = this.loginUserData.user_id;
        this.selected_list.push(obj);

        console.log("selected_list", this.selected_list);
        this.po_no1 = p.company;

      }
      this.totalqty = []
      this.netamount = []
      // this.srlno=[]
    }
    if (!ev.target.checked) {
      this.checke = (data);
      this.checkc = false;
      this.selected_list = [];
      this.podetail = []
    }
  }
  placedapproveall(ev, data, p) {


    this.selected_list = [];
    this.podetail = []
    if (ev.target.checked) {
      let status;
      //  this.dt=p
      for (let d of this.orders) {
        this.detail = d.detail;
        for (let det of this.detail) {
          this.podetail.push(det)
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
      for (var pd = 0; pd < this.podetail.length; pd++) {

        let obj = {};
        obj['productid'] = this.podetail[pd].productid
        obj['po_srl_no'] = this.podetail[pd].po_srl_no
        obj['seq_no'] = this.podetail[pd].dtl_seq_no
        obj['status'] = status;
        obj['qty'] = this.podetail[pd].qty
        obj['net_price'] = this.podetail[pd].net_price
        obj['user_id'] = this.loginUserData.user_id;
        this.selected_list.push(obj);

        console.log("selected_list", this.selected_list);


      }
      this.po_no1 = p.user_id + '@' + p.company_code;
      this.totalqty = []
      this.netamount = []
      // this.srlno=[]
    }
    if (!ev.target.checked) {
      this.checke = (data);
      this.checkc = false;
      this.selected_list = [];
      this.podetail = []
    }
  }
  allordersdetail: any = []
  placedapproveall1(ev, data, p) {
    

    this.selected_list = [];
    this.podetail = []
    if (ev.target.checked) {
      let status;
      //  this.dt=p
      for (let d of this.orders) {
        if (d.state == true) {
          this.service.getDatawithMethodParams1('get_marketing_details/', d.spo_no).subscribe((resp) => {
            this.allordersdetail = resp;

           
            this.detail = this.allordersdetail;
            for (let det of this.detail) {
             
              this.podetail = []
              this.podetail.push(det)

              console.log(this.podetail, "podetail")
              if (this.sel_act == "Approve") {
                status = 1;
                this.checke = true;
              }
              else {
                status = 0;
                this.checkc = true;
              }
              for (var pd = 0; pd < this.podetail.length; pd++) {

                let obj = {};
                obj['productid'] = this.podetail[pd].productid
                obj['po_srl_no'] = this.podetail[pd].po_srl_no
                obj['seq_no'] = this.podetail[pd].Seq_no
                obj['status'] = status;
                obj['qty'] = this.podetail[pd].qty
                obj['net_price'] = this.podetail[pd].net_price
                obj['user_id'] = this.loginUserData.user_id;
                this.selected_list.push(obj);

                console.log("selected_list", this.selected_list);


              }
              // }

            }
          })
        }
      }
      this.po_no1 = p.user_id + '@' + p.company_code;
      this.totalqty = []
      this.netamount = []
      // this.srlno=[]
    }
    if (!ev.target.checked) {
      this.checke = (data);
      this.checkc = false;
      this.selected_list = [];
      this.podetail = []
    }
  }
  checkeds: any
  podetails: any;
  checkcancel: any;
  cancelall(ev, data, p) {


    console.log("pl data", data);
    this.selected_list = [];
    if (ev.target.checked) {
      let status;
      this.checkcancel = true;
      this.dt = p.dt
      for (let d of this.dt) {
        this.detail = d.detail;
        for (let det of this.detail) {
          this.podetail.push(det)
        }
      }
      if (this.sel_act == "Approve") {
        status = 1;
      }
      else {
        status = 0;
      }

      let obj = {};

      for (var pd = 0; pd < this.podetail.length; pd++) {

        let obj = {};
        obj['productid'] = this.podetail[pd].productid
        obj['po_srl_no'] = this.podetail[pd].po_srl_no
        obj['seq_no'] = this.podetail[pd].dtl_seq_no
        obj['status'] = status;
        obj['process'] = 'cancelled';
        obj['qty'] = this.podetail[pd].qty
        obj['net_price'] = this.podetail[pd].net_price
        obj['user_id'] = this.loginUserData.user_id;

        if (this.quantity.length > 0 && this.quantity[pd]) {
          for (var j = 0; j < this.srlno.length; j++) {
            if (this.podetail[pd].po_srl_no == this.srlno[j]) {
              obj['qty'] = this.quantity[p];
            }
          }

        }
        if (this.net_price.length > 0 && this.net_price[pd]) {
          for (var j = 0; j < this.srlno.length; j++) {
            if (this.podetail[pd].po_srl_no == this.srlno[j]) {
              obj['net_price'] = this.net_price[p];
            }
          }
        }
        this.selected_list.push(obj);
        console.log("total", this.selected_list);
        this.po_no1 = p.company
      }
      this.quantity = []
      this.net_price = []
      this.srlno = []
    }
    else {
      // alert("Un-Check");
      this.checke = false;
    }
  }
  check(data: any): any {
    
    console.log("un-check", data);
    console.log("un-check", data.productid);
    console.log("before removed", this.selected_list);
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
  keypress2(event: any) {

    const pattern = /^[A-Za-z0-9' ']+$/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  pd: any
  sub_sel_data() {

    console.log("dat_sel", this.selected_list);
    // this.pd=pd
    $('#confirm').modal('show');
  }
  quant: any
  np: any
  comment: any;
  bodyy: any

  confirm_sub(commentings) {
    this.spinner.show()
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
        this.checke = false;
        this.po_no = ""
        this.po_no1 = ""
        // this.commenting = "";
        this.spinner.hide()
        this.checkc = false
        if (this.POhidden == true) {

          this.getplacedorders();
          this.indexExpanded = -1;
        }
        if (this.AOhidden == true) {
          this.searchText = ''
          this.getapprovedorderslist()
          this.indexExpanded = -1;
        }

      });

    }
  }
  // c_a(data) {


  //   let seq = data.detail[0].dtl_seq_no;
  //   let seq1 = "";
  //   let method = "cancel/all/"
  //   return this.service.getDatawithdeleteQuery(method, seq, seq1).subscribe(data => {
  //     this.getplacedorders();
  //   })
  // }

  verify_all(data) {


    for (let p of data.detail) {
      if (p.status == "canceled" || p.status == "Dispatched") {
        return true;
      }
    }
    return false;

  }
  branch: any
  index: any
  final_amount: any
  getOrders(company, i) {

    this.indexExpanded = i == this.indexExpanded ? -1 : i;
    this.spinner.show();
    let param2 = "";
    let param3 = "";
    // if(this.branch){
    this.service.getDatawithQueryParams4('3.9', '1.21', param2, param3, company.user_id + '@' + company.company_code).subscribe((resp) => {
      // this.getplacedorddata(resp)
      this.orders = resp;
      for (let o of this.orders) {

        // this.final_amount = (JSON.parse(o.final_amount)).toFixed(2);
        this.final_amount = o.final_amount?(JSON.parse(o.final_amount)).toFixed(2):0;
        // this.splitamount = this.final_amount.split('.')
        this.splitamount = this.final_amount?this.final_amount.split('.'):0;
        // o.final_amount = JSON.parse(this.splitamount[0])
        o.final_amount = this.splitamount[0]?JSON.parse(this.splitamount[0]):0;
        o.decimalamount = this.splitamount[1]
      }
      this.spinner.hide();
    });
    // }
    // else{
    //   this.service.getDatawithQueryParams4('3.9', '1.2', param2, param3, this.loginUserData.company_code).subscribe((resp) => {
    //     // this.spinner.hide();

    //     this.getorddata(resp);
    //   });
    // } 
  }
  indexExpanded: number = -1;

  togglePanels(index: number) {
    this.indexExpanded = index == this.indexExpanded ? -1 : index;
  }
  totaloutstanding: any
  pos: any
  qty: any = []
  q: any
  nprice: any
  pnum: any
  body: any
  pricedata: any
  modelno: any
  finalAmtBeforeround: any
  splitamount: any = []
  decimalamount: any
  totaloutstandingamount: any
  getplacedorddata(resp) {


    this.orders = []
    this.qty = []
    this.netprice = []

    // this.totaloutstandingamount = (resp.outstanding).toFixed(2);
    // this.splitamount=this.totaloutstandingamount.split('.')
    // this.totaloutstanding=JSON.parse(this.splitamount[0])
    // this.decimalamount=this.splitamount[1]
    this.orders = resp;
    if (this.orders.length > 0) {
      for (var i = 0; i < this.orders.length; i++) {
        if (this.orders.length > 0) {
          this.pos = this.orders

          for (var j = 0; j < this.pos.length; j++) {

            this.finalAmtBeforeround = this.pos[j].final_amount;
            this.pos[j].final_amount = Math.round(this.pos[j].final_amount)
            this.pos[j].roundoffAmt = (this.pos[j].final_amount - this.finalAmtBeforeround)


            // console.log(this.pos,"ordersfinal")
            for (var k = 0; k < this.pos[j].detail.length; k++) {
              this.q = this.pos[j].detail[k].qty
              this.nprice = this.pos[j].detail[k].net_price
              this.pnum = this.pos[j].po_no


              this.modelno = this.pos[j].detail[k].modelno
              this.body = { "qty": this.q, "po_no": this.pnum, "model_no": this.modelno }
              this.qty.push(this.body)
              // console.log(this.qty,"qty")
              this.pricedata = { "net_price": this.nprice, "po_no": this.pnum, "model_no": this.modelno }
              this.netprice.push(this.pricedata)
              this.spinner.hide();
            }
          }
        }

      }
    }
    else {
      this.spinner.hide();
    }

  }
  getorddata(resp) {


    this.orders = []
    this.qty = []
    this.netprice = []

    this.totaloutstandingamount = (resp.outstanding).toFixed(2);
    this.splitamount = this.totaloutstandingamount.split('.')
    this.totaloutstanding = JSON.parse(this.splitamount[0])
    this.decimalamount = parseInt(this.splitamount[1])

    this.orders = resp.products;

    for (var i = 0; i < this.orders.length; i++) {
      if (this.orders[i].dt.length > 0) {
        this.pos = this.orders[i].dt

        for (var j = 0; j < this.pos.length; j++) {

          this.finalAmtBeforeround = this.pos[j].final_amount;
          this.pos[j].final_amount = Math.round(this.pos[j].final_amount)
          this.pos[j].roundoffAmt = (this.pos[j].final_amount - this.finalAmtBeforeround)


          console.log(this.pos, "ordersfinal")
          for (var k = 0; k < this.pos[j].detail.length; k++) {
            this.q = this.pos[j].detail[k].qty
            this.nprice = this.pos[j].detail[k].net_price
            this.pnum = this.pos[j].po_no


            this.modelno = this.pos[j].detail[k].modelno
            this.body = { "qty": this.q, "po_no": this.pnum, "model_no": this.modelno }
            this.qty.push(this.body)
            // console.log(this.qty,"qty")
            this.pricedata = { "net_price": this.nprice, "po_no": this.pnum, "model_no": this.modelno }
            this.netprice.push(this.pricedata)

          }
        }
      }
    }
    this.spinner.hide()
  }

  po() {
    this.indexExpanded = -1;
    this.searchText = ''
    localStorage.setItem("lastvisited", "Placed Order");
    this.sel_act = ''
    this.POhidden = true;
    this.DOhidden = false;
    this.GRNhidden = false;
    this.AOhidden = false;
    this.getplacedorders()
    // this.getOrders();

  }
  placedorders: any = []
  response: any
  getplacedorders() {
    if (this.page3 == 1) {
      this.spinner.show();
      if (this.branch) {
        this.service.getDatawithMethod1('UserRecordsView/?company=' + this.branch + '&search=' + this.searchText).subscribe((resp) => {
          this.response = resp
          this.placedorders = this.response.results
          for(let a of this.placedorders){
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
        this.service.getDatawithMethod1('UserRecordsView/?search=' + this.searchText).subscribe((resp) => {
          this.response = resp
          this.placedorders = this.response.results
          for(let a of this.placedorders){
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
    }
    else {
      this.onpagechange(this.page3)
    }
  }
  do() {
    this.indexExpanded = -1;
    this.searchText = ''
    localStorage.setItem("lastvisited", "Cancelled Order");
    this.POhidden = false;
    this.DOhidden = true;
    this.GRNhidden = false;
    this.AOhidden = false;

    this.spinner.show();

    this.getcancelledorderslist()
  }
  cancelledorders: any = []
  getcancelledorderslist() {
    if (this.page1 == 1) {
      this.spinner.show();
      if (this.branch) {
        this.service.getDatawithMethod1('UserRecordsView/?uid=0&company=' + this.branch + '&search=' + this.searchText).subscribe((resp) => {
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
    }
    else {
      this.onpagechange(this.page1)
    }
  }
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
    if (this.POhidden == true) {

      this.spinner.show();
      if (this.branch) {
        this.service.getDatawithMethod1('UserRecordsView/?search=' + searchtext + '&company=' + this.branch).subscribe((resp) => {
          this.response = resp
          this.page3 = 1
          this.placedorders = this.response.results
          for(let a of this.placedorders){
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

        this.service.getDatawithMethod1('UserRecordsView/?search=' + searchtext).subscribe((resp) => {
          this.page3 = 1
          this.response = resp

          this.placedorders = this.response.results
          for(let a of this.placedorders){
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

    }
    else if (this.AOhidden == true) {

      this.spinner.show();
      if (this.branch) {
        this.service.getDatawithMethod1('UserRecordsView/?uid=1&search=' + searchtext + '&company=' + this.branch).subscribe((resp) => {
          this.response = resp
          this.page = 1
          this.approvedorders = this.response.results
          for(let a of this.approvedorders){
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
        this.service.getDatawithMethod1('UserRecordsView/?uid=1&search=' + searchtext).subscribe((resp) => {
          this.response = resp
          this.page = 1
          this.approvedorders = this.response.results
          for(let a of this.approvedorders){
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

    }
    else if (this.DOhidden == true) {

      this.spinner.show();
      if (this.branch) {
        this.service.getDatawithMethod1('UserRecordsView/?uid=0&search=' + searchtext + '&company=' + this.branch).subscribe((resp) => {
          this.response = resp
          this.page1 = 1
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
        this.service.getDatawithMethod1('UserRecordsView/?uid=0&search=' + searchtext).subscribe((resp) => {
          this.response = resp
          this.page1 = 1
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

    }
    else if (this.GRNhidden == true) {
      this.spinner.show();
      if (this.branch) {
        this.service.getDatawithMethod1('UserRecordsView/?uid=1&param=Delivered&search=' + searchtext + '&company=' + this.branch).subscribe((resp) => {
          this.response = resp
          this.page2 = 1
          this.deliveredorders = this.response.results
          for(let a of this.deliveredorders){
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
        this.service.getDatawithMethod1('UserRecordsView/?uid=1&param=Delivered&search=' + searchtext).subscribe((resp) => {
          this.response = resp
          this.page2 = 1
          this.deliveredorders = this.response.results
          for(let a of this.deliveredorders){
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
    }
  }
  // do() {

  //   localStorage.setItem("lastvisited", "Cancelled Order");
  //   this.POhidden = false;
  //   this.DOhidden = true;
  //   this.GRNhidden = false;
  //   this.AOhidden = false;

  //   this.spinner.show();
  //   let param2 = "0";
  //   let param3 = "";
  //   if(this.branch){
  //     this.service.getDatawithQueryParams4('3.9', '1.2', param2, param3, this.branch).subscribe((resp) => {
  //       this.spinner.hide();

  //       this.getorddata(resp);
  //     });
  //   }
  //   else{
  //     this.service.getDatawithQueryParams4('3.9', '1.2', param2, param3, this.loginUserData.company_code).subscribe((resp) => {
  //       this.spinner.hide();

  //       this.getorddata(resp);
  //     });
  //   }

  // }

  grn() {
    this.indexExpanded = -1;
    this.searchText = ''
    localStorage.setItem("lastvisited", "Closed Order");
    this.POhidden = false;
    this.DOhidden = false;
    this.GRNhidden = true;
    this.AOhidden = false;


    this.getclosedorderslist()
  }

  Ao() {
    this.indexExpanded = -1;
    this.searchText = ''
    this.spinner.show();
    localStorage.setItem("lastvisited", "Approved Order")
    this.sel_act = ''
    this.POhidden = false;
    this.DOhidden = false;
    this.GRNhidden = false;
    this.AOhidden = true;


    this.getapprovedorderslist()
  }
  outstanding:any
  approvedorders: any = []
  getapprovedorderslist() {
    if (this.page == 1) {
      this.spinner.show();
      if (this.branch) {
        this.service.getDatawithMethod1('UserRecordsView/?uid=1&company=' + this.branch + '&search=' + this.searchText).subscribe((resp) => {
          this.response = resp
          this.approvedorders = this.response.results
          for(let a of this.approvedorders){
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
        this.service.getDatawithMethod1('UserRecordsView/?uid=1').subscribe((resp) => {
          this.response = resp
          this.approvedorders = this.response.results
          for(let a of this.approvedorders){
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
    }
    else {
      this.onpagechange(this.page)
    }
  }
  getapprovedorders(company, i) {
    this.indexExpanded = i == this.indexExpanded ? -1 : i;

    this.spinner.show();
    let param2 = "1";
    let param3 = "";
    // if(this.branch){
    // this.service.getDatawithQueryParams4('3.9', '1.21', param2, param3, company.user_id + '@' + company.company_code).subscribe((resp) => {
    //   this.orders = resp;
    //   for(let o of this.orders){

    //     this.final_amount = (JSON.parse(o.final_amount)).toFixed(2);
    //     this.splitamount=this.final_amount.split('.')
    //     o.final_amount=JSON.parse(this.splitamount[0])
    //     o.decimalamount=this.splitamount[1]
    //   }
    //   this.spinner.hide();

    //   // this.getplacedorddata(resp)
    // });
    // this.spinner.show();
    return this.service.getDatawithMethodParam2('get_marketing_list/', company.user_id).subscribe((resp) => {
      this.orders = resp;
      for (let o of this.orders) {
        if (o.final_amount) {
          this.final_amount = (JSON.parse(o.final_amount)).toFixed(2);
          this.splitamount = this.final_amount.split('.')
          o.final_amount = JSON.parse(this.splitamount[0])
          o.decimalamount = this.splitamount[1]
        }
      }
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

  // ordersdetail:any=[]
  getapprovedordersdetail(company, i) {
    this.checkc = false
    // this.indexExpanded = i == this.indexExpanded ? -1 : i;
    this.spinner.show();
    let param2 = "1";
    let param3 = "";
    // if(this.branch){
    // this.service.getDatawithQueryParam6('3.9', '1.21', param2, param3, company.user_id + '@' + company.company_code,'Delivered').subscribe((resp) => {
    //   this.orders = resp;
    //   for(let o of this.orders){

    //     this.final_amount = (JSON.parse(o.final_amount)).toFixed(2);
    //     this.splitamount=this.final_amount.split('.')
    //     o.final_amount=JSON.parse(this.splitamount[0])
    //     o.decimalamount=this.splitamount[1]
    //   }
    //   this.spinner.hide();
    //   // this.getplacedorddata(resp)
    // });
    return this.service.getDatawithMethodParams1('get_marketing_details/', company.spo_no).subscribe((resp) => {
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

  // Ao() {
  //   this.spinner.show();
  //   localStorage.setItem("lastvisited","Approved Order")
  //   this.sel_act = ''
  //   this.POhidden = false;
  //   this.DOhidden = false;
  //   this.GRNhidden = false;
  //   this.AOhidden = true;

  //   let param2 = "1";
  //   let param3 = "";
  //   if(this.branch){
  //   this.service.getDatawithQueryParams4('3.9', '1.2', param2, param3, this.branch).subscribe((resp) => {
  //     this.spinner.hide();
  //     this.getorddata(resp);
  //   });
  // }
  // else{
  //   this.service.getDatawithQueryParams4('3.9', '1.2', param2, param3, this.loginUserData.company_code).subscribe((resp) => {
  //     this.spinner.hide();
  //     this.getorddata(resp);
  //   });
  // }
  // }
  // getapprovedorders() {
  //   this.spinner.show()
  //   let param2 = "1";
  //   let param3 = "";
  //   this.service.getDatawithQueryParams4('3.9', '1.2', param2, param3, this.loginUserData.company_code).subscribe((resp) => {
  //     this.spinner.hide();
  //     this.getorddata(resp);
  //   });
  // }
  deliveredorders: any = []
  getclosedorderslist() {



    if (this.page2 == 1) {
      this.spinner.show();
      if (this.branch) {
        this.service.getDatawithMethod1('UserRecordsView/?uid=1&param=Delivered&company=' + this.branch + '&search=' + this.searchText).subscribe((resp) => {
          this.response = resp
          this.deliveredorders = this.response.results
          for(let a of this.deliveredorders){
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
        this.service.getDatawithMethod1('UserRecordsView/?uid=1&param=Delivered&search=' + this.searchText).subscribe((resp) => {
          this.response = resp
          this.deliveredorders = this.response.results
          for(let a of this.deliveredorders){
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
    }
    else {
      this.onpagechange(this.page2)
    }



  }
  getclosedorders(company, i) {
    this.indexExpanded = i == this.indexExpanded ? -1 : i;
    this.spinner.show();
    let param2 = "1";
    let param3 = "";
    // if(this.branch){
    // this.service.getDatawithQueryParam6('3.9', '1.21', param2, param3, company.user_id + '@' + company.company_code,'Delivered').subscribe((resp) => {
    //   this.orders = resp;
    //   for(let o of this.orders){

    //     this.final_amount = (JSON.parse(o.final_amount)).toFixed(2);
    //     this.splitamount=this.final_amount.split('.')
    //     o.final_amount=JSON.parse(this.splitamount[0])
    //     o.decimalamount=this.splitamount[1]
    //   }
    //   this.spinner.hide();
    //   // this.getplacedorddata(resp)
    // });
    return this.service.getDatawithMethodParam2('grn_list/', company.user_id).subscribe((resp) => {
      this.orders = resp;
      for (let o of this.orders) {

        this.final_amount = (JSON.parse(o.final_amount)).toFixed(2);
        this.splitamount = this.final_amount.split('.')
        o.final_amount = JSON.parse(this.splitamount[0])
        o.decimalamount = this.splitamount[1]
      }
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
  ordersdetail: any = []
  getclosedordersdetail(company, i) {
    // this.indexExpanded = i == this.indexExpanded ? -1 : i;
    this.spinner.show();
    let param2 = "1";
    let param3 = "";
    // if(this.branch){
    // this.service.getDatawithQueryParam6('3.9', '1.21', param2, param3, company.user_id + '@' + company.company_code,'Delivered').subscribe((resp) => {
    //   this.orders = resp;
    //   for(let o of this.orders){

    //     this.final_amount = (JSON.parse(o.final_amount)).toFixed(2);
    //     this.splitamount=this.final_amount.split('.')
    //     o.final_amount=JSON.parse(this.splitamount[0])
    //     o.decimalamount=this.splitamount[1]
    //   }
    //   this.spinner.hide();
    //   // this.getplacedorddata(resp)
    // });
    return this.service.getDatawithMethodParams1('grn_list_detail/', company.refinvno).subscribe((resp) => {
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
  // getclosedorders() {
  //   this.spinner.show();
  //   let param2 = "1";
  //   let param3 = "";
  //   if(this.branch){
  //     this.service.getDatawithQueryParam6('3.9', '1.2', param2, param3, this.branch, "delivered").subscribe((resp) => {
  //       this.spinner.hide();
  //       this.getorddata(resp);
  //     });
  //   }
  //   else{
  //     this.service.getDatawithQueryParam6('3.9', '1.2', param2, param3, this.loginUserData.company_code, "delivered").subscribe((resp) => {
  //       this.spinner.hide();
  //       this.getorddata(resp);
  //     });
  //   }

  // }
  check_status(p) {


    for (let pd of p) {
      if (pd.status !== "canceled") {
        return true;
      }
      return false;
    }
  }

  check_status1(p) {
    for (let pd of p) {
      if (pd.status == "canceled") {
        return true;
      }
      return false;
    }
  }
  outstandingdetails: any = []
  getinvdata: any = [];
  getinvdatadetail: any = [];
  getoutstanding(companycode) {

    $('#viewoutstandingModal').modal('show');
    this.dataService.getOnLoadServicesparam1(1000.12, companycode.user_id + '@' + companycode.company_code).subscribe((resp) => {
      this.outstandingdetails = resp;
      this.getinvdata = this.outstandingdetails.outstanding_detail
      this.getinvdatadetail = this.getinvdata[0].detail;
    })
  }
  sub_detail: any = []
  getproductdetails(seqno) {
    this.service.getDatawithMethod1("getdetailsinv/?seq_no=" + seqno).subscribe((resp) => {
      this.sub_detail = resp;
      // this.getinvdata = this.outstandingdetails.outstanding_detail
      // this.getinvdatadetail = this.getinvdata[0].detail;
    })
  }
  grnPrint(data) {

    console.log("grnprint", data);
    //console.log(data);
    localStorage.setItem('grnstatusprintData', JSON.stringify(data));
    this.router.navigateByUrl('/grnstatusprint');
  }

  can_product(data) {

    console.log("order", data);
    //this.can_d=data;
    this.cancel_list = []
    //$('#confirm').modal('show');
    let obj = {}
    obj['process'] = "cancelled";
    obj['po_srl_no'] = data['po_srl_no'];
    obj['seq_no'] = data['dtl_seq_no'];
    this.cancel_list.push(obj);
    $('#cancelModal').modal('show');
    // let loginMethod = 'cancel/';
    // // //let body = {"seq_no": data.dtl_seq_no, "productid": data.productid};
    // return this.service.getDatawithdeleteQuery(loginMethod,data.dtl_seq_no,data.productid).subscribe((data) => {
    //    console.log("cancel",data);
    //    this.getOrders();
    //   this.spinner.hide();

    // });

  }
  confirm_cancel() {

    let loginMethod = 'cancel/';
    let body = this.cancel_list;
    return this.service.postData(body, loginMethod).subscribe((data) => {
      console.log("cancel", data);
      this.cancel_list = [];
      this.getplacedorders();
      this.spinner.hide();

    });
  }
  keypress(event: any) {

    const pattern = /[0-9.]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  keypress1(event: any) {

    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  /* ================================================================= */
  /* activeTab = localStorage.getItem('activeTab');
   if(activeTab){
     $('#myTab a[href="' + activeTab + '"]').tab('show');
   } */

  /* ================================================================= */

  getBranchDropdown() {

    this.spinner.show();
    return this.service.getDatawithQueryParams2('5.12', this.loginUserData.company_code, 'BRANCH').subscribe((resp) => {
      //console.log(resp);
      this.branchdata = resp;
      this.branchdata.push({ 'company_code': 'HYD_MAIN', 'companyname': 'Powertex Tools Company Pvt. Ltd.' })
      this.branch = 'HYD_MAIN'
    })
  }

  getstatus() {
    if (this.POhidden == true) {
      this.getplacedorders()
    }
    else if (this.AOhidden == true) {
      this.getapprovedorderslist()
    }
    else if (this.DOhidden == true) {
      this.getcancelledorderslist()
    }
    else if (this.GRNhidden == true) {
      this.getclosedorderslist()
    }
  }
  detailprint1: boolean = true
  printoutstanding() {

    let popupWinindow
    let innerContents = document.getElementById('outstanding').innerHTML;

    popupWinindow = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWinindow.document.open();
    popupWinindow.document.write(`<html><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><link rel="stylesheet"  href="styles.scss" />
      <style>
      p{margin:0px;font-size: 12px;}
      table thead th {background: gray;color:white;}
      @media print {
        .col-md-3 {
          width:30%;
          float: left;
        }
        #printPageButton {
          display: none;
        }
        .outstanding{
          color:#d9534f
        }
        .total_invoice_page {
          background: #fff;
          padding: 20px;
          box-shadow: 0px 3px 12px 0px #cccccc;
      }
      .invoce_address {
          padding: 0 30px;
          border: 1px dashed #37475a;
      }
      .company_address{
          font-weight: 700;
          font-size: 12px;
          padding-right: 5px;
          color: #232f3e;
      }
      
      .hr_line{
          border-bottom: 1px dashed #37475a;
          border-top: 1px dashed #37475a;
      }
      .marg_t_b_15{
          margin-top: 15px;
          margin-bottom: 15px;
      }
      .hr_line_botm{
          border-bottom: 1px dashed #37475a;
      }
      
      .f_left{
          float:left;
      }
      .f_right{
          float:right;
      }
      
      .fnt_size_12{
          font-size: 12px;
      }
      
      .pad_r_15{
          padding-right: 15px;
      }
      .pad_l_15{
          padding-left: 15px;
      }
      
      .theme_bgclr {
          font-size: 11px !important;
          padding: 3px 12px !important;
        }
      
        .mar_b_30{
          margin-bottom: 30px;
      }
      
      .marg_t_15 {
          margin-top: 15px;
      }
      .printTable tbody tr td{
        font-size: 11px;
    }
      }
      </style>
      </head>
      <body class="container"  onload="window.print()">` + innerContents + '</html>');
    popupWinindow.document.close();
  }
  printoutstand: boolean = false
  printdetail() {

    this.detailprint1 = true
    let popupWinindow
    let innerContents = document.getElementById('detailprint').innerHTML;
    let innerContents1 = document.getElementById('heading').innerHTML;
    popupWinindow = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWinindow.document.open();
    popupWinindow.document.write(`<html><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><link rel="stylesheet"  href="styles.scss" />
      <style>
      p{margin:0px;font-size: 12px;}
      table thead th {background: gray;color:white;}
      @media print {
        .col-md-3 {
          width:30%;
          float: left;
        }
        #printPageButton {
          display: none;
        }
        .total_invoice_page {
          background: #fff;
          padding: 20px;
          box-shadow: 0px 3px 12px 0px #cccccc;
      }
      .invoce_address {
          padding: 0 30px;
          border: 1px dashed #37475a;
      }
      .company_address{
          font-weight: 700;
          font-size: 12px;
          padding-right: 5px;
          color: #232f3e;
      }
      
      .hr_line{
          border-bottom: 1px dashed #37475a;
          border-top: 1px dashed #37475a;
      }
      .marg_t_b_15{
          margin-top: 15px;
          margin-bottom: 15px;
      }
      .hr_line_botm{
          border-bottom: 1px dashed #37475a;
      }
      
      .f_left{
          float:left;
      }
      .f_right{
          float:right;
      }
      
      .fnt_size_12{
          font-size: 12px;
      }
      
      .pad_r_15{
          padding-right: 15px;
      }
      .pad_l_15{
          padding-left: 15px;
      }
      
      .theme_bgclr {
          font-size: 11px !important;
          padding: 3px 12px !important;
        }
      
        .mar_b_30{
          margin-bottom: 30px;
      }
      
      .marg_t_15 {
          margin-top: 15px;
      }
      .printTable tbody tr td{
        font-size: 11px;
    }
      }
      </style>
      </head>
      <body class="container"  onload="window.print()">` + innerContents1 + innerContents + '</html>');
    popupWinindow.document.close();
  }
}
