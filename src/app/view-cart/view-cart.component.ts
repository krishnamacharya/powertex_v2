import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../global-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataServiceService } from '../data-service.service';
import { ComponentCommunicationService } from '../component-communication.service';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var $: any;
@Component({
  selector: 'app-view-cart',
  standalone: false,
  templateUrl: './view-cart.component.html',
  styleUrl: './view-cart.component.scss',
})
export class ViewCartComponent implements OnInit {
  Spl_netprice: any;
  final_amount: any;
  gstamount: any;
  grand_total: any;
  taxAmount: any;
  net_amount: any;
  po: any = [];
  h;
  headerData: any;
  private newAttribute1: any = {};
  private fieldArray: Array<any> = [];
  input_id: string;
  user_id: string;
  count: number = 0;
  qty: number;
  carItems: any = [];
  setPosition: any;
  // location: Coordinates;
  methodname: string;
  body: { user_id: string; productid: string; qty: number };
  quantity: number;
  CartItem: any = {};
  grandtotal: any;
  prodId: any;
  loginUserData: any;
  removeItem: any;
  obj: any = {};
  message: any;
  wish_alert: string;
  icon: boolean;
  alert: boolean;
  grand_tax: any;
  savedItems: any[] = [];
  seq_no: any;
  sidemenu: boolean = true
  d: string;
  e: string;
  constructor(
    private globalService: GlobalServiceService,
    private route: Router,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private dataservice: DataServiceService,
    private eventEmmit: ComponentCommunicationService
  ) {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    console.log(this.loginUserData);
    this.obj.id = 1;
  }
  body67: {
    header: {};
  };

  ngOnInit() {
    this.viewcart1();
    this.getPriceDetails();
    this.getoffers();
    this.loadSavedItems();
    this.carItems.forEach(item => {
      item.qty = item.qty || 1;
    });

  }

  cartdata: any = [];
  cartdata2: any = [];
  gsttotal: number = 0;
  // viewcart() {
  //   // this.deletecode();

  //   /* this.spinner.show(); */
  //   this.input_id = '4.2';
  //   this.user_id = this.loginUserData.user_id;
  //   this.globalService
  //     .getDatawithQueryParams1(this.input_id, this.user_id)
  //     .subscribe(
  //       (data) => {
  //         /*  this.spinner.hide(); */
  //         if (data['status'] == 'success') {
  //           this.carItems = data['values'];
  //           this.cartdata = data;
  //           console.log(this.carItems, 'carItems');
  //           console.log(this.cartdata, 'cartdata');
  //           // this.cartdata2 = data;
  //           localStorage.setItem('cartdata2', JSON.stringify(this.cartdata));

  //           this.getPriceDetails();
  //           this.obj.cartItem_count = this.carItems.length;
  //           this.eventEmmit.fire(this.obj);
  //           this.grandtotal = 0;
  //           this.carItems.forEach((data) => {
  //             this.grandtotal = this.grandtotal + data.aftergst;
  //             this.gsttotal = this.gsttotal + data.gst_amount;
  //           });
  //         }
  //       },
  //       (error) => {
  //         this.spinner.hide();
  //         this.dialog.open(ErrorModalComponent, {
  //           data: { errorModal: true },
  //         });
  //         // this.ngxSmartService.getModal('errorModal').open();
  //       }
  //     );
  // }
  //  viewcart1(): void {
  //   this.user_id = this.loginUserData.user_id;

  //   this.globalService.getCartByUserId(this.user_id).subscribe({
  //     next: (data: any) => {
  //       // Case 1: if API returns raw array
  //       if (Array.isArray(data)) {
  //         this.carItems = data;
  //         this.cartdata = { values: data }; // in case your HTML still uses cartdata.values
  //       }
  //       // Optional Case 2: if your backend returns { status: "success", values: [...] }
  //       else if (data['status'] === 'success') {
  //         this.carItems = data['values'];
  //         this.cartdata = data;
  //       } else {
  //         console.error('Unexpected response format', data);
  //         return;
  //       }

