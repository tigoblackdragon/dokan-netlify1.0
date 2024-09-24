import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/envirnoment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

private readonly _HttpClient = inject(HttpClient);

getAllProducts():Observable<any> {
return this._HttpClient.get(`${environment.baseUrl}api/v1/products`);
}

getProductById(productId: string|null):Observable<any> {
return this._HttpClient.get(`${environment.baseUrl}api/v1/products/${productId}`);
}
}
