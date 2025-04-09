import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServiceService } from '../../global-service.service';
import { DataServiceService } from "../../data-service.service";
import { ToasterService } from '../../toastr-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
import { ViewMoreComponent } from '../view-more/view-more.component';
declare var $: any;

@Component({
  selector: 'app-register-profile',
  standalone: false,
  templateUrl: './register-profile.component.html',
  styleUrls: ['./register-profile.component.scss']
})
export class RegisterProfileComponent implements OnInit {
  regList: any = [];
  p: any = 1;
  searchText: any;
  branchcode:any;
  rejectData: any = {};
  rejData: any;
  @Input() underProcessId: number = 5;
  passingParam: any;
  alert: boolean;
  wish_alert: any;
  icon: boolean;
  branchesList: any;
  userModel: any = {};
  branch: any;
  loginUserData: any;
  RejectQns:any;
 


  constructor(private route: Router, private profileService: GlobalServiceService, private toasterService: ToasterService,
    private dataService: DataServiceService, private dialog: MatDialog, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.alert = false;
    if (this.underProcessId == 5) {
      this.loginUserData.company_code = '';
      this.branchesList = this.dataService.getOnLoadServices(1.8);
    }
    if (this.underProcessId == 1) {
      this.passingParam = 'UP';
    } 
    if(this.underProcessId == 6){
      
      this.passingParam = 'I';
    }
    else {
      this.passingParam = 'P';
    }
    this.getRegisterdUsers();
  }
  getregistereddata:any
  getRegisterdUsers() {
    this.spinner.show();
    
    this.regList=[]
    this.profileService.getDatawithQueryParams1nd4(3.5, this.passingParam, this.loginUserData.company_code).subscribe((data) => {
      this.getregistereddata=data
      this.spinner.hide();
       if (this.getregistereddata.length > 0)
        this.regList = data;
       else {
        
      }
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        
      });
  };


  getBranchValue(branch) {
    var branch_code = branch.substring(branch.lastIndexOf("-") + 1, branch.length);
    this.branch = branch_code;
  };

  movetoBranch(userData) {
    if (this.branch != '' && this.branch != undefined) {
      this.spinner.show();
      userData.status = "p";
      userData.company_code = this.branch;
      userData.passing_param = 2;
      userData.move_to = this.branch;
      var methodName = 'api/registration/';
      this.profileService.postData(userData, methodName).subscribe((data) => {
        this.spinner.hide();
        if (data['Status'] == 'Update sucessfully') {
          $('#moveBranchModal').modal('show');
          this.getRegisterdUsers();
        } else {
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
    } else {
      alert('Please Select branch');
    }

  }

  reject(data) {
    this.rejData = data;
    $('#confirmModal').modal('show');
  };

  confirm() {
    this.spinner.show();
    $('#confirmModal').modal('hide');
    if(this.rejData.status=="I"){
      this.rejectData.status = 'A';
      this.rejectData.category_profile = this.rejData.category_profile;
      this.rejectData.credit_limit = this.rejData.credit_limit;
    this.rejectData.credit_period = this.rejData.credit_period;
    this.rejectData.turnover = this.rejData.turnover;
    this.rejectData.mobile = this.rejData.mobile;
    this.rejectData.email = this.rejData.email;
    this.rejectData.handling_marketing_manager = this.rejData.handling_marketing_manager;
    }
    else{
      this.rejectData.status = 'R';
      }
    this.rejectData.passing_param = 2;
    this.rejectData.user_type = this.rejData.user_type;
    this.rejectData.user_id = this.rejData.user_id;
    this.rejectData.move_to = this.rejData.move_to;
    this.rejectData.company_code = this.rejData.company_code;
    var methodName = 'api/registration/';
    this.profileService.postData(this.rejectData, methodName).subscribe((data) => {
      this.spinner.hide();
      if (data['Status'] == 'Update sucessfully') {
        this.wish_alert = data['Status'];
        this.addwish();
        this.icon = true;
        this.getRegisterdUsers();
      } else {
        this.wish_alert = "Error"
        this.addwish();
        this.icon = true;
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

  addwish() {
    this.alert = true;
    setInterval(() => {
      this.alert = false;
    }, 5000);
  }

  viewMore(data) {
    // this.ngxSmartService.resetModalData('viewmoreModal');
    // this.ngxSmartService.setModalData(data, 'viewmoreModal');
    // this.ngxSmartService.getModal('viewmoreModal').open();
    this.dialog.open(ViewMoreComponent, {
      data: data
    });
  };

  approve(data) {
    this.dataService.saveData(data);
    localStorage.setItem('userProfile', JSON.stringify(data));
    this.route.navigate(['/register-profile-info']);
  };








}
