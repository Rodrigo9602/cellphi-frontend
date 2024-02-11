import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CreateClientInterface } from '../../interfaces/client_interfaces/create-client';
import { UpdateClientInterface } from '../../interfaces/client_interfaces/update-client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private headers:HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  private url:string = `http://localhost:3000/client/`
  constructor( private _http: HttpClient ) { }

  create(client: CreateClientInterface):Observable<any> {
    let params = JSON.stringify(client);
    return this._http.post(this.url, params, {headers:this.headers});
  }

  findAll(userId:string):Observable<any> {
    return this._http.get(this.url+`findAll/${userId}`);
  }

  findOne(id:string):Observable<any> {
    return this._http.get(this.url+`findOne/${id}`);
  }

  findByCi(ci:string):Observable<any> {
    return this._http.get(this.url+`findByCi/${ci}`);
  }

  update(id:string, client:UpdateClientInterface):Observable<any> {
    let params = JSON.stringify(client);
    return this._http.patch(this.url+`update/${id}`, params, {headers: this.headers});
  }

  addOrder(id:string, orderId:string):Observable<any> {
    let params = JSON.stringify({orderId: orderId});
    return this._http.patch(this.url+`addOrder/${id}`, params, {headers: this.headers});
  }

  delete(id:string):Observable<any> {
    return this._http.delete(this.url+id);
  }
}
