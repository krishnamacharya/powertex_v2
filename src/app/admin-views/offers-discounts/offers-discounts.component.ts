import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgForm } from "@angular/forms";
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from '../../toastr-service.service';
import { GlobalServiceService } from '../../global-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
// import { FORMERR } from 'dns';
declare var $: any;
@Component({
  selector: 'app-offers-discounts',
  standalone: false,
  templateUrl: './offers-discounts.component.html',
  styleUrls: ['./offers-discounts.component.scss']
})
export class OffersDiscountsComponent implements OnInit {
  panelOpenState:any;
  dropdownSettings = {};
  loginUserData: any;
  products_list: any;
  resources: any;
  selected: any = {};
  selectedlist: any = [];
  Offer_gen: any = {};
  Offer_new_gen: any = {};
  branchOffer_gen: any = {};
  dealerOffer_gen: any = {};
  Offer: any = {};
  branchoffer: any = {};
  dealeroffer: any = {};
  sub_c: any = [];
  select_model: any = [];
  sub_category: boolean = true;
  sub_category_model: boolean = true;
  searchText: any;
  rec_page: any = 10;
  newarr = [];
  p: any = 1;
  page: any = 1;
  modal_list: any;
  gen_off: boolean = false;
  Offer_arr: Array<any> = [];
  Offer_new_arr: Array<any> = [];
  branchOffer_arr: Array<any> = [];
  dealerOffer_arr: Array<any> = [];
  offer_type: any;
  availOffers: boolean = true;
  offers_data: any = [];
  btn_txt: any = "Select Model";
  sel_prod: any;
  POhidden: boolean = true;
  DOhidden: boolean = false;
  BOhidden: boolean = false;
  DEhidden: boolean = false;
  MWhidden : boolean = false;
  dropdownSettings1 = {};
  dropdownSettings2 = {};
  dropdownSettings3 = {}
  dropdownSettings4 = {}
  dropdownSettings5 = {}
  dropdownSettings6 = {}
  categorylist: any = [];
  branchoffersdata: any = [];
  dealeroffersdata: any = [];
  offer_extend: any;
  edit_offer_data: any = [];
  new_offer_data: any = []
  edit_offers: boolean = true;
  add_new_offer: boolean;
  
  edit_product_id: any;
  edit_sku_no: any;
  masterData:any={}
  Page:any=1
status:any
  constructor(private toasterService: ToasterService, private service: GlobalServiceService,private spinner:NgxSpinnerService, private dialog: MatDialog, private Datepipe: DatePipe) { }

