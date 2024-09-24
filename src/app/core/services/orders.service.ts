import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/envirnoment';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _HttpClient:HttpClient) { };
  myHeaders:any={Token:localStorage.getItem('userToken')}


  creatCashOrder(idCart:string|null, shippingDetails:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}api/v1/orders/${idCart}`, {
      "shippingAddress": shippingDetails})}

  checkOut(idCart:string|null, shippingDetails:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}api/v1/orders/checkout-session/${idCart}?url=${environment.urlServer}`, {
      "shippingAddress": shippingDetails,
      
    },
  {headers: this.myHeaders}
);  // replace with actual API endpoint
  }


  getAllOrders():Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}api/v1/orders/`)}

    getUserOrders(id:string):Observable<any> {
      return this._HttpClient.get(`${environment.baseUrl}api/v1/orders/user/${id}`)
  }
}
