import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../../global-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from '../../toastr-service.service';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-productlist-display',
  standalone: false,
  templateUrl: './productlist-display.component.html',
  styleUrls: ['./productlist-display.component.scss']
})
export class ProductlistDisplayComponent implements OnInit {
 
  loginUserData: any
  searchText: any
  product: any = {}
  dealers: any
  page:any=1
  constructor(private service: GlobalServiceService, private spinner: NgxSpinnerService, private toasterService: ToasterService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getdealerslist()
   this.getdataonload()
  }

getdataonload(){
 
  this.methodname = "ImageUploadView/";
  if(this.product.dealer && this.product.type) {
    this.service.getDatawithMethodParams3(this.methodname,this.product.dealer,this.product.type,"true").subscribe((data) => {
      this.response = data
      this.url = this.service.imageurl
      if(this.response.length>0){
        this.response.forEach(x =>  {
           if(x.image!=null){
          x.img =  x.image
          x.image =  this.url+x.image
          }
       })
       console.log(this.response,"response")
      
      }
    })
  }
else{
 
  this.service.getDatawithMethodParams3(this.methodname,this.loginUserData.user_id,"PO","true").subscribe((data) => {
    this.response = data
    this.url = this.service.imageurl
    if(this.response.length>0){
      this.response.forEach(x =>  {
         if(x.image!=null){
          x.img =  x.image
          x.image =  this.url+x.image
        }
     })
     console.log(this.response,"response")
    
    }
  })
}
}
  getdealerslist() {
    return this.service.getDatawithMethodParams1('market/drop', this.loginUserData.user_id).subscribe((resp) => {
      this.dealers = resp;
    })
  }
  response: any=[]
  
  methodname: any
  url: any
 
  getdata() {
   
    if(this.product.dealer && this.product.type) {

 
    this.methodname = "ImageUploadView/";
    this.service.getDatawithMethodParams3(this.methodname,this.product.dealer,this.product.type,"true").subscribe((data) => {
      this.response = data
      this.url = this.service.imageurl
      if(this.response.length>0){
        this.response.forEach(x =>  {
           if(x.image!=null){
          x.img =  x.image
          x.image =  this.url+x.image
          }
       })
       console.log(this.response,"response")
      
      }
    })
  }
  else{
    this.toasterService.error("Please fill all mandatory fields")
  }
  }
  image: any
  selected_image(data) {
    this.image = data
    $('#imageenlarge').modal('show');
  }
  types = [
    { name: 'PO' },
    // { name: 'Service' },
    // { name: 'Pending' }


  ];
  status = [
    { status: 'Completed' },
    {status: 'Cancelled'}
  ]
  submitstatus(data){

    if(data.status && data.comment){
    let body = { "processes": data.processes, "userid": data.userid,"imagepk":data.imagepk,"status":data.status,"comment": data.comment};

      this.service.updateData(body, this.methodname).subscribe((data) => {
        console.log(data);
        if (data['status']=="success") {
          $('#succModal').modal('show');
        }
        // this.getdata()
        this.getdataonload()
      },
        error => {

          this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
          // console.log(error);
        });
      }
      else{
        this.toasterService.error("Please fill all mandatory fields")
      }
  }
  onPageChange(Page: number) {
   
    this.page = Page;
    window.scrollTo(0, 0);
 }
 downloadCopy(Imgcopy, bus_name) {
// console.log(Imgcopy,'image')
    if (Imgcopy) {
      // let blob: any = new Blob([Imgcopy], { type: 'image/jpeg' });
      // const url = window.URL.createObjectURL(blob);
      window.open(this.service.imageurl + Imgcopy);

      // fileSaver.saveAs(this.service.imageurl + Imgcopy, bus_name +"_PO_Copy." + Imgcopy.substr(Imgcopy.length - 5).split('.')[1]);
    }
  }
}
