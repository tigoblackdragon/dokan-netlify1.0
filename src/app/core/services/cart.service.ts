import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Token } from '@angular/compiler';
import { environment } from '../environments/envirnoment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartNumber:BehaviorSubject<number>=new BehaviorSubject(0);
  cartOrders:BehaviorSubject<number>=new BehaviorSubject(0);
  adminOrders:BehaviorSubject<number>=new BehaviorSubject(0);
   private data: string = '';
  public cartId: BehaviorSubject<string> = new BehaviorSubject<string>('');

  setData(value: string) {
    this.data = value;
  }

  getData(): string {
    return this.data;
  }

  private readonly _HttpClient= inject (HttpClient) ;
  tokenHeader:any={token:localStorage.getItem('userToken')};

  addToCart(productId: string):Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}api/v1/cart`, {"productId": productId},
      {
        headers:this.tokenHeader
        
      });
  }

  getCartItems():Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}api/v1/cart`);
  }

  deleteSpecificProduct(id:string):Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}api/v1/cart/${id}`);
  }

  updateProductCount(id:string, newCount:number):Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}api/v1/cart/${id}`, {"count": newCount}, );
  }

  clearCart():Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}api/v1/cart`);
  }
}
