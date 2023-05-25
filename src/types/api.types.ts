import { Pokemon } from './general.types';

export type PokemonsResponse = {
  count: string;
  results: Pokemon[];
};

export type PokemonResponse = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_shiny: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
};
