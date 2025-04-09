import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GlobalServiceService } from '../../global-service.service';
import { formatDate } from '@angular/common';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-pos-new-user',
  standalone: false,
  templateUrl: './pos-new-user.component.html',
  styleUrls: ['./pos-new-user.component.scss']
})
export class PosNewUserComponent implements OnInit {

  @Output() public childEvent = new EventEmitter();

  isModal: boolean;
  loginUserData: any;
  today = new Date();
  tday = +this.today;
  headeDetails: any;
  headerData: any;
  loginMethod: string;
  body: any;
  constructor(private service: GlobalServiceService, private router: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    console.log(this.loginUserData);
    this.spinner.show();
    this.service.getHeaderDetails(1, this.loginUserData.user_id).subscribe((data) => {
      this.spinner.hide();
      this.headeDetails = data[0];
      this.headerData = {
        document_no: 1,
        document_date: formatDate(this.today, 'yyyyMMdd', 'en-US'),
        dest_company_code: this.headeDetails.handling_company_code,
        dest_user_id: this.headeDetails.handling_company_sales_manager,
        source_company_code: this.headeDetails.user_id + "@" + this.headeDetails.company_code,
        source_user_id: this.headeDetails.user_id,
        inv_type: "DOM",
        shipment_point: 0,
        payment_terms: "",
        currency_code: "",
        exchange_rate: 0.00,
        spl_instr: ""

      }
      console.log(this.headerData);
    },
     error => {         
       this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  }
  userdata: any = {};
  fire() {
    this.isModal = false;
    this.childEvent.emit(this.isModal);
  }
  POS: any = [];
  user_data(data) {
    // console.log("Data-user", data);
    // console.log("from Array", this.userdata);
    // this.POS.push(data);
    // console.log("pos", this.POS);
    // this.userdata.last_name = "";
    // this.userdata.salatation = "";
    this.userdata.user_type = "POS";
    this.userdata.passing_param = 1;
    // this.userdata.zone = data.country;
    // this.userdata.address1 = data.country;
    // this.userdata.address2 = data.country;
    // this.userdata.password = data.first_name;
    // this.headerData.shipping_seq_no=this.shipping_seq_no;
    // this.headerData.billing_seq_no=this.billing_seq_no;
    // let process_in='PO';
    // let operation_in='INSERT';
    // let draft_final_in='FINAL';
    // let document_no_out='';
    // let message_out='';
    this.loginMethod = 'api/registration/';

    console.log("total orders:", this.userdata);
    // this.body = {"process_in": process_in,"json_hdr": this.headerData , "json_dtl":data,"operation_in":operation_in, "draft_final_in":draft_final_in,"document_no_out":document_no_out,"message_out":message_out };
    // console.log("jjjj",this.body);
    // let myJSON = JSON.stringify(this.body);
    // console.log(myJSON);

    this.service.postData(this.userdata, this.loginMethod).subscribe((data) => {
      console.log(data);
      this.spinner.hide();
      // if(data.Message=="PO Sucessfully inserted "){
      //   alert("Your Order was Successfully Placed");
      //   let sms_body={"msg":data.Message +", Your Po Number is " +data.PO,"num":"7396310580" };
      //   let login_method="SMS/";
      //   let mail_method="mail/"
      //   this.service.postData(sms_body,login_method).subscribe((data) =>{
      //     console.log(data);
      //   });

      //   let mail_body={"to":"shivakrishna@goldensuntechnology.com,kurra.shiva@gmail.com", "msg":data.Message+" Supplier has received a purchase order from Purchase manager and need an acknowledgement with PO No"+data.PO,"subject":"Acknowledgement for purchase order" }
      //   this.service.postData(mail_body,mail_method).subscribe((data) =>{
      //     console.log(data);
      //   });
      //   this.router.navigateByUrl('/dealer-dashboard');
      // }
    },
     error => {         this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  }

}
