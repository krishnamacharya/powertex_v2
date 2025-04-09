import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../../global-service.service';
declare var $: any;
@Component({
  selector: 'app-schemas',
  standalone: false,
  templateUrl: './schemas.component.html',
  styleUrls: ['./schemas.component.scss']
})
export class SchemasComponent implements OnInit {
  loginUserData: any;
  schemes_data: any=[];
  AvailSch:boolean=true;
  AppSch:boolean=false;
  scheme_modal: any;
  app_schemes_data: any=[];
  constructor( private service:GlobalServiceService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getschema_list();
  }
  getschema_list(): any {
    this.AvailSch=true;
  this.AppSch=false;
   return this.service.getDatawithMethodParams1("Schemelis/",this.loginUserData.user_id).subscribe(data=>{
     console.log("scheme",data);
     this.schemes_data=data;
     
   })
  }
  App_sch(){
    this.AvailSch=false;
    this.AppSch=true;
    return this.service.getDatawithMethodParams2("Schemelis/",this.loginUserData.user_id,this.loginUserData.user_id).subscribe(data=>{
      console.log("ascheme",data);
      this.app_schemes_data=data;
      
    })
  }
  view_sch_det(data){
    this.scheme_modal=data;
    console.log("sch_dat",this.scheme_modal);
    
    $("#schemeModal1").modal('show');
  }
  app_scheme(data){

    console.log("dataa",data);
    data.user_id=this.loginUserData.user_id;
    return this.service.postData(data,"offers/Schemedept/").subscribe(data=>{
      console.log("app",data);
      this.getschema_list();
      $("#schemeSuccess").modal('show');
    })
  }

}
