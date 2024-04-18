import { Component, Inject, OnInit, Optional, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {  MatSnackBarRef } from '@angular/material/snack-bar';
import {
  MAT_DIALOG_DATA,
  // MatDialogModule,
  MatDialogRef,

} from '@angular/material/dialog';

import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog'

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-snackbar-message',
  templateUrl: './snackbar-message.component.html',
  styleUrls: ['./snackbar-message.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule, MatDialogModule]
  })
export class SnackbarMessageComponent implements OnInit{
  snackBarRef = inject(MatSnackBarRef);

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: {message: string}){}

  ngOnInit(): void {
    console.log('%c SIGN IN FORM', 'background: yellow; padding: 25px; font-size: 25px');
    console.log(this.snackBarRef)
  }
}
