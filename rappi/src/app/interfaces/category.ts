export interface ICategory {
  id: number;
  name: string;
  sublevels: Level[];
}

 export interface Level {
  id: number;
  name: string;
  sublevels?: Level[];
}
