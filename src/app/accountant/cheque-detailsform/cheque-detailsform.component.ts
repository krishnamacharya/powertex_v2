import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../../global-service.service';
import { DataServiceService } from '../../data-service.service';
import { ToasterService } from '../../toastr-service.service';
import { NgForm } from "@angular/forms";
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';

// import { FORMERR } from 'dns';
declare var $: any;
@Component({
  selector: 'app-cheque-detailsform',
  standalone: false,
  templateUrl: './cheque-detailsform.component.html',
  styleUrls: ['./cheque-detailsform.component.scss']
})
export class ChequeDetailsformComponent implements OnInit {
  maxDate = new Date();
  formdata: any;
  obj: any = {};
  masterData: any = {};
  currencycodes: any
  paymentagainst: any
  paymentmodes: any = []
  paymentstatus: any = [];
  givercompanynames: any
  customSelected: string;
  loginUserData: any
  paymentstatus1: any = [];
  invdetail: any = [];
  showBankdetail: boolean = false;
  constructor(private DatePipe: DatePipe,public dialog: MatDialog,private router:Router,private toasterService: ToasterService, public globalService: GlobalServiceService, public dataService: DataServiceService, private spinner: NgxSpinnerService) {
  }
  ngOnInit() {
    this.loadcurrencycodes()
    this.loadpaymentagainst()
    this.paymentmodes = this.dataService.getOnLoadServices('62.1');
    this.loadpaymentstatus()
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.masterData.receiver_company_code = this.loginUserData.company_code
    this.masterData.receiver_company_name = this.loginUserData.company_address.companyname
    this.getreceiverbankdetails(this.loginUserData.company_code, 1)
    this.globalService.getDatawithQueryParams1(1000.03, this.masterData.receiver_company_code).subscribe(
      data => {
        this.spinner.hide();
        this.givercompanynames = data;
        console.log(this.givercompanynames)
      })
    if (this.loginUserData.role == 'Marketing Manager') {
      this.getdealerslist(this.loginUserData.user_id);
    }

  }
  dealerslist: any;
  getdealerslist(userid) {
    return this.globalService.getDatawithMethodParams1('market/drop', userid).subscribe((resp) => {
      this.dealerslist = resp;
    })
  }
  loadpaymentstatus() {
    this.dataService.getOnLoadServices('62.3').subscribe(
      data => {
        this.paymentstatus = data;
        for (let i = 0; i < this.paymentstatus.length; i++) {
          if (this.paymentstatus[i].value != 0) {
            this.paymentstatus1.push(this.paymentstatus[i])
            console.log(this.paymentstatus1, "this.paymentstatus1")
          }
        }
      })
  }
  loadcurrencycodes() {
    this.dataService.getOnLoadServices('1.07').subscribe(
      data => {

        this.currencycodes = data;
        console.log(this.currencycodes, " this.currencycodes")
        this.masterData.currency_code = this.currencycodes[2].sign
      })
  }
  loadpaymentagainst() {
    this.dataService.getOnLoadServices('62.2').subscribe(data => {
      this.paymentagainst = data
      this.masterData.payment_against = this.paymentagainst[1].process
    });
  }
  userid:any
  split:any
  usercompanycode:any
  stringsplit: any
  creditamount:any
  onChange(value: any) {
    console.log(value,"value")
    this.page=1
    this.invdetail = [];
    this.stringsplit = value.split('-(')
    // this.masterData.giver_company_code = this.stringsplit[1];
    this.masterData.giver_company_code = this.stringsplit[1].split(')')[0];
    this.masterData.giver_name = this.stringsplit[0];
    this.defaultstatus = 1;
    this.split=this.masterData.giver_company_code.split('@')
    this.userid=this.split[0]
    this.usercompanycode=this.split[1]
    this.globalService.getDatawithQueryParams1nd4('4.21', this.userid, this.usercompanycode).subscribe((data) => {
      this.creditamount=data
      this.spinner.hide();
    },
          error => {
            // this.ngxSmartService.getModal('servererror').open();
            this.dialog.open(ErrorModalComponent, {
              data: { servererror:true }
            });
            
         
          }
          );
    this.getbankdetails(this.masterData.giver_company_code, this.defaultstatus)
    this.managebank = true;
    this.showbank = false;
    this.param2 = this.masterData.giver_company_code;
    this.masterData.amount = '';
    if (this.loginUserData.role != 'Marketing Manager') {
      this.invoice();
    }
  };