  //       console.log(this.carItems, 'carItems');

  //       localStorage.setItem('cartdata2', JSON.stringify(this.cartdata));

  //       // ✅ Reset totals before calculation
  //       this.gsttotal = 0;
  //       this.grandtotal = 0;

  //       this.carItems.forEach((item) => {
  //         const dtl = item.dtl?.[0];
  //         if (dtl) {
  //           const mrp = parseFloat(dtl.mrp) || 0;
  //           const discount = parseFloat(dtl.discount_percent) || 0;
  //           const gst = parseFloat(dtl.gst) || 0;

  //           const discountedPrice = mrp - mrp * (discount / 100);
  //           const gstAmount = discountedPrice * (gst / 100);
  //           const finalPrice = discountedPrice + gstAmount;

  //           this.grandtotal += finalPrice;
  //           this.gsttotal += gstAmount;

  //           item.aftergst = finalPrice;
  //           item.gst_amount = gstAmount;
  //         }
  //       });

  //       // ✅ Add this line at the end:
  // this.calculateFinalTotal();
  //       this.obj.cartItem_count = this.carItems.length;
  //       this.eventEmmit.fire(this.obj);
  //     },
  //     error: (err) => {
  //       console.error('Failed to load cart data', err);
  //     },
  //   });
  // }


  //vamsi code

  subtotal: number = 0;
  gstAmount: number = 0;
  totalWithGST: number = 0;
  totalSavings: number = 0;

  viewcart1(): void {
    this.user_id = this.loginUserData.user_id;

    this.globalService.getCartByUserId(this.user_id).subscribe({
      next: (data: any) => {
        if (Array.isArray(data)) {
          this.carItems = data;
          this.cartdata = { values: data };
        } else if (data['status'] === 'success') {
          this.carItems = data['values'];
          this.cartdata = data;
        } else {
          console.error('Unexpected response format', data);
          return;
        }

        localStorage.setItem('cartdata2', JSON.stringify(this.cartdata));

        // 🔁 Reset totals
        this.subtotal = 0;
        this.gstAmount = 0;
        this.totalWithGST = 0;

        this.carItems.forEach((item) => {
          const dtl = item.dtl?.[0];
          const qty = item.qty || 1;

          if (dtl) {
      const mrp = parseFloat(dtl.mrp) || 0;
      const discount = parseFloat(dtl.discount_percent) || 0;
      const discountedPrice = mrp - (mrp * discount) / 100;

      const totalPrice = discountedPrice * qty;

      // ✅ GST-inclusive breakdown
      const taxableAmount =Math.round( (totalPrice * 100) / 118);
      const gstAmount = totalPrice - taxableAmount;
      const savings = (mrp - discountedPrice) * qty;

      this.subtotal += taxableAmount;
      this.gstAmount += gstAmount;
      this.totalSavings += savings;
    }
  });

  this.totalWithGST = Math.round(this.subtotal + this.gstAmount);


        this.obj.cartItem_count = this.carItems.length;
        this.eventEmmit.fire(this.obj);
      },
      error: (err) => {
        console.error('Failed to load cart data', err);
      },
    });
  }


//   calculateFinalTotal(): void {
//   this.subtotal = 0;
//   this.gstAmount = 0;
//   this.totalSavings = 0;

//   this.carItems.forEach((item) => {
//     const dtl = item.dtl?.[0];
//     const qty = item.qty || 1;

//     if (dtl) {
//       const mrp = parseFloat(dtl.mrp) || 0;
//       const discount = parseFloat(dtl.discount_percent) || 0;
//       const discountedPrice = mrp - (mrp * discount) / 100;

//       const itemSubtotal = discountedPrice * qty;
//       const itemGST = itemSubtotal * 0.18;
//       const itemSavings = (mrp - discountedPrice) * qty;

//       this.subtotal += itemSubtotal;
//       this.gstAmount += itemGST;
//       this.totalSavings += itemSavings;
//     }
//   });

//   this.totalWithGST = Math.round(this.subtotal + this.gstAmount);
// }


calculateFinalTotal(): void {
  this.subtotal = 0;
  this.gstAmount = 0;
  this.totalSavings = 0;

  this.carItems.forEach((item) => {
    const dtl = item.dtl?.[0];
    const qty = item.qty || 1;

    if (dtl) {
      const mrp = parseFloat(dtl.mrp) || 0;
      const discount = parseFloat(dtl.discount_percent) || 0;
      const discountedPrice = mrp - (mrp * discount) / 100;

      const totalPrice = discountedPrice * qty;

      // ✅ GST-inclusive breakdown
      const taxableAmount =Math.round( (totalPrice * 100) / 118);
      const gstAmount = totalPrice - taxableAmount;
      const savings = (mrp - discountedPrice) * qty;

      this.subtotal += taxableAmount;
      this.gstAmount += gstAmount;
      this.totalSavings += savings;
    }
  });

  this.totalWithGST = Math.round(this.subtotal + this.gstAmount);
}

