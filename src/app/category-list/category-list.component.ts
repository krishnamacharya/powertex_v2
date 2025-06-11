


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
declare var $: any;

@Component({
  selector: 'app-category-list',
  standalone: false,
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit {
  Page: any = 1;
  category: any;
  sub_c: any;
  sub: any;
  option: any;
  modal: any = [];
  discount: number = 1;
  selected_disc: number = 2;
  wish_color = "#a09898";
  loginUserData: any;
  methodname: string;
  token: any;
  wish_alert: any;
  alert: boolean;
  user_id: any;
  icon: boolean;
  profession: any;
  log_as_cust: boolean = true;
  sort: any;
  page: any;
  brand: any;
  p: any;
  title: any;
  products: any;
  brands: any[] = [];
  selectedBrands: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private service: GlobalServiceService, public dataService: DataServiceService, private _location: Location,
    private eventemit: ComponentCommunicationService, private dialog: MatDialog, private spinner: NgxSpinnerService, private toasterService: ToasterService, private activatedRoute: ActivatedRoute,) {

  }
  isRoot: boolean;



  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      this.page = +params['page'] || 0;
    });

    this.alert = false;
    this.token = localStorage.getItem('token');
    console.log("token", this.token);

    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));

    this.sub = this.route.params.subscribe(params => {

      this.profession = params['profession'];

      if (this.token == null) {
        this.user_id = '';
      } else {
        this.user_id = this.loginUserData.user_id;
        if (this.loginUserData.user_type !== 'Customer' && this.loginUserData.user_type !== 'Guest') {
          this.log_as_cust = false;
        }
      }



      this.getsearch();


      this.spinner.show;
    }, error => {
      this.spinner.hide();
      this.dialog.open(ErrorModalComponent, {
        data: { errorModal: true }
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  goBack() {
    this._location.back();
  }





  css1: any = 'img-thumbnail';

  getdata1() {
    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      const subcategory = params['subcategory'];

      if (category) {
        this.title = category;
        this.service.getDatawithQueryParamsBrands('category', category).subscribe(resp => {
          this.products = resp.Done || [];
          this.setPriceRange(); // Move here
          this.extractBrands();
        });
      } else if (subcategory) {
        this.title = subcategory;
        this.service.getDatawithQueryParamsBrands('subcategory', subcategory).subscribe(resp => {
          this.products = resp.Done || [];
          this.setPriceRange(); // Move here
          this.extractBrands();

        });

      }

    })
  }
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


  //sort low to high and high to low,Discount,brand filters

  sortOrder: 'asc' | 'desc' = 'asc'; // default is Low to High

  get sortedFilteredProducts() {
    let filtered = this.products.filter((p: any) => p.mrp >= this.minPrice && p.mrp <= this.maxPrice);

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


    return filtered.sort((a: any, b) => {
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

  get isNoProductsForDiscount() {
    return this.sortedFilteredProducts.length === 0;
  }

  sidemenu: boolean = true


  getsearch() {

    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      const subcategory = params['subcategory'];

      if (category) {
        this.title = category;
        this.service.getDatawithQueryParamsBrands('category', category).subscribe(resp => {
          this.products = resp.Done || [];
          this.setPriceRange(); // Move here
          this.extractBrands();
        });
      } else if (subcategory) {
        this.title = subcategory;
        this.service.getDatawithQueryParamsBrands('subcategory', subcategory).subscribe(resp => {
          this.products = resp.Done || [];
          this.setPriceRange(); // Move here
          this.extractBrands();
        });
      }
    });
  }




  sub_cat(p) {

    console.log(p);
    if (p.productid) {
      let obj = p;
      localStorage.setItem('key', JSON.stringify(obj));
      console.log(p);
      // this.obj.setCategory(p);

      this.router.navigateByUrl('/product-detail');
      this.router.navigate(['/product-detail', p.productid]);
    }
    else {
      this.sidemenu = true
      // console.log("your Category", category, "productid", p.productid);
      this.getdata1()
    }
  }



  onPageChange(Page: number) {
    this.Page = Page;
    window.scrollTo(0, 0);
  }

  catg_crumb(d) {
    let category = d;
    this.router.navigate(['/prod-category', category])

  }
  specftndetails: any = [];

}
