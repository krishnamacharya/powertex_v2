import { Component, OnInit } from '@angular/core';
import { DatePipe } from "@angular/common";
import { GlobalServiceService } from '../../global-service.service';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
import { MatDialog } from '@angular/material/dialog';
declare var $: any;


@Component({
  selector: 'app-schemes',
  standalone: false,
  templateUrl: './schemes.component.html',
  styleUrls: ['./schemes.component.scss']
})
export class SchemesComponent implements OnInit {
  loginUserData: any;
  field: any = {};
  model_id={};
  data_list: any;
  arr_list: any=[];
  products_list: any=[];
  sub_arr_list: any=[];
  sub_c: any[];
  newarr: any[];
  subc:any;
  body:any;
  model_list: any[];
  offers_data:any={};
  productid:any[];
  selected:any="INDIA";
  states_list: any;
  states:any[];
  scheme_t:any;
  total_catg: any[];
  NewSch:boolean=true;
  AvailSch:boolean=false;
  NAppSch:boolean=false;
  schemes_data: any;
  approval_schemes_data: any;
  uploadfile: any;
  url: string;
  uploadAttrfile: any;
  attrurl: string;
  scheme_edit: any;
  en_dis_id: any;

  constructor( private service:GlobalServiceService,private Datepipe:DatePipe,private dialog: MatDialog) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getprodimg();
    this.getstates();
  }
  

  getprodimg() {
    this.total_catg=[]
    return this.service.getDatawithMethod1('get_products_category/').subscribe((resp) => {
      this.data_list = resp;
      console.log("total catg",this.data_list);
      for(let data of this.data_list){
        this.total_catg.push(data.Category);
        console.log("total catg list",this.total_catg);
      }
    },
      error => {
        // this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      });
  }
  getstates(){
    this.states_list=[]
      return this.service.getDatawithQueryParams1("15",this.selected).subscribe(data=>{
        this.states_list=data;
        console.log("states",this.states_list);
        
      })
  }
  sel_category(data){
    this.sub_arr_list=[];
    console.log("data",this.offers_data);
    this.arr_list=[...data];
   //console.log("data-model",this.arr_list);
   for(let d of data){
    let methodName="api/product"
     this.service.getcheckdata(methodName,d).subscribe(data=>{
      this.products_list=data;
      this.sub_arr_list=[...this.products_list,...this.sub_arr_list]
      //console.log("total",this.sub_arr_list);
      
    });
   }
  //  this.get_sub_catlist();
  }
  testy(){
    this.model_list=[]
   console.log("testy", this.subc);
    for(let b of this.subc){
      for(let d of this.sub_arr_list){
        if(b==d.subcategory){
          this.model_id={
            productid:d.productid,
            modelno:d.modelno
          }
          this.model_list.push(this.model_id);
          console.log("model",this.model_list);
        }
      }
    }
    
  }
  testy1(){
    console.log("id",this.productid);
    this.offers_data={
      productid:this.productid
    }
  }
  testy2(){
    console.log("states",this.states);
    this.offers_data.states=this.states;
  }

  scheme_type(){
console.log("sel_sch",this.scheme_t);

  }
  submit_offers(){
    if(this.offers_data.productid){
      this.offers_data.productid=this.offers_data.productid.toString();
    }
   
    this.offers_data.states=this.offers_data.states.toString();
    this.offers_data.fromdate=this.Datepipe.transform(this.offers_data.fromdate, "yyyy-MM-dd");
    this.offers_data.todate=this.Datepipe.transform(this.offers_data.todate, "yyyy-MM-dd");
    console.log("offers", this.offers_data);
    return this.service.postData(this.offers_data,"offers/Scheme/").subscribe(resp=>{
     console.log("dataqq",resp);
     if(resp['status']==1){
       console.log("true");
       this.offers_data={};
       this.field.Category="";
       $("#createSuccess").modal('show');
       
       
     }
     
    });
  }
 
  selectAll(){
this.field.Category=this.total_catg;
this.offers_data.spec="All";
return  this.sel_category(this.field.Category);

  }
  deselectAll(){
    this.field.Category=[];
    // this.subc=[];
    this.offers_data.spec="";
    this.sub_arr_list=[];
    console.log("sub",this.sub_arr_list);
    console.log("data",this.offers_data);
  }
  sub_selectAll(){
    this.subc=this.sub_arr_list;
    console.log("hii",this.subc);
  }
  sub_deselectAll(){}

  sub_catg_disable(){
    if(this.offers_data.spec=="All"){
      return true;
    }
    return false;
  }
  model_disable(){
    if(this.offers_data.spec=="All"){
      return true;
    }
    return false;
  }
  new_sch(){
    this.NewSch=true;
    this.AvailSch=false;
    this.NAppSch=false;
  }
  Avail_sch(){
    this.NewSch=false;
    this.AvailSch=true;
    this.NAppSch=false;
    return this.service.getDataOnlyWithMethod("offers/Scheme").subscribe(data=>{
      console.log("scheme",data);
      this.schemes_data=data;
      
    })
  }
  Approve_sch(){
    this.NewSch=false;
    this.AvailSch=false;
    this.NAppSch=true;
    return this.service.getDatawithMethodParams3("Schemelis/","","","All").subscribe(data=>{
      console.log("ascheme",data);
      this.approval_schemes_data=data;
      
    })
  }
  approve_schema(data,key){
    this.body={"approval":key};
    return this.service.patchDatawithbodyparam1("offers/Schemedept/",data.seqno,this.body).subscribe(data=>{
      console.log("approval",data);
      this.Approve_sch();
      
    })

  }
  dis_ena(data,id){
    let body={"active":id};
    return this.service.patchDatawithbodyparam1("offers/Scheme/",data.schemeid,body).subscribe(data=>{
      console.log("approval",data);
      this.en_dis_id=data['active'];
      console.log("disable",this.en_dis_id);
      this.Approve_sch();
      this.Avail_sch();
      $("#enabledisableSuccess").modal('show');
    })
  }
}
