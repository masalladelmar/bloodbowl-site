import { Player } from './player.model';

export interface Team {
    id: number;
    name: string;
    permalink: string;
    rerolls: number;
    reroll_cost: number;
    fan_factor: number;
    assistants: number;
    cheerleaders: number;
    apothecary: boolean;
    treasury: number;
    value: number;
    race_id: number;
    race_name: string;
    coach_id: number;
    coach_name: string;
    players: Player[];
    players_count: number;
    players_value: number;
}
