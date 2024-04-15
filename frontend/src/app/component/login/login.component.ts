import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AxiosService } from 'src/app/service/axios/axios.service';
import { AlertBoxComponent } from '../alerts/alert-box/alert-box.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  input = {
    username: '',
    password: '',
  };

  constructor(
    private axiosService: AxiosService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  login() {
    if (this.input.username === '' || this.input.password === '') {
      const dialogRef = this.dialog.open(AlertBoxComponent, {
        width: '400px',
      });
      return;
    }
    this.axiosService
      .request('POST', '/login', {
        login: this.input.username,
        password: this.input.password,
      })
      .then((response) => {
        this.axiosService.setAuthToken(response.data.token);
        console.log('hi there');
        this.router.navigate(['/claims']);
      })
      .catch((error) => {
        const dialogRef = this.dialog.open(AlertBoxComponent, {
          data: {
            title: 'Login error',
            message: 'Please check your credentials and try again.',
            width: '400px',
          },
        });
        console.log(error);
      });
  }
}
