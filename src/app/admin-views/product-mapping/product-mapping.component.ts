import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { GlobalServiceService } from "../../global-service.service";
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-product-mapping',
  standalone: false,
  templateUrl: './product-mapping.component.html',
  styleUrls: ['./product-mapping.component.scss']
})
export class ProductMappingComponent implements OnInit {
  loginUserData: any
  pro: any = {}
  productdata: any = {}
  productdata1: any = {}
  fieldArray: Array<any> = [];
  packingtypes: any
  currencies: any = []
  subcategories: any = []
  product: any = []
  productnames: any = []
  suppliers: any = []
  skuExists: boolean = false;
  PNameExists: boolean = false;
  SNameExists: boolean = false;
  viewdetails: boolean = false
  PUrl: any;
  supplierid: any;
  constructor( private route: Router,private globalService: GlobalServiceService, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getpackingtypes()
    this.getcurrency()
    this.getsuppliers()
    this.getproductnames()
    this.productdata.exportcartonnw = 0;
    this.productdata.exportcartongw = 0;
    this.productdata.exportcartoncbn = 0;
    this.PUrl = window.location.href.substr(window.location.href.length - 5)
  }
  getpackingtypes() {
    this.globalService.getDataOnlyWithMethod("sup/drop").subscribe((data) => {
      this.packingtypes = data;
    });
  }

  getcurrency() {
    this.globalService.getDataOnlyWithMethod("sup/currencydrop").subscribe((data) => {
      this.currencies = data;
    });
  }
  myNewList1: any = []
  pdata: any
  getproductnames() {
    this.spinner.show();
    this.globalService.getDataOnlyWithMethod("sup/subcategory").subscribe((data) => {
      this.spinner.hide();
      this.productnames = data;


    });
  }
  getsuppliers() {
    this.globalService.getDataOnlyWithMethod("sup/skuprifix").subscribe((data) => {
      this.suppliers = data;
    });
  }
  getsubcategory(productname) {
    // this.productdata.productid=productname.productid
    for (let name of this.productnames) {
      if (productname.replace(/\s/g, '') === name.productname.replace(/\s/g, '')) {
        this.productdata.subcategory = name.subcategory
        this.productdata.productid = name.productid
        this.pro.brand = name.brand
        this.pro.piecepercarton = name.piecepercarton
        // this.productdata.product_name=productname.productname
        this.checkProdExists();
        break;
      }

    }

  }
  checkProdExists() {
      this.globalService.getDatawithMethodParams2("sup/check_sup_prod_exists/", this.productdata.productid, this.productdata.supplier_id).subscribe((data: any) => {
        // this.globalService.getDatawithMethodParams2("sup/check_sup_prod_exists/", this.productdata.product_name, this.productdata.supplier_id).subscribe((data: any) => {
      this.SNameExists = false;
      if (data.status == 1) {
        this.PNameExists = true;
      } else if (data.status == 0) {
        this.PNameExists = false;
      }
    },
      error => {
        this.SNameExists = true;
        // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      });
  }
  
  keynumber(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  keypress(event) {
    if (event.length > 0) {
      this.globalService.getDatawithMethodParams2("sup/check_prod_map_exists/", this.pro.sku_prefix + event, this.productdata.product_name,).subscribe((data: any) => {
        console.log(data)
        if (data.status == 1) {
          this.skuExists = true;
        } else if (data.status == 0) {
          this.skuExists = false;
        }
      },
        error => {
          //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        });
    }
  }
  getsku(supplier) {
    for (let name of this.suppliers) {
      if (supplier.replace(/\s/g, '') === name.business_name.replace(/\s/g, '')) {
        this.supplierid = name.user_id
        break;
      }
    }

    for (let name of this.suppliers) {
      // if (supplier == name.user_id) {
      if (this.supplierid == name.user_id) {
        this.pro.sku_prefix = name.sku
        this.productdata.currency = name.currency;
        this.productdata.supplier_id = name.user_id;
        if (this.SNameExists) {
          this.checkProdExists();
        } else {
          this.SNameExists = false;
        }
      }
    }
  }
  // =========================product upload======image===============================
  image: any
  image1: any
  file: File
  productfileUpload(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0]
      var reader = new FileReader();
      reader.onload = (event: any) => {
        //me.modelvalue = reader.result;
        this.image = event.target.result
        console.log(event.target.result);
      };
      reader.readAsDataURL(this.file);
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  };
  packingimagefileUpload(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0]
      var reader = new FileReader();
      reader.onload = (event: any) => {
        //me.modelvalue = reader.result;
        this.image1 = event.target.result
        console.log(event.target.result);
      };
      reader.readAsDataURL(this.file);
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  }
  add_disable(attr) {

    let arr = ["packing", "qty", "piecepercartoon", "mrp", "barcode"];
    for (let i of arr) {
      if (attr[i] == null || attr[i] == undefined) {

        return true;
      }
    }

    return false;
  }
  viewbutton: boolean = true
  addFieldValue() {

    //  this.newAttribute1.Field_Qaun = "true";
    this.fieldArray.push(
      this.productdata1
    );

    this.productdata1 = {};




  }
  viewmore() {
    if (this.viewdetails == false) {
      this.viewdetails = true
    }
    else {
      this.viewdetails = false
    }

  }
  deleteFieldValue2(index) {
    this.fieldArray.splice(index, 1);
    // if(this.fieldArray.length==0){
    //   this.viewbutton=false
    // }

  }
  onSubmit(form: NgForm) {
    if (!this.skuExists && !this.PNameExists && !this.SNameExists) {
      this.atributesData(form);
    }
  }
  methodname: any
  atributesData(form) {
    this.productdata.product_name = this.productdata.product_name
    this.productdata.sku_no = this.pro.sku_prefix + this.productdata.sku_no
    if (this.productdata1.packing && this.productdata1.mrp && this.productdata1.qty && this.productdata1.piecepercarton && this.productdata1.piecepercartoon && this.productdata1.barcode) {
      this.fieldArray.push(
        this.productdata1
      )
    }
    // if(this.productdata.productimage || this.productdata.packingimage){
    //   this.productdata.productimage=this.productimage
    //   this.productdata.packingimage=this.packingimage
    // }
    this.productdata.packingdetail = this.fieldArray
    this.productdata.image1 = this.image
    this.productdata.image2 = this.image1
    console.log(this.productdata, "productdata");
    this.spinner.show();
    this.methodname = "sup/mappingpost/"
    this.globalService.postData(this.productdata, this.methodname).subscribe((data) => {
      this.spinner.hide();
      console.log(data);
      if (data['msg'] == 'created successfully') {
        $("#successModal").modal('show');
        this.fieldArray = []
        form.reset();
        this.productdata.product_name = undefined
        this.productdata.currency = undefined
        this.productdata1.packing = undefined
        this.pro.supplier = undefined
        this.image = null
        this.image1 = null
        this.productdata.exportcartonnw = 0
        this.productdata.exportcartongw = 0
        this.productdata.exportcartoncbn = 0

      }
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        // console.log(error);
      })
  }
  createProduct(){
    this.route.navigateByUrl('/Admin-PRODUCT MASTER?pg=' + 'ABC' +'&A=APM');
  }
}
