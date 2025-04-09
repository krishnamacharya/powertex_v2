import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { GlobalServiceService } from '../global-service.service';
declare var $: any;
@Component({
  selector: 'app-notification-status',
  standalone: false,
  templateUrl: './notification-status.component.html',
  styleUrls: ['./notification-status.component.scss']
})
export class NotificationStatusComponent implements OnInit {
offer: any;
getfaq: any;
createoffers() {
throw new Error('Method not implemented.');
}
  masterData: any = {}
  Page: any = 1
  loginUserData: any
  constructor(private service: GlobalServiceService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getNotificationStatus()
  }
  createcode: boolean = false
  availableoffers: boolean = true
  availoffers() {
    //this.createcode=false;
    // this.availableoffers=true;
    this.getNotificationStatus()

  }

  /*  createoffers(){
     this.createcode=true;
     this.availableoffers=false;
   } */


  // getfaq:any
  // getfaqdata(){
  //   this.service.getDataOnlyWithMethod("faqs").subscribe((resp1) =>
  //   {
  //    this.getfaq=resp1;
  //   });
  // }
  getnoti: any;
  getNotificationStatus() {

    this.service.getDataOnlyWithMethod("api/SmsNotiDepViewset").subscribe((resp1) => {
      this.getnoti = resp1
    });
  }


  onSubmit(form: NgForm) {
    this.atributesData(form);
  }
  methodname1: any
  faqresponse: any
  // atributesData(form) {

  //   this.methodname1 = "faqs/"
  //   this.service.postData(this.masterData, this.methodname1).subscribe((data) => {
  //     this.faqresponse = data;
  //     this.getfaqdata()
  //     console.log(data);
  //     if (this.faqresponse != "") {
  //       $("#successModal").modal('show');
  //       form.reset();

  //     }
  //   })
  // }
  notiresponse: any
  atributesData(form) {


    this.methodname1 = "api/SmsNotiDepViewset/"
    this.service.postData(this.masterData, this.methodname1).subscribe((data) => {
      this.notiresponse = data;
      this.getNotificationStatus()
      console.log(data);
      if (this.notiresponse != "") {
        $("#successModal").modal('show');
        form.reset();

      }
    })
  }

  body: any
  enable(f) {


    if (f.status == "Y") {
      this.body = { "status": 'N' }
    }

    else {
      this.body = { "status": 'Y' }
    }
    return this.service.patchDatawithparam2("api/SmsNotiDepViewset", f.seq_no, this.body).subscribe(resp => {
      $('#success').modal('show');

      this.getNotificationStatus();



    })
  }

  editoffer_data: any
  editoffer(data) {


    return this.service.getcheckdata("api/SmsNotiDepViewsetqs/", data.seq_no).subscribe(resp => {
      console.log("result", resp);
      this.editoffer_data = resp;
      $('#editoffermodal').modal('show');


    })
  }
  editoffer_submit() {


    let body = this.editoffer_data;
    return this.service.putDatawithparam("api/SmsNotiDepViewset", this.editoffer_data.faq_id, body).subscribe(resp => {
      console.log("result", resp);

      $('#success').modal('show');
      this.getNotificationStatus();


    })
  }
}

