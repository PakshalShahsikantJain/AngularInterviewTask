import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loginUrl = "http://localhost:3000/api/login";

  constructor(private http : HttpClient,private _router : Router) { }

  loginUser(user : any) {
    return this.http.post<any>(this._loginUrl,user);
  }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/home']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserId() {
    return localStorage.getItem('userId');
  }
  
  loggedIn() {
    return !!localStorage.getItem('token');
  }
}
