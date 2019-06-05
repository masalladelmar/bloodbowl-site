import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Tournament } from '../models/tournament.model';

@Injectable({
  providedIn: 'root'
})
export class TournamentsService {

  constructor(
    private apiService: ApiService
  ) { }

  getTournaments(): Observable<Tournament[]> {
    return this.apiService.get('tournaments');
  }

  getTournament(permalink: string): Observable<Tournament> {
    return this.apiService.get(`tournaments/${permalink}`);
  }

  getStats(tournament_id: number): Observable<any[]> {
    return this.apiService.get(`tournaments/${tournament_id}/stats`);
  }

  getRanking(tournament_id: number): Observable<any[]> {
    return this.apiService.get(`tournaments/${tournament_id}/ranking`);
  }

  getExperience(tournament_id: number): Observable<any> {
    return this.apiService.get(`tournaments/${tournament_id}/experience`);
  }
}
