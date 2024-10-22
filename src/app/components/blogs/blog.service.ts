import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) {}
  token: any = localStorage.getItem('tokenKey');

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.token}`,
  });

  createNewBlog(blogData: any): Observable<any> {
    const url = `${environment.apiUrl}/Basics/Create_New_Blog`;
    return this.http.post(url, blogData,{headers:this.headers});
  }
}
