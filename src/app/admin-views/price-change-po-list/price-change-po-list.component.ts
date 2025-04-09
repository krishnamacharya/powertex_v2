import { Component, OnInit } from '@angular/core';
import {GlobalServiceService} from '../../global-service.service';
@Component({
  selector: 'app-price-change-po-list',
  standalone: false,
  templateUrl: './price-change-po-list.component.html',
  styleUrls: ['./price-change-po-list.component.scss']
})
export class PriceChangePoListComponent implements OnInit {
  loginUserData:any
  Page:any=1
  constructor(private service:GlobalServiceService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getproductdata()
  }
  getchanged_products: any
  getproductdata() {
    this.service.getDataOnlyWithMethod("reports/mrpchange").subscribe((resp1) => {
      this.getchanged_products = resp1;
      console.log(this.getchanged_products)
    });
  }
}
