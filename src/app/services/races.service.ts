import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Race, ActiveRace, PostRace } from '../models/race.model';

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

  public create(race: PostRace) {
    return this.apiService.post(`races`, race);
  }

  public update(race_id: number, race: PostRace) {
    return this.apiService.put(`races/${race_id}`, race);
  }
}
