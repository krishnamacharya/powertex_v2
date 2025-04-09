import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginModalComponent } from '../authentication-views/login-modal/login-modal.component';


@Component({
  selector: 'app-feedback-modal',
  standalone: false,
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.scss']
})
export class FeedbackModalComponent implements OnInit {
  constructor(public spinner: NgxSpinnerService,@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<LoginModalComponent>,) {
    this.spinner.hide();
  }

  ngOnInit() {

  }

}
