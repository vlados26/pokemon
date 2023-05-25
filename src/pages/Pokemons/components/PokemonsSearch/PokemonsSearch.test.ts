import { waitFor } from '@testing-library/dom';
import { createSetup } from '../../../../../testing';
import PokemonsSearch from './PokemonsSearch';
import * as apiModule from '@/api';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { getIdFromURL } from './utils/utils';

const mockNavigate = jest.fn();

jest.mock('@/api');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));
jest.useFakeTimers();

const MOCK_RESPONSE = [
  {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
  },
  {
    name: 'ivysaur',
    url: 'https://pokeapi.co/api/v2/pokemon/2/',
  },
];

(apiModule.pokemonsService.fetchPokemons as jest.Mock).mockReturnValue(
  Promise.resolve(MOCK_RESPONSE)
);

const setup = createSetup({
  Component: PokemonsSearch,
  extraNodes: container => ({
    pokemonsSearch: container.queryByTestId('pokemons-search'),
    textField: container.queryByTestId('text-field'),
  }),
});

describe('<Pokemons />', () => {
  it('should render', () => {
    const { container } = setup();

    expect(container).toBeDefined();
  });

  it('should display label in text field', () => {
    const { textField } = setup();

    expect(textField).toHaveTextContent('Search Pokemon');
  });

  it('should make api call to retrieve all pokemons', async () => {
    setup();

    await waitFor(() => {
      expect(apiModule.pokemonsService.fetchPokemons).toHaveBeenCalledWith(
        expect.objectContaining({ limit: 100000 })
      );
    });
  });

  it('should display text when pokemon not found', async () => {
    const user = userEvent.setup({ delay: null });

    const { textField } = setup();

    await user.type(textField, ' ');

    expect(screen.getByText('Pokemon not found :(')).toBeDefined();
  });

  it.only('should close autocomplete when click outside', async () => {
    const user = userEvent.setup({ delay: null });

    const { textField } = setup();

    await user.type(textField, ' ');

    expect(screen.queryByText('Pokemon not found :(')).toBeDefined();

    await user.click(document.body);

    expect(screen.queryByText('Pokemon not found :(')).toBeNull();
  });

  it.only('', async () => {
    const user = userEvent.setup({ delay: null });

    const { textField } = setup();

    await user.type(textField, 'b');

    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(screen.queryByText('bulbasaur')).toBeInTheDocument();
    });

    await user.click(screen.getByText('bulbasaur'));

    const id = getIdFromURL(MOCK_RESPONSE[0].url);

    expect(mockNavigate).toHaveBeenCalledWith(id);
  });
});
