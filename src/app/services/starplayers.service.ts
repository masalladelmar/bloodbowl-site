import { Injectable } from '@angular/core';
import { StarPlayer } from '../models/starplayer.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StarplayersService {

  constructor(
    private apiService: ApiService
  ) { }

  getRaceStarPlayers(race_id: number): Observable<StarPlayer[]> {
    return this.apiService.get(`star-players/${race_id}`);
  }
}
