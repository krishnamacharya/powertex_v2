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
import { ActivatedRoute } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-add-address',
  standalone: false,
  templateUrl: './add-address.component.html',
  styleUrl: './add-address.component.scss'
})
export class AddAddressComponent implements OnInit {
editMode = false;
seqNo: string | null = null;
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
constructor(private authService: GlobalServiceService, private spinner: NgxSpinnerService, private globalService: GlobalServiceService, private route: Router, private eventEmmit: ComponentCommunicationService, private dataService: DataServiceService, private dialog: MatDialog, private toasterService: ToasterService,  private activatedRoute: ActivatedRoute,) {
  }

ngOnInit(): void {
  this.activatedRoute.queryParams.subscribe(params => {
    const seq = params['seq_no'];
    const addressFromState = history.state.address;

    if (seq && addressFromState) {
      this.seqNo = seq;
      this.editMode = true;
      this.formData = { ...addressFromState }; // ✅ No API call needed
      console.log('Pre-filled address for editing:', this.formData);
    }
  });
}


submitForm() {
  console.log('Form Data:', this.formData);

  if (this.editMode && this.seqNo) {
    // Use PATCH for editing existing address
    this.globalService.updateProfileAddress(this.seqNo, this.formData).subscribe({
      next: (response) => {
        console.log('Updated Successfully:', response);
        this.route.navigate(['/profile']);
      },
      error: (error) => {
        console.error('Update Error:', error);
      },
    });
  } else {
    // Use POST for adding a new address
    this.globalService.postProfileAddress(this.formData).subscribe({
      next: (response) => {
        console.log('Created Successfully:', response);
        this.route.navigate(['/profile']);
      },
      error: (error) => {
        console.error('Create Error:', error);
      },
    });
  }
}
getAddressBySeqNo(seqNo: string): void {
  this.globalService.getProfileAddressById(seqNo).subscribe({
    next: (data: any) => {
      if (data && Array.isArray(data.data) && data.data.length > 0) {
        this.formData = data.data[0]; // Use the first object in the array
        console.log('Loaded existing address:', this.formData);
      } else {
        console.warn('No address found for seq_no:', seqNo);
      }
    },
    error: (err) => {
      console.error('Failed to load address:', err);
    }
  });
}


}
