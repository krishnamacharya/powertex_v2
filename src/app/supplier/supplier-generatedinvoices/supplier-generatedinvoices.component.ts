import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GlobalServiceService } from "../../global-service.service";
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from '../../toastr-service.service';
import * as fileSaver from 'file-saver';
import { DatePipe } from '@angular/common';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-supplier-generatedinvoices',
  standalone: false,
  templateUrl: './supplier-generatedinvoices.component.html',
  styleUrls: ['./supplier-generatedinvoices.component.scss']
})

export class SupplierGeneratedinvoicesComponent implements OnInit {
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
  // this.globalServicce.getDatawithMethodParams1("sup/pendinggeninvoices/",'abc').subscribe((data: any) => {
    this.globalServicce.getDatawithMethod1("sup/documentslist/").subscribe((data: any) => {
      // this.globalServicce.getDatawithMethodParams1("sup/invoice/", "abc").subscribe((data: any) => {
      // const resp = data.filter((e) => { return e.doc1 != null && e.doc2 != null && e.doc3 != null && e.doc5 != null })
      // const resp = data.filter((e) => { return e.doc1 != null || e.doc2 != null || e.doc3 != null || e.doc5 != null })
      const resp = data.filter((e) => { return e.doc1 != null || e.doc2 != null || e.doc3 != null })
      this.supplierdata = resp
      this.totalsupplierdata = resp
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
  comment(data) {
    if (data.comments) {
      this.toasterService.warning("This Invoice commented already")
    }
    else {
      this.headerdata.invqhid = data.invqhid
      this.headerdata.supplierid = data.supplierid
      this.headerdata.productimage = data.productimage
      this.headerdata.doc1 = data.doc1
      this.headerdata.doc2 = data.doc2
      this.headerdata.doc3 = data.doc3
      this.headerdata.doc4 = data.doc4
      $('#comment').modal('show');
    }
  }
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
          item.business_name.toLowerCase().indexOf(this.supplier.toLowerCase()) > -1
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
  dataURLtoFile(image, doc1, doc2, doc3, doc4, doc5, doc6, doc7,inv_no) {
    if (doc1) {
      let blob: any = new Blob([doc1], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;
      var count = (doc1.match(/media/g) || []).length;
      if (count > 1) {
        doc1 = doc1.replace(/\/media/, '')
      }
      fileSaver.saveAs(this.globalServicce.imageurl + doc1, inv_no+"_BillOfLading." + doc1.substr(doc1.length - 5).split('.')[1]);
    }
    if (doc2) {
      let blob: any = new Blob([doc2], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;
      var count = (doc2.match(/media/g) || []).length;
      if (count > 1) {
        doc2 = doc2.replace(/\/media/, '')
      }
      fileSaver.saveAs(this.globalServicce.imageurl + doc2, inv_no +"_Invoice." + doc2.substr(doc2.length - 5).split('.')[1]);
    }
    if (doc3) {
      let blob: any = new Blob([doc3], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;
      var count = (doc3.match(/media/g) || []).length;
      if (count > 1) {
        doc3 = doc3.replace(/\/media/, '')
      }
      fileSaver.saveAs(this.globalServicce.imageurl + doc3, inv_no +"_PackingList." + doc3.substr(doc3.length - 5).split('.')[1]);
    }
    if (doc4) {
      let blob: any = new Blob([doc4], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;
      var count = (doc4.match(/media/g) || []).length;
      if (count > 1) {
        doc4 = doc4.replace(/\/media/, '')
      }
      fileSaver.saveAs(this.globalServicce.imageurl + doc4, inv_no +"_CO." + doc4.substr(doc4.length - 5).split('.')[1]);
    }
    if (doc5) {
      let blob: any = new Blob([doc4], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;
      fileSaver.saveAs(this.globalServicce.imageurl + doc5, inv_no +"_Insurance." + doc5.substr(doc5.length - 5).split('.')[1]);
    }
    if (doc6) {
      let blob: any = new Blob([doc4], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;
      fileSaver.saveAs(this.globalServicce.imageurl + doc6, inv_no +"_other1." + doc6.substr(doc6.length - 5).split('.')[1]);
    }
    if (doc7) {
      let blob: any = new Blob([doc4], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;
      fileSaver.saveAs(this.globalServicce.imageurl + doc7, inv_no +"_other2." + doc7.substr(doc7.length - 5).split('.')[1]);
    }
    if (image) {
      let blob: any = new Blob([image], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;
      var count = (image.match(/media/g) || []).length;
      if (count > 2) {
        image = image.replace(/\/media/, "")
      }
      fileSaver.saveAs(this.globalServicce.imageurl + image, inv_no +'_Productimage.' + image.substr(image.length - 5).split('.')[1]);
    }

    //  window.open(dataurl);
  }
  opentab(data) {
    // let blob: any = new Blob([this.globalServicce.imageurl + data], { type: 'image/jpeg' });
    // const url = window.URL.createObjectURL(blob);
    window.open(this.globalServicce.imageurl + data);
  }
  lrcopy: any;
  TransportDetails(data) {
    this.invno = data.invqhid
    this.spinner.show();
    this.globalServicce.getDatawithMethodParam1("sup/invoice/", data.invqhid).subscribe((data) => {
      if (data[0].vechile_no) {
        this.transportdata = data[0]
      } else {
        this.transportdata = undefined
      }
    this.lrcopy= this.globalServicce.imageurl + this.transportdata.lrcopy
    this.spinner.hide();
      $('#viewtransportModal1').modal('show');
    });
  } 
   downloadLRCopy(lrcopy, inv_no) {

    if (lrcopy) {
      let blob: any = new Blob([lrcopy], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;

      // var count = (lrcopy.match(/media/g) || []).length;
      // if (count > 1) {
      //   lrcopy = lrcopy.replace(/\/media/, '')
      // }
      fileSaver.saveAs(this.globalServicce.imageurl + lrcopy, inv_no +"_LR_Copy." + lrcopy.substr(lrcopy.length - 5).split('.')[1]);
    }
  }
  //BeDetails
  billofentry: any;
  BeDetails(data) {
    this.invno = data.invqhid
    this.spinner.show();
    this.globalServicce.getDatawithMethodParam1("sup/invoice/", data.invqhid).subscribe((data) => {
      if (data[0].vechile_no) {
        this.bedata = data[0].invqhid
      } else {
        this.bedata = undefined
      }
    console.log(this.bedata,'bedata');
    this.billofentry= this.globalServicce.imageurl + this.bedata.billofentry
    this.spinner.hide();
      $('#viewBeModal').modal('show');
    });
  } 
  downloadBeCopy(billofentry, inv_no) {

    if (billofentry) {
      let blob: any = new Blob([billofentry], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;

      // var count = (billofentry.match(/media/g) || []).length;
      // if (count > 1) {
      //   billofentry = billofentry.replace(/\/media/, '')
      // }
      fileSaver.saveAs(this.globalServicce.imageurl + billofentry, inv_no +"_BillOfEntry." + billofentry.substr(billofentry.length - 5).split('.')[1]);
    }
  }

  printdatadetail(data) {
      this.route.navigateByUrl('/Supplier-Inv-Print?invqhid=' + data +'&A=GnL');
  }
  printreport(){
    localStorage.setItem('orders', JSON.stringify(this.supplierdata));
    localStorage.setItem('Type', JSON.stringify('Documents List'));
    this.route.navigate(['/Admin-Documents-List-Print'])
  }
}
