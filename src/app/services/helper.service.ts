import { Injectable } from '@angular/core';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  public number_format(number: number): string {
    return number.toLocaleString('es-ES');
  }

  public addons(t: Team): number {
    let total = 0;
    total += t.apothecary ? 50000 : 0;
    total += (t.cheerleaders + t.assistants + t.fan_factor) * 10000;
    total += t.rerolls * t.reroll_cost;
    return total;
  }
}
