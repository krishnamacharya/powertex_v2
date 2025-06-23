import { Component, inject, OnInit } from '@angular/core';
import { GlobalServiceService } from '../global-service.service';
import { ComponentCommunicationService } from '../component-communication.service';
import { ToasterService } from '../toastr-service.service';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-wish-list',
  standalone: false,

  templateUrl:'./wish-list.component.html',
  styleUrl: './wish-list.component.scss',
})
export class WishListComponent implements OnInit {   
  pPage: string | number;
  sidemenu: boolean = true
  select: string;
  modal: any = [];
  brand: any;
  d: string;
  e: string;
item: any;
  viewDetails(_t19: {
    long_name: string;
    enduser_price: number;
    mrp: number;
    discount_e: number;
    image: string;
  }) {
    throw new Error('Method not implemented.');
  }
  wishList: any[] = [];
  loginUserData: any;
  methodname: any;
  token: string;
  obj: any = {};
  wish_alert: any;
  alert: boolean;
  icon: boolean;
  p: any;
  spinner = inject(NgxSpinnerService);

  constructor(
    private golbalService: GlobalServiceService,
    public dialog: MatDialog,
    private eventemit: ComponentCommunicationService,
    private toasterService: ToasterService,private router: Router
  ) {
    this.obj.id = 1;
  }

  ngOnInit() {
    this.obj.id = 1;
    this.alert = false;
    this.token = localStorage.getItem('token');
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    // this.getData();
    this.fetchWishlist();
  }
fetchWishlist(): void {
  const userId = 18; 

  this.golbalService.getWishlist(userId).subscribe({
    next: (data: any[]) => {
       
      this.wishList = data
        .filter(item => item.dtl && item.dtl.length > 0)
        .map(item => ({
          ...item.dtl[0],
          srlno: item.srlno,  
          wishlist_id: item.wishlist,
        }));
    },
    error: (err) => {
      console.error('Error fetching wishlist:', err);
    },
  });
}
deleteFromWishlist(srlno: number): void {
  this.golbalService.deleteWishlistItemBySrlno(srlno).subscribe({
    next: () => {
      // Remove item locally from wishlist after successful deletion
      this.wishList = this.wishList.filter(item => item.srlno !== srlno);
      console.log(`Item with srlno ${srlno} removed from wishlist`);
    },
    error: (err) => {
      console.error(`Error deleting item with srlno ${srlno}:`, err);
    }
  });
}




  addtocart(item) {
    this.spinner.show();
    console.log(item.productid);
    if (this.token != '' && this.token != undefined) {
      this.methodname = 'addtocart_site/';
      let body = {
        user_id: this.loginUserData.user_id,
        productid: item.productid,
        qty: 1,
      };
      this.golbalService.postData(body, this.methodname).subscribe(
        (data) => {
          this.spinner.hide();
          if (data['Status'] == 'Update sucessfully') {
            /* this.wish_alert = "This Item Already Added to Cart" */
            // this.icon = true;
            this.addwish();
            // this.message=data.Status;
            this.obj.cartItem_count = data['count'];
            this.obj.id = 1;
            this.eventemit.fire(this.obj);
            //alert("This Item Already Added to Cart");
            //$('#alrdyItemAddedModal').modal('show');
            //this.router.navigateByUrl('viewcart');
          } else if (data['Status'] == 'Inserted sucessfully') {
            this.wish_alert = 'Added to Cart';
            // this.icon = true;
            this.addwish();
            //  this.message=data.Status;
            this.obj.cartItem_count = data['count'];
            this.eventemit.fire(this.obj);
            //$('#insertItemModal').modal('show');
            //alert(data.Status);
          }
        },
        (error) => {
          this.spinner.hide();
          this.dialog.open(ErrorModalComponent, {
            data: { errorModal: true },
          });
          // this.ngxSmartService.getModal('errorModal').open();
        }
      );
    }
  }

  addwish() {
    this.alert = true;
    setInterval(() => {
      this.alert = false;
    }, 5000);
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
  getdata1() {
    throw new Error('Method not implemented.');
  }
}
