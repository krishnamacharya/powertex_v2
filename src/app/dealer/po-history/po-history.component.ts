import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../../global-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../authentication-views/error-modal/error-modal.component';
@Component({
  selector: 'app-po-history',
  standalone: false,
  templateUrl: './po-history.component.html',
  styleUrls: ['./po-history.component.scss']
})
export class PoHistoryComponent implements OnInit {
  loginUserData:any
  page:any=1
  constructor(private globalService:GlobalServiceService,private dialog: MatDialog) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    this.getdata()
  }
  url:any
  methodname:any
  response:any
  getdata() {
 
    this.methodname = "telecom/po_pending";
    this.globalService.getDataOnlyWithMethod(this.methodname).subscribe((data) => {
      this.response = data
       console.log(this.response,"response")
    })
  
  }
  branchdata:any
  getBranchDropdown(param1) {
    return this.globalService.getDatawithQueryParams2('5.12', param1, 'BRANCH').subscribe((resp) => {
      //console.log(resp);
      this.branchdata = resp;
      //console.log(JSON.stringify(this.branchdata))
    },
      error => {
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
      });
  }
}
