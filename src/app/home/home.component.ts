import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
import { GlobalServiceService } from '../global-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
// import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl:'./home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  

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
      image: 'assets/images/cat1.png',
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
  catg_prod_list: any[];
  scrollContainer: any;
  p: any;
data: any;
 

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
  prof: any[] = [];
  banners: any;
  sidebanners: any;
  sidebanners1: any;
  sidebanners2: any;
  sidebanners3: any;
  sidebanners4: any;
  videos: any = ["video1", "video2", "video3", "video4", "video5", "video6"];
  newArrival: any[] = [];
  special: any[] = [];
    sidemenu: boolean = true
     d: string;
  e: string;
 

  // Banners:any =["Banner01","Banner02","Banner03","Banner04","Banner05"]
  token: any
  constructor(@Inject(GlobalServiceService) private service: GlobalServiceService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {

    // this.spinner.show();
    this.card1();
    // this.getproddata();
    // this.getprodimg();
    // this.resources = JSON.parse(localStorage.getItem('get_products_categoryone'));
    this.get_prof();
    this.get_banners();
    this.getNewArrivals();
    this.getSpecialProducts();


    // this.get_sideBanners();
    // this.spinner.hide();
    // this.card2();
    // this.card3();
  }

  images: any = ["slide1", "slide2", "slide3", "slide4", "slide5", "slide6", "slide7", "slide8", "slide9", "slide10", "slide11", "slide12"];

  get_prof() {
    this.service.getProfessionData().subscribe(
      (resp) => {
        this.prof = { data: resp }.data;
        console.log(this.prof, "prof");
      },
      (error) => {
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal: true }
        });
      }
    );
  }

//   getprodimg() {
//     return this.service.getDatawithMethod1('get_products_categoryone/').subscribe((resp) => {
//       this.resources = JSON.parse(new TextDecoder().decode(new Uint8Array(resp)));
//       this.service.resources.next(resp);
     
//     },
//       error => {
//         // this.spinner.hide();
//         // //this.ngxSmartService.getModal('errorModal').open();
// this.dialog.open(ErrorModalComponent, {
//       data: { errorModal:true }
//     });
//         this.dialog.open(ErrorModalComponent, {
//           data: { errorModal:true }
//         });
//       });
//   }

  get_banners() {
    this.service.getBannerData().subscribe((resp) => {
      console.log(resp)
      this.banners = resp;

    },
      error => {
        // this.spinner.hide();
        // //this.ngxSmartService.getModal('errorModal').open();
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal: true }
        });
        this.dialog.open(ErrorModalComponent, {
          data: { errorModal: true }
        });
      });
  }

  //   get_sideBanners() {
  //     return this.service.getBannerData().subscribe((resp) => {

  //       // this.sidebanners = resp;
  //       // this.sidebanners1 = this.sidebanners.filter((e) => e.Slider == 'SLIDER1')
  //       // this.sidebanners2 = this.sidebanners.filter((e) => e.Slider == 'SLIDER2')
  //       // this.sidebanners3 = this.sidebanners.filter((e) => e.Slider == 'SLIDER3')
  //       // this.sidebanners4 = this.sidebanners.filter((e) => e.Slider == 'SLIDER4')

  //     },
  //       error => {
  //         // this.spinner.hide();
  //         // //this.ngxSmartService.getModal('errorModal').open();
  // this.dialog.open(ErrorModalComponent, {
  //       data: { errorModal:true }
  //     });
  //         this.dialog.open(ErrorModalComponent, {
  //           data: { errorModal:true }
  //         });
  //       });
  //   }
  ImgClick(data) {
    this.router.navigate(['/search', data]);

  }
  selected_catg(cat: any) {

    let category = cat;
    console.log('Selected Category:', category);
    // this.router.navigate(['/prod-category', category]);
    this.router.navigate(['/shop-by-category', category]); // ✅ match the route

  }
  catg_prod(data) {
    const category = data.Category;

    this.service.getDatawithQueryParams1('4.8', category).subscribe((resp) => {
      this.resources1 = JSON.parse(new TextDecoder().decode(new Uint8Array(resp)));
      this.catg_prod_list = this.resources1;  // 👈 store the array here
      this.getprod_deatils();
    });
  }
