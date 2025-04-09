import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServiceService } from '../../global-service.service';
import { ToasterService } from '../../toastr-service.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
import { formatDate } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-make-challan',
  standalone: false,
  
  templateUrl: './make-challan.component.html',
  styleUrl: './make-challan.component.scss'
})
export class MakeChallanComponent implements OnInit {
  p: any = 1;
  Page: any = 1
  loginUserData: any;
  challanData: any={};
  challanListData: any;
  challanDataModal: any = {};
  todayDate: any = new Date();
  challanPrint: any = {};
  stockDataList: any = [];
  a_challan: boolean = true;
  challan_no: any;
  transportdata:any
  constructor(private route: Router, private globalService: GlobalServiceService, private toaster: ToasterService, private dialog:MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    if (this.loginUserData === null) {
      this.route.navigateByUrl('home');
    }
   
    this.transportdata = JSON.parse(localStorage.getItem('Transportdata'));
  
    // console.log(this.challanData);
    
    if(!this.transportdata){
      this.challanData = JSON.parse(localStorage.getItem('challanData'));
    this.challanDataModal.del_mode = 'Vehicle';
    this.challanDataModal.transportname = this.challanData.transportname
    this.challanDataModal.invno = this.challanData.refinvno
  
    this.getChallanData();
  }
  else{
    this.challanDataModal.del_mode= this.transportdata.del_mode
    this.challanDataModal.invno = this.transportdata.refinvno
    if(this.transportdata.totalcartoons){
    this.challanDataModal.cartoon = this.transportdata.totalcartoons
    }
    this.challanData.refinvno= this.transportdata.refinvno
    this.challanData.inv_date= this.transportdata.inv_date
    // this.challanData.financial_year= this.transportdata.financial_year
    // this.challanData.final_amount= this.transportdata.final_amount
    this.challanData.company_name=this.transportdata.business_name
    // this.challanData.currency_code=this.transportdata.currency_code
  
    // this.challanData.packing_l_no=this.transportdata.packing_l_no
    // this.challanData.packing_l_date=this.transportdata.packing_l_date
    // this.challanData.bill_to_party_seq_no= this.transportdata.bill_to_party_seq_no
    // this.challanData.exchange_rate = this.transportdata.exchange_rate
    // this.challanData.inv_origin_company_code = this.transportdata.inv_origin_company_code
    // this.challanData.inv_type= this.transportdata.inv_type
    // this.challanData.payment_terms= this.transportdata.payment_terms
    // this.challanData.po_date= this.transportdata.po_date
    // this.challanData.po_no = this.transportdata.po_no
    // this.challanData.ship_to_company_code = this.transportdata.ship_to_company_code
  
    // this.challanData.ship_to_party_seq_no = this.transportdata.ship_to_party_seq_no
    // this.challanData.shipment_point  = this.transportdata.shipment_point
    // this.challanData.gst_amount  = this.transportdata.gst_amount
    // this.challanData.sinv_no  = this.transportdata.sinv_no
    // this.challanData.spl_instr  = this.transportdata.spl_instr
   
    console.log(this.challanDataModal,"challanDataModal");
    this.gettransportdata(this.transportdata)
  }
  };
transportdetail:any
  gettransportdata(transportdata){
    this.spinner.show();

    this.globalService.getDatawithMethodParams1("transport_details/",transportdata.seq_no).subscribe((data) => {
      this.spinner.hide();
      this.transportdetail = data;
      this.challanDataModal.lrno=this.transportdetail[0].lrno
      this.challanDataModal.estDelDate=this.transportdetail[0].estDelDate
      this.challanDataModal.del_license_no=this.transportdetail[0].del_license_no
      this.challanDataModal.del_driver_name=this.transportdetail[0].del_driver_name
      this.challanDataModal.del_contact_no=this.transportdetail[0].del_contact_no
      this.challanDataModal.del_consin_no=this.transportdetail[0].del_consin_no
      this.challanDataModal.transportname=this.transportdetail[0].transportname
      this.challanDataModal.transport_cost=this.transportdetail[0].transport_cost
      this.challanDataModal.lrdate=this.transportdetail[0].lrdate
      
    
     
    },
     error => {
               this.spinner.hide();
               this.dialog.open(ErrorModalComponent, {
                 data: { errorModal:true }
               });
               // this.ngxSmartService.getModal('errorModal').open();
         
             });
  }
  cartoon: number = 0
  getChallanData() {

    this.spinner.show();
    this.globalService.getDatawithQueryParams5(3.9, 23, this.challanData.packing_l_no, this.challanData.packing_l_date, this.challanData.ship_to_company_code, this.challanData.financial_year).subscribe((data) => {
      this.spinner.hide();
      this.challanListData = data;
      for (let i of this.challanListData) {
        let carton = i.npc;
        this.cartoon = this.cartoon + carton;

      }
      this.challanDataModal.cartoon = Math.round((this.cartoon + Number.EPSILON) * 100) / 100

      localStorage.setItem('challanListData', JSON.stringify(data));
    },
    error => {
      this.spinner.hide();
      this.dialog.open(ErrorModalComponent, {
        data: { errorModal:true }
      });
      // this.ngxSmartService.getModal('errorModal').open();

    });
  };
  response: any = []
  errmsg: boolean = false
  body: any
  checkinv(invno) {
    this.spinner.show()
    this.body = { 'refinvno': invno }
    this.globalService.postData(this.body, "invlist/").subscribe((resp1) => {
      this.spinner.hide()
      this.response = resp1
      if (this.response.msg == "this number already exists") {
        this.errmsg = true
      }
      else {
        this.errmsg = false
      }
    })
  }
  transportdetails: any = []
  generateChallandata(challanDataModal) {
    this.transportdetails = []
    this.transportdetails.push(challanDataModal)
    $('#makeinvoiceModal2').modal('show');
  }
  challandata: any
  transportData:any={}
  generateChallan(form) {

    // this.spinner.show();
    this.a_challan = false;
    if(!this.transportdata){
    this.challanData.fin_year = this.challanData.financial_year;
    this.challanData.document_no = this.challanData.packing_l_no;
    this.challanData.document_date = this.challanData.packing_l_date;

    if (this.challanDataModal.del_mode == 'Vehicle') {
      this.challanData.del_contact_no = this.challanDataModal.del_contact_no;
      this.challanData.del_consin_no = this.challanDataModal.del_consin_no;
      this.challanData.del_driver_name = this.challanDataModal.del_driver_name;
      this.challanData.del_license_no = this.challanDataModal.del_license_no;
      this.challanData.del_mode = this.challanDataModal.del_mode;
      this.challanData.del_vehicle_no = this.challanDataModal.del_vehicle_no;
      this.challanData.invno = this.challanDataModal.invno
      this.challanData.refinvno = this.challanDataModal.invno
      this.challanData.cartoon = this.challanDataModal.cartoon
      this.challanData.lrno = this.challanDataModal.lrno
      this.challanData.lrdate = this.challanDataModal.lrdate
      this.challanData.transportname = this.challanDataModal.transportname
      this.challanData.estDelDate = this.challanDataModal.estDelDate
      this.challanData.transport_cost = this.challanDataModal.transport_cost;

    }
    else {
      this.challanData.del_contact_no = this.challanDataModal.del_contact_no;
      this.challanData.del_consin_no = this.challanDataModal.del_consin_no;
      this.challanData.del_driver_name = this.challanDataModal.del_courier_name;
      this.challanData.del_mode = this.challanDataModal.del_mode;
      this.challanData.del_license_no = this.challanDataModal.courier_wgt;
      this.challanData.invno = this.challanDataModal.invno
      this.challanData.refinvno = this.challanDataModal.invno
      this.challanData.cartoon = this.challanDataModal.cartoon
      this.challanData.lrno = this.challanDataModal.lrno
      this.challanData.lrdate = this.challanDataModal.lrdate
      this.challanData.transportname = this.challanDataModal.transportname
      this.challanData.estDelDate = this.challanDataModal.estDelDate
      this.challanData.transport_cost = this.challanDataModal.transport_cost;

    }
    this.challanData.del_challan_date = formatDate(this.todayDate, 'yyyyMMdd', 'en-US');
  
    console.log(this.challanData);
    if (this.challanData.lrno) {
      if (this.challanData.lrno && this.challanData.lrdate) {
        let body = {
          "process_in": 'CHALLAN', "operation_in": "UPDATE", "draft_final_in": "FINAL", "document_no_out": "", "message_out": "",
          "json_hdr": this.challanData, "json_dtl": ""
        }
        let methodName = "insert_update/"
        this.globalService.postData(body, methodName).subscribe((data) => {
          // this.spinner.hide();
          // console.log();
          this.challandata = data
          // this.challanPrint = this.challandata.data;
          this.challan_no = this.challandata.challan_no;
          localStorage.setItem('challanPrint', JSON.stringify(data));
          if (data['status'] == "challan generated") {

            $('#succModal').modal('show');
            // this.stockUpdate();

          }
        },
        error => {
          this.spinner.hide();
          this.dialog.open(ErrorModalComponent, {
            data: { errorModal:true }
          });
          // this.ngxSmartService.getModal('errorModal').open();
    
        });
      }
      else {
        this.a_challan = true
        this.toaster.error("PLease select LR Date")
      }

    }
    else {
      let body = {
        "process_in": 'CHALLAN', "operation_in": "UPDATE", "draft_final_in": "FINAL", "document_no_out": "", "message_out": "",
        "json_hdr": this.challanData, "json_dtl": ""
      }
      let methodName = "insert_update/"
      this.globalService.postData(body, methodName).subscribe((data) => {
        // this.spinner.hide();
        // console.log();
        this.challandata = data
        // this.challanPrint = this.challandata.data;
        this.challan_no = this.challandata.challan_no;
        localStorage.setItem('challanPrint', JSON.stringify(data));
        if (data['status'] == "challan generated") {

          $('#succModal').modal('show');
          // this.stockUpdate();

        }
      },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal:true }
        });
        // this.ngxSmartService.getModal('errorModal').open();
  
      });
    }
    }
    else{
      if (this.challanDataModal.del_mode == 'Vehicle') {
      this.transportData.del_contact_no = this.challanDataModal.del_contact_no;
      this.transportData.del_consin_no = this.challanDataModal.del_consin_no;
      this.transportData.del_driver_name = this.challanDataModal.del_driver_name;
      this.transportData.del_license_no = this.challanDataModal.del_license_no;
      this.transportData.del_mode = this.challanDataModal.del_mode;
      this.transportData.del_vehicle_no = this.challanDataModal.del_vehicle_no;
      this.transportData.refinvno = this.challanDataModal.invno
      this.transportData.cartoon = this.challanDataModal.cartoon
      this.transportData.lrno = this.challanDataModal.lrno
      this.transportData.lrdate = this.challanDataModal.lrdate
      this.transportData.transportname = this.challanDataModal.transportname
      this.transportData.estDelDate = this.challanDataModal.estDelDate
      this.transportData.transport_cost = this.challanDataModal.transport_cost;
      }
      else {
        this.transportData.del_contact_no = this.challanDataModal.del_contact_no;
        this.transportData.del_consin_no = this.challanDataModal.del_consin_no;
        this.transportData.del_driver_name = this.challanDataModal.del_courier_name;
        this.transportData.del_mode = this.challanDataModal.del_mode;
        this.transportData.del_license_no = this.challanDataModal.courier_wgt;
        this.transportData.refinvno = this.challanDataModal.invno
        this.transportData.cartoon = this.challanDataModal.cartoon
        this.transportData.lrno = this.challanDataModal.lrno
        this.transportData.lrdate = this.challanDataModal.lrdate
        this.transportData.transportname = this.challanDataModal.transportname
        this.transportData.estDelDate = this.challanDataModal.estDelDate
        this.transportData.transport_cost = this.challanDataModal.transport_cost;
  
      }
      this.transportData.del_challan_no=this.transportdata.del_challan_no
      this.transportData.seq_no = this.transportdata.seq_no
      if (this.transportData.lrno) {
        if (this.transportData.lrno && this.transportData.lrdate) {
          let body=this.transportData
      let methodName = "update_transport_details/"
      this.globalService.postData(body, methodName).subscribe((data) => {
        // this.spinner.hide();
        // console.log();
        this.challandata = data
        // this.challanPrint = this.challandata.data;
        this.challan_no = this.challandata.del_challan_no;
        localStorage.setItem('challanPrint', JSON.stringify(data));
        if (data['status'] == "updated") {

          $('#updateModal').modal('show');
          // this.stockUpdate();

        }
      },
      error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal:true }
        });
        // this.ngxSmartService.getModal('errorModal').open();
  
      });
      }
      else {
        this.a_challan = true
        this.toaster.error("PLease select LR Date")
      }
    }
   else{
    let body=this.transportData
    let methodName = "update_transport_details/"
    this.globalService.postData(body, methodName).subscribe((data) => {
      // this.spinner.hide();
      // console.log();
      this.challandata = data
      // this.challanPrint = this.challandata.data;
      this.challan_no = this.challandata.del_challan_no;
      localStorage.setItem('challanPrint', JSON.stringify(data));
      if (data['status'] == "updated") {

        $('#updateModal').modal('show');
        // this.stockUpdate();

      }
    },
    error => {
      this.spinner.hide();
      this.dialog.open(ErrorModalComponent, {
        data: { errorModal:true }
      });
      // this.ngxSmartService.getModal('errorModal').open();

    });
   }

    }


  };

  gotoChallanPrint() {
    this.route.navigateByUrl('Warehouse Manager-TRANSPORT DETAILS');
  }
  gotoPrevious() {
    this.route.navigateByUrl('challan-list');
  };

  stockUpdate() {

    this.challanListData.forEach(data => {
      let stockData = {
        "productid": data.productid,
        "qty_in": data.inv_qty,
        "tot_amt_in": data.tot_value
      }
      this.stockDataList.push(stockData);
    });
    let body = {
      "period_in": formatDate(this.todayDate, 'yyyyMM', 'en-US'),
      "company_code_in": this.challanData.inv_origin_company_code,
      "product_details": this.stockDataList,
      "storage_location_in": "WAREHOUSE1",
      "process_type_in": "INV"
    };
    console.log(body);
    let methodName = "proc_stock/"
    this.globalService.postData(body, methodName).subscribe((data) => {
      console.log(data);
    },
    error => {
      this.spinner.hide();
      this.dialog.open(ErrorModalComponent, {
        data: { errorModal:true }
      });
      // this.ngxSmartService.getModal('errorModal').open();

    });

  };

}
