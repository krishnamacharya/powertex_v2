import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { DatePipe } from '@angular/common';
import { GlobalServiceService } from '../../global-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Component({
  selector: 'app-promocodes-creation',
  standalone: false,
  templateUrl: './promocodes-creation.component.html',
  styleUrls: ['./promocodes-creation.component.scss']
})
export class PromocodesCreationComponent implements OnInit {
  Page:any=1
  masterData: any = {};
  loginUserData: any
  promocodesdata:any
  constructor(private DatePipe: DatePipe, private spinner: NgxSpinnerService,private router:Router,private globalservice:GlobalServiceService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getoffers()
    this.getoffertypes()
    this.getapplicables()
  }
  onSubmit(form: NgForm) {
    this.atributesData(form);
  }
  methodname:any
  atributesData(form) {
    
    
    if (this.masterData.offertype == "Coupon") {
      this.masterData.promocodename=null
      this.masterData.promo_title=null
    }
    this.masterData.fromdate = this.DatePipe.transform(this.masterData.fromdate, "yyyy-MM-dd")
    this.masterData.todate = this.DatePipe.transform(this.masterData.todate, "yyyy-MM-dd")
    if(JSON.parse(this.masterData.amount)>=JSON.parse(this.masterData.minorderamount)){
      
      this.errmsg=true;
    }
    else{
      this.errmsg=false
    
    this.methodname = "promocode/pro/"
    this.globalservice.postData(this.masterData, this.methodname).subscribe((data) => {
     
      this.promocodesdata = data;
      this.getoffers()
      console.log(data);
      if (this.promocodesdata != "") {
        $("#successModal").modal('show');
       
        form.reset();
        this.masterData.offertype=undefined
        this.getoffertypes()
        this.getapplicables()
      }
    })
  }
}
  getmethodname:any
  offerdetails:any
  getoffers(){
    this.spinner.show()
    this.getmethodname="promocode/pro"
   
    this.globalservice.getDataOnlyWithMethod(this.getmethodname).subscribe((resp1) =>
   
    {
     this.offerdetails=resp1;
     this.spinner.hide()
     
    });
  }
  getmethodname1:any
  offertypes:any
  getoffertypes(){
  
    this.getmethodname1="promocode/offertype"
   
    this.globalservice.getDataOnlyWithMethod(this.getmethodname1).subscribe((resp1) =>
   
    {
     this.offertypes=resp1;
    });
  }
  errmsg:boolean=false
  changeamount(editoffer_data){
    
    if(JSON.parse(editoffer_data.amount)>=JSON.parse(editoffer_data.minorderamount)){
      this.errmsg=true;
    }
    else{
      this.errmsg=false
    }
  }
  getmethodname2:any
  applicables:any=[]
  getapplicables(){
   
    this.getmethodname2="promocode/applicable"
   
    this.globalservice.getDataOnlyWithMethod(this.getmethodname2).subscribe((resp1) =>
   
    {
     this.applicables=resp1;
    });
  }
  createcode:boolean=false
  availableoffers:boolean=true
  createoffers(){
    this.createcode=true;
    this.availableoffers=false;

    // this.router.navigate(['/Admin-OFFERS',this.applicables])
  }
  availoffers(){
    this.createcode=false;
    this.availableoffers=true;
    this.getoffers()
   
  }
  keypress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  editoffer_data:any
  editoffer(data) {
    
    return this.globalservice.getDataOnlyWithMethod("promocode/pro/"+data.seq_no ).subscribe(resp => {
      console.log("result", resp);
      this.editoffer_data = resp;
      $('#editoffermodal').modal('show');
      // this.edit_sku_no = this.edit_offer_data[0].sku_no;
      // console.log("sku",sku);

    })
  
  }
  editoffer_submit() {
    
    let body = this.editoffer_data;
    return this.globalservice.updateData(body, "promocode/pro/"+this.editoffer_data.seq_no+"/" ).subscribe(resp => {
      console.log("result", resp);
     
        $('#success').modal('show');
        this.getoffers();
     
      // $('#edit_modal').modal('show');

    })
  
  }
body:any
  enable(offer){
    
    if (offer.active == "1") {
      this.body = { "active": 0 }
    }
    else {
      this.body = { "active": 1 }
    }
    return this.globalservice.patchDatawithbodyparam1("promocode/pro/",offer.seq_no,this.body ).subscribe(resp => {
      $('#success').modal('show');
     
      this.getoffers();
     
     
    
    })
  }
}
