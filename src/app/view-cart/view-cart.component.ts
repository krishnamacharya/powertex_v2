import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../global-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataServiceService } from '../data-service.service';
import { ComponentCommunicationService } from '../component-communication.service';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-view-cart',
  standalone: false,
  
  templateUrl: './view-cart.component.html',
  styleUrl: './view-cart.component.scss'
})
export class ViewCartComponent implements OnInit {
  Spl_netprice: any;
  final_amount: any
  gstamount: any
  grand_total: any
  taxAmount: any
  net_amount: any
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
  body: { "user_id": string; "productid": string; "qty": number; };
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

  constructor(private globalService: GlobalServiceService, private route: Router, private dialog:MatDialog, private spinner: NgxSpinnerService,
    private dataservice: DataServiceService, private eventEmmit: ComponentCommunicationService) {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    console.log(this.loginUserData);
    this.obj.id = 1;
  }
  body67:{
    header:{};

  }

  ngOnInit() {
    this.viewcart();
    this.getPriceDetails();
    this.getoffers();
  }
  cartdata: any = [];
  cartdata2: any = [];
  gsttotal: number = 0
  viewcart() {
    // this.deletecode();

    /* this.spinner.show(); */
    this.input_id = "4.2";
    this.user_id = this.loginUserData.user_id;
    this.globalService.getDatawithQueryParams1(this.input_id, this.user_id).subscribe((data) => {
      /*  this.spinner.hide(); */
      if (data['status'] == "success") {
        this.carItems = data['values'];
        this.cartdata = data;
        console.log(this.carItems,"carItems");
        console.log(this.cartdata,"cartdata");
        // this.cartdata2 = data;
      localStorage.setItem('cartdata2',JSON.stringify(this.cartdata))

        this.getPriceDetails();
        this.obj.cartItem_count = this.carItems.length;
        this.eventEmmit.fire(this.obj);
        this.grandtotal = 0;
        this.carItems.forEach(data => {
          this.grandtotal = this.grandtotal + ((data.aftergst));
          this.gsttotal = this.gsttotal + (data.gst_amount)
        });
      }
    },
       error => {
                this.spinner.hide();
                this.dialog.open(ErrorModalComponent, {
                  data: { errorModal:true }
                });
                // this.ngxSmartService.getModal('errorModal').open();
          
              });
  }

  increment(data) {
    data.qty++;
    this.updateCart(data);
  }

