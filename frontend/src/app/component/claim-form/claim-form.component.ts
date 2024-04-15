import { Component, inject, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { ClaimService } from '../../service/claim/claim.service';
import { ContractService } from '../../service/contract/contract.service';
import { HttpResponse } from '@angular/common/http';
import { PhotoService } from '../../service/photo/photo.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { UploadFileService } from '../../service/upload-file/upload-file.service';
import { InfoBoxComponent } from '../alerts/info-box/info-box.component';
import { AlertBoxComponent } from '../alerts/alert-box/alert-box.component';

export interface Photo {
  fileName: string;
  filePath: string;
}

@Component({
  selector: 'app-claim-form',
  templateUrl: './claim-form.component.html',
  styleUrls: ['./claim-form.component.scss'],
})
export class ClaimFormComponent implements OnInit {
  photos?: Photo[];
  selectedFiles?: FileList;
  currentFile?: File;
  contractNums: string[] = [];

  ngOnInit(): void {
    this.getContracts();
    console.log(this.contractNums);
  }

  private fb = inject(FormBuilder);
  claimForm = this.fb.group({
    claimNum: [null, Validators.required],
    accidentDay: [null, Validators.required],
    accidentTime: [null, Validators.required],
    status: [null, Validators.required],
    contractNum: [null, Validators.required],
  });

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  constructor(
    private contractService: ContractService,
    private claimService: ClaimService,
    private uploadFileService: UploadFileService,
    private photoService: PhotoService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  getContracts(): void {
    this.contractService.getAllContractDtos().subscribe((contracts: any) => {
      contracts.forEach((contract: any) => {
        this.contractNums.push(contract.contractNum);
      });
    });
  }

  upload(): void {
    if (this.selectedFiles) {
      this.photos = [];
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.currentFile = this.selectedFiles[i];
        const fileName = this.currentFile.name;
        const filePath = 'assets/images/uploaded/' + fileName;

        const photo: Photo = {
          fileName: fileName,
          filePath: filePath,
        };
        console.log(photo);

        this.photos.push(photo);

        this.uploadFileService.upload(this.currentFile).subscribe(
          (event: any) => {},
          (err: any) => {
            this.currentFile = undefined;
          }
        );
      }
    }
  }

  statuses = ['Open', 'Assessement', 'Closed'];

  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString().split('T')[0];
  }

  onSubmit(): void {
    if (this.claimForm.invalid) {
      const dialogRef = this.dialog.open(AlertBoxComponent, {
        width: '400px',
      });
      return;
    }
    const claim = JSON.parse(JSON.stringify(this.claimForm.value));

    this.upload();

    this.contractService
      .getContractByNum(claim.contractNum)
      .subscribe((contract: any) => {
        const accidentDate = moment(claim.accidentDay);
        const accidentTimeParsed = moment(claim.accidentTime, 'h:mm A');
        const combinedDateTime = accidentDate
          .set({
            hour: accidentTimeParsed.hour(),
            minute: accidentTimeParsed.minute(),
            second: accidentTimeParsed.second(),
          })
          .toISOString();
        claim.accidentDate = combinedDateTime;
        claim.contract = contract;
        claim.creationDate = new Date().toISOString();

        claim.photos = this.photos;

        this.claimService.addClaim(claim).subscribe(() => {
          console.log('saved claim: ' + JSON.stringify(claim));
        });
        const dialogRef = this.dialog.open(InfoBoxComponent, {
          width: '400px',
        });
      });
  }
}