  deleteFromCart(seq_no: number): void {
    this.globalService.deleteCartItemBySrlno(seq_no).subscribe({
      next: () => {
        this.carItems = this.carItems.filter((item) => item.seq_no !== seq_no);

        alert(`Cart item with srlno ${seq_no} deleted successfully`);

      this.calculateFinalTotal();

      this.obj.cartItem_count = this.carItems.length;
      this.eventEmmit.fire(this.obj);

        console.log(`Cart item with srlno ${seq_no} deleted successfully`);
      },
      error: (err) => {
        console.error(`Error deleting cart item with srlno ${seq_no}:`, err);
      },
    });
  }

  increment(data) {
    data.qty++;
    this.updateCart(data);
  this.calculateFinalTotal();

  }

  decrement(data) {
    if (data.qty > 1) {
      data.qty--;
      this.updateCart(data);
   this.calculateFinalTotal();

    }
  }

  select_qty(data) {
    data.qty;
    this.updateCart(data);
   this.calculateFinalTotal();

  }
  pricedetails: any = [];
  pricedetails2: any = [];
  getPriceDetails() {
    this.cartdata2 = JSON.parse(localStorage.getItem('cartdata2'));
    let body = {
      net_amount: this.cartdata2.grandtotal,
      gst: this.gsttotal,
      process: 'PO',
    };
    console.log(body);
    this.globalService
      .postData(body, 'promocode/checkom/')
      .subscribe((resp1) => {
        this.pricedetails = resp1;
        localStorage.setItem(
          'pricedetails2',
          JSON.stringify(this.pricedetails)
        );
      });
  }


  updateCart(data) {
    const updatedBody = {
      productid: data.productid,
      qty: data.qty
    };




    this.globalService.patchCartItem(data.seq_no, updatedBody).subscribe(
      (response) => {
        console.log(response);
        if (response['Status'] === 'Update sucessfully') {
          this.viewcart1(); // Refresh cart
        }
      },
      (error) => {
        console.error('Error updating cart:', error);
      }
    );
  }
  saveForLater(item: any) {
    const payload = {
      user_id: this.loginUserData.user_id,
      productid: item.dtl[0].productid,
      qty: item.qty,
      seq_no: item.seq_no
    };

    this.globalService.postSaveForLater(payload).subscribe({
      next: (res) => {
        console.log('Saved for later', res);
        // remove from cart and add to savedItems list
        this.carItems = this.carItems.filter(ci => ci.seq_no !== item.seq_no);
        this.savedItems.push(item);

         // ✅ Recalculate totals
      this.calculateFinalTotal();

      // ✅ Update cart count in header
      this.obj.cartItem_count = this.carItems.length;
      this.eventEmmit.fire(this.obj);
      },
      error: (err) => console.error('Save for later failed', err)
    });
  }

