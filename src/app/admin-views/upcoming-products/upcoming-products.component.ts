import { Component, OnInit } from '@angular/core';
declare var $: any;
import { NgForm } from "@angular/forms";
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../../global-service.service';
@Component({
  selector: 'app-upcoming-products',
  standalone: false,
  templateUrl: './upcoming-products.component.html',
  styleUrls: ['./upcoming-products.component.scss']
})
export class UpcomingProductsComponent implements OnInit {
  loginUserData: any
  Page: any = 1
  UPhidden: boolean = true;
masterData:any={}
enquiry:any={}
  ELhidden: boolean = false;
  constructor(private service: GlobalServiceService,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getproductdata()
  }
  el() {

    this.UPhidden = false;
    this.ELhidden = true;
    this.availableenq=true;
    this.getenquirydata()
  }
  up() {

    this.UPhidden = true;
    this.ELhidden = false;
    this.availableenq=false;
    this.getproductdata()
  }
  createcode:boolean=false
  availableoffers:boolean=true
 
  availableenq:boolean=true
  availoffers(){
    this.createcode=false;
    this.availableoffers=true;
    this.availableenq=false;
    this.getproductdata()
   
  }
  createoffers(){
    this.createcode=true;
    this.availableoffers=false;
    this.availableenq=false;
  }
  getupcoming_products: any
  getproductdata() {
    this.service.getDataOnlyWithMethod("upcomingprdlist").subscribe((resp1) => {
      this.getupcoming_products = resp1;
      console.log(this.getupcoming_products)
    });
  }
  getupcoming_enquiries: any
  getenquirydata() {
    this.service.getDataOnlyWithMethod("upcoming").subscribe((resp1) => {
      this.getupcoming_enquiries = resp1;
      console.log(this.getupcoming_enquiries)
    });
  }
  // address ="https://s3.ap-south-1.amazonaws.com/gstbucket1/Powertexmodel/101_UP_SCREW%20DRIVER%20BITS.png"
  address ="https://s3.ap-south-1.amazonaws.com/gstbucket1/Powertexmodel/"
  onSubmit(form: NgForm) {
    this.masterData.image =  this.address + this.masterData.image;
    this.atributesData(form);
  }
  methodname1:any
  response:any
  atributesData(form) {
  
    this.methodname1 = "upcomingprdlist/"
    this.service.postData(this.masterData, this.methodname1).subscribe((data) => {
      this.response = data;
      this.getproductdata()
      console.log(data);
      if (this.response != "") {
        $("#successModal").modal('show');
        form.reset();
      
      }
    })
  }
  body: any
  enable(f) {

    if (f.status == "1") {
      this.body = { "status": 0 }
    }
    else {
      this.body = { "status": 1 }
    }
    return this.service.patchDatawithbodyparam1("upcomingprdlist/", f.upcoming_id, this.body).subscribe(resp => {
      $('#success').modal('show');

      this.getproductdata();



    })
  }
  editproduct_data: any
  editproduct(data) {
   
    return this.service.getDataOnlyWithMethod("upcomingprdlist/"+ data.upcoming_id).subscribe(resp => {
      console.log("result", resp);
      this.editproduct_data = resp;
      $('#editoffermodal').modal('show');


    })
  }
  editproduct_submit() {
    console.log("edit data", this.editproduct_data);
    this.editproduct_data.image =  this.address + this.editproduct_data.image;
    let body = this.editproduct_data;
    return this.service.updateData(body, "upcomingprdlist/"+ this.editproduct_data.upcoming_id+"/").subscribe(resp => {
      console.log("result", resp);
      if (resp['status'] == 1) {
        $('#success').modal('show');
        this.getproductdata();
      }
      // $('#edit_modal').modal('show');

    })
  }
}