  ngOnInit() {
    
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.service.getDataOnlyWithMethod('api/product').subscribe(data => {
      this.products_list = data;
    });

    this.getprodimg();
    this.avail_offers();
    this.getBranchDropdown()
  
    this.dropdownSettings = {
      showCheckbox: true,
      singleSelection: false,
      text: "Select Category",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };
    this.dropdownSettings1 = {
      showCheckbox: true,
      singleSelection: false,
      text: "Select Subcategory",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };

    this.dropdownSettings2 = {
      showCheckbox: true,
      singleSelection: false,
      text: "Select Model",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };

    this.dropdownSettings3 = {
      showCheckbox: true,
      singleSelection: false,
      text: "Select Branch",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };

    this.dropdownSettings4 = {
      showCheckbox: true,
      singleSelection: false,
      text: "Select State",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };
    this.dropdownSettings5 = {
      showCheckbox: true,
      singleSelection: false,
      text: "Select City",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };
    this.dropdownSettings6 = {
      showCheckbox: true,
      singleSelection: false,
      text: "Select Dealer",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }

  OnItemDeSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  onDeSelectAll(items: any) {
    console.log(items);
  }
  totaloffers_data:any=[]
  avail_offers(): any {
     this.spinner.show();
    return this.service.getDataOnlyWithMethod('offers/offer').subscribe((resp) => {
      this.offers_data = resp;
      this.totaloffers_data=resp
      this.spinner.hide();
      console.log("offers", this.offers_data);
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });

      });
  }
  
  keypress(event: any) {
    const pattern = /^[A-Za-z0-9' '_@./#&+-=,*!$%(){}]+$/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  keynumber(event: any) {
    const pattern = /[0-9.]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  getprodimg() {
    return this.service.getDatawithMethod1('get_products_category/').subscribe((resp) => {
      this.resources = resp;
      for (var i = 0; i < this.resources.length; i++) {
        this.categorylist.push({ "id": i, "itemName": this.resources[i].Category })
      }
      console.log("response", this.resources);

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

    this.sub_category_model = true;
    this.selected.subcategory = undefined;
    this.modal_list = [];
    if (this.modal_list.length == 0) {
      this.btn_txt = "Select Model";
    }
    this.select_model = [];
    if (this.selected.category) {
      let methodName = "api/product"
      return this.service.getcheckdata(methodName, this.selected.category).subscribe(data => {
        this.products_list = data;
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

    console.log("model", this.select_model);
    let methodName = "api/product"
    return this.service.getDatawithMethodParams2(methodName, this.selected.category, this.selected.subcategory).subscribe(data => {
      this.modal_list = data;
      this.sub_category_model = false;
      console.log("model", data);
    });
  }

  sel_model(model) {
    console.log("selected", model);
  }

  get_detail(data, ev) {

    if (ev.target.checked) {
      this.service.getDatawithMethodParams1('check_offer/', data.productid).subscribe(resp => {
        console.log("check", resp);
        if (resp['status'] == 0) {
          console.log("detail-2", this.select_model);
          this.select_model.push(data);
          this.btn_txt = this.select_model.length + "" + " Models Selected"
          console.log("detail", this.select_model);
        }
        else {
          this.sel_prod = data.modelno;
          console.log("on change", ev.target.checked);
          ev.target.checked = false;
          $('#exists').modal('show');
        }
      })
    }
    else {
      return this.del(data);
    }
  }

  del(obj: string) {
    const index: number = this.select_model.indexOf(obj);
    if (index !== -1) {
      this.select_model.splice(index, 1);
      this.btn_txt = this.select_model.length + "" + " Models Selected";
    }
  }

  sel_offer() {
    this.gen_off = true;
  }

  sub_offer(data) {
    // console.log("p_detail",data);
    this.Offer_gen.productid = data.productid;
    this.Offer_gen.sku_no = data.sku_no;
    this.Offer_gen.fromdate = this.Datepipe.transform(this.Offer.fromdate, "yyyy-MM-dd");
    this.Offer_gen.todate = this.Datepipe.transform(this.Offer.todate, "yyyy-MM-dd");
    //console.log("offer_data",this.Offer_gen);
    this.Offer_arr.push(this.Offer_gen);
    this.Offer_gen = {};
  }
reset(){
  this.selected.category=undefined
  this.selected.subcategory=undefined
  this.btn_txt = "Select Model";
  
  this.sub_category=true
  this.sub_category_model=true
  // this.selected.category=undefined
  this.select_model=[]
  this.Offer_gen={}
  this.Offer={}
  this.Offer_arr=[]
 
}
  sub_final(j, data) {
    console.log("j-index", j);
    if (this.Offer.fromdate && this.Offer_gen.from_range && this.Offer_gen.to_range && this.Offer.todate && this.Offer_gen.offer_value && this.Offer_gen.description && this.Offer_gen.offer_type) {
      this.Offer_gen.productid = data.productid;
      this.Offer_gen.sku_no = data.sku_no;
      this.Offer_gen.fromdate = this.Datepipe.transform(this.Offer.fromdate, "yyyy-MM-dd");
      this.Offer_gen.todate = this.Datepipe.transform(this.Offer.todate, "yyyy-MM-dd");
      this.Offer_arr.push(this.Offer_gen);
  
   
    console.log("final", this.Offer_arr);
    return this.service.postData(this.Offer_arr, "offers/offer/").subscribe(resp => {
      if (resp['status'] == 1) {
        $('#success').modal('show');
      }
      console.log("resp", resp);
      this.select_model.splice(j, 1);
      this.btn_txt = this.select_model.length + "" + " Models Selected";
      this.Offer_arr = [];
      this.Offer = {};
      this.Offer_gen = {};
      this.gen_off = false;
      this.selected=[]
      this.sub_category = true
      this.sub_category_model=true
    })
  }
    else{
      this.toasterService.error("Please fill all fields")
    }
  }

  new_offer() {
    this.availOffers = !this.availOffers;
    this.avail_offers();
  }

  deleteFieldValue2(index) {
    console.log("indexx", index);
    this.Offer_arr.splice(index, 1);
  }

  // deleteFieldValue3(ind) {
  //   console.log("indexxj", ind);
  // }

  check_off_dis(data) {
    //console.log("checkk",this.Offer_gen.from_range);
    let arr = ["from_range", "to_range", "offer_type", "offer_value","description"];
    for (let i of arr) {
      if (this.Offer_gen[i] == null || this.Offer_gen[i] == undefined) {
        return true;
      }
    }
    return false;
  }

  po() {
    this.POhidden = true;
    this.DOhidden = false;
    this.DEhidden = false;
    this.BOhidden = false;
    this.MWhidden = false;
    this.avail_offers();
  }

  do() {
    this.POhidden = false;
    this.DOhidden = true;
    this.DEhidden = false;
    this.BOhidden = false;
    this.MWhidden = false;
  }

  bo() {
    this.POhidden = false;
    this.DOhidden = false;
    this.DEhidden = false;
    this.BOhidden = true;
    this.MWhidden = false;
    this.getbranchoffers()
  }

  getbranchoffers() {
    return this.service.getDatawithMethodParam1('offers/offer/', 'branch').subscribe((resp) => {
      this.branchoffersdata = resp
    })
  }


  de() {
    this.POhidden = false;
    this.DOhidden = false;
    this.DEhidden = true;
    this.BOhidden = false;
    this.MWhidden = false;
    this.getdealeroffers()
  }
  mw() {
    this.POhidden = false;
    this.DOhidden = false;
    this.DEhidden = false;
    this.BOhidden = false;
    this.MWhidden = true;
    this.getofferdata()
    this.getapplicables()
    
  }
  

  getdealeroffers() {
    return this.service.getDatawithMethodParam1('offers/offer/', 'dealer').subscribe((resp) => {
      this.dealeroffersdata = resp
    })
  }



  allcategoryproducts_list: any = []

  categories_list: any
  categ_list: any = []

  selectcategory: any = []
  cat_codes: any = []
  categorynames: any = []
  sel_categorydata(category) {
   

    this.selectcategory = []
    this.categorynames = []
    if (this.cat_codes.length > 1) {

      for (var i = 0; i < this.cat_codes.length; i++) {

        if (category.itemName == this.cat_codes[i].itemName) {
          this.cat_codes.splice(i, 1)
          break;


        }
      }
    }
    this.cat_codes.push(category)

    this.selectcategory.push(category)

    for (let b of this.selectcategory) {


      this.categorynames = b.itemName

    }



    this.getsubcategorybyselectingcategory(this.categorynames)

  }
  /* To get subcategory list dropdown*/
  getsubcategorybyselectingcategory(categorynames) {
  
    let methodName = "api/product"
    return this.service.getcheckdata(methodName, categorynames).subscribe(data => {

      this.allcategoryproducts_list = data;
      this.get_sub_catlist1()

      // console.log(this.allcategoryproducts_list, "this.allcategoryproducts_list")
    });
  }

  subcategorylist: any = []
  srno: any
  j: number = 0
  get_sub_catlist1(): any {



    for (var i = 0; i < this.allcategoryproducts_list.length; i++) {

      this.subcategorylist.push({ "id": this.j + i, "itemName": this.allcategoryproducts_list[i].subcategory, "category": this.allcategoryproducts_list[i].category })
    }
    this.j = this.subcategorylist.length
    // console.log(this.subcategorylist, " this.subcategorylist")
    this.cat_sort1();


  }
  subcategorylistfinal: any = []
  myNewList1: any = []
  sdata: any
  cat_sort1(): any {
   
    this.myNewList1 = []
    this.sdata = []
    this.subcategorylistfinal = []
    for (var l = 0; l < this.subcategorylist.length; l++) {
      this.myNewList1.push(this.subcategorylist[l].itemName)
      this.sdata = Array.from(new Set(this.myNewList1));

    }
    for (var p = 0; p < this.sdata.length; p++) {

      this.subcategorylistfinal.push({ "id": p, "itemName": this.sdata[p] });

    }

    console.log(this.subcategorylistfinal, " this.subcategorylistfinal")
  }
  deletecategories_list: any
  oncategoryDeSelect(category) {
    
    this.subcategorylist = []
    this.myNewList1 = []
    this.subcategorylistfinal = []
    this.sdata = []
    this.j = 0
    this.categorynames = []
    for (var i = 0; i < this.cat_codes.length; i++) {

      if (category.itemName == this.cat_codes[i].itemName) {
        this.cat_codes.splice(i, 1)

      }
    }

    for (let b of this.cat_codes) {

      this.categorynames = b.itemName

      this.getsubcategorybyselectingcategory(this.categorynames)

    }


  }

  onSelectAllcategory(categories) {
   

    this.subcategorylist = []
    // this.j = 0
    this.categorynames = []
    this.cat_codes = categories
    for (let b of this.cat_codes) {


      this.categorynames = b.itemName
      this.getsubcategorybyselectingcategory(this.categorynames)

    }




  }

  onDeSelectAllcategory(categories) {
    this.subcategorylist = []
    this.myNewList1 = []
    this.subcategorylistfinal = []
    this.sdata = []

    this.cat_codes = []

    this.categorynames = []
  }
  /* To get model no's list dropdown*/

  subcategory: any
  models_list: any = []
  subcategories: any = []
  onsubcategorySelect(item: any) {
   
    if (this.subcategories.length > 1) {

      for (var i = 0; i < this.subcategories.length; i++) {

        if (item.itemName == this.subcategories[i].itemName) {
          this.subcategories.splice(i, 1)
          break;


        }
      }
    }
    this.subcategory = item.itemName

    this.subcategories.push(item)
    this.getmodelbyselectingsubcategory(this.categorynames, this.subcategory)
  }
  modellist: any = []
  modeldata: any
  k: number = 0
  getmodelbyselectingsubcategory(categorynames, subcategory) {
    
    let methodName = "api/product"
    return this.service.getDatawithMethodParams2(methodName, categorynames, subcategory).subscribe(data => {
      this.models_list = data;
      for (var i = 0; i < this.models_list.length; i++) {
        this.modellist.push({ "id": this.k + i, 'itemName': this.models_list[i].modelno, "subcategory": this.models_list[i].subcategory, "category": this.models_list[i].category, "productid": this.models_list[i].productid })

      }
      this.k = this.modellist.length

      console.log(this.modellist, "this.modellist")
    })
  }


  onsubcategoryDeSelect(item: any) {
    
    this.modellist = []
    this.subcategory = ""
    this.k = 0
    for (var i = 0; i < this.subcategories.length; i++) {

      if (item.itemName == this.subcategories[i].itemName) {
        this.subcategories.splice(i, 1)

      }
    }
    for (let b of this.subcategories) {
      this.subcategory = b.itemName
      this.getmodelbyselectingsubcategory(this.categorynames, this.subcategory)
    }

  }


  subcategorydata: any = []
  onSelectAllsubcategory(items: any) {
  
    this.modellist = []
    this.subcategory = ""
    this.subcategories = items
    for (let b of items) {
      this.subcategory = b.itemName
      this.getmodelbyselectingsubcategory(this.categorynames, this.subcategory)
    }
  }

  deleteallmodels_list: any
  onDeSelectAllsubcategory(items: any) {
   
    this.modellist = []
    this.subcategories = []
    this.subcategory = ""
  }

  model: any = []
  productid: any = []
  modelno: any
  onmodelSelect(item: any) {
   
    // this.modelno=item.itemName
    this.brancheslist = []
    this.dealerslist1 = []
    if (this.model.length > 1) {
      for (var i = 0; i < this.model.length; i++) {
        if (item.itemName == this.model[i].itemName) {

          this.model.splice(i, 1)

        }
      }
    }
    this.model.push(item)


  }
  onmodelDeSelect(item: any) {
 
    this.brancheslist = []
    this.dealerslist1 = []
    for (var i = 0; i < this.model.length; i++) {
      if (item.itemName == this.model[i].itemName) {
        this.model.splice(i, 1)
      }
    }

  }
  onSelectAllmodel(items: any) {
    this.brancheslist = []
    this.dealerslist1 = []
    
  
      this.model=items
    }
  
  onDeSelectAllmodel(items: any) {
 
    this.model = []
    this.dealerslist1 = []
    this.brancheslist = []

  }

  /* To get branches list dropdown*/
  param1: any;
  branch: any
  branchdata: any = []

  getBranchDropdown() {
    this.param1 = this.loginUserData.company_code;
    return this.service.getDatawithQueryParams2('5.12', this.param1, 'BRANCH').subscribe((resp) => {
      this.branch = resp
      for (let data of this.branch) {
        this.branchdata.push({ "id": data.company_code, "itemName": data.companyname });
      }
    },
      error => {
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      });
  }

  offerdata: any
  checkoffer(branch, productid) {

    this.service.getDatawithMethodParams3('check_offer/', productid, branch, "").subscribe(resp => {
      console.log("check", resp);
      this.offerdata = resp
    })
  }
  /* To get dealer list dropdown */
  branchcode: any
  dealer: any

  methodname: any
  totaldata: any

  statenamesdata: any = []

  citynamesdata: any = []

  dealernamesdata: any = []
  d: number = 0
  s: number = 0
  c: number = 0
  selectbranch: any = []
  bcodes: any = []

  onbranchSelect(branch) {
 

    this.brancheslist = []
    this.selectbranch = []
    if (this.bcodes.length > 1) {

      for (var i = 0; i < this.bcodes.length; i++) {

        if (branch.id == this.bcodes[i].id) {
          this.bcodes.splice(i, 1)
          break;


        }
      }
    }
    this.bcodes.push(branch)
    this.selectbranch.push(branch)
    for (let b of this.selectbranch) {
      if (this.branchcodes) {
        this.branchcodes = this.branchcodes + ',' + b.id
      }
      else {
        this.branchcodes = b.id
      }
    }
    this.getstatebyselectingbranch(this.branchcodes)




  }
  productinfo: any = []
  addbranchdiscount(branch, model) {
 
 this.spinner.show()
    this.productinfo = []
    this.dealerslist1=[]
    this.brancheslist=[]
    for (var i = 0; i < branch.length; i++) {
      if (model != undefined) {
        for (var j = 0; j < model.length; j++) {
         
          this.productinfo.push({
            "branchcode": branch[i].id, "branchname": branch[i].itemName, "category": model[j].category,
            "subcategory": model[j].subcategory, "model": model[j].itemName, "productid": model[j].productid
          })
          this.service.getDatawithMethodParams3('check_offer/', model[j].productid, branch[i].id, "").subscribe(resp => {
            console.log("check", resp);
            this.offerdata = resp

            if (this.offerdata.status == 0) {
             
              for (var i = 0; i < this.productinfo.length; i++) {

                if (this.offerdata.param_other2 == this.productinfo[i].branchcode && this.offerdata.param_other1 == this.productinfo[i].productid) {
                  this.spinner.hide()
                  this.brancheslist.push(this.productinfo[i])
                 
                }
              }
            }

            else {
            

              this.sel_prod = this.offerdata.param_other1
              for (var i = 0; i < this.productinfo.length; i++) {

                if (this.offerdata.param_other2 == this.productinfo[i].branchcode && this.offerdata.param_other1 == this.productinfo[i].productid) {
                  this.productinfo.splice(i, 1)


                }

              }
              for (var j = 0; j < this.selectedlist.model.length; j++) {
                if (this.offerdata.param_other1 == this.selectedlist.model[j].productid) {
                  this.selectedlist.model.splice(j, 1)
                }
              }

              $('#exists').modal('show');
            }
          })
        }
      }
      else {
        this.brancheslist.push({ "branchcode": branch[i].id, "branchname": branch[i].itemName })
      }
    }



  }

  getstatebyselectingbranch(branchcodes) {
    this.statenamesdata = []
    this.citynamesdata = []
    this.dealernamesdata = []
    this.methodname = 'offer/dropdown'
    if (branchcodes != "") {
      return this.service.getDatawithMethodParams1(this.methodname, branchcodes).subscribe((resp) => {
        this.totaldata = resp;
        /* dealers dropdown */
        for (var k = 0; k < this.totaldata.data.length; k++) {
          this.dealernamesdata.push({ "id": this.totaldata.data[k].user_id + '@' + this.totaldata.data[k].company_code, "itemName": this.totaldata.data[k].business_name, "state": this.totaldata.data[k].state, "city": this.totaldata.data[k].city, "branchname": this.totaldata.data[k].company_name })
        }


        /* states dropdown */

        for (var i = 0; i < this.totaldata.state.length; i++) {
          this.statenamesdata.push({ "id": i + this.s, "itemName": this.totaldata.state[i].state });
        }
        this.s = this.totaldata.state.length


        /* cities dropdown */
        for (var j = 0; j < this.totaldata.city.length; j++) {
          this.citynamesdata.push({ "id": j + this.c, "itemName": this.totaldata.city[j].city });
        }
        this.c = this.totaldata.city.length

      })
    }
    else {
      this.statenamesdata = []
      this.citynamesdata = []
      this.dealernamesdata = []
    }
  }


  data: any


  onbranchDeSelect(branch) {
    this.brancheslist = []
    this.branchcodes = ""



    for (var i = 0; i < this.bcodes.length; i++) {

      if (branch.id == this.bcodes[i].id) {
        this.bcodes.splice(i, 1)

      }
    }



    for (let b of this.bcodes) {
      if (this.branchcodes) {
        this.branchcodes = this.branchcodes + ',' + b.id
      }
      else {
        this.branchcodes = b.id
      }


    }
    this.getstatebyselectingbranch(this.branchcodes)

  }




  brancheslist: any = []

  branchcodes: string

  bcodes1: any = []
  onSelectAllbranch(branches) {
   
    this.brancheslist = []
    this.branchcodes = ""
    this.bcodes = branches
    for (let b of branches) {

      if (this.branchcodes) {
        this.branchcodes = this.branchcodes + ',' + b.id
      }
      else {
        this.branchcodes = b.id
      }
    }
    this.getstatebyselectingbranch(this.branchcodes)

  }
  check_branchoff_dis(data) {
    //console.log("checkk",this.Offer_gen.from_range);
    let arr = ["from_range", "to_range", "offer_type", "offer_value"];
    for (let i of arr) {
      if (this.branchOffer_gen[i] == null || this.branchOffer_gen[i] == undefined) {
        return true;
      }
    }
    return false;
  }
  offerslist: any = []
  branch_offer(data) {

    if (data.model) {
      this.branchOffer_gen.category = data.category;
      this.branchOffer_gen.subcategory = data.subcategory;
      this.branchOffer_gen.model = data.model;
      this.branchOffer_gen.branchcode = data.branchcode;
      this.branchOffer_gen.branchname = data.branchname;
      this.branchOffer_gen.fromdate = this.Datepipe.transform(this.branchoffer.fromdate, "yyyy-MM-dd");
      this.branchOffer_gen.todate = this.Datepipe.transform(this.branchoffer.todate, "yyyy-MM-dd");

      this.branchOffer_arr.push(this.branchOffer_gen);

      this.branchOffer_gen = {};
    }
    else {
      this.branchOffer_gen.branchcode = data.branchcode;
      this.branchOffer_gen.branchname = data.branchname;
      this.branchOffer_gen.fromdate = this.Datepipe.transform(this.branchoffer.fromdate, "yyyy-MM-dd");
      this.branchOffer_gen.todate = this.Datepipe.transform(this.branchoffer.todate, "yyyy-MM-dd");

      this.branchOffer_arr.push(this.branchOffer_gen);

      this.branchOffer_gen = {};
    }
  }
  branchofferlist: any = []

  sub_finalbranch(j, data) {

    this.offerslist = []
    console.log("j-index", j);
    if (this.branchOffer_gen.from_range && this.branchOffer_gen.to_range && this.branchOffer_gen.offer_type && this.branchOffer_gen.offer_value && this.branchoffer.fromdate && this.branchoffer.todate) {
      if (data.model) {
        this.branchOffer_gen.category = data.category;
        this.branchOffer_gen.subcategory = data.subcategory;
        this.branchOffer_gen.model = data.model;
        this.branchOffer_gen.branchcode = data.branchcode;
        this.branchOffer_gen.branchname = data.branchname;
        this.branchOffer_gen.fromdate = this.Datepipe.transform(this.branchoffer.fromdate, "yyyy-MM-dd");
        this.branchOffer_gen.todate = this.Datepipe.transform(this.branchoffer.todate, "yyyy-MM-dd");

        this.branchOffer_arr.push(this.branchOffer_gen);

        this.branchOffer_gen = {};
      }
      else {
        this.branchOffer_gen.branchcode = data.branchcode;
        this.branchOffer_gen.branchname = data.branchname;
        this.branchOffer_gen.fromdate = this.Datepipe.transform(this.branchoffer.fromdate, "yyyy-MM-dd");
        this.branchOffer_gen.todate = this.Datepipe.transform(this.branchoffer.todate, "yyyy-MM-dd");

        this.branchOffer_arr.push(this.branchOffer_gen);

        this.branchOffer_gen = {};
      }

  

    console.log("final", this.branchOffer_arr);
    for (var i = 0; i < this.branchOffer_arr.length; i++) {
      if (this.branchOffer_arr[i].branchname == this.brancheslist[i].branchname) {
        this.brancheslist.splice(i, 1)
        this.branchofferlist.push(this.branchOffer_arr)
        for (var i = 0; i <= this.branchofferlist.length; i++) {
          if (this.branchofferlist[i]) {
            for (var t = 0; t < this.branchofferlist[i].length; t++) {
              this.offerslist.push(this.branchofferlist[i][t])
            }
          }
        }

        this.branchOffer_arr = []
        this.branchoffer = {}

        console.log("final", this.brancheslist);
        console.log("final", this.branchOffer_arr);
        console.log("finallist", this.branchofferlist[0]);
      }
    }
  }
  else{
    this.toasterService.error("Please fill all fields")
  }

  }
  submitbranchoffers(data) {

    return this.service.postData(this.offerslist, "offers/offer/").subscribe(resp => {
      if (resp['status'] == 1) {
        $('#success').modal('show');
      }
      console.log("resp", resp);
      // this.select_model.splice(j, 1);
      // this.btn_txt = this.select_model.length + "" + " Models Selected";
      this.branchOffer_arr = [];
      this.branchoffer = {};
      this.branchOffer_gen = {};
      this.gen_off = false;
      this.offerslist = []
      this.branchofferlist = []
      this.branchcodes = ""
      this.bcodes = []
      this.brancheslist = []
      this.selectbranch = []
      this.selectedlist.branch = []
      this.selectedlist.category = []
      this.selectedlist.subcategory = []
      this.selectedlist.model = []
      this.statenamesdata = []
      this.citynamesdata = []
      this.dealernamesdata = []
      this.subcategorylist = []
      this.modellist = []

    })
  }
  deletebranchFieldValue2(index) {
    console.log("indexx", index);
    this.branchOffer_arr.splice(index, 1);
  }
  deletedealerFieldValue2(index) {
    console.log("indexx", index);
    this.dealerOffer_arr.splice(index, 1);
  }
  onDeSelectAllbranch(branches) {
    this.dealernamesdata = []
    this.citynamesdata = []
    this.statenamesdata = []
    this.brancheslist = []
    this.branchcodes = ""
    this.bcodes = []

  }





  statelist: any = []
  selectstate: any = []
  onstateSelect(state) {


    this.selectstate = []
    if (this.statelist.length > 1) {

      for (var i = 0; i < this.statelist.length; i++) {

        if (state.itemName == this.statelist[i].itemName) {
          this.statelist.splice(i, 1)
          break;


        }
      }
    }
    this.statelist.push(state)


    this.selectstate.push(state)
    for (let b of this.selectstate) {

      if (this.statecodes) {
        this.statecodes = this.statecodes + ',' + b.itemName
      }
      else {
        this.statecodes = b.itemName
      }
    }

    this.getcitybyselectingstate(this.statecodes)



  }
  totalcddata: any
  getcitybyselectingstate(statecodes) {
    this.citynamesdata = []
    this.dealernamesdata = []
    this.methodname = 'offer/dropdown'
    if (statecodes != "") {
      return this.service.getDatawithMethodParams2(this.methodname, this.branchcodes, statecodes).subscribe((resp) => {
        this.totalcddata = resp;

        /* dealers dropdown */
        for (var k = 0; k < this.totalcddata.data.length; k++) {

          this.dealernamesdata.push({ "id": this.totalcddata.data[k].user_id + '@' + this.totalcddata.data[k].company_code, "itemName": this.totalcddata.data[k].business_name, "state": this.totalcddata.data[k].state, "city": this.totalcddata.data[k].city, "branchname": this.totalcddata.data[k].company_name })
        }

        /* cities dropdown */
        for (var j = 0; j < this.totalcddata.city.length; j++) {
          this.citynamesdata.push({ "id": j + this.c, "itemName": this.totalcddata.city[j].city });
        }
        this.c = this.totalcddata.city.length

      })
    }
    else {
      this.citynamesdata = []
      this.dealernamesdata = []
    }
  }
  totaldeletecddata: any = []

  OnstateDeSelect(state) {


    this.selectstate = []
    this.statecodes = ""
    for (var i = 0; i < this.statelist.length; i++) {
      if (state.itemName == this.statelist[i].itemName) {
        this.statelist.splice(i, 1)
      }
    }

    for (let b of this.statelist) {

      if (this.statecodes) {
        this.statecodes = this.statecodes + ',' + b.itemName
      }
      else {
        this.statecodes = b.itemName
      }
    }

    this.getcitybyselectingstate(this.statecodes)
  }
  statecodes: string
  totalallcddata: any = []
  onSelectAllstate(states) {

    this.statecodes = ""
    this.statelist = states
    for (let b of states) {

      if (this.statecodes) {
        this.statecodes = this.statecodes + ',' + b.itemName
      }
      else {
        this.statecodes = b.itemName
      }
    }

    this.getcitybyselectingstate(this.statecodes)
  }
  onDeSelectAllstate(states) {
    this.dealernamesdata = []
    this.citynamesdata = []
    this.statecodes = ""
    this.statelist = []


  }
  citycodes: string
  totalddata: any
  citylist: any = []
  dealerlist1data: any = []
  selectcity: any = []
  oncitySelect(city) {


    this.selectcity = []
    if (this.citylist.length > 1) {

      for (var i = 0; i < this.citylist.length; i++) {

        if (city.itemName == this.citylist[i].itemName) {
          this.citylist.splice(i, 1)
          break;


        }
      }
    }
    this.citylist.push(city)

    // this.citycodes = city.itemName
    this.selectcity.push(city)
    for (let b of this.selectcity) {

      if (this.citycodes) {
        this.citycodes = this.citycodes + ',' + b.itemName
      }
      else {
        this.citycodes = b.itemName
      }
    }

    this.getdealerbyselectingcity(this.citycodes)

  }

  getdealerbyselectingcity(citycodes) {

    this.dealernamesdata = []
    this.methodname = 'offer/dropdown'
    if (citycodes != "") {
      return this.service.getDatawithMethodParams3(this.methodname, this.branchcodes, this.statecodes, citycodes).subscribe((resp) => {
        this.totalddata = resp;

        /* dealers dropdown */
        for (var k = 0; k < this.totalddata.data.length; k++) {

          this.dealernamesdata.push({ "id": this.totalddata.data[k].user_id + '@' + this.totalddata.data[k].company_code, "itemName": this.totalddata.data[k].business_name, "state": this.totalddata.data[k].state, "city": this.totalddata.data[k].city, "branchname": this.totalddata.data[k].company_name })
        }
        console.log(this.citynamesdata, "citynames")
      })
    }
    else {
      this.dealernamesdata = []
    }
  }
  totaldeleteddata: any = []

  OncityDeSelect(city) {
    this.selectcity = []
    this.citycodes = ""
    for (var i = 0; i < this.citylist.length; i++) {
      if (city.itemName == this.citylist[i].itemName) {
        this.citylist.splice(i, 1)
      }
    }



    for (let b of this.citylist) {

      if (this.citycodes) {
        this.citycodes = this.citycodes + ',' + b.itemName
      }
      else {
        this.citycodes = b.itemName
      }
    }
    this.getdealerbyselectingcity(this.citycodes)

  }
  totalallddata: any
  onSelectAllcity(cities) {
    this.citycodes = ""
    this.citylist = cities
    for (let b of cities) {

      if (this.citycodes) {
        this.citycodes = this.citycodes + ',' + b.itemName
      }
      else {
        this.citycodes = b.itemName
      }
    }
    this.getdealerbyselectingcity(this.citycodes)

  }
  onDeSelectAllcity(cities) {
    this.dealernamesdata = []
    this.citylist = []
    this.citycodes = ""

  }
  dealerslist: any = []
  splitdata: any
  dealerslist1: any = []
  codes: any = []
  dealersinfo: any = []
  ondealerSelect(dealer, model) {
   
    if (this.dealerslist.length > 1) {
      for (var i = 0; i < this.dealerslist.length; i++) {
        if (dealer.id == this.dealerslist[i].id) {

          this.dealerslist.splice(i, 1)

        }
      }
    }

    this.dealerslist.push(dealer)
  }

  adddealerdiscount(dealer, model) {
  
this.brancheslist=[]
this.dealerslist1=[]
    this.dealersinfo = []
    for (var i = 0; i < this.dealerslist.length; i++) {
      if (this.dealerslist[i].id) {
        this.splitdata = this.dealerslist[i].id.split('@')

        this.codes.push(this.splitdata[1])
        if (model != undefined) {
          for (var j = 0; j < model.length; j++) {
            this.dealersinfo.push({ "branchcode": this.codes[i], "branchname": this.dealerslist[i].branchname, "state": this.dealerslist[i].state, "city": this.dealerslist[i].city, "dealer": this.dealerslist[i].id, "dealername": this.dealerslist[i].itemName, "category": model[j].category, "subcategory": model[j].subcategory, "model": model[j].itemName, "productid": model[j].productid })
            this.dealeroffercheck(model[j].productid, this.dealerslist[i].id)

          }
        }
        else {
          this.dealerslist1.push({ "branchcode": this.codes[i], "branchname": this.dealerslist[i].branchname, "state": this.dealerslist[i].state, "city": this.dealerslist[i].city, "dealer": this.dealerslist[i].id, "dealername": this.dealerslist[i].itemName })
          console.log(this.dealerslist1, "this.dealerslist.branchcode")
        }
      }
    }
  }
  dealeroffercheck(productid, dealerid) {
    this.dealerslist1 = []
    this.service.getDatawithMethodParams3('check_offer/', productid, "", dealerid).subscribe(resp => {
      this.offerdata = resp

      if (resp['status'] == 0) {
        for (var i = 0; i < this.dealersinfo.length; i++) {
          if (this.offerdata.param_other3 == this.dealersinfo[i].dealer && this.offerdata.param_other1 == this.dealersinfo[i].productid) {
            this.dealerslist1.push(this.dealersinfo[i])
          }
        }
      }
      else {
        this.sel_prod = this.offerdata.param_other1
        for (var i = 0; i < this.dealersinfo.length; i++) {

          if (this.offerdata.param_other3 == this.dealersinfo[i].dealer && this.offerdata.param_other1 == this.dealersinfo[i].productid) {
            this.dealersinfo.splice(i, 1)



          }

        }
        for (var j = 0; j < this.selectedlist.model.length; j++) {
          if (this.offerdata.param_other1 == this.selectedlist.model[j].productid) {
            this.selectedlist.model.splice(j, 1)
          }
        }
        $('#exists').modal('show');

      }
    })
  }
  onSelectAlldealer(dealers, model) {
    this.dealerslist = dealers
    this.dealerslist1 = []

  }

  OndealerDeSelect(dealer) {
   
    this.dealerslist1 = []
    for (var i = 0; i < this.dealerslist.length; i++) {
      if (dealer.id == this.dealerslist[i].id) {
       
        this.dealerslist.splice(i, 1)
        this.codes.splice(i, 1)
      }
    }
  }
  onDeSelectAlldealers(dealers) {
    this.dealerslist1 = []
    this.dealerslist=[]
    this.codes=[]
  }

  check_dealeroff_dis(data) {
    //console.log("checkk",this.Offer_gen.from_range);
    let arr = ["from_range", "to_range", "offer_type", "offer_value"];
    for (let i of arr) {
      if (this.dealerOffer_gen[i] == null || this.dealerOffer_gen[i] == undefined) {
        return true;
      }
    }
    return false;
  }

  dealer_offer(data) {

    if (data.model) {
      this.dealerOffer_gen.category = data.category;
      this.dealerOffer_gen.subcategory = data.subcategory;
      this.dealerOffer_gen.model = data.model;
      this.dealerOffer_gen.branchcode = data.branchcode;
      this.dealerOffer_gen.branchname = data.branchname;
      this.dealerOffer_gen.fromdate = this.Datepipe.transform(this.dealeroffer.fromdate, "yyyy-MM-dd");
      this.dealerOffer_gen.todate = this.Datepipe.transform(this.dealeroffer.todate, "yyyy-MM-dd");
      this.dealerOffer_gen.state = data.state;
      this.dealerOffer_gen.city = data.city;
      this.dealerOffer_gen.dealer = data.dealer;
      this.dealerOffer_gen.dealername = data.dealername;
      this.dealerOffer_arr.push(this.dealerOffer_gen);

      this.dealerOffer_gen = {};
    }
    else {
      this.dealerOffer_gen.branchcode = data.branchcode;
      this.dealerOffer_gen.branchname = data.branchname;
      this.dealerOffer_gen.fromdate = this.Datepipe.transform(this.dealeroffer.fromdate, "yyyy-MM-dd");
      this.dealerOffer_gen.todate = this.Datepipe.transform(this.dealeroffer.todate, "yyyy-MM-dd");
      this.dealerOffer_gen.state = data.state;
      this.dealerOffer_gen.city = data.city;
      this.dealerOffer_gen.dealer = data.dealer;
      this.dealerOffer_gen.dealername = data.dealername;
      this.dealerOffer_arr.push(this.dealerOffer_gen);

      this.dealerOffer_gen = {};
    }
  }
  dofferslist: any = []
  dealerofferlist: any = []
  sub_finaldealer(j, data) {



    this.dofferslist = []
    console.log("j-index", j);
   if (this.dealerOffer_gen.from_range && this.dealerOffer_gen.to_range && this.dealerOffer_gen.offer_type && this.dealerOffer_gen.offer_value && this.dealeroffer.fromdate && this.dealeroffer.todate)  {
      if (data.model) {
        this.dealerOffer_gen.category = data.category;
        this.dealerOffer_gen.subcategory = data.subcategory;
        this.dealerOffer_gen.model = data.model;
        this.dealerOffer_gen.branchcode = data.branchcode;
        this.dealerOffer_gen.branchname = data.branchname;
        this.dealerOffer_gen.fromdate = this.Datepipe.transform(this.dealeroffer.fromdate, "yyyy-MM-dd");
        this.dealerOffer_gen.todate = this.Datepipe.transform(this.dealeroffer.todate, "yyyy-MM-dd");
        this.dealerOffer_gen.state = data.state;
        this.dealerOffer_gen.city = data.city;
        this.dealerOffer_gen.dealer = data.dealer;
        this.dealerOffer_gen.dealername = data.dealername;
        this.dealerOffer_arr.push(this.dealerOffer_gen);

        this.dealerOffer_gen = {};
      }
      else {
        this.dealerOffer_gen.branchcode = data.branchcode;
        this.dealerOffer_gen.branchname = data.branchname;
        this.dealerOffer_gen.fromdate = this.Datepipe.transform(this.dealeroffer.fromdate, "yyyy-MM-dd");
        this.dealerOffer_gen.todate = this.Datepipe.transform(this.dealeroffer.todate, "yyyy-MM-dd");
        this.dealerOffer_gen.state = data.state;
        this.dealerOffer_gen.city = data.city;
        this.dealerOffer_gen.dealer = data.dealer;
        this.dealerOffer_gen.dealername = data.dealername;
        this.dealerOffer_arr.push(this.dealerOffer_gen);

        this.dealerOffer_gen = {};
      }


  

    console.log("final", this.dealerOffer_arr);
    for (var i = 0; i < this.dealerOffer_arr.length; i++) {
      if (this.dealerOffer_arr[i].dealer == this.dealerslist1[i].dealer) {
        this.dealerslist1.splice(i, 1)
        this.dealerofferlist.push(this.dealerOffer_arr)
        for (var i = 0; i <= this.dealerofferlist.length; i++) {
          if (this.dealerofferlist[i]) {
            for (var t = 0; t < this.dealerofferlist[i].length; t++) {
              this.dofferslist.push(this.dealerofferlist[i][t])
            }
          }
        }

        this.dealerOffer_arr = []
        this.dealeroffer = {}
        // this.branchdata=[]

      }
    }

  }
  else{
    this.toasterService.error("Please fill all fields")
  }

  }
  

  submitdealeroffers(data) {

    return this.service.postData(this.dofferslist, "offers/offer/").subscribe(resp => {
      if (resp['status'] == 1) {
        $('#success').modal('show');
      }
      console.log("resp", resp);
      // this.select_model.splice(j, 1);
      // this.btn_txt = this.select_model.length + "" + " Models Selected";
      this.dealerOffer_arr = [];
      this.dealeroffer = {};
      this.dealerOffer_gen = {};
      this.gen_off = false;
      this.dofferslist = []
      this.dealerofferlist = []
      this.dealernamesdata = []
      this.statenamesdata = []
      this.citynamesdata = []
      this.subcategorylist = []
      this.modellist = []
      this.dealerslist1 = []
      this.dealerslist = []
      this.selectstate = []
      this.selectcity = []
      this.brancheslist = []
      this.selectbranch = []
      this.selectedlist.branch = []
      this.selectedlist.state = []
      this.selectedlist.city = []
      this.selectedlist.dealer = []
      this.selectedlist.category = []
      this.selectedlist.subcategory = []
      this.selectedlist.model = []
      this.citylist = []
      this.statelist = []
      this.statecodes = ""
      this.citycodes = ""
      this.branchcodes = ""
      this.bcodes = []

    })
  }





  body: any
  edit(data) {

    if (data.active == "1") {
      this.body = { "active": 0 }
    }
    else {
      this.body = { "active": 1 }
    }
    return this.service.patchDatawithbodyparam1("offers/offer/", data.id, this.body).subscribe(resp => {
      $('#success').modal('show');
      if (this.POhidden==true) {

        this.avail_offers()
       
      }
      else if (this.BOhidden==true) {

        this.getbranchoffers()
      }
      else if(this.DEhidden==true){

        this.getdealeroffers()
      }
    })
  }
  extend(data) {
    console.log("dataa", data);
    this.offer_extend = data;
    $('#extend').modal('show');
  }
  extend_submit() {
    console.log("d", this.offer_extend);
    let body = {
      "fromdate": this.offer_extend.fromdate,
      "todate": this.offer_extend.todate
    }
    return this.service.patchDatawithbodyparam1("offers/offer/", this.offer_extend.id, body).subscribe(resp => {
      console.log("resp", resp);
      $('#success').modal('show');
    })
  }

  edit_offer(data) {
  
    this.edit_product_id = data.product.productid;
    console.log("data", data.product.productid);
    return this.service.getDatawithMethodParams1("offer_search/", data.product.productid).subscribe(resp => {
      console.log("result", resp);
      this.edit_offer_data = resp;
      if(this.edit_offer_data.length>0){
      $('#edit_modal').modal('show');
      this.edit_sku_no = this.edit_offer_data[0].sku_no;
      }
      else{
        this.toasterService.warning("This offer already expired")
      }
      // console.log("sku",sku);

    })
  }

  edit_offer_submit() {
    console.log("edit data", this.edit_offer_data);
    let body = this.edit_offer_data;
    return this.service.updateData(body, "update_offers/").subscribe(resp => {
      console.log("result", resp);
      if (resp['status'] == 1) {
        $('#success').modal('show');
        this.avail_offers();
      }
      // $('#edit_modal').modal('show');

    })
  }
  make_new_offer() {
   
    this.edit_offers = !this.edit_offers;
    this.add_new_offer = !this.add_new_offer;
    // this.new_offer_data=[1];
  }

  sub_new_offer() {
    console.log("p_detail", this.edit_product_id);
    this.Offer_new_gen.productid = this.edit_product_id;
    this.Offer_new_gen.sku_no = this.edit_sku_no;
    // this.Offer_gen.sku_no = data.sku_no;
    this.Offer_new_gen.fromdate = this.Datepipe.transform(this.Offer_new_gen.fromdate, "yyyy-MM-dd");
    this.Offer_new_gen.todate = this.Datepipe.transform(this.Offer_new_gen.todate, "yyyy-MM-dd");
    //console.log("offer_data",this.Offer_gen);
    this.Offer_new_arr.push(this.Offer_new_gen);
    this.Offer_new_gen = {};
  }

  
  createcode:boolean=false
  availableoffers:boolean=true
  createoffers(){
    this.createcode=true;
    this.availableoffers=false;

    
  }
  applicables:any=[]
  getmethodname2:any
  getapplicables(){
   
    this.getmethodname2="promocode/applicable"
   
    this.service.getDataOnlyWithMethod(this.getmethodname2).subscribe((resp1) =>
   
    {
     this.applicables=resp1;
    });
  }
  onSubmit(form: NgForm) {
    this.atributesData(form);
  }
  methodname1:any
  offerresponse:any
  atributesData(form) {
    this.masterData.fromdate = this.Datepipe.transform(this.masterData.fromdate, "yyyy-MM-dd")
    this.masterData.todate = this.Datepipe.transform(this.masterData.todate, "yyyy-MM-dd")
    this.methodname1 = "offers/specialoffers/"
    this.service.postData(this.masterData, this.methodname1).subscribe((data) => {
      this.offerresponse = data;
      this.getofferdata()
      console.log(data);
      if (this.offerresponse != "") {
        $("#successModal").modal('show');
        form.reset();
        this.masterData.offertype=undefined
        this.getapplicables()
      }
    })
  }
getoffer:any
  getofferdata(){
    this.getmethodname2="offers/specialoffers"
    this.service.getDataOnlyWithMethod(this.getmethodname2).subscribe((resp1) =>
    {
     this.getoffer=resp1;
    });
  }
  editoffer_data:any
  editoffer(data) {
    return this.service.getDataOnlyWithMethod("offers/specialoffers/"+data.id ).subscribe(resp => {
      console.log("result", resp);
      this.editoffer_data = resp;
      $('#editoffermodal').modal('show');
      // this.edit_sku_no = this.edit_offer_data[0].sku_no;
      // console.log("sku",sku);

    })
  }
  editoffer_submit() {
    let body = this.editoffer_data;
    return this.service.updateData(body, "offers/specialoffers/"+this.editoffer_data.id+"/" ).subscribe(resp => {
      console.log("result", resp);
     
        $('#success').modal('show');
        this.getofferdata();
     
      // $('#edit_modal').modal('show');

    })
  }
  availoffers(){
    this.createcode=false;
    this.availableoffers=true;
    this.getofferdata()
   
  }


enable(offer){
    
  if (offer.active == "1") {
    this.body = { "active": 0 }
  }
  else {
    this.body = { "active": 1 }
  }
  return this.service.patchDatawithbodyparam1("offers/specialoffers/",offer.id,this.body ).subscribe(resp => {
    $('#success').modal('show');
   
    this.getofferdata();
   
   
  
  })
}
value:any
setFilteredItems() {
    if(this.status==undefined){
      this.offers_data=this.totaloffers_data
    }
    
    else{
      if(this.status=='active'){
        this.value="1"
      }
      if(this.status=="inactive"){
        this.value="0"
      }
      this.offers_data  = this.totaloffers_data.filter(x => this.value.indexOf(x.active) !== -1);
      console.log(this.offers_data,"this.selectedoffers_data")
    // this.offers_data = this.totaloffers_data.filter((item) => {
    //   return (
    //     item.active.toLowerCase().indexOf(this.status.toLowerCase()) > -1 
    //   );
    // });
  }
}
}
