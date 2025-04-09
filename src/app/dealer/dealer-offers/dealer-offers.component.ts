import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../../global-service.service';
@Component({
  selector: 'app-dealer-offers',
  standalone: false,
  templateUrl: './dealer-offers.component.html',
  styleUrls: ['./dealer-offers.component.scss']
})
export class DealerOffersComponent implements OnInit {
  page: any = 1
  offersdata: any = []
  loginUserData: any
  p: any = 1
  ven_POHidden: boolean = false;
  offertypes: any = []
  POhidden: boolean = false;
  DOhidden: boolean = false
selectedObj: any;
panelOpenState: any;
searchText: string;
  constructor(private service: GlobalServiceService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.userid = this.loginUserData.user_id

    this.getdealerslist()
    // if (this.loginUserData.role != 'Marketing Manager') {
    this.ven_POHidden = true
    this.getoffertypes()

    // }
  }
  dealeroffersdata: any
  do() {

    this.DOhidden = true;
    this.POhidden = false;
    return this.service.getData1(this.userid, 'offer/display/').subscribe((resp) => {
      this.dealeroffersdata = resp
    })
  }
  dealers: any
  userid: any
  getdealerslist() {

    return this.service.getDatawithMethodParams1('market/drop', this.userid).subscribe((resp) => {
      this.dealers = resp;
    })
  }
  dealeruserid: any
  dealer_chn(event) {

    this.userid = event.user
    this.getoffertypes()

  }

  type: any
  getoffers(offertype) {

    this.DOhidden = false
    this.POhidden = true;
    this.type = offertype
    // if (this.loginUserData.role == 'Marketing Manager') {
    //   return this.service.getData2(this.dealeruserid, 'offer/display/', offertype).subscribe((resp) => {
    //     this.offersdata = resp
    //     this.ven_POHidden = true
    //     // this.productdetail=this.offersdata.
    //     console.log(this.offersdata, "this.offersdata")
    //   })
    // }
    // else {
    return this.service.getData2(this.userid, 'offer/display/', offertype).subscribe((resp) => {
      this.offersdata = resp
      // this.productdetail=this.offersdata.
      console.log(this.offersdata, "this.offersdata")
    })
    // }
  }
  getoffertypes() {
    return this.service.getDataOnlyWithMethod('offer_type').subscribe((resp) => {
      this.offertypes = resp
      this.getoffers(this.offertypes[0].offer_type)
    })
  }
}
