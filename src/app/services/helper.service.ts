import { Injectable } from '@angular/core';
import { Team } from '../models/team.model';
import { Player, Status } from '../models/player.model';
import { Attributes } from '../models/attributes.model';
import { SkillTypes } from '../models/skill.model';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}

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

  public thumb(archive: string): string {
    return (
      archive.substr(0, archive.lastIndexOf('.')) +
      '_thumb' +
      archive.substr(archive.lastIndexOf('.'))
    );
  }

  public playerSkills(player: Player): string {
    return player.skills
      .map(el => el.name)
      .concat(
        player.characteristics.map(el => {
          return (
            (el.modifier > 0 ? '+' : '') +
            el.modifier +
            ' ' +
            Attributes.find(ch => ch.id === el.type).name
          );
        })
      )
      .join(', ');
  }

  public getSkillType(value: string): string {
    const finded = SkillTypes.find(el => el.link === value);
    return finded.name || '';
  }

  public getAttributes() {
    return Attributes;
  }

  public getAttributeName(value: string): string {
    const finded = Attributes.find(el => el.id === value);
    return finded.name || '';
  }

  public getStatusName(value: string): string {
    return Status[value] || '';
  }
}
