import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Match } from '../models/match.model';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  constructor(
    private apiService: ApiService
  ) { }

  public getMatchesTeamTournament(tournament_id: number, team_id: number): Observable<Match[]> {
    return this.apiService.get(`tournaments/${tournament_id}/teams/${team_id}/matches`);
  }

  public getMatchesTournament(tournament_id: number): Observable<Match[]> {
    return this.apiService.get(`tournaments/${tournament_id}/matches`);
  }

  public getMatch(tournament_id: number, match_id: number): Observable<Match> {
    return this.apiService.get(`tournaments/${tournament_id}/matches/${match_id}`);
  }
}
