import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalServiceService } from '../global-service.service';
// import { Category } from "../category-list/category";
import { DataServiceService } from '../data-service.service';
import { ComponentCommunicationService } from '../component-communication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from './../toastr-service.service';
import { Location, } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
import { LoginModalComponent } from '../authentication-views/login-modal/login-modal.component';

declare var $: any;
@Component({
  selector: 'app-shop-by-category',
  standalone: false,
  templateUrl: './shop-by-category.component.html',
  styleUrl: './shop-by-category.component.scss'
})

export class ShopByCategoryComponent {
  Page: any = 1;
  category: any;
  sub_c: any;
  sub: any;
  d: string;
  e: string;
  f: any;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  resources2: any = [];
  option: any;
  modal: any = [];
  range: any = [];
  select: any;
  order: string;
  catgHidden: boolean = false;
  discount: number = 1;
  selected_disc: number = 2;
  prof: any;
  wish_color = "#a09898";
  loginUserData: any;
  methodname: string;
  token: any;
  wish_alert: any;
  alert: boolean;
  obj: any = {};
  user_id: any;
  icon: boolean;
  profession: any;
  log_as_cust: boolean = true;
  sort: any;
  search: any;
  page: any;
  resources2dataproduct: any;
  brand: any;
  p: any;

  constructor(private router: Router, private route: ActivatedRoute, private service: GlobalServiceService, public dataService: DataServiceService, private _location: Location,
    private eventemit: ComponentCommunicationService, private dialog: MatDialog, private spinner: NgxSpinnerService, private toasterService: ToasterService, private activatedRoute: ActivatedRoute,) {
    this.obj.id = 4;
  }
  isRoot: boolean;
  

  // ngOnInit() {
  //   /* =========================== */
  //   this.sub = this.route.queryParams.subscribe(params => {
  //     // Defaults to 0 if no query param provided.
  //     this.page = +params['page'] || 0;
  //   });

  //   // $("#success-alert").hide();
  //   this.alert = false;
  //   this.token = localStorage.getItem('token');
  //   console.log("token", this.token);

  //   this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
  //   // console.log("token",this.loginUserData.user_type);
  //   this.sub = this.route.params.subscribe(params => {
  //     this.prof = params['search'];
  //     this.profession = params['profession'];
  //     if (this.token == null) {
  //       this.user_id = '';
  //     } else {
  //       this.user_id = this.loginUserData.user_id;
  //       if (this.loginUserData.user_type != 'Customer' || this.loginUserData.user_type != 'Guest') {
  //         this.log_as_cust = false;
  //       }
  //     }

  //     console.log("search", this.prof);
  //     if (this.prof === undefined) {
  //       this.d = params['b'];
  //       this.sub_c = params['c'];
  //       this.modal = atob(params['d']);
  //       this.select = atob(params['e']);
  //       this.brand = ('');
  //       // this.d=this.category;
  //       this.e = atob(this.sub_c);
  //       this.e = encodeURIComponent(this.e)
  //       console.log(this.d, "", this.e, "", this.select, this.modal, this.user_id);
  //       this.getdata1();
  //     }
  //     else {
  //       this.spinner.show();
  //       this.getsearch();
  //     }
  //     this.spinner.show
  //   },
  //     error => {
  //       this.spinner.hide();
  //       this.dialog.open(ErrorModalComponent, {
  //   data: { errorModal:true }
  // });
  //       // console.log(error);
  //     });

  // }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const category = params.get('category');
      console.log('Received Category:', category);
  
