import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../components/pages/Main';
import Error from '../components/pages/Error';
import { AppRoute, AuthStatus } from '../const';
import Enter from '../components/pages/Enter';
import Fav from '../components/pages/Fav';
import Offer from '../components/pages/Offer';
import PrivateRoute from '../components/PrivateRoute';

interface AppProps {
    cardsCount: number;
}

function App({ cardsCount }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element = {
            <Main cardsCount={cardsCount} />
          }
        />

        <Route
          path={AppRoute.Login}
          element = {<Enter/>}
        />

        <Route
          path={AppRoute.Favorites}
          element = {
            <PrivateRoute authStatus={AuthStatus.NoAuth}>
              <Fav/>
            </PrivateRoute>
          }
        />

        <Route
          path={AppRoute.Offer}
          element = {<Offer/>}
        />

        <Route
          path="*"
          element = {<Error/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
