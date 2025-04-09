import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../global-service.service';
import { Location} from '@angular/common';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-brands',
  standalone: false,
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  resources2: any;
  resources1: any;
  prod: any;

  constructor(private service: GlobalServiceService, private _location: Location,private router: Router, private route: ActivatedRoute, private dialog: MatDialog, private spinner: NgxSpinnerService) { }
  category: any;
  page: any = 1;
  ngOnInit() {
    let data = this.route.params.subscribe(params => {
      this.category = params['b']; 
      if(params['c']){
        this.prod = params['c'];
      }
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
    return this.service.getcheckdata('sup/brand1/',this.category).subscribe((resp) => {
      this.spinner.hide();
      resp;
      this.resources1 = resp;
      this.resources2 = resp;
      for (var i = 0; i < this.resources1.length; i++) {
        if (this.resources1[i]) {
          var text = this.resources1[i].img.split("Powertexmodel");
          this.resources2[i].img = 'https://gstbucket1.s3.ap-south-1.amazonaws.com/Powertexmodel' + text[1];
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
   
    console.log(p);
    console.log(this.category);
    let b = this.category;
    let c = btoa(this.prod);

    let d = btoa(this.modal);
    let e = btoa("All");
    let br = btoa(p);
    if(this.prod){
    this.router.navigate(['/category', b, c, d, e, br]);
    }else{
      this.router.navigate(['/prod-category', b,p]);
    }
  }


}
