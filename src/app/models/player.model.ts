export interface Player {
  id: number;
  number: number;
  status: string;
  name: string;
  ma: number;
  st: number;
  ag: number;
  av: number;
  injuries: string;
  value: number;
  skills: PlayerSkill[];
  modifiers: Modifier[];
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
  value: number;
}

export interface Modifier {
  type: string;
  modifier: number;
  id: number;
}

export interface PlayerSkill {
  skill_id: number;
  modifier: number;
  name: string;
}

export const Status = {
  active: 'Activo',
  fired: 'Despedido',
  dead: 'Muerto',
};
