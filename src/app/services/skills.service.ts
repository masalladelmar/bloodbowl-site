import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Skill, SkillType } from '../models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(
    private apiService: ApiService
  ) { }

  getSkills(type: string): Observable<Skill[]> {
    return this.apiService.get(`skills/${type}`);
  }

  getTypes(): Observable<SkillType[]> {
    return this.apiService.get(`skills/types`);
  }
}
