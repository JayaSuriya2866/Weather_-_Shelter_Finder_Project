import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  // private api_key: string = "";

  private base_url: string = ""


  //Save User
  saveusers(data: any): Observable<any> {
    console.log(data)
    return this.http.post(this.base_url + '/users', data);
  }

  isLoggedIn: boolean = false;
  //User Login
  loginUser(logData: any): Observable<any> {
    console.log(logData)
    this.isLoggedIn = true;
    return this.http.post<any>(this.base_url + '/login', logData);
  }

  //UserLogout
  logout() {
    this.isLoggedIn = false;
  }

  //Update User 
  updateUser(data: any): Observable<any> {
    return this.http.put(this.base_url + '/users', data)
  }
  
  isAuthenticated: boolean = false;

  res: string | undefined

  checkAuthenticate() {
    this.res = 'Activate'
    console.log(localStorage.getItem('status'))
    if (localStorage.getItem('status') == this.res) {
      this.isAuthenticated = true
    } else {
      this.isAuthenticated = false
    }
  }
}
