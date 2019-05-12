import { Skill } from './skill.model';

export interface Player {
    id: number;
    dorsal: number;
    state: number;
    name: string;
    movement: number;
    strength: number;
    agility: number;
    armour: number;
    injured: boolean;
    value: number;
    skills: Skill[];
}
