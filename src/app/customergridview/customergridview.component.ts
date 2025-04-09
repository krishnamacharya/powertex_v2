
import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../global-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customergridview',
  standalone: false,
  templateUrl: './customergridview.component.html',
  styleUrls: ['./customergridview.component.scss']
})
export class CustomergridviewComponent implements OnInit {
  resources2: any = [];
  loginUserData: any;
  dealerdetails: any = [];
  itemsPerPage: number = 10;
  page: number = 1;
  math = Math;
  dealerledger: any
  dealers: any;
  PUrl: string;
  buss_name: any;

  constructor(private DatePipe: DatePipe, private router: Router, private spinner: NgxSpinnerService, private service: GlobalServiceService) { }
  giver_company_name: any
  giver_company_namee: any
  ledger: any = {}
  ngOnInit() {
this.PUrl = window.location.href.substr(window.location.href.length - 5)
    if (localStorage.getItem('totalamounts')) {
      localStorage.removeItem("totalamounts")
    }
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    if(this.loginUserData.designation == 'Marketing Manager'){
      this.loginUserData.role = this.loginUserData.designation
    }
    if (localStorage.getItem('dealerledger')) {

      this.dealerledger = JSON.parse(localStorage.getItem('dealerledger'))
      this.ledger.giver_company_namee = this.dealerledger[0].companycode
      this.onChange(this.ledger.giver_company_namee)
      //  this.giver_company_namee=this.dealerledger[0].company_code
      this.fromdates = this.dealerledger[0].fromdate
      this.tilldates = this.dealerledger[0].todate
      this.getopeningbalancedetails()

    }

    this.getbothdates()
    if (this.loginUserData.role == 'Dealer' && this.loginUserData.role == 'Marketing Manager') {
      this.giver_company_code = this.loginUserData.user_id + '@' + this.loginUserData.company_code
      this.getdata1();
    }
    else {
      this.getcompanylist();

    }

  }
  obdetails: any = [{ Amount: 0 }]
  getopeningbalancedetails() {
    if (this.loginUserData.user_type == 'Dealer') {
      this.fromdates = this.DatePipe.transform(this.fromdates, "yyyy-MM-dd")
      if (this.giver_company_code) {
        this.stringsplit = this.ledger.giver_company_namee.split('-(')
        this.giver_company_code = this.stringsplit[1].split(')')[0];
      }

      return this.service.getDatawithMethodParams2("get_opening_balance/", this.loginUserData.user_id + '@' + this.loginUserData.company_code, this.fromdates).subscribe(data => {
        this.obdetails = data;
        this.getledger()
      })
    } else {
      this.fromdates = this.DatePipe.transform(this.fromdates, "yyyy-MM-dd")
      if (this.giver_company_code) {
        this.stringsplit = this.ledger.giver_company_namee.split('-(')
        this.giver_company_code = this.stringsplit[1].split(')')[0];
      }

      return this.service.getDatawithMethodParams2("get_opening_balance/", this.giver_company_code, this.fromdates).subscribe(data => {
        this.obdetails = data;
        this.getledger()
      })
    }


  }
  // ====================================================================
  getopeningbalancedetails1() {

    this.fromdates = this.DatePipe.transform(this.fromdates, "yyyy-MM-dd")
    if (!this.giver_company_code) {
      this.stringsplit = this.ledger.giver_company_namee.split('-(')
      this.giver_company_code = this.stringsplit[1].split(')')[0];
    }
    return this.service.getDatawithMethodParams2("get_opening_balance/", this.giver_company_code, this.fromdates).subscribe(data => {
      this.obdetails = data;
      this.getledger()
    })
  }

  // =======================getcompanylist=======================================
  companylist: any;
  getcompanylist() {


    // ==============================================
    if (this.loginUserData.designation == "Marketing Manager") {
      return this.service.getDatawithMethodParams1('market/drop', this.loginUserData.user_id).subscribe((resp) => {

        this.companylist = resp;
      })
    }


    else {

      this.service.getDatawithQueryParams1(1000.03, this.loginUserData.company_code).subscribe(
        data => {
          this.companylist = data;
          this.spinner.hide();
          console.log(this.companylist)
        })
    }
  }


  // =================================================



