import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/envirnoment';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  userData:any=null;
  private readonly _Router = inject (Router);
 private readonly _HttpClient = inject (HttpClient);
 setRegisterForm(data:Observable<any>) {
  return this._HttpClient.post(`${environment.baseUrl}api/v1/auth/signup`,data)
 }
 setLoginForm(data:Observable<any>) {
  return this._HttpClient.post(`${environment.baseUrl}api/v1/auth/signin`,data)
 }
saveUserData():void{
  if(localStorage.getItem('userToken')!==null){
    this.userData=jwtDecode(localStorage.getItem('userToken')!)
  }
}
logOut():void{
  localStorage.removeItem('userToken');
  this.userData=null;
  this._Router.navigate(['/login'])
}
setVerifyEmail(data:Observable<any>) {
  return this._HttpClient.post(`${environment.baseUrl}api/v1/auth/forgotPasswords`,data)
 }
 setCodeVerify(data:Observable<any>) {
  return this._HttpClient.post(`${environment.baseUrl}api/v1/auth/verifyResetCode`,data)
 }
 setResetPassword(data:Observable<any>) {
  return this._HttpClient.put(`${environment.baseUrl}api/v1/auth/resetPassword`,data)
 }
}
