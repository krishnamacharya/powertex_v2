import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { GlobalServiceService } from '../global-service.service';
import { ToasterService } from '../toastr-service.service';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
declare var $: any;

@Component({
  selector: 'app-pending-invoices',
  standalone: false,
  templateUrl: './pending-invoices.component.html',
  styleUrls: ['./pending-invoices.component.scss']
})
export class PendingInvoicesComponent implements OnInit {
  loginUserData: any
  supplierdata: any = []
  p: any = 1
  searchText: any
  productdata: any = []
  supplier: any
  suppliers: any = []
  date2: any = new Date()
  date1: any
  commenting: any;
  transportdata: any;
  bedata: any;
  constructor(private datepipe: DatePipe, private globalServicce: GlobalServiceService, private route: Router, private toasterService: ToasterService, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getinvoicedata()
    this.getsuppliers()

  }
  getsuppliers() {
    this.globalServicce.getDataOnlyWithMethod("sup/skuprifix").subscribe((data) => {
      this.suppliers = data;
    });
  }
  url: any
  totalsupplierdata: any = []
  Difference_In_Time: any
  Difference_In_Days: any
  dateSent: any
  days: any
  getinvoicedata() {
    this.spinner.show();
    this.globalServicce.getDatawithMethod1("sup/pendinginvlist/").subscribe((data: any) => {
      this.supplierdata = data.data
      this.totalsupplierdata = data.data
      this.url = this.globalServicce.imageurl
      if (this.supplierdata.length > 0) {
        this.supplierdata.forEach(x => {
          if (x.productimage != null) {
            x.productimages = this.url + x.productimage
            x.document1 = this.url + x.doc1
            x.document2 = this.url + x.doc2
            x.document3 = this.url + x.doc3
            x.document4 = this.url + x.doc4
            x.document5 = this.url + x.doc5
          }

        })
      }
    
      for (var i = 0; i <= this.supplierdata.length; i++) {
        if (this.supplierdata[i]) {
          if (this.supplierdata[i].updateon) {
            let currentDate = new Date();
            this.dateSent = new Date(this.supplierdata[i].updateon);

            this.supplierdata[i].days = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(this.dateSent.getFullYear(), this.dateSent.getMonth(), this.dateSent.getDate())) / (1000 * 60 * 60 * 24));
            console.log(this.supplierdata, "days")
          }
        }

      }


      console.log(this.supplierdata, "productimage")
      console.log(this.supplierdata, "productdata")
      this.spinner.hide();
     
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  };
  image: any
  selected_image(data) {
    this.image = data
    $('#imageenlarge').modal('show');
  }
  invno: any
  viewMore(data) {
    this.invno = data.invqhid
    this.spinner.show();
    this.globalServicce.getDatawithMethodParam1("sup/invoice/", data.invqhid).subscribe((data) => {
      this.productdata = data
      this.url = this.globalServicce.imageurl
      this.spinner.hide();
      for (let p of this.productdata) {
        if (p.productid.long_name) {
          p.product_name = p.productid.long_name + ' ' + p.productid.modelno
          p.productimage = this.url + p.invqhid.productimage
          p.doc1 = this.url + p.invqhid.doc1
          p.doc2 = this.url + p.invqhid.doc2
          p.doc3 = this.url + p.invqhid.doc3
          p.doc4 = this.url + p.invqhid.doc4
        }
        else {
          p.product_name = p.productid.modelno
          p.productimage = this.url + p.invqhid.productimage
          p.doc1 = this.url + p.invqhid.doc1
          p.doc2 = this.url + p.invqhid.doc2
          p.doc3 = this.url + p.invqhid.doc3
          p.doc4 = this.url + p.invqhid.doc4
        }
      }
      console.log(this.productdata, "productdata")
      $('#viewpoModal1').modal('show');


    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  };

  confirm_sub(comment) {
    if (!comment) {
      this.toasterService.warning('Please enter comment')
    }
    else {
      this.headerdata.comments = comment
      this.methodname = "sup/updateinvoice/"
      this.globalServicce.updateData(this.headerdata, this.methodname).subscribe((data) => {
        this.spinner.hide();
        console.log(data);
        // if (data['msg'] == 'created successfully') {
        $("#successModal1").modal('show');
        // form.reset();
        // }
      },
        error => {
          this.spinner.hide();
          this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
          // console.log(error);
        })
    }
  }
  uploadMore(data) {
    localStorage.setItem('invoicedata', JSON.stringify(data));
    if (this.loginUserData.role == 'Admin') {
      this.route.navigateByUrl('Admin-Invoice-fileupload?A=DcL');
    } else {
      this.route.navigateByUrl('Supplier-Invoice-fileupload');
    }

  };
  gotopayment(data) {
    if (data.balance_amount == 0) {
      this.toasterService.warning("Payment done already")

    }
    else {
      localStorage.setItem('paymentinvoice', JSON.stringify(data));
      this.route.navigateByUrl('Admin-Invoice-Payments');
    }
  }
  value: any
  setFilteredItems() {

    if (this.supplier == undefined) {
      this.supplierdata = this.totalsupplierdata
    }

    else {

      this.supplierdata = this.totalsupplierdata.filter((item) => {
        return (
          item.businessname.toLowerCase().indexOf(this.supplier.toLowerCase()) > -1
        );
      });

      //  if (this.supplierdata.length < 1) {
      // $("#WarningModal").modal('show');
      // }
    }
    if (this.supplierdata.length < 1) {
    // alert("No Data is Available");

      $("#WarningModal").modal('show');
      }
  }
  headerdata: any = {}
  methodname: any
  approve(data) {

    if (!data.doc1) {
      this.toasterService.warning("Documents are not uploaded for this invoice")
    }

    else if (data.documentapproval == 1) {
      this.toasterService.warning("Documents has been approved already")
    }
    // else if(data.comments){
    //   this.toasterService.warning("This Invoice is on hold")
    // }
    else {
      this.headerdata.invqhid = data.invqhid
      this.headerdata.supplierid = data.supplierid
      this.headerdata.productimage = data.productimage
      this.headerdata.doc1 = data.doc1
      this.headerdata.doc2 = data.doc2
      this.headerdata.doc3 = data.doc3
      this.headerdata.doc4 = data.doc4
      this.headerdata.doc5 = data.doc5
      this.headerdata.doc6 = data.doc6
      this.headerdata.doc7 = data.doc7
      this.headerdata.inv_no = data.inv_no
      this.headerdata.documentapproval = 1
      this.headerdata.approveddate = this.datepipe.transform(new Date(), "yyyy-MM-dd");
      console.log(this.headerdata, "pro");
      this.spinner.show();

      this.methodname = "sup/updateinvoice/"
      this.globalServicce.updateData(this.headerdata, this.methodname).subscribe((data) => {
        this.spinner.hide();
        console.log(data);
        // if (data['msg'] == 'created successfully') {
        $("#successModal").modal('show');
        // form.reset();
        // }
      },
        error => {
          this.spinner.hide();
          this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
          // console.log(error);
        })
    }
  }
  updatemodal() {
    this.getinvoicedata()
  }
 
  opentab(data) {
    // let blob: any = new Blob([this.globalServicce.imageurl + data], { type: 'image/jpeg' });
    // const url = window.URL.createObjectURL(blob);
    window.open(this.globalServicce.imageurl + data);
  }
  

  printdatadetail(data) {
      this.route.navigateByUrl('/Supplier-Inv-Print?invqhid=' + data +'&A=GnL');
  }
  printreport(){
   // alert("print");
    localStorage.setItem('orders', JSON.stringify(this.supplierdata));
    localStorage.setItem('Type', JSON.stringify('Documents List'));
    // this.route.navigate(['/Admin-Documents-List-Print'])
    this.route.navigate(['/pending-invoices-print'])
  }
  InvEdit(data) {
    localStorage.setItem('invoicedata', JSON.stringify(data));

    this.route.navigateByUrl('invoice-proforma-invoice');

  };
}
