import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequest } from '@angular/common/http';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  private apiUrl = environment.apiUrl + '/upload';
  constructor(private http: HttpClient) {}

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.apiUrl}/add`, formData, {
      reportProgress: true,

      responseType: 'json',
    });
    return this.http.request(req);
  }
  getFiles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/uploads`);
  }

  deleteFile(fileName: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${fileName}`);
  }
}
