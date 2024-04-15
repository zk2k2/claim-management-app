import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.scss'],
})
export class InfoBoxComponent {
  constructor(
    private dialogRef: MatDialogRef<InfoBoxComponent>,
    private router: Router
  ) {}

  onNoClick(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl(currentUrl).then(() => {
      this.dialogRef.close();
      if (currentUrl === '/claims') window.location.reload();
      else this.router.navigate(['/claims']);
    });
  }
}
