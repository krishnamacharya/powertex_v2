import { Component, OnInit } from '@angular/core';
declare var $: any;
import { NgForm } from "@angular/forms";
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../../global-service.service';
@Component({
  selector: 'app-transport-master',
  standalone: false,
  templateUrl: './transport-master.component.html',
  styleUrls: ['./transport-master.component.scss']
})
export class TransportMasterComponent implements OnInit {
  loginUserData:any
  createcode:boolean=false
  availabletransport:boolean=true
  masterData:any={}
  Page:any=1
  constructor(private service: GlobalServiceService,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.gettransportdata()
  }
  availtransport(){
    this.createcode=false;
    this.availabletransport=true;
 
    this.gettransportdata()
   
  }
  createtransport(){
    this.createcode=true;
    this.availabletransport=false;
  
  }
  keypress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  transportdetails:any
  gettransportdata() {
    this.spinner.show()
    this.service.getDataOnlyWithMethod("transport1").subscribe((resp1) => {
      this.transportdetails = resp1;
      this.spinner.hide()
      console.log(this.transportdetails)
    });
  }
  onSubmit(form: NgForm) {
    this.atributesData(form);
  }
  methodname1:any
  response:any
  atributesData(form) {
  
    this.methodname1 = "transport1/"
    this.service.postData(this.masterData, this.methodname1).subscribe((data) => {
      this.response = data;
      this.gettransportdata()
     
      console.log(data);
      if (this.response != "") {
        $("#successModal").modal('show');
        form.reset();
      
      }
    })
  }
}
