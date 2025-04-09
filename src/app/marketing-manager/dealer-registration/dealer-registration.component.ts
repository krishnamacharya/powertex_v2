import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dealer-registration',
  standalone: false,
  templateUrl: './dealer-registration.component.html',
  styleUrls: ['./dealer-registration.component.scss']
})
export class DealerRegistrationComponent implements OnInit {
  loginUserData: any;

  constructor( private route:Router) { }

  ngOnInit() {
    this.loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
    if(this.loginUserData===null){
      this.route.navigateByUrl('home');
    }
  };

}
