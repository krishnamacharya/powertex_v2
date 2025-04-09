import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../global-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location} from '@angular/common';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-prod-catgegory',
  standalone: false,
  templateUrl: './prod-catgegory.component.html',
  styleUrls: ['./prod-catgegory.component.scss']
})
export class ProdCatgegoryComponent implements OnInit {
  resources2: any;
  resources1: any;

  constructor(private service: GlobalServiceService, private _location: Location,private router: Router, private route: ActivatedRoute, private dialog: MatDialog, private spinner: NgxSpinnerService) { }
  category: any;
  brand: any;
  page: any = 1;
  ngOnInit() {
    let data = this.route.params.subscribe(params => {
      this.category = params['category'];
      this.brand = params['brand'];
      console.log(this.category);
      this.getdata();
    },
   error => {         this.spinner.hide();
      this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      // console.log(error);
    });
  }
  onPageChange(Page: number) {
   
    this.page = Page;
    window.scrollTo(0, 0);
 }
  modal: any = [1];
  getdata() {
    this.spinner.show();
    // return this.service.getDatawithQueryParams1('4.8', this.category).subscribe((resp) => {
    return this.service.getDatawithMethodParams2('getsubcategory/', this.category,this.brand).subscribe((resp) => {

      this.spinner.hide();
      resp;

      this.resources1 = resp;
      this.resources2 = resp;
      for (var i = 0; i < this.resources1.length; i++) {
        if (this.resources1[i]) {
          var text = this.resources1[i].image.split("Powertexmodel");
          this.resources2[i].image = 'https://gstbucket1.s3.ap-south-1.amazonaws.com/Powertexmodel' + text[1];
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
  backClicked() {
    this._location.back();
  }
  /* ================current location====================== */
 /* goBack() {
  this._location.back();
}

goForward() {
  this._location.forward();
}
getPath() {
  console.log(this._location.path());  
}  */
/* ======================================= */
  selected_sub_cat(p) {
   
    console.log(p,'bp');
    console.log(this.category);
    let b = this.category;
    let c = btoa(p);

    let d = btoa(this.modal);
    let e = btoa("All");
    let br = btoa(this.brand);
    // this.router.navigate(['/Brands', b, c]);
    //  this.router.navigate(['/category', b, c, d, e]);
    if(!this.brand){
      this.router.navigate(['/Brands', b, p]);
    }else{
    this.router.navigate(['/category', b, c, d, e, br]);
    }
  }


}
