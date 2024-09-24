import { AuthService } from './../../core/services/auth.service';
import { Component, Inject, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpass',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgotpass.component.html',
  styleUrl: './forgotpass.component.css'
})
export class ForgotpassComponent {
  private readonly _AuthService=inject (AuthService);
  private readonly _Router=inject (Router);

  emailValue:string='';
  message:string='';
  errorCodeMsg:string='';
  step:number=1;
  isLoading:boolean=false;
  


enterEmail:FormGroup=new FormGroup({
  email: new FormControl(null,[Validators.required, Validators.email])
})
enterCode:FormGroup=new FormGroup({
  email: new FormControl(null),
  resetCode: new FormControl(null,[Validators.required, Validators.pattern(/^[0-9]{6}$/)])
})
resetPassword:FormGroup=new FormGroup({
  email: new FormControl(null),
  newPassword: new FormControl(null,[Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]),
  confPassword: new FormControl(null,[Validators.required])
},
this.confirmPassword)

confirmPassword(g: AbstractControl) {
  if (g.get('newPassword')?.value === g.get('confPassword')?.value) {
    return null;
  } else {
    return { mismatch: true };
  }
}

forgotPasswordSubmit(): void {
  
  this.resetPassword.get('email')?.patchValue(this.enterEmail.get('email')?.value);
  this.enterCode.get('email')?.patchValue(this.enterEmail.get('email')?.value);
  this._AuthService.setVerifyEmail(this.enterEmail.value).subscribe({
    next: (res: any) => {
      
      this.message=res.message;
      this.isLoading = true;
      setTimeout(() => {
        if (res.statusMsg==='success') {
          this.isLoading = false;
          this.step=2;
        }
      }, 5000);
      
    },
    error: (err: any) => {
      console.error(err);
      this.isLoading = false;
      this.enterEmail.markAllAsTouched();
      this.errorCodeMsg = err.error.message;
    }
  })
  
}

codeSubmit(): void {
  this._AuthService.setCodeVerify(this.enterCode.value).subscribe({
    next: (res: any) => {
      console.log(res)
      this.isLoading = true;
      if (res.status==='Success') {
        setTimeout(() => {
        this.isLoading = false;
        this.step=3;
      }, 5000);
      }
    },
    error: (err: any) => {
      console.error(err);
      this.isLoading = false;
      this.enterCode.markAllAsTouched();
      this.errorCodeMsg = err.error.message;
      setTimeout(() => {
        this.errorCodeMsg = '';
        this
      }, 5000);
    }
  })
}

setNewPassword(): void {
  console.log(this.resetPassword.get('newPassword')?.value)
  this._AuthService.setResetPassword(this.resetPassword.value).subscribe({
    next:(res:any)=>{
      console.log(res);
      // let tokenValue=res.token;
      this.isLoading = true;
      localStorage.setItem('userToken', res.token);
      this._AuthService.saveUserData();
      this._Router.navigate(['/home']);
      this.isLoading = false;
      setTimeout(() => {
        this.isLoading = false;
        this.step=1;
      }, 5000);
    }
})}
}