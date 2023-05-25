import PokemonsSearch from './components/PokemonsSearch/PokemonsSearch';

const Pokemons = (): JSX.Element => {
  return (
    <>
      <h1 data-qa="header">Choose your Pokemon!!!</h1>
      <PokemonsSearch />
    </>
  );
};

export default Pokemons;
