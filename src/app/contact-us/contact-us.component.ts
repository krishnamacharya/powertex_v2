import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  standalone: false,
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  conatct: any={};
  
  constructor() { }

  ngOnInit() {
  }

}
