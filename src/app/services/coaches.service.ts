import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coach, ActiveCoach } from '../models/coach.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CoachesService {

  constructor(
    private apiService: ApiService
  ) { }

  getCoaches(): Observable<Coach[]> {
    return this.apiService.get('coaches');
  }

  getCoach(coach: string): Observable<Coach> {
    return this.apiService.get(`coaches/${coach}`);
  }

  getActiveCoaches(): Observable<ActiveCoach[]> {
    return this.apiService.get(`active-coaches`);
  }

  create(name: string): Observable<void> {
    return this.apiService.post(`coaches`, {name: name});
  }

  update(name: string, id: number): Observable<void> {
    return this.apiService.put(`coaches/${id}`, {name: name});
  }

  delete(id: number): Observable<void> {
    return this.apiService.delete(`coaches/${id}`);
  }
}
