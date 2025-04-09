import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { GlobalServiceService } from '../../global-service.service';



@Component({
  selector: 'app-notifications',
  standalone: false,
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notificatn: any={};
  messag: any={};
  fileData: any;
  previewUrl:any;
  previewUrl2:any;
  fileUploadProgress: any;
  uploadedFilePath: any;
  submitted: boolean = false;
  loginUserData: any;
  x:any;
  url:any;
  fdate: any;
  tdate: any;
  body: any;
  notificationForm: any;
  invalid:boolean;
  valid:boolean;
  fileData2: any;
  fileUploadProgress2:any;
uploadedFilePath2: any;
  constructor(private globalServicce: GlobalServiceService, private http: HttpClient,private datePipe: DatePipe) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    
  }
 
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }


 preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
      //console.log(this.previewUrl);
    }
  }
  //Submit
  onSubmit(form: NgForm) {
    this.submitted = true;
    console.log(this.notificatn)
        // stop here if form is invalid
        if (this.notificatn.invalid) {
            return;
        }

    
    this.notificatn.fdate= this.datePipe.transform(this.notificatn.fdate, 'yyyy-MM-dd'); //whatever format you need. 
    this.notificatn.tdate= this.datePipe.transform(this.notificatn.tdate, 'yyyy-MM-dd');  

      this.globalServicce.postData({"image":this.previewUrl,"userid":this.loginUserData.user_id,"processes":"import"}
      ,  "ImageUploadView/").subscribe((data:any) => {
        this.url = this.globalServicce.imageurl
        this.notificatn['image']=this.url+data.image

            this.globalServicce.postData(this.notificatn
        ,  "api/NotiSchdl/").subscribe((data2:any) => {
          // console.log(data2)
          form.reset();
          this.notificatn.title = undefined
          this.notificatn.fdate = undefined
          this.notificatn.tdate = undefined
          this.notificatn.body = undefined
          this.notificatn.image = undefined
          this.submitted = false;
          this.notificatn ={}
          this.previewUrl="";
          // this.notificatn.reset();
  
        })

       
      })       
  


  }

  // Form 2
  fileProgress2(fileInput: any) {
    this.fileData2 = <File>fileInput.target.files[0];
    this.preview2();
  }
  preview2() {
    // Show preview 
    var mimeType = this.fileData2.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData2); 
    reader.onload = (_event) => { 
      this.previewUrl2 = reader.result; 
      //console.log(this.previewUrl);
    }
  }
  onSubmit2() {
    this.submitted = true;
    console.log(this.messag)
    if (this.messag.invalid) {
       return;
     } 
     this.submitted = false;
     this.messag ={}
     this.previewUrl2="";
  }
}
