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

  get_teams(): Observable<Team[]> {
    return this.apiService.get('teams');
  }

  get_tournament_teams(tournament_name: string): Observable<Team[]> {
    return this.apiService.get('tournament_teams', new HttpParams().set('tournament_name', tournament_name));
  }

  get_by_id(id: number): Observable<Team> {
    return this.apiService.get('team', new HttpParams().set('id', id.toString()));
  }

  get(name: string): Observable<Team> {
    return this.apiService.get('team', new HttpParams().set('name', name));
  }
}
