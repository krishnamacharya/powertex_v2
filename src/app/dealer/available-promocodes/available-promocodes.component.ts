import { Component, OnInit } from '@angular/core';
import {GlobalServiceService} from '../../global-service.service'
@Component({
  selector: 'app-available-promocodes',
  standalone: false,
  templateUrl: './available-promocodes.component.html',
  styleUrls: ['./available-promocodes.component.scss']
})
export class AvailablePromocodesComponent implements OnInit {
  loginUserData: any
  Page:any=1
  constructor(private service:GlobalServiceService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getoffers()
  }
  offerdetails:any
  promocodedata:any=[]
  getoffers(){
  
  
   
    this.service.getDataOnlyWithMethod("promocode/available").subscribe((resp1) =>
   
    {
     this.offerdetails=resp1;
     for(var i=0;i<this.offerdetails.length;i++){
     if(this.offerdetails[i].promocodename!=null && this.offerdetails[i].active!=0 && (this.offerdetails[i].applicable=='Web' || this.offerdetails[i].applicable=='Web/Mobile')){
       this.promocodedata.push(this.offerdetails[i])
   
     }
     console.log(this.promocodedata,"promocodedata")
     }
     
    });
  }
}
