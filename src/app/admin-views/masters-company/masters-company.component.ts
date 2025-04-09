import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServiceService } from '../../global-service.service';
import { DataServiceService } from '../../data-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;

@Component({
  selector: 'app-masters-company',
  standalone: false,
  templateUrl: './masters-company.component.html',
  styleUrls: ['./masters-company.component.scss']
})
export class MastersCompanyComponent implements OnInit {
  response1: any;
  response: any;
  countriesList: any;
  country: any;
  response2: any;
  state: any;
  response3: any;
  accManagersList: any;
  salesManagersList: any;
  handlingCompanyCodesList: any;
  regProfileInfo: any = {};
  ACC: any;
  SM: any;
  loginUserData: any;
  PurchaseManagersList: any;
  wareHouseManagersList: any;
  ownerTypeList: any;
  shopTypeList: any;
  categoryList: any;
  isBusiness:boolean=false;
  avail_Branches:boolean=true;
  compDetails:boolean=false;
  comp_new: any;
  currenturl: string;
  setup: string;
  Role: string;
  gstdata: any;
  incoterms: any;
  d_data:any;
  Emp_data:any={};
  selectedEmp:Array<any> = [];
  designationsList: any;
  passing:number=1;
  emp_t:boolean=false;
  mailValidation: boolean = false;
  mobileValidation: boolean = false;
  message: any;
  branchesList: any;
  code: number=0;
  code1: number=0;
  view_d: any;
  dis_data: any;
  Message: any;
  P:any = 1;
  Page=1;
  bank_details:any={};
  dealers: any;
  shopees: any;
  branch: any;
  constructor(private route: Router, private masterComany: GlobalServiceService, private dataService: DataServiceService, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.currenturl= this.route.url;
    let url1=this.currenturl.substr(7);
    let re = /%20/gi;
    this.setup= url1.replace(re," ");
    // alert(this.setup);
    this.get_set();
    this.get_incoterms();
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.countriesList = this.dataService.getOnLoadServices(19);
    this.designationsList = this.dataService.getOnLoadServicesparam1(36.1,this.Role);
    this.handlingCompanyCodesList = this.dataService.getOnLoadServicesparam1(1.81,this.Role);
    // this.handlingCompanyCodesList = this.dataService.getOnLoadServices(1.4);
    this.ownerTypeList = this.dataService.getOnLoadServices(1.7);
    this.shopTypeList = this.dataService.getOnLoadServices(1.6);
    this.categoryList = this.dataService.getOnLoadServices(50);
    this.getBranches();
    // this.bank_details.branch
  };
  keynumber(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  getBranches(){
    this.spinner.show();
    return this.masterComany.getDatawithQueryParams1('1000',this.Role).subscribe((data)=>{
      this.branchesList = data;
      this.spinner.hide();
    });
    
  }
  get_set(){
    if(this.setup=="BRANCH SETUP"){
     return this.Role="Branch";
     
    }
    else if(this.setup=="SHOPEE SETUP"){
      return this.Role="Shopee";
    }
    else{
     return  this.Role="Main";
    }
  }
  get_incoterms() {
    this.masterComany.getDatawithInput_id('15.2').subscribe((data)=> {
      this.incoterms=data;
    });
    }

  onSelectCountry(country) {
    this.country = country;
    this.getDatawith1Param('15', country);
  }

  getDatawith1Param(input_id, param) {
    this.spinner.show();
    this.masterComany.getDatawithQueryParams1(input_id, param).subscribe((data) => {
      this.spinner.hide();
      this.response1 = data;
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
       });
  };
  onSelectState(state) {
    this.state = state;
    this.getDatawith2Param('16', this.country, state);
    this.masterComany.getDatawithQueryParams2('15.1',this.country,state).subscribe((data) => {
      this.spinner.hide();
      this.gstdata = data;
      this.get_gst();
    })
    
  }
get_gst() {
  
  for(let p of this.gstdata){
    this.regProfileInfo.gstcode=p.gstcode;
    this.regProfileInfo.zone=p.zone;
  }
  
   
  
}
  getDatawith2Param(input_id, param1, param2) {
    this.spinner.show();
    this.masterComany.getDatawithQueryParams2(input_id, param1, param2).subscribe((data) => {
      this.spinner.hide();
      this.response2 = data;
     
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      });
  };
  onSelectDistrict(district) {
    this.getDatawith3Param('17', this.country, this.state, district);
  };

  getDatawith3Param(input_id, param1, param2, param3) {
    this.spinner.show();
    this.masterComany.getDatawithQueryParams3(input_id, param1, param2, param3).subscribe((data) => {
      this.spinner.hide();
      this.response3 = data;
   },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      });
  };

