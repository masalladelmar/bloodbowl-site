export interface Skill {
    id: number;
    name: string;
    name_en: string;
    description: string;
    type: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    createdBy: number;
    updatedBy: number;
    deletedBy: number;
}

export interface SkillType {
    name: string;
    link: string;
    type: number;
    short: string;
}
