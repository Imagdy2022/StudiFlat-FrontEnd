 import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RolesService {
  constructor(private http: HttpClient) { }

  // apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiVml2YS1EZXZAZ21haWwuY29tIiwianRpIjoiYWMwOWJkM2UtMzgxOS00NWVmLWE4ZDUtZWQ4ZTRkYWJhYzhhIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiI4ZDljOGM0OS0wNDZmLTQzNDEtOWQyYS0wMGNlZDkzYmZmYjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlciBBZG1pbiIsImV4cCI6MTY5ODY5OTkyNiwiaXNzIjoiaHR0cHM6Ly92aXZhcy1hcHQudGVjaCIsImF1ZCI6InZpdmFzLWFwdC50ZWNoIn0.76Ms_-De0QwDr0tS0fyw31VQSVsnEjP9C7wDAiHIr1A"
  token:any=localStorage.getItem("tokenKey")

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });


  getAllRolles(Date?:any): Observable<any[]> {

    const url = `${environment.apiUrl}/Admin/GetRoles`;
    const params = new HttpParams()
    .set('Date', Date)
    return this.http.get<any[]>(url, {  headers: this.headers, params:params });

  }
  GetRolePermission(  id:any): Observable<any> {

    const url = environment.apiUrl+"/Admin/GetRolePermission?Role_ID="+id;
    return this.http.get<any>(url, {  headers: this.headers });

  }
  UpdateRolePerm(  data:any): Observable<any> {

    const url = environment.apiUrl+"/Admin/UpdateRolePerm";
    return this.http.put<any>(url,data ,{  headers: this.headers });

  }
  public createRole(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl + '/Admin/CreateRoles?Role_Name='}${data}`,data, { headers: this.headers })
  }
  public deleteRole(id: any): Observable<any> {
    return this.http.delete(`${environment.apiUrl + '/Admin/DeleteRole?Role_ID='}${id}`, { headers: this.headers })
  }
}
