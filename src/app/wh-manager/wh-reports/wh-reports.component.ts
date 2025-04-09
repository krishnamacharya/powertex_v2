import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wh-reports',
  standalone: false,
  templateUrl: './wh-reports.component.html',
  styleUrls: ['./wh-reports.component.scss']
})
export class WhReportsComponent implements OnInit {
  carItems:any;
  constructor() { }

  ngOnInit() {
  }

}
