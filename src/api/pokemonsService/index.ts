import { Pokemon, PokemonResponse, PokemonsResponse } from '@/types';
import { Params } from '../../utils/prepareUrlParams';
import { prepareUrlParams } from '../../utils/prepareUrlParams';
import { Axios } from '../axios';

class PokemonsService extends Axios {
  pathname = 'pokemon';

  fetchPokemons = async (params: Params): Promise<Pokemon[]> => {
    const pokemons = await this.get<PokemonsResponse>(
      `${this.pathname}?${prepareUrlParams(params)}`
    );

    return pokemons.results;
  };

  fetchPokemon = async (id: string): Promise<PokemonResponse> =>
    this.get<PokemonResponse>(`${this.pathname}/${id}`);
}

export const pokemonsService = new PokemonsService();
