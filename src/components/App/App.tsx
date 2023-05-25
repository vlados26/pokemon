import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Routes from '../../Routes/Routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'normalize.css';
import '@/styles/index.scss';
import styles from './App.module.scss';

const queryClient = new QueryClient();

export const App = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <div className={styles.container}>
          <Routes />
        </div>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default App;
