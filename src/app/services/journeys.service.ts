import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Journey } from '../models/journey.model';
import { Match } from '../models/match.model';

@Injectable({
  providedIn: 'root'
})
export class JourneysService {

  constructor(
    private apiService: ApiService
  ) { }

  public getJourneys(tournament_id: number): Observable<Journey[]> {
    return this.apiService.get(`tournaments/${tournament_id}/journeys`);
  }

  public getJourney(tournament_id: number, journey: number): Observable<Match[]> {
    return this.apiService.get(`tournaments/${tournament_id}/journeys/${journey}`);
  }
}
