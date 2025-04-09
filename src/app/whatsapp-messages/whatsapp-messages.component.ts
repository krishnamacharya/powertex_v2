import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../global-service.service';
import { ToasterService } from '../toastr-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
import { NgForm } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-whatsapp-messages',
  standalone: false,
  
  templateUrl: './whatsapp-messages.component.html',
  styleUrl: './whatsapp-messages.component.scss'
})
export class WhatsappMessagesComponent  implements OnInit {
  loginUserData:any
  page:any=1 
  details:any=[]
  details1:any=[]
  body = {};
  method: any;
  pro:any= {};
  commenting:any;
  message:any;
  suppliername:any;
  feedrespdata: any;
  POhidden: boolean = true;
  DOhidden: boolean = false;
  finalform: any;
  constructor(private globalservice:GlobalServiceService,
    private toasterService: ToasterService,
   public dialog: MatDialog,
    private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.po();
    this.discounts()
  }
  po() {
    this.POhidden = true;
    this.DOhidden = false;
    this.discounts()
  }
  discounts(){
    this.spinner.show()
     this.globalservice.getcheckdata("sup/feedback1/",'').subscribe((data) => {
       this.details1 = data;
       this.details = this.details1.filter((a) => { return a.returnby == '0'})
       console.log(data,'data')
       console.log(this.details,'this.details')
        this.spinner.hide()
     },
    error => {
               this.spinner.hide();
               this.dialog.open(ErrorModalComponent, {
                 data: { errorModal:true }
               });
               // this.ngxSmartService.getModal('errorModal').open();
         
             });
   }
  //  supplierid : any;
  //  comment(data) {
  //    this.supplierid = data.supplierid;
  //   $('#comment').modal('show');
  // }
  confirm_sub(commenting){
    if(!commenting){
    // this.toasterService.warning ('Fill input fields');
    return false;
    }
    // this.feedbackdata={'supplierid':this.loginUserData.user_id, 'business_name':this.loginUserData.business_name, 'subject':title, 'comment':description, 'returnby':1};
  this.body={'business_name': 'Admin','subject':'', 'comment':commenting, 'returnby':1, 'supplierid':this.supid, 'date':new Date(), 'isnew':1 };
  this.method =  "sup/feedback1/";
  this.spinner.show();
  this.globalservice.postData(this.body,this.method).subscribe((data) => {
    this.feedrespdata = data;
    //Refresh
    this.globalservice.getcheckdata("sup/feedback1/", this.supid).subscribe((data) => {
      this.feeddtls = data;});

    this.spinner.hide();
    this.toasterService.success ('Your Reply has been submitted successfully');
    this.discounts();
  },
  error => {
    this.spinner.hide();
    this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
    // this.ngxSmartService.getModal('errorModal').open();

  });
    //  $("#successModal").modal('show');
    return true;
 }

   //Get data
  feeddtls:any=[]
  busname : any;
  supid : any;
  Chat(data){
    this.busname = data.business_name;
    this.supid = data.supplierid;
    this.spinner.show()
     this.globalservice.getcheckdata("sup/feedback1/", this.supid).subscribe((data) => {
       this.feeddtls = data;
       console.log(data,'data')
       console.log(this.feeddtls,'this.feeddtls')
        this.spinner.hide()
    $('#chatModaledit').modal('show');
  },
  error => {
    this.spinner.hide();
    this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
    // this.ngxSmartService.getModal('errorModal').open();

  });
   }
   //Sending to Supplier
   do() {
    this.POhidden = false;
    this.DOhidden = true;
    this.getsuppliers();
  }
  suppliers: any = []
  getsuppliers() {
    this.globalservice.getDataOnlyWithMethod("sup/skuprifix").subscribe((data) => {
      this.suppliers = data;
    });
  }

  Sendsupplier(message){
  if(!message){
    this.toasterService.warning ('Fill input fields');
    console.log(this.suppliername,'this.suppliername')
    return false;
  }
  // this.feedbackdata={'supplierid':this.loginUserData.user_id, 'business_name':this.loginUserData.business_name, 'subject':title, 'comment':description, 'returnby':1};
  this.body={'business_name': 'Admin','subject':'', 'comment':message, 'returnby':1, 'supplierid':this.suppliername.user_id, 'date':new Date(), 'isnew':1 };
  this.method =  "sup/feedback1/";
  this.spinner.show();
  this.globalservice.postData(this.body,this.method).subscribe((data) => {
    this.feedrespdata = data;

    this.spinner.hide();
    this.toasterService.success ('Your Message has been sent...');
      this.po();
  },
  error => {
    this.spinner.hide();
    this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
    // this.ngxSmartService.getModal('errorModal').open();

  });
  return true;
    //  $("#successModal").modal('show');
  
 }
 onSubmit(form: NgForm) {
  if(this.pro.type && this.pro.id && this.pro.url && this.pro.ttype){
    this.atributesData(this.finalform);
  }else{
    this.toasterService.error("Please fill all mandatory fields");
  }
  

}
methodname:any;
atributesData(form) {

  this.spinner.show();
  this.body = { "type": this.pro.type, "id": this.pro.id, "url": this.pro.url, "parameter1": this.pro.parameter1 ,"parameter2": this.pro.parameter2
  , "parameter3": this.pro.parameter3 ,"parameter4": this.pro.parameter4 ,"ttype": this.pro.ttype };
  console.log("body", this.body)
  this.spinner.show();
  this.methodname = "sup/socialm/";
  this.globalservice.postData(this.body, this.methodname).subscribe((data) => {
    this.spinner.hide();
    console.log(data);
    if (data['status'] == 'ok') {
      this.spinner.hide();
      // $("#successModal").modal('show');
      // form.reset();
      this.pro = {};
    }
    this.spinner.hide();
  },
    error => {
              this.spinner.hide();
              this.dialog.open(ErrorModalComponent, {
                data: { errorModal:true }
              });
              // this.ngxSmartService.getModal('errorModal').open();
        
            });
    this.spinner.hide();

}

}

