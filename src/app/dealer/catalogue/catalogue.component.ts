import { Component, OnInit } from '@angular/core';
import {GlobalServiceService} from '../../global-service.service';
import { MatDialog } from '@angular/material/dialog';
import {ActivatedRoute} from "@angular/router";
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
@Component({
  selector: 'app-catalogue',
  standalone: false,
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {
  loginUserData:any
  brands:any;
  id: number;
  private sub: any;
  constructor(private service:GlobalServiceService,private route: ActivatedRoute,private dialog: MatDialog) { 
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
   });
  }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getbrands()
  }
  getbrands() {

    return this.service.getDatawithInput_id('brand').subscribe((resp) => {
      this.brands = resp;
      // console.log("JSON.stringify" + JSON.stringify(this.categories))
    },
      error => {

        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });

      });
  }
  showCatalogue(brand) {
    if(this.id!=1){
      // for Catalogue
    if (brand == 'Powertex') {
       window.location.href= 'https://gstbucket1.s3.ap-south-1.amazonaws.com/Powertexmodel/Powertex+Catalog.pdf','_blank';
    
      // window.open(
      //   'https://gstbucket1.s3.ap-south-1.amazonaws.com/Powertexmodel/Powertex+Catalog.pdf','_blank'
      // );

    }
    if (brand == 'Sunflower') {
      window.location.href='https://gstbucket1.s3.ap-south-1.amazonaws.com/Powertexmodel/Sunflower+catalogue.pdf','_blank';
   
    }
    if (brand == 'Powertex(GOLD)') {
      window.location.href= 'https://gstbucket1.s3.ap-south-1.amazonaws.com/Powertexmodel/Powertex+(Gold)+Catalog.pdf','_blank';
      
    }
    if (brand == 'Powertex SlimCut') {
      window.location.href= 'https://gstbucket1.s3.ap-south-1.amazonaws.com/Powertexmodel/Powertex+Slimcut+Catalogue.pdf','_blank';
      
    }
  }
  else{
    // for price list
    if (brand == 'Powertex') {
      window.open( 'https://gstbucket1.s3.ap-south-1.amazonaws.com/Powertexmodel/Powertex.pdf', '_blank');
    
    }
    if (brand == 'Sunflower') {
      window.open('https://gstbucket1.s3.ap-south-1.amazonaws.com/Powertexmodel/Sunflower.pdf', '_blank');
   
    }
    if (brand == 'Powertex(GOLD)') {
      window.open( 'https://gstbucket1.s3.ap-south-1.amazonaws.com/Powertexmodel/Powertex(GOLD).pdf', '_blank');
      
    }
    
    if (brand == 'Powertex SlimCut') {
      
      window.open('https://gstbucket1.s3.ap-south-1.amazonaws.com/Powertexmodel/Powertex SlimCut.pdf', '_blank');
  }
  }
}
}