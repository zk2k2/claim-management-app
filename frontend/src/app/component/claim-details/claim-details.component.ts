import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClaimService } from '../../service/claim/claim.service';
import { OnInit } from '@angular/core';
import {
  faFileSignature,
  faFileCircleExclamation,
  faCalendarPlus,
  faCarBurst,
  faBarsProgress,
  faPenFancy,
  faHourglassEnd,
  faUser,
  faCar,
} from '@fortawesome/free-solid-svg-icons';
export interface Photo {
  fileName: string;
  filePath: string;
}
export interface Claim {
  claimNum: number;
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
  selector: 'app-claim-details',
  templateUrl: './claim-details.component.html',
  styleUrls: ['./claim-details.component.scss'],
})
export class ClaimDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private claimService: ClaimService
  ) {}

  ngOnInit(): void {
    this.getClaimDetails(this.claimId);
  }
  claim: Claim = {} as Claim;
  photos: any[] = [];
  claimId = this.route.snapshot.paramMap.get('id') as unknown as number;

  getClaimDetails(claimId: number): void {
    this.claimService.getClaim(claimId).subscribe((claim) => {
      this.claim = claim;
      this.photos = claim.photos;
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
    });
    console.log('claim: ' + JSON.stringify(this.claim));
  }

  // getPhotos(claimId: number): void {
  //   this.photoService.getPhotosByClaimId(claimId).subscribe((photos) => {
  //     this.photos = photos;
  //     console.log('photos: ' + JSON.stringify(this.photos));
  //   });
  // }

  faFileSignature = faFileSignature;
  faFileCircleExclamation = faFileCircleExclamation;
  faCalendarPlus = faCalendarPlus;
  faCarBurst = faCarBurst;
  faBarsProgress = faBarsProgress;
  faPenFancy = faPenFancy;
  faHourglassEnd = faHourglassEnd;
  faUser = faUser;
  faCar = faCar;
}
