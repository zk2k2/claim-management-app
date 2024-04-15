import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrl}/login`, { username, password })
      .pipe(
        tap((response) => this.setToken(response.token)),
        catchError((error) => {
          console.error('Login error:', error);
          return of(error);
        })
      );
  }

  logout(): void {
    this.removeToken();
  }

  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  removeToken(): void {
    localStorage.removeItem('auth_token');
  }

  isAuthenticated(): string | boolean | null {
    const token = this.getToken();
    return token && !this.jwtHelper.isTokenExpired(token);
  }
}
