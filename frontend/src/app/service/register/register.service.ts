import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpRequest } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private httpClient: HttpClient) {}

  register(user: any): Observable<any> {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/register`, user)
      .pipe(
        tap((response) => this.setToken(response.token)),
        catchError((error) => {
          console.error('Register error:', error);
          return of(error);
        })
      );
  }

  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }
}
