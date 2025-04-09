import { Component, OnInit, Inject } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
import { GlobalServiceService } from '../global-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
// import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  resources: any[] = [];
  resources1: any[] = [];
  l: number = 11;
  prof: any[]=[];
  banners: any;
  sidebanners: any;
  sidebanners1: any;
  sidebanners2: any;
  sidebanners3: any;
  sidebanners4: any;
  videos: any=["video1","video2","video3","video4","video5","video6"];
  // Banners:any =["Banner01","Banner02","Banner03","Banner04","Banner05"]
token:any
constructor(@Inject(GlobalServiceService) private service: GlobalServiceService, private router: Router,public dialog: MatDialog) { }

  ngOnInit() {
  
    // this.spinner.show();
    this.card1();
    // this.getproddata();
    this.getprodimg();
    // this.resources = JSON.parse(localStorage.getItem('get_products_categoryone'));
    this.get_prof();
    this.get_banners();
    this.get_sideBanners();
    // this.spinner.hide();
    this.card2();
    this.card3();
  }

  images: any = ["slide1", "slide2", "slide3", "slide4", "slide5", "slide6", "slide7", "slide8", "slide9", "slide10", "slide11", "slide12"];

  get_prof() {
    return this.service.getDatawithInput_id('61').subscribe((resp) => {
      this.prof = JSON.parse(new TextDecoder().decode(new Uint8Array(resp)));
      console.log(this.prof, "prof");
    },
      error => {
        // this.spinner.hide();
        // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal:true }
        });
      });
  }
  getprodimg() {
    return this.service.getDatawithMethod1('get_products_categoryone/').subscribe((resp) => {
      this.resources = JSON.parse(new TextDecoder().decode(new Uint8Array(resp)));
      this.service.resources.next(resp);
     
    },
      error => {
        // this.spinner.hide();
        // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal:true }
        });
      });
  }

  get_banners() {
    return this.service.getDatawithQueryParams1('1.01', "d").subscribe((resp) => {

      this.banners = resp;

    },
      error => {
        // this.spinner.hide();
        // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal:true }
        });
      });
  }
  
  get_sideBanners() {
    return this.service.getcheckdata('sidebanners/', "s").subscribe((resp) => {

      this.sidebanners = resp;
      this.sidebanners1 = this.sidebanners.filter((e) => e.Slider == 'SLIDER1')
      this.sidebanners2 = this.sidebanners.filter((e) => e.Slider == 'SLIDER2')
      this.sidebanners3 = this.sidebanners.filter((e) => e.Slider == 'SLIDER3')
      this.sidebanners4 = this.sidebanners.filter((e) => e.Slider == 'SLIDER4')

    },
      error => {
        // this.spinner.hide();
        // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal:true }
        });
      });
  }
  ImgClick(data){
    this.router.navigate(['/search', data]);

  }
  catg_prod(data) {
    // this.spinner.show();
    let category = data.Category;

    return this.service.getDatawithQueryParams1('4.8', category).subscribe((resp) => {
      // this.spinner.hide();
      this.resources1 = JSON.parse(new TextDecoder().decode(new Uint8Array(resp))); this.getprod_deatils();
    })
  }
  getprod_deatils() {
    for (let d of this.resources1) {
      let sub_c = d.subcategory;
    }
  }
  selected_catg(cat) {
    let category = cat;
    // this.router.navigate(['/prod-category', category]);
    this.router.navigate(['/Brands',category]);
  }
  selected_all() {
    this.router.navigateByUrl('/all-Category');
  }
card1dat:any;
card1discp:any=[];
card1detail:any=[];
card1image:any=[];
  card1(){
    this.service.getData3('sup/getcardonelist').subscribe((resp) => {
      this.card1dat = resp;
      this.card1discp=this.card1dat.data;
      // this.card1detail=this.card1discp.details;
      // this.card1image=this.card1dat[0].details[0];
      // this.service.resources.next(resp);
    // console.log(this.card1dat,"card1dat");
    // console.log(this.card1discp,"card1discp");
    // console.log(this.card1detail,"card1detail");
     
    },
      error => {
        // this.spinner.hide();
        // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal:true }
        });
      });


    // console.log(this.card1details,"card1details");
  }

  card2dat: any;
  card2discp: any;
  card3dat: any;
  card3discp:any;

  card2(){
    this.service.getData3('sup/getcardtwolist').subscribe((resp) => {
      this.card2dat = resp;
      this.card2discp=this.card2dat.data;
    console.log(this.card2dat,"card2dat");     
    },
      error => {
        // this.spinner.hide();
        // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal:true }
        });
      });


    // console.log(this.card1details,"card1details");
  }

  card3(){
    this.service.getData3('sup/getcardthreelist').subscribe((resp) => {
      this.card3dat = resp;
      this.card3discp=this.card3dat.data;
    console.log(this.card3dat,"card3dat");     
    },
      error => {
        // this.spinner.hide();
        // //this.ngxSmartService.getModal('errorModal').open();
this.dialog.open(ErrorModalComponent, {
      data: { errorModal:true }
    });
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal:true }
        });
      });


    // console.log(this.card1details,"card1details");
  }


//   shop_by_prof(data) {
 
//        console.log("prof",data);      
   
//     this.router.navigate(['/category',data.shotform ,data]);
    
// }

shop_by_prof(p) {
 
  // this.spinner.show();

  // this.service.getDatawithQueryParams1('1.02', data.shotform).subscribe((data) => {
    // console.log("prof",data);      
 //  });
  this.router.navigate(['/category', p.shotform]);
  // this.spinner.show();
}

// ==============================krishna==========
dispItems(cat,subcat){
  let b:any=cat;
  let c:any=btoa(subcat);
  let d=btoa('1');
  let e = btoa("All");
  let br = btoa('Powertex');
  console.log(cat,subcat,"redir");
  this.router.navigate(['/category', b, c, d, e, br]);
}


items = Array.from({ length: this.resources.length }, (_, i) => `Item ${i + 1}`);
  itemsPerPage = 6;
  currentStart = 0;

  nextPage() {
    if (this.currentStart + this.itemsPerPage < this.items.length) {
      this.currentStart += this.itemsPerPage;
    }
  }

  prevPage() {
    if (this.currentStart > 0) {
      this.currentStart -= this.itemsPerPage;
    }
  }


}



