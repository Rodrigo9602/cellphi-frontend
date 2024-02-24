import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CreateProductInterface } from '../../interfaces/product_interfaces/create-product';
import { UpdateProductInterface } from '../../interfaces/product_interfaces/update-product';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private headers:HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  private url:string = `http://localhost:3000/product/`;
  
  constructor( private _http: HttpClient ) { }

  
  create(product:CreateProductInterface):Observable<any> {
    let params = JSON.stringify(product);
    return this._http.post(this.url, params, {headers:this.headers});
  };

  findAll(userId:string):Observable<any> {
    return this._http.get(this.url+`findAll/${userId}`);
  };

  findByFilter(filter:string, data:string):Observable<any> {
    let params = JSON.stringify({filter:filter, data:data});
    return this._http.post(this.url+'findByFilter', params, {headers:this.headers});
  };

  update(id:string, product:UpdateProductInterface):Observable<any> {
    let params = JSON.stringify(product);
    return this._http.patch(this.url+`update/${id}`, params, {headers:this.headers});
  };

  sellProducts(ids:Array<string>):Observable<any> {
    let params = JSON.stringify({ids: ids});
    return this._http.patch(this.url+'sell', params, {headers:this.headers});
  };

  delete(id:string):Observable<any> {
    return this._http.delete(this.url+id);
  };
  
}
