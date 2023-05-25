import { pokemonsService } from '@/api';
import { Breadcrumbs, Spinner } from '@/components';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Params } from './Pokemon.types';
import PokemonCard from './components/PokemonCard/PokemonCard';

const Pokemon = (): JSX.Element => {
  const { id } = useParams<Params>();
  const { isLoading } = useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => pokemonsService.fetchPokemon(id!),
  });

  return (
    <>
      <Breadcrumbs />
      {isLoading ? <Spinner /> : <PokemonCard />}
    </>
  );
};

export default Pokemon;
