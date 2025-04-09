import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { GlobalServiceService } from "../global-service.service";
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from '../toastr-service.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { DatePipe } from '@angular/common';
import * as fileSaver from 'file-saver';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';

declare var $: any;
@Component({
  selector: 'app-invoice-documents',
  standalone: false,
  templateUrl: './invoice-documents.component.html',
  styleUrls: ['./invoice-documents.component.scss']
})
export class InvoiceDocumentsComponent implements OnInit {
  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  EXCEL_EXTENSION = '.xlsx';
  XL_row_object: any = {};
  loginUserData: any
  supplierdata: any = []
  p: any = 1
  add:any;
  searchText: any
  editdata: any = {};
  headerdata: any = {};
  headerdata1: any = {};
  type: any = "";
  methodname: string;
  imgheightbill: any;
  pro: any = {}

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
  jsondata: any
  jsondata1: any;
  json_data1: any = {};
  jsondata2: any;
  json_data2: any = {};
  jsondata3: any;
  json_data3: any = {};
  jsondata4: any;
  json_data4: any = {};
  invoicedata: any
  imagedata: { image: any; userid: any; processes: string; };
  imagedata2: { image: any; userid: any; processes: string; };
  imagedata3: { image: any; userid: any; processes: string; };
  imagedata4: { image: any; userid: any; processes: string; };
  imagedata5: { image: any; userid: any; processes: string; };
  response: any;
  imgheight: string;
  image2: any;
  product: any = [];
  maxdate: any;
  sup_name: any;
  inv_num: any;
  inv_dt: any;
  inv_val: any;
  ctyp: any;
  constructor(private activatedRoute: ActivatedRoute, private DatePipe: DatePipe, private globalServicce: GlobalServiceService, private router: Router, private toasterService: ToasterService, private dialog: MatDialog, private spinner: NgxSpinnerService) {
    this.activatedRoute.params.subscribe(params => {
      this.type = params['type'];
      console.log(params)
    });
  }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getinvoicedata()
    this.image = this.editdata.billofentry ? this.globalServicce.imageurl + this.editdata.billofentry : ''
    // this.image = this.invoicedata.productimage ? this.globalServicce.imageurl + this.invoicedata.productimage : ''
    this.maxdate = new Date();
    document.getElementsByName("lr_date")[0].setAttribute('max',this.maxdate);
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
  file: File
  lrcopyupload(fileInput: any) {
    this.file = <File>fileInput.target.files[0];
    this.preview();
  }
  preview() {
    // Show preview 
    // var mimeType = this.file.type;
    // if (mimeType.match(/image\/*/) == null) {
    //   return;
    // }

    var reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (_event) => {
      this.image = reader.result;
      this.prodtimgupload()
    }
  }
  prodtimgupload() {
    this.spinner.show()
    this.methodname = "FileUploadView/";

    this.imagedata = { "image": this.image, "userid": this.loginUserData.user_id, "processes": "import" }
    this.globalServicce.postData(this.imagedata, this.methodname).subscribe((data) => {
      this.response = data;
      this.headerdata.lrcopy = this.response.image
      this.spinner.hide()
    })
  }


  file2: File
  ortherdoc(fileInput: any) {
    this.file2 = <File>fileInput.target.files[0];
    this.preview2();
  }
  preview2() {
    // Show preview 
    // var mimeType = this.file2.type;
    // if (mimeType.match(/image\/*/) == null) {
    //   return;
    // }

    var reader = new FileReader();
    reader.readAsDataURL(this.file2);
    reader.onload = (_event) => {
      this.image2 = reader.result;
      this.ortherdocupload()
    }
  }
  ortherdocupload() {
    this.spinner.show()
    this.methodname = "FileUploadView/";

    this.imagedata2 = { "image": this.image2, "userid": this.loginUserData.user_id, "processes": "import" }
    this.globalServicce.postData(this.imagedata2, this.methodname).subscribe((data) => {
      this.response = data;
      this.headerdata.chaortherdoc = this.response.image
      this.spinner.hide()
    })
  }



