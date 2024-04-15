import { Component } from '@angular/core';
import { ClaimService } from '../../../service/claim/claim.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { InfoBoxComponent } from 'src/app/component/alerts/info-box/info-box.component';

@Component({
  selector: 'app-delete-confirm-box',
  templateUrl: './delete-confirm-box.component.html',
  styleUrls: ['./delete-confirm-box.component.scss'],
})
export class DeleteConfirmBoxComponent {
  constructor(
    private claimService: ClaimService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DeleteConfirmBoxComponent>,

    @Inject(MAT_DIALOG_DATA) public data: { claimId: number }
  ) {}

  deleteClaim(claimId: number): void {
    console.log('deleting claim with id: ' + claimId);
    this.claimService.deleteClaim(claimId).subscribe({
      error: (err) => {
        console.log('error: ' + err);
      },
    });
    this.dialogRef.close();
    const dialogRef = this.dialog.open(InfoBoxComponent, {
      width: '400px',
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
