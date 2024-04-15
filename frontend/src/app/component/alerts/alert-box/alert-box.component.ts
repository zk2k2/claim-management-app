import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.scss'],
})
export class AlertBoxComponent {
  title: string = '';
  message: string = '';
  constructor(
    private dialogRef: MatDialogRef<AlertBoxComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}

  onNoClick(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl(currentUrl).then(() => {
      this.dialogRef.close();
    });
  }
}
