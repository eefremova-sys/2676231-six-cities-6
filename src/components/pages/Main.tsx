import { Link } from 'react-router-dom';
import { useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppRoute } from '../../const';
import OffersList from '../OffersList';
import Map from '../Map';
import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';
import CitiesList from '../CitiesList';
import { City, Points } from '../../types';
import { AppDispatch } from '../../store';
import { changeCity, fetchOffersAction, logoutAction } from '../../store/action';
import { AuthStatus } from '../../const';
import {
  getSelectedCity,
  getFilteredOffers,
  getOffersLoadingStatus,
  getOffersError,
  getAuthorizationStatus,
  getUser,
  getFavoriteOffersCount,
} from '../../store/selectors';
import { OfferType } from '../../offer';

const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

function Main(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const selectedCity = useSelector(getSelectedCity);
  const filteredOffers = useSelector(getFilteredOffers);
  const isOffersDataLoading = useSelector(getOffersLoadingStatus);
  const offersDataError = useSelector(getOffersError);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const user = useSelector(getUser);
  const favoriteOffersCount = useSelector(getFavoriteOffersCount);

  const cityCoordinates: City = useMemo(() => filteredOffers[0]
    ? {
      lat: filteredOffers[0].city.location.latitude,
      lng: filteredOffers[0].city.location.longitude,
      zoom: filteredOffers[0].city.location.zoom,
    }
    : {
      lat: 52.38333,
      lng: 4.9,
      zoom: 10,
    }, [filteredOffers]);

  const points: Points = useMemo(() => filteredOffers.map((offer: OfferType) => ({
    lat: offer.location.latitude,
    lng: offer.location.longitude,
    title: offer.title,
  })), [filteredOffers]);

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

  const handleCityChange = useCallback((city: string) => {
    dispatch(changeCity(city));
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authorizationStatus === AuthStatus.Auth && user ? (
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                          <img className="header__avatar user__avatar" src={user.avatarUrl} alt={user.name} width="20" height="20" />
                        </div>
                        <span className="header__user-name user__name">{user.email}</span>
                        <span className="header__favorite-count">{favoriteOffersCount}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <a className="header__nav-link" href="#" onClick={(e) => {
                        e.preventDefault(); handleLogout();
                      }}
                      >
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item">
                    <Link className="header__nav-link" to={AppRoute.Login}>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList
          cities={CITIES}
          selectedCity={selectedCity}
          onCityChange={handleCityChange}
        />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              {offersDataError && (
                <ErrorMessage message={offersDataError} />
              )}
              {!offersDataError && isOffersDataLoading && (
                <Spinner />
              )}
              {!offersDataError && !isOffersDataLoading && (
                <>
                  <b className="places__found">
                    {filteredOffers.length} places to stay in {selectedCity}
                  </b>
                  <form className="places__sorting" action="#" method="get">
                    <span className="places__sorting-caption">Sort by</span>
                    <span className="places__sorting-type" tabIndex={0}>
                      Popular
                      <svg className="places__sorting-arrow" width="7" height="4">
                        <use href="#icon-arrow-select"></use>
                      </svg>
                    </span>
                    <ul className="places__options places__options--custom places__options--opened">
                      <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                      <li className="places__option" tabIndex={0}>Price: low to high</li>
                      <li className="places__option" tabIndex={0}>Price: high to low</li>
                      <li className="places__option" tabIndex={0}>Top rated first</li>
                    </ul>
                  </form>
                  <OffersList offers={filteredOffers} />
                </>
              )}
            </section>
            <div className="cities__right-section">
              <Map
                city={cityCoordinates}
                points={points}
                selectedPoint={undefined}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
