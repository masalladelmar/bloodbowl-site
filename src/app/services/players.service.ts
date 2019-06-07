import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Player } from '../models/player.model';

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
}
