import { Component, inject, OnInit } from '@angular/core';
import { GlobalServiceService } from '../global-service.service';
import { ComponentCommunicationService } from '../component-communication.service';
import { ToasterService } from '../toastr-service.service';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-wish-list',
  standalone: false,
  
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit {
  loginUserData: any;
  wishList: any = [];
  methodname: any;
  token: string;
  obj: any = {};
  wish_alert: any;
  alert: boolean;
  icon: boolean;
  p:any;
  spinner = inject(NgxSpinnerService);

  constructor(private golbalService: GlobalServiceService,public dialog: MatDialog, private eventemit: ComponentCommunicationService,  private toasterService:ToasterService) {
    this.obj.id = 1;
  }

  ngOnInit() {
    this.obj.id = 1;
    this.alert = false;
    this.token = localStorage.getItem('token');
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getData();
  }

  getData() {
    this.spinner.show();
    this.golbalService.getDatawithQueryParams1('7.2', this.loginUserData.user_id).subscribe((resp) => {
      this.spinner.hide();
      resp;
      this.wishList = resp;
      console.log(this.wishList);
    },
     error => {
           this.spinner.hide();
           this.dialog.open(ErrorModalComponent, {
             data: { errorModal:true }
           });
           // this.ngxSmartService.getModal('errorModal').open();
     
         });
  }

  //remove wishlist 
  // remove(obj){
  //   this.methodname = 'delete_wishlist/?seq_no='+seqno;
  //     this.golbalService.deleteData(this.methodname).subscribe(data=>{
  //       if(data.status=="deleted"){
  //         alert('Product Deleted Successfully');
  //         this.getData();
  //       }
  //     })
  // }

  //update wishlist
  remove(obj) {
    this.spinner.show();
    let body = { "s.no": obj.seq_no, "productid": obj.productid, "user_id": this.loginUserData.user_id, "wishlist": 0 }
    console.log(body)
    this.methodname = "wishlist_insert/";
    this.golbalService.postData(body, this.methodname).subscribe(data => {
      this.spinner.hide();
      console.log(data);
      if (data['Status'] == 0) {
        this.wish_alert = "This Item Removed"
        this.addwish();
        this.obj.wishList_count = data['count'];
        this.obj.id = 4;
        this.eventemit.fire(this.obj);
        this.getData();
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

  addtocart(item) {
    this.spinner.show();
    console.log(item.productid)
    if (this.token != '' && this.token != undefined) {
      this.methodname = "addtocart_site/";
      let body = { "user_id": this.loginUserData.user_id, "productid": item.productid, "qty": 1 }
      this.golbalService.postData(body, this.methodname).subscribe((data) => {
        this.spinner.hide();
        if (data['Status'] == "Update sucessfully") {
         
          
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
        } else if (data['Status'] == "Inserted sucessfully") {
          this.wish_alert = "Added to Cart"
          // this.icon = true;
          this.addwish();
          //  this.message=data.Status;
          this.obj.cartItem_count = data['count'];
          this.eventemit.fire(this.obj);
          //$('#insertItemModal').modal('show');
          //alert(data.Status);
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
  }

  addwish() {
    this.alert = true;
    setInterval(() => {
      this.alert = false;
    }, 5000);
  }

}

