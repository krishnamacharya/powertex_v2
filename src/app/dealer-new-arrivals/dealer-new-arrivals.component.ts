import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../global-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location} from '@angular/common';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';


@Component({
  selector: 'app-dealer-new-arrivals',
  standalone: false,
  templateUrl: './dealer-new-arrivals.component.html',
  styleUrls: ['./dealer-new-arrivals.component.scss']
})
export class DealerNewArrivalsComponent implements OnInit {
  resources2: any;
  resources1: any;
  loginUserData: any;
  ArrivalData: any;

  constructor(private service: GlobalServiceService, private _location: Location,private router: Router, private route: ActivatedRoute, private dialog: MatDialog, private spinner: NgxSpinnerService) { }
  category: any;
  brand: any;
  page: any = 1;
  newCat:boolean = true;
  newSubCat:boolean = false;
  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
      this.getdata();
  }
  onPageChange(Page: number) {
   
    this.page = Page;
    window.scrollTo(0, 0);
 }
  modal: any = [1];
  getdata() {
    this.ArrivalData = [];
    this.spinner.show();
    return this.service.getDatawithMethod1('newarvls/').subscribe((resp) => {

      this.spinner.hide();
      resp;

      this.resources1 = resp;
      this.resources2 = resp;
    },
   error => {         this.spinner.hide();
      this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      // console.log(error);
    });
  }
  selected_sub_cat(data) {
    this.newCat = false;
    this.newSubCat = true;
    this.spinner.show();
    return this.service.getDatawithMethodParams1('promocode/recent_arrival/',data).subscribe((resp) => {

      this.spinner.hide();
      resp;

      this.ArrivalData = resp;
    },
   error => {        
      this.spinner.hide();
      this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      // console.log(error);
    });
  }
  backClicked() {
    this._location.back();
  }
  getImgUrl(cat) {
    return "https://gstbucket1.s3.ap-south-1.amazonaws.com/Powertexmodel/" + cat.replace(/ /g, '') + "_c.jpg"
  }


}
