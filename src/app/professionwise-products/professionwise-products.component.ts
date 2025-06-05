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

@Component({
  selector: 'app-professionwise-products',
  standalone: false,
  templateUrl: './professionwise-products.component.html',
  styleUrl: './professionwise-products.component.scss'
})
export class ProfessionwiseProductsComponent {
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
    selectedBrand: string | null = null;
    selectedDiscount: number = 0;
      products: any;
  brands: any[] = [];
  selectedBrands: any[] = [];
    constructor(private router: Router, private route: ActivatedRoute, private service: GlobalServiceService, public dataService: DataServiceService, private _location: Location,
      private eventemit: ComponentCommunicationService, private dialog: MatDialog, private spinner: NgxSpinnerService, private toasterService: ToasterService, private activatedRoute: ActivatedRoute,) {
      this.obj.id = 4;
    }
    isRoot: boolean;
    
  
    
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const profession = params.get('profession');
      console.log('Received Category:', profession);
  
      if (profession) {
        // Call your function to fetch category-wise products
        this.getProductsByProffesion(profession);
      }
    });
    this.applyFilters();
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
getProductsByProffesion(shotform: string): void {
  this.service.getProductsByProffesion(shotform).subscribe((data: any) => {
    this.products = data.Done;
        this.setPriceRange(); // Move here
          this.extractBrands();
  });
}

  
  
  
  
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
    // clearfilters(p) {
    //   this.selected_disc = p;
    //   if (this.prof != undefined) {
    //     this.spinner.show();
    //     this.getsearch();
    //   }
    //   else {
    //     {
  
    //       this.spinner.show();
    //       this.order = '',
    //         this.range = [];
    //       return this.service.getDatawithQueryParamsBrand('10', this.d, this.e, this.select, this.modal, this.brand).subscribe((resp) => {
    //         this.spinner.hide();
    //         console.log(resp);
    //         this.resources2 = resp;
  
    //         this.resources2data = this.resources2.data;
    //         this.percenages = this.resources2.count[0];
    //         this.minValue = this.resources2.price[0].min_price;
    //         this.maxValue = this.resources2.price[0].max_price;
    //         this.min = this.minValue;
    //         this.max = this.maxValue;
    //         this.Options = {
    //           floor: this.minValue,
    //           ceil: this.resources2.price[0].max_price,
    //           // step: 1
    //         };
    //         if (this.resources2data.length >= 1) {
  
    //           this.showslider = true;
  
    //         }
    //         else {
    //           this.showslider = false;
    //         }
  
    //       },
    //         error => {
    //           this.spinner.hide();
    //           this.dialog.open(ErrorModalComponent, {
    //   data: { errorModal:true }
    // });
    //           // console.log(error);
    //         });
  
    //     }
    //   }
    // }
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
    // Ascend(order) {
  
    //   this.resources2data1 = []
    //   this.spinner.show();
    //   this.order = "";
    //   this.order = order;
    //   // this.range=[];
    //   if (this.prof != undefined) {
    //     this.getProfesionorderwise(this.order);
    //   }
    //   else {
    //     return this.service.getDatawithQueryParams7User_idBrand('7.3', this.d, this.e, this.select, this.modal, order, this.range, this.discount, this.brand, this.user_id).subscribe((resp) => {
    //       console.log("--S1")
    //       this.spinner.hide();
    //       this.resources2 = resp;
    //       this.resources2data1 = this.resources2.data;
    //       for (var i = 0; i < this.resources2.data.length; i++) {
    //         if (this.resources2.data[i]) {
    //           var text = this.resources2.data[i].low_image_1.split("Powertexmodel");
    //           this.resources2data1[i].low_image_1 = 'https://gstbucket1.s3.ap-south-1.amazonaws.com/Powertexmodel' + text[1];
    //         }
    //       }
    //       this.minValue = this.resources2.price[0].min_price;
    //       this.maxValue = this.resources2.price[0].max_price;
    //       this.min = this.minValue;
    //       this.max = this.maxValue;
    //       this.Options = {
    //         floor: this.minValue,
    //         ceil: this.resources2.price[0].max_price,
    //         // step: 1
    //       };
    //     },
    //       error => {
    //         this.spinner.hide();
    //         this.dialog.open(ErrorModalComponent, {
    //   data: { errorModal:true }
    // });
    //         // console.log(error);
    //       });
    //   }
  
    // }
  
    onPageChange(Page: number) {
      this.Page = Page;
      window.scrollTo(0, 0);
    }
  
  
    //price-filter
    // price_min(min, m) {
  
    //   this.range = [];
    //   // console.log(min);
    //   // console.log(m);
  
  
    //   let mini: number = Math.round(+min);
    //   let maxi: number = Math.round(+m);
    //   /* this.order = "acc" */
    //   this.range.push(mini);
    //   this.range.push(maxi);
    //   console.log("range-", this.range);
    //   let order = "";
    //   if (this.prof != undefined) {
  
    //     this.getProfesionWise(min, m);
    //   }
    //   else {
    //     return this.service.getDatawithQueryParams7User_idBrand('10', this.d, this.e, this.select, this.modal, this.order, this.range, this.discount,this.brand, this.user_id).subscribe((resp) => {
    //       this.spinner.hide();
  
    //       console.log("--S2")
    //       console.log(resp);
    //       this.resources2 = resp;
    //       console.log(this.resources2, "rangedata");
    //       this.resources2data1 = this.resources2.data;
    //       for (var i = 0; i < this.resources2.data.length; i++) {
    //         if (this.resources2.data[i]) {
    //           var text = this.resources2.data[i].low_image_1.split("Powertexmodel");
    //           this.resources2data1[i].low_image_1 = 'https://gstbucket1.s3.ap-south-1.amazonaws.com/Powertexmodel' + text[1];
    //         }
    //       }
    //       this.percenages = this.resources2.count[0];
  
    //     },
    //       error => {
    //         this.spinner.hide();
    //         this.dialog.open(ErrorModalComponent, {
    //   data: { errorModal:true }
    // });
    //         // console.log(error);
    //       });
    //   }
    // }
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
  
    // disc(p) {
    //   console.log(p);
    //   this.selected_disc = p;
    //   this.discount = p;
    //   if (this.prof != undefined) {
    //     this.getProfesionWisePercent(this.discount);
  
    //   }
    //   else {
    //     this.spinner.show();
    //     return this.service.getDatawithQueryParams7User_idBrand('10', this.d, this.e, this.select, this.modal, this.order, this.range, this.discount,this.brand, this.user_id).subscribe((resp) => {
    //       console.log("--S3")
    //       this.spinner.hide();
    //       this.resources2 = resp;
    //       this.resources2data = this.resources2.data;
    //     },
    //       error => {
    //         this.spinner.hide();
    //         this.dialog.open(ErrorModalComponent, {
    //   data: { errorModal:true }
    // });
    //         // console.log(error);
    //       });
    //   }
    // }
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
   
  applyFilters() {
    let filtered = [...this.resources2];
  
    // Filter by price
    if (this.minValue > 0 || this.maxValue > 0) {
      filtered = filtered.filter(p =>
        (!this.minValue || p.discounted_price >= this.minValue) &&
        (!this.maxValue || p.discounted_price <= this.maxValue)
      );
    }
  
    // Filter by brand
    if (this.selectedBrand) {
      filtered = filtered.filter(p => p.brand === this.selectedBrand);
    }
  
    // Filter by discount
    if (this.selectedDiscount > 0) {
      filtered = filtered.filter(p => p.discount_percent >= this.selectedDiscount);
    }
  
    // Sorting
    if (this.sortOrder === 'asc') {
      filtered.sort((a, b) => a.discounted_price - b.discounted_price);
    } else if (this.sortOrder === 'desc') {
      filtered.sort((a, b) => b.discounted_price - a.discounted_price);
    }
  
    this.resources2dataproduct = filtered;
  }
  price_min(min: number, max: number) {
    this.minValue = min;
    this.maxValue = max;
    this.applyFilters();
  }
  
  disc(value: any) {
    if (typeof value === 'string') {
      this.selectedBrand = value;
    } else {
      this.selectedDiscount = value;
    }
    this.applyFilters();
  }
  
  Ascend(type: 'acc' | 'dec') {
    this.sortOrder = type === 'acc' ? 'asc' : 'desc';
    this.applyFilters();
  }
  
  clearfilters(value: number) {
    this.selectedDiscount = value;
    this.selectedBrand = null;
    this.minValue = 0;
    this.maxValue = 0;
    this.sortOrder = null;
    this.applyFilters();
  }
  //apply filter all 

   //max and Min price 
  minPrice: number = 0;
  maxPrice: number = 0;
  priceRange = { min: 0, max: 0 };

  setPriceRange() {
    if (this.products.length === 0) return;

    const prices = this.products.map(p => p.mrp);
    this.priceRange.min = Math.min(...prices);
    this.priceRange.max = Math.max(...prices);
    this.minPrice = this.priceRange.min;
    this.maxPrice = this.priceRange.max;
  }

  // filteredProducts() {
  //   return this.products.filter(p => p.mrp >= this.minPrice && p.mrp <= this.maxPrice);
  // }

 
  onBrandCheckboxChange(event: Event, brand: string) {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      this.selectedBrands.push(brand);
    } else {
      this.selectedBrands = this.selectedBrands.filter(b => b !== brand);
    }
  }

 // Extract unique brand names from products
  extractBrands() {
    const allBrands = this.products.map(p => p.brand).filter(Boolean);
    this.brands = [...new Set(allBrands)];
  }


  validateMinPrice() {
    if (this.minPrice < this.priceRange.min) {
      this.minPrice = this.priceRange.min;
    }
    if (this.minPrice > this.maxPrice) {
      this.minPrice = this.maxPrice;
    }
  }

  validateMaxPrice() {
    if (this.maxPrice > this.priceRange.max) {
      this.maxPrice = this.priceRange.max;
    }
    if (this.maxPrice < this.minPrice) {
      this.maxPrice = this.minPrice;
    }
  }


  //sort low to high and high to low

  sortOrder: 'asc' | 'desc' = 'asc'; // default is Low to High

  get sortedFilteredProducts() {
    let filtered = this.products.filter(p => p.mrp >= this.minPrice && p.mrp <= this.maxPrice);

    const activeRanges = this.discountRanges.filter(r => r.checked);
    if (activeRanges.length > 0) {
      filtered = filtered.filter(p => {
        const discount = +p.discount_percent || 0;
        return activeRanges.some(r => discount >= r.min && discount < r.max);
      });
    }

    // Brand Filter
    if (this.selectedBrands.length > 0) {
      filtered = filtered.filter(p => this.selectedBrands.includes(p.brand));
    }


    return filtered.sort((a, b) => {
      return this.sortOrder === 'asc' ? a.mrp - b.mrp : b.mrp - a.mrp;
    });
  }
  // Check if there are products to display (no products for the selected filters)
  get hasProducts() {
    return this.sortedFilteredProducts.length > 0;
  }

  setSortOrder(order: 'asc' | 'desc') {
    this.sortOrder = order;
  }
  //percentage Discount

  discountRanges = [
    { label: '5% to 10%', min: 5, max: 10, checked: false },
    { label: '10% to 20%', min: 10, max: 20, checked: false },
    { label: '20% to 30%', min: 20, max: 30, checked: false },
    { label: '30% to 40%', min: 30, max: 40, checked: false },
    { label: '40% to 50%', min: 40, max: 50, checked: false },
    { label: 'More than 50%', min: 50, max: 100, checked: false }
  ];

  clearDiscountFilters() {
    this.discountRanges.forEach(range => (range.checked = false));
  }
  // Method to check if no products are found for the selected discount range
  get isNoProductsForDiscount() {
    return this.sortedFilteredProducts.length === 0;
  }
  
  }
  


