import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class ClaimService {
  private apiUrl = environment.apiUrl + '/claims';

  constructor(private http: HttpClient) {}

  getClaims(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  addClaim(claim: any): Observable<any> {
    console.log('claim added');
    return this.http.post(`${this.apiUrl}/add`, claim);
  }

  getClaim(claimId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${claimId}`);
  }

  deleteClaim(claimId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${claimId}`);
  }

  getClaimByNum(claimNum: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${claimNum}`);
  }
  editClaim(claimId: number, claim: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/edit/${claimId}`, claim);
  }
}
