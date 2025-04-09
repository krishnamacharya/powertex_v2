import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalServiceService } from '../../global-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from '../../toastr-service.service';
import { formatDate } from '@angular/common';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
import { MatDialog } from '@angular/material/dialog';
declare var $: any;
@Component({
  selector: 'app-make-packing-list',
  standalone: false,
  
  templateUrl: './make-packing-list.component.html',
  styleUrl: './make-packing-list.component.scss'
})
export class MakePackingListComponent implements OnInit {
  poData: any;
  packingListModel: any = {};
  poPackingListData: any;
  Page: any = 1
  p: any = 1;
  todayDate = new Date();
  headerData: any;
  packingList: any = [];
  keys: string[];
  loginUserData: any;
  message: any;
  packingListNo: any;
  stockDataList: any = [];
  approveBtn: any = false;
  approveBtn1: any = false;
  index: any;
  packingListprint: any;
  app_dis: boolean = true;
  a_packing: boolean = true;
  private fieldArray: Array<any> = [];
  newAttribute1: any = {};
  order_items: any = 0;
  selectedList: any[] = [];
  selectedCategory_form: any = '';
  selectedSubCategory_form: any;
  selected_modalno: any
  resources: any
  totalqty: number = 0
  totalcarton: number = 0
  totalfreeqty: number = 0
  totalfreecartoons: number = 0
  data: any
  packedData: any
  appbtn2: boolean = false
  constructor(private route: Router, private activeRoute: ActivatedRoute,private dialog:MatDialog, private globalService: GlobalServiceService, private spinner: NgxSpinnerService, private toasterService: ToasterService) {

  }
  promocode: any
  routeParams: any;
  ngOnInit() {
    this.poData = JSON.parse(localStorage.getItem('poData'));
    console.log(this.poData.outstanding)
    if (this.poData.outstanding > 0) {
      //  this.toasterService.warning("You have exceeded credit period")
      $('#alertpopup').modal('show');
    }
    // if (this.poData.outstanding > 0) {
    //  $('#alertpopup').modal('show');
    // }
    this.promocode = this.poData.code1,
      this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));

    if (this.loginUserData === null) {
      this.route.navigateByUrl('home');
    }
    console.log(this.poData);
    this.poData.remarks2 = this.loginUserData.first_name + ' ' + this.loginUserData.last_name
    if (!this.poData.remarks1) {
      if (this.poData.print) {
        this.poData.remarks1 = this.loginUserData.first_name + ' ' + this.loginUserData.last_name + '-' + this.poData.print
      }
      else {
        this.poData.remarks1 = this.loginUserData.first_name + ' ' + this.loginUserData.last_name
      }
    }

    if (this.poData.financial_year) {
      this.headerData = {
        document_no: 1,
        document_date: formatDate(this.todayDate, 'yyyyMMdd', 'en-US'),
        dest_company_code: this.poData.company_code,
        source_company_code: this.poData.inv_origin_company_code,
        // spo_no:this.poData.spo,
        inv_type: 'DOM',
        shipment_point: this.poData.shipment_point,
        payment_terms: this.poData.payment_terms?this.poData.payment_terms:'0',
        // payment_terms: 0,
        currency_code: this.poData.currency_code,
        exchange_rate: this.poData.exchange_rate,
        spl_instr: this.poData.spl_instr,
        ship_to_party_seq_no: this.poData.ship_to_party_seq_no,
        bill_to_party_seq_no: this.poData.bill_to_party_seq_no,
        credit_period: this.poData.credit_period?this.poData.credit_period:'0',
        // credit_period: 0,
        created_user_id: this.loginUserData.user_id,
        remarks1: this.poData.remarks1
      };
      this.getpackedData()
    }
    else {
      this.headerData = {
        document_no: 1,
        document_date: formatDate(this.todayDate, 'yyyyMMdd', 'en-US'),
        dest_company_code: this.poData.po_origin_company_code,
        source_company_code: this.poData.supp_company_code,
        // spo_no:this.poData.spo,
        inv_type: 'DOM',
        shipment_point: this.poData.shipment_point,
        payment_terms: this.poData.payment_terms?this.poData.payment_terms:'0',
        // payment_terms: 0,
        currency_code: this.poData.currency_code,
        exchange_rate: this.poData.exchange_rate,
        spl_instr: this.poData.spl_instr,
        ship_to_party_seq_no: this.poData.ship_to_party_seq_no,
        bill_to_party_seq_no: this.poData.bill_to_party_seq_no,
        credit_period: this.poData.credit_period?this.poData.credit_period:'0',
        // credit_period: 0,
        created_user_id: this.loginUserData.user_id,
        remarks1: this.poData.remarks1
      };
      // this.getpoData();
      this.Viewdetail(this.poData);
    }
  };
  showremarks: boolean = false;
  redirectto() {

    // if (this.appbtn2 == true) {
    //   this.a_packing = true
    // }
    // if (this.appbtn3 == true) {
    //   this.a_packing = true
    // }
    // else
    if (this.totalcarton == 0) {
      this.approveBtn = true
      this.a_packing = true
    }


    else {
      this.approveBtn = false
      // this.appbtn2 == false

      this.showremarks = true;
      if (this.poData.remarks2 == "") {

        this.toasterService.warning("please give your comments")
      }
      if (this.poData.remarks2) {
        console.log(this.poData.outstanding)
        if (this.poData.outstanding > 0) {

          //  this.toasterService.warning("You have exceeded credit period")
          $('#alertpopup').modal('show');
        }
        else {
          $('#makeinvoiceModal2').modal('show');
        }
      }
    }
  }
  keypress(event: any) {
    const pattern = /^[A-Za-z0-9' ']+$/;
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
  getpoData() {

    this.freeqtyarr = []
    this.spinner.show();
    this.globalService.getDatawithQueryParams4(3.9, 5, this.poData.po_no, this.poData.po_date, this.poData.po_origin_company_code).subscribe((data) => {
      this.spinner.hide();
      this.poPackingListData = data;
      this.poPackingListData.forEach(element => {
        // this.packingListModel[element.po_srl_no] = element.balance_qty;
        element.carton = (element.qty + element.free_qty) / element.piecepercarton;
        element.carton = Math.round((element.carton + Number.EPSILON) * 100) / 100
        element.packing_qty = element.qty



      });

      for (let i of this.poPackingListData) {
        let qty = i.qty + i.free_qty;
        this.totalqty = this.totalqty + qty;
        let carton = (i.qty + i.free_qty) / i.piecepercarton;
        this.totalcarton = this.totalcarton + carton;
        let freeqty = i.free_qty
        this.totalfreeqty = this.totalfreeqty + freeqty
        let freecarton = i.free_qty / i.piecepercarton
        this.totalfreecartoons = this.totalfreecartoons + freecarton

        if (i.free_qty != 0) {
          this.freeqtyarr.push({ "productname": i.subcategory + ' ' + i.modelno, "free_qty": i.free_qty })
        }

      }
      this.order_items = this.poPackingListData.length;
    },
     error => {
                this.spinner.hide();
                this.dialog.open(ErrorModalComponent, {
                  data: { errorModal:true }
                });
                // this.ngxSmartService.getModal('errorModal').open();
          
              });
  };
  getpackedData() {
    this.freeqtyarr = []
    this.spinner.show();
    this.globalService.getDatawithQueryParams5(3.9, 21, this.poData.packing_no, this.poData.packing_date, this.poData.inv_origin_company_code, this.poData.financial_year).subscribe((data) => {
      this.spinner.hide();
      this.poPackingListData = data;
      this.poPackingListData.forEach(element => {
        // this.packingListModel[element.po_srl_no] = element.balance_qty;
        element.carton = Math.round((element.npc + Number.EPSILON) * 100) / 100;
        element.packing_qty = element.packing_qty
        // element.actualcarton=element.carton
      });
      for (let i of this.poPackingListData) {
        let qty = i.packing_qty + i.free_qty;
        this.totalqty = this.totalqty + qty;
        let carton = i.npc;
        this.totalcarton = this.totalcarton + carton;
        let freeqty = i.free_qty
        this.totalfreeqty = this.totalfreeqty + freeqty
        let freecarton = i.free_qty / i.piecepercarton
        this.totalfreecartoons = this.totalfreecartoons + freecarton
        if (i.free_qty != 0) {
          this.freeqtyarr.push({ "productname": i.subcategory + ' ' + i.modelno, "free_qty": i.free_qty })
        }

      }
      this.totalcarton = this.totalcarton + this.totalfreecartoons;
      this.order_items = this.poPackingListData.length;
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
    console.log("qty", qty, "--packqty", packQty);

    if (packQty > qty) {
      this.approveBtn = true;
    } else {
      this.approveBtn = false;
    }
    // if(packQty==0){
    //   this.approveBtn1 = true;
    // }
    // else{
    //   this.approveBtn1 = false;
    // }

  }
  app_disable() {
    return this.app_dis = false;
  }
  checkdiscount(item, qty) {
    item.packing_qty = +(qty)


    if (qty != undefined) {
      this.totalqty = 0
      this.totalfreeqty = 0
      // this.totalcarton=0
      this.freeqtyarr = []
      // item.carton = qty / item.piecepercarton;
      for (let i of this.poPackingListData) {
        if (i.packing_qty != 0) {
          let qty = JSON.parse(i.packing_qty) + i.free_qty;
          this.totalqty = this.totalqty + qty;
          let freeqty = i.free_qty
          this.totalfreeqty = this.totalfreeqty + freeqty
          if (i.free_qty != 0) {
            this.freeqtyarr.push({ "productname": i.subcategory + ' ' + i.modelno, "free_qty": i.free_qty })
          }
        }
        else {
          let qty = JSON.parse(i.packing_qty);
          this.totalqty = this.totalqty + qty;
          let freeqty = 0
          this.totalfreeqty = this.totalfreeqty + freeqty



        }
        // let carton = i.carton ;
        // this.totalcarton = this.totalcarton + carton;
      }


      if ((JSON.parse(qty)) != 0 && (JSON.parse(qty)) != undefined) {

         this.globalService.getDatawithQueryParams4User_id("121", item.productid, qty, item.net_price, item.discount_eff, this.poData.po_origin_id).subscribe(data => {
          for (var j = 0; j < this.poPackingListData.length; j++) {
            if (item.productid == this.poPackingListData[j].productid && item.seq_no == this.poPackingListData[j].seq_no && item.po_srl_no == this.poPackingListData[j].po_srl_no) {

              this.poPackingListData[j].net_price = Math.round((data['net'] + Number.EPSILON) * 100) / 100;
              this.poPackingListData[j].gst_amount = (this.poPackingListData[j].net_price / 100) * this.poPackingListData[j].gst
              this.poPackingListData[j].sp_discount = data['sp_discount'];
              this.poPackingListData[j].sp_dic_amount = data['sp_dic_amount'];
              this.poPackingListData[j].type = data['type'];
              this.poPackingListData[j].packing_qty = JSON.parse(qty);
              this.poPackingListData[j].free_qty = data['free_qty'];
              if (this.poPackingListData[j].sp_discount === null) {
                console.log("spl", this.poPackingListData[j].sp_discount);
                this.poPackingListData[j].sp_dic_amount = 0;

                this.poPackingListData[j].sp_discount = 0;
              }
              if (this.poPackingListData[j].free_qty === null) {
                this.poPackingListData[j].free_qty = 0;
              }
              this.poPackingListData[j].carton = (this.poPackingListData[j].packing_qty + this.poPackingListData[j].free_qty) / this.poPackingListData[j].piecepercarton;
              this.poPackingListData[j].tot_value = this.poPackingListData[j].qty * this.poPackingListData[j].net_price;
            }
          }
          this.totalcarton = 0
          this.totalfreeqty = 0
          this.totalfreecartoons = 0
          this.totalqty = 0
          this.freeqtyarr = []
          for (let i of this.poPackingListData) {

            let carton = i.carton;
            this.totalcarton = this.totalcarton + carton;
            if (i.carton != 0) {
              let qty = JSON.parse(i.packing_qty) + i.free_qty;
              this.totalqty = this.totalqty + qty;
              let freeqty = i.free_qty
              this.totalfreeqty = this.totalfreeqty + freeqty


              let freecarton = i.free_qty / i.piecepercarton
              this.totalfreecartoons = this.totalfreecartoons + freecarton
            }
            else {
              let qty = JSON.parse(i.packing_qty);
              this.totalqty = this.totalqty + qty;
            }
            if (i.free_qty != 0) {
              this.freeqtyarr.push({ "productname": i.subcategory + ' ' + i.modelno, "free_qty": i.free_qty })
            }

          }
          this.totalcarton = this.totalcarton + this.totalfreecartoons
        })
      }
    }
  }
  appbtn3: boolean = false
  cartonchange(item) {

    item.carton = +(item.carton)
    console.log(item.carton, "carton")
    // if ((JSON.parse(item.carton)) > item.actualcarton) {
    //   this.appbtn3 = true;
    //   this.totalcarton = 0
    //   this.totalfreeqty=0
    //   this.totalfreecartoons=0
    //   this.totalqty=0
    //   this.freeqtyarr=[]
    //   this.poPackingListData.forEach(element => {
    //     // this.packingListModel[element.po_srl_no] = element.balance_qty;
    //     if (item.productid == element.productid && item.seq_no == element.seq_no && item.po_srl_no == element.po_srl_no) {
    //       element.carton = JSON.parse(item.carton)

    //     }

    //   })
    //   for (let i of this.poPackingListData) {

    //     let carton = i.carton;
    //     this.totalcarton = this.totalcarton + carton;
    //     if(i.carton!=0){
    //       let qty = JSON.parse(i.packing_qty) + i.free_qty;
    //     this.totalqty = this.totalqty + qty;
    //     let freeqty = i.free_qty
    //   this.totalfreeqty = this.totalfreeqty + freeqty


    //   let freecarton = i.free_qty / i.piecepercarton
    //   this.totalfreecartoons = this.totalfreecartoons + freecarton
    //   if (i.free_qty != 0) {
    //     this.freeqtyarr.push({ "productname": i.subcategory + ' ' + i.modelno, "free_qty": i.free_qty })
    //   }
    //     }
    //     else{
    //       let qty = JSON.parse(i.packing_qty);
    //       this.totalqty = this.totalqty + qty;
    //     }


    //   }
    //   this.totalcarton=this.totalcarton+this.totalfreecartoons
    // }
    //     else 
    // if ((JSON.parse(item.carton)) <= item.packing_qty) {
    //   this.appbtn2 = false;
    //   // this.appbtn3 = false;
    //   this.totalcarton = 0
    //   this.totalfreeqty=0
    //   this.totalfreecartoons=0
    //   this.totalqty=0
    //   this.freeqtyarr=[]
    //   this.poPackingListData.forEach(element => {
    //     // this.packingListModel[element.po_srl_no] = element.balance_qty;
    //     if (item.productid == element.productid && item.seq_no == element.seq_no && item.po_srl_no == element.po_srl_no) {
    //       element.carton = JSON.parse(item.carton)

    //     }

    //   })
    //   for (let i of this.poPackingListData) {

    //     let carton = i.carton;
    //     this.totalcarton = this.totalcarton + carton;
    //     if(i.carton!=0){
    //       let qty = JSON.parse(i.packing_qty) + i.free_qty;
    //     this.totalqty = this.totalqty + qty;
    //     let freeqty = i.free_qty
    //   this.totalfreeqty = this.totalfreeqty + freeqty


    //   let freecarton = i.free_qty / i.piecepercarton
    //   this.totalfreecartoons = this.totalfreecartoons + freecarton
    //   if (i.free_qty != 0) {
    //     this.freeqtyarr.push({ "productname": i.subcategory + ' ' + i.modelno, "free_qty": i.free_qty })
    //   }
    //     }
    //     else{
    //       let qty = JSON.parse(i.packing_qty);
    //       this.totalqty = this.totalqty + qty;
    //     }


    //   }
    //   this.totalcarton=this.totalcarton+this.totalfreecartoons
    // }
    // else 
    // {
    // this.toasterService.error("Carton should not be greater than packing qty")
    // this.appbtn2 = true;
    this.a_packing = true
    this.approveBtn = false
    // this.appbtn3 = false;
    this.totalcarton = 0
    this.totalfreeqty = 0
    this.totalfreecartoons = 0
    this.totalqty = 0
    this.freeqtyarr = []
    this.poPackingListData.forEach(element => {
      // this.packingListModel[element.po_srl_no] = element.balance_qty;
      if (item.productid == element.productid && item.seq_no == element.seq_no && item.po_srl_no == element.po_srl_no) {
        element.carton = JSON.parse(item.carton)
      }

    })
    for (let i of this.poPackingListData) {

      let carton = i.carton;
      this.totalcarton = this.totalcarton + carton;
      if (i.carton != 0) {
        let qty = JSON.parse(i.packing_qty) + i.free_qty;
        this.totalqty = this.totalqty + qty;
        let freeqty = i.free_qty
        this.totalfreeqty = this.totalfreeqty + freeqty

        let freecarton = i.free_qty / i.piecepercarton
        this.totalfreecartoons = this.totalfreecartoons + freecarton
      }
      else {
        let qty = JSON.parse(i.packing_qty);
        this.totalqty = this.totalqty + qty;
      }

      if (i.free_qty != 0) {
        this.freeqtyarr.push({ "productname": i.subcategory + ' ' + i.modelno, "free_qty": i.free_qty })
      }
    }
    this.totalcarton = this.totalcarton + this.totalfreecartoons
    // }

  }

  addfreecartoons(freecartoons) {
    // let freecarton = i.free_qty / i.piecepercarton
    // this.totalfreecartoons = this.totalfreecartoons + freecarton
    this.totalcarton = 0
    for (let i of this.poPackingListData) {

      let carton = i.carton;
      this.totalcarton = this.totalcarton + carton;
    }
    this.totalcarton = this.totalcarton + JSON.parse(freecartoons)
  }
  line_amount: any
  gst_amount: any
  grand_total: any
  packingListfinal: any = []
  response: any
  body: any
  bodydata: any
  makePackingLiat() {

    console.log("packing data", this.poPackingListData);
    // if(this.totalcarton==0){
    //   this.approveBtn=true
    //   this.a_packing=true
    // }
    // else{

    // this.spinner.show();

    this.approveBtn1 = false
    this.approveBtn = false
    this.a_packing = false;
    this.headerData.remarks1 = this.poData.remarks1;
    this.headerData.remarks2 = this.poData.remarks2;
    this.headerData.line_amount = this.poData.line_amount;
    this.headerData.spo_no = this.poData.spo;
    this.headerData.totalqty = this.totalqty;
    this.headerData.totalcartoons = this.totalcarton;
    this.headerData.print = this.poData.print;
    this.headerData.printdate = this.poData.printdate;
    this.headerData.devicediscamount = this.poData.devicediscamount;
    if (this.poData.code1 != null) {
      this.headerData.code1 = this.poData.code1;
      this.headerData.promo_amount = this.poData.promo_amount;
      this.headerData.gst_amount = this.poData.gst_amount;
      this.headerData.final_amount = this.poData.final_amount;
    }
    else {
      this.headerData.code1 = "";
      this.headerData.promo_amount = "";
      this.headerData.gst_amount = this.poData.gst_amount;
      this.headerData.final_amount = this.poData.final_amount;
    }
    this.packingList = [];
    // this.keys = Object.keys(this.packingListModel);
    console.log("hii1");

    for (let i = 0; i < this.poPackingListData.length; i++) {
      console.log("hii2");
      // for (let j = 0; j < this.keys.length; j++) {
      //   console.log("hii3");
      //   if (this.poPackingListData[i].po_srl_no == this.keys[j]) {
      console.log("hii4");
      // if (this.packingListModel[this.keys[j]] <= this.poPackingListData[i].balance_qty) {
      console.log("hii5");

      let json_dtl = {
        "document_no": i,
        "document_date": formatDate(this.todayDate, 'yyyyMMdd', 'en-US'),
        "po_no": this.poPackingListData[i].po_no,
        "po_date": (this.poPackingListData[i].po_date).replace(/-/g, ""),
        "discount_eff": this.poPackingListData[i].discount_eff,
        "performainv_date": formatDate(this.todayDate, 'yyyyMMdd', 'en-US'),
        "po_srl_no": this.poPackingListData[i].po_srl_no,

        "productid": this.poPackingListData[i].productid,
        "packing_qty": JSON.parse(this.poPackingListData[i].packing_qty),
        "piecepercarton": this.poPackingListData[i].piecepercarton,
        "net_price": this.poPackingListData[i].net_price,
        "npc": JSON.parse(this.poPackingListData[i].carton),
        "performa_inv_qty": 0,
        "sp_discount": this.poPackingListData[i].sp_discount,
        // "sp_discount": 0,
        "sp_dic_amount": this.poPackingListData[i].sp_dic_amount,
        // "sp_dic_amount": 0,
        "offer_type": this.poPackingListData[i].offer_type,
        // "offer_type": 0,
        "mrp": this.poPackingListData[i].mrp,
        "free_qty": this.poPackingListData[i].free_qty,
        // "free_qty": 0,
        "tot_value": JSON.parse(this.poPackingListData[i].packing_qty) * JSON.parse(this.poPackingListData[i].net_price),

        "gst_amount": this.poPackingListData[i].gst_amount,

        "srl_no": i + 1,
        "inv_srl_no": 0,
        "inv_qty": 0
      }

      if (this.poPackingListData[i].ship == 1) {
        json_dtl.free_qty = 0;
        // json_dtl.gst_amount = (json_dtl.tot_value / 100) * 18
        json_dtl.gst_amount = this.poPackingListData[i].gst_amount
        this.packingList.push(json_dtl);
      }
      else {
        json_dtl.free_qty = this.poPackingListData[i].free_qty;
        json_dtl.gst_amount = this.poPackingListData[i].gst_amount
        // json_dtl.free_qty = 0;
        // json_dtl.gst_amount = (json_dtl.tot_value / 100) * 18
        this.packingList.push(json_dtl);
      }
      // } else {
      //   this.packingList = [];
      //   this.approveBtn = true;
      //   break;
      // }
      //   }
      // }
    }
    if (this.packingList.length > 0) {
      for (let p of this.packingList) {
        if (p.packing_qty != 0) {
          this.packingListfinal.push(p)
          console.log("packingListfinal", this.packingListfinal)
        }
      }
    }
    if (this.packingListfinal.length > 1) {

      this.line_amount = this.packingListfinal.filter((item) => item.tot_value)
        .map((item) => +item.tot_value)
        .reduce((sum, current) => sum + current);

      this.gst_amount = this.packingListfinal.filter((item) => item.gst_amount)
        .map((item) => +item.gst_amount)
        .reduce((sum, current) => sum + current);
    }
    else if (this.packingListfinal.length == 1) {

      this.line_amount = this.packingListfinal.filter((item) => item.tot_value)
        .map((item) => +item.tot_value).reduce((sum, current) => 0 + current)

      this.gst_amount = this.packingListfinal.filter((item) => item.gst_amount)
        .map((item) => +item.gst_amount).reduce((sum, current) => 0 + current);
    }
    else if (this.packingListfinal.length == 0) {

      this.approveBtn1 = true
      this.a_packing = true

    }
    if (this.poData.po_origin_company_code) {
      this.body = { "net_amount": this.line_amount, "gst": this.gst_amount, "process": "PACKING", "po_no": this.poData.po_no, "po_date": this.poData.po_date, "po_origin_company_code": this.poData.po_origin_company_code }
    }
    else {
      this.body = { "net_amount": this.line_amount, "gst": this.gst_amount, "process": "PACKING", "po_no": this.poData.po_no, "po_date": this.poData.po_date, "po_origin_company_code": this.poData.company_code }
    }
    //dk//
    for (var i = 0; i < this.packingListfinal.length; i++) {
      if (this.packingListfinal[i].sp_dic_amount == null) {
        this.packingListfinal[i].sp_dic_amount = 0
      }
      if (this.packingListfinal[i].sp_discount == null) {
        this.packingListfinal[i].sp_discount = 0
      }
      if (this.packingListfinal[i].free_qty == null) {
        this.packingListfinal[i].free_qty = 0
      }
    }
    //dk//
    // this.spinner.show()
    this.globalService.postData(this.body, "promocode/checkom/").subscribe((resp1) => {
      this.response = resp1
      // this.spinner.hide()
      this.headerData.line_amount = this.line_amount
      this.headerData.gst_amount = this.response.gst
      this.headerData.final_amount = this.response.finalamount
      this.headerData.devicediscamount = this.response.devicediscamount
      if (!this.approveBtn && !this.approveBtn1) {
        if (this.poData.po_origin_company_code) {
          this.bodydata = {
            "process_in": 'PACKING', "operation_in": "INSERT", "draft_final_in": "FINAL", "document_no_out": "", "message_out": "",
            "json_dtl": this.packingListfinal, "json_hdr": this.headerData
          }
        }
        else {
          this.bodydata = {
            "process_in": 'PACKING', "operation_in": "UPDATE", "draft_final_in": "FINAL", "document_no_out": "", "message_out": "",
            "json_dtl": this.packingListfinal, "json_hdr": this.headerData
          }
        }
        let methodName = "insert_update/"
        this.globalService.postData(this.bodydata, methodName).subscribe((data) => {

          this.packingListprint = data;
          localStorage.setItem('packingListprint', JSON.stringify(data));
          if (data['Message'] == "Packing list Sucessfully inserted ") {
            this.message = data['Message'];
            this.packingListNo = data['Packing_list'];
            $('#makeinvoiceModal').modal('show');

          }
        },
        error => {
          this.spinner.hide();
          this.dialog.open(ErrorModalComponent, {
            data: { errorModal:true }
          });
          // this.ngxSmartService.getModal('errorModal').open();
    
        });
      }
    })

    // }
  };

  paking_list_print_page() {
    this.route.navigateByUrl('packing_list_print');
  };
  newprod() {
    // this.route.navigateByUrl('Admin-PRODUCT MASTER');
    $('#addnewmasterproduct').modal('show');
  }
  addnewproduct() {
    $('#addnewproduct').modal('show');
    this.getprodimg()
  }
  add: boolean = false
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
  add_disable(attr) {

    let arr = ["category", "carton", "subcategory", "modelno", "qty", "piecepercarton", "net_price"];
    for (let i of arr) {
      if (attr[i] == null || attr[i] == undefined) {

        return true;
      }
    }

    return false;
  }
  isNumberKey(event) {
    if (event.keyCode >= 96 && event.keyCode <= 105) {
      return event.keyCode - 96;
    } else if (event.keyCode >= 48 && event.keyCode <= 57) {
      return event.keyCode - 48;
    }
    return true
  }

  getprodimg() {
    return this.globalService.getDatawithMethod1('get_products_category/').subscribe((resp) => {
      this.resources = resp;
    },
    error => {
      this.spinner.hide();
      this.dialog.open(ErrorModalComponent, {
        data: { errorModal:true }
      });
      // this.ngxSmartService.getModal('errorModal').open();

    });
  }

  change_form(val) {
    this.catg_change(val);
    this.selectedCategory_form = val;
  }

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
  change1(val, v) {

    let s1 = v;
    let s2 = encodeURIComponent(val);
    this.selectedSubCategory_form = s2;
    this.subcatg_change(val);
    let s = "All"
    if (val) {
       this.getModal1(s1, s2, s);
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

  httpdata2data: any
  httpdata2: any
  mod_modalno: any = []
  getModal1(p, q, r) {


    this.mod_modalno = [];

    return this.globalService.getDatawithQueryParams4User_id('10', p, q, r, this.mod_modalno, this.poData.po_origin_id).subscribe((resp) => {
      this.httpdata2 = resp;
      this.httpdata2data = this.httpdata2.data

    }

    );

  }

  change2(val, d) {

    this.mod_modalno = [];
    this.selected_modalno = '';
    this.selected_modalno = encodeURIComponent(val);
    let select = "Select";
    this.modal_change(this.selected_modalno);
    this.mod_modalno.push(this.selected_modalno);
    if (val) {
       this.getModal2(this.selectedCategory_form, this.selectedSubCategory_form, select);
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

  httpdata3data: any
  httpdata3: any
  getModal2(p, q, r) {


    this.spinner.show();

    return this.globalService.getDatawithQueryParams4User_id('10', p, q, r, this.mod_modalno, this.poData.po_origin_id).subscribe((resp) => {
      this.httpdata3 = resp;
      this.httpdata3data = this.httpdata3.data
      this.disp(this.httpdata3data);
      if (this.httpdata2data == undefined) {
        this.httpdata2data = this.httpdata3.data
      }

      this.spinner.hide();
    },
    error => {
      this.spinner.hide();
      this.dialog.open(ErrorModalComponent, {
        data: { errorModal:true }
      });
      // this.ngxSmartService.getModal('errorModal').open();

    });
  }
  h: any
  disp(resp: Response): any {

    this.h = resp;
    for (let k of this.h) {
      if (k.offer) {
      } else {

      }
      this.newAttribute1['productid'] = k.productid;
      this.newAttribute1['long_name'] = k.long_name;
      this.newAttribute1['sku_number'] = k.sku_no;
      this.newAttribute1['net_price'] = k.net_price;
      this.newAttribute1['discount_eff'] = k.discount;
      this.newAttribute1['mrp'] = k.mrp;
      this.newAttribute1['stock_qty'] = k.stock_qty;
      this.newAttribute1['piecepercarton'] = k.piecepercarton;
      this.newAttribute1['document_date'] = this.headerData.document_date;
      this.newAttribute1['created_user_id'] = this.loginUserData.user_id;
      this.newAttribute1['document_no'] = this.headerData.document_no;
      this.newAttribute1['gst_amount'] = k.gst_amount;
      this.newAttribute1['gst'] = k.gst;
      this.newAttribute1['po_no'] = this.poData.po_no;
      this.newAttribute1['po_date'] = this.poData.po_date;
      this.newAttribute1['PPC'] = k.piecepercarton;
      //  this.newAttribute1['packing_qty']=this.newAttribute1.qty;
      // this.newAttribute1['changed']=0;

      if (this.httpdata2data == undefined) {
        this.onKey1(this.newAttribute1)
      }
    }
  }
  cnt: number = 0;
  Spl_netprice: any;
  onKey1(newAttribute1) {

    this.add = false
    console.log("offer data", newAttribute1);
    newAttribute1.carton = newAttribute1.qty / newAttribute1.piecepercarton;

    this.cnt++;
    if (this.cnt == 1) {
      this.Spl_netprice = newAttribute1.net_price;
      console.log("hii", this.cnt);

    }
    return this.globalService.getDatawithQueryParams4User_id("121", newAttribute1.productid, newAttribute1.qty, this.Spl_netprice, newAttribute1.discount_eff, this.poData.po_origin_id).subscribe(data => {
      this.newAttribute1.net_price = Math.round((data['net'] + Number.EPSILON) * 100) / 100;
      this.newAttribute1.gst_amount = (this.newAttribute1.net_price / 100) * newAttribute1.gst;
      this.newAttribute1.sp_discount = data['sp_discount'];
      this.newAttribute1.sp_dic_amount = data['sp_dic_amount'];
      this.newAttribute1.type = data['type'];
      this.newAttribute1.packing_qty = this.newAttribute1.qty;
      this.newAttribute1.free_qty = data['free_qty'];
      if (this.newAttribute1.sp_discount === null) {
        console.log("spl", this.newAttribute1.sp_discount);
        this.newAttribute1.sp_discount = 0;
        this.newAttribute1.sp_dic_amount = 0
      }
      if (this.newAttribute1.free_qty === null) {
        this.newAttribute1.free_qty = 0;
      }

      this.newAttribute1.tot_value = this.newAttribute1.qty * this.newAttribute1.net_price;

    })

  }
  poPackingData: any = []
  freeqtyarr: any = []
  result: any
  addFieldValue() {

    this.totalqty = 0
    this.totalcarton = 0
    this.totalfreeqty = 0
    this.totalfreecartoons = 0
    this.freeqtyarr = []
    this.order_items = 0
    this.cnt = 0;
    this.newAttribute1.carton = Math.round((this.newAttribute1.carton + Number.EPSILON) * 100) / 100

    console.log(this.poPackingListData, "this.poPackingListDatabefore")


    for (let p of this.poPackingListData) {
      this.cnt = 0;
      if (this.newAttribute1.productid == p.productid) {
        this.cnt++
        this.toasterService.warning("Product already exists in this packing")
        this.change_form('')
        break;
      }
      //  else{
      //    this.toasterService.warning("Product already exists in this packing")

      //    this.change_form('')
      //    this.newAttribute1.net_price=''

      //  }
    }
    if (this.cnt == 0) {
      this.poPackingListData.push(this.newAttribute1);
    }

    for (let i of this.poPackingListData) {
      let qty = JSON.parse(i.packing_qty) + i.free_qty;
      this.totalqty = this.totalqty + qty;
      let carton = i.carton;
      this.totalcarton = this.totalcarton + carton;
      let freeqty = i.free_qty
      this.totalfreeqty = this.totalfreeqty + freeqty
      let freecarton = i.free_qty / i.piecepercarton
      this.totalfreecartoons = this.totalfreecartoons + freecarton
      if (i.free_qty != 0) {
        this.freeqtyarr.push({ "productname": i.subcategory + ' ' + i.modelno, "free_qty": i.free_qty })
      }
    }
    this.totalcarton = this.totalcarton + this.totalfreecartoons
    console.log(this.poPackingListData, "this.poPackingListData")
    this.newAttribute1 = {};
    this.order_items = this.poPackingListData.length;
  }

  close() {
    this.newAttribute1 = {}
  }

  //==========================new=============================

  Viewdetail(data) {

    this.spinner.show();
    let param1 = this.loginUserData.company_code;
    let param2 = "dtl";
    let param3 = data.print;
    this.freeqtyarr = []
    this.globalService.getDatawithMethodParams3('printlist/', param1, param2, param3).subscribe((resp) => {
      this.spinner.hide();
      this.poPackingListData = resp;
      this.poPackingListData.forEach(element => {
        // this.packingListModel[element.po_srl_no] = element.balance_qty;
        element.carton = (element.qty) / element.piecepercarton;
        element.carton = Math.round((element.carton + Number.EPSILON) * 100) / 100
        element.packing_qty = element.qty
        // element.actualcarton=element.carton

      });
      for (let i of this.poPackingListData) {
        let qty = i.qty + i.free_qty;
        this.totalqty = this.totalqty + qty;
        let carton = (i.qty + i.free_qty) / i.piecepercarton;
        this.totalcarton = this.totalcarton + carton;
        let freeqty = i.free_qty
        this.totalfreeqty = this.totalfreeqty + freeqty
        let freecarton = i.free_qty / i.piecepercarton
        this.totalfreecartoons = this.totalfreecartoons + freecarton

        if (i.free_qty != 0) {
          this.freeqtyarr.push({ "productname": i.subcategory + i.modelno, "free_qty": i.free_qty })
        }
      }

      this.order_items = this.poPackingListData.length;

    },
    error => {
      this.spinner.hide();
      this.dialog.open(ErrorModalComponent, {
        data: { errorModal:true }
      });
      // this.ngxSmartService.getModal('errorModal').open();

    });
  };


}
