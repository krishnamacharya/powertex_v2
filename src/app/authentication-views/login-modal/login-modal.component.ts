import { AfterViewInit, Component, inject, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataServiceService } from '../../data-service.service';
import { GlobalServiceService } from '../../global-service.service';
import { HeaderComponent } from '../../header/header.component';
import { ToasterService } from '../../toastr-service.service';
import { ShowHideDirective } from './show-hide.directive';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogContainer } from '@angular/material/dialog';
import { ErrorModalComponent } from '../error-modal/error-modal.component';
import { RegisterComponent } from '../register-step1/register.component';

declare var $: any;
@Component({
  selector: 'app-login-modal',
  standalone: false,
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss'
})
export class LoginModalComponent implements OnInit, AfterViewInit {
  body: any;
  loginMoethod: string;
  loginUserData: any;
  headeDetails: any;
  today = new Date();
  token: any;
  @ViewChild(HeaderComponent) HeaderComponent;
  password = "secret";
  show = false;
    
  @ViewChild(ShowHideDirective) input: ShowHideDirective;
  checkUser: any = {};
  otpData: any = {};
  message: any;
  showLogin: any = true;
  showForgotPswd: any = false;
  showResetPswd: any = false;
  cartItem_count: any;
  counter: any;
  showResendbtn: boolean;
  otpTimer: any = 60;
  guestId: any;
  wish_alert: any;
  alert: boolean;
  icon: boolean;
  icon2: boolean;
  guestuser: any;

  displaMsg: boolean = false;
  schemes_data: any=[];
  container = inject(MatDialogContainer);
  data = inject<{
    token: string;
    loginUserData: any;
    cartItem_count:any;
  }>(MAT_DIALOG_DATA);
  showLoginModal: boolean;

  constructor(private authService: GlobalServiceService, private route: Router,public dialog: MatDialog,
  private spinner: NgxSpinnerService, private toasterService: ToasterService) {
      // console.log(data); 
    }

  /* success()
  {
    this.toasterService.success("success button clicked" )
  }
  info()
  {
    this.toasterService.info("info button clicked")
  }
  warning()
  {
    this.toasterService.warning("warning button clicked")
  }
  error()
  {
    this.toasterService.error("error button clicked")
  }
  */

  loginData: any = {};
  headerData: any = {};
  date: any;
  ngOnInit() {
    this.alert = false;
    this.guestuser = false;

  };

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

  closeLoginModal() {
    this.showLoginModal = false; // <-- Change to false
    console.log("Modal closed");
  }
  
