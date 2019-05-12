import { Race } from './race.model';
import { Coach } from './coach.model';
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
    race: Race;
    coach: Coach;
    players: Player[];
}
