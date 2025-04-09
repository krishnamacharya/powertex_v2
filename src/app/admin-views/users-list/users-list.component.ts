import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  standalone: false,
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  openTab: any = 'branchAssign';
  loginUserData: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    if (this.loginUserData === null) {
      this.router.navigateByUrl('home');
    };
    if (this.loginUserData.designation == 'Branch Manager') {
      this.openTab = 'Pending';
    };

  };

  activate(tab) {
    this.openTab = tab;
  }

}
