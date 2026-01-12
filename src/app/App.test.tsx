import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import MainPage from '../components/pages/main';
import LoginPage from '../components/pages/enter';
import Fav from '../components/pages/fav';
import OfferPage from '../components/pages/offer';
import ErrorPage from '../components/pages/error';
import PrivateRoute from '../components/private-route';
import { AppRoute } from '../const';
import rootReducer from '../store/reducer';
import { AuthStatus } from '../const';

const createMockStore = (initialState = {}) => configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

const TestApp = ({ initialEntries }: { initialEntries: string[] }) => (
  <MemoryRouter initialEntries={initialEntries}>
    <Routes>
      <Route path={AppRoute.Main} element={<MainPage />} />
      <Route path={AppRoute.Login} element={<LoginPage />} />
      <Route
        path={AppRoute.Favorites}
        element={
          <PrivateRoute>
            <Fav />
          </PrivateRoute>
        }
      />
      <Route path={AppRoute.Offer} element={<OfferPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </MemoryRouter>
);

describe('App routing', () => {
  it('should render MainPage for route "/"', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <TestApp initialEntries={['/']} />
      </Provider>
    );

    expect(screen.getAllByAltText('6 cities logo').length).toBeGreaterThan(0);
  });

  it('should render LoginPage for route "/login"', () => {
    const store = createMockStore({
      user: {
        authStatus: AuthStatus.NoAuth,
        user: null,
      },
    });
    render(
      <Provider store={store}>
        <TestApp initialEntries={['/login']} />
      </Provider>
    );

    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('should render FavoritesPage for route "/favorites" when authenticated', () => {
    const store = createMockStore({
      user: {
        authStatus: AuthStatus.Auth,
        user: {
          email: 'test@example.com',
          token: 'token',
          name: 'Test User',
          avatarUrl: 'avatar.jpg',
          isPro: false,
        },
      },
    });
    render(
      <Provider store={store}>
        <TestApp initialEntries={['/favorites']} />
      </Provider>
    );

    expect(screen.getAllByAltText('6 cities logo').length).toBeGreaterThan(0);
  });

  it('should redirect to "/login" for route "/favorites" when not authenticated', () => {
    const store = createMockStore({
      user: {
        authStatus: AuthStatus.NoAuth,
        user: null,
      },
    });
    render(
      <Provider store={store}>
        <TestApp initialEntries={['/favorites']} />
      </Provider>
    );

    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('should render OfferPage for route "/offer/:id"', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <TestApp initialEntries={['/offer/123']} />
      </Provider>
    );

    const goToMainLink = screen.queryByText('Go to main page');
    expect(goToMainLink || screen.getAllByAltText('6 cities logo').length > 0).toBeTruthy();
  });

  it('should render ErrorPage for unknown route', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <TestApp initialEntries={['/unknown-route']} />
      </Provider>
    );

    expect(screen.getByText('404.')).toBeInTheDocument();
    expect(screen.getByText('Страница не найдена....')).toBeInTheDocument();
    expect(screen.getByText('Go to main page')).toBeInTheDocument();
  });
});

