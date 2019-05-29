import { Player } from './player.model';

export interface Team {
    id: number;
    name: string;
    permalink: string;
    re_rolls: number;
    fan_factor: number;
    assistants: number;
    cheerleaders: number;
    apothecary: boolean;
    treasury: number;
    value: number;
    race_id: number;
    coach_id: number;
    players: Player[];
}
