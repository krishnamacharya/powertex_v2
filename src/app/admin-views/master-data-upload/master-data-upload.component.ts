import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master-data-upload',
  standalone: false,
  templateUrl: './master-data-upload.component.html',
  styleUrls: ['./master-data-upload.component.scss']
})
export class MasterDataUploadComponent implements OnInit {
  loginUserData: any;
  PUrl: any;

  constructor(private route:Router) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    if(this.loginUserData===null){
      this.route.navigateByUrl('home');
    }
    this.PUrl = window.location.href.substr(window.location.href.length - 5)
  }

}
