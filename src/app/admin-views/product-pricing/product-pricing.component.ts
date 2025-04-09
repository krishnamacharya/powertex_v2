import { Component, OnInit, inject } from '@angular/core';
import { FormControl, Validators, NgForm } from "@angular/forms";
import { GlobalServiceService } from '../../global-service.service';
import { DataServiceService } from '../../data-service.service';
import 'bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;

@Component({
  selector: 'app-product-pricing',
  standalone: false,
  templateUrl: './product-pricing.component.html',
  styleUrls: ['./product-pricing.component.scss']
})

export class ProductPricingComponent implements OnInit {
  statusdata:any=[]
  input_id: any;
  catSubcatList: any=[];
  category: any;
  subcategory: string;
  attrList: any = [];
  attrshow: boolean;
  formdata: any;
  attrData: any = {};
  response: any;
  productid: void;
  formList: any = [];
  seq_no: any;
  sr_no: any;
  attrArray: any = [];
  obj: any = {};
  catList: any;
  productname: any;
  

  constructor(public globalService: GlobalServiceService, public dataService: DataServiceService, private dialog: MatDialog, private spinner: NgxSpinnerService) {
  }
  masterData: any = {};
  methodname: any;
  ngOnInit() {
    this.catList = this.dataService.getOnLoadServices('30');       //Categories List
    // this.catSubcatList = this.dataService.getOnLoadServices('35'); // Sub categories List
    this.dataService.getOnLoadServices('35').subscribe(data=>{
      this.catSubcatList=data;
      console.log( this.catSubcatList," this.catSubcatList")
    })
  
    this.getdiscounts()
    this.getstatus()
    this.getbrands();
   
  }
  brandslist:any=[];
getbrands(){
  this.globalService.getDatawithInput_id('brand').subscribe(data=>{
    this.brandslist=data;
  })
}
getcatsublist(){
  this.dataService.getOnLoadServices('35').subscribe(data=>{
    this.catSubcatList=data;
  })
}
  // Get Attributes based on Category & subcategory 
  sub_category:boolean=true
  totalsubcateg_list:any=[]
  selectCat(data) {
    this.category = data;
    let methodName="api/product/"
    return this.globalService.getcheckdata(methodName,this.category).subscribe(data=>{
      this.totalsubcateg_list=data;
      this.get_sub_catlist1();
      this.sub_category=false;
    })
      
  }
  sub_catg:any=[]
get_sub_catlist1(): any {
  this.sub_catg=[];
 
  for(let data of this.totalsubcateg_list){
    this.sub_catg.push({'subcategory':data.subcategory,'productid':data.productid})
    
   }
 this.cat_sort1();
}
newarray:any=[]
cat_sort1(): any {
  this.newarray=[];
  for (var i=0; i<this.sub_catg.length; i++) {
    if(i>0){
     if (this.sub_catg[i].subcategory!=this.sub_catg[i-1].subcategory) 
     this.newarray.push({'subcategory':this.sub_catg[i].subcategory,'productid':this.sub_catg[i].productid});
    }
    else{
      this.newarray.push({'subcategory':this.sub_catg[i].subcategory,'productid':this.sub_catg[i].productid});
    }
  }
}
  selectSubcat(data) {
    
    this.subcategory = data;
    this.catAttrGet();
  }

  catAttrGet() {
    
    this.spinner.show();
    this.input_id = "32";
    this.attrshow = false;
    this.globalService.getDatawithQueryParams2(this.input_id, this.category, this.subcategory).subscribe((data) => {
      this.spinner.hide();
      this.attrList = data;
      if (this.attrList.length > 0) {
        this.attrshow = true;
      }
    },
     error => {         this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        // console.log(error);
      });
  }


  //Attribute Values Submit- using (blur)
  myMethod(item, val) {
    
    this.attrArray.push({ "atrname": item.attribute, "atrvalue": val, "seq_no": item.seq_no });
    this.obj = this.attrArray;

  }


  

  onSubmit(form: NgForm) {
    this.atributesData(form);
  }


  // products Post 

