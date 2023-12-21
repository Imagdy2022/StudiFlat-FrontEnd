import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class InquiresService {

  token:any=localStorage.getItem("tokenKey")
  constructor(private http: HttpClient) {
   }

   headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });
  getAllInquires( status:any ,pageNumber:any,pageSize:any,Date:any): Observable<any[]> {


    const url = environment.apiUrl+"/Requests/GetAllRequests?status="+status+"&PageNo="+pageNumber+"&PageSize="+pageSize+"&Date="+Date;
    return this.http.get<any[]>(url, {  headers: this.headers });

  }

  GetRequestDetails( id:any ): Observable<any> {
    const url = environment.apiUrl+"/Requests/GetInquiryDetails?ID="+id;
    return this.http.get<any>(url, {  headers: this.headers });
  }

  UploadReqContract( id:any,file:any ): Observable<any> {
  let  headerss = new HttpHeaders({
       'Authorization': `Bearer ${this.token}`
    });
    const url = environment.apiUrl+"/Requests/UploadReqContract?Req_ID="+id;
    return this.http.post<any>(url,file, {headers:headerss });
  }
  AddWaitingList( id:any ): Observable<any> {


    const url = environment.apiUrl+"/Requests/AddWaitingList?Req_ID="+id;
    return this.http.put<any>(url,id, {  headers: this.headers });

  }
  CancelRequest( id:any ,reason:any): Observable<any> {


    const url = environment.apiUrl+"/Requests/CancelRequest?Req_ID="+id;
    return this.http.put<any>(url,reason, {  headers: this.headers });

  }
  NewPassportsNotValidation( id:any ,Valid:any,reason:any): Observable<any> {


    const url = environment.apiUrl+"/Requests/NewPassportsValidation?P_ID="+id+"&Valid="+Valid+"&Invalid_Reason="+reason;
    return this.http.put<any>(url,Valid, {  headers: this.headers });

  }
  NewPassportsValidation( id:any ,Valid:any): Observable<any> {


    const url = environment.apiUrl+"/Requests/NewPassportsValidation?P_ID="+id+"&Valid="+Valid;
    return this.http.put<any>(url,Valid, {  headers: this.headers });

  }
  ApproveRequest( id:any ): Observable<any> {


    const url = environment.apiUrl+"/Requests/ApproveRequest?Req_ID="+id;
    return this.http.put<any>(url,id, {  headers: this.headers });

  }
  CancelRequestw( id:any,reason:any ): Observable<any> {


    const url = environment.apiUrl+"/Requests/CancelRequest?Req_ID="+id+"&Reason="+reason;
    return this.http.put<any>(url,reason, {  headers: this.headers });

  }
  SendOffer( Old_Req_ID:any,Apt_ID:any,Rent_Price:any,Security_Deposit:any ): Observable<any> {
let body={
  Old_Req_ID:Old_Req_ID,
  Apt_ID:Apt_ID,
  Rent_Price:Rent_Price,
  Security_Deposit:Security_Deposit,

};

    const url = environment.apiUrl+"/Requests/SendOffer?Old_Req_ID="+Old_Req_ID+"&Apt_ID="+Apt_ID+"&Rent_Price="+Rent_Price+"&Security_Deposit="+Security_Deposit;
    return this.http.post<any>(url,body, {  headers: this.headers });

}

  GetContract( Req_ID:any  ): Observable<any > {


    const url = environment.apiUrl+"/Requests/GetContract?Req_ID="+Req_ID  ;
    return this.http.get<any>(url, {  headers: this.headers });

  }



  CreateAptContract( data:any ): Observable<any> {
    let body={
      req_ID:data.req_ID,
      rC_LandLord:data.rC_LandLord,
      rC_Tenant:data.rC_Tenant,
      rC_StartRent:data.rC_StartRent,
      rC_EndRent:data.rC_EndRent,
      rC_RentPrice:data.rC_RentPrice,
      rC_RentDeposit:data.rC_RentDeposit,
      contract_Sections:data.rC_Sections,

    };

        const url = environment.apiUrl+"/Requests/CreateAptContract";
        return this.http.post<any>(url,body, {  headers: this.headers });

    }
}
