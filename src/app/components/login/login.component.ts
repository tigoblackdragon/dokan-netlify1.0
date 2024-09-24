import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoading: boolean = false;
  msgError: string = '';
  userName:string='';
  msgSuccess: string = '';
  private readonly _AuthService = inject(AuthService);
  private readonly _router=inject (Router);
  loginForm: FormGroup = new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
        ),
      ])
    }
  );

  loginSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this._AuthService.setLoginForm(this.loginForm.value).subscribe({
        next: (res: any) => {
          this.isLoading = false;
          this.msgSuccess = res.message;
          console.log(res)
          this.loginForm.reset();
          this.userName=res.user.name;
          setTimeout(() => {
            this.msgSuccess = '';
            localStorage.setItem('userToken',res.token);
            this._AuthService.saveUserData();
            this._router.navigate(['/home']);
          }, 5000);
          
        },
        error: (err: any) => {
          console.error(err);
          this.isLoading = false;
          this.loginForm.markAllAsTouched();
          this.msgError = err.error.message;
          setTimeout(() => {
            this.msgError = '';
            this
          }, 5000);
        },
      });
      console.log(this.loginForm.value);
    }
  }
}
