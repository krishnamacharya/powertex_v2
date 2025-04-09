import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from "../../global-service.service";
import { NgForm } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from "@angular/router";
import { DatePipe } from '@angular/common';
import { ToasterService } from '../../toastr-service.service';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-invoice-file-uploads',
  standalone: false,
  templateUrl: './invoice-file-uploads.component.html',
  styleUrls: ['./invoice-file-uploads.component.scss']
})
export class InvoiceFileUploadsComponent implements OnInit {
  PUrl: any;
  loginUserData: any
  pro: any = {}
  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  EXCEL_EXTENSION = '.xlsx';
  methodname1: string;
  json: any;
  jsondata: any
  jsondata1: any;
  json_data1: any = {};
  jsondata2: any;
  json_data2: any = {};
  jsondata3: any;
  json_data3: any = {};
  jsondata4: any;
  json_data4: any = {};
  XL_row_object: any = {};
  flag: number;
  uploadfile: any;
  url: string;
  doc2: string;
  doc3: string;
  doc4: string;
  uploadAttrfile: any;
  attrurl: string;
  prod_data: any;
  uploadStockfile: any;
  uploadlastfile: any
  uploadlastfile2: any
  uploadlastfile3: any
  uploadlastfile4: any
  stockurl: string;
  lasturl: string;
  lasturl2: string;
  lasturl3: string;
  lasturl4: string;
  headerdata: any = {}
  methodname: any
  invoicedata: any
  back: any;
  imgheight: any;
  imgheightbill: any;
  invoicedtl: any;
  constructor(private globalServicce: GlobalServiceService, private toasterService: ToasterService, private route: Router, private dialog: MatDialog, private spinner: NgxSpinnerService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    if (this.loginUserData.role == 'Admin') {
      this.back = 'Admin-GeneratedInvoices';
    } else {
      this.back = 'Supplier-GeneratedInvoices';
    }
    this.PUrl = window.location.href.substr(window.location.href.length - 5)
    this.invoicedata = JSON.parse(localStorage.getItem('invoicedata'));
    if (this.invoicedata.invqhid) {
      this.globalServicce.getDatawithQueryPar('sup/get_sup_inv_dtl/', this.invoicedata.invqhid).subscribe((respdata: any) => {
        if (respdata.data) {
          this.invoicedtl = respdata.data
          if (respdata.data.length > 0) {
            this.pro.cpm = this.invoicedtl[0].cpm
            this.pro.cont_size = this.invoicedtl[0].cont_size
          }
        }
      })
    }
    document.getElementsByName("date")[0].setAttribute('min', this.invoicedata.invdate);
    document.getElementsByName("date2")[0].setAttribute('min', this.invoicedata.invdate);
    this.image = this.invoicedata.productimage ? this.globalServicce.imageurl + this.invoicedata.productimage : ''
    this.url = this.invoicedata.doc1 ? this.alticonfunc(this.invoicedata.doc1) : ''
    this.attrurl = this.invoicedata.doc2 ? this.alticonfunc(this.invoicedata.doc2) : ''
    this.stockurl = this.invoicedata.doc3 ? this.alticonfunc(this.invoicedata.doc3) : ''
    this.lasturl = this.invoicedata.doc4 ? this.alticonfunc(this.invoicedata.doc4) : ''
    this.lasturl2 = this.invoicedata.doc5 ? this.alticonfunc(this.invoicedata.doc5) : ''
    this.lasturl3 = this.invoicedata.doc6 ? this.alticonfunc(this.invoicedata.doc6) : ''
    this.lasturl4 = this.invoicedata.doc7 ? this.alticonfunc(this.invoicedata.doc7) : ''
    if (this.invoicedata.bldate) {
      this.pro.bldate = this.invoicedata.bldate
    }
    if (this.invoicedata.onportdate) {
      this.pro.onportdate = this.invoicedata.onportdate
    }
    if (this.invoicedata.bl_no) {
      this.pro.bl_no = this.invoicedata.bl_no
    }
  }
  datechanged(event) {
    document.getElementsByName("date2")[0].setAttribute('min', event.target.value);
    this.pro.onportdate = '';
  }
  alticonfunc(filename) {
    if (filename.includes('.pdf')) {
      return 'https://img.icons8.com/color/50/000000/pdf.png';
    } else if (filename.includes('.xls')) {
      return 'https://img.icons8.com/color/50/000000/ms-excel.png';
    } else if (filename.includes('.doc')) {
      return 'https://img.icons8.com/color/50/000000/ms-excel.png';
    } else {
      return this.globalServicce.imageurl + filename;
    }
  }
  image: any