getNewArrivals() {
  this.service.getNewarrivals('newarrivals/').subscribe((resp) => {
    const decodedData = JSON.parse(new TextDecoder().decode(new Uint8Array(resp)));
    this.newArrival = decodedData.Done;
    console.log("data ......done",this.newArrival)
  });
}
getSpecialProducts() {
  this.service.getSpecialProducts().subscribe((resp) => {
    const decodedData = JSON.parse(new TextDecoder().decode(new Uint8Array(resp)));
    this.special = decodedData.Done;
    console.log("data ...special",this.special)
  }); 
}

  getprod_deatils() {
    for (let d of this.resources1) {
      let sub_c = d.subcategory;
    }
  }

  selected_all() {
    this.router.navigateByUrl('/all-Category');
  }

 card1dat: any = [];
card1discp: any[] = [];

card1() {
  
  this.service.getdata1().subscribe(
    (resp: any) => {
      this.card1dat = resp.data;
      this.card1discp = this.card1dat[0]?.data || [];
    },
    error => {
      this.dialog.open(ErrorModalComponent, {
        data: { errorModal: true }
      });
    }
  );
}

  card2dat: any;
  card2discp: any;
  card3dat: any;
  card3discp: any;

  //   card2(){
  //     this.service.getData3('sup/getcardtwolist').subscribe((resp) => {
  //       this.card2dat = resp;
  //       this.card2discp=this.card2dat.data;
  //     console.log(this.card2dat,"card2dat");     
  //     },
  //       error => {

  // this.dialog.open(ErrorModalComponent, {
  //       data: { errorModal:true }
  //     });
  //         this.dialog.open(ErrorModalComponent, {
  //           data: { errorModal:true }
  //         });
  //       });



  //   }

  //   card3(){
  //     this.service.getData3('sup/getcardthreelist').subscribe((resp) => {
  //       this.card3dat = resp;
  //       this.card3discp=this.card3dat.data;
  //     console.log(this.card3dat,"card3dat");     
  //     },
  //       error => {

  // this.dialog.open(ErrorModalComponent, {
  //       data: { errorModal:true }
  //     });
  //         this.dialog.open(ErrorModalComponent, {
  //           data: { errorModal:true }
  //         });
  //       });



  //   }


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
  dispItems(cat, subcat) {
    let b: any = cat;
    let c: any = btoa(subcat);
    console.log(c, "subcat");
    let d = btoa('1');
    let e = btoa("All");
    let br = btoa('Powertex');
    console.log(cat, subcat, "redir");
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


 @ViewChild('newArrivalSlider') newArrivalSlider!: ElementRef;
  @ViewChild('bestSellersSlider') bestSellersSlider!: ElementRef;
  @ViewChild('specialSlider') specialSlider!: ElementRef;

scrollLeftp(section: string) {
  const slider = this.getSlider(section);
  slider.scrollLeft -= 300;
}

scrollRightp(section: string) {
  const slider = this.getSlider(section);
  slider.scrollLeft += 300;
}

getSlider(section: string): HTMLElement {
  switch (section) {
    case 'new': return this.newArrivalSlider.nativeElement;
    case 'best': return this.bestSellersSlider.nativeElement;
    case 'special': return this.specialSlider.nativeElement;
    default: return null!;
  }
}


  sub_cat(product) {

    console.log(product);
    if (product.productid) {
      let category = product.category;
      let sub_category = product.subcategory;
      let model = product.modelno;

      let obj = product;
      localStorage.setItem('key', JSON.stringify(obj));
      console.log(product);
      // this.obj.setCategory(p);

    console.log("clicked") 
      this.router.navigateByUrl('/product-detail');
      this.router.navigate(['/product-detail', product.productid]);
    }
    else {
      this.sidemenu = true
      this.d = product.category
      this.e = product.subcategory
    
  }

}
selected_prof(cat: any) {
  let shotform = cat;
  console.log('Selected Category:', shotform);
  this.router.navigate(['/professionwise-products', shotform]);
}


}
 
