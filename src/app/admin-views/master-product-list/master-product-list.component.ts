import { Component, OnInit } from '@angular/core';
declare var $: any;
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../../global-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-master-product-list',
  standalone: false,
  templateUrl: './master-product-list.component.html',
  styleUrls: ['./master-product-list.component.scss']
})
export class MasterProductListComponent implements OnInit {
  loginUserData: any;
  products_list: any;
  totalproducts_list: any
  p: any = 1;
  resources: any;
  selected: any = {};
  sub_c: any = [];
  sub_category: boolean = true;
  searchText: any;
  rec_page: any = 10;
  newarr = [];
  arrival: any
  oldproducts: any = [];
  subtn: boolean = false;
  constructor(private service: GlobalServiceService, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.spinner.show();
    this.service.getDataOnlyWithMethod('api/product').subscribe(data => {
      this.products_list = data;
      this.totalproducts_list = data
      this.spinner.hide();
    });
    this.getprodimg();
  }

  getproductlist() {

    this.service.getDataOnlyWithMethod('api/product').subscribe(data => {
      this.products_list = data;
      this.totalproducts_list = data
      if (this.arrival) {
        this.setFilteredItems()
      }
    });
  }
  body: any
  dis_prod(data) {

    if (data.active == "1") {
      this.body = { "active": 0 }
    }
    else {
      this.body = { "active": 1 }
    }
    return this.service.patchDatawithbodyparam1("api/product/", data.productid, this.body).subscribe(resp => {
      $('#success').modal('show');

      if (this.selected.category && this.selected.subcategory) {

        this.sel_subcategory()
      }
      else if (this.selected.category) {
        this.sel_category(this.selected.category)
      }
      else {

        this.getproductlist()
      }




    })
  }
  productdata: any=[];
  PTotalQty: any;
  STotalQty: any;
  productDtl(product){
      this.spinner.show();
      this.service.getDatawithMethodParams1("sup/Productpurchasedetails/",product.productid).subscribe((data) => {
      this.productdata = data;
      if(this.productdata.length>0){
        this.PTotalQty = this.productdata.map(a => parseInt(a.pqty)).reduce(function (a, b) {
          return a + b;
        });
        this.STotalQty = this.productdata.map(a => parseFloat(a.sqty)).reduce(function (a, b) {
          return a + b;
        });
      }
      this.spinner.hide();
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      })
      
    $("#viewprtdtlModal").modal('show');

  }
  submit() {
    this.oldproducts.map((e) => {
      this.service.patchDatawithbodyparam1("api/product/", e.productid, e.body).subscribe(resp => {
      })
    })
    // this.service.get("send_noti_dealers/").subscribe(resp => {
    // })
    $('#success').modal('show');
    if (this.selected.category && this.selected.subcategory) {

      this.sel_subcategory()
    }
    else if (this.selected.category) {
      this.sel_category(this.selected.category)
    }
    else {

      this.getproductlist()

    }
    this.subtn = false;
  }
  new_prod(data) {


    if (data.new_arrival == "o") {
      this.body = { "new_arrival": 'N' }
      this.oldproducts.push({ "productid": data.productid, "body": this.body });
      this.subtn = true;
      alert("Added to Submit")
      return
    }
    else {
      this.body = { "new_arrival": 'o' }
    }

    return this.service.patchDatawithbodyparam1("api/product/", data.productid, this.body).subscribe(resp => {
      $('#success').modal('show');
      if (this.selected.category && this.selected.subcategory) {

        this.sel_subcategory()
      }
      else if (this.selected.category) {
        this.sel_category(this.selected.category)
      }
      else {

        this.getproductlist()

      }

    })
  }
  editproduct_data: any
  editproduct(data) {

    return this.service.getDataOnlyWithMethod("api/product/" + data.productid).subscribe(resp => {
      // alert("Get edit Data");
      // console.log("result", resp);
      
      this.editproduct_data = resp;

      console.log("editproduct_data", this.editproduct_data);
      console.log("this.editproduct_data", this.editproduct_data.subcategory);
      $('#editproductmodal').modal('show');
      this.select_category(this.editproduct_data.category)
      this.select_subcategory()

    })
  }
  editproduct_submit() {
    let body = this.editproduct_data;
    return this.service.updateData(body, "api/product/" + this.editproduct_data.productid + "/").subscribe(resp => {
      console.log("result", resp);
      $('#success').modal('show');
      if (this.selected.category && this.selected.subcategory) {

        this.sel_subcategory()
      }
      else if (this.selected.category) {
        this.sel_category(this.selected.category)
      }
      else {

        this.getproductlist()
      }

      // $('#edit_modal').modal('show');

    })
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
  sel_category(catg) {

    this.selected.subcategory = undefined;
    if (this.selected.category) {
      let methodName = "api/product"
      return this.service.getcheckdata(methodName, this.selected.category).subscribe(data => {
        this.products_list = data;
        this.totalproducts_list = data
        this.get_sub_catlist();

        this.sub_category = false;
      });
    }

  }

  get_sub_catlist(): any {
    this.sub_c = [];
    for (let data of this.products_list) {
      this.sub_c.push(data.subcategory)
    }
    this.cat_sort();
  }

  cat_sort(): any {
    this.newarr = [];
    for (var i = 0; i < this.sub_c.length; i++) {
      if (this.sub_c[i] != this.sub_c[i - 1])
        this.newarr.push(this.sub_c[i]);
    }
  }

  sel_subcategory() {

    let methodName = "api/product"
    return this.service.getDatawithMethodParams2(methodName, this.selected.category, this.selected.subcategory).subscribe(data => {
      this.products_list = data;
      this.totalproducts_list = data
    });
  }
  editproducts_list: any
  select_category(catg) {
    // this.editproduct_data.subcategory=undefined;
    if (this.editproduct_data.category) {
      let methodName = "api/product"
      return this.service.getcheckdata(methodName, this.editproduct_data.category).subscribe(data => {
        this.editproducts_list = data;
        this.get_sub_catlist1();

        this.sub_category = false;
      });
    }
  }
  sub_catg: any = []
  get_sub_catlist1(): any {
    this.sub_catg = [];

    for (let data of this.editproducts_list) {
      this.sub_catg.push(data.subcategory)
    }
    this.cat_sort1();
  }
  newarray: any = []
  cat_sort1(): any {
    this.newarray = [];
    for (var i = 0; i < this.sub_catg.length; i++) {
      if (this.sub_catg[i] != this.sub_catg[i - 1])
        this.newarray.push(this.sub_catg[i]);
    }
  }
  modal_list: any = []
  select_subcategory() {

    console.log("this.modelno", this.editproduct_data.modelno);
    let methodName = "api/product"
    return this.service.getDatawithMethodParams2(methodName, this.editproduct_data.category, this.editproduct_data.subcategory).subscribe(data => {
      this.modal_list = data;
      console.log("this.modal_list", this.modal_list);
    });
  }
  httpdata3: any
  httpdata3data: any
  selectmodal() {
    return this.service.getDatawithQueryParams4User_id('10', this.editproduct_data.category, this.editproduct_data.subcategory, 'Select', this.editproduct_data.modelno, this.loginUserData.user_id).subscribe((resp) => {
      this.httpdata3 = resp;
      this.httpdata3data = this.httpdata3.data
      console.log("this.httpdata3data", this.httpdata3data);
      for (let d of this.httpdata3data) {
        this.editproduct_data.mrp = d.mrp
        this.editproduct_data.piecepercarton = d.piecepercarton
      }


    },
      error => {
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      });
  }
  setFilteredItems() {
    if (this.arrival == undefined) {
      this.products_list = this.totalproducts_list
    }
    else {
      this.products_list = this.totalproducts_list.filter((item) => {
        return (
          item.new_arrival.toLowerCase().indexOf(this.arrival.toLowerCase()) > -1
        );
      });
    }
  }
  printreport() {
    let popupWinindow
    let innerContents = document.getElementById('printsuppndng').innerHTML;
    popupWinindow = window.open('', '_blank', 'top=0,left=0,height=100%,width=100%');
    popupWinindow.document.open();
    popupWinindow.document.write(`<html><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><link rel="stylesheet"  href="styles.scss" />
      <style>
      #printsuppndng{
        width: 100% !important;
        margin:0 !important;
      }
      
      body{
        width: 100% !important;
      }
      table{
        width: 100% !important;
      }
      table thead th,table tbody td{
        font-size: 9px !important;
      }
      .printwrap{
        // margin-left:0px !important;
        // margin-right:1% !important;
        position:relative;
        left:0% !important;
        width:100% !important;
      }
      @page { size: landscape; }
      p{margin:0px;font-size: 12px;}
      table thead th {background: gray;color:white;}
      @media print {
        .col-md-3 {
          width:30%;
          float: left;
        }
        #printPageButton,.page {
          display: none !important;
        }
        table, th, td, tr{
          border: 1px solid #DDDDDD !important;
          border-collapse: collapse !important;
        }
        .close1 {
          display: none !important;
        }
        .busname {
          display: contents !important;
        }
        .cwidth{
          width: 7% !important;
        }
        .bg_clr{
          background-color: rgb(204, 196, 196) !important;
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
}
