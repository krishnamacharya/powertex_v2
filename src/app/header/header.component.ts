import { Component, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { NgxSpinnerService } from 'ngx-spinner';
import { ComponentCommunicationService } from '../component-communication.service';
import { DataServiceService } from '../data-service.service';
import { GlobalServiceService } from '../global-service.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from '../authentication-views/login-modal/login-modal.component';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';

interface LoginData{
  first_name:string,
  user_type:string,
  user_id:string,
  designation:string,
  role:string,
  company_code:string
}

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  scrHeight:any;
  scrWidth:any;

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
        // console.log(this.scrHeight, this.scrWidth);
  }
  loginUserData: LoginData;
  cartItem_count: any;
  search_val: string;
  token: any;
  resources1: Response;
  wishList_count: any;
  navbarCollapsed: any;
  notificationCount: any;
  spinner = inject(NgxSpinnerService);
  //  @Input() loginUserData:any;
  constructor(private bnIdle: BnNgIdleService, private route: Router, public globalservive: GlobalServiceService,
    public dataservice: DataServiceService, private eventOn: ComponentCommunicationService,public dialog: MatDialog) {

    // Commented for Notification
    // interval(30 * 1000).subscribe(x => {
    //   this.getScreenSize();
      
     
    //   if ((this.token != undefined && this.token != '') && (this.loginUserData.designation == 'Warehouse Manager' || this.loginUserData.designation == 'Accounts Manager' || this.loginUserData.designation == 'Branch Manager' || this.loginUserData.designation == '')) {
    //     this.getNotificationCount();
    //   }
    // });


    this.bnIdle.startWatching(60 * 60).subscribe((res) => {
   
      if (res) {
        if (this.token != '' && this.token != undefined) {
          this.gotoLogout();
        }
      }
    });

  }

  ngOnInit() {

    this.token = localStorage.getItem('token');
   
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    if ((this.token != undefined && this.token != '') && (this.loginUserData.user_type == 'Customer' || this.loginUserData.user_type == 'Guest')) {
      this.ItemsCount();
    }

    // if ((this.token != undefined && this.token != '') && (this.loginUserData.designation == 'Branch Manager' || this.loginUserData.designation == '')) {
    
    //   this.getNotificationCount();
    // }
    // if ((this.token != undefined && this.token != '') && (this.loginUserData.designation == 'Warehouse Manager' || this.loginUserData.designation == 'Branch Manager')) {
    //   this.getNotificationCount();
    // }
    // if ((this.token != undefined && this.token != '') && (this.loginUserData.designation == 'Accounts Manager' || this.loginUserData.designation == 'Warehouse Manager')) {
    //   this.getNotificationCount();
    // }
    
    this.eventOn.on().subscribe(data => {
     
      this.spinner.hide();
      if (data.id == 1) { //cart Updation
        
        this.cartItem_count = data.cartItem_count;
        
      } else if (data.id == 2) { //logout
        this.token = "";
        this.loginUserData = null;
        localStorage.clear();
      } else if (data.id == 3) { //Profile Updation
       
        this.loginUserData = data.loginUserData;
      } else if (data.id == 4) { //WishList Updation
        this.wishList_count = data.wishList_count;
     
      } else if (data.id == 5) { //WishList Updation
        this.notificationCount = '';
      }
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal:true }
        });
        // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
  
      });
  }

  openLoginModal() {
    const dialogRef = this.dialog.open(LoginModalComponent, {
      data: { token:this.token,loginUserData : this.loginUserData,cartItem_count:this.cartItem_count }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Login Dialog closed', result);
    });
    // this.ngxSmartService.getModal('loginModal').open();
  };

  openLoginModalAlert() {
    // this.ngxSmartService.getModal('alertModal').open();
  }

  

  ItemsCount() {
    this.spinner.show();
    
    this.globalservive.getDatawithQueryParams1('4.4', this.loginUserData.user_id).subscribe((data) => {
      
      this.spinner.hide();
      this.cartItem_count = data['cartcount'];
      this.wishList_count = data['wishlist_count'];
      
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
              data: { errorModal:true }
            });
        // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        // console.log(error);
      });
  }
  logoutresp:any
  gotoLogout() {

    // this.spinner.show();
    this.token=localStorage.getItem('token')
    console.log("this.token",this.token)
    var methodname = "logout/"
    var body = { "token": this.token }
 
    this.globalservive.postData(body, methodname).subscribe((data) => {
     
      // this.logoutresp=data
      console.log("logout success")
      // this.spinner.hide();
      this.token = "";
      this.loginUserData = null;
      localStorage.clear();
      this.route.navigateByUrl('home');
   
    },
      error => {
        // if(error.status===401){
        //   this.token = "";
        //   this.loginUserData = "";
        // }
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal:true }
        });
        // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        // console.log(error);
      });
  }

  search_btn(inp) {
    this.route.navigate(['/search', this.search_val]);
    this.search_val = "";
  }

  search_disable() {
    if (undefined !== this.search_val && this.search_val.length >= 1) {
      return false;
    } else {
      return true;
    }
  };

  viewNotifications() {
 
    this.notificationCount = '';
   
    if (this.loginUserData.designation == 'Warehouse Manager') {
      
     
      this.route.navigateByUrl('Warehouse Manager-PACKINGLIST');
    }
      else if (this.loginUserData.designation == 'Branch Manager') {
      
        this.route.navigateByUrl('Branch Manager-STATUS');

      
    } else if (this.loginUserData.designation == 'Accounts Manager') {
   
      this.route.navigateByUrl('Accounts Manager-INVOICE');
    } else {
      this.route.navigateByUrl('dashboard');
    }
  };

  getNotificationCount() {
    

    this.globalservive.getDatawithQueryParams1nd4('4.21', this.loginUserData.user_id, this.loginUserData.company_code).subscribe((data) => {
      this.notificationCount = data['status'];
    
      console.log(this.notificationCount,"this.notificationCount")
     
    }
    ,
      error => {
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal:true }
        });
        // console.log(error);
      }
      );
  };

  getRefreshData() {
    
    this.spinner.show();
    this.globalservive.getDatawithInput_id('99').subscribe((resp) => {
      this.spinner.hide();

    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal:true }
        });
        // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        // console.log(error);
      });
  }

  redirectto() {
    if(this.token){
      if (this.loginUserData.user_type!='Customer' && this.loginUserData.user_type!='Guest')
    {
      this.route.navigateByUrl('dashboard');
    }
    else {
      this.route.navigateByUrl('home');
    }
    }
    else {
      this.route.navigateByUrl('home');
    }
    
  }
}
