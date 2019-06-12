import { Team } from './team.model';

export interface Coach {
    id: number;
    name: string;
    permalink: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    created_by: number;
    updated_by: number;
    deleted_by: number;
    teams: Team[];
}

export interface ActiveCoach {
    coach_id: number;
}