  // ==========================================================
  stringsplit: any
  giver_company_code: any;
  nodata: boolean = false;
  onChange(value: any) {

    this.buss_name = value.split('-(')[0];
    this.stringsplit = value.split('-(')
    this.giver_company_code = this.stringsplit[1].split(')')[0];
console.log(this.buss_name,'this.buss_name')
    this.getdata1();

  }
  getdata() {

    this.nodata = false;
    // this.spinner.show();
    return this.service.getDataOnlyWithMethod("grid").subscribe(data => {
      this.dealerdetails = data;
      this.spinner.hide();
      if (this.dealerdetails.length < 1) {
        this.nodata = true;
      }
      this.getTotalAmounts();
      console.log("dealerdetails", this.dealerdetails);


    })
  }
  // getdata1() {
  //   
  //   this.nodata = false;
  //   this.spinner.show();
  //   return this.service.getDatawithMethodParams1("grid/", this.giver_company_code).subscribe(data => {
  //     this.dealerdetails = data;
  //     this.spinner.hide();
  //     if (this.dealerdetails.length < 1) {
  //       this.nodata = true;
  //     }
  //     this.getTotalAmounts();      
  //     console.log("dealerdetails", this.dealerdetails);

  //   })
  // }
  // ==============================
  // =============dropdown==============================
  getdealerslist(userid) {

    return this.service.getDatawithMethodParams1('market/drop', userid).subscribe((resp) => {
      this.dealers = resp;
    })
  }

  // ================================================



  getdata1() {


    this.nodata = false;

    var today = new Date()
    var priorDate = new Date();
    if (!this.fromdates && !this.tilldates) {
      this.fromdates = this.DatePipe.transform(priorDate, "yyyy-MM-dd")
      this.tilldates = this.DatePipe.transform(today, "yyyy-MM-dd")
    }
    // return this.service.getDatawithMethodParams1("grid/", this.giver_company_code).subscribe(data => {
    this.service.getDatawithMethodParams2("get_opening_balance/", this.giver_company_code, this.fromdates).subscribe(data => {
      this.obdetails = data;
      return this.service.getDatawithMethodParams3("grid/", this.giver_company_code, this.fromdates, this.tilldates).subscribe(data => {
        this.dealerdetails = data;



        this.spinner.hide();
        if (this.dealerdetails.length < 1) {
          this.nodata = true;
        }
        else {
          for (var d = 0; d < this.dealerdetails.length; d++) {
            if (d == 0) {

              if (this.obdetails[d].Amount) {

                if (this.obdetails[d].Amount < 0) {
                  this.obdetails[d].credit = true
                  this.amount = JSON.stringify(this.obdetails[d].Amount)
                  this.splitbalance = this.amount.split('-')
                  this.obdetails[d].Amounts = JSON.parse(this.splitbalance[1])
                }
                else {
                  this.obdetails[d].credit = false
                }
                this.dealerdetails[d].balance = (this.obdetails[d].Amount + this.dealerdetails[d].DR) - this.dealerdetails[d].CR
              }
              else {
                this.dealerdetails[d].balance = this.dealerdetails[d].DR - this.dealerdetails[d].CR
              }
              if (this.dealerdetails[d].balance < 0) {
                this.dealerdetails[d].credit = true
                this.balanceamount = JSON.stringify(this.dealerdetails[d].balance)
                this.splitbalance = this.balanceamount.split('-')
                this.dealerdetails[d].balance = JSON.parse(this.splitbalance[1])
              }
              else {
                this.dealerdetails[d].credit = false

              }

            }
            else {
              if (this.dealerdetails[d - 1].credit == true) {
                this.dealerdetails[d].balance = (-this.dealerdetails[d - 1].balance + this.dealerdetails[d].DR) - this.dealerdetails[d].CR
              }
              else {
                this.dealerdetails[d].balance = (this.dealerdetails[d - 1].balance + this.dealerdetails[d].DR) - this.dealerdetails[d].CR
              }
              if (this.dealerdetails[d].balance < 0) {
                this.dealerdetails[d].credit = true
                this.balanceamount = JSON.stringify(this.dealerdetails[d].balance)
                this.splitbalance = this.balanceamount.split('-')
                this.dealerdetails[d].balance = JSON.parse(this.splitbalance[1])
              }
              else {
                this.dealerdetails[d].credit = false
              }
            }

          }
        }
        this.getTotalAmounts();
        console.log("dealerdetails", this.dealerdetails);
      })
    })
  }
  to_date(arg0: string, giver_company_code: any, from_date: (arg0: string, giver_company_code: any, from_date: any, to_date: any) => void, to_date: any) {

    throw new Error("Method not implemented.");
  }
  from_date(arg0: string, giver_company_code: any, from_date: any, to_date: any) {

    throw new Error("Method not implemented.");
  }
  // ==============================
  DrTotal: number = 0;
  CrTotal: number = 0;
  balanceTotal: number = 0;
  credit: boolean
  balance: any
  credit1: string;
  getTotalAmounts() {
    this.DrTotal = 0
    this.CrTotal = 0
    for (let i of this.dealerdetails) {
      if (i.DR != undefined && i.DR != null) {
        this.DrTotal = this.DrTotal + i.DR;
      }
      if (i.CR != undefined && i.CR != null) {
        this.CrTotal = this.CrTotal + i.CR;
      }

    }
    if (this.obdetails[0].Amount >= 0) {
      this.DrTotal = this.DrTotal + this.obdetails[0].Amount
      this.credit1 = "Dr"
    }
    else {
      this.CrTotal = this.CrTotal + Math.abs(this.obdetails[0].Amount)
      this.credit1 = "Cr"
    }
    this.DrTotal = Math.round(this.DrTotal);
    this.CrTotal = Math.round(this.CrTotal);
    // console.log(this.DrTotal, this.CrTotal)
    this.balanceTotal = (this.DrTotal - this.CrTotal)
    // console.log(this.balanceTotal)
    if (this.balanceTotal < 0) {

      this.credit = true
      // this.balance = JSON.stringify(this.balanceTotal).split('-')

      // this.splitbalance = this.amount.split('-')
      // this.balanceTotal = JSON.parse(this.splitbalance[1])
    }
    else {
      this.credit = false
    }
    this.balanceTotal = Math.round(this.balanceTotal);

  }


