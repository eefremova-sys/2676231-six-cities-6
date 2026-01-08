import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../components/pages/main';
import Error from '../components/pages/error';
import { AppRoute } from '../const';
import Enter from '../components/pages/enter';
import Fav from '../components/pages/fav';
import Offer from '../components/pages/offer';
import PrivateRoute from '../components/private-route';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Main />}
        />

        <Route
          path={AppRoute.Login}
          element = {<Enter/>}
        />

        <Route
          path={AppRoute.Favorites}
          element = {
            <PrivateRoute>
              <Fav />
            </PrivateRoute>
          }
        />

        <Route
          path={AppRoute.Offer}
          element = {<Offer />}
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
