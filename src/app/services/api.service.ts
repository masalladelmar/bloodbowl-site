import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) { }

  put(
    method: string,
    body: Object = {},
    header: HttpHeaders = new HttpHeaders()
  ): Observable<boolean> {
    return this.http
      .put(environment.api_uri + method, JSON.stringify(body), { headers: header })
      .pipe(map(() => true))
      .pipe(catchError(this.handleError));
  }

  post(
    method: string,
    body: Object = {},
    header: HttpHeaders = new HttpHeaders()
  ): Observable<any> {
    return this.http
      .post(environment.api_uri + method, JSON.stringify(body), { headers: header })
      .pipe(catchError(this.handleError));
  }

  patch(
    method: string,
    body: Object = {},
    header: HttpHeaders = new HttpHeaders()
  ): Observable<boolean> {
    return this.http
      .patch(environment.api_uri + method, JSON.stringify(body), { headers: header })
      .pipe(map(() => true))
      .pipe(catchError(this.handleError));
  }

  get(
    method: string,
    params: HttpParams = new HttpParams(),
    headers: HttpHeaders = new HttpHeaders()
  ): Observable<any> {
    return this.http
      .get(environment.api_uri + method, { headers, params })
      .pipe(catchError(this.handleError));
  }

  delete(method: string, header: HttpHeaders = new HttpHeaders()): Observable<boolean> {
    return this.http
      .delete(environment.api_uri + method, { headers: header })
      .pipe(map(() => true))
      .pipe(catchError(this.handleError));
  }

  private handleError(error: Response | any) {
    return throwError(error);
  }
}
