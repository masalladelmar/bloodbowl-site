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

  public delete(data: NavigationLink): Observable<boolean> {
    return this.apiService.delete(`links/${data.id}`);
  }

  public create(data: NavigationLinkPost): Observable<void> {
    return this.apiService.post(`links`, data);
  }

  public update(id: number, data: NavigationLinkPost): Observable<boolean> {
    return this.apiService.put(`links/${id}`, data);
  }

  public publish(id: number, published: boolean): Observable<boolean> {
    return this.apiService.patch(`links/${id}`, { published: published });
  }
}
