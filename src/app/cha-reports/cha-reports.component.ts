import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cha-reports',
  standalone: false,
  templateUrl: './cha-reports.component.html',
  styleUrls: ['./cha-reports.component.scss']
})
export class ChaReportsComponent implements OnInit {
  loginUserData: any;

  constructor() { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
  }

}
