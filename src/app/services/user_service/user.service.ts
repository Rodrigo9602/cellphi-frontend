import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CreateUserInterface } from '../../interfaces/user_interfaces/create-user';
import { UpdateUserInterface } from '../../interfaces/user_interfaces/update-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private headers:HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  private url:string = `http://localhost:3000/user/`
  constructor( private _http: HttpClient ) { }

  create(user:CreateUserInterface):Observable<any> {
    let params = JSON.stringify(user);
    return this._http.post(this.url, params, {headers:this.headers});
  }

  recover(email:string):Observable<any> {
    let params = JSON.stringify({email : email});
    return this._http.post(this.url+'recover', params, {headers:this.headers});   
  }

  changePassword(token:string, user: UpdateUserInterface):Observable<any> {
    let params = JSON.stringify(user);
    return this._http.patch(this.url+`changePassword/${token}`, params, {headers:this.headers});
  }

  findOne(id:string):Observable<any> {
    return this._http.get(this.url+id);
  }

  update(id: string, user:UpdateUserInterface):Observable<any> {
    let params = JSON.stringify(user);
    return this._http.patch(this.url+id, params, {headers:this.headers});
  }
}
