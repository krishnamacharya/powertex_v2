import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalServiceService } from '../../../global-service.service';
import { ErrorModalComponent } from '../../../authentication-views/error-modal/error-modal.component';
@Component({
  selector: 'app-wh-subcatg',
  standalone: false,
  templateUrl: './wh-subcatg.component.html',
  styleUrls: ['./wh-subcatg.component.scss']
})
export class WhSubcatgComponent implements OnInit {

  resources2: any;

  constructor(private service: GlobalServiceService, private router: Router, private route: ActivatedRoute, private dialog: MatDialog, private spinner: NgxSpinnerService) { }
  category: any;
  page: any = 1;
  ngOnInit() {
    let data = this.route.params.subscribe(params => {
      this.category = params['category'];
      console.log(this.category);
      this.getdata();
    },
    error => {
      this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      // console.log(error);
    });
  }
  modal: any = [1];
  getdata() {
    this.spinner.show();
    return this.service.getDatawithQueryParams1('4.8', this.category).subscribe((resp) => {
      this.spinner.hide();
      resp;

      this.resources2 = resp;
    },
    error => {
      this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      // console.log(error);
    });
  }
  selected_sub_cat(p) {
    console.log(p);
    console.log(this.category);
    let b = this.category;
    let c = btoa(p);

    let d = btoa(this.modal);
    let e = btoa("All");
    this.router.navigate(['/modal-wise-stock', b, c, d, e]);
  }

}
