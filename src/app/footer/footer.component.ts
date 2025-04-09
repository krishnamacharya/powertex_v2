import { Component, OnInit, Input } from '@angular/core';
import { GlobalServiceService } from '../global-service.service';
import { NavigationExtras, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

interface Resources{
  Category:string
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  standalone:false,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  resources: Resources[]=[];
  constructor(private service: GlobalServiceService, private router: Router, private spinner: NgxSpinnerService) { 
    this.service.getresource.subscribe(data => {
      this.resources=data
      if(this.resources.length==0){
        this.getprodimg();
       
      }
  });
  }
  ngOnInit() {
    // this.getprodimg();
    // this.getData1();
  }
  getprodimg() {
   // this.spinner.show();
    return this.service.getDatawithMethod1('get_products_category/').subscribe((resp:any) => {
  //    this.spinner.hide();
      this.resources = resp;  //this.getLimitData();
    },
     error => {         this.spinner.hide();
        // //this.ngxSmartService.getModal('errorModal').open();
// this.dialog.open(ErrorModalComponent, {
//       data: { errorModal:true }
//     });
        // console.log(error);
      });
  }
  getLimitData() {
    for (let p of this.resources) {

    }
  }

  all_catg() {
    this.router.navigateByUrl('/all-Category');
  }

  catg_click(p) {
    console.log(p.Category);
    this.router.navigate(['/prod-category', p.Category])
  }
}
