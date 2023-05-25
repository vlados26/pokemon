import { Navigate, Route, Routes as ReactRouterRoutes, BrowserRouter } from 'react-router-dom';
import Pokemons from '../pages/Pokemons/Pokemons';
import Pokemon from '../pages/Pokemon/Pokemon';

const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRouterRoutes>
        <Route path="/*" element={<Navigate to="pokemons" replace />} />
        <Route path="pokemons">
          <Route index element={<Pokemons />} />
          <Route path=":id" element={<Pokemon />} />
        </Route>
      </ReactRouterRoutes>
    </BrowserRouter>
  );
};

export default Routes;
