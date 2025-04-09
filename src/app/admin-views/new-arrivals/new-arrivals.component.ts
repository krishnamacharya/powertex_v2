import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from "@angular/forms";
import { DatePipe } from '@angular/common';
import { formatDate } from "@angular/common";
import { GlobalServiceService } from '../../global-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';

declare var $: any;
@Component({
  selector: 'app-new-arrivals',
  standalone: false,
  templateUrl: './new-arrivals.component.html',
  styleUrls: ['./new-arrivals.component.scss']
})
export class NewArrivalsComponent implements OnInit {
  loginUserData: any;
  productDataForm:any;
  productnames: any = []
  productnamesall: any = []
  productdata: any = {}
  POhidden: boolean = true;
  DOhidden: boolean = false;
  SOhidden: boolean = false;
  Page: any = 1
  newarrivalslist: any = []
  arrival: any = {}
  fieldArray: Array<any> = [];
  fieldArray2: Array<any> = [];
  constructor(private DatePipe: DatePipe, private service: GlobalServiceService, private spinner: NgxSpinnerService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.arrival.fromdates = new Date()
    this.arrival.tilldates = new Date()
    this.getnewarrivals()
  }
  po() {
    this.POhidden = true;
    this.DOhidden = false;
    this.SOhidden = false;
    this.getnewarrivals()
  }
  keypress(event: any) {
    const pattern = /[0-9.]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  add_disable(attr) {

    let arr = ["product_name", "in_stock", "stock_qty"];
    for (let i of arr) {
      if (attr[i] == null || attr[i] == undefined) {

        return true;
      }
    }

    return false;
  }
  deleteFieldValue2(index) {
    let p = this.fieldArray[index]
    let l = this.productnamesall.filter((e) => e.productid == p.productid)
    this.productnames.push(l[0])
    this.fieldArray.splice(index, 1);

  }
  addFieldValue(productDataForm) {
    let i = this.fieldArray.filter((e) => e.productid == productDataForm.productid)
    if (i.length > 0) {
      alert("product already added")
    } else {
      this.fieldArray.push({
        productid: productDataForm.productid,
        product_name: productDataForm.product_name,
        in_stock: productDataForm.in_stock,
        date: this.DatePipe.transform(new Date(), "yyyy-MM-dd")
      });
      productDataForm.reset()
    }


  }
  sub_final() {
    this.service.postData(this.fieldArray, 'promocode/new_arivals/').subscribe((res) => {
      this.fieldArray
        = []
      this.productnames = this.productnamesall
      this.service.getMethodData("send_noti_dealers/").subscribe(resp => {
      })
      this.service.getMethodData("send_sms/").subscribe(resp => {
      })
      $("#successModal").modal('show');
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        // console.log(error);
      })
  }
  reset(productDataForm) {
    this.productnames = this.productnamesall
    productDataForm.reset()
    this.fieldArray
      = [] 
  }

  do() {
    this.POhidden = false;
    this.DOhidden = true;
    this.SOhidden = false;
    this.getproductnames()
  }

  getnewarrivals() {
    this.spinner.show();
    this.arrival.fromdates = this.DatePipe.transform(this.arrival.fromdates, "yyyy-MM-dd")
    this.arrival.tilldates = this.DatePipe.transform(this.arrival.tilldates, "yyyy-MM-dd")
    this.methodname = "promocode/new_arivals"
    this.service.getDatawithMethodParams2dates(this.methodname, this.arrival.fromdates, this.arrival.tilldates).subscribe((data) => {
      this.newarrivalslist = data
      this.spinner.hide();
      console.log(data);
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        // console.log(error);
      })
  }
  getproductnames() {
    this.spinner.show();
    this.service.getDataOnlyWithMethod("sup/subcategory").subscribe((data) => {
      this.spinner.hide();
      this.productnames = data;
      this.productnamesall = data


    });
  }
  getproductid(productname) {
    // this.productdata.productid=productname.productid
    for (let name of this.productnames) {
      if (productname.product_name.replace(/\s/g, '') === name.productname.replace(/\s/g, '')) {

        productname.productid = name.productid
        this.productnames = this.productnames.filter((e) => e.productid != name.productid)
        // this.productdata.product_name=productname.productname

        break;
      }

    }

  }
  onSubmit(form: NgForm) {
            
    this.atributesData(form);

  }
  methodname: any
  body: any
  atributesData(form) {
    this.productdata.date = this.DatePipe.transform(new Date(), "yyyy-MM-dd");
    this.body = { 'productid': this.productdata.productid, 'date': this.productdata.date, 'in_stock': this.productdata.in_stock }
    this.spinner.show();
    this.methodname = "promocode/new_arivals/"
    this.service.postData(this.body, this.methodname).subscribe((data) => {
      this.spinner.hide();
      // console.log(data);
      this.service.getMethodData("send_noti_dealers/").subscribe(resp => {
      })
      $("#successModal").modal('show');

      form.reset();
      this.productdata.product_name = undefined




    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        // console.log(error);
      })
  }
  so() {
    this.POhidden = false;
    this.DOhidden = false;
    this.SOhidden = true;
    this.getproductnames()
  }
  getstockproductid(stockDataForm) {
// console.log(stockDataForm);
//     if(stockDataForm.product_id =='' || stockDataForm.product_id ==null)
//     {
//       stockDataForm.stock_qty = 0;
//       stockDataForm.product_id = null;
//     }
    

    let loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    for (let name of this.productnames) {
      if (stockDataForm.product_id.replace(/\s/g, '') === name.productname.replace(/\s/g, '')) {

        stockDataForm.productid = name.productid
        stockDataForm.product_name = name.productname
        this.productnames = this.productnames.filter((e) => e.productid != name.productid)
        // this.productdata.product_name=productname.productname
        this.service.getDatawithQueryParams2('10.9', stockDataForm.productid,loginUserData.company_code).subscribe((data: any) => {
          if (data.stock) {
            stockDataForm.stock_qty = data.stock;
          } else {
            stockDataForm.stock_qty = 0;
          }
        }, error => {
          stockDataForm.stock_qty = 0;
        })
        break;
      }

    }
  }
  addFieldValue2(stockDataForm) {
    let i = this.fieldArray2.filter((e) => e.productid == stockDataForm.productid)
    if (i.length > 0) {
      alert("product already added")
    } else {
      this.fieldArray2.push({
        productid: stockDataForm.productid,
        product_name: stockDataForm.product_name,
        stock_qty: stockDataForm.stock_qty,
        in_stock: stockDataForm.value.in_stock,
        date: this.DatePipe.transform(new Date(), "yyyy-MM-dd")
      });
      stockDataForm.stock_qty = ''
      stockDataForm.reset()
    }


  }
  sub_final2() {

    console.log(this.fieldArray2);
    let loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.service.postData({ company_code: loginUserData.company_code, date: formatDate(new Date(), 'yyyy-MM-dd', 'en-IN') }, 'api/StockAjdhdr/').subscribe((res: any) => {
      this.fieldArray2.map((e, i) => {
        e['hid'] = res.id
        e['detail_id'] = i
        e['quantity'] = e.in_stock
        // if(e.stock_qty > e.in_stock){
        //  e['operation']="add"
        // }
        // else{
        //   e['operation']="sub"
        // }
      })
      this.service.postData(this.fieldArray2, 'api/StockAdjdl/').subscribe((res) => {
        this.fieldArray2
          = []
        this.productnames = this.productnamesall
        $("#successModal").modal('show');
      },
        error => {
          this.spinner.hide();
          //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
          // console.log(error);
        })
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        // console.log(error);
      })
  }
  reset2(stockDataForm) {
    this.productnames = this.productnamesall
    stockDataForm.stock_qty = ''
    stockDataForm.reset()
    this.fieldArray2
      = []
  }
  deleteFieldValue3(index) {
    let p = this.fieldArray2[index]
    let l = this.productnamesall.filter((e) => e.productid == p.productid)
    this.productnames.push(l[0])
    this.fieldArray2.splice(index, 1);

  }
}
