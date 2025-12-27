import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../components/pages/Main';
import Error from '../components/pages/Error';
import { AppRoute, AuthStatus } from '../const';
import Enter from '../components/pages/Enter';
import Fav from '../components/pages/Fav';
import Offer from '../components/pages/Offer';
import PrivateRoute from '../components/PrivateRoute';
import { OfferType } from '../mocks/offers';

interface AppProps {
  offers: OfferType[];
}

function App({ offers }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element = {
            <Main offers={offers} />
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
              <Fav offers={offers} />
            </PrivateRoute>
          }
        />

        <Route
          path={AppRoute.Offer}
          element = {<Offer offers={offers} />}
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
