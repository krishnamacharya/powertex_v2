import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from "../../data-service.service";
import { GlobalServiceService } from "../../global-service.service";
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
import { ToasterService } from '../../toastr-service.service';
declare var $: any;

@Component({
  selector: 'app-register-profile-info',
  standalone: false,
  templateUrl: './register-profile-info.component.html',
  styleUrls: ['./register-profile-info.component.scss']
})
export class RegisterProfileInfoComponent implements OnInit {
  PUrl: any;
  page:any=1
  p:any=1
  product: any = {}
  profileData: any;
  activatedDataModel: any = {};
  categoryList: any;
  comapnyCodesList: any;
  message: any;
  loginUserData: any;
  branchManagers: any;
  bank_details:any={};
  market_manager_list:any;
  router: any;
  constructor(private dataService: DataServiceService, private globalService: GlobalServiceService, private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService , private toasterService: ToasterService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    if (this.loginUserData === null) {
      this.route.navigateByUrl('home');
    }
    this.PUrl = window.location.href.substr(window.location.href.length - 5)
    this.profileData = JSON.parse(localStorage.getItem('userProfile'));
   
    this.profileData.transport_dtl=JSON.parse(this.profileData.transport_dtl)
    this.categoryList = this.dataService.getOnLoadServices(50);
    this.getmarketing_manager();
    this.gettransportdata()
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getdata()
  }
  transportdetails:any
  gettransportdata() {
    this.globalService.getDataOnlyWithMethod("transport1").subscribe((resp1) => {
      this.transportdetails = resp1;
      console.log(this.transportdetails)
    });
  }
  getmarketing_manager(): any {
   return this.globalService.getDatawithMethodParams1("market/manager_drop/",this.loginUserData.company_code).subscribe(data=>{
     this.market_manager_list=data;
     console.log("marketing",this.market_manager_list);
     
   })
  }
  keypress(event: any) {
    console.log(event,"event")
    const pattern = /^[A-Za-z0-9&' '.-]+$/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  mailValidation: boolean = false;
  mobileValidation: boolean = false;
  verifyUser(data, field) {
    
    //  this.spinner.show();
    if(field=="mobile"){
      data=data
    }
    this.globalService.getDatawithQueryParams1(4.9, data).subscribe((data) => {
      //   this.spinner.hide();
      if (data['status'] == "1") {
        if (field == 'email') {
          this.mailValidation = true;
        } 
        if (field == 'mobile'){
          this.mobileValidation = true;
        }
      } else {
        if (field == 'email') {
          this.mailValidation = false;
        } 
        if (field == 'mobile') {
          this.mobileValidation = false;
        }
      }
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        // console.log(error);
      });
  }
  getBranchManagers() {
    this.globalService.getDatawithQueryParams1(1.8, 'Branch Manager').subscribe(data => {
      this.branchManagers = data;
    });
  }

  regProfileSave(status) {
   
    // this.spinner.show();
    this.profileData.status = status;
    this.profileData.passing_param = 3;
    this.activatedDataModel.user_type = this.profileData.user_type;
    this.activatedDataModel.user_id = this.profileData.user_id;
    this.activatedDataModel.company_code = this.profileData.company_code;
    this.activatedDataModel.move_to = this.profileData.move_to;
    this.profileData.bank_details=this.bank_details;
    console.log("profile data",this.profileData);
    
    var methodName = 'api/registration/';
    this.globalService.postData(this.profileData, methodName).subscribe((data) => {
      // this.spinner.hide();
      if (data['Status'] == 'Update sucessfully') {
       
        this.message = data['Status'];
        $('#editApproveModal').modal('show');
        this.router.navigateByUrl('/register-profile-info');
      } else {
        alert(data['Status']);
      }
    },
      error => {
        // this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      });
  }
  keynumber(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  regProfileapprove(status) {
   
    this.spinner.show();
    this.profileData.status = status;
    this.profileData.passing_param = 2;
    this.activatedDataModel.user_type = this.profileData.user_type;
    this.activatedDataModel.user_id = this.profileData.user_id;
    this.activatedDataModel.company_code = this.profileData.company_code;
    
    this.activatedDataModel.move_to = this.profileData.move_to;
    this.profileData.bank_details=this.bank_details;
    console.log("profile data",this.profileData);
    
    var methodName = 'api/registration/';
    this.globalService.postData(this.profileData, methodName).subscribe((data) => {
      this.spinner.hide();
      if (data['Status'] == 'Update sucessfully') {
        this.message = data['Status'];
        $('#editApproveModal').modal('show');
      } else {
        this.spinner.hide();
        alert(data['Status']);
      }
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      });
  }

  gotoUsers() {
    this.route.navigate(['/'+this.loginUserData.designation+'-ACTIVE DEALERS']);
  }

  // =========================product upload======image===============================
  image: any
  file: File
  productfileUpload(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0]
      var reader = new FileReader();
      reader.onload = (event: any) => {
        //me.modelvalue = reader.result;
        this.image = event.target.result
        console.log(event.target.result);
      };
      reader.readAsDataURL(this.file);
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  };
  methodname: any
  body: any
  response: any
  uploadData() {
    
    if (this.product.type && (this.product.file || this.product.order)) {
      this.methodname = "ImageUploadView/";
      if(this.image){
        
      this.body = { "processes": this.product.type, "userid": this.profileData.user_id, "image": this.image ,"descripts":this.product.order};
      }
      else{
        this.body = { "processes": this.product.type, "userid": this.profileData.user_id, "image": null,"descripts":this.product.order};
      }
      this.globalService.postData(this.body, this.methodname).subscribe((data) => {
        console.log(data);
        // this.product = {}
        this.image = ''
     
        if (data['status1']=="Success") {

          // $('#succModal').modal('show');
          this.toasterService.success("Image Uploaded")
          this.getdata()
        }
      },
        error => {

          //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
          // console.log(error);
        });
    }
    else {
      this.toasterService.error("Please fill all mandatory fields")
    }
  }
  url:any
  getdata() {
    
    this.methodname = "ImageUploadView/";
    this.globalService.getDatawithMethodParams3(this.methodname,this.profileData.user_id,"","").subscribe((data) => {
      this.response = data
      this.url = this.globalService.imageurl
      if(this.response.length>0){
        this.response.forEach(x =>  {
          if(x.image!=null){
          x.image =  this.url+x.image
          }
       })
       console.log(this.response,"response") 
      }
    },
    error => {

      //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      // console.log(error);
    })
  
  }
  types = [
    { name: 'Advance cheque/GST Copy' },
    // { name: 'Service' },
    // { name: 'Pending' }


  ];
  // ==============================================================


}
