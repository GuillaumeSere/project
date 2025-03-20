export interface Race {
  date: string;
  circuit: string;
  country: string;
  round: number;
  session: string,
  name: string,
}

export interface Driver {
  number: number;
  firstName: string;
  lastName: string;
  team: string;
  points: number;
  headshotUrl: string;
}

export interface Team {
  name: string;
  points: number;
}