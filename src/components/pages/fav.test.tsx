import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Fav from './fav';
import { AuthStatus } from '../../const';
import rootReducer from '../../store/reducer';
import { OfferType } from '../../offer';

const mockOffer: OfferType = {
  id: '1',
  title: 'Test Offer',
  type: 'apartment',
  price: 100,
  city: {
    name: 'Paris',
    location: {
      latitude: 48.856613,
      longitude: 2.352222,
      zoom: 10,
    },
  },
  location: {
    latitude: 48.856613,
    longitude: 2.352222,
    zoom: 10,
  },
  isFavorite: true,
  isPremium: false,
  rating: 4.5,
  previewImage: 'test-image.jpg',
};

const createMockStore = (initialState = {}) => configureStore({
  reducer: rootReducer,
  preloadedState: {
    offers: {
      offers: [mockOffer],
      isOffersDataLoading: false,
      offersDataError: null,
    },
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
    ...initialState,
  },
});

const renderWithRouter = (component: JSX.Element, store = createMockStore()) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

describe('Fav page', () => {
  it('should render favorites page with logo', () => {
    renderWithRouter(<Fav />);

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });

  it('should render user info when authenticated', () => {
    renderWithRouter(<Fav />);

    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('should render favorites title', () => {
    renderWithRouter(<Fav />);

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
  });

  it('should render favorite offers grouped by city', () => {
    renderWithRouter(<Fav />);

    expect(screen.getByText('Test Offer')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
  });

  it('should render empty state when no favorites', () => {
    const store = createMockStore({
      offers: {
        offers: [],
        isOffersDataLoading: false,
        offersDataError: null,
      },
    });
    renderWithRouter(<Fav />, store);

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
  });
});
