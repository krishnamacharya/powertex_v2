import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { GlobalServiceService } from '../../global-service.service';
import { DataServiceService } from '../../data-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from '../../toastr-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-product-excel-upload',
  standalone: false,
  templateUrl: './product-excel-upload.component.html',
  styleUrls: ['./product-excel-upload.component.scss']
})
export class ProductExcelUploadComponent implements OnInit {
  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  EXCEL_EXTENSION = '.xlsx';
  methodname: string;
  json: any;
  jsondata: any;
  json_data: any = {};
  XL_row_object: any = {};
  flag: number;
  uploadfile: any;
  url: string;
  uploadAttrfile: any;
  attrurl: string;
  prod_data: any;
  uploadStockfile: any;
  stockurl: string;

  constructor(public globalService: GlobalServiceService, private toasterService: ToasterService, public dataservice: DataServiceService, private dialog: MatDialog, private spinner: NgxSpinnerService) { }
  ngOnInit() {

  }

  //excelUpload
  productexcelUpload(evt: any): void {
    this.uploadfile = evt.target.files[0].name;
    this.onFileChange(evt.target, 'prod');
  };

  attrexcelUpload(evt: any): void {
    // alert("hii");
    this.uploadAttrfile = evt.target.files[0].name;
    this.onFileChange(evt.target, 'attr');
  };

  stockexcelUpload(evt: any): void {

    this.uploadStockfile = evt.target.files[0].name;
    console.log("stock", this.uploadStockfile);
    this.onFileChange(evt.target, 'stock');


  };
  onFileChange(evt: any, data) {
    ;
    /* wire up file reader */
    const file: File = evt.files[0];

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      if (data == "prod") {
        this.url = "https://img.icons8.com/color/50/000000/ms-excel.png";
      } else if (data == "attr") {
        this.attrurl = "https://img.icons8.com/color/50/000000/ms-excel.png";
      } else {
        this.stockurl = "https://img.icons8.com/color/50/000000/ms-excel.png";
      }

      /* read workbook */
      const result: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(result, { type: 'binary', cellDates: true, cellText: false, dateNF: 'yyyy/mm/dd' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.jsondata = (XLSX.utils.sheet_to_json(ws));
      this.json_data = JSON.stringify(this.jsondata);
      console.log("json", this.json_data);

    };
    reader.readAsBinaryString(evt.files[0]);
  }


  //Products Upload
  uploadData() {

    if (this.jsondata) {
      this.spinner.show();
      console.log(this.json_data);
      this.methodname = "product_master_data/";
      this.flag = 1;

      let body = { "flag": 1, "data": this.jsondata };
      //  var body = Object.assign({}, this.json_data,this.flag);
      this.globalService.postData(body, this.methodname).subscribe((data) => {
        this.spinner.hide();
        console.log(data);
        if (data['status'] == "Success") {
          //alert('success');
          $('#succModal').modal('show');
        }
      },
        error => {

          this.spinner.hide();
          //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
          // console.log(error);
        });
    }
    else {
      this.toasterService.error("Please Select File")
    }
  }

  // Attributes Upload
  uploadAttributesData() {
    if (this.jsondata) {
      this.spinner.show();
      console.log(this.json_data);
      this.methodname = "product_master_data/";
      // this.flag= 2;

      let body = { "flag": 2, "data": this.jsondata };
      //  var body = Object.assign({}, this.json_data,this.flag);
      this.globalService.postData(body, this.methodname).subscribe((data) => {
        this.spinner.hide();
        console.log(data);
        //alert('success');
        $('#succModal').modal('show');
      },
        error => {
          this.spinner.hide();
          this.spinner.hide();
          //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
          // console.log(error);
        });
    }
    else {
      this.toasterService.error("Please Select File")
    }
  }

  //stock upload
  uploadStockData() {
    if (this.jsondata) {
      this.spinner.show();
      console.log(this.json_data);
      this.methodname = "OpeningBalance/";
      // this.flag= 2;

      let body = this.jsondata;
      //  var body = Object.assign({}, this.json_data,this.flag);
      this.globalService.postData(body, this.methodname).subscribe((data) => {
        this.spinner.hide();
        console.log(data);
        //alert('success');
        $('#succModal').modal('show');
      },
        error => {
          this.spinner.hide();
          this.spinner.hide();
          //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
          // console.log(error);
        });
    }
    else {
      this.toasterService.error("Please Select File")
    }
  }

  /*for download excel */
  excelproddownload() {
    this.spinner.show();
    this.globalService.getDatawithInput_id('4.3').subscribe((data) => {
      this.spinner.hide();
      console.log(data);
      this.prod_data = data;
      this.downloadJsontoExcel();
    },
      error => {
        this.spinner.hide();
        //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        // console.log(error);
      });
  }

  //download JsontoExcel

  downloadJsontoExcel() {
    var excelFileName = "Sample";
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.prod_data);
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

}
