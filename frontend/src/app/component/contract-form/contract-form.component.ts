import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContractService } from '../../service/contract/contract.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InfoBoxComponent } from '../alerts/info-box/info-box.component';
import { AlertBoxComponent } from '../alerts/alert-box/alert-box.component';

export interface Contract {
  contractNum: string;
  startDate: string;
  endDate: string;
  insuredName: string;
  vehiculeRegistration: string;
}
@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.scss'],
})
export class ContractFormComponent {
  private fb = inject(FormBuilder);
  contractForm = this.fb.group({
    contractNum: [null, Validators.required],
    startDate: [null, Validators.required],
    endDate: [null, Validators.required],
    insuredName: [null, Validators.required],
    vehiculeRegistration: [null, Validators.required],
  });

  constructor(
    private contractService: ContractService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  picker1: any;
  picker2: any;
  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString().split('T')[0];
  }

  onSubmit(): void {
    if (this.contractForm.invalid) {
      const dialogRef = this.dialog.open(AlertBoxComponent, {
        width: '400px',
        data: {
          title: 'Error',
          message: 'Please fill all the fields.',
        },
      });

      return;
    }
    const contract = JSON.parse(JSON.stringify(this.contractForm.value));
    this.contractService.addContract(contract).subscribe({
      error: (err) => {
        console.log('error: ' + err);
      },
    });
    this.dialog.open(InfoBoxComponent, {
      width: '400px',
    });
  }
}