  loadSavedItems() {
    const userId = this.loginUserData.user_id;

    this.globalService.getSaveForLaterItems(userId).subscribe({
      next: (response: any) => {
        this.savedItems = response;
        console.log('Saved items loaded:', this.savedItems);
      },
      error: (err) => {
        console.error('Error fetching saved items:', err);
      }
    });
  }
  deleteFromSaveForLater(item: any) {
    const userId = this.loginUserData.user_id;
    const payload = { seq_no: item.seq_no };

    this.globalService.deleteSaveForLaterItem(userId, payload).subscribe({
      next: (res: any) => {
        console.log('Deleted successfully:', res);
        this.savedItems = this.savedItems.filter(si => si.seq_no !== item.seq_no);
      },
      error: (err) => {
        console.error('Error deleting item:', err);
      }
    });
  }


  // Move single item to cart
  moveToCart(item: any) {
    const payload = {
      user_id: this.loginUserData.user_id,
      productid: item.dtl[0].productid,
      qty: item.qty,
      category: item.category,
      userid: this.user_id,
    };

    // Step 1: Add to Cart
    this.globalService.addToCart(payload).subscribe({
      next: (res: any) => {
        console.log('Added to cart:', res);


        const patchBody = {
          savelater: 0,
          seq_no: item.seq_no
        };

        this.globalService.updateSaveForLaterStatus(this.loginUserData.user_id, patchBody).subscribe({
          next: () => {
            console.log('Updated saveto_later status');

            this.savedItems = this.savedItems.filter(si => si.seq_no !== item.seq_no);

            this.viewcart1?.();
            
          },
          error: (err) => {
            console.error('Failed to update saveto_later status:', err);
          }
        });
      },
      error: (err) => {
        console.error('Failed to add to cart:', err);
      }
    });
  }



  addwish() {
    this.alert = true;
    setInterval(() => {
      this.alert = false;
    }, 5000);
  }
  change() {
    this.route.navigateByUrl('home');
  } // your cart items array

  remove(type: string): void {
    if (type === 'All') {
      this.carItems = []; // Clear the array
      console.log('All items removed from cart');
    }
  }

