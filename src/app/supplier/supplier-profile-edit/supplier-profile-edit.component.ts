import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../../global-service.service';
import { ToasterService } from '../../toastr-service.service';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-supplier-profile-edit',
  standalone: false,
  templateUrl: './supplier-profile-edit.component.html',
  styleUrls: ['./supplier-profile-edit.component.scss']
})
export class SupplierProfileEditComponent implements OnInit {
  loginUserData: any
  supplier: any = {}
  mailValidation: boolean = false;
  mobileValidation: boolean = false;
  response1: any;
  response: any;
  state: any;
  bank: any = {}
  response2: any
  countriesList: any;
  country: any;
  gstdata: any
  userTypeId: any
  incoterms: any
  editform: boolean = false
  currencies: any = []
  skuExists: boolean = false;
  ChaExists: boolean = false;
  suppliertypes: any = []

  constructor(private globalService: GlobalServiceService,private toasterService: ToasterService, private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.get_incoterms();
    this.getcurrency();
    this.getsuppliertype();
    this.getpaymentterms();
    this.getRegisterdUsers();
    // this.supplier.country = 'China'
  
    if (localStorage.getItem('loginUserData')) {
      this.editform = true
      // this.supplier = JSON.parse(localStorage.getItem('supplierProfile'))

      this.globalService.getDatawithMethodParams1("sup/bankdetals/", this.loginUserData.user_id).subscribe((data) => {
        this.bank = data;
        if (this.bank.length > 0) {
          this.supplier.account_no = this.bank[0].acc_no
          this.supplier.account_name = this.bank[0].acc_holder
          this.supplier.bankname = this.bank[0].bank_name
          this.supplier.branch = this.bank[0].branch
          this.supplier.swiftcode = this.bank[0].ifsc
          // this.supplier.bankaddress=this.bank[0].bankaddress
        }
      },
        error => {

          this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
          // console.log(error);
        });
    }
  }
  registeredusers: any
  registereduser: any
  getRegisterdUsers() {
    this.spinner.show();
    this.globalService.getDataOnlyWithMethod("sup/supplierlist").subscribe((data) => {
      this.registereduser = data
      if(this.registereduser){
        this.registeredusers = this.registereduser.filter((e) => { return e.user_id == this.loginUserData.user_id})
        console.log(this.registeredusers,'this.registeredusers')
      }
      this.spinner.hide();
      this.supplier.user_type = this.registeredusers[0].user_type
      this.supplier.salatation = this.registeredusers[0].salatation
      this.supplier.first_name = this.registeredusers[0].first_name
      this.supplier.last_name = this.registeredusers[0].last_name
      this.supplier.email = this.registeredusers[0].email
      this.supplier.mobile = this.registeredusers[0].mobile
      this.supplier.business_name = this.registeredusers[0].business_name
      this.supplier.address1 = this.registeredusers[0].address1
      this.supplier.address2 = this.registeredusers[0].address2
      this.supplier.country = this.registeredusers[0].country
      this.supplier.state = this.registeredusers[0].state
      this.supplier.city = this.registeredusers[0].city
      this.supplier.pin = this.registeredusers[0].pin
      this.supplier.Off_mobile = this.registeredusers[0].Off_mobile
      this.supplier.delivery_time = this.registeredusers[0].delivery_time
      if( this.registeredusers[0].user_type == 'supplier'){
        this.supplier.currency = this.registeredusers[0].currency
        this.supplier.payment_terms = this.registeredusers[0].payment_terms
        this.supplier.shipment_point = this.registeredusers[0].shipment_point
        this.supplier.credit_period = this.registeredusers[0].credit_period
        this.supplier.sku = this.registeredusers[0].sku
      }
      if( this.registeredusers[0].user_type == 'cha'){
       this.supplier.port = this.registeredusers[0].shipment_point
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

  paymentterms: any = []
  getpaymentterms() {
    this.globalService.getDataOnlyWithMethod("get_payment_terms").subscribe((data) => {
      this.paymentterms = data;
    });
  }
  getcreditdays(terms) {

    for (let t of this.paymentterms) {
      if (t.payment_term == terms && terms != 'Credit Days') {
        this.supplier.credit_period = t.credit_days
      }
      else if (terms == 'Credit Days') {
        this.supplier.credit_period = ''
      }
    }
  }
  verifyUser(data, field) {
    //  this.spinner.show();
    // if(field=="mobile"){
    //   data="91"+data
    // }
    this.globalService.getDatawithQueryParams1(4.9, data).subscribe((data) => {
      //   this.spinner.hide();
      if (data['status'] == "1") {
        if (field == 'email') {
          this.mailValidation = true;
        }
        if (field == 'mobile') {
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
  get_incoterms() {
    this.globalService.getDatawithInput_id('15.2').subscribe((data) => {
      this.incoterms = data;
    });
  }

  getcurrency() {
    this.globalService.getDataOnlyWithMethod("sup/currencydrop").subscribe((data) => {
      this.currencies = data;
    });
  }
  getsuppliertype() {
    this.globalService.getDataOnlyWithMethod("sup/dischargeport").subscribe((data) => {
      this.suppliertypes = data;
    });
  }
  getOnLoadServices(param1, param2) {
    this.spinner.show();
    this.globalService.forkJoinMethodForInputID1(param1, param2).subscribe((data) => {
      this.spinner.hide()
      this.response = data[0];
      this.countriesList = data[1];
      this.supplier.country = data[1][0].country;
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
    this.globalService.getDatawithQueryParams1(input_id, param).subscribe((data) => {
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
    this.globalService.getDatawithQueryParams2('15.1', this.country, state).subscribe((data) => {
      this.spinner.hide();
      this.gstdata = data;

    })
  }
  getDatawith2Param(input_id, param1, param2) {
    this.spinner.show();
    this.globalService.getDatawithQueryParams2(input_id, param1, param2).subscribe((data) => {
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

  keypress(event) {
    if (event.length > 0) {
      this.globalService.getDatawithMethodParams1("sup/check_sku_exists/", event).subscribe((data: any) => {
        if (data.status == 1) {
          this.skuExists = true;
        } else if (data.status == 0) {
          this.skuExists = false;
        }
      },
        error => {
          this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        });
    }
  }

  onSubmit(form: NgForm) {
    if (!this.supplier.user_type) {
      this.toasterService.error("Enter Supplier Type")
      return false
    }
    if (!this.supplier.salatation) {
      this.toasterService.error("Enter Salatation")
      return false
    }
    if (!this.supplier.first_name) {
      this.toasterService.error("Enter First Name")
      return false
    }
    if (!this.supplier.email) {
      this.toasterService.error("Enter Email Id")
      return false
    }
    if (!this.supplier.mobile) {
      this.toasterService.error("Enter Mobile Number")
      return false
    }
    if (!this.supplier.business_name) {
      this.toasterService.error("Enter Company Name")
      return false
    }
    if (!this.supplier.address1) {
      this.toasterService.error("Enter Adress1")
      return false
    }
    if (!this.supplier.address2) {
      this.toasterService.error("Enter Adress2")
      return false
    }
    if (!this.supplier.country) {
      this.toasterService.error("Enter Country")
      return false
    }
    if (!this.supplier.state) {
      this.toasterService.error("Enter State")
      return false
    }
    if (!this.supplier.city) {
      this.toasterService.error("Enter City ")
      return false
    }
    if (!this.supplier.pin) {
      this.toasterService.error("Enter Pin")
      return false
    }
    // if (!this.skuExists) {
    //   this.atributesData(form, 'supplier');
    // }
    if (this.supplier.user_type == "supplier") {
      // if (!this.supplier.currency) {
      //   this.toasterService.error("Enter Currency Type")
      //   return false
      // }
      // if (!this.supplier.payment_terms) {
      //   this.toasterService.error("Enter Payment terms")
      //   return false
      // }
      // if (!this.supplier.shipment_point) {
      //   this.toasterService.error("Enter Delivery Terms")
      //   return false
      // }
      // if (!this.supplier.sku) {
      //   this.toasterService.error("Enter Sku")
      //   return false
      // }
      this.supplier.port = null
      this.atributesData(form, 'supplier');
    }
    
    if (this.supplier.user_type == "cha") {
      if (!this.supplier.port) {
        this.toasterService.error("Enter Port")
        return false
      }
      this.supplier.shipment_point = this.supplier.port
      this.supplier.credit_period = null
      this.supplier.payment_terms = null
      this.supplier.currency = null
      this.supplier.sku = null
      this.atributesData(form, 'cha');
    }
    if (this.supplier.user_type == "Dealer") {
      this.supplier.shipment_point = null
      this.supplier.credit_period = null
      this.supplier.payment_terms = null
      this.supplier.currency = null
      this.supplier.sku = null
      this.atributesData(form, 'Dealer');
    }

  }
  methodname: any
  atributesData(form, type) {
    console.log(this.supplier, "supplierdata");
    this.supplier.status = "A";
    this.supplier.user_type = this.registeredusers[0].user_type;
    this.supplier.createdby = this.loginUserData.user_id;
    // this.supplier.password = "123456";
    this.supplier.password = this.registeredusers[0].password;
    this.supplier.user_id = this.registeredusers[0].user_id;
    // this.methodname = "supplier/";
    // alert("Hello! I am an alert box!!");
    this.methodname = "api/registration/";
    this.globalService.postData(this.supplier, this.methodname).subscribe((data) => {


      console.log(data);
      if (data['Status'] == "Success .. ") {
        $("#successModal").modal('show');

        // form.reset();
        // this.supplier.salatation = undefined
        // this.supplier.currency = undefined
        // this.supplier.shipment_point = undefined
        // this.supplier.user_type = undefined
        // this.supplier.port = undefined


      }
      if (data['Status'] == "Update sucessfully") {
        $("#updateModal").modal('show');
      }

    })
  }
  gotouserslist() {
    this.route.navigateByUrl('/profile');
  }
}

