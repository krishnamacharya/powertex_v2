import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../../global-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from '../../toastr-service.service';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;

@Component({
  selector: 'app-dealer-productdata-upload',
  standalone: false,
  templateUrl: './dealer-productdata-upload.component.html',
  styleUrls: ['./dealer-productdata-upload.component.scss']
})
export class DealerProductdataUploadComponent implements OnInit {
  loginUserData: any
  POhidden: boolean = true;
  SOhidden: boolean = false;
page:any=1
  product: any = {}

  constructor(private globalService: GlobalServiceService, private dialog: MatDialog, private toasterService: ToasterService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));

  }
  po() {
    this.POhidden = true;
    this.SOhidden = false;
  }
  so() {
    this.POhidden = false;
    this.SOhidden = true;
    this.getdata()
  }
  image: any
  file: File
  productfileUpload(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0]
      var reader = new FileReader();
      reader.onload = (event: any) => {
        //me.modelvalue = reader.result;
        this.image = event.target.result
        console.log(event.target.result);
      };
      reader.readAsDataURL(this.file);
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  };
  methodname: any
  body: any
  response: any
  uploadData() {
    if (this.product.type && (this.product.file || this.product.order)) {
      this.methodname = "ImageUploadView/";
      if(this.image){
        
      this.body = { "processes": this.product.type, "userid": this.loginUserData.user_id, "image": this.image ,"descripts":this.product.order};
      }
      else{
        this.body = { "processes": this.product.type, "userid": this.loginUserData.user_id, "image": null,"descripts":this.product.order};
      }
      this.globalService.postData(this.body, this.methodname).subscribe((data) => {
        console.log(data);
        this.product = {}
        this.image = ''
     
        if (data['status1']=="Success") {

          $('#succModal').modal('show');
        }
      },
        error => {

          this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
          // console.log(error);
        });
    }
    else {
      this.toasterService.error("Please fill all mandatory fields")
    }
  }
  url:any
  getdata() {
    this.methodname = "ImageUploadView/";
    this.globalService.getDatawithMethodParams3(this.methodname,this.loginUserData.user_id,"","").subscribe((data) => {
      this.response = data
      this.url = this.globalService.imageurl
      if(this.response.length>0){
        this.response.forEach(x =>  {
          if(x.image!=null){
          x.image =  this.url+x.image
          }
       })
       console.log(this.response,"response") 
      }
    },
    error => {

      this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      // console.log(error);
    })
  
  }
  types = [
    { name: 'PO' },
    // { name: 'Service' },
    // { name: 'Pending' }


  ];
  onPageChange(Page: number) {
   
    this.page = Page;
    window.scrollTo(0, 0);
 }
  keypress(event: any) {
    const pattern = /^[A-Za-z0-9' '_@./#&+-=,*!$%(){}]+$/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
}
