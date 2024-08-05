export interface PokemonResponse {
  count: number;
  next: string;
  previous: null;
  results: Result[];
}

export interface Result {
  name: string;
  url: string;
}

export interface Pokemon {
  name: string;
  id: number;
  selected: boolean;
}
