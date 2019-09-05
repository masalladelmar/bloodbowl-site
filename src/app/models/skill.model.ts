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
  short: string;
}

export const SkillTypes: SkillType[] = [
  {
    link: 'general',
    name: 'Habilidades generales',
    short: 'Generales',
  },
  { link: 'passing', name: 'Habilidades de pase', short: 'Pase' },
  { link: 'agility', name: 'Habilidades de agilidad', short: 'Agilidad' },
  { link: 'strength', name: 'Habilidades de fuerza', short: 'Fuerza' },
  { link: 'mutation', name: 'Mutaciones', short: 'Mutaciones' },
  {
    link: 'extraordinary',
    name: 'Habilidades extraordinarias',
    short: 'Extraordinarias',
  },
];
