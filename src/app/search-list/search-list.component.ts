import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalServiceService } from '../global-service.service';
// import { Category } from "../category-list/category";
import { DataServiceService } from '../data-service.service';
import { Options } from '@angular-slider/ngx-slider';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-search-list',
  standalone: false,
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {
products: any[] = [];

  sidemenu: any;


  Page: any = 1;
  category: any;
  sub_c: any;
  sub: any;
  d: any;
  e: any;
  f: any;
  resources2: any;
  option: any;
  modal: any = [];
  range: any = [];
  select: any;
  order: string;
  catgHidden: boolean = false;
  discount: number = 1;
  selected_disc: number = 2;
  search_val: any;
  wish_color = "#a09898";
  p2: string;
  p3: string;
  p4: string;
  loginUserData: any;
  methodname: string;
  token: any;
  wish_alert: any;
  alert: boolean;
  obj: any = {};
  user_id: any;
  icon: boolean;
  log_as_cust: boolean = true;
  selected_sort: any;
  constructor(private spinner: NgxSpinnerService, private router: Router, private route: ActivatedRoute, private service: GlobalServiceService, public dataService: DataServiceService, private dialog: MatDialog) {

  }

  ngOnInit() {

    this.alert = false;
    this.token = localStorage.getItem('token');
    console.log("token", this.token);

    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.sub = this.route.params.subscribe(params => {
      this.search_val = params['search'];


      console.log("search", this.search_val);
      if (this.search_val === undefined) {
        this.d = params['b'];
        this.sub_c = params['c'];
        this.modal = atob(params['d']);
        this.select = atob(params['e']);
        // this.d=this.category;
        this.e = atob(this.sub_c);
        console.log(this.d, "", this.e, "", this.select, this.modal);
        this.getsearch1();
      }
      else {
        this.getsearch1();
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
  getdata1() {
    this.spinner.show();
    return this.service.getDatawithQueryParams4('10', this.d, this.e, this.select, this.modal).subscribe((resp) => {
      this.spinner.hide();
      console.log("this is vamsi", resp);

      this.resources2 = resp;
      for (var i = 0; i < this.resources2.length; i++) {
        if (this.resources2[i]) {
          var text = this.resources2[i].low_image_1.split("Powertexmodel");
          this.resources2[i].low_image_1 = 'https://gstbucket1.s3.ap-south-1.amazonaws.com/Powertexmodel' + text[1];
        }
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
 

  getsearch1() {
    this.spinner.show();

    this.service.getSearchData('search', this.search_val).subscribe(
      (resp: any) => {
        this.spinner.hide();
        console.log(resp);

        this.products = resp;
        this.setPriceRange(); // Move here
        this.extractBrands();

        for (let i = 0; i < this.products.length; i++) {
          if (this.products[i]) {
            const text = this.products[i].low_image_1.split("Powertexmodel");
            this.products[i].low_image_1 = 'https://gstbucket1.s3.ap-south-1.amazonaws.com/Powertexmodel' + text[1];
          }
        }
      },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal: true }
        });
      }
    );
  }

  //price Range


  //price order-filter
  Ascend() {
    this.spinner.show();
    this.order = "";
    this.order = "acc";
    console.log(this.order);

    return this.service.getDatawithQueryParams7User_id('10', this.d, this.e, this.select, this.modal, this.order, this.range, this.discount, this.user_id).subscribe((resp) => {
      this.spinner.hide();
      console.log(resp);

      this.resources2 = resp; console.log(this.resources2);
      for (var i = 0; i < this.resources2.length; i++) {
        if (this.resources2[i]) {
          var text = this.resources2[i].low_image_1.split("Powertexmodel");
          this.resources2[i].low_image_1 = 'https://gstbucket1.s3.ap-south-1.amazonaws.com/Powertexmodel' + text[1];
        }
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

  Descend() {
    this.spinner.show();
    this.order = "";
    this.order = "dec";
    return this.service.getDatawithQueryParams7User_id('10', this.d, this.e, this.select, this.modal, this.order, this.range, this.discount, this.user_id).subscribe((resp) => {
      this.spinner.hide();
      console.log(resp);

      this.resources2 = resp; console.log(this.resources2);
      for (var i = 0; i < this.resources2.length; i++) {
        if (this.resources2[i]) {
          var text = this.resources2[i].low_image_1.split("Powertexmodel");
          this.resources2[i].low_image_1 = 'https://gstbucket1.s3.ap-south-1.amazonaws.com/Powertexmodel' + text[1];
        }
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


  //price-filter
  price_min(min, m) {
    this.spinner.show();
    this.range = [];
    // console.log(min);
    // console.log(m);
    let mini: number = +min;
    let maxi: number = +m
    this.range.push(mini);
    this.range.push(maxi);
    console.log("range-", this.range);
    let order = "";
    return this.service.getDatawithQueryParams7('7.3', this.search_val, this.p2, this.p3, this.p4, this.order, this.range, this.discount).subscribe((resp) => {
      this.spinner.hide();
      console.log(resp);

      this.resources2 = resp; console.log(this.resources2);
      for (var i = 0; i < this.resources2.length; i++) {
        if (this.resources2[i]) {
          var text = this.resources2[i].low_image_1.split("Powertexmodel");
          this.resources2[i].low_image_1 = 'https://gstbucket1.s3.ap-south-1.amazonaws.com/Powertexmodel' + text[1];
        }
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

 

  disc(p) {
    this.spinner.show();
    console.log(p);
    this.selected_disc = p;
    this.discount = p;
    return this.service.getDatawithQueryParams7('7.3', this.search_val, this.p2, this.p3, this.p4, this.order, this.range, this.discount).subscribe((resp) => {
      this.spinner.hide();
      console.log(resp);

      this.resources2 = resp; console.log(this.resources2);
      for (var i = 0; i < this.resources2.length; i++) {
        if (this.resources2[i]) {
          var text = this.resources2[i].low_image_1.split("Powertexmodel");
          this.resources2[i].low_image_1 = 'https://gstbucket1.s3.ap-south-1.amazonaws.com/Powertexmodel' + text[1];
        }
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

  //wishlist-code
  wish_list() {
    /* alert('hii'); */

  }

discountRanges = [
  { label: '5% to 10%', min: 5, max: 10, checked: false },
  { label: '10% to 20%', min: 10, max: 20, checked: false },
  { label: '20% to 30%', min: 20, max: 30, checked: false },
  { label: '30% to 40%', min: 30, max: 40, checked: false },
  { label: '40% to 50%', min: 40, max: 50, checked: false },
  { label: 'More than 50%', min: 50, max: 100, checked: false }
];

  //apply filter
  //max and Min price 
  minPrice: number = 0;
  maxPrice: number = 0;
  priceRange = { min: 0, max: 0 };

  brands: any[] = [];
  selectedBrands: any[] = [];


  setPriceRange(): void {
    if (this.products.length === 0) return;

    const prices = this.products.map(p => p.mrp || 0);
    this.priceRange.min = Math.min(...prices);
    this.priceRange.max = Math.max(...prices);
    this.minPrice = this.priceRange.min;
    this.maxPrice = this.priceRange.max;
  }

  extractBrands(): void {
    const allBrands = this.products.map(p => p.brand).filter(Boolean);
    this.brands = [...new Set(allBrands)];
  }

  validateMinPrice(): void {
    this.minPrice = Math.max(this.minPrice, this.priceRange.min);
    this.minPrice = Math.min(this.minPrice, this.maxPrice);
  }

  validateMaxPrice(): void {
    this.maxPrice = Math.min(this.maxPrice, this.priceRange.max);
    this.maxPrice = Math.max(this.maxPrice, this.minPrice);
  }

  onBrandCheckboxChange(event: Event, brand: string): void {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      this.selectedBrands.push(brand);
    } else {
      this.selectedBrands = this.selectedBrands.filter(b => b !== brand);
    }
  }

  clearDiscountFilters(): void {
    this.discountRanges.forEach(range => range.checked = false);
  }

  setSortOrder(order: 'asc' | 'desc'): void {
    this.sortOrder = order;
  }
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

    if (this.selectedBrands.length > 0) {
      filtered = filtered.filter(p => this.selectedBrands.includes(p.brand));
    }

    return filtered.sort((a, b) => this.sortOrder === 'asc' ? a.mrp - b.mrp : b.mrp - a.mrp);
  }

  get hasProducts(): boolean {
    return this.sortedFilteredProducts.length > 0;
  }

  get isNoProductsForDiscount(): boolean {
    return this.sortedFilteredProducts.length === 0;
  }

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

      this.router.navigateByUrl('/product-detail');
      this.router.navigate(['/product-detail', p.productid]);
    }
    else {
      this.sidemenu = true
      this.d = p.category
      this.e = p.subcategory


      // console.log("your Category", category, "productid", p.productid);
      this.getdata1()
    }
  }

  // setSort(arg: string): void {
  //   if (arg === 'low') {
  //     this.setSortOrder('asc');
  //   } else if (arg === 'high') {
  //     this.setSortOrder('desc');
  //   }
  // }
}
