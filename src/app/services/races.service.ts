import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Race } from '../models/race.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RacesService {

  constructor(
    private apiService: ApiService
  ) { }

  public getRaces(): Observable<Race[]> {
    return this.apiService.get('races', new HttpParams().set('all', 'true'));
  }
}
