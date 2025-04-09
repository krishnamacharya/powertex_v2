import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServiceService } from '../../global-service.service';

@Component({
  selector: 'app-dealer-shopee',
  standalone: false,
  templateUrl: './dealer-shopee.component.html',
  styleUrls: ['./dealer-shopee.component.scss']
})
export class DealerShopeeComponent implements OnInit {
  loginUserData: any;
  token: any;
  Delhidden: boolean = true;
  Shophidden: boolean = false;
  RDelhidden: boolean = false;
  RShophidden: boolean = false;
  avail_dealers: any;
  avail_shopees: any;
  reject_dealers:any
  reject_shopees:any
  ht_data: any;
  page:any=1
  constructor(private service:GlobalServiceService,private router:Router) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.A_dealers();
   
  }
  A_dealers(){
    this.Delhidden = true;
    this.Shophidden = false;
    this.RDelhidden = false;
    this.RShophidden = false;
    
    this.service.getDatawithQueryParams3("5.12",this.loginUserData.company_code,"DEALER","A").subscribe((data)=>{
  
      this.avail_dealers=data;
      console.log("active Dealers",data);
     
    });
  };
  A_shopees(){
    this.Delhidden = false;
    this.Shophidden  = true;
    this.RDelhidden = false;
    this.RShophidden  = false;
    this.service.getDatawithQueryParams2("5.12",this.loginUserData.company_code,"SHOPEE").subscribe((data)=>{
      this.avail_shopees=data;
      console.log("active Shopees",data);
     
    });
  }
  R_dealers(){
    this.Delhidden = false;
    this.Shophidden  = false;
    this.RDelhidden = true;
    this.RShophidden  = false;
    this.service.getDatawithQueryParams3("5.12",this.loginUserData.company_code,"DEALER","R").subscribe((data)=>{
        this.reject_dealers=data;
    
    });
  }
  R_shopees(){
   
    this.service.getDatawithQueryParams3("5.12",this.loginUserData.company_code,"SHOPEE","P").subscribe((data)=>{
      this.reject_shopees=data;
      this.Delhidden = false;
      this.Shophidden  = false;
      this.RDelhidden = false;
      this.RShophidden  = true;
  });

  }
}
