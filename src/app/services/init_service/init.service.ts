import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class InitService  {
  private url:string = `http://localhost:3000/`;
  private _productsSubject = new BehaviorSubject<Array<Product>>([]);
  products$ = this._productsSubject.asObservable();

 
  constructor( private _http: HttpClient ) { }  

  updateProductsList(products:Array<Product>) {    
    this._productsSubject.next(products);
  };

  initProducts(userId:string):Observable<any> {
    return this._http.get(this.url+`product/findAll/${userId}`);
  };
}
