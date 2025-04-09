import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-internal-users',
  standalone: false,
  templateUrl: './internal-users.component.html',
  styleUrls: ['./internal-users.component.scss']
})
export class InternalUsersComponent implements OnInit {
  openTab: any='list';
  loginUserData: any;

  constructor( private route:Router) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    if(this.loginUserData===null){
      this.route.navigateByUrl('home');
    }
  };

  activate(tab){
    this.openTab = tab;
  }

}