  file: File
  productfileUpload(event: any): void {
    this.spinner.show()
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0]
      var reader = new FileReader();
      reader.onload = (event: any) => {
        //me.modelvalue = reader.result;
        this.image = event.target.result
        this.imgheight = "imgheight"
        // console.log(event.target.result);
        this.productimageupload()
      };
      reader.readAsDataURL(this.file);
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
    // this.productimageupload()
  };
  productimageupload() {

    this.methodname = "ImageUploadView/";

    this.imagedata = { "image": this.image, "userid": this.loginUserData.user_id, "processes": "import" }
    this.globalServicce.postData(this.imagedata, this.methodname).subscribe((data) => {
      this.response = data;

      this.headerdata.productimage = this.response.image
      this.spinner.hide()
    })
  }
  //excelUpload
  productexcelUpload(evt: any): void {
    if(evt.target.files[0].name){
      this.spinner.show()
      this.uploadfile = evt.target.files[0].name;
      // this.fileChange(evt);
      this.onFileChange(evt.target, 'doc1');
    }
  };
  attrexcelUpload(evt: any): void {
    if(evt.target.files[0].name){
      // alert("hii");
      this.spinner.show()
      this.uploadAttrfile = evt.target.files[0].name;
      this.onFileChange(evt.target, 'doc2');
    }
  };

  stockexcelUpload(evt: any): void {
    if(evt.target.files[0].name){
      this.spinner.show()
      this.uploadStockfile = evt.target.files[0].name;
      console.log("stock", this.uploadStockfile);
      this.onFileChange(evt.target, 'doc3');
    }


  };
  fileupload4(evt: any): void {
    if(evt.target.files[0].name){
      this.spinner.show()
      this.uploadlastfile = evt.target.files[0].name;
      this.onFileChange(evt.target, 'doc4');
    }
  };
  fileupload5(evt: any): void {
    if(evt.target.files[0].name){
      this.spinner.show()
      this.uploadlastfile2 = evt.target.files[0].name;
      this.onFileChange(evt.target, 'doc5');
    }
  };
  fileupload6(evt: any): void {
    if(evt.target.files[0].name){
      this.spinner.show()
      this.uploadlastfile3 = evt.target.files[0].name;
      this.onFileChange(evt.target, 'doc6');
    }
  };
  fileupload7(evt: any): void {
    if(evt.target.files[0].name){
      this.spinner.show()
      this.uploadlastfile4 = evt.target.files[0].name;
      this.onFileChange(evt.target, 'doc7');
    }
  };
  //   fileChange(event) {
  //     
  //     let fileList: FileList = event.target.files;
  //     if(fileList.length > 0) {
  //         let file: File = fileList[0];
  //         let formData:FormData = new FormData();
  //         formData.append('uploadFile', file, file.name);
  //         this.uploaddata1(file)
  //         /** In Angular 5, including the header Content-Type can invalidate your request */

  //     }
  // }
  imagedata: any
  response: any
  onFileChange(evt: any, data) {

    /* wire up file reader */
    // const file: File = evt.files[0];

    // const reader: FileReader = new FileReader();
    this.file = evt.files[0]
    var reader = new FileReader();
    reader.onload = (e: any) => {
      if (data == "doc1") {
        this.url = "https://img.icons8.com/color/50/000000/ms-excel.png";
        this.imgheightbill = "imgheightbill";
      }
      else if (data == "doc2") {
        this.attrurl = "https://img.icons8.com/color/50/000000/ms-excel.png";
      } else if (data == "doc3") {
        this.stockurl = "https://img.icons8.com/color/50/000000/ms-excel.png";
      }
      else if (data == "doc5") {
        this.lasturl2 = "https://img.icons8.com/color/50/000000/ms-excel.png";
      }
      else if (data == "doc6") {
        this.lasturl3 = "https://img.icons8.com/color/50/000000/ms-excel.png";
      }
      else if (data == "doc7") {
        this.lasturl4 = "https://img.icons8.com/color/50/000000/ms-excel.png";
      }
      else {
        this.lasturl = "https://img.icons8.com/color/50/000000/ms-excel.png";
      }
      // this.url = "https://img.icons8.com/color/50/000000/ms-excel.png";
      // /* read workbook */
      // const result: string = e.target.result;
      // const wb: XLSX.WorkBook = XLSX.read(result, { type: 'binary', cellDates: true, cellText: false, dateNF: 'yyyy/mm/dd' });

      // /* grab first sheet */
      // const wsname: string = wb.SheetNames[0];
      // const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      //   if (data == "doc1") {
      //   this.jsondata1 = (XLSX.utils.sheet_to_json(ws));
      //   this.json_data1 = JSON.stringify(this.jsondata1);
      //   console.log("json",this.json_data1);
      //   this.uploaddata()

      //   }
      //   else if (data == "doc2") {
      //   this.jsondata2 = (XLSX.utils.sheet_to_json(ws));
      //   this.json_data2= JSON.stringify(this.jsondata2);
      //   console.log("json",this.json_data2);
      //   }
      //   else if (data == "doc3") {
      //   this.jsondata3 = (XLSX.utils.sheet_to_json(ws));
      //   this.json_data3= JSON.stringify(this.jsondata3);
      //   console.log("json",this.json_data3);
      //   }
      //   else {
      //   this.jsondata4= (XLSX.utils.sheet_to_json(ws));
      //   this.json_data4= JSON.stringify(this.jsondata4);
      //   console.log("json",this.json_data4);
      //   }
      // }
      console.log(data)
      if (data == "doc1") {
        this.jsondata = e.target.result
        console.log("json", this.jsondata);
        this.uploaddata1()
      }
      else if (data == "doc2") {
        this.jsondata = e.target.result
        console.log("json", this.jsondata);
        this.uploaddata2()
      }
      else if (data == "doc3") {
        this.jsondata = e.target.result
        this.uploaddata3()
      } else if (data == "doc5") {
        this.jsondata = e.target.result
        this.uploaddata5()
      } else if (data == "doc6") {
        this.jsondata = e.target.result
        this.uploaddata6()
      } else if (data == "doc7") {
        this.jsondata = e.target.result
        this.uploaddata7()
      }
      else if (data == "doc4") {
        this.jsondata = e.target.result
        this.uploaddata4()
      }
    };

    reader.readAsDataURL(this.file);
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
    // reader.readAsBinaryString(evt.files[0]);
  }

  uploaddata1() {
    this.methodname = "FileUploadView/";

    this.imagedata = { "image": this.jsondata, "userid": this.loginUserData.user_id, "processes": "import" }
    this.globalServicce.postData(this.imagedata, this.methodname).subscribe((data) => {
      this.response = data;
      this.headerdata.doc1 = this.response.image
      this.spinner.hide()
    },
      error => {
        this.spinner.hide();
        if (error.error.status == 0) {
          alert(error.error.msg)
        }
      })
  }
  uploaddata2() {
    this.methodname = "FileUploadView/";
    this.imagedata = { "image": this.jsondata, "userid": this.loginUserData.user_id, "processes": "import" }
    this.globalServicce.postData(this.imagedata, this.methodname).subscribe((data) => {
      this.response = data;
      this.headerdata.doc2 = this.response.image
      this.spinner.hide()
    },
      error => {
        this.spinner.hide();
        if (error.error.status == 0) {
          alert(error.error.msg)
        }
      })
  }
  uploaddata3() {
    this.methodname = "FileUploadView/";
    this.imagedata = { "image": this.jsondata, "userid": this.loginUserData.user_id, "processes": "import" }
    this.globalServicce.postData(this.imagedata, this.methodname).subscribe((data) => {
      this.response = data;
      this.headerdata.doc3 = this.response.image
      this.spinner.hide()
    },
      error => {
        this.spinner.hide();
        if (error.error.status == 0) {
          alert(error.error.msg)
        }
      })
  }
  uploaddata4() {
    //  this.spinner.show();
    this.methodname = "FileUploadView/";

    this.imagedata = { "image": this.jsondata, "userid": this.loginUserData.user_id, "processes": "import" }
    this.globalServicce.postData(this.imagedata, this.methodname).subscribe((data) => {
      this.response = data;
      // this.spinner.hide();
      this.headerdata.doc4 = this.response.image
      this.spinner.hide()
    },
      error => {
        this.spinner.hide();
        if (error.error.status == 0) {
          alert(error.error.msg)
        }
      })
  }
  uploaddata5() {
    //  this.spinner.show();
    this.methodname = "FileUploadView/";

    this.imagedata = { "image": this.jsondata, "userid": this.loginUserData.user_id, "processes": "import" }
    this.globalServicce.postData(this.imagedata, this.methodname).subscribe((data) => {
      this.response = data;
      // this.spinner.hide();
      this.headerdata.doc5 = this.response.image
      this.spinner.hide()
    },
      error => {
        this.spinner.hide();
        if (error.error.status == 0) {
          alert(error.error.msg)
        }
      })
  }
  uploaddata6() {
    //  this.spinner.show();
    this.methodname = "FileUploadView/";

    this.imagedata = { "image": this.jsondata, "userid": this.loginUserData.user_id, "processes": "import" }
    this.globalServicce.postData(this.imagedata, this.methodname).subscribe((data) => {
      this.response = data;
      // this.spinner.hide();
      this.headerdata.doc6 = this.response.image
      this.spinner.hide()
    },
      error => {
        this.spinner.hide();
        if (error.error.status == 0) {
          alert(error.error.msg)
        }
      })
  }
  uploaddata7() {
    //  this.spinner.show();
    this.methodname = "FileUploadView/";

    this.imagedata = { "image": this.jsondata, "userid": this.loginUserData.user_id, "processes": "import" }
    this.globalServicce.postData(this.imagedata, this.methodname).subscribe((data) => {
      this.response = data;
      // this.spinner.hide();
      this.headerdata.doc7 = this.response.image
      this.spinner.hide()
    },
      error => {
        this.spinner.hide();
        if (error.error.status == 0) {
          alert(error.error.msg)
        }
      })
  }
  onSubmit(form: NgForm) {
    if(!this.pro.bldate){
      this.toasterService.error("Please Enter BL Date");
      return false
    }
    if(!this.pro.onportdate){
      this.toasterService.error("Please Enter On-Board Date");
      return false
    }
    this.atributesData(form);
  }
  body: any
  atributesData(form) {
    if (this.pro.doc1) {
      if (this.pro.bldate == null) {
        alert("Please Enter BL Date")
        return false;
      }
    }
    this.pro.bldate = this.datePipe.transform(this.pro.bldate, 'yyyy-MM-dd');
    this.pro.onportdate = this.datePipe.transform(this.pro.onportdate, 'yyyy-MM-dd');
    this.headerdata.bl_no = this.pro.bl_no
    this.headerdata.bldate = this.pro.bldate
    this.headerdata.onportdate = this.pro.onportdate
    this.headerdata.invqhid = this.invoicedata.invqhid
    this.headerdata.supplierid = this.invoicedata.supplierid
    // console.log(this.headerdata, "pro");
    this.spinner.show();
    let postdata = {}
    postdata['json_hdr'] = this.headerdata
    postdata['json_dtl'] = this.invoicedtl
    this.methodname = "sup/updateinvoice/"
    this.globalServicce.updateData(postdata, this.methodname).subscribe((data) => {
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
  updatemodal() {
    // if (this.loginUserData.role == 'Admin') {
    //   this.route.navigateByUrl('Admin-GeneratedInvoices');
    // } else {
    // // window.history.back();
    // // this.route.navigateByUrl('Supplier-GeneratedInvoices');
    // this.route.navigateByUrl('Generated-Supplier-Invoices');
    // }
    window.history.back();
  }
  changecpm(event) {
    this.invoicedtl.map((e) => {
      e.cpm = event.target.value
    })
  }
  changecs(event) {
    this.invoicedtl.map((e) => {
      e.cont_size = event.target.value
    })
  }
}
