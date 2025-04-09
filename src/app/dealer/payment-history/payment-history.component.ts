import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../../global-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from '../../toastr-service.service';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-payment-history',
  standalone: false,
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit {
  loginUserData:any
  grnGetData:any
  ven_POHidden: boolean = false;
  MOhidden:boolean;
  COhidden:boolean;
  DOhidden:boolean=false;
  chequedetail:any
  page:any=1
  PENhidden:boolean=true
  UnadjustedAmount:any
  sub: any;
  user: any;
  selectedObj:any
searchText: string;
panelOpenState: any;
  constructor(private service:GlobalServiceService,private spinner:NgxSpinnerService,private toaster:ToasterService,private router: Router, private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.grnGetData = JSON.parse(localStorage.getItem('grnData'));
   
    if(this.loginUserData.role != 'Marketing Manager') {
      this.ven_POHidden=true
      
      this.getpendinghistory();
      this.getNotificationCount()
     
      }
      if(this.loginUserData.role == 'Marketing Manager'){
        
        this.getdealerslist()
        this.sub = this.route.params.subscribe(params => {
          let d = params['id'];
          this.user = atob(d);
          this.dealeruserid = this.user
          this.getpaymenthistory()
        
         
        },
          error => {
            this.spinner.hide();
            this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
            // console.log(error);
          });
       
      }
  }

  getNotificationCount() {


    this.service.getDatawithQueryParams1nd4('4.21', this.loginUserData.user_id, this.loginUserData.company_code).subscribe((data) => {
  this.UnadjustedAmount= data['UnadjustedAmount'];
    })
  }
co(){
  this.DOhidden=false;
  this.COhidden=true;
  this.PENhidden=false
  this.getchequedetail()
}
getchequedetail(){
 
  this.spinner.show()
  this.service.getDataOnlyWithMethod("Cheque_list").subscribe((resp) => {
     
    this.chequedetail=resp;
    this.spinner.hide()
  })
}
po(){
  this.DOhidden=true;
  this.PENhidden=false
  this.COhidden=false;
  this.getpaymenthistory();
}
  mo(){
    this.PENhidden=false
    this.MOhidden=true;
  this.DOhidden=false;
  this.getpaymenthistory()
 
  }
  pen(){
    this.COhidden=false;
    this.MOhidden=false;
  this.DOhidden=false;
  this.PENhidden=true
  this.getpendinghistory()
 
  }
  pendinghistory:any=[]
  totalpending:any=[]
  getpendinghistory(){
    return this.service.getDataOnlyWithMethod('market/outstanding_list').subscribe((resp) => {
      this.pendinghistory = resp;
      this.totalpending = this.pendinghistory.filter((item) => item.due_amount)
      .map((item) => +item.due_amount)
      .reduce((sum, current) => sum + current);

    })
  }
  dealerpayment:any=[]
  dealerbalanceamount:any
  do(){
 
    this.MOhidden=false;
  this.DOhidden=true;
  this.param1= this.dealeruserid+'@'+this.loginUserData.company_code
  this.service.getDatawithQueryParams3(1000.05, this.param1,'',this.loginUserData.user_id).subscribe((resp) => {
     
    this.dealerpayment=resp;
  console.log(  this.dealerpayment,"  this.dealerpayment")
    this.totaloutstandingamount=this.dealerpayment.total_amount
    this.marketingoutstandingamount=this.dealerpayment.self_total
    this.dealeroutstandingamount=this.dealerpayment.d_total
    this.paymenthistory=this.dealerpayment.data
    this.ven_POHidden=true
   
    
  });
 
  }
 
  dealers: any
  userid: any
  getdealerslist() {
    this.userid = this.loginUserData.user_id
    return this.service.getDatawithMethodParams1('market/drop', this.userid).subscribe((resp) => {
      this.dealers = resp;
    })
  }
  dealeruserid:any
  dealer_chn(event) {
    
    this.dealeruserid = event.user
    this.getpaymenthistory()
  
  }
  paymenthistory:any=[];
  param1:any
  dealerpaymenthistory:any=[]
  marketingpayment:any=[]
  totaloutstandingamount:any
  marketingoutstandingamount:any
  dealeroutstandingamount:any
  invoice:boolean=false
  getpaymenthistory(){
  
  if(this.loginUserData.role == 'Marketing Manager'){
    this.spinner.show()
    this.param1= this.dealeruserid+'@'+this.loginUserData.company_code
  
    this.service.getDatawithQueryParams2(1000.05, this.param1,this.loginUserData.user_id).subscribe((resp) => {
    
      this.marketingpayment=resp;
      this.spinner.hide()
      this.invoice=false
   console.log( this.marketingpayment," this.marketingpayment")
      this.totaloutstandingamount=this.marketingpayment.total_amount
      this.marketingoutstandingamount=this.marketingpayment.self_total
      this.dealeroutstandingamount=this.marketingpayment.d_total
      this.paymenthistory=this.marketingpayment.data
      this.ven_POHidden=true
      this.MOhidden=true;
       this.PENhidden=false
      this.dealerpaymenthistory=[]
      this.dealerpayment=[]
      this.dealerbalanceamount=''
     
    });

  
  }
  else{

   if(this.loginUserData.role == 'Dealer'){
    this.param1=this.loginUserData.user_id+'@'+this.loginUserData.company_code;
   }
   else{
     this.param1=this.loginUserData.company_code
   }
   this.spinner.show()
    this.service.getDatawithQueryParams3(1000.05, this.param1,'',this.loginUserData.user_id).subscribe((resp) => {
     
      this.marketingpayment=resp;
      this.spinner.hide()
     this.invoice=true
      this.totaloutstandingamount=this.marketingpayment.total_amount
      this.marketingoutstandingamount=this.marketingpayment.d_total
      this.dealeroutstandingamount=this.marketingpayment.self_total
      this.paymenthistory=this.marketingpayment.data
      this.ven_POHidden=true
      this.MOhidden=false;
      // if(this.DOhidden==true){
      //   this.PENhidden=false
      // }
      // else{
      //  this.PENhidden=true
      // }
      
    });
  }
  }
  viewinvoice(pd){
    if(pd.inv_type!=='OB'){
    this.service.printReport('market/poprint/', 'Inv', pd.inv_seq_no).subscribe((resp) => {
      console.log(resp);
     
      resp['frompendingamountpage'] = true;
        localStorage.setItem('InvoiceData', JSON.stringify(resp))
        this.router.navigateByUrl('/invoice-Print')
      
    })
  }
  else{
     this.toaster.warning("This is Opening Invoice")
  }
  }
}
