import { createSetup } from '../../../testing';
import Pokemons from './Pokemons';

const setup = createSetup({
  Component: Pokemons,
  extraNodes: container => ({
    header: container.queryByTestId('header'),
    pokemonsSearch: container.queryByTestId('pokemons-search'),
  }),
});

describe('<Pokemons />', () => {
  it('should render', () => {
    const { container } = setup();

    expect(container).toBeDefined();
  });

  it('should display header', () => {
    const { header } = setup();

    expect(header).toHaveTextContent('Choose your Pokemon!!!');
  });

  it('should render pokemons search', () => {
    const { pokemonsSearch } = setup();

    expect(pokemonsSearch).toBeInTheDocument();
  });
});
