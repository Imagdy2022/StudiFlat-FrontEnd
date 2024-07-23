import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class InquiresService {
  token: any = localStorage.getItem('tokenKey');
  constructor(private http: HttpClient) {}

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.token}`,
  });
  // getAllInquires(
  //   status: any,
  //   pageNumber: any,
  //   pageSize: any,
  //   Date: any,
  //   keysearch: any
  // ): Observable<any[]> {
  //   const url =
  //     environment.apiUrl +
  //     '/Requests/GetAllRequests?status=' +
  //     status +
  //     '&PageNo=' +
  //     pageNumber +
  //     '&PageSize=' +
  //     pageSize +
  //     '&Date=' +
  //     Date +
  //     '&Key=' +
  //     keysearch;
  //   return this.http.get<any[]>(url, { headers: this.headers });
  // }
  getAllInquires(
    pageNo: number,
    pageSize: number,
    bookingStatus: string,
    searchKey: string,
    dateFilter: string
  ): Observable<any[]> {
    const url =
      environment.apiUrl +
      '/ApartmentV2/GetBookings?' +
      'Page_No=' + pageNo +
      '&Page_Size=' + pageSize +
      '&bookingStatus=' + bookingStatus +
      '&Search_Key=' + searchKey +
      '&Date_Filter=' + dateFilter;

    return this.http.get<any[]>(url, { headers: this.headers });
  }


  // GetRequestDetails(id: string): Observable<any> {
  //   const url = environment.apiUrl + '/ApartmentV2/Booking_InDetails?Booking_ID=' + id;
  //   return this.http.get<any>(url, { headers: this.headers });
  // }
  GetRequestDetails(id: string): Observable<any> {
    const url = `${environment.apiUrl}/ApartmentV2/Booking_InDetails?Booking_ID=${id}`;
    return this.http.get<any>(url, { headers: this.headers });
  }


  UploadReqContract(id: any, file: any): Observable<any> {
    let headerss = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    const url = environment.apiUrl + '/Requests/UploadReqContract?Req_ID=' + id;
    return this.http.post<any>(url, file, { headers: headerss });
  }
  AddWaitingList(id: any): Observable<any> {
    const url = environment.apiUrl + '/Requests/AddWaitingList?Req_ID=' + id;
    return this.http.put<any>(url, id, { headers: this.headers });
  }
  CreateContractPDF(id: any): Observable<any> {
    const url =
      environment.apiUrl + '/Basics/CreateContractPDF?Request_ID=' + id;
    return this.http.get(url, { headers: this.headers, responseType: 'blob' });
  }
  CancelRequest(id: any, reason: any): Observable<any> {
    const url =
      environment.apiUrl +
      '/Requests/CancelRequest?Req_ID=' +
      id +
      '&Reason=' +
      reason;
    return this.http.put<any>(url, reason, { headers: this.headers });
  }
  NewPassportsNotValidation(id: any, Valid: any, reason: any): Observable<any> {
    const url =
      environment.apiUrl +
      '/Requests/NewPassportsValidation?P_ID=' +
      id +
      '&Valid=' +
      Valid +
      '&Invalid_Reason=' +
      reason;
    return this.http.put<any>(url, Valid, { headers: this.headers });
  }
  NewPassportsValidation(id: any, Valid: any): Observable<any> {
    const url =
      environment.apiUrl +
      '/Requests/NewPassportsValidation?P_ID=' +
      id +
      '&Valid=' +
      Valid;
    return this.http.put<any>(url, Valid, { headers: this.headers });
  }
  ApproveRequest(id: any): Observable<any> {
    const url = environment.apiUrl + '/Requests/ApproveRequest?Req_ID=' + id;
    return this.http.put<any>(url, id, { headers: this.headers });
  }

/***    */
requestApproval(reqId: string, valid: boolean, rejectReason: string = ''): Observable<any> {
  const url = environment.apiUrl + '/ApartmentV2/RequestApproval';
  let params = new HttpParams()
    .set('Req_ID', reqId)
    .set('Valid', valid.toString());

  if (!valid) {
    params = params.set('Reject_Reason', rejectReason);
  }

  return this.http.post(url, {}, { params });
}

validatePassport(id:any,passportId: string, isValid: boolean, rejectReason: string = ''): Observable<any> {
  const body = [
    {
      passport_ID: passportId,
      is_Valid: isValid,
      reject_Reason: rejectReason
    }
  ];
  const url = environment.apiUrl + '/ApartmentV2/ValidatePassport?Req_ID=' + id;

  return this.http.post(url, body);
}

// validateSelfie(bookingId: string, guestId: string, isApproved: boolean, rejectReason: string = ''): Observable<any> {
//   const body = {
//     Booking_ID: bookingId,
//     Guest_ID: guestId,
//     Approved: isApproved,
//     Reject_Reason: rejectReason
//   };
//   const url = environment.apiUrl + '/ApartmentV2/SelfieApproval';

//   return this.http.post(url, body);
// }
validateSelfie(bookingId: string, guestId: string, isApproved: boolean, rejectReason: string = ''): Observable<any> {
  let url = `${environment.apiUrl}/ApartmentV2/SelfieApproval?Booking_ID=${bookingId}&Guest_ID=${guestId}&Approved=${isApproved}`;

  if (!isApproved && rejectReason) {
    url += `&Reject_Reason=${rejectReason}`;
  }

  return this.http.post(url, {});
}

resignContract(bookingID: string, signID: string): Observable<any> {
  const url = `${environment.apiUrl}/ApartmentV2/Ressign-Files?Booking_ID=${bookingID}&Sign_ID=${signID}`;
  return this.http.get(url);
}

/** */



  ResginContract(id: any): Observable<any> {
    const url = environment.apiUrl + '/Requests/ResignContract?Req_ID=' + id;
    return this.http.post<any>(url, id, { headers: this.headers });
  }
  CancelRequestw(id: any, reason: any): Observable<any> {
    const url =
      environment.apiUrl +
      '/Requests/CancelRequest?Req_ID=' +
      id +
      '&Reason=' +
      reason;
    return this.http.put<any>(url, reason, { headers: this.headers });
  }
  SendOffer(
    Old_Req_ID: any,
    Apt_ID: any,
    Rent_Price: any,
    Security_Deposit: any,
    Service_Fees: any
  ): Observable<any> {
    let body = {
      Old_Req_ID: Old_Req_ID,
      Apt_ID: Apt_ID,
      Rent_Price: Rent_Price,
      Security_Deposit: Security_Deposit,
      Service_Fees: Service_Fees,
    };

    const url =
      environment.apiUrl +
      '/Requests/SendOffer?Old_Req_ID=' +
      Old_Req_ID +
      '&Apt_ID=' +
      Apt_ID +
      '&Rent_Price=' +
      Rent_Price +
      '&Security_Deposit=' +
      Security_Deposit +
      '&Service_Fees=' +
      Service_Fees;
    return this.http.post<any>(url, body, { headers: this.headers });
  }

  GetContract(Req_ID: any): Observable<any> {
    const url = environment.apiUrl + '/Requests/GetContract?Req_ID=' + Req_ID;
    return this.http.get<any>(url, { headers: this.headers });
  }

  CreateAptContract(data: any): Observable<any> {
    let body = {
      req_ID: data.req_ID,
      rC_LandLord: data.rC_LandLord,
      rC_Tenant: data.rC_Tenant,
      rC_StartRent: data.rC_StartRent,
      rC_EndRent: data.rC_EndRent,
      rC_RentPrice: data.rC_RentPrice,
      rC_RentDeposit: data.rC_RentDeposit,
      contract_Sections: data.rC_Sections,
    };

    const url = environment.apiUrl + '/Requests/CreateAptContract';
    return this.http.post<any>(url, body, { headers: this.headers });
  }
  GetTerminationDetails(id: any): Observable<any> {
    const url = environment.apiUrl + '/Termination/GetTerminationDetails?Term_ID=' + id;
    return this.http.get<any>(url, { headers: this.headers });
  }
  TerminationApproval(id: any,Approval:any,Reason:any): Observable<any> {
    const url = environment.apiUrl + '/Termination/TerminationApproval?Term_ID=' + id +'&Approval='+Approval+'&Reason='+Reason;
    return this.http.put<any>(url,id, { headers: this.headers });
  }

}
