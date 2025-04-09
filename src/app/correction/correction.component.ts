import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../global-service.service';
import * as fileSaver from 'file-saver';
import { ToasterService } from '../toastr-service.service';
import { DatePipe } from '@angular/common';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-correction',
  standalone: false,
  templateUrl: './correction.component.html',
  styleUrls: ['./correction.component.scss']
})
export class CorrectionComponent implements OnInit {
  loginUserData: any;
  supplierdata: any = [];
  p: any = 1
  searchText: any
  headerdata1: any = {};
  editdata: any = {};
  loginUserid: any;
  methodname: string;
  imgheight: string;
  response: any;
  imagedata4: { image: any; userid: any; processes: string; };
  imagedata5: { image: any; userid: any; processes: string; };
  constructor(private DatePipe: DatePipe,private globalServicce: GlobalServiceService, private toasterService: ToasterService, private router: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }
  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    if(this.loginUserData.user_type== 'supplier'){
      this.loginUserid = this.loginUserData.user_id;
    }else{
      this.loginUserid = '';
    }
    this.getinvoicedata();
    this.editdata.invmodpath = ""
    this.editdata.packmodpath = ""
  }
  getinvoicedata() {
    this.spinner.show();
    this.globalServicce.getDatawithMethodParams2("sup/documenton/",'',this.loginUserid).subscribe((data: any) => {
      if(data){
        this.supplierdata = data.filter((e) => { return (e.invmodpath != null || e.packmodpath != null) && (e.be_no == null)});
        console.log(this.supplierdata,'data');
      }else{
        this.supplierdata.length = 0;
      }
        console.info(this.supplierdata,"dta")
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
  downloadInvMod(invmodpath, inv_no) {
    if (invmodpath) {
      let blob: any = new Blob([invmodpath], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;

      // var count = (invmodpath.match(/media/g) || []).length;
      // if (count > 1) {
      //   invmodpath = invmodpath.replace(/\/media/, '')
      // }
      fileSaver.saveAs(this.globalServicce.imageurl + invmodpath, inv_no +"_Invoice_Modified." + invmodpath.substr(invmodpath.length - 5).split('.')[1]);
    }
  }

  downloadPackMod(packmodpath, inv_no) {
    if (packmodpath) {
      let blob: any = new Blob([packmodpath], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;

      // var count = (packmodpath.match(/media/g) || []).length;
      // if (count > 1) {
      //   packmodpath = packmodpath.replace(/\/media/, '')
      // }
      fileSaver.saveAs(this.globalServicce.imageurl + packmodpath, inv_no +"_Packing_Modified." + packmodpath.substr(packmodpath.length - 5).split('.')[1]);
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
  // alticonfunc(filename) {
  //   if (filename.includes('.pdf')) {
  //     return 'https://img.icons8.com/color/50/000000/pdf.png';
  //   } else if (filename.includes('.xls')) {
  //     return 'https://img.icons8.com/color/50/000000/ms-excel.png';
  //   } else if (filename.includes('.doc')) {
  //     return 'https://img.icons8.com/color/50/000000/ms-excel.png';
  //   } else {
  //     return this.globalServicce.imageurl + filename;
  //   }
  // }
  crt_inv_no :any;
  crt_invdate :any;
  correctdata :any;
  invmodpath1 :any;
  packmodpath1 :any;
  correction(data){
    this.correctdata = data;
    this.crt_inv_no = data.inv_no
    this.crt_invdate = data.invdate
    this.invmodpath1 = data.invmodpath
    this.packmodpath1 = data.packmodpath
    // this.invmod = data.invmodpath ? this.alticonfunc(data.invmodpath) : ''
    // this.packingmod = data.packmodpath ? this.alticonfunc(data.packmodpath) : ''
    $('#correction').modal('show');
  }
  onSubmit4(formm) {
    console.log(formm,'frm')
    if(!this.headerdata1.packmodpath && !this.headerdata1.invmodpath){
      this.toasterService.error("Upload Documents...");
      return false;
     }
    this.spinner.show();
    let form = formm.value;
    this.headerdata1.invqhid = this.correctdata.invqhid;
    this.headerdata1.comment = form.comments;
    this.headerdata1.isactive = 1;
    this.headerdata1.status1 = 1;
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
      this.getinvoicedata();
    },
      error => {
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      })
    }

}