  onSelect(value: any) {
    if (this.loginUserData.role == 'Marketing Manager') {
      this.paymentstatus1 = []
      this.paymentstatus1.push(this.paymentstatus[1])
    }
    else {
      if (value == "CHEQUE/DD") {
        this.paymentstatus1 = []
        this.loadpaymentstatus()
        this.invdetail = [];
        this.loadcurrencycodes()
        this.loadpaymentagainst()
        this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
        this.masterData.receiver_company_code = this.loginUserData.company_code
        this.masterData.receiver_company_name = this.loginUserData.company_address.companyname
        console.log(this.masterData.receiver_company_code, "receivercompanycode")
        this.getreceiverbankdetails(this.loginUserData.company_code, 1)
        this.masterData.giver_company_code = "";
      }
      else {
        this.paymentstatus1 = []
        this.paymentstatus1.push(this.paymentstatus[0])
        this.invdetail = [];
        this.loadcurrencycodes()
        this.loadpaymentagainst()
        this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
        this.masterData.receiver_company_code = this.loginUserData.company_code
        this.masterData.receiver_company_name = this.loginUserData.company_address.companyname
        console.log(this.masterData.receiver_company_code, "receivercompanycode")
        this.getreceiverbankdetails(this.loginUserData.company_code, 1)
        this.masterData.giver_company_code = "";
      }
    }
  }
  formdataa: any;
  onSubmit(form: NgForm) {
    // if(this.amountafteradjusted>0 ){
    //   this.toasterService.warning("Given Amount Not Adjusted Completely. Remaining "+Math.round(this.amounttt)+ ' is there')
    // }
    // else{
      this.spinner.show();      
    if (this.masterData.amount > 0) {
      this.formdataa = form;
      $("#confirmation").modal('show');
    }
    else {
     this.toasterService.warning("Enter Valid Amount")

    }
    this.spinner.hide();    
    // this.atributesData(form);
    // }
  }
  methodname: any;
  company_name: any
  chequedata: any
  masterbankdata: any
  atributesData(form) {
    this.spinner.show();  
    if (this.masterData.giver_advice_name == '' || this.masterData.giver_advice_name == null) {
      this.masterData.giver_advice_name = this.masterData.giver_name;

    }
    if (this.masterData.giver_company_name) {
      for (var i = 0; i < this.givercompanynames.length; i++) {
        if (this.masterData.giver_company_name == this.givercompanynames[i].company_code) {
          this.company_name = this.givercompanynames[i].name
          break;
        }
      }
    }
    this.masterData.currency_code = this.currencycodes[2].currency_code
    if (this.masterData.mode_of_payment == "CASH") {
      this.masterData.giver_advice_name = null
      this.masterData.receiver_advice_name = null
      this.masterData.receiver_bank = null
      this.masterData.receiver_branch = null
      this.masterData.receiver_ifsc = null
      this.masterData.receiver_accno = null
    }
    // if(this.masterData.mode_of_payment=="CHEQUE/DD" && this.masterData.status=="p"){
    //   this.masterData.msg="Cheque Deposited"
    // }
  
    this.masterData.check_date = this.DatePipe.transform(this.masterData.check_date, "yyyy-MM-dd");
    this.masterData.transid = 1;
    this.methodname = "api/ChequeTransactionViewset/"
    this.globalService.postData(this.masterData, this.methodname).subscribe((data) => {
      this.spinner.hide();
      this.chequedata = data;
      if (this.masterData.status != 'p' && this.invdetail.length > 0) {
        this.postdropdata();
      }
      else {
        this.invdetail = [];
      }
      console.log(data);
      if (!this.masterData.default_1) {
        this.masterData.default_1 = 1
      }
      if (this.chequedata != "") {
        $("#successModal").modal('show');
        form.reset();
        this.loadcurrencycodes()
        this.loadpaymentagainst()
        this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
        this.masterData.receiver_company_code = this.loginUserData.company_code
        this.masterData.receiver_company_name = this.loginUserData.company_address.companyname
        this.getreceiverbankdetails(this.loginUserData.company_code, 1)
      }
    },
      error => {
        // this.spinner.hide();
        // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal:true }
        });
      }
    );
  }

  clear() {
    this.invdetail = [];
    this.loadcurrencycodes()
    this.loadpaymentagainst()
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.masterData.receiver_company_code = this.loginUserData.company_code
    this.masterData.receiver_company_name = this.loginUserData.company_address.companyname
    console.log(this.masterData.receiver_company_code, "receivercompanycode")
    this.getreceiverbankdetails(this.loginUserData.company_code, 1)
    this.masterData.giver_company_code = "";
  }
  dealerdata:any=[]
  fromdates:any
  todates:any
  gotoledger(){
    var toDate=new Date()
    var priorDate = new Date('2020-04-01');
    this.fromdates = this.DatePipe.transform(priorDate, "yyyy-MM-dd")
    this.todates = this.DatePipe.transform(toDate, "yyyy-MM-dd")
    this.dealerdata.push({'companycode':this.masterData.giver_name+'-('+this.masterData.giver_company_code+')','fromdate':this.fromdates,'todate':this.todates})
    localStorage.setItem('dealerledger',JSON.stringify(this.dealerdata))
    this.router.navigate(['customerledger'])
  }
  showbank: boolean
  showbank1: boolean
  newbank: boolean
  receivernewbank: boolean;
  displaygiverbanks(giver_company_code) {
    this.getbankdetails(giver_company_code, this.defaultstatus)
    this.showbank = true
    this.companycode = giver_company_code;
    $("#showbankdetails").modal('show');
  }
  companycode: any;
  displayreceiverbanks(receiver_company_code) {
    this.getreceiverbankdetails(receiver_company_code, this.defaultstatus)
    this.showbank = true
    this.companycode = receiver_company_code;
    $("#showbankdetails").modal('show');
  }
  bankId: any
  addnewbank(bankdetails, companycode) {
    if (this.loginUserData.company_code != companycode) {
      this.masterData1 = {};
      this.masterData1.giver_company_code = this.masterData.giver_company_code
      if (this.masterData1.default_1 != true) {
        this.masterData1.default_1 = 0
      }
      this.newbank = true;
      $("#showbankdetails").modal('hide');
      $("#newbankdetails").modal('show');
    }
    else {
      this.masterData1 = {};
      this.masterData1.receiver_company_code = this.masterData.receiver_company_code
      if (this.masterData1.default_1 != true) {
        this.masterData1.default_1 = 0
      }
      this.receivernewbank = true;
      $("#showbankdetails").modal('hide');
      $("#receivernewbankdetails").modal('show');
    }
  };

  cancelbankdetails() {
    this.newbank = false
    this.showbank = true
    $("#newbankdetails").modal('hide');
  }

  cancelreceiverbankdetails() {
    this.receivernewbank = false
    this.showbank = true
    $("#receivernewbankdetails").modal('hide');
  }
  setasDefault(cd) {
    if (this.loginUserData.company_code != cd.company_code) {
      this.masterData.seq_no = cd.seq_no
      this.masterData.giver_advice_name = cd.acc_holder
      this.masterData.giver_company_code = cd.company_code
      this.masterData.giver_bank = cd.bank_name
      this.masterData.giver_branch = cd.branch
      this.masterData.giver_ifsc = cd.ifsc
      this.masterData.giver_accno = cd.acc_no
      this.masterData.default_1 = 1
      this.savegiverbankdetails();
    }
    else {
      this.masterData.seq_no = cd.seq_no
      this.masterData.receiver_advice_name = cd.acc_holder
      this.masterData.receiver_company_code = cd.company_code
      this.masterData.receiver_bank = cd.bank_name
      this.masterData.receiver_branch = cd.branch
      this.masterData.receiver_ifsc = cd.ifsc
      this.masterData.receiver_accno = cd.acc_no
      this.masterData.default_1 = 1
      this.savereceiverbankdetails();
    }
  }
  bankdata: any
  bank: any
  bankmethodname: any
  masterData1: any
  savegiverbankdetails() {
    if (this.masterData.default_1 == true) {
      this.masterData.default_1 = 1
    }
    if (this.masterData1 && !this.masterData.seq_no) {
      this.bank = { "acc_holder": this.masterData1.giver_advice_name, "acc_no": this.masterData1.giver_accno, "bank_name": this.masterData1.giver_bank, "branch": this.masterData1.giver_branch, "ifsc": this.masterData1.giver_ifsc, "company_code": this.masterData1.giver_company_code, "default_1": this.masterData1.default_1 }
    }
    else {
      this.bank = { "seq_no": this.masterData.seq_no, "acc_holder": this.masterData.giver_advice_name, "acc_no": this.masterData.giver_accno, "bank_name": this.masterData.giver_bank, "branch": this.masterData.giver_branch, "ifsc": this.masterData.giver_ifsc, "company_code": this.masterData.giver_company_code, "default_1": this.masterData.default_1 }
    }
    this.bankmethodname = "BankDtl_post/"
    if (this.masterData.seq_no) {
      this.globalService.updateData(this.bank, this.bankmethodname).subscribe((data) => {
        this.spinner.hide();
        this.bankdata = data;
        this.masterData.seq_no = ""
        for (var i = 0; i < this.givercompanynames.length; i++) {
          if (this.bankdata.company_code == this.givercompanynames[i].company_code) {
            this.masterData.giver_company_name = this.givercompanynames[i].company_code
            break;
          }
        }
        if (this.bankdata != "") {
          this.toasterService.success("Default Bank Updated Successfully")
          this.getbankdetails(this.bankdata.company_code, this.defaultstatus)
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
        }
      )
    }
    else {
      this.globalService.postData(this.bank, this.bankmethodname).subscribe((data) => {
        this.spinner.hide();
        this.bankdata = data;
        if (this.bankdata != "" && this.masterData1) {
          $("#addbanksuccessModal").modal('show');
          $("#newbankdetails").modal('hide');
          this.newbank = false
          this.getbankdetails(this.bankdata.company_code, this.defaultstatus)
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
        }
      )
    }
  }


  savereceiverbankdetails() {
    if (this.masterData.default_1 == true) {
      this.masterData.default_1 = 1
    }
    if (this.masterData1) {
      this.bank = { "acc_holder": this.masterData1.receiver_advice_name, "acc_no": this.masterData1.receiver_accno, "bank_name": this.masterData1.receiver_bank, "branch": this.masterData1.receiver_branch, "ifsc": this.masterData1.receiver_ifsc, "company_code": this.masterData1.receiver_company_code, "default_1": this.masterData1.default_1 }
    }
    else {
      this.bank = { "seq_no": this.masterData.seq_no, "acc_holder": this.masterData.receiver_advice_name, "acc_no": this.masterData.receiver_accno, "bank_name": this.masterData.receiver_bank, "branch": this.masterData.receiver_branch, "ifsc": this.masterData.receiver_ifsc, "company_code": this.masterData.receiver_company_code, "default_1": this.masterData.default_1 }
    }
    this.bankmethodname = "BankDtl_post/"
    if (this.masterData.seq_no) {
      this.globalService.updateData(this.bank, this.bankmethodname).subscribe((data) => {
        this.spinner.hide();
        this.bankdata = data;

        if (this.bankdata != "") {
          this.toasterService.success("Default Bank Updated Successfully")
          this.getreceiverbankdetails(this.bankdata.company_code, this.defaultstatus)
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

        }

      )
    }
    else {
      this.globalService.postData(this.bank, this.bankmethodname).subscribe((data) => {
        this.spinner.hide();
        this.bankdata = data;
        if (this.bankdata != "" && this.masterData1) {
          $("#addbanksuccessModal").modal('show');
          $("#receivernewbankdetails").modal('hide');
          this.receivernewbank = false
          this.getreceiverbankdetails(this.bankdata.company_code, this.defaultstatus)
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
        }
      )
    }
  }
  insertbanksuccess() {
    $("#showbankdetails").modal('show');
  }
  keypress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  bankdetails: any
  giver_company_code: any
  managebank: boolean = false
  status: any
  defaultstatus: any
  getbankdetails(giver_company_code, defaultstatus) {

    //  this.showbank=true
    this.status = defaultstatus
    this.globalService.getDatawithQueryParams2(3.61, giver_company_code, this.status).subscribe((data) => {
      this.spinner.hide();
      this.bankdetails = data;
      this.defaultstatus = ""
      console.log(this.bankdetails, " this.bankdetails")
      if (this.bankdetails == '') {
        this.masterData.giver_bank = ''
        this.masterData.giver_branch = ''
        this.masterData.giver_ifsc = ''
        this.masterData.giver_accno = ''
        this.masterData.giver_advice_name = ''
      }
      if (this.masterData.mode_of_payment != 'CASH') {

        for (var i = 0; i < this.bankdetails.length; i++) {
          if (this.bankdetails.length > 0 && this.bankdetails[i].default_1 == 1) {
            this.masterData.giver_advice_name = this.bankdetails[i].acc_holder
            this.masterData.giver_bank = this.bankdetails[i].bank_name
            this.masterData.giver_branch = this.bankdetails[i].branch
            this.masterData.giver_ifsc = this.bankdetails[i].ifsc
            this.masterData.giver_accno = this.bankdetails[i].acc_no
          }
        }
      }
    })
  }

  getreceiverbankdetails(receiver_company_code, defaultstatus) {
    this.status = defaultstatus
    this.globalService.getDatawithQueryParams2(3.61, receiver_company_code, this.status).subscribe((data) => {
      this.bankdetails = data;
      this.defaultstatus = ""
      console.log(this.bankdetails, " this.bankdetails")
      if (this.masterData.mode_of_payment != 'CASH') {
        for (var i = 0; i < this.bankdetails.length; i++) {
          if (this.bankdetails.length > 0 && this.bankdetails[i].default_1 == 1) {
            this.showbank = true;
            this.masterData.receiver_advice_name = this.bankdetails[i].acc_holder
            this.masterData.receiver_bank = this.bankdetails[i].bank_name
            this.masterData.receiver_branch = this.bankdetails[i].branch
            this.masterData.receiver_ifsc = this.bankdetails[i].ifsc
            this.masterData.receiver_accno = this.bankdetails[i].acc_no
          }
        }
      }
    })
  }


  getinvdata: any = [];
  count: any
  detail: any
  count2: any
  param2: any
  outstandingdetails: any = [];
  invoicedetail: any = [];
  totaldueamount:any
  invoice() {
    this.totaldueamount=""
    let param1 = this.loginUserData.company_code;
    this.spinner.show();
    this.globalService.getDatawithQueryParams2(1000.01, param1,this.param2).subscribe((resp) => {
      this.outstandingdetails = resp;
        this.spinner.hide();
        this.getinvdata = this.outstandingdetails.outstanding_detail
        // for(var i=0;i<this.getinvdata.length;i++){
          
        //   if(this.getinvdata[i].company_code==this.param2){
        //     this.invdetail = this.getinvdata[i].detail;
            
        //   }
        // }
        this.invdetail = this.getinvdata[0].detail;
        for(var j=0;j<this.invdetail.length;j++){
          if(this.totaldueamount){
          this.totaldueamount=this.totaldueamount+this.invdetail[j].due_amount
          }
          else{
            this.totaldueamount=this.invdetail[j].due_amount
          }
        }
       
       });
    // this.spinner.show();
    // this.dataService.getOnLoadServicesparam1(1000.01, param1).subscribe((resp) => {
    //   this.outstandingdetails = resp;
      this.spinner.hide();
    //   this.getinvdata = this.outstandingdetails.outstanding_detail
    //   if (this.getinvdata) {
    //     for (var i = 0; i < this.getinvdata.length; i++) {
    //       if (this.param2 == this.getinvdata[i].company_code) {
    //         if (this.getinvdata[i].detail) {
    //           this.invdetail = this.getinvdata[i].detail;
    //         }
    //         else {
    //           this.invdetail = "";
    //         }
    //         break;
    //       }
    //       else {
    //         this.invdetail = "";
    //       }
    //     }
    //   }
    //   else {
    //     this.getinvdata = ''
    //   }
    //   if (this.invdetail.length <= 0) {
    //     // this.toasterService.info("you have no Invoices")
    //   }
    // });
  }
  page: any = 1;
  Adjusttype: any = "Auto";
  adjusttype(val) {
    this.Adjusttype = val;
    this.adjustedarray = [];
    this.amountafteradjusted = this.amounnttt;

    if (val == 'Manual') {
      for (var i = 0; i < this.invdetail.length; i++) {
        this.invdetail[i].balanceamount = null;
        this.invdetail[i].adjustedAmount = null;
      }
    }
    else {
      this.adustinvAmount(this.amounnttt)
    }

  }
  amountt: number;
  amounttt: number;
  adjustedarray: any = [];
  amounnttt: any;
  amountafteradjusted: any;
  adustinvAmount(amount) {
    amount = parseInt(amount);
    this.amountt = amount;
    this.amounttt = amount;
    this.amountafteradjusted = amount;
    this.amounnttt = amount;
    this.adjustedarray = [];
    this.Adjusttype = 'Auto';
    if (this.Adjusttype != 'Manual') {
      for (var i = 0; i < this.invdetail.length; i++) {
        this.invdetail[i].balanceamount = null;
        this.invdetail[i].adjustedAmount = null;
      }
      if (this.amountt && this.invdetail.length > 0) {
        for (var i = 0; i < this.invdetail.length; i++) {
          if (this.amountt > 0 && this.amountt >= this.invdetail[i].due_amount) {
            this.invdetail[i].adjustedAmount = this.invdetail[i].due_amount;
            this.invdetail[i].balanceamount = this.invdetail[i].due_amount - this.invdetail[i].adjustedAmount;
            this.amountt = this.amountt - this.invdetail[i].due_amount;

            this.adjustedarray.push(this.invdetail[i])
            console.log("erfrerrere", this.adjustedarray)

          }
          else if (this.amountt > 0 && this.amountt < this.invdetail[i].due_amount) {
            this.invdetail[i].adjustedAmount = this.amountt;
            this.invdetail[i].balanceamount = this.invdetail[i].due_amount - this.amountt;
            this.amountt = this.amountt - this.invdetail[i].due_amount;

            this.adjustedarray.push(this.invdetail[i])

          }
        }
      }
      // if(amount<=0){
      //       this.toasterService.info("given Amount is completed ")
      // }
      this.amountafteradjusted = this.amountt;
      console.log('this.adjustedarray', this.adjustedarray)

    }
  }

  checkValue(i, ev) {

    if (ev.target.checked == true) {
      if (this.amounttt > 0 && this.amounttt >= this.invdetail[i].due_amount) {
        this.invdetail[i].adjustedAmount = this.invdetail[i].due_amount;
        this.invdetail[i].balanceamount = this.invdetail[i].due_amount - this.invdetail[i].adjustedAmount;
        this.amounttt = this.amounttt - this.invdetail[i].adjustedAmount;
        this.amountafteradjusted = this.amounttt;

        this.adjustedarray.push(this.invdetail[i])

      }
      else if (this.amounttt > 0 && this.amounttt < this.invdetail[i].due_amount) {
        this.invdetail[i].adjustedAmount = this.amounttt;
        this.invdetail[i].balanceamount = this.invdetail[i].due_amount - this.amounttt;
        this.amounttt = this.amounttt - this.invdetail[i].adjustedAmount;
        this.amountafteradjusted = this.amounttt;

        this.adjustedarray.push(this.invdetail[i])

      }
    }
    else {
      this.amounttt = this.amounttt + this.invdetail[i].adjustedAmount;
      this.invdetail[i].adjustedAmount = null;
      this.invdetail[i].balanceamount = null;
      for(let j in this.adjustedarray){ 
        if(this.invdetail[i].sinv_no==this.adjustedarray[j].sinv_no){
          this.adjustedarray.splice(j,1);
        }
      }
      this.amountafteradjusted = this.amounttt;

    }
    if (this.amounttt <= 0) {
      this.toasterService.info("Given amount is adjustd completly ")
    }
    this.amountafteradjusted = this.amounttt;
    console.log('this.adjustedarray', this.adjustedarray)
  }

  updatedata: any = [];
  array: any = [];
  body: any = {};
  createddate: any;
  postdropdata() {
    this.array = [];
    this.createddate = new Date()
    for (var j = 0; j < this.adjustedarray.length; j++) {
      this.body = {
        "inv_seq_no": this.adjustedarray[j].inv_seq_no,
        "total_amount": this.adjustedarray[j].final_amount,
        "adj_amount": Math.round((this.adjustedarray[j].adjustedAmount + Number.EPSILON) * 100) / 100,
        "balance_amount": Math.round((this.adjustedarray[j].balanceamount + Number.EPSILON) * 100) / 100,
        "remaining_amount": Math.round((this.adjustedarray[j].due_amount + Number.EPSILON) * 100) / 100,
        "adv_no": this.chequedata.transid,
        "created_date": this.createddate
      }
      this.array.push(this.body);
    }
    console.log('array', this.array)
    // console.log('updatedata', this.updatedata)
    this.spinner.show();
    this.globalService.postData(this.array, 'InvCheqDtl/').subscribe((resp) => {
      this.toasterService.success("Amount Adjusted Successfully")
      this.updatedata = resp;
      this.invdetail = [];
      this.amountt = null;
      this.amounttt = null;
      this.array = [];
      this.managebank = false;
      this.spinner.hide();

    },
      error => {
        this.spinner.hide();
        this.array = [];
        // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal:true }
        });

      }
    )
  }
  showbankdetailss() {
    if (this.showBankdetail == false) {
      this.showBankdetail = true;
    }
    else {
      this.showBankdetail = false;

    }
  }


}