import Typography from '@mui/material/Typography';
import { default as MuiBreadcrumbs } from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Link as ReactRouterLink, useParams } from 'react-router-dom';

const Breadcrumbs = (): JSX.Element => {
  const { id } = useParams();

  return (
    <div role="presentation">
      <MuiBreadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" to="/pokemons" component={ReactRouterLink}>
          Pokemons
        </Link>
        <Typography color="text.primary">{id}</Typography>
      </MuiBreadcrumbs>
    </div>
  );
};

export default Breadcrumbs;
