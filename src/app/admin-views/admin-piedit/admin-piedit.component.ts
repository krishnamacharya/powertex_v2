import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { ToasterService } from '../../toastr-service.service';
import { GlobalServiceService } from '../../global-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-admin-piedit',
  standalone: false,
  templateUrl: './admin-piedit.component.html',
  styleUrls: ['./admin-piedit.component.scss']
})
export class AdminPieditComponent implements OnInit {
  loginUserData: any
  productdata: any = []
  p: any = 1
  searchText: any
  body: any
  suppliername:any
  date: string;
  constructor(private router: Router, private route: ActivatedRoute,private DatePipe: DatePipe,private toasterService: ToasterService, private globalService: GlobalServiceService, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    // this.getdata()
    this.getsuppliers();
  }
  suppliers: any = []
  getsuppliers() {
    this.globalService.getDataOnlyWithMethod("sup/skuprifix").subscribe((data) => {
      this.suppliers = data;
    });
  }
  totalproductdata: any = []
  data1: any = []
  qtys: any;
  supplierid: any;
  getdata(supplier) {
    for (let name of this.suppliers) {
      if (supplier.replace(/\s/g, '') === name.business_name.replace(/\s/g, '')) {
        this.supplierid = name.user_id
        break;
      }
    }
    // this.supplierid = supplier.user_id
      this.spinner.show();
    this.globalService.getDatawithMethodParams1("sup/getinvoicedata/",this.supplierid).subscribe((data) => {
      this.data1 = data;
        
     
      this.productdata = this.data1.ProductDetails[0];
      this.totalproductdata = this.data1.ProductDetails[0];
      this.qtys = this.productdata.map((e) => { return { qty: e.qty, ProductID: e.ProductID, invqty: e.invqty, poqhid: e.POQHID } })
      for (var i = 0; i < this.productdata.length; i++) {
        if (this.productdata[i]) {
          this.productdata[i].product_name = this.productdata[i].product_name +' '+ this.productdata[i].name1
          this.productdata[i].amount = this.productdata[i].balanceqty * this.productdata[i].price
          console.log(this.productdata[i].amount,'this.productdata[i].amount')
        }
      }
      if (this.productdata.length < 1) {
      //  alert("No Data is Available");
        $("#WarningModal").modal('show');
        }
      this.spinner.hide();
    });
  }
  selectedlist: any = []
  qtychange(product) {
    if(product){
      for (let p of this.productdata) {
        if (p.POQHID == product.POQHID) {
          p.amount = JSON.parse(product.qty) * JSON.parse(product.price)
        }
    }
    }
  }
  update(product){
      this.date = this.DatePipe.transform(new Date(), "yyyy-MM-dd")
      this.body = { "supplier_id": this.supplierid,"date": this.date, product};
      this.spinner.show();
      this.globalService.postData(this.body, "sup/updatepilist/").subscribe((data) => {
      this.spinner.hide();
      if (data['msg'] == 'sucessfuly updated') {
        $("#successModal").modal('show');
        //this.getdata(this.supplierid);
       // this.getsuppliers();
      }else{
        this.toasterService.warning("Some Qty invoice has been done")
        // this.getdata()
      //  this.router.navigateByUrl('Supplier-PI-Edit');
      }
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      })
  }
  delete(product){
    this.body = {product};
      this.spinner.show();
      this.globalService.postData(this.body, "sup/deletesku/").subscribe((data) => {
     this.spinner.hide();
      if (data['status'] == '1') {
        $("#deleteModal").modal('show');
        // this.getdata()
      }else{
        this.toasterService.warning("Unable To Delete")
      }
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
      })
  }
  keynumber(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  keyfloat(event: any) {
    const pattern = /[.0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  searchdata(data) {
    if (data) {
      this.productdata = []
      for (var i = 0; i < this.totalproductdata.length; i++) {
        if ((this.totalproductdata[i].product_name.toLowerCase().includes(data.toLowerCase()))) {
          this.productdata.push(this.totalproductdata[i])
        }
      }
    }
    else {
      this.productdata = this.totalproductdata
    }
  }

}