  getbothdates() {
    var today = new Date()
    var priorDate = new Date();
    priorDate.setDate(priorDate.getDate() - 0)
    this.fromdates = this.DatePipe.transform(priorDate, "yyyy-MM-dd")
    this.tilldates = this.DatePipe.transform(today, "yyyy-MM-dd")
    this.getopeningbalancedetails()
  }


  fromdates: any
  tilldates: any
  splitbalance: any = []
  balanceamount: any
  amount: any
  getledger() {
    this.nodata = false;

    this.fromdates = this.DatePipe.transform(this.fromdates, "yyyy-MM-dd")
    this.tilldates = this.DatePipe.transform(this.tilldates, "yyyy-MM-dd")
    return this.service.getDatawithMethodParams3("grid/", this.giver_company_code, this.fromdates, this.tilldates).subscribe(data => {
      this.dealerdetails = data;
      this.spinner.hide();
      if (this.dealerdetails.length < 1) {
        this.nodata = true;
      }
      else {
        for (var d = 0; d < this.dealerdetails.length; d++) {
          if (d == 0) {
            if (this.obdetails[d].Amount) {
              if (this.obdetails[d].Amount < 0) {
                this.obdetails[d].credit = true
                this.amount = JSON.stringify(this.obdetails[d].Amount)
                this.splitbalance = this.amount.split('-')
                this.obdetails[d].Amounts = JSON.parse(this.splitbalance[1])
              }
              else {
                this.obdetails[d].credit = false
              }
              this.dealerdetails[d].balance = (this.obdetails[d].Amount + this.dealerdetails[d].DR) - this.dealerdetails[d].CR
            }
            else {
              this.dealerdetails[d].balance = this.dealerdetails[d].DR - this.dealerdetails[d].CR
            }
            if (this.dealerdetails[d].balance < 0) {
              this.dealerdetails[d].credit = true
              this.balanceamount = JSON.stringify(this.dealerdetails[d].balance)
              this.splitbalance = this.balanceamount.split('-')
              this.dealerdetails[d].balance = JSON.parse(this.splitbalance[1])
            }
            else {
              this.dealerdetails[d].credit = false

            }

          }
          else {
            if (this.dealerdetails[d - 1].credit == true) {
              this.dealerdetails[d].balance = (-this.dealerdetails[d - 1].balance + this.dealerdetails[d].DR) - this.dealerdetails[d].CR
            }
            else {
              this.dealerdetails[d].balance = (this.dealerdetails[d - 1].balance + this.dealerdetails[d].DR) - this.dealerdetails[d].CR
            }
            if (this.dealerdetails[d].balance < 0) {
              this.dealerdetails[d].credit = true
              this.balanceamount = JSON.stringify(this.dealerdetails[d].balance)
              this.splitbalance = this.balanceamount.split('-')
              this.dealerdetails[d].balance = JSON.parse(this.splitbalance[1])
            }
            else {
              this.dealerdetails[d].credit = false
            }
          }

        }
      }
      this.getTotalAmounts();
      console.log("dealerdetails", this.dealerdetails);

    })

  }
  totalamounts: any = []
  printreport() {
    this.totalamounts.push({ DrTotal: this.DrTotal, CrTotal: this.CrTotal, balance: this.balanceTotal, openingbalance: this.obdetails[0].Amount })
    
    localStorage.setItem('Headerdetails', JSON.stringify({'bussiness_name': this.buss_name, 'fromdate': this.fromdates, 'tilldate': this.tilldates}));
    localStorage.setItem('dealerdetails', JSON.stringify(this.dealerdetails));
    localStorage.setItem('totalamounts', JSON.stringify(this.totalamounts));

    this.router.navigate(['/PRINT-LEDGER'])
  }
}




