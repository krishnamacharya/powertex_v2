import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paymentfailure',
  standalone: false,
  templateUrl: './paymentfailure.component.html',
  styleUrls: ['./paymentfailure.component.scss']
})
export class PaymentfailureComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['viewcart']);
  }, 4000);  //4000ms or 4s
  }
}