  onSelectHandleCmpnyCode(company_code) {
    this.spinner.show();
  
    this.getAccountants(company_code);
     this.getWareHouseManagers(company_code);
    this.getPurchaseManagers(company_code);
    this.getSalesManagers(company_code);
    this.spinner.hide();
  };
  //1.2 Accountsnt
  getAccountants(company_code) {
   
    
     this.regProfileInfo.handling_company_acc_manager=undefined;
    
    this.masterComany.getDatawithQueryParams1(1.2, company_code).subscribe(data => {
      this.accManagersList = data;
      
    });
  };
  //1.1 warehouse
  getWareHouseManagers(company_code) {
    
    this.regProfileInfo.pur_mgr_id=undefined;
    this.masterComany.getDatawithQueryParams1(1.1, company_code).subscribe(data => {
      this.wareHouseManagersList = data;
    });
  };
  //1.3 Purchase
  getPurchaseManagers(company_code) {
    this.masterComany.getDatawithQueryParams1(1.3, company_code).subscribe(data => {
      this.PurchaseManagersList = data;
    });
  };

  getSalesManagers(company_code) {
    this.regProfileInfo.handling_company_sales_manager=undefined;
    this.masterComany.getDatawithQueryParams1(1.5, company_code).subscribe(data => {
      this.salesManagersList = data;
    });
  };
br_setup(){
  this.Emp_data.designation=this.Role+" Manager";
  this.Emp_data.company_code=this.comp_new.user.company_code;
  this.Emp_data.passing_param=4;
  this.Emp_data.user_type="Employee";
  this.Emp_data.address1=this.comp_new.user.address1;
  this.Emp_data.address2=this.comp_new.user.address2;
  this.Emp_data.city=this.comp_new.user.city;
  this.Emp_data.state=this.comp_new.user.state;
  this.Emp_data.Pin=this.comp_new.user.pin;
  this.Emp_data.cin=this.comp_new.user.cin;
  this.Emp_data.business_name=this.comp_new.user.online_display_name;
  this.Emp_data.zone=this.comp_new.user.zone;
  this.Emp_data.credit_period=this.comp_new.user.credit_period;
  this.Emp_data.credit_limit=this.comp_new.user.credit_limit;
  this.Emp_data.shipment_point=this.comp_new.user.shipment_point;
  this.Emp_data.payment_terms=this.comp_new.user.payment_terms;
  this.Emp_data.Off_email=this.comp_new.user.company_email;
  this.Emp_data.gst=this.comp_new.user.gstin;
  this.Emp_data.district=this.comp_new.user.district;
  this.Emp_data.category_profile=this.comp_new.user.category_profile;
  this.Emp_data.first_name=this.branch_details.first_name;
  this.Emp_data.email=this.branch_details.email;
  console.log("employee data",this.Emp_data);
  let methodName = "api/registration/";
   return this.masterComany.postData(this.Emp_data, methodName).subscribe(data => {
     
      if (data['Status'] == "Success .. ") {
      //  this.message=data['msg'];
      this.Emp_data={};
      //   // this.emp_table();
      //   $('#succModal1').modal('show');
      }
    },
      error => {
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      });
}
  masterCompanySubmit(form) {
    console.log("data",form);
 
    this.regProfileInfo.shop_type=this.Role;
    this.regProfileInfo.bank_details=this.bank_details;
    
    if(this.code==0){
      // this.spinner.show();
      
      let methodName = "api/company/";
      this.masterComany.postData(this.regProfileInfo, methodName).subscribe(data => {
        // this.spinner.hide();
        this.comp_new=data;
        this.message="";
        if (data['status'] === "success") {
          this.br_setup();
          this.message=this.Role+" Created Successfully..!!!";
          form.reset();

        this.isBusiness=!this.isBusiness;
      this.compDetails=!this.compDetails;
        
          
          $('#succModal').modal('show');
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
    else {
      let methodName = "api/company/"+this.regProfileInfo.company_code+ "/";
      this.masterComany.updateData(this.regProfileInfo, methodName).subscribe(data => {
        this.message=this.Role+" Updated Successfully..!!!";
        $('#succModal').modal('show');
       
        this.isBusiness=false;
        this.avail_Branches=true;
       
      },
        error => {
          this.spinner.hide();
          //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
          });
    }
  }

  check_add(){
    let  arr=["designation","first_name","mobile","email","password"];
    for(let i of arr){
      if(this.Emp_data[i]==null || this.Emp_data[i]==undefined){
        return true;
      }
    }
    return false;
  }
  addEmp1(){
    if(this.selectedEmp.length!==0){
      for(let p of this.selectedEmp){
        if(this.Emp_data.mobile==p.mobile){
          this.message="Two Records Having Same Mobile number"
          $('#valid').modal('show');
        }
        else if(this.Emp_data.email==p.email)
        {
          this.message="Two Records Having Same Email"
          $('#valid').modal('show');
        }
        else {
          alert("1");
          this.addEmp();
        }
      }
    }
    else {
      alert("2");
      this.addEmp();
    }
   
  }
  //Add Employees
  addEmp(){
    this.Emp_data.company_code=this.comp_new.user.company_code;
    this.Emp_data.passing_param=4;
    this.Emp_data.user_type="Employee";
    this.Emp_data.address1=this.comp_new.user.address1;
    this.Emp_data.address2=this.comp_new.user.address2;
    this.Emp_data.city=this.comp_new.user.city;
    this.Emp_data.state=this.comp_new.user.state;
    this.Emp_data.Pin=this.comp_new.user.pin;
    this.Emp_data.cin=this.comp_new.user.cin;
    this.Emp_data.business_name=this.comp_new.user.online_display_name;
    this.Emp_data.zone=this.comp_new.user.zone;
    this.Emp_data.credit_period=this.comp_new.user.credit_period;
    this.Emp_data.credit_limit=this.comp_new.user.credit_limit;
    this.Emp_data.shipment_point=this.comp_new.user.shipment_point;
    this.Emp_data.payment_terms=this.comp_new.user.payment_terms;
    this.Emp_data.Off_email=this.comp_new.user.company_email;
    this.Emp_data.gst=this.comp_new.user.gstin;
    this.Emp_data.district=this.comp_new.user.district;
    this.Emp_data.category_profile=this.comp_new.user.category_profile;
    this.selectedEmp.push(this.Emp_data);
    this.Emp_data = {};
  }

  submitEmpData(emp_h,emp_f){
    if (emp_h['designation']) {
      this.addEmp();
    }
    else {
      
    }
    let methodName = "api/registration/";
    this.masterComany.postData(this.selectedEmp, methodName).subscribe(data => {
        //this.message="";
        if (data['Status'] == "Success .. ") {
          this.message=data['msg'];
          this.selectedEmp=[];
          this.emp_table();
          $('#succModal1').modal('show');
        }
      },
        error => {
          //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        });
  }

  validateGst(event: any) {
    const pattern = /^[A-Za-z0-9' ']+$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
    if(event.keyCode==32 && this.regProfileInfo.gstin.trim('').length==0)
    {
      event.preventDefault();  
    }
  }

  validatepan(event: any) {
    const pattern = /^[A-Za-z0-9' ']+$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
    if(event.keyCode==32 && this.regProfileInfo.pan.trim('').length==0)
    {
      event.preventDefault();  
    }
  }

  validateCin(event: any) {
    const pattern = /^[A-Za-z0-9' ']+$/;
  
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
    if(event.keyCode==32 && this.regProfileInfo.cin.trim('').length==0)
    {
      event.preventDefault();  
    }
  }

  emp_table() {
    this.emp_t = !this.emp_t;
  }

  deleteFieldValue(index) {
    this.selectedEmp.splice(index, 1);
  }

  verifyUser(data, field) {
    this.spinner.show();
    this.masterComany.getDatawithQueryParams1(4.9, data).subscribe((data) => {
       this.spinner.hide();
      if (data['status'] == "1") {
        if (field == 'email') {
          this.mailValidation = true;
          this.Emp_data.email=undefined;
          this.message="E-mail address already in use."
          $('#valid').modal('show');
        } else {
          this.mobileValidation = true;
          this.Emp_data.mobile=undefined;
          this.message="Mobile number already in use."
          $('#valid').modal('show');
        }
      } 
        else {
        if (field == 'email') {
          this.mailValidation = false;
        } else {
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
      });
  }

  onselect(data){
    console.log("selected",data);
  }

  viewMore(data){
    this.view_d=data;
    $('#viewModal1').modal('show');
  }

  reject(data){
    this.dis_data=data;
    $('#disModal1').modal('show');
  }

  dis_branch(){
    this.dis_data.active=0;
    let methodName = "api/company/"+this.dis_data.company_code+ "/";
    this.masterComany.updateData(this.dis_data, methodName).subscribe(data => {
    this.message=this.Role+" Disabled Successfully..!!!";
    $('#succModal').modal('show');
    this.isBusiness=false;
    this.avail_Branches=true; 
      },
        error => {
          this.spinner.hide();
          //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
          });
  }

  accept(data){
    data.active=1;
    let methodName = "api/company/"+data.company_code+ "/";
      this.masterComany.updateData(data, methodName).subscribe(data => {
        this.message=this.Role+" Enabled Successfully..!!!";
        $('#succModal').modal('show');
        this.isBusiness=false;
        this.avail_Branches=true;
       
      },
        error => {
          this.spinner.hide();
          //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
          });
  }

  reason(data){
    this.Message=data.comments;
    $('#resModal').modal('show');
  }
  branch_details:any={}
  editInfo(data){
    this.branch_details={}
    console.log("branch",data);
    this.Emp_data=data;
    if(data.bank_dtl){
      this.bank_details=data.bank_dtl;
    }
    if(data.branch){
      this.branch_details=data.branch;
    }
    
    console.log("number",this.Emp_data.mobile.length);
    if(this.Emp_data.mobile.length==12){
      this.Emp_data.mobile=this.Emp_data.mobile.slice(2,12);
    }
    
    console.log("branch-manager",this.Emp_data);
    this.spinner.show();
    this.regProfileInfo=data;
    this.isBusiness=true;
    this.avail_Branches=false;
    this.code=1;
    this.code1=1;
    this.onSelectCountry(this.regProfileInfo.country);
    this.onSelectState(this.regProfileInfo.state);
    this.onSelectDistrict(this.regProfileInfo.district);
    this.spinner.hide();
  }
  explore(data) {
    console.log("datee",data.company_code);
    return this.masterComany.getDatawithQueryParams1('1000.04',data.company_code).subscribe(data=>{
      console.log("dealers",data);
      this.dealers=data['Dealer'];
      this.shopees=data['shopee'];
      localStorage.setItem('dealers', JSON.stringify(this.dealers));
      localStorage.setItem('shopees', JSON.stringify(this.shopees));
      this.route.navigateByUrl('Explore-users');
      // console.log("dealers",this.dealers);
      // $('#delshop').modal('show');
    });
   
   // alert('in-Progress');
  }

  activat_branchsetup() {
    this.code=0;
    this.code1=0;
    this.Emp_data={};
    this.bank_details={};
    this.regProfileInfo={};
    this.branch_details={}
    this.isBusiness=true;
    this.avail_Branches=false;
  }

  availt_branches(){
    this.isBusiness=false;
    this.avail_Branches=true;
  }
 
  getdash(){
    this.route.navigateByUrl('/dashboard');
  }

  c_edit() {
    this.regProfileInfo.handling_company_code=undefined;
    this.regProfileInfo.handling_company_acc_manager=undefined;
    this.regProfileInfo.handling_company_sales_manager=undefined;
    this.regProfileInfo.pur_mgr_id=undefined;
    this.code1=0;
  }

  m_cancel(){
   this.regProfileInfo={};
    this.isBusiness=false;
    this.avail_Branches=true;
  }

}

