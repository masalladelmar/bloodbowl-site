import { Skill } from './skill.model';

export interface Player {
    id: number;
    number: number;
    state: number;
    name: string;
    ma: number;
    st: number;
    ag: number;
    av: number;
    injuries: string;
    value: number;
    skills: Skill[];
}
