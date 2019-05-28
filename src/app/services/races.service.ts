import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Race } from '../models/race.model';

@Injectable({
  providedIn: 'root'
})
export class RacesService {

  constructor(
    private apiService: ApiService
  ) { }

  public getRaces(): Observable<Race[]> {
    return this.apiService.get('races');
  }

  getRace(race: string): Observable<Race> {
    return this.apiService.get(`races/${race}`);
  }
}
