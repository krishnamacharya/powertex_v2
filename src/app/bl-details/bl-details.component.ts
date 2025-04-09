import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../global-service.service';
import { ToasterService } from '../toastr-service.service';
import { DatePipe } from '@angular/common';
import * as fileSaver from 'file-saver';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-bl-details',
  standalone: false,
  templateUrl: './bl-details.component.html',
  styleUrls: ['./bl-details.component.scss']
})
export class BlDetailsComponent implements OnInit {

  p: any = 1
  searchText: any;
  loginUserData: any;
  editdata: any = {};
  Contdata: any = []
  newAttribute1: any = {}
 // supplierdata: any = [];
  constructor(private activatedRoute: ActivatedRoute, private DatePipe: DatePipe, private globalServicce: GlobalServiceService, private router: Router, private toasterService: ToasterService, private dialog: MatDialog, private spinner: NgxSpinnerService) {
   }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getinvoicedata();
    // this.newAttribute1 ={}
  }

  url: any
  supplierdata1: any
  supplierdata: any
  getinvoicedata() {
    this.spinner.show();
    this.globalServicce.getDatawithMethodParams2("sup/documenton/", this.loginUserData.shipment_point,'').subscribe((data: any) => {
    //  console.log(data, "my data")
      if (data) {
        // this.supplierdata = data.filter((e) => { return e.Status == 0}) 
        this.supplierdata1 = data.filter((e) => { return e.Status == 0}) 
        this.supplierdata = this.supplierdata1.filter((e) => { return e.doc1 != null || e.doc2 != null || e.doc3 != null })
      //  console.log(this.supplierdata, "Pending");
      this.spinner.hide();
      }
    },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal:true }
        });
        // console.log(error);
      });
  };
  cont_invqhid: any;
  Bl_Data: any = [];
  sup_name: any;
  inv_num: any;
  inv_dt: any;

  BLDetails(data){
    $(function() {
          $('#bldate').attr('min',data.invdate);
          $('#onportdate').attr('min',data.invdate);
          $('#exptdate').attr('min',data.invdate);
  });
  this.Bl_Data = [];
  this.Contdata = [];
  this.sup_name = data.business_name;
    this.inv_num = data.inv_no;
    this.inv_dt = data.invdate;
      this.cont_invqhid = data.invqhid;
    this.globalServicce.getDatawithMethodParams1("sup/getbedetailsa/",data.invqhid).subscribe((data: any) => {
        this.Bl_Data = data;
       for (let supp of this.Bl_Data.co) {
        this.Contdata.push({
          invqhid: supp.cont_invqhid,
          containerno: supp.containerno,
          containersize: supp.containersize,
        })
      }
        
        this.editdata.blno = this.Bl_Data.bl[0].bl_no;
        this.editdata.bldate = this.Bl_Data.bl[0].bldate;
        this.editdata.sono = this.Bl_Data.bl[0].sono;
        this.editdata.vesselname = this.Bl_Data.bl[0].vesselname;
        this.editdata.vesselno = this.Bl_Data.bl[0].vesselno;
        this.editdata.onportdate = this.Bl_Data.bl[0].onportdate;
        this.editdata.linename = this.Bl_Data.bl[0].linename;
        this.editdata.duty_approx = this.Bl_Data.bl[0].duty_approx;
        this.editdata.noofcontainer = this.Bl_Data.bl[0].noofcontainer;
        this.editdata.exptdate = this.Bl_Data.bl[0].exptdate;
        this.editdata.remarks = this.Bl_Data.bl[0].blremarks;
        this.editdata.duty_approx = this.Bl_Data.bl[0].duty_approx;
      this.newAttribute1 = {};
    });
    $('#BlDetailsModal').modal('show');

  }
  addd(newAttribute1) {
        
    this.Contdata.push({
      invqhid: this.cont_invqhid,
      containerno: newAttribute1.containerno,
      containersize: newAttribute1.containersize,
    })
      this.newAttribute1 = {};
     console.log(this.Contdata,'this.Contdata')
 } 
 headerdata: any = {};
  body: any;
 onSubmit(formm) {
  if (!this.editdata.blno) {
    this.toasterService.error("Enter BL Number");
    return false
  }
  if (!this.editdata.bldate) {
    this.toasterService.error("Enter BL Date");
    return false
  }
  if (!this.editdata.noofcontainer) {
    this.toasterService.error("Enter No of Containers");
    return false
  }
  if (this.Contdata.length == 0) {
    this.toasterService.error("Enter Container Details");
    return false
  }
  if (!this.editdata.linename) {
    this.toasterService.error("Enter Line Name");
    return false
  }
  console.log(this.Contdata,'Contdata',this.Contdata.length,'length');
  let form = formm.value;
  this.headerdata.invqhid = this.cont_invqhid;
  this.headerdata.blno = form.blno;
  this.headerdata.bldate = form.bldate;
  this.headerdata.sono = form.sono;
  this.headerdata.vesselname = form.vesselname;
  this.headerdata.vesselno = form.vesselno;
  this.headerdata.onportdate = form.onportdate;
  this.headerdata.linename = form.linename;
  this.headerdata.duty_approx = form.duty_approx;
  this.headerdata.noofcontainer = form.noofcontainer;
  this.headerdata.exptdate = form.exptdate;
  this.headerdata.remarks = form.remarks;
    this.spinner.show();
    this.body = { "json_hdr": this.headerdata, "json_dtl": this.Contdata };
    this.globalServicce.postData(this.body, "sup/bedetails/").subscribe((resp) => {
    formm.reset()
    this.spinner.hide();
    // this.toasterService.success("Successfully Updated");
    $('#BlDetailsModal').modal('hide');
    $('#successModal').modal('show');
  },
    error => {
      this.dialog.open(ErrorModalComponent, {
        data: { errorModal:true }
      });
    })
  }
  gotolist(){
    this.router.navigateByUrl('/Cha-BL-Details');
  }
  downloadINV(doc2, inv_no) {
    if (doc2) {
      let blob: any = new Blob([doc2], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      fileSaver.saveAs(this.globalServicce.imageurl + doc2, inv_no +"_Invoice." + doc2.substr(doc2.length - 5).split('.')[1]);
    }
  }
  downloadBL(doc1, inv_no) {
    if (doc1) {
      let blob: any = new Blob([doc1], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      fileSaver.saveAs(this.globalServicce.imageurl + doc1, inv_no+"_BillOfLading." + doc1.substr(doc1.length - 5).split('.')[1]);
    }
  }
  downloadPL(doc3, inv_no) {
    if (doc3) {
      let blob: any = new Blob([doc3], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      fileSaver.saveAs(this.globalServicce.imageurl + doc3, inv_no +"_PackingList." + doc3.substr(doc3.length - 5).split('.')[1]);
    }
  }
  deleteFieldValue(index) {
    this.Contdata.splice(index, 1);
  }
  printreport(){
   // alert("call");
    localStorage.setItem('supplierdata', JSON.stringify(this.supplierdata));
    //console.log(this.supplierdata)
    this.router.navigate(['/bl-details-print'])
  }
}
