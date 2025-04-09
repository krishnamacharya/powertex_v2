import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrers',
  standalone: false,
  templateUrl: './carrers.component.html',
  styleUrls: ['./carrers.component.scss']
})
export class CarrersComponent implements OnInit {
  panelOpenState = false;
  
  constructor() { }

  ngOnInit() {
  }

}
