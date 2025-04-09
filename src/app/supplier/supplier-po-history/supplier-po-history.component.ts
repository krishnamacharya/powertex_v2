import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from "../../global-service.service";
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-supplier-po-history',
  standalone: false,
  templateUrl: './supplier-po-history.component.html',
  styleUrls: ['./supplier-po-history.component.scss']
})
export class SupplierPoHistoryComponent implements OnInit {
  openTab: any = 'Pending';
  loginUserData: any;
  constructor(private globalServicce: GlobalServiceService, private dialog: MatDialog, private spinner: NgxSpinnerService) { }
  activate(tab) {
    this.openTab = tab;
  }
  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
  }

}
