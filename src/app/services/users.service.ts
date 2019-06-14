import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private apiService: ApiService
  ) { }

  verifyUser(id_token: string): Observable<string> {
    return this.apiService.post(`verify-user`, {id_token: id_token});
  }
}
