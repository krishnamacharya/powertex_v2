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

  newArrival = [
    {
      image: 'assets/images/cat1.png',
      brand: 'Palm',
      name: 'Circumstances And Owing To The Claims',
      price: 114.80,
      oldPrice: null,
      rating: 4
    },
    {
      image: 'assets/images/cat2.png',
      brand: 'HTC',
      name: 'Maxime Placeat Facere Possimus Voluptas',
      price: 105.20,
      oldPrice: null,
      rating: 3
    },
    {
      image: 'assets/images/cat3.png',
      brand: 'Apple',
      name: 'Similique Culpa Rerum Officia Deserunt',
      price: 117.20,
      oldPrice: null,
      rating: 2
    },
    {
      image: 'assets/images/cat5.png',
      brand: 'Canon',
      name: 'Quis Autem Vel Eum Iure Reprehenderit',
      price: 128.00,
      oldPrice: null,
      rating: 1
    },
    {
      image: 'assets/images/cat6.png',
      brand: 'Apple',
      name: 'Voluptates Repudiandae Quo Voluptas',
      price: 122.00,
      oldPrice: 140.00,
      rating: 5
    }
  ];

  bestSellers = [
    {
      image: 'assets/images/cat1.png',
      brand: 'Bosch',
      name: 'Ut Enim Ad Minim Veniam',
      price: 135.00,
      oldPrice: 150.00,
      rating: 4
    },
    {
      image: 'assets/images/cat2.png',
      brand: 'HTC',
      name: 'Facilis Est Et Expedita Distinctio',
      price: 99.90,
      oldPrice: null,
      rating: 5
    },
    {
      image: 'assets/images/cat3.png',
      brand: 'Canon',
      name: 'Excepteur Sint Occaecat Cupidatat',
      price: 149.00,
      oldPrice: null,
      rating: 4
    },
    {
      image: 'assets/images/cat2.png',
      brand: 'HTC',
      name: 'Facilis Est Et Expedita Distinctio',
      price: 99.90,
      oldPrice: null,
      rating: 5
    },
  ];

  specialProducts = [
    {
      image: 'assets/images/cat2.png',
      brand: 'Apple',
      name: 'Doloremque Laudantium Totam Rem',
      price: 89.99,
      oldPrice: 110.00,
      rating: 5
    },
    {
      image: 'assets/images/cat2.png',
      brand: 'Palm',
      name: 'Eaque Ipsa Quae Ab Illo Inventore',
      price: 119.99,
      oldPrice: null,
      rating: 3
    },
    {
      image: 'assets/images/cat4.png',
      brand: 'Palm',
      name: 'Eaque Ipsa Quae Ab Illo Inventore',
      price: 119.99,
      oldPrice: null,
      rating: 3
    }
  ];
  startIndex = 0;
  itemsPerPage1 = 7; // Show 5 categories per view
  endIndex = this.itemsPerPage1;
  
  scrollLeft() {
    if (this.startIndex > 0) {
      this.startIndex -= this.itemsPerPage1;
      this.endIndex = this.startIndex + this.itemsPerPage1;
    }
  }
  
  scrollRight() {
    if (this.endIndex < this.card1dat.length) {
      this.startIndex += this.itemsPerPage1;
      this.endIndex = Math.min(this.startIndex + this.itemsPerPage1, this.card1dat.length);
    }
  }
  
onImgError($event: ErrorEvent) {
throw new Error('Method not implemented.');
}
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
  selected_catg(cat: any) {
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
    this.service.getData3('get_products_category').subscribe((resp) => {
      this.card1dat = resp;
      this.card1discp=this.card1dat[0].data;
      console.log("hgdfujshgfujsg=============",this.card1dat)
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

  promoCards = [
    {
      discount: '20% Discount',
      title: 'Orbital Sander Tools',
      image: 'assets/images/promo1.png'
    },
    {
      discount: '30% Discount',
      title: 'Ingco Angle Grinder',
      image: 'assets/images/promo1.png'
    },
    {
      discount: '10% Discount',
      title: 'Ingco Water Pump',
      image: 'assets/images/promo1.png'
    }];
    professions = [
      { name: 'Carpenter', image: 'assets/images/carpenter.png' },
      { name: 'Demolition', image: 'assets/images/demolition2.png' },
      { name: 'Electrician', image: 'assets/images/electrician.png' },
      { name: 'Plumber', image: 'assets/images/plumber.png' },
      { name: 'Repairing', image: 'assets/images/repair.png' },
      { name: 'Painting', image: 'assets/images/painter.png' },
      
    ];
    
    
}



