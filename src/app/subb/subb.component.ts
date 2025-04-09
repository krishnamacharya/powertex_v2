import { Component, OnInit } from '@angular/core';
// import * as $ from "jquery";
import { GlobalServiceService } from '../global-service.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
declare var $: any;
@Component({
  selector: 'app-subb',
  standalone: false,
  templateUrl: './subb.component.html',
  styleUrls: ['./subb.component.scss']
})
export class SubbComponent implements OnInit {
  resources: any;

  constructor(private service: GlobalServiceService, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getprodimg();
    $('li.parent').on('mouseover', function () {
      var $menuItem = $(this),
        $submenuWrapper = $('> .wrapper', $menuItem);

      // grab the menu item's position relative to its positioned parent
      var menuItemPos = $menuItem.position();

      // place the submenu in the correct position relevant to the menu item
      $submenuWrapper.css({
        top: menuItemPos.top,
        left: menuItemPos.left + Math.round($menuItem.outerWidth() * 0.75)
      });
    });
  }
  getprodimg() {
    this.spinner.show();
    return this.service.getDatawithMethod1('get_products_category/').subscribe((resp) => {
      this.spinner.hide();
      this.resources = resp;
    },
     error => {         this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
    data: { errorModal:true }
  });
        // console.log(error);
      });
  }
}