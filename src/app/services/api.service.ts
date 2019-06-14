import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  auth_token: string;

  constructor(
    private http: HttpClient
  ) {
    this.auth_token = localStorage.getItem('apiToken');
  }

  put(method: string,
    body: Object = {},
    header: HttpHeaders = new HttpHeaders()): Observable<any> {
      if (this.auth_token) {
        header = header.append('Authorization', this.auth_token);
      }
      header = header.append('Content-Type', 'application/json');
    return this.http.put(environment.api_uri + method, JSON.stringify(body), { headers: header }).pipe(
      catchError(this.handleError)
    );
  }

  post(method: string,
    body: Object = {},
    header: HttpHeaders = new HttpHeaders()): Observable<any> {
      if (this.auth_token) {
        header = header.append('Authorization', this.auth_token);
      }
      header = header.append('Content-Type', 'application/json');
    return this.http.post(environment.api_uri + method, JSON.stringify(body), { headers: header }).pipe(
      catchError(this.handleError)
    );
  }

  get(method: string,
    params: HttpParams = new HttpParams(),
    header: HttpHeaders = new HttpHeaders()): Observable<any> {
      if (this.auth_token) {
        header = header.append('Authorization', this.auth_token);
      }
      header = header.append('Content-Type', 'application/json');
    return this.http.get(environment.api_uri + method, { headers: header, params: params }).pipe(
      catchError(this.handleError)
    );
  }

  delete(method: string,
    header: HttpHeaders = new HttpHeaders()): Observable<any> {
      if (this.auth_token) {
        header = header.append('Authorization', this.auth_token);
      }
      header = header.append('Content-Type', 'application/json');
    return this.http.delete(environment.api_uri + method, { headers: header }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: Response | any) {
    return throwError(error);
  }
}
