import { Injectable } from '@angular/core';
import { Match } from '../models/match.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PlayoffsService {

  constructor(
    private apiService: ApiService
  ) { }

  getMatches(tournament_id: number): Observable<Match[]> {
    return this.apiService.get(`tournaments/${tournament_id}/playoffs`);
  }

  getMatch(tournament_id: number, match_id: number): Observable<Match> {
    return this.apiService.get(`tournaments/${tournament_id}/playoffs/${match_id}`);
  }
}
