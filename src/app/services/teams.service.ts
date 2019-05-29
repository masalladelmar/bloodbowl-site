import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Team } from '../models/team.model';
import { HttpParams } from '@angular/common/http';

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

  getTournamentTeams(tournament_name: string): Observable<Team[]> {
    return this.apiService.get('tournament_teams', new HttpParams().set('tournament_name', tournament_name));
  }

  getTeamById(id: number): Observable<Team> {
    return this.apiService.get('team', new HttpParams().set('id', id.toString()));
  }

  getTeam(name: string): Observable<Team> {
    return this.apiService.get('team', new HttpParams().set('name', name));
  }
}
