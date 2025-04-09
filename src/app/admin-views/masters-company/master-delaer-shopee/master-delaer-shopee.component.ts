import { Component, OnInit } from '@angular/core';
declare var $: any;
import { DataServiceService } from "../../../data-service.service";
import { GlobalServiceService } from '../../../global-service.service';
@Component({
  selector: 'app-master-delaer-shopee',
  standalone: false,
  templateUrl: './master-delaer-shopee.component.html',
  styleUrls: ['./master-delaer-shopee.component.scss']
})
export class MasterDelaerShopeeComponent implements OnInit {
  dealers: any;
  loginUserData: any;
  Delhidden: boolean = true;
  Shophidden: boolean = false;
  shopees: any;
  profileData: any = {}
  page:any=1
  constructor(private service: GlobalServiceService, private dataService: DataServiceService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.dealers = JSON.parse(localStorage.getItem('dealers'));
    this.shopees = JSON.parse(localStorage.getItem('shopees'));
    console.log("del", this.dealers);

  }
  dealersdata:any=[]
  explore(data){
  
    this.service.getDatawithMethodParams1("market/outstanding_list",data.email).subscribe((data) => {
      // this.spinner.hide();
      this.dealersdata = data;
      $('#dealeroutstandingModal').modal('show');
    })
  }
  A_dealers() {
    this.Delhidden = true;
    this.Shophidden = false;
  };
  A_shopees() {
    this.Delhidden = false;
    this.Shophidden = true;
  }
  dealer_id: any
  // categoryList:any
  editInfo(data) {
    // this.dealer_id=data.user_id
    $('#editmodal').modal('show');
    // this.categoryList = this.dataService.getOnLoadServices(50);


  }
  submit() {
    if (this.profileData.powertex || this.profileData.sunflower || this.profileData.powertexgold) {

    }
  }
  categoryList:any =
    [
      { avg_val: 70.0,category: "A",max_val: 70.0,min_val: 70.0 },
      { avg_val: 69.0,category: "B",max_val: 69.0,min_val: 69.0 },
      { avg_val: 68.0,category: "C",max_val: 68.0,min_val: 68.0 },
      { avg_val: 67.0,category: "D",max_val: 67.0,min_val: 67.0 },
      { avg_val: 66.0,category: "E",max_val: 66.0,min_val: 66.0 },
      { avg_val: 65.0,category: "F",max_val: 65.0,min_val: 65.0 },
      { avg_val: 64.0,category: "G",max_val: 64.0,min_val: 64.0 },
      { avg_val: 63.0,category: "H",max_val: 63.0,min_val: 63.0 },
      { avg_val: 62.0,category: "I",max_val: 62.0,min_val: 62.0 },
      { avg_val: 61.0,category: "J",max_val: 61.0,min_val: 61.0 },
      { avg_val: 60.0,category: "K",max_val: 60.0,min_val: 60.0 },
      { avg_val: 59.0,category: "L",max_val: 59.0,min_val: 59.0 },
      { avg_val: 58.0,category: "M",max_val: 58.0,min_val: 58.0 },
      { avg_val: 57.0,category: "N",max_val: 57.0,min_val: 57.0 },
      { avg_val: 56.0,category: "O",max_val: 56.0,min_val: 56.0 },
      { avg_val: 55.0,category: "P",max_val: 55.0,min_val: 55.0 },
      
    ]
}
