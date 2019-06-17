import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Race, ActiveRace } from '../models/race.model';

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

  public getRace(race: string): Observable<Race> {
    return this.apiService.get(`races/${race}`);
  }

  public delete(race_id: number) {
    return this.apiService.delete(`races/${race_id}`);
  }
}
