import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private headers:HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  private url:string = `http://localhost:3000/auth/login`;
  private router;

  constructor( private _http: HttpClient ) {
    this.router = inject(Router);
  }

  login(email:string, password:string):Observable<any> {
    let params = JSON.stringify({email: email, password: password});
    return this._http.post(this.url, params, {headers:this.headers});
  };

  setSession(id: string, token: string): void {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
  };

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  };
}