  file3: File
  imagecha :any;
  chacopyupload(fileInput: any) {
    this.file3 = <File>fileInput.target.files[0];
    this.preview4();
  }
  preview4() {
    // Show preview 
    // var mimeType = this.file3.type;
    // if(mimeType.match(/image\/*/) == null) {
    //   return;
    // } 

    var reader = new FileReader();
    reader.readAsDataURL(this.file3);
    reader.onload = (_event) => {
      this.imagecha = reader.result;
      this.chafileupload()
    }
  }
  chafileupload() {
    this.spinner.show()
    this.methodname = "FileUploadView/";

    this.imagedata3 = { "image": this.imagecha, "userid": this.loginUserData.user_id, "processes": "import" }
    this.globalServicce.postData(this.imagedata3, this.methodname).subscribe((data) => {
      this.response = data;
      this.headerdata.chacopy = this.response.image
      this.spinner.hide()
    })
  }






  url: any
  supplierdata1: any
  getinvoicedata() {
    this.spinner.show();
    this.globalServicce.getDatawithMethodParams2("sup/documenton/", this.loginUserData.shipment_point,'').subscribe((data: any) => {
      console.log(data, "my data")
      if (this.type == "Pending") {
        // this.supplierdata = data.filter((e) => { return e.Status == 0}) 
        this.supplierdata1 = data.filter((e) => { return e.Status == 0}) 
        this.supplierdata = this.supplierdata1.filter((e) => { return e.doc1 != null || e.doc2 != null || e.doc3 != null || e.doc5 != null })
        console.log(this.supplierdata, "Pending");
      } else {
        this.supplierdata = data.filter((e) => { return e.Status == 1})
        console.log(this.supplierdata, "Completed");
      }

      // this.url = this.globalServicce.imageurl
      // if(this.supplierdata.length>0){
      //   this.supplierdata.forEach(x =>  {
      //      if(x.productimage!=null){
      //     x.productimage =  this.url+x.productimage
      //     x.doc1 =  this.url+x.doc1
      //     x.doc2 =  this.url+x.doc2
      //     x.doc3 =  this.url+x.doc3
      //     x.doc4 =  this.url+x.doc4
      //     }

      //  })
      // }
      // this.image1 =this.globalServicce.imageurl+ this.supplierdata[0].billofentry 
      // this.image1 = this.supplierdata[0].billofentry  ? this.globalServicce.imageurl + this.supplierdata[0].billofentry : ''
      // this.editdata.billofentry = this.image1


      // this.editdata.Duty = this.supplierdata[0].Duty?this.supplierdata[0].Duty:null
      // this.editdata.twomonthssale = this.supplierdata[0].twomonthssale?this.supplierdata[0].twomonthssale:null
      // this.editdata.PDEXP =  this.supplierdata[0].PDEXP?this.supplierdata[0].PDEXP:null
      // this.editdata.Remarks = this.supplierdata[0].Remarks?this.supplierdata[0].Remarks:null
      // this.editdata.asses_val = this.supplierdata[0].asses_val?this.supplierdata[0].asses_val:null
      // this.editdata.be_date = this.supplierdata[0].be_date?this.supplierdata[0].be_date:null

      console.log(this.editdata, "form")
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
  getdocavailabl(data) {
    let text = "";
    if (data.productimage) {
      text = text + "IMG/"
    }
    if (data.doc1) {
      text = text + "BL/"
    }
    if (data.doc2) {
      text = text + "INV/"
    }
    if (data.doc3) {
      text = text + "PL/"
    }
    if (data.doc4) {
      text = text + "CO/"
    }
    if (data.doc5) {
      text = text + "INS/"
    }
    if (data.doc6) {
      text = text + "OTHERS1/"
    }
    if (data.doc7) {
      text = text + "OTHERS2"
    }
    return text;
  }
  BeEntry(data){
    if(!data.linename){
      this.toasterService.error("Please Enter BL Details First");
      return false
    }
        localStorage.setItem("invoiceData", JSON.stringify(data));
        if (this.type == "Pending") {
        this.router.navigateByUrl('/BE-Entry?invqhid=' + data.invqhid + '&C=PSL');
        }else {
        this.router.navigateByUrl('/BE-Entry?invqhid=' + data.invqhid + '&C=CSL');
        }
  }
  editInfo1(data,bl_entry) {
    this.editdata = {};
    this.image1 = '';
    this.sup_name = data.business_name;
    this.inv_num = data.inv_no;
    this.inv_dt = data.invdate;
    this.inv_val = data.Amount;
    this.ctyp = data.ctype;
    this.editdata = data;
    // this.headerdata = { invqhid: data.invqhid, billofentry: data.billofentry, chacopy: data.chacopy }
    this.headerdata = { invqhid: data.invqhid, billofentry: data.billofentry }
    // this.image1 = data.billofentry ? this.alticonfunc(data.billofentry) : ''
    this.image1 = bl_entry ? this.alticonfunc(bl_entry) : '';
    // this.editdata.billofentry = ""
    // this.imagecha = data.chacopy ? this.alticonfunc(data.chacopy) : ''
    // this.editdata.chacopy = ""
    console.log(data,'BE Details')
    $('#editmodal').modal('show');
  }
  ex_rate(rate){
    this.editdata.asses_val =((JSON.parse(rate) * JSON.parse(this.inv_val)).toFixed(2));
  }
  getdocnotavailabl(data) {
    let text = "";
    if (!data.productimage) {
      text = text + "IMG/"
    }
    // if (!data.doc1) {
    //   text = text + "BL/"
    // }
    // if (!data.doc2) {
    //   text = text + "INV/"
    // }
    // if (!data.doc3) {
    //   text = text + "PL/"
    // }
    // if (!data.doc4) {
    //   text = text + "CO/"
    // }
    // if (!data.doc5) {
    //   text = text + "INS/"
    // }
    if (!data.doc6) {
      text = text + "OTHERS1/"
    }
    if (!data.doc7) {
      text = text + "OTHERS2"
    }
    return text;
  }
  getpendingdoc(data) {
    let text = "";
    // if (!data.productimage) {
    //   text = text + "IMG/"
    // }
    if (!data.doc1) {
      text = text + "BL/"
    }
    if (!data.doc2) {
      text = text + "INV/"
    }
    if (!data.doc3) {
      text = text + "PL/"
    }
    if (!data.doc4) {
      text = text + "CO/"
    }
    if (!data.doc5) {
      text = text + "INS/"
    }
    // if (!data.doc6) {
    //   text = text + "OTHERS1/"
    // }
    // if (!data.doc7) {
    //   text = text + "OTHERS2"
    // }
    return text;
  }
  excelproddownload(data) {

    var excelFileName = "Sample";
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: this.EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + this.EXCEL_EXTENSION);
  };


  
  //   dataURLtoFile(dataurl) {
  //     let blob:any = new Blob([dataurl], {  type: 'image/jpeg'});
  //     const url = window.URL.createObjectURL(blob);
  //     //window.open(url);
  //     //window.location.href = response.url;
  //     fileSaver.saveAs(dataurl, 'doc.jpeg');

  //   //  window.open(dataurl);
  // }
  dataURLtoFile(image, doc1, doc2, doc3, doc4, doc5, doc6, doc7, inv_no) {
    if (doc1) {
      let blob: any = new Blob([doc1], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;
      var count = (doc1.match(/media/g) || []).length;
      if (count > 1) {
        doc1.replace(/media/g, '')
      }
      fileSaver.saveAs(this.globalServicce.imageurl + doc1, inv_no +"_BL." + doc1.substr(doc1.length - 5).split('.')[1]);
    }
    if (doc2) {
      let blob: any = new Blob([doc2], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;
      var count = (doc2.match(/media/g) || []).length;
      if (count > 1) {
        doc2.replace(/media/g, '')
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
        doc3.replace(/media/g, '')
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
        doc4.replace(/media/g, '')
      }
      fileSaver.saveAs(this.globalServicce.imageurl + doc4, inv_no +"_CO." + doc4.substr(doc4.length - 5).split('.')[1]);
    }
    if (doc5) {
      let blob: any = new Blob([doc4], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;
      fileSaver.saveAs(this.globalServicce.imageurl + doc5, inv_no +"_insurance." + doc5.substr(doc5.length - 5).split('.')[1]);
    }
    if (doc6) {
      let blob: any = new Blob([doc4], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;
      fileSaver.saveAs(this.globalServicce.imageurl + doc6,  inv_no +"_other1." + doc6.substr(doc6.length - 5).split('.')[1]);
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
      fileSaver.saveAs(this.globalServicce.imageurl + image, inv_no +'_productimage.' + image.substr(image.length - 5).split('.')[1]);
    }

    //  window.open(dataurl);
  }
  image: any
  selected_image(data) {
    this.image = data
    $('#imageenlarge').modal('show');
  }

  onSubmit(formm) {
    let form = formm.value;
    // this.headerdata.billofentry = form.billofentry
    // if( form.billofentry == null || form.billofentry == ""){
    //   if(this.supplierdata.billofentry == null || this.supplierdata == ""){

    //   }
    //   this.toasterService.error("Please fill all mandatory fields")
    //   return false
    // }
    this.headerdata.duty_approx = form.Duty;
    this.headerdata.pdexp = form.PDEXP;
    this.headerdata.remarks = form.Remarks;
    this.headerdata.asses_val = form.asses_val;
    this.headerdata.be_no = form.be_no;
    this.headerdata.be_date = this.DatePipe.transform(form.be_date, "yyyy-MM-dd");
    // this.headerdata.bill_no = form.bill_no;
    // this.headerdata.bill_date = this.DatePipe.transform(form.bill_date, "yyyy-MM-dd");
    this.globalServicce.updateData(this.headerdata, "sup/updateinvoice/").subscribe((data) => {
      if (data['msg'] == 'sucessfuly updated') {
        // this.upt=!this.upt;
       this.message="BE Details Updated sucessfully";
       $('#updsuccess').modal('show');
        
       
      } else {
        alert(data['msg']);
      }
      formm.reset()
      $('#editmodal').modal('hide');
      this.getinvoicedata()
    },
      error => {
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      })
  }
  datechanged(event) {
    //document.getElementsByName("started_date")[0].setAttribute('min', event.target.value);
   // document.getElementsByName("expected_arrival_date")[0].setAttribute('min', event.target.value);
  }
  inv_tno: any;
  whapproval: any;
  editTransport(data) {
    this.whapproval = data.whapproval;
    this.inv_tno = '';
    this.editdata = {};
    this.image = '';
    this.image2 = '';
    this.inv_tno = data.inv_no;
   // document.getElementsByName("started_date")[0].setAttribute('min', this.editdata.lr_date);
  //  document.getElementsByName("expected_arrival_date")[0].setAttribute('min', this.editdata.lr_date);

    this.globalServicce.getDatawithMethodParams1("sup/chaproductdetail/",data.invqhid).subscribe((data: any) => {
      this.product = data
    }),
    this.editdata = data;
    this.headerdata = { invqhid: data.invqhid, lrcopy: data.lrcopy, chaortherdoc: data.chaortherdoc }
    this.image = data.lrcopy ? this.alticonfunc(data.lrcopy) : ''
    this.image2 = data.chaortherdoc ? this.alticonfunc(data.chaortherdoc) : ''
    console.log(this.image,'this.image')
    console.log(this.image2,'this.image2')
    // this.editdata.lrcopy = ""
    // this.editdata.chaortherdoc = ""
    if(this.editdata.be_no == null || this.editdata.be_no == undefined){
      this.toasterService.error("Please fill BE Details")
      return false
    }
    $('#edittransportmodal').modal('show');
  }
  message: any;
  // onSubmit2(formm) {
  //   let form = formm.value;
  //   this.headerdata.expected_arrival_date = form.expected_arrival_date;
  //   this.headerdata.kms = form.kms;
  //   this.headerdata.lr_date = form.lr_date;
  //   this.headerdata.lr_no = form.lr_no;
  //   this.headerdata.started_date = form.started_date;
  //   this.headerdata.transport_name = form.transport_name;
  //   this.headerdata.value = form.value;
  //   this.headerdata.vechile_no = form.vechile_no;
  //   this.headerdata.weight = form.weight;
  //   // this.headerdata.lrcopy = form.lrcopy;
  //   // if (form.lrcopy) {
  //   //   this.prodtimgupload()
  //   // }
  //   // if (form.chaortherdoc) {
  //   //   this.ortherdocupload()
  //   // }
  //   this.globalServicce.updateData(this.headerdata, "sup/updateinvoicedtl2/").subscribe((resp) => {
  //     if (resp['msg'] == 'sucessfuly updated') {
  //       // this.upt=!this.upt;
  //      this.message="Transport Details Updated sucessfully";
  //      $('#updsuccess').modal('show');
        
       
  //     } else {
  //       alert(resp['msg']);
  //     }
  //     this.globalServicce.postData(this.product, "promocode/new_arivals1/").subscribe((data) => {}),
  //     this.globalServicce.getMethodData( "send_noti_dealers/").subscribe((data) => {}),
  //     $('#edittransportmodal').modal('hide');
  //     formm.reset()
  //     this.getinvoicedata()
  //   },
  //     error => {
  //       this.dialog.open(ErrorModalComponent, {
  //   data: { errorModal:true }
  // });
  //     })
  // }



  onSubmit2(formm) {
    let form = formm.value;
    //this.headerdata.expected_arrival_date = form.expected_arrival_date;
    //this.headerdata.kms = form.kms;
    this.headerdata.lr_date = form.lr_date;
    this.headerdata.lr_no = form.lr_no;
    //this.headerdata.started_date = form.started_date;
    this.headerdata.transport_name = form.transport_name;
    //this.headerdata.value = form.value;
    this.headerdata.vechile_no = form.vechile_no;
    this.headerdata.weight = form.weight;
   
    this.globalServicce.updateData(this.headerdata, "sup/updateinvoicedtl2/").subscribe((resp) => {
      if (resp['msg'] == 'sucessfuly updated') {
        // this.upt=!this.upt;
       this.message="Transport Details Updated sucessfully";
       $('#updsuccess').modal('show');
        
       
      } else {
        alert(resp['msg']);
      }
      this.globalServicce.postData(this.product, "promocode/new_arivals1/").subscribe((data) => {}),
      this.globalServicce.getMethodData( "send_noti_dealers/").subscribe((data) => {}),
      $('#edittransportmodal').modal('hide');
      formm.reset()
      this.getinvoicedata()
    },
      error => {
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      })
  }


  // onSubmit3(formm) {
  //   let form = formm.value;
  //   this.headerdata.bill_no = form.bill_no;
  //   this.headerdata.bill_date = this.DatePipe.transform(form.bill_date, "yyyy-MM-dd");
  //   this.globalServicce.updateData(this.headerdata, "sup/updateinvoice/").subscribe((data: any) => {
  //     if (data.invqhid) {
  //       $('#editmodal2').modal('hide');
  //       formm.reset()
  //       this.router.navigateByUrl('/Supplier-Cha-Print?invqhid=' + data);
  //     } else {
  //       this.dialog.open(ErrorModalComponent, {
  //   data: { errorModal:true }
  // });
  //     }
  //   },
  //     error => {
  //       this.dialog.open(ErrorModalComponent, {
  //   data: { errorModal:true }
  // });
  //     })
  // }
  image1: any
  file1: File
  productfileUpload(fileInput: any) {
    this.file1 = <File>fileInput.target.files[0];
    this.preview3();///
  }
  preview3() {
    // Show preview 
    // var mimeType = this.file1.type;
    // if (mimeType.match(/image\/*/) == null) {
    //   return;
    // }

    var reader = new FileReader();
    reader.readAsDataURL(this.file1);
    reader.onload = (_event) => {
      this.image1 = reader.result;
     this. productimageupload()
    }
  }
  productimageupload() {
    this.spinner.show()
    this.methodname = "FileUploadView/";

    this.imagedata = { "image": this.image1, "userid": this.loginUserData.user_id, "processes": "import" }
    this.globalServicce.postData(this.imagedata, this.methodname).subscribe((data) => {
      this.response = data;
      this.headerdata.billofentry = this.response.image
      this.spinner.hide()
    })
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
  printdatadetail(data, type) {
    if (type == 'invoice') {
      if (this.type == "Pending") {
        this.router.navigateByUrl('/Supplier-Inv-Print?invqhid=' + data + '&C=PSL');
      }else {
        this.router.navigateByUrl('/Supplier-Inv-Print?invqhid=' + data + '&C=CSL');
      }
    }
  }
  dutyvalue(asses_val,Duty){
    if(Duty > asses_val){
      this.toasterService.error("Duty value should not be greater than Assesment value");
      this.editdata.Duty = this.editdata.asses_val
      // this.editdata.Duty = false;
    }

  }
  downloadBL(doc1, inv_no) {
    if (doc1) {
      let blob: any = new Blob([doc1], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;
      
      // var count = (doc1.match(/media/g) || []).length;
      // if (count > 1) {
      //   doc1 = doc1.replace(/\/media/, '')
      // }
      fileSaver.saveAs(this.globalServicce.imageurl + doc1, inv_no+"_BillOfLading." + doc1.substr(doc1.length - 5).split('.')[1]);
    }
  }

  downloadINV(doc2, inv_no) {
    if (doc2) {
      let blob: any = new Blob([doc2], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;

      // var count = (doc2.match(/media/g) || []).length;
      // if (count > 1) {
      //   doc2 = doc2.replace(/\/media/, '')
      // }
      fileSaver.saveAs(this.globalServicce.imageurl + doc2, inv_no +"_Invoice." + doc2.substr(doc2.length - 5).split('.')[1]);
    }
  }

  downloadPL(doc3, inv_no) {
    if (doc3) {
      let blob: any = new Blob([doc3], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;

      // var count = (doc3.match(/media/g) || []).length;
      // if (count > 1) {
      //   doc3 = doc3.replace(/\/media/, '')
      // }
      fileSaver.saveAs(this.globalServicce.imageurl + doc3, inv_no +"_PackingList." + doc3.substr(doc3.length - 5).split('.')[1]);
    }
  }
  downloadCO(doc4, inv_no) {
    if (doc4) {
      let blob: any = new Blob([doc4], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;

      // var count = (doc4.match(/media/g) || []).length;
      // if (count > 1) {
      //   doc4 = doc4.replace(/\/media/, '')
      // }
      fileSaver.saveAs(this.globalServicce.imageurl + doc4, inv_no +"_CO." + doc4.substr(doc4.length - 5).split('.')[1]);
    }
  }
  downloadInsurance(doc5, inv_no) {
    if (doc5) {
      let blob: any = new Blob([doc5], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;
      fileSaver.saveAs(this.globalServicce.imageurl + doc5, inv_no +"_Insurance." + doc5.substr(doc5.length - 5).split('.')[1]);
    }
  }
  downloadOther1(doc6, inv_no) {
    if (doc6) {
      let blob: any = new Blob([doc6], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;
      fileSaver.saveAs(this.globalServicce.imageurl + doc6, inv_no +"_other1." + doc6.substr(doc6.length - 5).split('.')[1]);
    }
  }
  downloadOther2(doc7, inv_no) {
    if (doc7) {
      let blob: any = new Blob([doc7], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;
      fileSaver.saveAs(this.globalServicce.imageurl + doc7, inv_no +"_other2." + doc7.substr(doc7.length - 5).split('.')[1]);
    }
  }
  downloadProdctImg(image, inv_no) {
    if (image) {
      let blob: any = new Blob([image], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;

      // var count = (image.match(/media/g) || []).length;
      // if (count > 2) {
      //   image = image.replace(/\/media/, "")
      // }
      fileSaver.saveAs(this.globalServicce.imageurl + image, inv_no +'_Productimage.' + image.substr(image.length - 5).split('.')[1]);
    }
  }
  downloadLRCopy(LRCopy, inv_no) {
    if (LRCopy) {
      let blob: any = new Blob([LRCopy], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      fileSaver.saveAs(this.globalServicce.imageurl + LRCopy, inv_no +'_LR_image.' + LRCopy.substr(LRCopy.length - 5).split('.')[1]);
    }
  }
  downloadChaOrtherdoc(ChaOthr, inv_no) {
    if (ChaOthr) {
      let blob: any = new Blob([ChaOthr], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      fileSaver.saveAs(this.globalServicce.imageurl + ChaOthr, inv_no +'_Cha_Other_image.' + ChaOthr.substr(ChaOthr.length - 5).split('.')[1]);
    }
  }
  //Corection
  file4: File
  invmod :any;
  invmodfileUpload(fileInput: any) {
    this.file4 = <File>fileInput.target.files[0];
    this.preview5();
  }
  preview5() {
    // Show preview 
    // var mimeType = this.file4.type;
    // if (mimeType.match(/image\/*/) == null) {
    //   return;
    // }

    var reader = new FileReader();
    reader.readAsDataURL(this.file4);
    reader.onload = (_event) => {
      this.invmod = reader.result;
      this.invmodUpload()
    }
  }
  invmodUpload() {
    this.spinner.show()
    this.methodname = "FileUploadView/";

    this.imagedata4 = { "image": this.invmod, "userid": this.loginUserData.user_id, "processes": "import" }
    this.globalServicce.postData(this.imagedata4, this.methodname).subscribe((data) => {
      this.response = data;
      this.headerdata1.invmodpath = this.response.image
      this.spinner.hide()
    })
  }

  file5: File
  packingmod :any;
  packingmodupload(fileInput: any) {
    this.file5 = <File>fileInput.target.files[0];
    this.preview6();
  }
  preview6() {
    // Show preview 
    // var mimeType = this.file5.type;
    // if (mimeType.match(/image\/*/) == null) {
    //   return;
    // }

    var reader = new FileReader();
    reader.readAsDataURL(this.file5);
    reader.onload = (_event) => {
      this.packingmod = reader.result;
      this.packingupload()
    }
  }
  packingupload() {
    this.spinner.show() 
    this.methodname = "FileUploadView/";

    this.imagedata5 = { "image": this.packingmod, "userid": this.loginUserData.user_id, "processes": "import" }
    this.globalServicce.postData(this.imagedata5, this.methodname).subscribe((data) => {
      this.response = data;
      this.headerdata1.packmodpath = this.response.image
      this.spinner.hide()
    })
  }

  crt_inv_no :any;
  crt_invdate :any;
  correctdata :any;
  correction(data){
    this.correctdata = data;
    this.crt_inv_no = data.inv_no
    this.crt_invdate = data.invdate
    // this.invmod = data.invmodpath ? this.alticonfunc(data.invmodpath) : ''
    // this.packingmod = data.packmodpath ? this.alticonfunc(data.packmodpath) : ''
    $('#correction').modal('show');
  }
  onSubmit4(formm) {
    if(!this.headerdata1.packmodpath && !this.headerdata1.invmodpath){
      this.toasterService.error("Upload Documents...");
      return false;
     }
    let form = formm.value;
    this.headerdata1.invqhid = this.correctdata.invqhid;
    this.headerdata1.comment = form.comments;
    this.headerdata1.isactive = 1;
    this.headerdata1.status1 = 0;
    this.headerdata1.data = this.DatePipe.transform(new Date(), "yyyy-MM-dd");
    this.headerdata1.createdby = this.loginUserData.user_id;
    if(!this.headerdata1.packmodpath){
      this.headerdata1.packmodpath = ''
     }
     if(!this.headerdata1.invmodpath){
      this.headerdata1.invmodpath = ''
     }
      this.spinner.show();
      this.globalServicce.postData(this.headerdata1, "sup/chamodication/").subscribe((resp) => {
      // $('#edittransportmodal').modal('hide');
      formm.reset()
      // this.getinvoicedata()
      this.spinner.hide();
      this.toasterService.success("Successfully Updated");
      $('#correction').modal('hide');
    },
      error => {
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      })
    }

// ----------------------------------------------------------------------------------------------------------------------------------
    // Cha Invoice
    cha_inv: any;
    cha_invqhid: any;
    invoiceData: any = [];
    chaPrint(data) {
      if(data.whapproval == '1'){
        this.toasterService.error("Stock Already Recieved");
        return false;
       }
      this.getparticulars();
      this.cha_inv = data.inv_no
      this.cha_invqhid = data.invqhid
      this.newAttribute1 = {};
      this.fieldArray= [];
      this.clearcha();
      this.headerdata = { invqhid: data.invqhid }
      this.globalServicce.getDatawithQueryPar('sup/chagetdetails/', this.cha_invqhid).subscribe((respdata: any) => {
        this.invoiceData = respdata;
        this.fieldArray = respdata[0].chadtl;
        if(this.fieldArray.length > 0){
          this.ToTnonreceipted = this.fieldArray.map(a => parseFloat(a.nonreceipted?a.nonreceipted:'0')).reduce(function (a, b) {
            return a + b;
          });
          this.ToTreceipted = this.fieldArray.map(a => parseFloat(a.receipted?a.receipted:'0')).reduce(function (a, b) {
            return a + b;
          });
        }else{
          this.ToTnonreceipted = '';
          this.ToTreceipted = '';
        }

        this.bill_no = this.invoiceData[0].bill_no;
        this.bill_date = this.invoiceData[0].bill_date;
        this.job_no = this.invoiceData[0].chadtl[0].job_no;
        this.job_date = this.DatePipe.transform(this.invoiceData[0].chadtl[0].job_date, "yyyy-MM-dd")
      })
      $(function() {
        $(document).ready(function () { 
            var todaysDate = new Date();
            var year = todaysDate.getFullYear();
            var month = ("0" + (todaysDate.getMonth() + 1)).slice(-2);
            var day = ("0" + todaysDate.getDate()).slice(-2);
            var maxDate = (year +"-"+ month +"-"+ day);
            $('#job_date').attr('max',maxDate);
        });
    });
        $('#ChaInvoiceModal').modal('show');
      // if (data.bill_no) {
      //   this.router.navigateByUrl('/Supplier-Cha-Print?invqhid=' + data.invqhid);
      // } else {
      //   $('#editmodal2').modal('show');
      // }
  
    }
// ---------------------------------------------------------------

    particulars1: any = [];
    getparticulars() {
      this.globalServicce.getDataOnlyWithMethod("sup/getchaparticulars").subscribe((data) => {
        this.particulars1 = data;
      });
  
    }
    // private fieldArray: Array<any> = [];
    fieldArray: any = []
  // private newAttribute1: any = {};
    newAttribute1: any = {};
    selectedList: any = [];
    added_items: any;
  
    cartbody: any = {};
    count: any = 0;
    ToTnonreceipted: any;
    ToTreceipted: any;
    addFieldValue(newAttribute1) {
        
        // this.toasterService.warning ("Please Fill All The Required Fields")
        // this.fieldArray.push(this.newAttribute1);
        this.fieldArray.push({
          invqhid: this.cha_invqhid,
          particulars: newAttribute1.particulars,
          receiptdetails: newAttribute1.receiptdetails,
          nonreceipted: newAttribute1.nonreceipted?JSON.parse(newAttribute1.nonreceipted):null,
          receipted: newAttribute1.receipted?JSON.parse(newAttribute1.receipted):null
        })
        this.newAttribute1 = {};
        // this.added_items = this.fieldArray.length;
        console.log(this.fieldArray,'this.fieldArray')
        if(this.fieldArray.length > 0){
            this.ToTnonreceipted = this.fieldArray.map(a => parseFloat(a.nonreceipted?a.nonreceipted:'0')).reduce(function (a, b) {
              return a + b;
            });
            this.ToTreceipted = this.fieldArray.map(a => parseFloat(a.receipted?a.receipted:'0')).reduce(function (a, b) {
              return a + b;
            });
        }else{
          this.ToTnonreceipted = '';
          this.ToTreceipted = '';
        }
    }
    clearcha() {
      this.newAttribute1.particulars = '';
     this.newAttribute1.receiptdetails = '';
     this.newAttribute1.nonreceipted = '';
     this.newAttribute1.ReceiptAmt = '';
    }
  add_disable(attr) {
    // let arr = ["particulars", "nonreceipted", "receipted"];
    let arr = ["particulars"];
    for (let i of arr) {
      if (attr[i] == null || attr[i] == undefined) {
  
        return true;
      }
    }
  
    return false;
  }
  deleteFieldValue2(index) {
     this.fieldArray.splice(index, 1);
     if(this.fieldArray.length > 0){
      this.ToTnonreceipted = this.fieldArray.map(a => parseFloat(a.nonreceipted?a.nonreceipted:'0')).reduce(function (a, b) {
        return a + b;
      });
      this.ToTreceipted = this.fieldArray.map(a => parseFloat(a.receipted?a.receipted:'0')).reduce(function (a, b) {
        return a + b;
      });
    }else{
      this.ToTnonreceipted = '';
      this.ToTreceipted = '';
    }
   }
   fieldList: any = [];
   bill_no: any;
   bill_date: any;
   job_no: any;
   job_date: any;
   description: any;
   body: any;
   chainvamount: any;
    submitInv(){
    // localStorage.setItem("ChaInvdata", JSON.stringify(this.fieldArray))
      this.spinner.show();
      for (var i = 0; i < this.fieldArray.length; i++) {
      if(this.fieldArray[i].particulars){
        this.fieldList.push({
          invqhid: this.cha_invqhid,
          particulars: this.fieldArray[i].particulars,
          receiptdetails: this.fieldArray[i].receiptdetails,
          nonreceipted: this.fieldArray[i].nonreceipted,
          receipted: this.fieldArray[i].receipted,
          bill_no: this.bill_no,
          bill_date: this.bill_date,
          job_no: this.job_no,
          job_date: this.job_date,
          // description: this.description,
        })
      }

    }
    this.ToTnonreceipted = this.fieldList.map(a => parseFloat(a.nonreceipted?a.nonreceipted:'0')).reduce(function (a, b) {
      return a + b;
    });
    this.ToTreceipted = this.fieldList.map(a => parseFloat(a.receipted?a.receipted:'0')).reduce(function (a, b) {
      return a + b;
    });
    this.chainvamount = this.ToTnonreceipted + this.ToTreceipted;
    $('#ChaInvoiceModal').modal('hide');
    this.body = { "main": { 'chainvamount' : this.chainvamount }, "json_dtl": this.fieldList };
    this.globalServicce.postData(this.body, "sup/chainvoice/").subscribe((resp) => {
      this.spinner.hide();
      // this.toasterService.success("Successfully Updated");
    this.router.navigateByUrl('/Supplier-Cha-Print?invqhid=' + this.cha_invqhid +'&C=CSL');
  },
      error => {
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      })


   }
  
  

   //print Redirection
 printreport(){
  localStorage.setItem('supplierdata', JSON.stringify(this.supplierdata));
  localStorage.setItem('type', JSON.stringify(this.type));
  this.router.navigate(['/invoicedocumentchaprint'])
}
}
