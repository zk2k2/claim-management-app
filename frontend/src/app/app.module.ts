import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClaimsDashboardComponent } from './component/claims-dashboard/claims-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClaimDetailsComponent } from './component/claim-details/claim-details.component';
import { MatTab, MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { ClaimFormComponent } from './component/claim-form/claim-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ContractFormComponent } from './component/contract-form/contract-form.component';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { NgxMatTimepickerComponent } from 'ngx-mat-timepicker';
import { NgxMatTimepicker12HoursFaceComponent } from 'ngx-mat-timepicker/lib/components/ngx-mat-timepicker-12-hours-face/ngx-mat-timepicker-12-hours-face.component';
import { DeleteConfirmBoxComponent } from './component/claims-dashboard/delete-confirm-box/delete-confirm-box.component';
import { InfoBoxComponent } from './component/alerts/info-box/info-box.component';
import { ClaimEditComponent } from './component/claim-edit/claim-edit.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './component/login/login.component';
import { AuthInterceptor } from './auth.interceptor';
import { AlertBoxComponent } from './component/alerts/alert-box/alert-box.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { MatSortModule } from '@angular/material/sort';
import { RegistrationComponent } from './component/registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    ClaimsDashboardComponent,
    ClaimDetailsComponent,
    ClaimFormComponent,
    ContractFormComponent,
    DeleteConfirmBoxComponent,
    InfoBoxComponent,
    ClaimEditComponent,
    LoginComponent,
    AlertBoxComponent,
    NavbarComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatTabsModule,
    MatDividerModule,
    FontAwesomeModule,
    MatTableModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    NgxMatTimepickerModule,
    MatSortModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
