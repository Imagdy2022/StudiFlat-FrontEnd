import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IOnwer } from 'src/app/models/onwer';

@Injectable({
  providedIn: 'root'
})
export class OnwerService {

  constructor(private http: HttpClient) { }

  // apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiVml2YS1EZXZAZ21haWwuY29tIiwianRpIjoiYWMwOWJkM2UtMzgxOS00NWVmLWE4ZDUtZWQ4ZTRkYWJhYzhhIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiI4ZDljOGM0OS0wNDZmLTQzNDEtOWQyYS0wMGNlZDkzYmZmYjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlciBBZG1pbiIsImV4cCI6MTY5ODY5OTkyNiwiaXNzIjoiaHR0cHM6Ly92aXZhcy1hcHQudGVjaCIsImF1ZCI6InZpdmFzLWFwdC50ZWNoIn0.76Ms_-De0QwDr0tS0fyw31VQSVsnEjP9C7wDAiHIr1A"
  token:any=localStorage.getItem("tokenKey")

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });

  getAllOnwers(PageNumber: number, PageSize: number, Search: string,Date:any): Observable<IOnwer[]> {

    const url = `${environment.apiUrl}/Owner`;
    let params = new HttpParams()
      .set('PageNumber', PageNumber)
      .set('PageSize', PageSize)
      .set('Date', Date)
      .set('Key', Search);

    // Check if the Search condition is met
    // if (Search.length > 0) {
    //   params = params.set('Search', Search);
    // }

    return this.http.get<IOnwer[]>(url, { params: params, headers: this.headers });

  }


  public createOwner(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl + '/Owner'}`, data, { headers: this.headers })
  }

  public editOwner(id: string, data: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/Owner/${id}`, data, { headers: this.headers })
  }
  public getOwner(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/Owner/${id}`, { headers: this.headers })
  }



  public GetOwnerProfile(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/Owner/GetOwnerProfile?id=${id}`, { headers: this.headers })
  }
  public deleteOwner(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/Owner/${id}`, { headers: this.headers })
  }

  GetAreasandCities(): Observable<IOnwer[]> {
    return this.http.get<IOnwer[]>(`${environment.apiUrl}/Basics/GetAreasandCities`, {headers: this.headers });

  }

}
