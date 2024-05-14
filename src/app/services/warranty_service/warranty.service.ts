import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CreateWarrantyInterface } from '../../interfaces/warranty_interfaces/create-warranty';
import { UpdateWarrantyInterface } from '../../interfaces/warranty_interfaces/update-warranty';

@Injectable({
  providedIn: 'root'
})
export class WarrantyService {
  private headers:HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  private url:string = `http://localhost:3000/warranty/`
  constructor( private _http: HttpClient ) { }

  create(warranty: CreateWarrantyInterface):Observable<any> {
    let params = JSON.stringify(warranty);
    return this._http.post(this.url, params, {headers:this.headers});
  };

  findAll(userId:string):Observable<any> {
    return this._http.get(this.url+`findByUser/${userId}`);
  };

  findOne(id:string):Observable<any> {
    return this._http.get(this.url+`findById/${id}`);
  };

  findByClient(clientId:string):Observable<any> {
    return this._http.get(this.url+`findByClient/${clientId}`);
  };

  findByDate(date:Date):Observable<any> {
    let params = JSON.stringify(date);
    return this._http.post(this.url+'findByDate', params, {headers:this.headers});
  };

  update(id:string, warranty: UpdateWarrantyInterface):Observable<any> {
    let params = JSON.stringify(warranty);
    return this._http.patch(this.url+`update/${id}`, params, {headers: this.headers});
  };

  delete(id:string):Observable<any> {
    return this._http.delete(this.url+id);
  }
}
