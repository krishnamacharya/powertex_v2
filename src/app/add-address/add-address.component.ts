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
  selector: 'app-add-address',
  standalone: false,
  templateUrl: './add-address.component.html',
  styleUrl: './add-address.component.scss'
})
export class AddAddressComponent {
 formData = {
  address_category: '',
  contact_person: '',
  default1: '',
  email: '',
  mobile: '',
  address1: '',
  address2: '',
  address3: '',
  address4: '',
  city: '',
  state: '',
  district: '',
  pin: '',
  country: '',
  business_name: '',
  user_id:localStorage.getItem('user_id'),
};
constructor(private authService: GlobalServiceService, private spinner: NgxSpinnerService, private globalService: GlobalServiceService, private route: Router, private eventEmmit: ComponentCommunicationService, private dataService: DataServiceService, private dialog: MatDialog, private toasterService: ToasterService) {
  }

submitForm() {
  console.log('Form Data:', this.formData);

  this.globalService.postProfileAddress(this.formData).subscribe({
    next: (response) => {
      console.log('Success:', response);
      // Redirect to profile page
      this.route.navigate(['/profile']);
    },
    error: (error) => {
      console.error('Error:', error);
      // Optionally show error message
    },
  });
}

}
