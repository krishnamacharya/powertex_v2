import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.scss',
  standalone: false,
})
export class ErrorModalComponent implements OnInit {

  constructor(public spinner: NgxSpinnerService,@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<LoginModalComponent>,) {
    this.spinner.hide();
  }

  ngOnInit() {

  }


}
