import { Injectable } from '@angular/core';
import { Team } from '../models/team.model';
import { Player, Status } from '../models/player.model';
import { Attributes, Attribute } from '../models/attributes.model';
import { SkillTypes } from '../models/skill.model';
import { Position } from '../models/position.model';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() { }

  /**
   * @param number int number
   * @return string number formated in spanish
   */
  public number_format(number: number): string {
    return number.toLocaleString('es-ES');
  }

  /**
   * @param t team object
   * @return sum of team's addons multiplied by the modifiers
   */
  public addons(t: Team): number {
    let total = 0;
    total += t.apothecary ? 50000 : 0;
    total += (t.cheerleaders + t.assistants + t.fan_factor) * 10000;
    total += t.rerolls * t.reroll_cost;
    return total;
  }

  /**
   * @param archive filename of the image
   * @return filename of thumbnail
   */
  public thumb(archive: string): string {
    return (
      archive.substr(0, archive.lastIndexOf('.')) +
      '_thumb' +
      archive.substr(archive.lastIndexOf('.'))
    );
  }

  /**
   * @param player object
   * @return string with the skills and attributes changes of the player
   */
  public playerSkills(player: Player): string {
    return player.skills
      .map(el => el.name)
      .concat(
        player.modifiers.map(el => {
          return (
            (el.modifier > 0 ? '+' : '') +
            el.modifier +
            ' ' +
            this.getAttributeName(el.type)
          );
        })
      )
      .join(', ');
  }

  /**
   * @param position object
   * @return string with skills concatenated
   */
  public positionSkills(position: Position) {
    return position.skills.map(el => el.name).join(', ');
  }

  /**
   * @param value skill type name
   * @return string skill name
   */
  public getSkillType(value: string): string {
    const finded = SkillTypes.find(el => el.link === value);
    return finded ? finded.name : '';
  }

  /**
   * @return list of types of attributes
   */
  public getAttributes(): Attribute[] {
    return Attributes;
  }

  /**
   * @param value attribute short name
   * @return string attribute name
   */
  public getAttributeName(value: string): string {
    const finded = Attributes.find(el => el.id === value);
    return finded ? finded.name : '';
  }

  /**
   * @param value status short name
   * @return string status name
   */
  public getStatusName(value: string): string {
    return Status[value] || '';
  }
}
