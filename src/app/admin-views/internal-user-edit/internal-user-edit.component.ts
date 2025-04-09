import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DataServiceService } from "../../data-service.service";
import { GlobalServiceService } from "../../global-service.service";
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-internal-user-edit',
  standalone: false,
  templateUrl: './internal-user-edit.component.html',
  styleUrls: ['./internal-user-edit.component.scss']
})
export class InternalUserEditComponent implements OnInit {
  profileData: any;
  designationsList: any;
  companiesList: any;
  updateDataModel: any = {};
  message: any;
  upt: boolean=true;
  

  constructor(private route: Router, private dataService: DataServiceService, private globalService: GlobalServiceService, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.profileData = JSON.parse(localStorage.getItem('userProfile'));
    this.designationsList = this.dataService.getOnLoadServices(36);
    this.companiesList = this.dataService.getOnLoadServices(3.1);
    console.log("pd",this.profileData);
    
  };

  resetForm(form) {
    form.reset();
  };

  updateProfile() {
    // this.spinner.show();
    this.updateDataModel.status = this.profileData.status;
    this.updateDataModel.user_id = this.profileData.user_id;
    this.updateDataModel.user_type = this.profileData.user_type;
    this.updateDataModel.category_profile = this.profileData.category_profile;
    this.updateDataModel.move_to = this.updateDataModel.company_code;
    this.updateDataModel.passing_param = 3;
    var methodName = 'api/registration/';
    this.globalService.postData(this.updateDataModel, methodName).subscribe((data) => {
      // this.spinner.hide();
      if (data['Status'] == 'Update sucessfully') {
        alert(data['Status']);
        this.route.navigateByUrl('/INTERNAL USERS');
      } else {
        alert(data['Status']);
      }
    },
     error => {         this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        // console.log(error);
      });
  }
  updateProfile1(data){
    console.log("final",data);
    data.passing_param = 3;
    var methodName = 'api/registration/';
    this.globalService.postData(data, methodName).subscribe((data) => {
      this.spinner.hide();
      if (data['Status'] == 'Update sucessfully') {
        this.upt=!this.upt;
       this.message="Update sucessfully";
       $('#updsuccess').modal('show');
        
       
      } else {
        alert(data['Status']);
      }
    },
     error => {         this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        // console.log(error);
      });

  }
  gotointernalusers(){
this.route.navigateByUrl('/INTERNAL USERS');
  }

}
