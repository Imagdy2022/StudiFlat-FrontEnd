import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AdminsService {
  token: any = localStorage.getItem('tokenKey');
  constructor(private http: HttpClient) {}

  // apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiVml2YS1EZXZAZ21haWwuY29tIiwianRpIjoiYWMwOWJkM2UtMzgxOS00NWVmLWE4ZDUtZWQ4ZTRkYWJhYzhhIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiI4ZDljOGM0OS0wNDZmLTQzNDEtOWQyYS0wMGNlZDkzYmZmYjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlciBBZG1pbiIsImV4cCI6MTY5ODY5OTkyNiwiaXNzIjoiaHR0cHM6Ly92aXZhcy1hcHQudGVjaCIsImF1ZCI6InZpdmFzLWFwdC50ZWNoIn0.76Ms_-De0QwDr0tS0fyw31VQSVsnEjP9C7wDAiHIr1A"

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.token}`,
  });

  getAllAdmins(): Observable<any[]> {
    const url = `${environment.apiUrl}/Admin/GetAllAdmins`;
    return this.http.get<any[]>(url, { headers: this.headers });
  }
  UpdateADminStatus(status: any, id: any): Observable<any> {
    let body = {
      status: status,
      id: id,
    };
    let url =
      environment.apiUrl +
      '/Admin/UpdateUserStatus?User_ID=' +
      id +
      '&status=' +
      status;
    return this.http.put(url, body, { headers: this.headers });
  }

  public createAdmin(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl + '/Admin/PostUser'}`, data, {
      headers: this.headers,
    });
  }
  public GetProfile(id: any): Observable<any> {
    let url = environment.apiUrl + '/Admin/GetProfile?User_ID=' + id;

    return this.http.get(url, { headers: this.headers });
  }
  UpdateUserAccount(data: any, id: any): Observable<any> {
    let body = data;
    let url = environment.apiUrl + '/Admin/UpdateUserAccount?User_ID=' + id;
    return this.http.put(url, body, { headers: this.headers });
  }
  public DeleteUser(id: any): Observable<any> {
    let url = environment.apiUrl + '/Admin/DeleteUser?User_ID=' + id;

    return this.http.delete(url, { headers: this.headers });
  }
  TenantList(
    PageNumber: number,
    PageSize: number,
    Date: any,
    search: any
  ): Observable<any> {
    const url = `${environment.apiUrl}/Users/TenantList`;
    const params = new HttpParams()
      .set('PageNo', PageNumber)
      .set('PageSize', PageSize)
      .set('Date', Date)
      .set('Key', search);

    return this.http.get<any>(url, { headers: this.headers, params: params });
  }
  public TenantDetails(id: any): Observable<any> {
    let url = environment.apiUrl + '/Users/TenantDetails?User_ID=' + id;

    return this.http.get(url, { headers: this.headers });
  }
  public GetReqHistory(id: any): Observable<any> {
    let url = environment.apiUrl + '/Apartment/GetReqHistory?Req_ID=' + id;

    return this.http.get(url, { headers: this.headers });
  }
  public GetINVDetails(id: any): Observable<any> {
    let url = environment.apiUrl + '/Accounting/GetINVDetails?Inv_ID=' + id;

    return this.http.get(url, { headers: this.headers });
  }
  DeleteTenant(id: any): Observable<any> {
    let url = environment.apiUrl + '/Users/DeleteTenant?User_ID=' + id;

    return this.http.put(url, id, { headers: this.headers });
  }
  SuspendTenant(id: any): Observable<any> {
    let url = environment.apiUrl + '/Users/SuspendTenant?User_ID=' + id;

    return this.http.put(url, id, { headers: this.headers });
  }
  UnSuspendTenant(id: any): Observable<any> {
    let url = environment.apiUrl + '/Users/UnSuspendTenant?User_ID=' + id;

    return this.http.put(url, id, { headers: this.headers });
  }
  UpdateTenantInfo(
    User_ID: any,
    FName: any,
    LName: any,
    PassportID: any,
    About: any,
    idrating: any,
    commit: any,
    image: any
  ): Observable<any> {
    const url = `${environment.apiUrl}/Users/UpdateTenantInfo`;
    const params = new HttpParams()
      .set('User_ID', User_ID)
      .set('FName', FName)
      .set('LName', LName)
      .set('PassportID', PassportID)
      .set('About', About)
      .set('Rate', idrating)
      .set('Beh_Comment', commit);

    const headers2 = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.post<any>(url, image, {
      headers: headers2,
      params: params,
    });
  }
  GetAllWorkers(PageNo: any, PageSize: any, search: any): Observable<any[]> {
    const url =
      environment.apiUrl +
      '/Workers/GetAllWorkers?PageNo=' +
      PageNo +
      '&PageSize=' +
      PageSize +
      '&search=' +
      search;
    return this.http.get<any[]>(url, { headers: this.headers });
  }
  InsertWorker(data: any): Observable<any> {
    const url = environment.apiUrl + '/Workers/InsertWorker ';
    return this.http.post<any>(url, data, { headers: this.headers });
  }
  UpdateWorker(data: any, id: any): Observable<any> {
    const url = environment.apiUrl + '/Workers/UpdateWorker?id=' + id;
    return this.http.put<any>(url, data, { headers: this.headers });
  }

  ListJobs(): Observable<any[]> {
    const url = environment.apiUrl + '/Workers/ListJobs';
    return this.http.get<any[]>(url, { headers: this.headers });
  }

  GetWorkerByid(id: any): Observable<any> {
    const url = environment.apiUrl + '/Workers/GetWorker?id=' + id;
    return this.http.get<any[]>(url, { headers: this.headers });
  }
  PostJob(data: any): Observable<any> {
    const url = environment.apiUrl + '/Workers/PostJob?JobName=' + data;
    return this.http.post<any>(url, data, { headers: this.headers });
  }
  DeleteWorker(id: any): Observable<any> {
    const url = environment.apiUrl + '/Workers/DeleteWorker?id=' + id;
    return this.http.delete<any>(url, { headers: this.headers });
  }
  ListAllIssues(
    PageNumber: number,
    PageSize: number,
    Date: any,
    search: any,
    searchkey: any
  ): Observable<any[]> {
    const url = environment.apiUrl + '/Issues/ListAllIssues';
    const params = new HttpParams()
      .set('PageNo', PageNumber)
      .set('PageSize', PageSize)
      .set('Date', Date)
      .set('search', search)
      .set('Key', searchkey);
    return this.http.get<any[]>(url, { headers: this.headers, params: params });
  }
  GetIssueDetails(id: any): Observable<any> {
    const url = environment.apiUrl + '/Issues/IssueInDetails?Issue_ID=' + id;
    return this.http.get<any>(url, { headers: this.headers });
  }
  CreateIssuePDF(id: any): Observable<any> {
    const url = environment.apiUrl + '/Basics/CreateIssuePDF?UUID=' + id;
    return this.http.get(url, { headers: this.headers, responseType: 'blob' });
  }

  AssignWorker(Issue_ID: any, idworker: any): Observable<any> {
    let body = {
      Issue_ID: Issue_ID,
      idworker: idworker,
    };
    const url =
      environment.apiUrl +
      '/Issues/AssignWorker?Issue_ID=' +
      Issue_ID +
      '&Worker_ID=' +
      idworker;
    return this.http.put<any>(url, body, { headers: this.headers });
  }
  UpdateIssue(Issue_ID: any, detialIssue: any): Observable<any> {
    let body = {
      issue_ID: Issue_ID,
      name_RingBell: detialIssue.name_RingBell,
      phone_Number: detialIssue.phone_Number,
      phone_Number2: detialIssue.phone_Number2,
      issue_Images: detialIssue.issue_Images,
      issue_Desc: detialIssue.desc,
      issue_Appt: detialIssue.appointement,
      notes: detialIssue.notes,
    };
    const url = environment.apiUrl + '/Issues/UpdateIssue';
    return this.http.put<any>(url, body, { headers: this.headers });
  }
  CancelIssue(Issue_ID: any): Observable<any> {
    let body = {
      Issue_ID: Issue_ID,
    };
    const url = environment.apiUrl + '/Issues/CancelIssue?Issue_ID=' + Issue_ID;
    return this.http.put<any>(url, body, { headers: this.headers });
  }
  MarkAsSolved(
    Issue_ID: any,
    issue_CostBy: any,
    worker_Gain: any,
    issue_Cost: any,
    company_Gain: any,
    solve_Desc: any,
    item_Cost: any,
    item_attach: any
  ): Observable<any> {
    let body = {
      issue_ID: Issue_ID,
      item_Cost: item_Cost,
      issue_CostBy: issue_CostBy,
      issue_Cost: issue_Cost,
      worker_Gain: worker_Gain,
      company_Gain: company_Gain,
      solve_Desc: solve_Desc,
      invoice_URL: item_attach,
    };

    const url = environment.apiUrl + '/Issues/MarkAsSolved';
    return this.http.put<any>(url, body, { headers: this.headers });
  }
  MarkasProgress(Issue_ID: any, Apointment: any): Observable<any> {
    let body = {
      Issue_ID: Issue_ID,
      Apointment: Apointment,
    };
    const url =
      environment.apiUrl +
      '/Issues/MarkasProgress?Issue_ID=' +
      Issue_ID +
      '&Apointment=' +
      Apointment;
    return this.http.put<any>(url, body, { headers: this.headers });
  }
  NewAppointment(Issue_ID: any, Apointment: any): Observable<any> {
    let body = {
      Issue_ID: Issue_ID,
      Apointment: Apointment,
    };
    const url =
      environment.apiUrl +
      '/Issues/NewAppointment?Issue_ID=' +
      Issue_ID +
      '&Apointment=' +
      Apointment;
    return this.http.put<any>(url, body, { headers: this.headers });
  }

  ListPartners(
    PageNumber: number,
    PageSize: number,
    Date: any,
    searchtext: any
  ): Observable<any> {
    const url = environment.apiUrl + '/Partners/ListPartners';
    const params = new HttpParams()
      .set('PageNo', PageNumber)
      .set('PageSize', PageSize)
      .set('Date', Date)
      .set('Key', searchtext);

    return this.http.get<any>(url, { headers: this.headers, params: params });
  }
  GetFAQ(): Observable<any> {
    const url = environment.apiUrl + '/Basics/GetFAQ';

    return this.http.get<any>(url, { headers: this.headers });
  }

  GetMsgs(PageNumber: number, PageSize: number): Observable<any> {
    const url = environment.apiUrl + '/Various/AppMsgs';
    const params = new HttpParams()
      .set('PageNumber', PageNumber)
      .set('PageSize', PageSize);
    return this.http.get<any>(url, { headers: this.headers, params: params });
  }
  GetPushMsgs(PageNumber: number, PageSize: number): Observable<any> {
    const url = environment.apiUrl + '/Various/GetPushMsgs';
    const params = new HttpParams()
      .set('PageNumber', PageNumber)
      .set('PageSize', PageSize);
    return this.http.get<any>(url, { headers: this.headers, params: params });
  }
  GetAppUsers(): Observable<any> {
    const url = environment.apiUrl + '/Various/AppUsers';

    return this.http.get<any>(url, { headers: this.headers });
  }
  SendNotification(
    User_ID: any,
    Msg_Title: any,
    Msg_Body: any
  ): Observable<any[]> {
    const url = environment.apiUrl + '/Various/SendNotification';
    const params = new HttpParams()
      .set('User_ID', User_ID)
      .set('Msg_Title', Msg_Title)
      .set('Msg_Body', Msg_Body);

    return this.http.post<any>(url, User_ID, {
      headers: this.headers,
      params: params,
    });
  }
  EditMsgs(Msg_ID: any, Msg_EN: any, Msg_De: any): Observable<any[]> {
    const url = environment.apiUrl + '/Various/EditMsgs';
    const params = new HttpParams()
      .set('Msg_ID', Msg_ID)
      .set('Msg_EN', Msg_EN)
      .set('Msg_De', Msg_De);

    return this.http.put<any>(url, Msg_ID, {
      headers: this.headers,
      params: params,
    });
  }

  UpdateFAQ(Faq_ID: any, Qest: any, Answ: any): Observable<any[]> {
    const url = environment.apiUrl + '/Basics/UpdateFAQ';
    const params = new HttpParams()
      .set('Faq_ID', Faq_ID)
      .set('Qest', Qest)
      .set('Answ', Answ);

    return this.http.put<any>(url, Faq_ID, {
      headers: this.headers,
      params: params,
    });
  }

  CreateFAQ(Qest: any, Answ: any): Observable<any[]> {
    const url = environment.apiUrl + '/Basics/CreateFAQ';
    const params = new HttpParams().set('Qest', Qest).set('Answ', Answ);

    return this.http.post<any>(url, params, {
      headers: this.headers,
      params: params,
    });
  }

  DeleteFAQ(Faq_ID: any): Observable<any[]> {
    const url = environment.apiUrl + '/Basics/DeleteFAQ';
    const params = new HttpParams().set('Faq_ID', Faq_ID);
    return this.http.delete<any>(url, {
      headers: this.headers,
      params: params,
    });
  }
  GetAds(): Observable<any> {
    const url = environment.apiUrl + '/Basics/GetAds';

    return this.http.get<any>(url, { headers: this.headers });
  }

  GetAppConfig(): Observable<any> {
    const url = environment.apiUrl + '/Basics/GetAppConfig';

    return this.http.get<any>(url, { headers: this.headers });
  }

  AddConfig(data: any): Observable<any[]> {
    const url = environment.apiUrl + '/Basics/AddConfig';

    return this.http.post<any>(url, data, { headers: this.headers });
  }

  UpdateAds(
    Ads_ID: any,
    URL: any,
    Button_Name: any,
    Photo_Attach: any
  ): Observable<any[]> {
    const headers1 = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    const url = environment.apiUrl + '/Basics/UpdateAds';
    const params = new HttpParams()
      .set('Ads_ID', Ads_ID)
      .set('URL', URL)
      .set('Button_Name', Button_Name);

    return this.http.put<any>(url, Photo_Attach, {
      headers: headers1,
      params: params,
    });
  }

  CreateAds(URL: any, Button_Name: any, Photo_Attach: any): Observable<any> {
    const url =
      environment.apiUrl +
      '/Basics/CreateAds?URL=' +
      URL +
      '&Button_Name=' +
      Button_Name;
    const headers1 = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.post<any>(url, Photo_Attach, { headers: headers1 });
  }
  AddAttach(User_ID: any, Desc: any, AttachFile: any): Observable<any> {
    const url =
      environment.apiUrl +
      '/Users/AddAttach?User_ID=' +
      User_ID +
      '&Desc=' +
      Desc;
    const headers1 = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.post<any>(url, AttachFile, { headers: headers1 });
  }
  DeleteAds(Ads_ID: any): Observable<any[]> {
    const url = environment.apiUrl + '/Basics/DeleteAds';
    const params = new HttpParams().set('Ads_ID', Ads_ID);
    return this.http.delete<any>(url, {
      headers: this.headers,
      params: params,
    });
  }
  PostPartner(data: any): Observable<any> {
    const url = environment.apiUrl + '/Partners/PostPartner';
    return this.http.post<any>(url, data, { headers: this.headers });
  }
  UpdatePartner(data: any, id: any): Observable<any> {
    const url = environment.apiUrl + '/Partners/UpdatePartner?id=' + id;
    return this.http.put<any>(url, data, { headers: this.headers });
  }
  DeletePartners(id: any): Observable<any> {
    const url = environment.apiUrl + '/Partners/DeletePartners?id=' + id;
    return this.http.delete<any>(url, { headers: this.headers });
  }
  GetPartnerProfile(id: any): Observable<any> {
    const url = environment.apiUrl + '/Partners/GetPartnerProfile?id=' + id;
    return this.http.get<any>(url, { headers: this.headers });
  }
  PartnerProfile(id: any): Observable<any> {
    const url =
      environment.apiUrl + '/Partners/PartnerProfile?Partner_ID=' + id;
    return this.http.get<any>(url, { headers: this.headers });
  }
  GetCountries(): Observable<any> {
    const url = environment.apiUrl + '/Partners/GetCountries';
    return this.http.get<any>(url, { headers: this.headers });
  }
  GetAgencyCode() {
    var headers2 = new HttpHeaders({
      responseType: 'text',
      Authorization: `Bearer ${this.token}`,
    });
    const url = environment.apiUrl + '/Partners/GetAgencyCode';
    return this.http.get(url, { headers: headers2, responseType: 'text' });
  }
  ListAllInvoices(
    type: any,
    PageNumber: number,
    PageSize: number,
    searchtext: any
  ): Observable<any[]> {
    const url = environment.apiUrl + '/Accounting/ListAllInvoices';
    const params = new HttpParams()
      .set('PageNum', PageNumber)
      .set('PageSize', PageSize)
      .set('Type', type)
      .set('Key', searchtext);

    return this.http.get<any[]>(url, { headers: this.headers, params: params });
  }
  MarkPaid(id: any): Observable<any> {
    const url = environment.apiUrl + '/Accounting/MarkPaid?Inv_ID=' + id;
    return this.http.put<any>(url, id, { headers: this.headers });
  }
  AllTickets(
    type: any,
    PageNumber: number,
    PageSize: number,
    searchtext: any
  ): Observable<any[]> {
    const url = environment.apiUrl + '/Tickets/AllTickets';
    const params = new HttpParams()
      .set('PageNum', PageNumber)
      .set('PageSize', PageSize)
      .set('Type', type)
      .set('Key', searchtext);

    return this.http.get<any[]>(url, { headers: this.headers, params: params });
  }
  GetAllEmp(PageNumber: number, PageSize: number): Observable<any[]> {
    const url = environment.apiUrl + '/Tickets/GetAllEmp';
    const params = new HttpParams()
      .set('PageNum', PageNumber)
      .set('PageSize', PageSize);

    return this.http.get<any[]>(url, { headers: this.headers, params: params });
  }
  AssignTicket(Ticket_ID: any, User_ID: any): Observable<any> {
    let body = {
      Ticket_ID: Ticket_ID,
      User_ID: User_ID,
    };
    const url =
      environment.apiUrl +
      '/Tickets/AssignTicket?Ticket_ID=' +
      Ticket_ID +
      '&User_ID=' +
      User_ID;
    return this.http.put<any>(url, body, { headers: this.headers });
  }
  GetTicketDetails(Ticket_ID: any): Observable<any> {
    const url = environment.apiUrl + '/Tickets/GetTicketDetails';
    const params = new HttpParams().set('Ticket_ID', Ticket_ID);

    return this.http.get<any>(url, { headers: this.headers, params: params });
  }
  ReplyDash(Ticket_ID: any, reply_Desc: any, attach: any): Observable<any> {
    const url = environment.apiUrl + '/Tickets/ReplyDash';
    let body = {
      Ticket_ID: Ticket_ID,
      reply_Desc: reply_Desc,
      attach: attach,
    };

    return this.http.post<any>(url, body, { headers: this.headers });
  }
  CloseTicket(Ticket_ID: any, Status: any): Observable<any> {
    const url =
      environment.apiUrl +
      '/Tickets/CloseTicket?Ticket_ID=' +
      Ticket_ID +
      '&Status=' +
      Status;
    const params = new HttpParams()
      .set('Ticket_ID', Ticket_ID)
      .set('Status', Status);

    return this.http.put<any>(url, Ticket_ID, { headers: this.headers });
  }
  GetBookingHistory(
    Apt_ID: any,
    PageNo: number,
    PageSize: number,
    SearchKey: any
  ): Observable<any[]> {
    const url = environment.apiUrl + '/Apartment/GetBookingHistory';
    const params = new HttpParams()
      .set('PageNo', PageNo)
      .set('PageSize', PageSize)
      .set('SearchKey', SearchKey)
      .set('Apt_ID', Apt_ID);

    return this.http.get<any[]>(url, { headers: this.headers, params: params });
  }
  PushNotification(): Observable<any[]> {
    const url = environment.apiUrl + '/PushNotification/NotiList';

    return this.http.get<any[]>(url, { headers: this.headers });
  }
  PushNotificationCount(): Observable<any[]> {
    const url = environment.apiUrl + '/PushNotification/NotiCount';

    return this.http.get<any[]>(url, { headers: this.headers });
  }

  MarkPushRead(id: any): Observable<any> {
    const url =
      environment.apiUrl + '/PushNotification/MarkRead?Alert_ID=' + id;
    return this.http.put<any>(url, id, { headers: this.headers });
  }
  MarkPushUnRead(id: any): Observable<any> {
    const url =
      environment.apiUrl + '/PushNotification/MarkUnRead?Alert_ID=' + id;
    return this.http.put<any>(url, id, { headers: this.headers });
  }
  MarkAllRead(): Observable<any> {
    const url = environment.apiUrl + '/PushNotification/MarkAllRead';
    return this.http.put<any>(url, null, { headers: this.headers });
  }
}
