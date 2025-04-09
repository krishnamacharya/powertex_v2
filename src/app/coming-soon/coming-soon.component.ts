import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coming-soon',
  standalone: false,
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss']
})
export class ComingSoonComponent implements OnInit {
  loginUserData: any;

  constructor() { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
  }

}
