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
setSort(arg0: string) {
throw new Error('Method not implemented.');
}

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
  log_as_cust:boolean=true;
selected_sort: any;
  constructor(private spinner: NgxSpinnerService, private router: Router, private route: ActivatedRoute, private service: GlobalServiceService, public dataService: DataServiceService, private dialog: MatDialog) {

  }

  ngOnInit() {

    this.alert = false;
    this.token = localStorage.getItem('token');
    console.log("token",this.token);
    
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
        this.getdata1();
      }
      else {
        this.getsearch();
      }

    },
     error => {         this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });

  }
  getdata1() {
    this.spinner.show();
    return this.service.getDatawithQueryParams4('10', this.d, this.e, this.select, this.modal).subscribe((resp) => {
      this.spinner.hide();
      console.log(resp);

      this.resources2 = resp;
      for (var i = 0; i < this.resources2.length; i++) {
        if (this.resources2[i]) {
          var text = this.resources2[i].low_image_1.split("Powertexmodel");
          this.resources2[i].low_image_1 = 'https://gstbucket1.s3.ap-south-1.amazonaws.com/Powertexmodel' + text[1];
        }
      }
    },
     error => {         this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });

  }
  getsearch() {
    
    this.spinner.show();
    this.p2 = "";
    this.p3 = "All";
    return this.service.getDatawithQueryParams3('7.3', this.search_val, this.p2, this.p3).subscribe((resp) => {
      this.spinner.hide();
      console.log(resp);


      this.resources2 = resp;
      for (var i = 0; i < this.resources2.length; i++) {
        if (this.resources2[i]) {
          var text = this.resources2[i].low_image_1.split("Powertexmodel");
          this.resources2[i].low_image_1 = 'https://gstbucket1.s3.ap-south-1.amazonaws.com/Powertexmodel' + text[1];
        }
      }
    },
     error => {         this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  }

  //price Range
  minValue: number = 500;
  maxValue: number = 10000;
  options: Options = {
    floor: 500,
    ceil: 10000,
    step: 500
  };

  sub_cat(p) {
   
    console.log(p);
     // let category=btoa(p.category);
    // let sub_category=btoa(p.subcategory);
    // let model=btoa(p.modelno);
    let category = p.category;
    let sub_category = p.subcategory;
    let model = p.modelno;
    console.log("your Category", category, "productid", p.productid);

    let obj = p;
    localStorage.setItem('key', JSON.stringify(obj));
    // console.log(p);
    // this.obj.setCategory(p);

    //  this.router.navigateByUrl('/product-detail');
    this.router.navigate(['/product-detail',p.productid]);
  }
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
     error => {         this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
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
     error => {         this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
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
     error => {         this.spinner.hide();
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
     error => {         this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });

  }

  //wishlist-code
  wish_list() {
    /* alert('hii'); */

  }
}
