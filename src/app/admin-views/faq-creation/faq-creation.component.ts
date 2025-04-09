import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { GlobalServiceService } from '../../global-service.service';
declare var $: any;
@Component({
  selector: 'app-faq-creation',
  standalone: false,
  templateUrl: './faq-creation.component.html',
  styleUrls: ['./faq-creation.component.scss']
})
export class FaqCreationComponent implements OnInit {
  masterData:any={}
Page:any=1
loginUserData:any
offer: any;
  constructor(private service:GlobalServiceService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getfaqdata()
  }
  createcode:boolean=false
  availableoffers:boolean=true
  availoffers(){
    this.createcode=false;
    this.availableoffers=true;
    this.getfaqdata()
   
  }
  createoffers(){
    this.createcode=true;
    this.availableoffers=false;
  }
  getfaq:any
  getfaqdata(){
    this.service.getDataOnlyWithMethod("faqs").subscribe((resp1) =>
    {
     this.getfaq=resp1;
    });
  }
  onSubmit(form: NgForm) {
    this.atributesData(form);
  }
  methodname1:any
  faqresponse:any
  atributesData(form) {
 
    this.methodname1 = "faqs/"
    this.service.postData(this.masterData, this.methodname1).subscribe((data) => {
      this.faqresponse = data;
      this.getfaqdata()
      console.log(data);
      if (this.faqresponse != "") {
        $("#successModal").modal('show');
        form.reset();
      
      }
    })
  }
body:any
  enable(f){
   
    if (f.status == "1") {
      this.body = { "status": 0 }
    }
    else {
      this.body = { "status": 1 }
    }
    return this.service.patchDatawithparam("faqs",f.faq_id,this.body ).subscribe(resp => {
      $('#success').modal('show');
     
      this.getfaqdata();
     
     
    
    })
  }

  editoffer_data:any
  editoffer(data) {
   
    return this.service.getcheckdata("faqs/",data.faq_id ).subscribe(resp => {
      console.log("result", resp);
      this.editoffer_data = resp;
      $('#editoffermodal').modal('show');
    

    })
  }
  editoffer_submit() {
  
    let body = this.editoffer_data;
    return this.service.putDatawithparam( "faqs",this.editoffer_data.faq_id,body ).subscribe(resp => {
      console.log("result", resp);
     
        $('#success').modal('show');
        this.getfaqdata();
     
  
    })
  }
}
