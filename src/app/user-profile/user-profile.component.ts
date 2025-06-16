import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../global-service.service';
import { DataServiceService } from '../data-service.service';
import { Router } from '@angular/router';
import { ComponentCommunicationService } from '../component-communication.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from './../toastr-service.service';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;
@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl:'./user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  address: any[] = [];
  loginUserData: any;
  edit: any = true;
  editUserEmail: any = true;
  editUserMobile = true;
  UserData: any;
  shipingAddress: any;
  selectDefaultAddress: any;
  token: string;
  obj: any = {};
  addressId: any;
  edipShipAddress: any = {};
  newAddress: boolean;
  response1: any;
  state: any;
  country: any;
  test: string;
  test1: string;
  countriesList: any;
  response2: any;
  response3: any;
  alertMessage: any;
  message: any;
  alert: boolean;
  icon: boolean;
  wish_alert: any;
  icon2: boolean;
  showOtp: any;
  otpField: any;
  otp: any;
  modalService: NgbModal;
  selectedTabIndex: number| null = null; // initially closed





  service: any;
  constructor(
    private authService: GlobalServiceService,
    private spinner: NgxSpinnerService,
    private globalService: GlobalServiceService,
    private route: Router,
    private eventEmmit: ComponentCommunicationService,
    private dataService: DataServiceService,
    private dialog: MatDialog,
    private toasterService: ToasterService
  ) {}

  loginData: any = {}; 

  toggleTab(index: number): void {
    this.selectedTabIndex = this.selectedTabIndex === index ? null : index;

    if (index === 1) {
      this.route.navigate(['/get-address']); // 👈 update this path if needed
    }
  }
  ngOnInit() {
    this.alert = false;
    this.token = localStorage.getItem('token');
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));

    if (this.loginUserData === null) {
      this.route.navigateByUrl('home');
    }
    this.getUserData();
    this.getUserAddresses();
    this.getaddress();
  }
  // thisis for check
  getUserData() {
    this.spinner.show();
    this.globalService
      .getDatawithQueryParams1(5.2, this.loginUserData.user_id)
      .subscribe(
        (data) => {
          this.spinner.hide();
          this.UserData = data[0];
          console.log(this.UserData);
        },
        (error) => {
          this.spinner.hide();
          this.dialog.open(ErrorModalComponent, {
            data: { errorModal: true },
          });
          // console.log(error);
        }
      );
  }
  getaddress(): void {
    this.globalService.getUserAddress().subscribe({
      next: (data: any) => {
        this.address = data.data; // ✅ Assign the 'data' array
        console.log('Fetched addresses:', this.address);
      },
      error: (err) => {
        console.error('Error fetching addresses:', err);
      },
    });
  }

  editPersonalInfo() {
    this.edit = !this.edit;
  }
  updateIserInfoData(id, otpField) {
    if (id == 1) {
      this.updateIserInfo();
    } else {
      if (this.loginUserData.user_type == 'supplier') {
        this.updateIserInfo();
      } else {
        this.callOtp(otpField);
      }
    }
  }
  cancelEditData() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.editUserEmail = true;
    this.editUserMobile = true;
    this.showOtp = false;
    this.otp = '';
  }
  callOtp(otpFieldData) {
    this.spinner.show();
    this.otpField = otpFieldData;
    let otpMoethod = 'sendotp/';
    this.globalService.getDatawithQuery(otpMoethod, otpFieldData).subscribe(
      (data) => {
        this.spinner.hide();
        if (data['status'] == 'otp sended !!!') {
          this.showOtp = true;
        } else {
          alert(data['status']);
        }
      },
      (error) => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal: true },
        });
        // console.log(error);
      }
    );
  }
  submitOtp(otp) {
    this.spinner.show();
    var otpMoethod = 'sendotp/';
    var otpValidBody = { otp: otp, phone: this.otpField };
    this.globalService.postData(otpValidBody, otpMoethod).subscribe(
      (data) => {
        this.spinner.hide();
        if (data['status'] == 'otp verify !!!') {
          this.updateIserInfo();
        } else if (data['status'] == 'otp expired') {
          alert(data['status']);
          this.cancelEditData();
        } else {
          this.message = data['status'];
          alert(data['status']);
        }
      },
      (error) => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal: true },
        });
        // console.log(error);
      }
    );
  }

  updateIserInfo() {
    // this.spinner.show();
    this.loginUserData.passing_param = 3;
    this.loginUserData.credit_period = 0;
    this.loginUserData.credit_limit = 0;
    // console.log(this.loginUserData);
    var regMoethod = 'api/registration/';
    this.globalService.postData(this.loginUserData, regMoethod).subscribe(
      (data) => {
        // this.spinner.hide();
        if (data['Status'] == 'Update sucessfully') {
          this.alertMessage = 'Your Profile is Updated Succesfully!!!';
          localStorage.setItem(
            'loginUserData',
            JSON.stringify(this.loginUserData)
          );
          this.edit = true;
          this.obj.id = 3;
          this.obj.loginUserData = this.loginUserData;
          this.eventEmmit.fire(this.obj);
          $('#successModal').modal('show');
        } else {
          alert(data['Failurestatus']);
        }
        this.cancelEditData();
      },
      (error) => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal: true },
        });
        // console.log(error);
      }
    );
  }

  saveAddress() {
    this.spinner.show();
    this.edipShipAddress.user_id = this.loginUserData.user_id;
    this.edipShipAddress.address_category = 'SHIP';
    this.edipShipAddress.default1 = 1;
    var methodname = 'insert_add/';
    this.globalService.postData(this.edipShipAddress, methodname).subscribe(
      (data) => {
        this.spinner.hide();
        if (data['status'] == 'updated') {
          this.alertMessage = 'Address is Updated Successfully !!!';
          $('#successModal').modal('show');
        } else if (data['status'] == 'success') {
          this.alertMessage = 'Address is Saved Successfully !!!';
          $('#successModal').modal('show');
        } else {
          alert(data['status']);
        }
        this.newAddress = false;
        this.getUserAddresses();
      },
      (error) => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal: true },
        });
        // console.log(error);
      }
    );
  }

  deleteAddress(seq_no) {
    this.spinner.show();
    this.globalService.getDatawithQueryParams1(7.4, seq_no).subscribe(
      (data) => {
        this.spinner.hide();
        console.log(data);
        this.alertMessage = 'Address is deleted Successfully !!!';
        $('#successModal').modal('show');
        this.getUserAddresses();
      },
      (error) => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal: true },
        });
        // console.log(error);
      }
    );
  }

  setasDefault(address) {
    this.edipShipAddress = address;
    this.saveAddress();
  }

  getUserAddresses() {
    this.spinner.show();
    this.globalService
      .getDatawithQueryParams2(5.1, this.loginUserData.user_id, 'ship')
      .subscribe(
        (data) => {
          this.spinner.hide();
          this.shipingAddress = data;
          console.log(this.shipingAddress);
        },
        (error) => {
          this.spinner.hide();
          this.dialog.open(ErrorModalComponent, {
            data: { errorModal: true },
          });
          // console.log(error);
        }
      );
  }

  // onSelectCountry(country) {
  //   this.country = country;
  //   this.getDatawith1Param('15', 'INDIA');
  // }

  getDatawith1Param(input_id, param) {
    this.spinner.show();
    this.globalService.getDatawithQueryParams1(input_id, param).subscribe(
      (data) => {
        this.spinner.hide();
        this.response1 = data;
      },
      (error) => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal: true },
        });
        // console.log(error);
      }
    );
  }

  onSelectState(state) {
    this.state = state;
    this.getDatawith2Param('16', this.country, state);
  }
  getDatawith2Param(input_id, param1, param2) {
    this.spinner.show();
    this.globalService
      .getDatawithQueryParams2(input_id, param1, param2)
      .subscribe(
        (data) => {
          this.spinner.hide();
          this.response2 = data;
          console.log(this.response2);
        },
        (error) => {
          this.spinner.hide();
          this.dialog.open(ErrorModalComponent, {
            data: { errorModal: true },
          });
          // console.log(error);
        }
      );
  }

  onSelectDistrict(district) {
    this.getDatawith3Param('17', this.country, this.state, district);
  }

  getDatawith3Param(input_id, param1, param2, param3) {
    this.spinner.show();
    this.globalService
      .getDatawithQueryParams3(input_id, param1, param2, param3)
      .subscribe(
        (data) => {
          this.spinner.hide();
          this.response3 = data;
        },
        (error) => {
          this.spinner.hide();
          this.dialog.open(ErrorModalComponent, {
            data: { errorModal: true },
          });
          // console.log(error);
        }
      );
  }

  addNewAdd(address, id) {
    //Load Countries
    // this.countriesList = this.dataService.getOnLoadServices(19);
    this.country = 'INDIA';
    this.getDatawith1Param('15', this.country); //States
    this.addressId = id;
    if (id == 1) {
      this.edipShipAddress.seq_no = address.seq_no;
      this.edipShipAddress = address;
    } else {
      this.edipShipAddress = {};
    }
    this.newAddress = true;
  }

  cancelNewAdd() {
    this.newAddress = false;
  }

  // tabChanged(data) {
  //   if (data.tab.textLabel == 'Logout') {
  //     this.logOut();
  //   }
  // };


