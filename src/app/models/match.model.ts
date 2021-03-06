import { Post } from './post.model';

export interface Match {
    id: number;
    tournament_id: number;
    team_id_1: number;
    team_name_1: string;
    team_id_2: number;
    team_name_2: string;
    journey: number;
    updated: boolean;
    tournament_group: string;
    fans: number;
    notes: string;
    cas: number;
    td_1: number;
    td_2: number;
    cas_1: number;
    cas_2: number;
    winnings_1: number;
    winnings_2: number;
    points_1: number;
    points_2: number;
    ff_modifier_1: number;
    ff_modifier_2: number;
    not_showed_1: number;
    not_showed_2: number;
    posts: Post[];
    created_at: string;
    updated_at: string;
    deleted_at: string;
    created_by: number;
    updated_by: number;
    deleted_by: number;
    phase: number;
    tournament: string;
    tournament_permalink: string;
}
