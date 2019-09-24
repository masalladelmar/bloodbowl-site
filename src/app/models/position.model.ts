export interface Position {
  limit: number;
  name: string;
  ma: number;
  st: number;
  ag: number;
  av: number;
  skills: PositionSkill[];
  skills_dep: string;
  normal: string;
  doubles: string;
  price: number;
  id: number;
  order: number;
}

export interface PostPosition {
  limit: number;
  name: string;
  ma: number;
  st: number;
  ag: number;
  av: number;
  skills: string;
  normal: string;
  doubles: string;
  price: number;
  race_id: number;
}

export interface PositionSkill {
  position_id: number;
  skill_id: number;
  name: string;
}
