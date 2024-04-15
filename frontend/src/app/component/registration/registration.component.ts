import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../../service/register/register.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  private fb = inject(FormBuilder);
  registrationForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    login: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(private registerService: RegisterService) {}

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      return;
    }
    const registration = JSON.parse(
      JSON.stringify(this.registrationForm.value)
    );
    this.registerService.register(registration).subscribe({
      error: (err) => {
        console.log('error: ' + err);
      },
    });
  }
}