      if (category) {
        // Call your function to fetch category-wise products
        this.card1({ Category: category });
      }
    });
  }
  card1(arg0: { Category: string; }) {
    this.spinner.show();
    this.p1 =arg0.Category;;
    this.p2 ="";
    this.p3 = "All";
    this.order = '',
      this.range = [];
    return this.service.getDatawithQueryParamsBrand('7.3', this.p1, this.p2,this.p3, this.order, this.range).subscribe((resp) => {
      this.spinner.hide();
      console.log(resp, "data1");
      this.resources2 = resp;
      console.log(resp, "gfrdeewgergergreterg");

      this.resources2dataproduct = this.resources2.data;
      this.percenages = this.resources2.count[0];
      this.minValue = this.resources2.price[0].min_price;
      this.maxValue = this.resources2.price[0].max_price;
      this.brands = this.resources2.brand;
      console.log(this.brands, "kjjhjghjjkhgj,bhjg")
      this.min = this.minValue;
      this.max = this.maxValue;

      this.Options = {
        floor: this.minValue,
        ceil: this.resources2.price[0].max_price,

        // step: 1
      };
      this.Ascend("acc")
      if (this.resources2dataproduct.length >= 1) {

        this.showslider = true;

      }
      else {
        this.showslider = false;
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
  
  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }
  goBack() {
  this._location.back();
 }
  /* ================current location====================== */
  /* goToPage(pageNum) {
    
   this.router.navigate(['%app-category-list'], { queryParams: { page: pageNum } });
 }  */
  /*\ nextPage() {
  
    this.router.navigate(['%app-category-list'], { queryParams: { page:  this.Page + 1 } });
  } */
  /* ======================================= */
  percenages: any = [];
  clearfilters(p) {
    this.selected_disc = p;
    if (this.prof != undefined) {
      this.spinner.show();
      this.getsearch();
    }
    else {
      {

        this.spinner.show();
        this.order = '',
          this.range = [];
        return this.service.getDatawithQueryParamsBrand('10', this.d, this.e, this.select, this.modal, this.brand).subscribe((resp) => {
          this.spinner.hide();
          console.log(resp);
          this.resources2 = resp;

          this.resources2data = this.resources2.data;
          this.percenages = this.resources2.count[0];
          this.minValue = this.resources2.price[0].min_price;
          this.maxValue = this.resources2.price[0].max_price;
          this.min = this.minValue;
          this.max = this.maxValue;
          this.Options = {
            floor: this.minValue,
            ceil: this.resources2.price[0].max_price,
            // step: 1
          };
          if (this.resources2data.length >= 1) {

            this.showslider = true;

          }
          else {
            this.showslider = false;
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
    }
  }
  brands: any = [];
  class: any = 'C_s';
  css1: any = 'img-thumbnail';

  getdata1() {

    this.spinner.show();
    this.order = '',
      this.range = [];
    return this.service.getDatawithQueryParamsBrand('7.3', this.d, this.e, this.select, this.modal,this.brand).subscribe((resp) => {
      this.spinner.hide();
      console.log(resp, "data1");
      this.resources2 = resp;

      this.resources2dataproduct = this.resources2.data;
      this.percenages = this.resources2.count[0];
      this.minValue = this.resources2.price[0].min_price;
      this.maxValue = this.resources2.price[0].max_price;
      this.brands = this.resources2.brand;
      console.log(this.brands, "kjjhjghjjkhgj,bhjg")
      this.min = this.minValue;
      this.max = this.maxValue;

      this.Options = {
        floor: this.minValue,
        ceil: this.resources2.price[0].max_price,

        // step: 1
      };
      this.Ascend("acc")
      if (this.resources2dataproduct.length >= 1) {

        this.showslider = true;

      }
      else {
        this.showslider = false;
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
  Options: any;
  showslider: boolean = true;
  resources2data: any = [];
  minValue: number = 1
  maxValue: number = 10000;
  sidemenu: boolean = true
  branding: any;
  getsearch() {

    this.sidemenu = false
    this.spinner.show();
    return this.service.getDatawithMethodParams1('profession/', this.prof).subscribe((resp) => {
    // return this.service.getDatawithQueryParams1('10.08', this.prof).subscribe((resp) => {
      if (this.service.response == null) {
        console.log(this.route.routeConfig.component.name);
        this.spinner.show();
        setTimeout(() => {
          this.spinner.hide();

        }, 4000);
      }
      console.log("prof", resp);
      this.resources2 = resp;
      // this.spinner.hide(); 
      // this.resources2data1 = this.resources2.data;
      this.resources2data1 = this.resources2;
      for (var i = 0; i < this.resources2.data.length; i++) {
        if (this.resources2.data[i]) {
          var text = this.resources2.data[i].low_image_1.split("Powertexmodel");
          this.resources2data1[i].low_image_1 = 'https://gstbucket1.s3.ap-south-1.amazonaws.com/Powertexmodel' + text[1];
        }
      }
      this.percenages = this.resources2.count[0];
      this.spinner.hide
      /*  this.branding = this.resources2.brand; */
      this.minValue = this.resources2.price[0].l_price;
      this.maxValue = this.resources2.price[0].h_price;
      this.selected_disc = null;
      this.min = this.minValue;
      this.max = this.maxValue;
      this.Options = {
        floor: this.minValue,
        ceil: this.resources2.price[0].h_price,

        // step: 1
      };

      if (this.resources2data1.length >= 1) {
        this.showslider = true;

      }
      else {

        this.showslider = false;
      }
    },
      error => {
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  }

  //price Range
  /* resources2data = this.resources2data.l_price */


  
  sub_cat(p) {
  

    console.log(p);
    if (p.productid) {
      let category = p.category;
      let sub_category = p.subcategory;
      let model = p.modelno;

      let obj = p;
      localStorage.setItem('key', JSON.stringify(obj));
      console.log(p);
      // this.obj.setCategory(p);
      console.log("clicked") 
      // this.router.navigateByUrl('/product-detail');
      this.router.navigate(['/product-detail', p.productid]);
    }
    else {
     
      this.sidemenu = true
      this.d = p.category
      this.e = p.subcategory
      this.select = "All"
      this.modal = p.modelno;
      this.brand = p.brand;

      // console.log("your Category", category, "productid", p.productid);
      this.getdata1()
    }
  }
  resources3: any
  resources2data1: any = []
  //price order-filter
  Ascend(order) {

    this.resources2data1 = []
    this.spinner.show();
    this.order = "";
    this.order = order;
    // this.range=[];
    if (this.prof != undefined) {
      this.getProfesionorderwise(this.order);
    }
    else {
      return this.service.getDatawithQueryParams7User_idBrand('7.3', this.d, this.e, this.select, this.modal, order, this.range, this.discount, this.brand, this.user_id).subscribe((resp) => {
        console.log("--S1")
        this.spinner.hide();
        this.resources2 = resp;
        this.resources2data1 = this.resources2.data;
        for (var i = 0; i < this.resources2.data.length; i++) {
          if (this.resources2.data[i]) {
            var text = this.resources2.data[i].low_image_1.split("Powertexmodel");
            this.resources2data1[i].low_image_1 = 'https://gstbucket1.s3.ap-south-1.amazonaws.com/Powertexmodel' + text[1];
          }
        }
        this.minValue = this.resources2.price[0].min_price;
        this.maxValue = this.resources2.price[0].max_price;
        this.min = this.minValue;
        this.max = this.maxValue;
        this.Options = {
          floor: this.minValue,
          ceil: this.resources2.price[0].max_price,
          // step: 1
        };
      },
        error => {
          this.spinner.hide();
          this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
          // console.log(error);
        });
    }

  }

  onPageChange(Page: number) {
    this.Page = Page;
    window.scrollTo(0, 0);
  }


  //price-filter
  price_min(min, m) {

    this.range = [];
    // console.log(min);
    // console.log(m);


    let mini: number = Math.round(+min);
    let maxi: number = Math.round(+m);
    /* this.order = "acc" */
    this.range.push(mini);
    this.range.push(maxi);
    console.log("range-", this.range);
    let order = "";
    if (this.prof != undefined) {

      this.getProfesionWise(min, m);
    }
    else {
      return this.service.getDatawithQueryParams7User_idBrand('10', this.d, this.e, this.select, this.modal, this.order, this.range, this.discount,this.brand, this.user_id).subscribe((resp) => {
        this.spinner.hide();

        console.log("--S2")
        console.log(resp);
        this.resources2 = resp;
        console.log(this.resources2, "rangedata");
        this.resources2data1 = this.resources2.data;
        for (var i = 0; i < this.resources2.data.length; i++) {
          if (this.resources2.data[i]) {
            var text = this.resources2.data[i].low_image_1.split("Powertexmodel");
            this.resources2data1[i].low_image_1 = 'https://gstbucket1.s3.ap-south-1.amazonaws.com/Powertexmodel' + text[1];
          }
        }
        this.percenages = this.resources2.count[0];

      },
        error => {
          this.spinner.hide();
          this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
          // console.log(error);
        });
    }
  }
  min: any;
  max: any;
  getProfesionWise(min, m) {
    this.spinner.show();
    this.min = min;
    this.max = m;
    this.resources2 = [];
    this.order = '';

    return this.service.getDatawithQueryParams5('1.02', this.prof, min, m, this.discount, this.order).subscribe((resp) => {
      this.spinner.hide();
      console.log(resp);
      this.resources2 = resp;

      this.resources2data1 = this.resources2.data;
      for (var i = 0; i < this.resources2.data.length; i++) {
        if (this.resources2.data[i]) {
          var text = this.resources2.data[i].low_image_1.split("Powertexmodel");
          this.resources2data1[i].low_image_1 = 'https://gstbucket1.s3.ap-south-1.amazonaws.com/Powertexmodel' + text[1];
        }
      }
      this.resources2datacount = this.resources2.count;
      console.log(this.resources2data, "================>");

    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  }
  resourcesporder: any
  resources2dataorderwise: any = []
  getProfesionorderwise(order) {
    this.spinner.show();
    this.order = order;
    this.resources2 = [];
    return this.service.getDatawithQueryParams5('1.02', this.prof, this.min, this.max, this.discount, this.order).subscribe((resp) => {
      console.log(resp);
      this.spinner.hide();
      this.resources2 = resp;
      this.resources2data1 = this.resources2.data;
      for (var i = 0; i < this.resources2.data.length; i++) {
        if (this.resources2.data[i]) {
          var text = this.resources2.data[i].low_image_1.split("Powertexmodel");
          this.resources2data1[i].low_image_1 = 'https://gstbucket1.s3.ap-south-1.amazonaws.com/Powertexmodel' + text[1];
        }
      }
      this.minValue = this.resources2.price[0].l_price;
      this.maxValue = this.resources2.price[0].h_price;
      this.min = this.minValue;
      this.max = this.maxValue;
      this.Options = {
        floor: this.minValue,
        ceil: this.resources2.price[0].h_price,
        // step: 1
      };

    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  }



  price_max(min, m) {
    console.log(min);
    console.log(m);
  }

  price(min, max) {
    console.log(min, "--", max);

  }
  disp_catg() {
    this.catgHidden = !this.catgHidden;
  }

  disc(p) {
    console.log(p);
    this.selected_disc = p;
    this.discount = p;
    if (this.prof != undefined) {
      this.getProfesionWisePercent(this.discount);

    }
    else {
      this.spinner.show();
      return this.service.getDatawithQueryParams7User_idBrand('10', this.d, this.e, this.select, this.modal, this.order, this.range, this.discount,this.brand, this.user_id).subscribe((resp) => {
        console.log("--S3")
        this.spinner.hide();
        this.resources2 = resp;
        this.resources2data = this.resources2.data;
      },
        error => {
          this.spinner.hide();
          this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
          // console.log(error);
        });
    }
  }
  resources2datacount: any = [];
  getProfesionWisePercent(dis) {
    this.resources2 = [];
    if (this.min != undefined) {
      return this.service.getDatawithQueryParams4('1.02', this.prof, this.min, this.max, dis).subscribe((resp) => {
        console.log(resp);
        this.resources2 = resp;
        if (this.resources2.data) {
          this.resources2data = this.resources2.data;
          this.resources2datacount = this.resources2.count;
        }
      },
        error => {
          // this.spinner.hide();
          this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
          // console.log(error);
        });
    }
  }
  //wishlist-code
  addwish_list(obj, checkval) {

    this.spinner.show();
    let body = { "s.no": obj.seq_no, "productid": obj.productid, "user_id": this.loginUserData.user_id, "wishlist": checkval }
    console.log(body)
    this.methodname = "wishlist_insert/";
    this.service.postData(body, this.methodname).subscribe(data => {
      this.spinner.hide();
      console.log(data);
      if (data['Status'] == 1) {
        //  this.toasterService.success('Added to wishlist'); 

        this.wish_alert = "Added to wishlist."
        this.icon = true;
        this.obj.wishList_count = data['count'];
        this.eventemit.fire(this.obj);
        this.addwish();
        this.getdata1();
      } else if (data['Status'] == 0) {
        this.obj.wishList_count = data['count'];
        this.eventemit.fire(this.obj);
        /* this.toasterService.success('Removed  from wishList');  */

        this.wish_alert = "Removed  from wishList"
        this.icon = false;
        this.addwish();
        //  alert('removed  from wishList');
        this.getdata1();
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
  // addwish() {
  //   $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
  //  $("#success-alert").slideUp(500);
  //   });  
  // }
  addwish() {
    //   $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
    //  $("#success-alert").slideUp(500);
    //   });  
    this.alert = true;
    setInterval(() => {
      this.alert = false;
    }, 5000);
  }

  wish_list(obj, checkval) {
    if (this.token != '' && this.token != undefined) {
      this.addwish_list(obj, checkval)
    } else {
      // this.ngxSmartService.getModal('loginModal').open();
      this.dialog.open(LoginModalComponent, {
        data: {  }
      });
    }

  }
  catg_crumb(d) {
    let category = d;
    this.router.navigate(['/prod-category', category])

  }
  specftndetails: any =[];
  viewDetails(p){

    console.log(p,'p');
    this.spinner.show();

    return this.service.getDatawithQueryParams2userid('3.72',p.productid,this.loginUserData.user_id).subscribe((resp:any) => {
      this.spinner.hide();
      this.specftndetails = resp.details;
      $("#SpecificationModal").modal('show');
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  }
}
