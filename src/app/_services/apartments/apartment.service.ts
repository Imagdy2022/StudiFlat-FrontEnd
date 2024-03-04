import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IApartments } from 'src/app/models/apartment';

@Injectable({
  providedIn: 'root',
})
export class ApartmentService {
  // apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiVml2YS1EZXZAZ21haWwuY29tIiwianRpIjoiYWMwOWJkM2UtMzgxOS00NWVmLWE4ZDUtZWQ4ZTRkYWJhYzhhIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiI4ZDljOGM0OS0wNDZmLTQzNDEtOWQyYS0wMGNlZDkzYmZmYjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlciBBZG1pbiIsImV4cCI6MTY5ODY5OTkyNiwiaXNzIjoiaHR0cHM6Ly92aXZhcy1hcHQudGVjaCIsImF1ZCI6InZpdmFzLWFwdC50ZWNoIn0.76Ms_-De0QwDr0tS0fyw31VQSVsnEjP9C7wDAiHIr1A"
  token: any = localStorage.getItem('tokenKey');

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.token}`,
  });

  constructor(private http: HttpClient) {}

  getAllApartnents(
    PageNumber: number,
    PageSize: number
  ): Observable<IApartments[]> {
    const url = `${environment.apiUrl}/Apartment`;
    const params = new HttpParams()
      .set('PageNumber', PageNumber)
      .set('PageSize', PageSize);

    return this.http.get<IApartments[]>(url, { params: params });
  }
  FilterApartmentsFront(
    FilterKey: any,
    PageNumber: number,
    PageSize: number,
    Apt_Statuss: any
  ): Observable<any> {
    const url = `${environment.apiUrl}/Apartment/FilterApartmentsFront`;
    const params = new HttpParams()
      .set('PageNo', PageNumber)
      .set('PageSize', PageSize)
      .set('Apt_Statuss', Apt_Statuss)
      .set('FilterKey', FilterKey);

    return this.http.get<any>(url, { headers: this.headers, params: params });
  }
  createPostSec1(data: any, id: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl + '/Apartment/PostSec1?UUID=' + id}`,
      data,
      { headers: this.headers }
    );
  }
  createPostSec2(data: any, id: string): Observable<any> {
    const params = new HttpParams().set('UUID', id);

    return this.http.post(
      `${environment.apiUrl + '/Apartment/PostSec2'}`,
      data,
      { params: params, headers: this.headers }
    );
  }
  createPostSec3(data: any, id: string): Observable<any> {
    const params = new HttpParams().set('UUID', id);
    return this.http.post(
      `${environment.apiUrl + '/Apartment/PostSec3'}`,
      data,
      { params: params, headers: this.headers }
    );
  }
  createPostSec4(data: any, id: string): Observable<any> {
    const params = new HttpParams().set('UUID', id);

    return this.http.post(
      `${environment.apiUrl + '/Apartment/PostSec4'}`,
      data,
      { params: params, headers: this.headers }
    );
  }
  createApartmentGeneralInfo(data: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl + '/Apartment/PostGeneralInfo'}`,
      data,
      { headers: this.headers }
    );
  }
  createTransport(data: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl + '/Apartment/PostTransport'}`,
      data,
      { headers: this.headers }
    );
  }
  getApartmentcode(): Observable<any> {
    return this.http.get(`${environment.apiUrl + '/Apartment/GetAptCode'}`, {
      headers: this.headers,
      responseType: 'text',
    });
  }
  getOwnerDropList(): Observable<any> {
    return this.http.get(`${environment.apiUrl + '/Apartment/GetOwners'}`, {
      headers: this.headers,
    });
  }

  getAreaDropList(): Observable<any> {
    return this.http.get(`${environment.apiUrl + '/Apartment/GetAreas'}`, {
      headers: this.headers,
    });
  }

  getApartDetail(id: string): Observable<any> {
    return this.http.get(
      `${environment.apiUrl + '/Apartment/GetApartment?' + `id=${id}`}`,
      { headers: this.headers }
    );
  }

  MarkRented(id: string): Observable<any> {
    return this.http.put(
      `${environment.apiUrl + '/Apartment/MarkRented?' + `Apt_ID=${id}`}`,
      id,
      { headers: this.headers }
    );
  }
  AddtoBest(id: string): Observable<any> {
    return this.http.put(
      `${environment.apiUrl + '/Apartment/AddtoBest?' + `Apt_ID=${id}`}`,
      id,
      { headers: this.headers }
    );
  }
  RemoveBest(id: string): Observable<any> {
    return this.http.put(
      `${environment.apiUrl + '/Apartment/RemoveBest?' + `Apt_ID=${id}`}`,
      id,
      { headers: this.headers }
    );
  }
  MarkAvaliablePublish(id: string): Observable<any> {
    return this.http.put(
      `${
        environment.apiUrl + '/Apartment/MarkAvaliablePublish?' + `Apt_ID=${id}`
      }`,
      id,
      { headers: this.headers }
    );
  }
  MarkDraft(id: string): Observable<any> {
    return this.http.put(
      `${environment.apiUrl + '/Apartment/MarkDraft?' + `Apt_ID=${id}`}`,
      id,
      { headers: this.headers }
    );
  }
  createContract(data: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl + '/Apartment/PostContract'}`,
      data,
      { headers: this.headers }
    );
  }
  AddRoomTools(data: any) {
    return this.http.post(
      `${environment.apiUrl + '/Apartment/AddRoomTools'}`,
      data,
      { headers: this.headers }
    );
  }
  AddBathRoomTools(data: any) {
    return this.http.post(
      `${environment.apiUrl + '/Apartment/AddBathRoomTools'}`,
      data,
      { headers: this.headers }
    );
  }
  AddKitchenTools(data: any) {
    return this.http.post(
      `${environment.apiUrl + '/Apartment/AddKitchenTools'}`,
      data,
      { headers: this.headers }
    );
  }
  AddFeatures(data: any) {
    return this.http.post(
      `${environment.apiUrl + '/Apartment/AddFeatures'}`,
      data,
      { headers: this.headers }
    );
  }
  AddFacilities(data: any) {
    return this.http.post(
      `${environment.apiUrl + '/Apartment/AddFacilities'}`,
      data,
      { headers: this.headers }
    );
  }
  AddPostBackupInfo(data: any) {
    return this.http.post(
      `${environment.apiUrl + '/Apartment/PostBackupInfo'}`,
      data,
      { headers: this.headers }
    );
  }
  DownloadFile(Path: any): Observable<any> {
    const url = environment.apiUrl + '/Basics/DownloadFile?Path=' + Path;

    return this.http.get<any>(url, { headers: this.headers });
  }
  CreateContractPDF(id: any): Observable<any> {
    const url =
      environment.apiUrl + '/Basics/CreateContractPDF?Request_ID=' + id;
    return this.http.get(url, { headers: this.headers, responseType: 'blob' });
  }
  DeleteApartment(ID: any) {
    const url = environment.apiUrl + '/Apartment/DeleteApartment?ID=' + ID;

    return this.http.delete(url, { headers: this.headers });
  }
}
