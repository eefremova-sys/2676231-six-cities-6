import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Offer from './offer';
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
  isFavorite: false,
  isPremium: false,
  rating: 4.5,
  previewImage: 'test-image.jpg',
  description: 'Test description',
  images: ['image1.jpg', 'image2.jpg'],
  bedrooms: 2,
  maxAdults: 4,
  goods: ['Wi-Fi', 'Heating'],
  host: {
    name: 'Test Host',
    avatarUrl: 'host.jpg',
    isPro: true,
  },
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
    reviews: {
      reviews: [],
      isReviewsDataLoading: false,
    },
    ...initialState,
  },
});

const renderWithRouter = (component: JSX.Element, store = createMockStore(), initialEntries = ['/offer/1']) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/offer/:id" element={component} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('Offer page', () => {
  it('should render offer page with logo', () => {
    renderWithRouter(<Offer />);

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });

  it('should render offer not found when offer does not exist', () => {
    const store = createMockStore({
      offers: {
        offers: [],
        isOffersDataLoading: false,
        offersDataError: null,
      },
    });
    renderWithRouter(<Offer />, store);

    expect(screen.getByText('Offer not found')).toBeInTheDocument();
    expect(screen.getByText('Go to main page')).toBeInTheDocument();
  });

  it('should render offer details when offer exists', () => {
    renderWithRouter(<Offer />);

    expect(screen.getByText('Test Offer')).toBeInTheDocument();
    expect(screen.getByText('€100')).toBeInTheDocument();
  });
});
