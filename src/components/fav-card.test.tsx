import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FavoriteCard from './fav-card';
import { OfferType } from '../offer';

const mockOffer: OfferType = {
  id: '1',
  title: 'Beautiful Apartment',
  type: 'apartment',
  price: 120,
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

const renderWithRouter = (component: JSX.Element) => render(<BrowserRouter>{component}</BrowserRouter>);

describe('FavoriteCard component', () => {
  it('should render favorite card with offer data', () => {
    renderWithRouter(<FavoriteCard offer={mockOffer} />);

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.type)).toBeInTheDocument();
    expect(screen.getByAltText('Place image')).toHaveAttribute('src', mockOffer.previewImage);
  });

  it('should display Premium mark when offer.isPremium is true', () => {
    const premiumOffer: OfferType = { ...mockOffer, isPremium: true };

    renderWithRouter(<FavoriteCard offer={premiumOffer} />);

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should not display Premium mark when offer.isPremium is false', () => {
    renderWithRouter(<FavoriteCard offer={mockOffer} />);

    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('should always display active favorite button', () => {
    renderWithRouter(<FavoriteCard offer={mockOffer} />);

    const bookmarkButton = screen.getByRole('button');
    expect(bookmarkButton).toHaveClass('place-card__bookmark-button--active');
  });

  it('should calculate rating width correctly', () => {
    const offerWithRating: OfferType = { ...mockOffer, rating: 3.8 };

    renderWithRouter(<FavoriteCard offer={offerWithRating} />);

    const ratingStars = screen.getByText('Rating').parentElement;
    const ratingSpan = ratingStars?.querySelector('span');
    expect(ratingSpan).toHaveStyle({ width: '76%' });
  });

  it('should have link to offer page', () => {
    renderWithRouter(<FavoriteCard offer={mockOffer} />);

    const links = screen.getAllByRole('link');
    const offerLink = links.find((link) => link.getAttribute('href') === `/offer/${mockOffer.id}`);
    expect(offerLink).toBeInTheDocument();
  });

  it('should display "In bookmarks" text for favorite button', () => {
    renderWithRouter(<FavoriteCard offer={mockOffer} />);

    expect(screen.getByText('In bookmarks')).toBeInTheDocument();
  });
});

