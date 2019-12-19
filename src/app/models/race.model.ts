export interface Race {
    id: number;
    name: string;
    permalink: string;
    reroll_cost: number;
    description: string;
    coat_arms: string;
    apothecary: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    created_by: number;
    updated_by: number;
    deleted_by: number;
}

export interface ActiveRace {
    race_id: number;
}

export interface PostRace {
    name: string;
    reroll_cost: number;
    description: string;
    coat_arms: string | ArrayBuffer;
    apothecary: boolean;
}
