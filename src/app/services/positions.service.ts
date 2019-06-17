import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Position } from '../models/position.model';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {

  constructor(
    private apiService: ApiService
  ) { }

  getPositions(race_id: number): Observable<Position[]> {
    return this.apiService.get(`positions/${race_id}`);
  }

  delete(position: Position): Observable<void> {
    return this.apiService.delete(`positions/${position.id}`);
  }
}
