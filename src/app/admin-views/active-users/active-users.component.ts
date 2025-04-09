import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServiceService } from '../../global-service.service';
import { DataServiceService } from "../../data-service.service";
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from '../../toastr-service.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
import { ViewMoreComponent } from '../view-more/view-more.component';

declare var $: any;

@Component({
  selector: 'app-active-users',
  standalone: false,
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.scss']
})
export class ActiveUsersComponent implements OnInit {
  regList: any = [];
  p: any = 1;
  page: any = 1
  pagee: any = 1;
  page1: any = 1
  rejData: any;
  rejectData: any = {};
  searchText: any;
  hid: boolean = true
  RejectQns: any;
  @Input() styleId: number;
  ngOnChanges() {
    if (this.styleId == 1) {
      this.hid = false
    }

  }
  alert: boolean;
  wish_alert: any;
  icon: boolean;
  loginUserData: any;
  profileData: any = {}
  POhidden: boolean = true;

  DOhidden: boolean = false;
  constructor(private DatePipe: DatePipe,private route: Router, private profileService: GlobalServiceService, private toasterService: ToasterService,
    private dataService: DataServiceService, private dialog: MatDialog, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    if(localStorage.getItem('totalamounts')){
      localStorage.removeItem("totalamounts")
    }
    localStorage.removeItem("fromactiveusers")
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    if (this.loginUserData === null) {
      this.route.navigateByUrl('home');
    }
    this.alert = false;
    this.getRegisterdUsers();
  }
  dealersdata: any = []
  explore(reg) {

    this.profileService.getDatawithMethodParams1("market/outstanding_list", reg.email).subscribe((data) => {
      // this.spinner.hide();
      this.dealersdata = data;
      $('#dealeroutstandingModal').modal('show');
    })
  }
  registerusers: any
  getRegisterdUsers() {
    this.spinner.show();
    this.profileService.getDatawithQueryParams1nd4new('A', this.loginUserData.company_code,this.POhidden?'Dealer':'Customer').subscribe((data) => {
      this.spinner.hide();
      console.log(data)
      this.registerusers = data
      if (this.registerusers.length > 0)
        this.regList = data;
    },
      error => {
        this.spinner.hide();
        console.log(error);
      });
  };

  editInfo(data) {
    this.dataService.saveData(data);
    localStorage.setItem('userProfile', JSON.stringify(data));
    this.route.navigateByUrl('/register-profile-info?A=EPr');
  };

  reject(data) {
    this.rejData = data;
    $('#confirmModal').modal('show');
  };
  viewInfo(data) {
    this.dialog.closeAll();
    this.dialog.open(ViewMoreComponent, data);
  };

