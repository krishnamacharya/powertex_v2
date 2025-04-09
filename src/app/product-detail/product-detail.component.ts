import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import 'bootstrap';
import { slider } from './product.animation';
import { HeaderComponent } from '../header/header.component';
import { GlobalServiceService } from '../global-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { ComponentCommunicationService } from '../component-communication.service';
import { ToasterService } from '../toastr-service.service';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
import { MatDialog } from '@angular/material/dialog';
interface Reviewdetails{
  releted_products:any[],
  review_dtl:any
}
@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  animations: [slider],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit {
  starList: boolean[] = [true, true, true, true, true];
  rating: number;
  review_dtl: any;
  methodname: string;
  input_id: string;
  user_id: any;
  x: any;
  sub: any;
  category: any;
  sub_c: any;
  model: any;
  select: any;
  details: any;
  cartItem_count: any;
  loginUserData: any = {};
  @ViewChild(HeaderComponent) HeaderComponent;
  token: any;
  obj: any = {};
  subcatg: any;
  attributes: any = [];
  message: any;
  prod_details: any = [];
  cr_category: any;
  modal: any = [1];
  review: any = [];
  msg: string;
  select_image: any;
  log_as_cust: boolean = true;
  id: any;
  item:any;
  data: any;
  title: any;
  comments: any;
  ratebody = {}
  proddetails: any
  ratemethod: any;
  permission: boolean;
  reviewdetails: Reviewdetails;
description: any;
page: string|number;
  
  constructor(public globalService: GlobalServiceService,private dialog: MatDialog, public dataservice: DataServiceService, public route: ActivatedRoute, private router: Router,
    private eventemit: ComponentCommunicationService, private cdRef: ChangeDetectorRef,  private toasterService: ToasterService) {
    this.obj.id = 1;
  }
  // data: any;
 
  

  /*  ======================================================== */

  ngOnInit() {
    this.token = localStorage.getItem('token');
    if (this.token != '' && this.token != undefined) {
      this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    }

    this.sub = this.route.params.subscribe(params => {
      this.id = params['productid'];
      this.getData();
    },
      error => {
        // this.spinner.hide();
        // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      });

    this.data = JSON.parse(localStorage.getItem('key'));
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };


  }


  setStar(data: any) {
    this.rating = data + 1;
    for (var i = 0; i <= 4; i++) {
      if (i <= data) {
        this.starList[i] = false;
      }
      else {
        this.starList[i] = true;
      }
    }
  }
  PostRating(rating, title, comments) : Subscription | void {
    this.token = localStorage.getItem('token');
    if (this.token != '' && this.token != undefined) {
      this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
      this.proddetails = this.details;
      this.permission = true;
      this.ratebody = { permissions: this.permission, rating: rating, title: title, comments: comments, sno: this.proddetails.seq_no, productid: this.proddetails.productid, userid: this.loginUserData.user_id };
      this.ratemethod = "review/";
      /* alert(rating + "-----" + title + "-----" + comments) */
      return this.globalService.postData(this.ratebody, this.ratemethod).subscribe(data => {

        this.toasterService.success("Review posted successfully !")
        this.getRatingReview();
        console.log("this.resources2", this.review);
        error => {
          // this.spinner.hide();
          this.toasterService.error("error !")
        };

      })
    }
    // else {
    //   // this.ngxSmartService.getModal('loginModal').open();
    // }
  }
  
  getRatingReview() {
    // this.spinner.show();
    this.details = this.details

    return this.globalService.getDatawithQueryParams2userid('3.72',this.details.productid,this.loginUserData.user_id).subscribe((resp:any) => {
      // this.spinner.hide();
      // alert('boom')
      console.log("attr", resp);

      this.reviewdetails = resp;
      for (var i = 0; i < this.reviewdetails.releted_products.length; i++) {
        if (this.reviewdetails.releted_products[i]) {
          var text = this.reviewdetails.releted_products[i].Image.split("Powertexmodel");
          this.reviewdetails.releted_products[i].Image = 'https://gstbucket1.s3.ap-south-1.amazonaws.com/Powertexmodel' + text[1];
        }
      }

    /*   console.log("reviewdetails--------------------->", this.reviewdetails) */
      // this.spinner.hide();
    },
      error => {
        // this.spinner.hide();
        // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        // console.log(error);
      });
  }

  getData() {
    if (Object.keys(this.loginUserData).length == 0) {
      this.loginUserData.user_id = '';
    }
    // this.spinner.show();
    return this.globalService.getDatawithQueryParams2userid('3.72',this.id,this.loginUserData.user_id).subscribe((resp) => {
      // this.spinner.hide();
      console.log("1", resp);

      this.details = resp; console.log("details", this.details);

      for (var i = 0; i < this.details.length; i++) {
        if (this.details[i]) {
          var text = this.details[i].high_image_1.split("Powertexmodel");
          this.details[i].high_image_1 = 'https://gstbucket1.s3.ap-south-1.amazonaws.com/Powertexmodel' + text[1];
        }
      }
      //this.getdetails();
      this.getRatingReview();
      this.getSimilar();


    },
      error => {
        // this.spinner.hide();
        // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      });
  }


  sub_cat() {

    for (let p of this.details) {
      this.subcatg = p.modelno;
      console.log("sub", this.subcatg);

    }
    return this.getattribute()
  }
  getattribute() {
    // this.spinner.show();
    return this.globalService.getDatawithQueryParams1('3.8', this.subcatg).subscribe((resp) => {
      // this.spinner.hide();
      console.log("attr", resp);

      this.attributes = resp;

    },
      error => {
        // this.spinner.hide();
        // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        // console.log(error);
      });
  }

  dis_cart() {
    console.log("2", this.loginUserData.user_type);
    if (this.token == null) {
      return false;
    }
    if (this.loginUserData.user_type != 'Customer' && this.loginUserData.user_type != 'Guest'&& this.loginUserData.user_type !='Dealer'&& this.loginUserData.user_type !='Employee'&& this.loginUserData.user_type !='Speciall' ) {
      return true;
    } else {
      return false;
    }
  }

  dis_buy() {
    if (this.token == null) {
      return false;
    }
    console.log("3", this.loginUserData.user_type);
    if (this.loginUserData.user_type != 'Customer' && this.loginUserData.user_type != 'Guest') {
      return true;
    } else {
      return false;
    }
  }

  addToCart(body): Subscription | void {
    this.token = localStorage.getItem('token');
    /* // this.spinner.show(); */
    if (localStorage['token'] != '' && localStorage['token'] != undefined) {
      
      this.methodname = "addtocart_site/";
      this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
      body = { "user_id": this.loginUserData.user_id, "productid": this.data.productid, "qty": 1 }
      //// this.spinner.show();
     return this.globalService.postData(body, this.methodname).subscribe((data) => {
        // this.spinner.hide();

        if (data['Status'] == "Update sucessfully") {
          this.toasterService.info(" This item already added to cart")

        }
        else if (data['Status'] == "Inserted sucessfully") {
          this.obj.cartItem_count = data['count'];
          this.eventemit.fire(this.obj);
          // $('#insertItemModal').modal('show');
        }
      },
        error => {
          // this.spinner.hide();
          // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
          // console.log(error);
        });
    } else {
      // this.ngxSmartService.getModal('loginModal').open();

    }

  };

  gotoPreviousInsert() {
    this.router.navigate(['/prod-category', this.details.category])
  }
    
  gotoPrevious() {
    this.router.navigateByUrl('/viewcart');
  }

  buyNow(item) {
    console.log("dd", item);

    if (localStorage['token'] != '' && localStorage['token'] != undefined) {
      localStorage.setItem('buynowItem', JSON.stringify(item));

      this.router.navigateByUrl('checkout/2');
    } else {
      // this.ngxSmartService.getModal('loginModal').open();
    }
  }
  getSimilar() {
    this.select_image = this.details.high_image_1;
      if (this.select_image) {
        var text = this.select_image.split("Powertexmodel");
        this.select_image = 'https://gstbucket1.s3.ap-south-1.amazonaws.com/Powertexmodel' + text[1];
      }
  }
  //bread-crumbs
  catg_crumb(category) {
    this.cr_category = category;
    this.router.navigate(['/prod-category', category])
  }

  sub_catg_crumb(sub_c) {
    let b = this.category;
    let c = btoa(sub_c);
    let d = btoa(this.modal);
    let e = btoa("All")
    let br = '';
    // this.router.navigate(['/category', b, c, d, e])
    this.router.navigate(['/category', b, c, d, e, br])
  }
  itemsPerPage = 3;
  itemsPerPagee(itemsPerPage) {

    this.itemsPerPage = itemsPerPage
  }

  side_img(pd) {
    console.log(pd,"pd");
    this.select_image = "";
    this.select_image = pd;
  }
  selected_catg(p) : Subscription | void {
    if (p.productid) {
      // let category = p.category;
      // let sub_category = p.subcategory;
      // let model = p.modelno;

      // let obj = p;

      if (Object.keys(this.loginUserData).length == 0) {
        this.loginUserData.user_id = '';
      }
      // this.spinner.show();
      return this.globalService.getDatawithQueryParams2userid('3.72',p.productid,this.loginUserData.user_id).subscribe((resp) => {
        // this.spinner.hide();
        localStorage.setItem('key', JSON.stringify(resp));
        this.router.navigateByUrl('/product-detail');
        this.router.navigate(['/product-detail', p.productid]);
      },
      error => {
        // this.spinner.hide();
        // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      });
    }
 }


//  ==================krishna=========
// storedData:any;
// loadStoredData() {
//   this.storedData = localStorage.getItem('myData') || 'No data found';
// }

}







