import { resolve } from 'node:path';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/envirnoment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WhishlistService {

  private readonly _HttpClient=inject(HttpClient)




  addToWhish(productId: string):Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}api/v1/wishlist`, {"productId": productId})
  }

  getWhishItems():Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}api/v1/wishlist`);
  }

  deleteSpecificProduct(id:string):Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}api/v1/wishlist/${id}`);
  }
}
