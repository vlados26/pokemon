import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import styles from './Spinner.module.scss';

const Spinner = (): JSX.Element => {
  return (
    <Box className={styles.container}>
      <CircularProgress />
    </Box>
  );
};

export default Spinner;