logOut(): void {
  // Clear all stored data
  localStorage.clear();
  sessionStorage.clear();

  window.location.reload();

  
  this.route.navigate(['/home']);
}
  changePassword(form, password) {
    this.spinner.show();
    if (this.loginData.setpassword == this.loginData.confirmPassword) {
      var regMoethod = 'reset_password/';
      var resetPswdBody = {
        username: this.loginUserData.email,
        password: password,
      };
      form.reset();
      this.authService.postData(resetPswdBody, regMoethod).subscribe(
        (data) => {
          this.spinner.hide();
          if (data['status'] == 1) {
            this.message = data['status'];
            this.wish_alert = 'Password Changed Successfully';
            this.addwish();
            this.icon = true;
            this.icon2 = false;
          } else {
            //alert(data.status);

            this.wish_alert = data['status'];
            this.addwish();
            this.icon = false;
            this.icon2 = true;
          }
        },
        (error) => {
          this.spinner.hide();
          this.dialog.open(ErrorModalComponent, {
            data: { errorModal: true },
          });
          // console.log(error);
        }
      );
    } else {
      //alert("password Should match");
      this.wish_alert = 'Password and Confirm Password Should match';
      this.addwish();
      this.icon = false;
      this.icon2 = true;
    }
  }

  addwish() {
    this.alert = true;
    setInterval(() => {
      this.alert = false;
    }, 5000);
  }

  // editprofile() {
  //   this.route.navigateByUrl('/Supplier-Profile-Edit');
  // }

  editprofile() {
  const user_id = localStorage.getItem('user_id');
  if (user_id) {
    this.route.navigate(['/Supplier-Profile-Edit'], {
      queryParams: { userid: user_id }
    });
  }
}

  openChangePasswordModal(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }
  // Your existing methods and properties
  tabChanged(event: any) {
    this.selectedTabIndex = event.index;
  }
}
