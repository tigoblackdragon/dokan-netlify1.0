import { AuthService } from './../../core/services/auth.service';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormControlName,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  isLoading: boolean = false;
  msgError: string = '';
  msgSuccess: string = '';
  private readonly _AuthService = inject(AuthService);
  private readonly _router=inject (Router);
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
        ),
      ]),
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    this.confirmPassword
  );

  registerSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
        next: (res: any) => {
          this.isLoading = false;
          this.msgSuccess = res.message;
          console.log(res)
          this.registerForm.reset();
          // clear error message after 5 seconds
          setTimeout(() => {
            this.msgSuccess = '';
            this._router.navigate(['/login']);
          }, 5000);
          
        },
        error: (err: any) => {
          console.error(err);
          this.isLoading = false;
          this.registerForm.markAllAsTouched();
          this.msgError = err.error.message;
          setTimeout(() => {
            this.msgError = '';
            this
          }, 5000);
        },
      });
      console.log(this.registerForm.value);
    }
  }

  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    } else {
      return { mismatch: true };
    }
  }
}