  closeModal() {
    this.loginData = {};
    this.showForgotPswd = false;
    this.showLogin = true;
    this.showResetPswd = false;
    this.checkUser = {};
    this.showResendbtn = false;
  }
  logindata:any
  gotoLogin() {
    this.spinner.show();
    this.loginMoethod = 'login/';
    this.body = { "username": this.loginData.userId, "password": this.loginData.password };
    this.authService.postData(this.body, this.loginMoethod).subscribe((data) => {
      this.spinner.hide();
      console.log("login data",data);
      this.logindata=data
      if (data['status'] == "Your request is under process") {
        this.toasterService.error("Please Contact Powertex");
      }
      if (data['status'] == "success") {
        // this.dialogRef.close();
        this.dialog.getDialogById(this.container._config.id ?? '')?.close();

        this.message = data['status'];
        this.token = data['token'];
      
        localStorage.setItem('token', this.token);
        this.loginUserData = this.logindata.data;
        if(this.loginUserData.role =='Dealer'||this.loginUserData.role =='Branch Manager'){
          //  alert(this.loginUserData.user_type);
          this.check_schemes();
         
        }
        
        
        localStorage.setItem('loginUserData', JSON.stringify(this.loginUserData));
        /*   ==========================================toaster binding with logged in user name=============================================================== */
        this.toasterService.success('Hi' + '  ' + this.loginUserData.first_name + '  ' + 'you are logged in successfully');
        /* alert(this.loginUserData.first_name)  */

        /*   alert(JSON.stringify(this.loginUserData)) */

        /* ========================================================================================================= */

        /*  =============================code responsible for redirecting to home page======================================================= */
        if (this.loginUserData.user_type != 'Customer' && this.loginUserData.user_type != 'Guest') {
          this.route.navigateByUrl("dashboard");
        }
        // else {
        //   this.route.navigateByUrl("home");
        // }
        /*  =====================================================**code responsible for redirecting to home page ends**============================ */
        this.data.token = data['token'];
        this.data.loginUserData = this.logindata.data;
        if (this.loginUserData.user_type == 'Customer' || this.loginUserData.user_type == 'Dealer' || this.loginUserData.user_type == 'Guest') {
          this.ItemsCount();
        }
        if (this.loginUserData.designation == 'Warehouse Manager' || this.loginUserData.designation == 'Accounts Manager') {
          // Commented for Notification
          // this.headerComponent.getNotificationCount();
        }

      } else {
        this.displaMsg = true;
        setTimeout(() => {
          this.displaMsg = false;
        }, 3000);
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
  schemesdata:any=[]
  check_schemes(){
    this.schemes_data=[]
    return this.authService.getDatawithMethodParams1("Schemelis/",this.loginUserData.user_id).subscribe(resp=>{
      console.log("sch_data",resp);
       this.schemesdata=resp;
      //localStorage.setItem('schemes_data', JSON.stringify(this.schemes_data));
      if(this.schemesdata.length>0 ){
        for(let i=0;i<this.schemesdata.length;i++){
         
       
          if(this.schemesdata[i].active==1){
           
            this.schemes_data.push(this.schemesdata[i])
            console.log(this.schemes_data,"schemes")
       
        }
        }
      }
      else{
        if(this.loginUserData.alert==true || this.loginUserData.alert1==true){
    
          $('#creditstatus').modal('show')
        }
       
      }
      if(this.schemes_data.length>0)
      {
        $("#schemeModal").modal('show');

      }
      else{
        if(this.loginUserData.alert==true || this.loginUserData.alert1==true){
    
          $('#creditstatus').modal('show')
        }
      }
    })
  }
showcredit(){
  if(this.loginUserData.alert==true || this.loginUserData.alert1==true){
    
    $('#creditstatus').modal('show')
  }
  
}
  ItemsCount() {
    this.spinner.show();
    this.authService.getDatawithQueryParams1('4.4', this.loginUserData.user_id).subscribe((data) => {
      this.spinner.hide();
      this.cartItem_count = data['cartcount'];
      this.data.cartItem_count = data['cartcount'];
    })
  }
  gotoRegister() {
    // Close the current Login modal
    this.dialog.getDialogById(this.container._config.id ?? '')?.close();
  
    // Open the Register modal
    this.dialog.open(RegisterComponent, {
      disableClose: true, // Optional
      data: {} // Optional: pass any data to RegisterComponent
    });
  }
  
userid:any
newuserid:any
  gotoForgotPassword(id) {

    this.guestId = id;
      if(isNaN(this.loginData.userId)){
    this.authService.getDatawithQueryParams1(4.9, this.loginData.userId).subscribe((data) => {
      // this.spinner.hide();
      this.checkUser = data;
       if (this.checkUser.status == "1") {
      console.log(this.checkUser);
    this.guestuser = false;
    this.showLogin = false;
    this.showForgotPswd = true;
    this.callOTP();
       }
  })
}
else{
  this.authService.getDatawithQueryParams1(4.9, "91"+this.loginData.userId).subscribe((data) => {
    // this.spinner.hide();
    this.checkUser = data;
     if (this.checkUser.status == "1") {
    console.log(this.checkUser);
  this.guestuser = false;
  this.showLogin = false;
  this.showForgotPswd = true;
  this.callOTP();
     }
})
}
  };

  resendPassword() {
  
    this.callOTP();
  }

  getOTP() {
    this.spinner.show();
    //Check User Existed or Not
    this.authService.getDatawithQueryParams1(4.9, this.loginData.userId).subscribe((data) => {
      this.spinner.hide();
      this.checkUser = data;
      console.log(this.checkUser);
      // if (data.status == "1") {
      this.callOTP();
      // }
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {

          data: { errorModal:true }
        });
        // console.log(error);
      });
  };


  callOTP() {

    this.spinner.show();
    var regMoethod = 'sendotp/';
    if(isNaN(this.loginData.userId)){
    this.authService.getDatawithQuery(regMoethod, this.loginData.userId).subscribe((data) => {
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
    }
    else{
      this.authService.getDatawithQuery(regMoethod,"91"+ this.loginData.userId).subscribe((data) => {
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
    }
  };
code:any
  verifyOTP(guestId) {
    this.spinner.show();
    var regMoethod = 'sendotp/';
    this.code="91"
    if(isNaN(this.loginData.userId)){
    var otpValidBody = { "otp": this.loginData.otp, "phone": this.loginData.userId };
    }
    else{
      var otpValidBody = { "otp": this.loginData.otp, "phone": this.code+this.loginData.userId };
    }
    this.authService.postData(otpValidBody, regMoethod).subscribe((data) => {
      this.spinner.hide();
      this.otpData = data;
      if (data['status'] == 'otp verify !!!') {
        if (guestId == '2') {
          this.message = data['status'];
          this.showResetPswd = true;
          this.showForgotPswd = false;
        } else if (guestId == '1') {
          this.loginAsGuest();
        }

      } else {
        alert(data['status']);
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

  resetPassword() {
   
    this.spinner.show();
   
    
    if (this.loginData.setpassword == this.loginData.confirmPassword) {
      if(isNaN(this.loginData.userId)){
        var resetPswdBody = { "username": this.loginData.userId, "password": this.loginData.setpassword };
      }
      else{
        this.code="91"
        var resetPswdBody = { "username": this.code+this.loginData.userId, "password": this.loginData.setpassword };
      }
      var regMoethod = 'reset_password/';
      
      this.authService.postData(resetPswdBody, regMoethod).subscribe((data) => {
        this.spinner.hide();
        if (data['status'] == 1) {
        
          // $("#loginResetPwdModal").modal('show');
          this.wish_alert = "Password Updated Successfully"
          this.toasterService.success('password was successfully updated');
          this.addwish();
          this.icon = true;
          this.icon2 = false;
          this.loginData = {};
          this.checkUser = {};
          this.showForgotPswd = false;
          this.showLogin = true;
          this.showResetPswd = false;
          this.showResendbtn = false;
        } else {
          //alert('your password should not be similar to old password');
        
          this.wish_alert = "your password should not be similar to old password"
          this.toasterService.error(data['status']);
          this.addwish();
          this.icon = false;
          this.icon2 = true;
        }
      },
        error => {
          this.spinner.hide();
          this.dialog.open(ErrorModalComponent, {
  
            data: { errorModal:true }
          });
          // console.log(error);
        });
    } else {
      this.wish_alert = "Password and Confirm Password should match"
      this.addwish();
      this.icon = false;
      this.icon2 = true;
      //alert("password Should match");
    }
  };

  addwish() {
    this.alert = true;
    setInterval(() => {
      this.alert = false;
    }, 5000);
  }
  guestlogin:any
  loginAsGuest() {
    this.spinner.show();
    let regMoethod = 'guest_user/';
    let resetPswdBody = { "username": this.loginData.userId, "password": this.loginData.setpassword };
    this.authService.postData(resetPswdBody, regMoethod).subscribe((data) => {
      this.guestlogin=data
      this.spinner.hide();
      if (data['status'] == 'success') {
        this.token = data['token'];
        console.log(data);
        localStorage.setItem('token', this.token);
        this.loginUserData = this.guestlogin.data;
        this.dialog.getDialogById(this.container._config.id ?? '')?.close();
        localStorage.setItem('loginUserData', JSON.stringify(this.loginUserData));
        this.route.navigateByUrl("home");
        
        this.data.token = data['token'];
       

        this.data.loginUserData = this.guestlogin.data;
      } else {
        alert(data['status']);
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


  //Guest User

  guestpswd(id) {
    if (id == '2') {
      this.guestuser = true;
    } else if (id == '1') {
      this.guestuser = false;
      this.loginAsGuest();
    }


  }

  ngAfterViewInit() {
  }
  toggleShow(ev)
  {
    this.show = !this.show;
  }

}
