import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../../global-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';

@Component({
  selector: 'app-import-grn',
  standalone: false,
  templateUrl: './import-grn.component.html',
  styleUrls: ['./import-grn.component.scss']
})
export class ImportGrnComponent implements OnInit {
  loginUserData: any;
  inw_details: any;
  searchText: any;
  p: any = 1;


  constructor(private service: GlobalServiceService, private router: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    console.log(this.loginUserData);
    if (this.loginUserData === null) {
      this.router.navigateByUrl('home');
    }
    this.getGrnGeaderData()
  }
  getGrnGeaderData() {
    this.spinner.show();
    let source_company_code = this.loginUserData.user_id + "@" + this.loginUserData.company_code;
    return this.service.getDatawithQueryParams1nd4('3.9', '25', source_company_code).subscribe((resp) => {
      this.spinner.hide();
      console.log(resp);

      this.inw_details = resp;
      console.log(this.inw_details);
    },
     error => {         this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      });
  };
  getInvData(data) {
    localStorage.setItem('grnData', JSON.stringify(data));
    // alert('imp');
    this.router.navigateByUrl('product-GRN');
  }


}
