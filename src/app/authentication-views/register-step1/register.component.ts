import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
//import 'bootstrap';
import { ActivatedRoute } from '@angular/router';
import { GlobalServiceService } from "../../global-service.service";
import { DataServiceService } from "../../data-service.service";
import { NgxSpinnerService } from 'ngx-spinner';
import { ComponentCommunicationService } from '../.././component-communication.service';
import { ToasterService} from '../../toastr-service.service';
import { Directive, HostListener } from '@angular/core';
import { ErrorModalComponent } from '../error-modal/error-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from '../login-modal/login-modal.component';

declare var $: any;

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  association: any;
  userDataArray: any = [];
  regCommonData: any;
  userTypeId: any;
  response: any;
  response1: any;
  response2: any;
  state: any;
  response3: any;
  countriesList: any;
  country: any;
  routeParams: any;
  designationsList: any;
  comapnyCodesList: any;
  registerModel: any = {};
  reg1: any = true;
  dealerReg: any = false;
  dealerReg1: any = false;
  regData: any = [];
  userRegModel: any = {};
  delRegModel: any = {};
  transportdetails:any
  otpModal: any = {};
  obj: any = {};
  @Input() styleId: number;
  mailValidation: boolean = false;
  mobileValidation: boolean = false;
  branchesList: any;
  message: any;
  alert: boolean;
  wish_alert: any;
  icon: boolean;
  loginUserData: any;
  gstdata: any;
  openTab: string;
  constructor(private route: Router, private regService: GlobalServiceService,
    private activeRoute: ActivatedRoute, private dataService: DataServiceService,
    private eventEmit: ComponentCommunicationService, private dialog: MatDialog,
    private spinner: NgxSpinnerService , private toasterService:ToasterService) {
    this.activeRoute.params.subscribe((params:any) => {
      this.routeParams = params.id;
    },
     error => {         
      this.spinner.hide();
      this.dialog.open(ErrorModalComponent, {
        data: { errorModal:true }
      });
        // console.log(error);
      });
  }
  /*  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }  */ 

   @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
    e.preventDefault();
  } 

   @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
    e.preventDefault();
  } 
  categoryList:any
  ngOnInit() {
    
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
   
    this.alert = false;
    window.scrollTo(0, 0);
    this.country = 'INDIA';
    this.obj.id = 3;
    if (this.routeParams == 1) { // 1 for InternalUsers(Employee reg)
      this.userTypeId = 37;
    } else {
      this.userTypeId = 38;
      if(this.loginUserData.user_type=='Employee'){
          this.registerModel.user_type='Employee';
          this.registerModel.credit_period=this.loginUserData.credit_period;
          this.registerModel.credit_limit=this.loginUserData.credit_limit;
          this.registerModel.shipment_point=this.loginUserData.shipment_point;
          this.registerModel.payment_terms=this.loginUserData.payment_terms;
         }
      this.designationsList = this.dataService.getOnLoadServices(36);
      this.comapnyCodesList = this.dataService.getOnLoadServices(3.1);
    }
    if(this.loginUserData!=null){
    if(this.loginUserData.designation=="Marketing Manager"){
      this.userTypeId = 37;
      this.registerModel.user_type='Dealer';
      this.branchesList = this.dataService.getOnLoadServices(1.8);
      console.log(this.branchesList,"brancheslist")
      this.categoryList = this.dataService.getOnLoadServices(50);
      this.gettransportdata()
      this.delRegModel.handling_marketing_manager=this.loginUserData.first_name+" "+this.loginUserData.last_name+"-"+this.loginUserData.email 
    }
  }
    this.getOnLoadServices(this.userTypeId, '19');
    this.getDatawith1Param('15', this.country);
  };

  
  getOnLoadServices(param1, param2) {
    this.spinner.show();
    this.regService.forkJoinMethodForInputID1(param1, param2).subscribe((data) => {
      this.spinner.hide()
      this.response = data[0];
      this.countriesList = data[1];
      this.userRegModel.country = data[1][0].country;
    },
      error => {
        this.spinner.hide();
         this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      });
  };


  onSelectCountry(country) {
    this.country = country;
    this.getDatawith1Param('15', country);
  }


  getDatawith1Param(input_id, param) {
    this.spinner.show();
    this.regService.getDatawithQueryParams1(input_id, param).subscribe((data) => {
      this.spinner.hide();
      this.response1 = data;
    },
      error => {
        this.spinner.hide();
         this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      });
  };

  onSelectState(state) {
    this.state = state;
    this.getDatawith2Param('16', this.country, state);
    this.regService.getDatawithQueryParams2('15.1',this.country,state).subscribe((data) => {
      this.spinner.hide();
      this.gstdata = data;
      this.get_gst();
    })
  }
  get_gst(){
    for(let p of this.gstdata){
      this.userRegModel.gstcode=p.gstcode;
      this.userRegModel.zone=p.zone;
    }
  }
  getDatawith2Param(input_id, param1, param2) {
    this.spinner.show();
    this.regService.getDatawithQueryParams2(input_id, param1, param2).subscribe((data) => {
      this.spinner.hide();
      this.response2 = data;
    },
      error => {
        this.spinner.hide();
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
    this.regService.getDatawithQueryParams3(input_id, param1, param2, param3).subscribe((data) => {
      this.spinner.hide();
      this.response3 = data;
    },
      error => {
        this.spinner.hide();
         this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        // console.log(error);
      });
  };



  resetForm(form) {
    form.reset();
  };



  gotoNext() {
    if (this.registerModel.cnfPassword != this.registerModel.password) {
      //alert('conform password not matched');
      this.wish_alert = "Password and Confirm Password should match"
      this.addwish();
      // this.icon = true;

    } else if (this.registerModel.cnfPassword == this.registerModel.password) {
      // var enc=sha256(this.registerModel.password)
      // console.log("psw",enc,"dpsw",this.registerModel.password);
      // this.registerModel.password=btoa(enc);
      // this.registerModel.cnfPassword=btoa(enc);
      this.association = this.registerModel.user_type;
      this.reg1 = false;
      this.dealerReg = true;
    }

  };

  gotoPrevious() {
    this.reg1 = true;
    this.dealerReg = false;
  };

  regSubmit(form) {
    // if (this.userRegModel.cnfPassword != this.userRegModel.password) {
    this.spinner.show();
    this.otpModal = {};
    this.registerModel.passing_param = 1;
    if (this.registerModel.user_type == 'Customer' || this.registerModel.user_type == 'Dealer') {
      var regMoethod = 'sendotp/';
      var mobile="91"+this.registerModel.mobile;
      this.regService.getDatawithQuery(regMoethod, mobile).subscribe((data) => {
        this.spinner.hide();
        if (data['status'] == 'otp sended !!!') {
          $("#otpModal").modal('show');
          this.timer();
        } else {
          alert(data['status']);
          
        }
      },
        error => {
          this.spinner.hide();
           this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
          this.toasterService.warning('error');
          
          // console.log(error);
        });
    } else {

      this.submitReg(form);
    }

  };

  addwish() {
    this.alert = true;
    setInterval(() => {
      this.alert = false;
    }, 5000);
  }

  submitReg(form) {
    this.spinner.show();
    if (this.registerModel.user_type == 'Customer' || this.registerModel.user_type == 'Employee') {
      this.registerModel.status = 'A';
      if (this.registerModel.user_type == 'Customer') {
        this.registerModel.category_profile = 'EU3';
      }
      if (this.registerModel.user_type == 'Customer') {
        this.registerModel.company_code = 'HYD_MAIN';
      }
      if (this.registerModel.user_type == 'Customer') {
        this.registerModel.move_to = 'HYD_MAIN';
      }
    } else {
      this.registerModel.status = 'P';
    }
    console.log(this.registerModel);

    var body = Object.assign({}, this.registerModel, this.userRegModel);
    var regMoethod = 'api/registration/';
    this.regService.postData(body, regMoethod).subscribe((data) => {
      //alert("entry");
      this.spinner.hide();
      if (data['Status'] == "Success .. ") {
        this.userRegModel = {};
      //  form.reset();
        this.reg1 = true;
        this.dealerReg = false;
        //alert('You have Successfully Registered In');
        if (this.registerModel.user_type == 'Customer' || this.registerModel.user_type == 'Employee') {
          $("#internalusersuccessModal").modal('show');
        }
        else{
        $("#otpStatusokModal").modal('show');
        }
        // if (this.registerModel.user_type != 'Employee') {
        //   this.ngxSmartService.getModal('loginModal').open();
        // }
      } else {
        alert(data['Status']);
      }
    }
      ,
      error => {
        this.spinner.hide();
         this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        // console.log(error);
      }
    );
  };

  gotoPreviousreg() {
    console.log("this.registerModel",this.registerModel);
    
    if (this.registerModel.user_type == 'Employee' || this.registerModel.user_type == 'Vendor') {
      //alert("enter");
      this.userRegModel = {};
      this.registerModel= {};
     // this.openTab='list';
       return this.route.navigateByUrl("/INTERNAL USERS");
      // this.ngxSmartService.getModal('loginModal').open();
    } else if (this.registerModel.user_type == 'Customer') {
      this.route.navigateByUrl("home");
      this.dialog.open(LoginModalComponent, {
        data: {  }
      });
    } else {
      this.route.navigateByUrl("home");
    }
  }

  submitOTP(otp) {
    this.spinner.show();
    var regMoethod = 'sendotp/';
    var mobile="91"+this.registerModel.mobile;
    var otpValidBody = { "otp": otp, "phone": mobile };
    this.regService.postData(otpValidBody, regMoethod).subscribe((data) => {
      this.spinner.hide();
      if (data['status'] == 'otp verify !!!') {
        $("#otpModal").modal('hide');
        this.submitReg('form');
      } else {
        alert(data['status']);
        // this.message = data.status;
        // $("#otpStatusModal").modal('show');
      }
    },
      error => {
        this.spinner.hide();
         this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        // console.log(error);
      });
  };


  verifyUser(data, field) {
    
    //  this.spinner.show();
    if(field=="mobile"){
      data="91"+data
    }
    this.regService.getDatawithQueryParams1(4.9, data).subscribe((data) => {
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
         this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        // console.log(error);
      });
  }

  checkIfBranch(data){
    console.log("data",data);
    if(data === "Branch"){
      return false;
    }
    return true;
  }
  gotoNext1() {
      this.association = this.registerModel.user_type;
      this.reg1 = false;
      this.dealerReg = false;
      this.dealerReg1=true
    

  };
  gotoPrevious1() {
    this.reg1 = false;
    this.dealerReg = true;
    this.dealerReg1=false;
  };
 
  gettransportdata() {
    this.regService.getDataOnlyWithMethod("transport1").subscribe((resp1) => {
      this.transportdetails = resp1;
      console.log(this.transportdetails)
    });
  }

  types = [
    { name: 'Advance cheque/GST Copy' },
   // { name: 'Service' },
    // { name: 'Pending' }


  ];
  // image: any
  // file: File
  // productfileUpload(event: any): void {
  //   if (event.target.files && event.target.files[0]) {
  //     this.file = event.target.files[0]
  //     var reader = new FileReader();
  //     reader.onload = (event: any) => {
  //       //me.modelvalue = reader.result;
  //       this.image = event.target.result
  //       console.log(event.target.result);
  //     };
  //     reader.readAsDataURL(this.file);
  //     reader.onerror = function (error) {
  //       console.log('Error: ', error);
  //     };
  //   }
  // };
  // methodname: any
  // body: any
  // response: any
  // product: any = {}
  // uploadData() {
    
  //   if (this.product.type && (this.product.file || this.product.order)) {
  //     this.methodname = "ImageUploadView/";
  //     if(this.image){
        
  //     this.body = { "processes": this.product.type, "userid": this.profileData.user_id, "image": this.image ,"descripts":this.product.order};
  //     }
  //     else{
  //       this.body = { "processes": this.product.type, "userid": this.profileData.user_id, "image": null,"descripts":this.product.order};
  //     }
  //     this.regService.postData(this.body, this.methodname).subscribe((data) => {
  //       console.log(data);
  //       // this.product = {}
  //       this.image = ''
     
  //       if (data['status1']=="Success") {

  //         // $('#succModal').modal('show');
  //         this.toasterService.success("Image Uploaded")
  //         this.getdata()
  //       }
  //     },
  //       error => {

  //          this.dialog.open(ErrorModalComponent, {
    //   data: { errorModal:true }
    // });
  //         // console.log(error);
  //       });
  //   }
  //   else {
  //     this.toasterService.error("Please fill all mandatory fields")
  //   }
  // }
  // url:any
  // getdata() {
    
  //   this.methodname = "ImageUploadView/";
  //   this.regService.getDatawithMethodParams3(this.methodname,this.profileData.user_id,"","").subscribe((data) => {
  //     this.response = data
  //     this.url = this.regService.imageurl
  //     if(this.response.length>0){
  //       this.response.forEach(x =>  {
  //         if(x.image!=null){
  //         x.image =  this.url+x.image
  //         }
  //      })
  //      console.log(this.response,"response") 
  //     }
  //   },
  //   error => {

  //      this.dialog.open(ErrorModalComponent, {
    //   data: { errorModal:true }
    // });
  //     // console.log(error);
  //   })
  
  // }
  delregSubmit(form){
   
    this.registerModel.passing_param = 1;
    this.registerModel.status = 'p';
    this.delRegModel.handling_marketing_manager=this.loginUserData.user_id
    this.delRegModel.company_code=this.delRegModel.move_to
  console.log(this.registerModel);

  var body = Object.assign({}, this.registerModel, this.userRegModel, this.delRegModel);
  var regMoethod = 'api/registration/';
  this.regService.postData(body, regMoethod).subscribe((data) => {
    //alert("entry");
    this.spinner.hide();
    if (data['Status'] == "Success .. ") {
      this.userRegModel = {};
      this.delRegModel = {};
    //  form.reset();
      this.reg1 = true;
      this.dealerReg = false;
      this.dealerReg1=false
      //alert('You have Successfully Registered In');
      $("#internalusersuccessModal").modal('show');
     
    } else {
      alert(data['Status']);
    }
  }
    ,
    error => {
      this.spinner.hide();
       this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      // console.log(error);
    }
  );
  }
  resendPassword() {
  
    this.callOTP();
  }
  callOTP() {

    this.spinner.show();
    var regMoethod = 'sendotp/';
    var mobile="91"+this.registerModel.mobile;

      this.regService.getDatawithQuery(regMoethod, mobile).subscribe((data) => {
        this.spinner.hide();
        this.otpData = data;
        this.showResendbtn = false;
        this.timer();
      },
        error => {
          this.spinner.hide();
           this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
          // console.log(error);
        });
  };
  otpTimer: any = 60;
  counter: any;
  showResendbtn: boolean;
  otpData: any = {};

  timer() {
    this.counter = setInterval(() => {
      if (this.otpTimer > 0) {
        this.otpTimer--;
      } else {
        this.otpTimer = 60;
        this.showResendbtn = true;
        clearInterval(this.counter);
      }
    }, 1000)
  };

}
