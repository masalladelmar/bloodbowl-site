import { Skill } from './skill.model';

export interface Player {
    id: number;
    number: number;
    status: number;
    name: string;
    ma: number;
    st: number;
    ag: number;
    av: number;
    injuries: string;
    value: number;
    skills: PlayerSkill[];
    characteristics: Characteristic[];
    position_name: string;
    position_id: number;
}

export interface PostPlayer {
    number: number;
    status: number;
    name: string;
    ma: number;
    st: number;
    ag: number;
    av: number;
    injuries: string;
    value: number;
    skills: Skill[];
    characteristics: Characteristic[];
    position_id: number;
    team_id: number;
}

export interface Characteristic {
    type: string;
    modifier: number;
}

export interface PlayerSkill {
    skill_id: number;
    modifier: number;
    name: string;
}
