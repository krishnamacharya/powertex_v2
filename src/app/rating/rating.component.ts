import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { GlobalServiceService } from '../global-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-rating',
  standalone: false,
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  constructor( private service:GlobalServiceService, private spinner: NgxSpinnerService) { }

  @Input() rating: number;
  @Input() itemId: number;
  @Input() order:any;
  @Input() loginUserData:any;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();

  inputName: string;
  ngOnInit() {
    this.inputName = this.itemId + '_rating';
  }
  onClick(rating: number): void {
    this.rating = rating;
    console.log(this.order);
    console.log(this.loginUserData);
    console.log(this.rating);
    
    this.ratingClick.emit({
      itemId: this.itemId,
      rating: rating
    });
    this.rate_post();
  }
  rate_post(){
    this.spinner.show();
    let loginMethod = 'review/';
    let body = {"sno": this.order.seqno, "userid": this.loginUserData.user_id,"productid":this.order.productid ,"rating":this.rating };
     return this.service.postData(body, loginMethod).subscribe((data) => {
      this.spinner.hide();
      if (data['status'] == "inserted" || "updated") {
        console.log(data['status']);
      }
    });
  }

}
