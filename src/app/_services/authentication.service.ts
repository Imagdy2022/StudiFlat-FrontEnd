import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { IUser } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private userSubject: BehaviorSubject<IUser | null>;
  public user: Observable<IUser | null>;
  public permissions: any | null;
  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('user')!)
    );
    this.user = this.userSubject.asObservable();
    this.permissions = [];
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    let url =
      environment.apiUrl +
      '/Admin/Login?UserMail=' +
      username +
      '&Password=' +
      password;
    return this.http.post<any>(url, { username, password }).pipe(
      map((user) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('tokenKey', user.token);
        localStorage.setItem('permissions', user);

        this.userSubject.next(user);
        return user;
      })
    );
  }
  Login2FA(Email: string, Code: string) {
    let url =
      environment.apiUrl +
      '/Admin/Login-2FA?UserMail=' +
      Email +
      '&Code=' +
      Code;
    return this.http.post<any>(url, { Email, Code }).pipe(
      map((user) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('tokenKey', user.token);
        localStorage.setItem('permissions', user);

        this.userSubject.next(user);
        return user;
      })
    );
  }
  public isLoggedIn(): boolean {
    let token = localStorage.getItem('tokenKey');
    return token != null && token.length > 0;
  }
  logout() {
    localStorage.removeItem('tokenKey');

    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('permissions');

    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
  FCMToken(token: string): Observable<any> {
    let url = environment.apiUrl + '/Basics/FCMDashBoard?Token=' + token;
    return this.http.post(url, token, { responseType: 'text' });
  }
  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem('tokenKey') : null;
  }
  public can(permissiolln: any) {
    const data = localStorage.getItem('user');
    if (data !== null) {
      let parsedData = JSON.parse(data);
      parsedData.permissions;
      for (let i = 0; i < parsedData.permissions.length; i++) {
        if (parsedData.permissions[i].page_Name == permissiolln) {
          if (parsedData.permissions[i].p_View == true) {
            return true;
          } else {
            return false;
          }
        }
      }
      return true;
    } else {
      return false;
    }
  }
}
