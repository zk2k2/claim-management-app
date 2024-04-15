import { Component, OnInit } from '@angular/core';
import { ClaimService } from '../../service/claim/claim.service';
import {
  faEllipsisVertical,
  faRightFromBracket,
  faHouse,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmBoxComponent } from './delete-confirm-box/delete-confirm-box.component';
import { LogoutService } from 'src/app/service/logout/logout.service';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';

export interface Claim {
  claimNum: number;
  accidentDate: string;
  creationDate: string;
  status: string;
}

@Component({
  selector: 'app-claims-dashboard',
  templateUrl: './claims-dashboard.component.html',
  styleUrls: ['./claims-dashboard.component.scss'],
})
export class ClaimsDashboardComponent implements OnInit {
  faElipsisVertical = faEllipsisVertical;
  faRightFromBracket = faRightFromBracket;
  faHouse = faHouse;

  claims: Claim[] = [];
  displayedColumns: string[] = [
    'claimNum',
    'accidentDate',
    'creationDate',
    'status',
    'actions',
  ];
  dataSource: MatTableDataSource<Claim> = new MatTableDataSource<Claim>();
  constructor(
    private claimService: ClaimService,
    private logoutService: LogoutService,
    private router: Router,
    private dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: any) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Claim>(this.claims);
    this.getClaims();
    console.log(this.dataSource);
  }

  getClaims(): void {
    this.claimService.getClaims().subscribe((claims) => {
      this.claims = claims;
      this.claims.forEach((claim) => {
        claim.accidentDate = new Date(
          parseInt(claim.accidentDate) * 1000
        ).toISOString();
        claim.creationDate = new Date(
          parseInt(claim.creationDate) * 1000
        ).toISOString();
      });
      this.dataSource.data = this.claims;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  convertDates(): void {
    console.log(this.claims);
  }

  navigateToClaimDetails(claimId: number): void {
    this.router.navigate(['/details', claimId]);
  }

  navigateToContractForm(): void {
    this.router.navigate(['/contract-form']);
  }

  navigateToClaimForm(): void {
    this.router.navigate(['/claim-form']);
  }

  navigateToClaimEdit(claimId: number): void {
    this.router.navigate(['/claim-edit', claimId]);
  }

  navigateToHome(): void {
    this.router.navigate(['/claims']);
  }

  openDialog(claimId: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmBoxComponent, {
      width: '400px',
      data: { claimId: claimId },
    });

    dialogRef.afterClosed().subscribe();
  }

  logout(): void {
    this.logoutService.logout();
    this.router.navigate(['/login']);
  }
}
