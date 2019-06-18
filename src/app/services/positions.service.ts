import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Position, PostPosition } from '../models/position.model';

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

  order(order: any): Observable<void> {
    return this.apiService.put(`positions/order`, order);
  }

  create(position: PostPosition): Observable<void> {
    return this.apiService.post(`positions`, position);
  }

  update(position_id: number, position: PostPosition): Observable<void> {
    return this.apiService.put(`positions/${position_id}`, position);
  }
}
