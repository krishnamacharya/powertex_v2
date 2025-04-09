import { Component, OnInit,SimpleChanges  } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { GlobalServiceService } from '../../global-service.service';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-wh-stock',
  standalone: false,
  templateUrl: './wh-stock.component.html',
  styleUrls: ['./wh-stock.component.scss']
})
export class WhStockComponent implements OnInit {

  resources: any;
  loginUserData: any;
  token: any;
  alert: boolean;
  currentmonth: any
  fromdate: any
  tilldate: any
  resources2: any
  page: any = 1
  count: any;
  searchText:any
  itemperpage=10
  supplierid: any;
  category: any;
  date: any;
 
  constructor(private DatePipe: DatePipe,private service: GlobalServiceService, private router: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.alert = false;
    this.token = localStorage.getItem('token');
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    // this.getCatg();
    // this.getstock()
    // this.getsubcategoryData()
    // this.date = this.DatePipe.transform(new Date(), "yyyy-MM-dd");
    this.date = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + "01";
    
    this.getBrands();
    this.getcategory();
    this.getdata();
  }
  changedata(){
    console.log("this.resources2change", this.resources2);
  }
  // getstock() {
  //   this.spinner.show()
  //   this.currentmonth = new Date().getUTCMonth() + 1
  //   this.fromdate = new Date().getUTCFullYear() + "-" + this.currentmonth + "-" + "01";
  //   this.tilldate = new Date().getUTCFullYear() + "-" + this.currentmonth + "-" + new Date().getUTCDate();

  //   return this.service.getDataadminreport('repo', this.fromdate, this.tilldate, 'HYD_MAIN', '', '', '', 'Stock', 'P', '').subscribe((resp) => {

  //     this.spinner.hide();

  //     this.resources2 = resp;
     
  //     // this.company_code = ""
  //     console.log("this.resources2", this.resources2);
  //     this.count = this.resources2.length
  //       // this.companycode = this.company_code;
  //    /*  this.companycode='' */;
  //     // if (this.resources2.length > 0) {
  //     //   this.toasterService.success('TOTAL COUNT FOR THE SELECTED CATEGORY IS ' + '  ' + this.count);
  //     //   this.typename = 'Stock'
  //     // }
  //     // if (this.resources2.length <= 0) {
  //     //   this.toasterService.warning("no records present")
  //     // }
  //     // this.types = 'Stock';
  //   },
  //     error => {
  //       this.spinner.hide();
  //     });
  //     this.spinner.hide()
  // }

  brands: any = []
  getBrands() {
    this.spinner.show()
    this.service.getDatawithInput_id('brand').subscribe((resp) => {
      console.log(resp);
      this.spinner.hide()
      this.brands = resp
    })
  }
  getCatg() {
    this.spinner.show();
    return this.service.getDatawithMethod1('get_products_category/').subscribe((resp) => {
      this.spinner.hide();
      this.resources = resp;
      console.log(this.resources);

    },
      error => {
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  }
  selected_Cat(Category) {
    this.router.navigate(['/stock_sub_catg', Category])
  }

  print(){
    localStorage.setItem('reportdata', JSON.stringify(this.resources2));
    localStorage.setItem('type', 'Stock');
    this.router.navigate(['/PRINT-REPORT'])
  }
    /* =========================SUB category dropdown=========================== */
    resources5: any;
    subcategory: any;
    getsubcategoryData() {
      return this.service.getDatawithMethodParams2('sup/subcategorylistsupplier/','', this.category).subscribe((resp) => {
        this.resources5 = resp;
        console.log((this.resources5))
      })
    }
    resources6: any = [];
  pro1: any;
  getcategory() {
    this.resources6 = [];
            return this.service.getDatawithMethodParams1('sup/categorylistsupplier/', '').subscribe((resp) => {
              this.resources6 = resp;
           },
           error => {
           this.spinner.hide();
           this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
            
          });
  }

  supname: boolean = false
  totalproductdata: any = []
  productdata1: any = []
  productdata: any = []
  suppliercny: any;
  brand: any;
  getdata() {
    this.spinner.show();
return this.service.getDatawithMethodParams5("getstockr/", this.category?this.category:'',this.subcategory?this.subcategory:'',this.date,this.brand?this.brand:'' ,'').subscribe((data) => {

    // this.service.getDatawithMethodParams4("getstockr/", this.category?this.category:'',this.subcategory?this.subcategory:'',this.date,'').subscribe((data) => {
      this.resources2 = data;
    this.spinner.hide();

  });
  }


}
