import { Observable } from 'rxjs';
import { environment } from './../environments/envirnoment';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private _HttpClient:HttpClient) { }
  getAllCategories():Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}api/v1/categories`);
  }
  getSpecificProduct(id:string|null){
    return this._HttpClient.get(`${environment.baseUrl}api/v1/products/${id}`);
  }

  getSpecificCategory(id:string|null){
    return this._HttpClient.get(`${environment.baseUrl}api/v1/categories/${id}/subcategories`);
  } 
}
