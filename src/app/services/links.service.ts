import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { NavigationLink, NavigationLinkPost } from '../models/link.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  constructor(
    private apiService: ApiService
  ) { }

  public get(id: number = null): Observable<NavigationLink[]> {
    if (id !== null) {
      return this.apiService.get(`links/${id}`);
    }
    return this.apiService.get('links');
  }

  public delete(data: NavigationLink): Observable<void> {
    return this.apiService.delete(`links/${data.id}`);
  }

  create(data: NavigationLinkPost): Observable<void> {
    return this.apiService.post(`links`, data);
  }

  update(id: number, data: NavigationLinkPost): Observable<void> {
    return this.apiService.put(`links/${id}`, data);
  }
}
