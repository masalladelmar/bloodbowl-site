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
    skills: Skill[];
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
    position_id: number;
    team_id: number;
}
