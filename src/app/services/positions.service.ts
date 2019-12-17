import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Position, PostPosition } from '../models/position.model';

@Injectable({
  providedIn: 'root',
})
export class PositionsService {
  constructor(private apiService: ApiService) { }

  getAll(race_id: number): Observable<Position[]> {
    return this.apiService.get(`positions/${race_id}`);
  }

  delete(position: Position): Observable<boolean> {
    return this.apiService.delete(`positions/${position.id}`);
  }

  create(position: PostPosition): Observable<void> {
    return this.apiService.post(`positions`, position);
  }

  update(position_id: number, position: PostPosition): Observable<boolean> {
    return this.apiService.put(`positions/${position_id}`, position);
  }

  newSkill(position_id: number, skill_id: number): Observable<void> {
    return this.apiService.post(`positions/${position_id}/skills`, {
      skill_id: skill_id,
    });
  }

  deleteSkill(position_id: number, skill_id: number): Observable<boolean> {
    return this.apiService.delete(`positions/${position_id}/skills/${skill_id}`);
  }

  public order(race_id: number, order: any): Observable<boolean> {
    return this.apiService.put(`races/${race_id}/positions/order`, order);
  }
}
