import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../global-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-product-menu2',
  standalone: false,
  templateUrl: './product-menu2.component.html',
  styleUrls: ['./product-menu2.component.scss']
})
export class ProductMenu2Component implements OnInit {
  resources: any;
selected: any;

  constructor( private service:GlobalServiceService,private router:Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getprodlist();
  }
  getprodlist(){
    this.spinner.show();
    return this.service.getDatawithMethod1('get_products_category/').subscribe((resp) => {  
      this.spinner.hide();
      this.resources = resp; console.log(this.resources);
       },
      error => {         this.spinner.hide();
         this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
         // console.log(error);
       });
  }
}
