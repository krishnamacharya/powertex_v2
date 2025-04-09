import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../../global-service.service';

@Component({
  selector: 'app-privelages',
  standalone: false,
  templateUrl: './privelages.component.html',
  styleUrls: ['./privelages.component.scss']
})
export class PrivelagesComponent implements OnInit {
  loginUserData: any;
  roles: any;
  priv:any=["INTERNAL USERS","ORDERS"];
  priv_roles: any;
  Dealer_Priv: any=[];
  AccountsManager_Priv: any;
  WarehouseManager_Priv: any;
  PurchaseManager_Priv: any;
  SalesManager_Priv: any;
  BranchManager_Priv: any;
  MarketingManager_Priv: any;
  Admin_Priv: any;
  Customer_Priv: any;
  PosCleark_Priv: any;
  ShopeeManager_Priv: any;
  PrivGraph:any=true;
  PrivEdit:any=false;


  constructor( private service:GlobalServiceService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.get_Roles();
    this.get_Priveleges();
    this.get_role_priv();
    
  }
  
  get_Roles(): any {
    this.service.getDataOnlyWithMethod("admin/display").subscribe(response=>{
      console.log("roles",response);
      this.roles=response;
      
    })
  }
  get_Priveleges() {
    this.service.getDataOnlyWithMethod("admin/display/priv_type").subscribe(response=>{
      console.log("roles_p",response);
      this.priv_roles=response;
      
    })
  }
  get_role_priv(): any {
    this.service.getDatawithMethodParams1("admin/display/data","Dealer").subscribe(data=>{
      this.Dealer_Priv=data;
      
    });
    this.service.getDatawithMethodParams1("admin/display/data","Accounts Manager").subscribe(data=>{
      this.AccountsManager_Priv=data;
      
    })
    this.service.getDatawithMethodParams1("admin/display/data","Warehouse Manager").subscribe(data=>{
      this.WarehouseManager_Priv=data;
      
    })

    this.service.getDatawithMethodParams1("admin/display/data","Purchase Manager").subscribe(data=>{
      this.PurchaseManager_Priv=data;
      
    })

    // this.service.getDatawithMethodParams1("admin/display/data","Sales Manager").subscribe(data=>{
    //   this.SalesManager_Priv=data;
      
    // })

    this.service.getDatawithMethodParams1("admin/display/data","Branch Manager").subscribe(data=>{
      this.BranchManager_Priv=data;
    })

    this.service.getDatawithMethodParams1("admin/display/data","Marketing Manager").subscribe(data=>{
      this.MarketingManager_Priv=data;
    })

    this.service.getDatawithMethodParams1("admin/display/data","Admin").subscribe(data=>{
      this.Admin_Priv=data;
    })

    this.service.getDatawithMethodParams1("admin/display/data","Customer").subscribe(data=>{
      this.Customer_Priv=data;
    })

    this.service.getDatawithMethodParams1("admin/display/data","Pos Cleark").subscribe(data=>{
      this.PosCleark_Priv=data;
    })

    this.service.getDatawithMethodParams1("admin/display/data","Shopee Manager").subscribe(data=>{
      this.ShopeeManager_Priv=data;
    })
   }

   edtpriv(){
     this.PrivGraph=!this.PrivGraph;
     this.PrivEdit=!this.PrivEdit;
   }
  
}
