import { Component, OnInit,Input } from '@angular/core';
import { GlobalServiceService } from '../global-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-category-all',
  standalone: false,
  templateUrl: './category-all.component.html',
  styleUrls: ['./category-all.component.scss']
})
export class CategoryAllComponent implements OnInit {
  
  resources: any=[];
  constructor(private service:GlobalServiceService,public route: ActivatedRoute,private router:Router,private dialog: MatDialog, private spinner: NgxSpinnerService) { 
    this.service.getresource.subscribe(data => {
      this.resources=data
      console.log(this.resources,"resourcesdataallcategory")
      if(this.resources.length==0){
       // this.getCatg();
       this.spinner.show();
       this.getprodimg();
       this.spinner.hide();
       
      }
  });
  }

  ngOnInit() {
    // this.getCatg();
    this.getprodimg();
  
  }
  // getCatg(){
  //   this.spinner.show();
    
  //         return this.service.getDatawithQueryParams1('14',"menu").subscribe((resp) => {  
  //     this.spinner.hide();
  //     this.resources = resp;  
  //     this.service.resources.next(resp)
     
      
  //   },
  //  error => {         this.spinner.hide();
  //     this.dialog.open(ErrorModalComponent, {
  //   data: { errorModal:true }
  // });
     
  //   });
  // }
  getprodimg() {
    this.spinner.show();
    return this.service.getDatawithMethod1('get_products_categoryone/').subscribe((resp) => {
      this.resources = resp;
      this.spinner.hide();
    },
      error => {         this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
         // console.log(error);
      });
  }
  selected_Cat(Category){
    // this.router.navigate(['/prod-category',Category])
    this.router.navigate(['/Brands',Category]);
  }

}