  productData(form) {
    // this.spinner.show();
    this.formdata = { "flag": 1, "data": [this.masterData] };
    this.methodname = "product_master_data/"
    this.globalService.postData(this.formdata, this.methodname).subscribe((data) => {
      // this.spinner.hide();
      console.log(data);
      if (data['status'] == "success") {
        this.atributesData(form);
      }
    },
     error => {         
      //  this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        // console.log(error);
      });
  }
  discountdata:any
getdiscounts(){
  this.spinner.show()
  
  this.globalService.getDataOnlyWithMethod("discount").subscribe((data) => {
    // this.spinner.hide();
    this.discountdata = data;
    this.masterData['discount_a']=this.discountdata['discount_a']
    this.masterData['discount_b']=this.discountdata['discount_b']
    this.masterData['discount_c']=this.discountdata['discount_c']
    this.masterData['discount_d']=this.discountdata['discount_d']
    this.masterData['discount_e']=this.discountdata['discount_e']
    this.masterData['discount_f']=this.discountdata['discount_f']
    this.masterData['discount_g']=this.discountdata['discount_g']
    this.masterData['discount_h']=this.discountdata['discount_h']
    this.masterData['discount_i']=this.discountdata['discount_i']
    this.masterData['discount_j']=this.discountdata['discount_j']
    this.masterData['discount_k']=this.discountdata['discount_k']
    this.masterData['discount_l']=this.discountdata['discount_l']
    this.masterData['discount_m']=this.discountdata['discount_m']
    this.masterData['discount_n']=this.discountdata['discount_n']
    this.masterData['discount_o']=this.discountdata['discount_o']
    this.masterData['discount_p']=this.discountdata['discount_p']
    this.masterData['discount_q']=this.discountdata['discount_q']
    this.masterData['discount_r']=this.discountdata['discount_r']
    this.masterData['discount_s']=this.discountdata['discount_s']
    this.masterData['discount_t']=this.discountdata['discount_t']
    this.masterData['discount_u']=this.discountdata['discount_u']
    this.masterData['discount_v']=this.discountdata['discount_v']
    this.masterData['discount_w']=this.discountdata['discount_w']
    this.masterData['discount_x']=this.discountdata['discount_x']
    this.masterData['discount_eu1']=this.discountdata['discount_eu1']
    this.masterData['discount_eu2']=this.discountdata['discount_eu2']
    this.masterData['discount_eu3']=this.discountdata['discount_eu3']
    this.masterData['discount_eu4']=this.discountdata['discount_eu4']
    this.masterData['gst']=this.discountdata['gst']
    
    this.spinner.hide()
  })
}
getstatus(){
  
  this.globalService.getDataOnlyWithMethod("actiondropdown").subscribe((data) => {
    // this.spinner.hide();
    this.statusdata = data;
    this.masterData.active=this.statusdata[0].value
  })
}

  // Attributes Post
  productmasterdata:any
  atributesData(form) {
   
    this.spinner.show();
    // for (let i = 0; i < this.obj.length; i++) {
    //   this.obj[i].productid = this.masterData.productid;
    //   this.obj[i].product_name = this.masterData.long_name;
    // }
    for(let c of this.catSubcatList){
      if(c.subcategory==this.masterData.subcategory){
        this.masterData.productid=c.productid
      }
    }
    // this.masterData.productid=
    this.formdata = { "flag": 2, "data": this.masterData };

    this.methodname = "api/product/"
    this.globalService.postData(this.formdata, this.methodname).subscribe((data) => {
      this.productmasterdata=data
      this.spinner.hide();
      //console.log(data);
      if (this.productmasterdata.status == "success") {
        $("#successModal").modal('show');
        form.reset();
      }

    },
     error => {         this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        // console.log(error);
      });

  }
  discounts:boolean=false
showdisc(){
  if(this.discounts==false){
  this.discounts=true
  }
  else{
    this.discounts=false
  }
}
enddiscounts:boolean=false
showenddisc(){
  if(this.enddiscounts==false){
  this.enddiscounts=true
  }
  else{
    this.enddiscounts=false
  }
}
}
