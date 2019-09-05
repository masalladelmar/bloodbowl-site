import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Skill } from '../models/skill.model';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  constructor(private apiService: ApiService) {}

  getSkills(type?: string): Observable<Skill[]> {
    return this.apiService.get('skills' + (type ? `/${type}` : ''));
  }
}
