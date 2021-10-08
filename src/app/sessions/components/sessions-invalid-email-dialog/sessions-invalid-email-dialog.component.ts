import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'sessions-invalid-email-dialog',
  templateUrl: './sessions-invalid-email-dialog.component.html',
  styleUrls: ['./sessions-invalid-email-dialog.component.scss']
})
export class SessionsInvalidEmailDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<SessionsInvalidEmailDialogComponent>) {
  }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close('Pizza!');
  }

}
