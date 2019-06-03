import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(
    private apiService: ApiService
  ) { }

  getTeams(): Observable<Team[]> {
    return this.apiService.get('teams');
  }

  getTeamsByTournament(tournament_id: number): Observable<Team[]> {
    return this.apiService.get(`tournaments/${tournament_id}/teams`);
  }

  getTeamsByCoach(coach_id: number): Observable<Team[]> {
    return this.apiService.get(`teams/coach/${coach_id}`);
  }

  getTeamById(id: number): Observable<Team> {
    return this.apiService.get(`teams/${id}`);
  }

  getTeam(team: string): Observable<Team> {
    return this.apiService.get(`teams/${team}`);
  }
}
