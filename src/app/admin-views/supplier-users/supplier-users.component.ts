import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-supplier-users',
  standalone: false,
  templateUrl: './supplier-users.component.html',
  styleUrls: ['./supplier-users.component.scss']
})
export class SupplierUsersComponent implements OnInit {
  openTab: any='list';
  loginUserData: any;

  constructor( private route:Router) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    if(this.loginUserData===null){
      this.route.navigateByUrl('home');
    }
    if(localStorage.getItem('supplierProfile')){
      localStorage.removeItem('supplierProfile')
    }
  };

  activate(tab){
    this.openTab = tab;
  }


}
