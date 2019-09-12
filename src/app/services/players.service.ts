import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Player, PostPlayer } from '../models/player.model';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  constructor(private apiService: ApiService) {}

  getDead(): Observable<Player[]> {
    return this.apiService.get(`players/dead`);
  }

  getFamous(): Observable<any> {
    return this.apiService.get(`players/famous`);
  }

  getTeamPlayers(team_id: number): Observable<Player[]> {
    return this.apiService.get(`teams/${team_id}/players`);
  }

  create(player: PostPlayer): Observable<void> {
    return this.apiService.post(`players`, player);
  }

  update(player_id: number, player: PostPlayer): Observable<void> {
    return this.apiService.put(`players/${player_id}`, player);
  }

  kill(player_id: number): Observable<void> {
    return this.apiService.put(`players/${player_id}/kill`);
  }

  fire(player_id: number): Observable<void> {
    return this.apiService.put(`players/${player_id}/fire`);
  }

  newSkill(
    player_id: number,
    skill_id: number,
    money_modifier: number
  ): Observable<void> {
    return this.apiService.post(`players/${player_id}/skills`, {
      skill_id: skill_id,
      money_modifier: money_modifier,
    });
  }

  deleteSkill(player_id: number, skill_id: number): Observable<void> {
    return this.apiService.delete(`players/${player_id}/skills/${skill_id}`);
  }

  newModifier(player_id: number, type: string, modifier: number): Observable<number> {
    return this.apiService.post(`players/${player_id}/modifiers`, {
      type: type,
      modifier: modifier,
    });
  }

  deleteModifier(player_id: number, modifier_id: number): Observable<void> {
    return this.apiService.delete(`players/${player_id}/modifiers/${modifier_id}`);
  }
}
