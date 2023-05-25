import { pokemonsService } from '@/api';
import useDebounce from '@/hooks/useDebounce.hook';
import { Pokemon } from '@/types';
import { Box, CircularProgress } from '@mui/material';
import Autocomplete, {
  AutocompleteRenderInputParams,
} from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getIdFromURL, getPokemonImgSrc } from './utils/utils';
import styles from './PokemonsSearch.module.scss';

const params = { limit: 100000 };
const DELAY = 300;

const PokemonsSearch = (): JSX.Element => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedValue = useDebounce<string>(searchQuery, DELAY);
  const { isLoading, data: pokemons } = useQuery({
    queryKey: ['pokemons', params],
    queryFn: () => pokemonsService.fetchPokemons(params),
    staleTime: 60000,
  });

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleChange = (
    _: React.SyntheticEvent,
    value: Pokemon | null
  ): void => {
    if (value) {
      const id = getIdFromURL(value.url);
      navigate(id);
    }
  };

  const handleInputChange = (_: React.SyntheticEvent, value: string): void => {
    setSearchQuery(value);
  };

  const filteredPokemons = useMemo(() => {
    if (!searchQuery) {
      return [];
    }

    if (pokemons?.length) {
      return pokemons.filter(pokemon => pokemon.name.includes(searchQuery));
    }
  }, [debouncedValue]);

  const renderOption = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: Pokemon
  ) => (
    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
      <img
        loading="lazy"
        width="40"
        src={getPokemonImgSrc(option.url)}
        alt="Pokemon small image"
      />
      {option.name}
    </Box>
  );

  const renderInput = (params: AutocompleteRenderInputParams) => (
    <TextField
      {...params}
      data-qa="text-field"
      label="Search Pokemon"
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <>
            {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
            {params.InputProps.endAdornment}
          </>
        ),
      }}
    />
  );

  return (
    <Autocomplete
      id="pokemons-search"
      data-qa="pokemons-search"
      noOptionsText="Pokemon not found :("
      className={styles.autocomplete}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={pokemon => pokemon.name}
      options={filteredPokemons || []}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      loading={isLoading}
      onChange={handleChange}
      onInputChange={handleInputChange}
      renderOption={renderOption}
      renderInput={renderInput}
    />
  );
};

export default PokemonsSearch;