  decrement(data) {
    if (data.qty > 1) {
      data.qty--;
      this.updateCart(data);
    }

  }
  /* ==================================== */
  select_qty(data) {

    data.qty;
    this.updateCart(data)

  }
  /* ====================================== */
  /* ===================================== */
  pricedetails: any = [];
  pricedetails2: any = [];
  getPriceDetails() {
    this.cartdata2 = JSON.parse(localStorage.getItem('cartdata2'));
    let body = { "net_amount": this.cartdata2.grandtotal, "gst": this.gsttotal, "process": "PO" }
    console.log(body);
    this.globalService.postData(body, "promocode/checkom/").subscribe((resp1) => {
      this.pricedetails = resp1;
      localStorage.setItem('pricedetails2',JSON.stringify(this.pricedetails))
    })
  }
  updateCart(data) {
    /* this.spinner.show(); */
    this.methodname = "addtocart_site/";
    this.body = { "user_id": this.loginUserData.user_id, "productid": data.productid, "qty": data.qty }
    this.globalService.postData(this.body, this.methodname).subscribe((data) => {
      /*  this.spinner.hide(); */
      console.log(data);
      if (data['Status'] == "Update sucessfully") {
        // this.message = data.Status;
        /*   this.wish_alert = 'Updated sucessfully';
          this.addwish(); */
        // this.icon = true;
        //alert("cart Updated Successfully");
        //$('#cartUpdatedModal').modal('show');
        this.viewcart();
      }
    },
      error => {         /*  this.spinner.hide(); */
        // this.ngxSmartService.getModal('errorModal').open();
        // console.log(error);
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
  }
  remove(item) {
    this.removeItem = item;
    $('#confirmModal').modal('show');
  }

  deleteConfirm() {

    this.spinner.show();
    $('#confirmModal').modal('hide');
    this.user_id = this.loginUserData.user_id;
    this.methodname = 'delete_cart/?user_id=' + this.user_id + '&productid=' + this.removeItem;
    this.globalService.deleteData(this.methodname).subscribe((data) => {
      this.spinner.hide();
      this.viewcart();
    },
    error => {
      this.spinner.hide();
      this.dialog.open(ErrorModalComponent, {
        data: { errorModal:true }
      });
      // this.ngxSmartService.getModal('errorModal').open();

    });
  }
  addupd(selected, attr, field) {

    if (attr['category'] && this.count == 0) {
      this.fieldArray.push(attr);
      this.po = [...selected, ...this.fieldArray];
    }
    else {
      this.po = [...selected, ...this.fieldArray];
    }
    //this.poHidden = !this.poHidden;
    //this.addressHidden = !this.poHidden;
    this.check_po(this.po);
    console.log("total", this.po);
    window.scrollTo(0, 0)

  }
  check_po(po: any) {
    throw new Error("Method not implemented.");
  }
  gotoCheckout() {
    if (this.loginUserData.user_type == "Customer") {
      this.route.navigateByUrl('checkout/1');

    } else {
      this.route.navigate(['/Dealer-ORDERS'], { queryParams: { cart: true } });
    }

    //

  }

  offerdetails: any
  promocodedata: any = []
  getoffers() {
    this.globalService.getDataOnlyWithMethod("promocode/available").subscribe((resp1) => {
      this.offerdetails = resp1;
      for (var i = 0; i < this.offerdetails.length; i++) {
        if (this.offerdetails[i].promocodename != null && this.offerdetails[i].active != 0 && (this.offerdetails[i].applicable == 'Web' || this.offerdetails[i].applicable == 'Web/Mobile')) {
          this.promocodedata.push(this.offerdetails[i])

        }
        console.log(this.promocodedata, "promocodedata")
      }

    });
  }

  promocode: any;
  deletecode() {
    this.promocode = ''
    // this.applycodedetails = ''
    this.messagep = false
    this.applyprice(this.promocode, this.applycodedetails, false)
  }
  applycodedetails: any
  data: any
  messagep: boolean = false
  applyfor: any
  applycode(promocode) {
    // $('#viewpromocodesmodal').modal('hide');
    this.promocode = promocode
    for (let d of this.promocodedata) {
      if (d.promocodename == promocode) {
        this.applyfor = d.applyfor
      }
    }
    // this.response.price
    this.cartdata2 = JSON.parse(localStorage.getItem('cartdata2'));
    this.data = { "promocode": promocode, "net_amount": this.cartdata2.endusergrandtotal, "applyfor": this.applyfor, "user_id": this.loginUserData.user_id }
    this.globalService.postData(this.data, "promocode/check/").subscribe((resp1) => {
      this.applycodedetails = resp1;
      console.log(this.applycodedetails, "this.applycodedetails")
      if (this.applycodedetails.apply == true) {
        this.messagep = true;
        this.applyprice(this.promocode, this.applycodedetails, true)
      }
       else{
        //  this.applycodedetails=""
        //  this.message=false
        //  console.log(this.applycodedetails,"this.applycodedetails")
        //  this.applyprice(this.promocode, this.applycodedetails, false)
          this.deletecode();
        }

    })
  }
  promo_amount: any;  
  // <p class="grand_price text-right">{{cartdata.endusergrandtotal | currency:'INR'}}</p>       TAXABLE AMOUNT
  // <p class="grand_price text-right">{{pricedetails.devicediscamount| currency:'INR'}}</p>     EXTRA DISCOUNT
  // <p class="grand_price text-right">{{cartdata.grand_tax| currency:'INR'}}</p>                GST AMOUNT(18%)
  // <p class="grand_price text-right">{{pricedetails.trasnport_charges| currency:'INR'}}</p>    Transport Ch
  // <p class="grand_price text-right">{{grandtotal + ( pricedetails.trasnport_charges) | currency:'INR'}}  GRAND TOTAL
  applyprice(code, data, event) {
    // this.cartdata2 = JSON.parse(localStorage.getItem('cartdata2'));
    this.pricedetails2 = JSON.parse(localStorage.getItem('pricedetails2'));
    if (event == true) {
      this.cartdata.endusergrandtotal = data.price;
      this.pricedetails.devicediscamount = data.promo_amount;
      this.promocode = code;
      this.cartdata.grand_tax = data.gst;
      this.grandtotal = data.finalamount;
    }
    else {
      this.cartdata.endusergrandtotal = this.cartdata2.endusergrandtotal;
      this.pricedetails.devicediscamount = this.pricedetails2.devicediscamount;
      this.promocode = "";
      this.cartdata.grand_tax = this.cartdata2.grand_tax;
      this.grandtotal = this.cartdata2.grandtotal;

    }
  }

}
