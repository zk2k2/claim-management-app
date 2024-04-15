import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimsDashboardComponent } from './component/claims-dashboard/claims-dashboard.component';
import { ClaimDetailsComponent } from './component/claim-details/claim-details.component';
import { ClaimFormComponent } from './component/claim-form/claim-form.component';
import { ContractFormComponent } from './component/contract-form/contract-form.component';
import { ClaimEditComponent } from './component/claim-edit/claim-edit.component';
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';

const routes: Routes = [
  { path: 'claims', component: ClaimsDashboardComponent },
  { path: 'details/:id', component: ClaimDetailsComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'claim-form', component: ClaimFormComponent },
  { path: 'contract-form', component: ContractFormComponent },
  { path: 'claim-edit/:id', component: ClaimEditComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
