import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from "../../data-service.service";
import { GlobalServiceService } from "../../global-service.service";
import { NgxSpinnerService } from 'ngx-spinner';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
import { ToasterService } from '../../toastr-service.service';
declare var $: any;

@Component({
  selector: 'app-view-more',
  standalone: false,
  templateUrl: './view-more.component.html',
  styleUrls: ['./view-more.component.scss']
})
export class ViewMoreComponent implements OnInit {
  
  p: any = 1;
  page:any=1
  product: any = {}
  profileData: any;
  activatedDataModel: any = {};
  categoryList: any;
  comapnyCodesList: any;
  message: any;
  loginUserData: any;
  branchManagers: any;
  bank_details:any={};
  market_manager_list: {};
  router: any;
  POhidden: boolean = true;
  SOhidden: boolean = false;

  constructor(private dataService: DataServiceService, private globalService: GlobalServiceService, private route: Router,@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private spinner: NgxSpinnerService , private toasterService: ToasterService) { }

  ngOnInit() {
    
    
    this.profileData = JSON.parse(localStorage.getItem('userProfile'));
   if(this.profileData){
     if(this.profileData.transport_dtl){
    this.profileData.transport_dtl=JSON.parse(this.profileData.transport_dtl)
     }
     this.getdata();
    }
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    
  }
  po() {
    this.POhidden = true;
    this.SOhidden = false;
  }
  so() {
    this.POhidden = false;
    this.SOhidden = true;
    this.getdata()
  }
  // =========================product upload======image===============================
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
        this.product = {}
        this.image = ''
     
        if (data['status1']=="Success") {

          // $('#succModal').modal('show');
          this.toasterService.success("Image Uploaded")
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

     // //this.ngxSmartService.getModal('errorModal').open();
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
  onPageChange(Page: number) {
   
    this.page = Page;
    window.scrollTo(0, 0);
 }
  // ==============================================================

}
