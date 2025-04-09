import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { GlobalServiceService } from '../global-service.service';
import { NavigationExtras ,Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-product-menu',
  standalone: false,
  templateUrl: './product-menu.component.html',
  styleUrls: ['./product-menu.component.scss']
})
export class ProductMenuComponent implements OnInit {
  @Input('resources') resources: any[]=[];
  resources1:any=[];
  resources2:any=[];
  data1: Response;
  SelectedSubCategory: any;
  // isChecked:boolean=false;
    constructor( private service:GlobalServiceService,private router:Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }
    catgeory_prod:any;
    subcategory_prod:any;
    select_prod:any;
     isMobile = false;
    
    getIsMobile(): boolean {
     
      const w = document.documentElement.clientWidth;
      const breakpoint = 1000;
      // console.log(w);
      if (w > breakpoint) {
       
        return true;
      } else {
        return false;
      }
    } 
  
  
    ngOnInit() {
       this.isMobile = this.getIsMobile();
      // console.log(this.isMobile, "this is my mobile screen size")
    window.onresize = () => {
      this.isMobile = this.getIsMobile();
    } 
      // this.getprodimg();
      console.log("resourcesdata",this.resources)
      // this.getData1();
    }
    ngOnchanges(changes:SimpleChanges){
      if(changes['resources']){
        this.resources=this.resources
      }
      
    }
    getprodimg() {
      this.spinner.show();
      return this.service.getDatawithQueryParams1('14',"menu").subscribe((resp:any) => {  
        this.spinner.hide();
        this.resources = resp;  
      },
     error => {         this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
    }
  
    product(a:any,r:any){
      // console.log(a,'',r);
      // console.log(this.modal);
      this.catgeory_prod=a;
      this.subcategory_prod=r;
      this.select_prod="Select";
      this.modal;
      let b=a;
      let c=btoa(r);
      let d= btoa(this.modal);
      let e= btoa("Select");
      let br= '';
      this.router.navigate(['/category', b,c,d,e,br]);

      //  return this.getData();
    }
    getData(){
      this.spinner.show();
      return this.service.getDatawithQueryParams4('10',this.catgeory_prod,this.subcategory_prod,this.select_prod,this.modal).subscribe((resp) => { 
        this.spinner.hide();
        this.resources1 = resp;  
      },
     error => {         this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
    }
  
    modal:any=[1];
    product_modal(m:any,ev){
      // console.log(ev);
      if(ev.target.checked){
        this.modal.push(m);
      // console.log(m);
      // console.log(this.modal);
      }
      else {
        this.del(m);
      }
      return this.modal;
    }
    del(obj:string){
      const index: number = this.modal.indexOf(obj);
      if (index !== -1) {
        this.modal.splice(index, 1);
    }  
    
      
  }
    // select_all(modal){
  
    //     console.log("array",modal);
    //    for(var i of modal){
    //      isChecked=true
         
    //    }
        
        
  
    // }
    selected:boolean=false;
    ok=false;
    select_All(sub,m, e) {
      console.log("event",e.target.checked);
      
      console.log("from selectall",sub);
      if(e.target.checked){
        if(this.SelectedSubCategory==sub){
          for(let p of m){
            this.selected=true;
            console.log(p);
            this.modal.push(p);
            //this.selected=!this.selected;
          }
        }
       for(let p of m){
         console.log(p);
       }
      }
      else{
        if(this.SelectedSubCategory==sub){
          for(let p of m){
            this.selected=false;
            console.log(p);
            this.modal=[1];
            //this.selected=!this.selected;
          }
        }
       for(let p of m){
         console.log(p);
       }
      }
      
      
    }
    d_m() {
      this.selected=false;
    }
    okb(){
      this.ok=!this.ok;
    }
    selected_cat_subcat(cat,sub){
      // alert('hii');
      this.modal=[1];
      this.SelectedSubCategory=sub;
    }
    selected_modals(cat,sub){
      
      let b=cat;
      let c=btoa(sub);
    let d= btoa(this.modal);
    let e= btoa("All")
    let br = ''
    
      //  this.router.navigate(['/category', b,c,d,e]);
      //  this.router.navigate(['/category', b,c,d,e,br]);
      this.router.navigate(['/Brands',cat,sub]);
      //     if(this.modal==''){
  //       alert("select Product Modal No");
  //     }
  //     else {
  //       let b=btoa(cat);
  //       let c=btoa(sub);
      
      
  //      this.router.navigate(['/category', b,c]);
  // // console.log(c,"",s);
  // // this.catgeory_prod=c;
  // //     this.subcategory_prod=s;
  // //     this.select_prod="Selected";
  // //     this.modal;
  // //     return this.getData();
  //     }
    }
    sam(){
      // let navigationExtras: NavigationExtras = {
       
      // };
      let b=btoa("dam");
      
      
       this.router.navigate(['/category', b]);
    }
    selected1_modals(p,q){
      // console.log(p,"---",q);
      
      // console.log(this.modal);
  
      
    }
    //ok button Disabled
    ok_btn(){
// console.log("tttt",this.modal);

      if(this.modal==1){
        return true;
      }
      return false;
    }

    selected_catg(cat){
      let category=cat;
      // this.router.navigate(['/prod-category',category]);
      this.router.navigate(['/Brands',category]);
    }
    view_all_subcatg(category){
      this.router.navigate(['/prod-category',category]);
    }
   
}
