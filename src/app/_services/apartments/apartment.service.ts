import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IApartments } from 'src/app/models/apartment';

@Injectable({
  providedIn: 'root',
})
export class ApartmentService {
  token: any = localStorage.getItem('tokenKey');

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.token}`,
  });

  constructor(private http: HttpClient) {}

  getAllApartments(PageNumber: number, PageSize: number): Observable<IApartments[]> {
    const url = `${environment.apiUrl}/ApartmentV2/GetListApartments`;
    const params = new HttpParams()
      .set('Page_No', PageNumber.toString())
      .set('Page_Size', PageSize.toString());

    return this.http.get<IApartments[]>(url, { params: params });
  }

  FilterApartmentsFront(FilterKey: any, PageNumber: number, PageSize: number, Apt_Statuss: any, SearchKey: any): Observable<any> {
    const url = `${environment.apiUrl}/ApartmentV2/GetListApartments`;
    const params = new HttpParams()
      .set('Filter', FilterKey)
      .set('Page_No', PageNumber.toString())
      .set('Page_Size', PageSize.toString())
      // .set('status', Apt_Statuss)
       .set('Search', SearchKey);

    return this.http.get<any>(url, { headers: this.headers, params: params });
  }

  createPostSec1(data: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl + '/ApartmentV2/Apartment_Add_Step1'}`,
      data,
      { headers: this.headers }
    );
  }

  createPostSec2(data: any): Observable<any> {

    return this.http.post(
      `${environment.apiUrl + '/ApartmentV2/Apartment_Add_Step2'}`,
      data,
      { headers: this.headers }
    );
  }

  createPostSec3(data: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl + '/ApartmentV2/Apartment_Add_Step3'}`,
      data,
      {headers: this.headers }
    );
  }

  createPostSec4(data: any): Observable<any> {

    return this.http.post(
      `${environment.apiUrl + '/ApartmentV2/Apartment_Add_Step4'}`,
      data,
      { headers: this.headers }
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
      `${environment.apiUrl + '/ApartmentV2/Apartment_InDetails?' + `Apartment_ID=${id}`}`,
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

  ApproveReview(id: string, approve: boolean): Observable<any> {
    return this.http.put(
      `${
        environment.apiUrl +
        '/Apartment/ApproveReview?' +
        `Review_ID=${id}` +
        `&Approved=${approve}`
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

  GetApartmentReview(id: string): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/Apartment/GetApartmentReview?Apt_ID=${id}`,
      { headers: this.headers }
    );
  }
}
