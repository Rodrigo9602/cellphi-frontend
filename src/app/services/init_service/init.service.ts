import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Product } from '../../models/product';
import { Client } from '../../models/client';
import { Facility } from '../../models/facility';
import { Order } from '../../models/order';
import { Warranty } from '../../models/warranty';

@Injectable({
  providedIn: 'root'
})
export class InitService  {
  private url:string = `http://localhost:3000/`;

  private _productsSubject = new BehaviorSubject<Array<Product>>([]);
  private _clientsSubject =  new BehaviorSubject<Array<Client>>([]);
  private _facilitiesSubject =  new BehaviorSubject<Array<Facility>>([]);
  private _ordersSubject =  new BehaviorSubject<Array<Order>>([]);
  private _warrantiesSubject =  new BehaviorSubject<Array<Warranty>>([]);

  products$ = this._productsSubject.asObservable();
  clients$ = this._clientsSubject.asObservable();
  facilities$ = this._facilitiesSubject.asObservable();
  orders$ = this._ordersSubject.asObservable();
  warranties$ = this._warrantiesSubject.asObservable();

 
  constructor( private _http: HttpClient ) { }  

  updateProductsList(products:Array<Product>) {    
    this._productsSubject.next(products);
  };

  initProducts(userId:string):Observable<any> {
    return this._http.get(this.url+`product/findAll/${userId}`);
  };

  updateClientsList(clients:Array<Client>) {    
    this._clientsSubject.next(clients);
  };

  initClients(userId:string):Observable<any> {
    return this._http.get(this.url+`client/findAll/${userId}`);
  };

  updateWarrantyList(warranties:Array<Warranty>) {    
    this._warrantiesSubject.next(warranties);
  };

  initWarranty(userId:string):Observable<any> {
    return this._http.get(this.url+`warranty/findAll/${userId}`);
  };


}
