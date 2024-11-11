import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root', // This makes the service available throughout the app
})
export class  AppointmentsService {


  constructor(private http: HttpClient) {}

  getAllWorkerRequests(page_NO: number, page_Size: number, search_Key: any): Observable<any> {
    const url = `${environment.apiUrl}/WokersStaff/Get_AllWorker_Requests`;

    const params = {
      Page_NO: page_NO,
      Page_Size: page_Size,
      Search_Key: search_Key
    };
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(url, {params,headers});
  }


  getAppointments(pageNo: number, pageSize: number, search: string): Observable<any> {
    const url = `${environment.apiUrl}/ApartmentV2/GetAllAppointments`;
    const token = localStorage.getItem('tokenKey');
    const headers = new HttpHeaders({
      'Accept': 'text/plain',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    let params = new HttpParams()
      .set('Page_No', pageNo.toString())
      .set('Page_Size', pageSize.toString());

    if (search) {
      params = params.set('Search', search);
    }

    return this.http.get(url, { headers, params });
  }



  getApartAppointments(pageNo: number, pageSize: number, search: string): Observable<any> {
    const url = `${environment.apiUrl}/ApartmentV2/GetList_Apartment_Appointment`;
    const token = localStorage.getItem('tokenKey');
    const headers = new HttpHeaders({
      'Accept': 'text/plain',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    let params = new HttpParams()
      .set('Page_No', pageNo.toString())
      .set('Page_Size', pageSize.toString());

    if (search) {
      params = params.set('Search', search);
    }

    return this.http.get(url, { headers, params });
  }

  createNewAppointment(data: any): Observable<any> {
    const url = `${environment.apiUrl}/ApartmentV2/CreateNewAppointment`;

    const token = localStorage.getItem('tokenKey');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>(url, data, { headers });
  }


  updateAppointment(data: any): Observable<any> {
    const url = `${environment.apiUrl}/ApartmentV2/UpdateAppointment`;

    const token = localStorage.getItem('tokenKey');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>(url, data, { headers });
  }

  // getAppointmentDetails(Id: string): Observable<any> {
  //   const url = `${environment.apiUrl}/ApartmentV2/GetAppointment_Details`;
  //   const token = localStorage.getItem('tokenKey');


  //   const headers = new HttpHeaders({
  //     'accept': 'text/plain',
  //     'Authorization': `Bearer ${token}`
  //   });


  //   return this.http.get<any>(`${url}?Appo_ID=${Id}`, { headers });


  //   const params = new HttpParams().set('Appo_ID', appoId);
  //   return this.http.get<any>( url, { params });
  // }

  getAppointmentDetails(appoId: string): Observable<any> {
    const url = `${environment.apiUrl}/ApartmentV2/GetAppointment_Details`;

    const token = localStorage.getItem('tokenKey');


    const headers = new HttpHeaders({
      'accept': 'text/plain', // Accept header as specified in your example
      'Authorization': `Bearer ${token}`
    });

    const params = new HttpParams().set('Appo_ID', appoId);
    return this.http.get<any>(url, { params, headers});
  }

  deleteAppointment(Id: string): Observable<any> {
    const url = `${environment.apiUrl}/ApartmentV2/DeleteAppointment`;
    const token = localStorage.getItem('tokenKey');
    const headers = new HttpHeaders({
      'accept': 'text/plain'   ,
      'Authorization': `Bearer ${token}`
    });
    const params = new HttpParams().set('Appo_ID', Id);

    return this.http.delete(url, { headers, params });
  }

}