  deleteConfirm() {
    this.spinner.show();
    $('#confirmModal').modal('hide');
    this.user_id = this.loginUserData.user_id;
    this.methodname =
      'delete_cart/?user_id=' + this.user_id + '&productid=' + this.removeItem;
    this.globalService.deleteData(this.methodname).subscribe(
      (data) => {
        this.spinner.hide();
        this.viewcart1();
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
  addupd(selected, attr, field) {
    if (attr['category'] && this.count == 0) {
      this.fieldArray.push(attr);
      this.po = [...selected, ...this.fieldArray];
    } else {
      this.po = [...selected, ...this.fieldArray];
    }
    //this.poHidden = !this.poHidden;
    //this.addressHidden = !this.poHidden;
    this.check_po(this.po);
    console.log('total', this.po);
    window.scrollTo(0, 0);
  }
  check_po(po: any) {
    throw new Error('Method not implemented.');
  }
  gotoCheckout() {
    if (this.loginUserData.user_type == 'Customer') {
      this.route.navigateByUrl('checkout/1');
    } else {
      this.route.navigate(['/Dealer-ORDERS'], { queryParams: { cart: true } });
    }

    //
  }

  offerdetails: any;
  promocodedata: any = [];
  getoffers() {
    this.globalService
      .getDataOnlyWithMethod('promocode/available')
      .subscribe((resp1) => {
        this.offerdetails = resp1;
        for (var i = 0; i < this.offerdetails.length; i++) {
          if (
            this.offerdetails[i].promocodename != null &&
            this.offerdetails[i].active != 0 &&
            (this.offerdetails[i].applicable == 'Web' ||
              this.offerdetails[i].applicable == 'Web/Mobile')
          ) {
            this.promocodedata.push(this.offerdetails[i]);
          }
          console.log(this.promocodedata, 'promocodedata');
        }
      });
  }

  promocode: any;
  deletecode() {
    this.promocode = '';
    // this.applycodedetails = ''
    this.messagep = false;
    this.applyprice(this.promocode, this.applycodedetails, false);
  }
  applycodedetails: any;
  data: any;
  messagep: boolean = false;
  applyfor: any;
  applycode(promocode) {
    // $('#viewpromocodesmodal').modal('hide');
    this.promocode = promocode;
    for (let d of this.promocodedata) {
      if (d.promocodename == promocode) {
        this.applyfor = d.applyfor;
      }
    }
    // this.response.price
    this.cartdata2 = JSON.parse(localStorage.getItem('cartdata2'));
    this.data = {
      promocode: promocode,
      net_amount: this.cartdata2.endusergrandtotal,
      applyfor: this.applyfor,
      user_id: this.loginUserData.user_id,
    };
    this.globalService
      .postData(this.data, 'promocode/check/')
      .subscribe((resp1) => {
        this.applycodedetails = resp1;
        console.log(this.applycodedetails, 'this.applycodedetails');
        if (this.applycodedetails.apply == true) {
          this.messagep = true;
          this.applyprice(this.promocode, this.applycodedetails, true);
        } else {
          //  this.applycodedetails=""
          //  this.message=false
          //  console.log(this.applycodedetails,"this.applycodedetails")
          //  this.applyprice(this.promocode, this.applycodedetails, false)
          this.deletecode();
        }
      });
  }
  promo_amount: any;
  applyprice(code, data, event) {
    // this.cartdata2 = JSON.parse(localStorage.getItem('cartdata2'));
    this.pricedetails2 = JSON.parse(localStorage.getItem('pricedetails2'));
    if (event == true) {
      this.cartdata.endusergrandtotal = data.price;
      this.pricedetails.devicediscamount = data.promo_amount;
      this.promocode = code;
      this.cartdata.grand_tax = data.gst;
      this.grandtotal = data.finalamount;
    } else {
      this.cartdata.endusergrandtotal = this.cartdata2.endusergrandtotal;
      this.pricedetails.devicediscamount = this.pricedetails2.devicediscamount;
      this.promocode = '';
      this.cartdata.grand_tax = this.cartdata2.grand_tax;
      this.grandtotal = this.cartdata2.grandtotal;
    }
  }
  applyPromocode() {
    const couponCode = this.promocode;
    const customerId = this.loginUserData.user_id;
    const orderValue = Math.floor(Number(this.grandtotal));

    this.globalService.getCouponDetails(couponCode, customerId, orderValue).subscribe({
      next: (res: any) => {
        if (res && res.status === 1) {
          // It is a valid code
          this.applycodedetails = { promo_amount: res.data };
          this.messagep = true;
        } else {
          // Invalid code
          this.applycodedetails = { promo_amount: 0 };
          this.messagep = false;
        }
        console.log('Coupon Response:', res);
      },
      error: (err) => {
        console.error('Coupon error:', err);
        this.applycodedetails = { promo_amount: 0 };
        this.messagep = false;
      }
    });
  }


  sub_cat(product) {

    console.log(product);
    if (product.productid) {
      let category = product.category;
      let sub_category = product.subcategory;
      let model = product.modelno;

      let obj = product;
      localStorage.setItem('key', JSON.stringify(obj));
      console.log(product);
      // this.obj.setCategory(p);

      console.log("clicked")
      this.route.navigateByUrl('/product-detail');
      this.route.navigate(['/product-detail', product.productid]);
    }
    else {
      this.sidemenu = true
      this.d = product.category
      this.e = product.subcategory

    }

  }





}
