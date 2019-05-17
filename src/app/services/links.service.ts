import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { NavigationLink } from '../models/link.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  constructor(
    private apiService: ApiService
  ) { }

  public getLinks(): Observable<NavigationLink[]> {
    return this.apiService.get('links');
  }
}
