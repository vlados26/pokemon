import { pokemonsService } from '@/api';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import ScaleIcon from '@mui/icons-material/Scale';
import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Params } from './PokemonCard.types';
import { getName } from './utils/utils';
import styles from './PokemonCard.module.scss';

const PokemonCard = (): JSX.Element => {
  const { id } = useParams<Params>();
  const { data: pokemon } = useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => pokemonsService.fetchPokemon(id!),
  });
  const { name, sprites, height, weight, base_experience } = pokemon!;
  const pokemonName = getName(name);
  const pokemonImage = sprites.other['official-artwork'].front_default;

  return (
    <Card className={styles.card}>
      <CardMedia
        className={styles.cardMedia}
        component="img"
        alt="Pokemon"
        height="200"
        image={pokemonImage}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {pokemonName}
        </Typography>
        <List className={styles.list}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AccessibilityIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Height" secondary={height} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ScaleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Weight" secondary={weight} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <LocalLibraryIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Base Experience" secondary={base_experience} />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
