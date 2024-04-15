import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClaimService } from '../../service/claim/claim.service';
import { ContractService } from '../../service/contract/contract.service';
import { PhotoService } from 'src/app/service/photo/photo.service';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from 'moment';
import { UploadFileService } from '../../service/upload-file/upload-file.service';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { InfoBoxComponent } from '../alerts/info-box/info-box.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertBoxComponent } from '../alerts/alert-box/alert-box.component';
export interface Photo {
  photoId?: number;
  fileName: string;
  filePath: string;
}
export interface Claim {
  claimNum: string;
  accidentDate: string;
  creationDate: string;
  status: string;
  contract: {
    contractNum: string;
    startDate: string;
    endDate: string;
    insuredName: string;
    vehiculeRegistration: string;
  };
  photos: Photo[];
}

@Component({
  selector: 'app-claim-edit',
  templateUrl: './claim-edit.component.html',
  styleUrls: ['./claim-edit.component.scss'],
})
export class ClaimEditComponent {
  claimId = this.route.snapshot.params['id'];
  claim: Claim = {} as Claim;
  accidentTime: Date = new Date();
  initialClaimNum: string = 'ABDC';

  photos?: Photo[];

  selectedFiles?: FileList;
  currentFile?: File;
  status = 'Open';
  isClicked: boolean[] = [];
  contractNums: string[] = [];

  constructor(
    private contractService: ContractService,
    private dialog: MatDialog,
    private claimService: ClaimService,
    private uploadFileService: UploadFileService,
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getClaimDetails(this.claimId);
    this.getContracts();
  }

  getContracts(): void {
    this.contractService.getAllContractDtos().subscribe((contracts: any) => {
      contracts.forEach((contract: any) => {
        this.contractNums.push(contract.contractNum);
      });
    });
  }

  getClaimDetails(claimId: number): void {
    this.claimService.getClaim(claimId).subscribe((claim) => {
      this.claim = claim;
      this.formatDates(claim);
    });
  }

  togglePhotoClicked(index: number) {
    this.isClicked[index] = !this.isClicked[index];
  }

  private fb = inject(FormBuilder);
  claimEditForm = this.fb.group({
    claimNum: [null, Validators.required],
    accidentDay: [null, Validators.required],
    accidentTime: ['', Validators.required],
    status: [null, Validators.required],
    contractNum: [null, Validators.required],
  });

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  statuses = ['Open', 'Assessement', 'Closed'];

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

  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString().split('T')[0];
  }

  formatDates(claim: any): void {
    this.claim.accidentDate = new Date(
      parseInt(claim.accidentDate) * 1000
    ).toISOString();
    this.claim.creationDate = new Date(
      parseInt(claim.creationDate) * 1000
    ).toISOString();
    this.claim.contract.startDate = new Date(
      parseInt(claim.contract.startDate) * 1000
    ).toISOString();
    this.claim.contract.endDate = new Date(
      parseInt(claim.contract.endDate) * 1000
    ).toISOString();
    this.photos = claim.photos;
    this.initialClaimNum = this.claim.claimNum;
    const accidentTime1 = new Date(this.claim.accidentDate);

    const accidentTime2 = (this.accidentTime = moment
      .utc(this.claim.accidentDate, 'h:mm A')

      .toDate());
    const hours1 = accidentTime1.getHours();
    const hours2 = accidentTime2.getHours();
    var timeDifference = hours1 - hours2 + 1;

    this.accidentTime = moment
      .utc(this.claim.accidentDate, 'h:mm A')
      .add(timeDifference, 'hours')
      .toDate();
    this.claimEditForm.patchValue({
      accidentTime: this.accidentTime.toISOString().substr(11, 5),
    });
  }

  onSubmit(): void {
    if (this.claimEditForm.invalid) {
      const dialogRef = this.dialog.open(AlertBoxComponent, {
        width: '400px',
        data: {
          title: 'Error',
          message: 'Please make sur you have filled all the fields.',
        },
      });
      return;
    }

    const claim = JSON.parse(JSON.stringify(this.claimEditForm.value));

    this.upload();

    this.contractService
      .getContractByNum(claim.contractNum)
      .subscribe((contract: any) => {
        if (contract === null) {
          const dialogRef = this.dialog.open(AlertBoxComponent, {
            width: '400px',
            data: {
              title: 'Error',
              message:
                'The associated contract number could not be found, please verify and try again.',
            },
          });
          return;
        }

        const accidentDate = moment(claim.accidentDay);
        const accidentTimeParsed = moment(this.accidentTime, 'h:mm A');
        const combinedDateTime = accidentDate
          .set({
            hour: accidentTimeParsed.hour(),
            minute: accidentTimeParsed.minute(),
            second: accidentTimeParsed.second(),
          })
          .toISOString();
        claim.accidentDate = combinedDateTime;
        console.log(this.isClicked);
        console.log(this.claim.photos);
        console.log('combined date time: ' + combinedDateTime);
        claim.contract = contract;
        claim.creationDate = new Date().toISOString();
        claim.photos = this.photos;

        for (let i = 0; i < this.photos!.length; i++) {
          if (this.isClicked[i]) {
            console.log('photo: ' + JSON.stringify(this.claim.photos[i]));
            this.photoService
              .deletePhoto(this.claim.photos[i].photoId)
              .subscribe();
            this.uploadFileService
              .deleteFile(this.claim.photos[i].fileName)
              .subscribe();
          }
        }

        this.claimService.editClaim(this.claimId, claim).subscribe(() => {
          console.log('edited claim: ' + JSON.stringify(claim));
        });
        const dialogRef = this.dialog.open(InfoBoxComponent, {
          width: '400px',
        });
      });
  }
  faX = faX;
}
