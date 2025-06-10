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
 
  
  option: any;
  modal: any = [];
  range: any = [];

 

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
  
  page: any;
  selected_disc: number = 0;
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

  }

  // card1(arg0: { Category: string; }) {
  //   this.spinner.show();
  //   this.p1 =arg0.Category;;
  //   this.p2 ="";
  //   this.p3 = "All";
  //   this.order = '',
  //     this.range = [];
  //   return this.service.getDatawithQueryParamsBrand('7.3', this.p1, this.p2,this.p3, this.order, this.range).subscribe((resp) => {
  //     this.spinner.hide();
  //     console.log(resp, "data1");
  //     this.resources2 = resp;
  //     console.log(resp, "gfrdeewgergergreterg");

  //     this.resources2dataproduct = this.resources2.data;
  //     this.percenages = this.resources2.count[0];
  //     this.minValue = this.resources2.price[0].min_price;
  //     this.maxValue = this.resources2.price[0].max_price;
  //     this.brands = this.resources2.brand;
  //     console.log(this.brands, "kjjhjghjjkhgj,bhjg")
  //     this.min = this.minValue;
  //     this.max = this.maxValue;

  //     this.Options = {
  //       floor: this.minValue,
  //       ceil: this.resources2.price[0].max_price,

  //       // step: 1
  //     };
  //     this.Ascend("acc")
  //     if (this.resources2dataproduct.length >= 1) {

  //       this.showslider = true;

  //     }
  //     else {
  //       this.showslider = false;
  //     }

  //   },
  //     error => {
  //       this.spinner.hide();
  //       this.dialog.open(ErrorModalComponent, {
  //   data: { errorModal:true }
  // });
  //       // console.log(error);
  //     });
  // }

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

  percenages: any = [];



  Options: any;
  showslider: boolean = true;
  resources2data: any = [];
  minValue: number = 1
  maxValue: number = 10000;
  sidemenu: boolean = true
  branding: any;
  // getsearch() {

  //   this.sidemenu = false
  //   this.spinner.show();
  //   return this.service.getDatawithMethodParams1('profession/', this.prof).subscribe((resp) => {
  //   // return this.service.getDatawithQueryParams1('10.08', this.prof).subscribe((resp) => {
  //     if (this.service.response == null) {
  //       console.log(this.route.routeConfig.component.name);
  //       this.spinner.show();
  //       setTimeout(() => {
  //         this.spinner.hide();

  //       }, 4000);
  //     }
  //     console.log("prof", resp);
  //     this.resources2 = resp;

  //     // this.spinner.hide(); 
  //     // this.resources2data1 = this.resources2.data;
  //     this.resources2data1 = this.resources2;
  //     for (var i = 0; i < this.resources2.data.length; i++) {
  //       if (this.resources2.data[i]) {
  //         var text = this.resources2.data[i].low_image_1.split("Powertexmodel");
  //         this.resources2data1[i].low_image_1 = 'https://gstbucket1.s3.ap-south-1.amazonaws.com/Powertexmodel' + text[1];
  //       }
  //     }
  //     this.percenages = this.resources2.count[0];
  //     this.spinner.hide
  //     /*  this.branding = this.resources2.brand; */
  //     this.minValue = this.resources2.price[0].l_price;
  //     this.maxValue = this.resources2.price[0].h_price;
  //     this.selected_disc = null;
  //     this.min = this.minValue;
  //     this.max = this.maxValue;
  //     this.Options = {
  //       floor: this.minValue,
  //       ceil: this.resources2.price[0].h_price,

  //       // step: 1
  //     };

  //     if (this.resources2data1.length >= 1) {
  //       this.showslider = true;

  //     }
  //     else {

  //       this.showslider = false;
  //     }
  //   },
  //     error => {
  //       this.dialog.open(ErrorModalComponent, {
  //   data: { errorModal:true }
  // });
  //       // console.log(error);
  //     });
  // }




  sub_cat(p) {



    if (p.productid) {


      let obj = p;
      localStorage.setItem('key', JSON.stringify(obj));
      console.log(p);

      console.log("clicked")
      this.router.navigate(['/product-detail', p.productid]);
    }
    else {





    }
  }



  onPageChange(Page: number) {
    this.Page = Page;
    window.scrollTo(0, 0);
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

      } else if (data['Status'] == 0) {
        this.obj.wishList_count = data['count'];
        this.eventemit.fire(this.obj);
        /* this.toasterService.success('Removed  from wishList');  */

        this.wish_alert = "Removed  from wishList"
        this.icon = false;
        this.addwish();
        //  alert('removed  from wishList');

      }
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal: true }
        });
        // console.log(error);
      });
  }

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
        data: {}
      });
    }

  }
  catg_crumb(d) {
    let category = d;
    this.router.navigate(['/prod-category', category])

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