  confirm() {

    this.spinner.show();
    $('#confirmModal').modal('hide');
    this.rejectData.status = 'I';
    this.rejectData.user_id = this.rejData.user_id;
    var methodName = 'update_dealer_status/';
    this.profileService.postData(this.rejectData, methodName).subscribe((data) => {
      this.spinner.hide();
      if (data['Status'] == 'Update sucessfully') {
        this.wish_alert = data['Status'];
        this.addwish();
        this.icon = true;
        this.getRegisterdUsers();
      } else {
        this.wish_alert = "Error"
        this.addwish();
        this.icon = true;
      }
    },
      error => {
        this.spinner.hide();
        // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal:true }
        });

      });
  }
  addwish() {
    this.alert = true;
    setInterval(() => {
      this.alert = false;
    }, 5000);
  }
  dealer_id: any
  // categoryList:any
  editInfo1(data) {
    this.dealer_id = data.user_id
    $('#editmodal').modal('show');
    // this.categoryList = this.dataService.getOnLoadServices(50);
  }
  submit() {
    if (this.profileData.powertex || this.profileData.sunflower || this.profileData.powertexgold) {

    }
  }
  categoryList: any =
    [
      { avg_val: 70.0, category: "A", max_val: 70.0, min_val: 70.0 },
      { avg_val: 69.0, category: "B", max_val: 69.0, min_val: 69.0 },
      { avg_val: 68.0, category: "C", max_val: 68.0, min_val: 68.0 },
      { avg_val: 67.0, category: "D", max_val: 67.0, min_val: 67.0 },
      { avg_val: 66.0, category: "E", max_val: 66.0, min_val: 66.0 },
      { avg_val: 65.0, category: "F", max_val: 65.0, min_val: 65.0 },
      { avg_val: 64.0, category: "G", max_val: 64.0, min_val: 64.0 },
      { avg_val: 63.0, category: "H", max_val: 63.0, min_val: 63.0 },
      { avg_val: 62.0, category: "I", max_val: 62.0, min_val: 62.0 },
      { avg_val: 61.0, category: "J", max_val: 61.0, min_val: 61.0 },
      { avg_val: 60.0, category: "K", max_val: 60.0, min_val: 60.0 },
      { avg_val: 59.0, category: "L", max_val: 59.0, min_val: 59.0 },
      { avg_val: 58.0, category: "M", max_val: 58.0, min_val: 58.0 },
      { avg_val: 57.0, category: "N", max_val: 57.0, min_val: 57.0 },
      { avg_val: 56.0, category: "O", max_val: 56.0, min_val: 56.0 },
      { avg_val: 55.0, category: "P", max_val: 55.0, min_val: 55.0 },

    ]
  po() {

    this.POhidden = true;
    this.DOhidden = false;
    this.getRegisterdUsers();
  }
  do() {

    this.POhidden = false;
    this.DOhidden = true;
    this.getdealersList()
  }
  dealersList: any
  getdealersList() {
    this.spinner.show();

    this.profileService.getDataOnlyWithMethod('alldealers').subscribe((data) => {

      this.dealersList = data;
      this.spinner.hide();

    },
      error => {
        this.spinner.hide();
        // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal:true }
        });
      });
  }
  nodata: boolean = false;
  customerLedger: any;

  sum(key) {
    return this.customerLedger.reduce((a, b) => a + (b[key] || 0), 0);
  }
  obdetails:any
  getopeningbalancedetails(reg){
    this.fromdates = this.DatePipe.transform( this.fromdates, "yyyy-MM-dd")
    let companycode = reg.user_id + '@' + reg.company_code;
    var priorDate = new Date('2020-04-01');
    this.fromdates = this.DatePipe.transform(priorDate, "yyyy-MM-dd")
    return this.profileService.getDatawithMethodParams2("get_opening_balance/", companycode,this.fromdates).subscribe(data => {
      this.obdetails = data;
      this.showLedger(reg)
    })
  }
  fromdates: any
  tilldates: any
  splitbalance:any=[]
  balanceamount:any
  amount:any
  showLedger(reg) {
    this.nodata = false;
    let companycode = reg.user_id + '@' + reg.company_code;
    var today = new Date()
    var priorDate = new Date('2020-04-01');
    this.fromdates = this.DatePipe.transform(priorDate, "yyyy-MM-dd")
    this.tilldates = this.DatePipe.transform(today, "yyyy-MM-dd")
    this.spinner.show();
    // getDatawithMethodParams1("grid/", companycode)
    
    return this.profileService.getDatawithMethodParams3("grid/", companycode,this.fromdates, this.tilldates).subscribe(data => {
      this.customerLedger = data;
      this.spinner.hide();
      if (this.customerLedger.length < 1) {
        this.nodata = true;
      }
      else{
        for(var d=0;d<this.customerLedger.length;d++){
          if(d==0){
            if(this.obdetails[d].Amount){
              if(this.obdetails[d].Amount<0){
                this.obdetails[d].credit=true
                this.amount=JSON.stringify(this.obdetails[d].Amount)
                this.splitbalance=this.amount.split('-')
                this.obdetails[d].Amounts=JSON.parse(this.splitbalance[1])
              }
              else{
                this.obdetails[d].credit=false
              }
              this.customerLedger[d].balance=(this.obdetails[d].Amount+this.customerLedger[d].DR)-this.customerLedger[d].CR
            }
            else{
          this.customerLedger[d].balance=this.customerLedger[d].DR-this.customerLedger[d].CR
            }
          if(this.customerLedger[d].balance<0){
            this.customerLedger[d].credit=true
              this.balanceamount=JSON.stringify(this.customerLedger[d].balance)
              this.splitbalance=this.balanceamount.split('-')
              this.customerLedger[d].balance=JSON.parse(this.splitbalance[1])
          }
          else{
            this.customerLedger[d].credit=false
          }
  
        }
        else{
          if(this.customerLedger[d-1].credit==true){
            this.customerLedger[d].balance=(-this.customerLedger[d-1].balance+this.customerLedger[d].DR)-this.customerLedger[d].CR
          }
          else{
          this.customerLedger[d].balance=(this.customerLedger[d-1].balance+this.customerLedger[d].DR)-this.customerLedger[d].CR
          }
          if(this.customerLedger[d].balance<0){
            this.customerLedger[d].credit=true
              this.balanceamount=JSON.stringify(this.customerLedger[d].balance)
              this.splitbalance=this.balanceamount.split('-')
              this.customerLedger[d].balance=JSON.parse(this.splitbalance[1])
          }
          else{
            this.customerLedger[d].credit=false
          }
        }
         
        }
      }
      this.getTotalAmounts()
      console.log("dealerdetails", this.customerLedger);
      $('#customerledger').modal('show');
    })
  }
  DrTotal: number = 0;
  CrTotal: number = 0;
  balanceTotal:number=0;
  credit:boolean
  balance:any
  getTotalAmounts() {
    this.DrTotal=0
    this.CrTotal=0
    for (let i of this.customerLedger) {
      if (i.DR != undefined && i.DR != null) {
        this.DrTotal = this.DrTotal + i.DR;
      }
      if (i.CR != undefined && i.CR != null) {
        this.CrTotal = this.CrTotal + i.CR;
      }
     
    }
    this.DrTotal = Math.round(this.DrTotal);
    this.CrTotal = Math.round(this.CrTotal);  
    this.balanceTotal=this.DrTotal-this.CrTotal
    if(this.balanceTotal<0){

      this.credit=true
      this.balance=JSON.stringify(this.balanceTotal).split('-')
     
      this.splitbalance=this.amount.split('-')
      this.balanceTotal=JSON.parse(this.splitbalance[1])
    }
    else{
      this.credit=false
    }
    this.balanceTotal= Math.round(this.balanceTotal);  

  }

  totalamounts:any=[]
  printreport() {
   
    $('#customerledger').modal('hide');
    localStorage.setItem('fromactiveusers', "true");
    if(this.obdetails[0].Amount!=null){
      
      this.totalamounts.push({DrTotal:this.DrTotal,CrTotal:this.CrTotal,balance:this.balanceTotal,openingbalance:this.obdetails[0].Amount})
      localStorage.setItem('totalamounts', JSON.stringify(this.totalamounts));
    }
    else{
      this.totalamounts.push({DrTotal:this.DrTotal,CrTotal:this.CrTotal,balance:this.balanceTotal})
      localStorage.setItem('totalamounts', JSON.stringify(this.totalamounts));
    }
   
   
    localStorage.setItem('dealerdetails', JSON.stringify(this.customerLedger));
   
    this.route.navigate(['/PRINT-LEDGER'])
  }

}
