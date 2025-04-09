import { Injectable } from '@angular/core';
import { GlobalServiceService } from "./global-service.service";
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  data: any;
  response: any;
  data1: any;
  loginData: any;
  cartcount: any;
  outstandingdetails=new BehaviorSubject<any>([]);
  getoutstandingdetails=this.outstandingdetails.asObservable();
  constructor(private globalService: GlobalServiceService) { }
  getOnLoadServices(input_id) {
    let obs = this.globalService.getDatawithInput_id(input_id);
    obs.subscribe(
      data => {
        this.response = data;
      });
    return obs;
  };
  getOnLoadServicesparam1(input_id,param1) {
    let obs = this.globalService.getDatawithQueryParams1(input_id,param1);
    obs.subscribe(
      data => {
        this.response = data;
      });
    return obs;
  };

  saveData(val) {
    this.data = val;
  };
  setdata(resp) {
    this.data1 = resp;
  }
  setpodata(resp){
    this.data = resp;
  }

  setgrndata(resp){
    this.data = resp;
  }

  getdata() {
    return this.data1;
  }
  getData() {
    return this.data;
  };

  saveCartcount(val) {
    this.data = val;
  }
  getCartCount() {
    return this.data;
  };
  saveLoginData(val) {
    this.loginData = val;
  };
  getLoginData() {
    return this.loginData;
  }
  getpodata(){
    return this.data;
  }

  getgrndata(){
    return this.data;
  }


}
