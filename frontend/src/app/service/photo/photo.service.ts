import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  private apiUrl = environment.apiUrl + '/photos';
  constructor(private http: HttpClient) {}

  addPhoto(photo: any): Observable<any> {
    console.log('photo added');
    return this.http.post(`${this.apiUrl}/add`, photo);
  }

  getPhotosByClaimId(claimId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get/${claimId}`);
  }

  deletePhoto(photoId: number | undefined): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${photoId}`);
  }

  deleteAllClaimPhotos(claimId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${claimId}/deleteall`);
  }
}
