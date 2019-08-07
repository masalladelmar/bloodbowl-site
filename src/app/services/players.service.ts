import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Player, PostPlayer } from '../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(
    private apiService: ApiService
  ) { }

  getDead(): Observable<Player[]> {
    return this.apiService.get(`players/dead`);
  }

  getFamous(): Observable<any> {
    return this.apiService.get(`players/famous`);
  }

  getTeamPlayers(team_id: number): Observable<Player[]> {
    return this.apiService.get(`players/${team_id}`);
  }

  create(player: PostPlayer): Observable<void> {
    return this.apiService.post(`players`, player);
  }

  update(player_id: number, player: PostPlayer): Observable<void> {
    return this.apiService.put(`players/${player_id}`, player);
  }
}
