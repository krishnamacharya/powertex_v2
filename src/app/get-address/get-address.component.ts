import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from "../global-service.service";
import { DataServiceService } from "../data-service.service";
import { Router } from "@angular/router";
import { ComponentCommunicationService } from "../component-communication.service";
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from './../toastr-service.service';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;
@Component({
  selector: 'app-get-address',
  standalone: false,
  templateUrl: './get-address.component.html',
  styleUrl: './get-address.component.scss'
})
export class GetAddressComponent {
 address: any[] = []; 
  constructor(private authService: GlobalServiceService, private spinner: NgxSpinnerService, private globalService: GlobalServiceService, private route: Router, private eventEmmit: ComponentCommunicationService, private dataService: DataServiceService, private dialog: MatDialog, private toasterService: ToasterService) {
   }
   ngOnInit() {
  
    this.getaddress();
  }
  getaddress(): void {
  this.globalService.getUserAddress().subscribe({
    next: (data: any) => {
      this.address = data.data; // ✅ Assign the 'data' array
      console.log('Fetched addresses:', this.address);
    },
    error: (err) => {
      console.error('Error fetching addresses:', err);
    }
  });
}

}
