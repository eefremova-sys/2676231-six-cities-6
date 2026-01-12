import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import OffersList from './offers-list';
import { OfferType } from '../offer';

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
};

describe('OffersList component', () => {
  it('should render list of offers', () => {
    const offers: OfferType[] = [
      { ...mockOffer, id: '1', title: 'Offer 1' },
      { ...mockOffer, id: '2', title: 'Offer 2' },
      { ...mockOffer, id: '3', title: 'Offer 3' },
    ];

    render(<OffersList offers={offers} />);

    expect(screen.getByText('Offer 1')).toBeInTheDocument();
    expect(screen.getByText('Offer 2')).toBeInTheDocument();
    expect(screen.getByText('Offer 3')).toBeInTheDocument();
  });

  it('should render correct number of offer cards', () => {
    const offers: OfferType[] = [
      { ...mockOffer, id: '1' },
      { ...mockOffer, id: '2' },
      { ...mockOffer, id: '3' },
      { ...mockOffer, id: '4' },
    ];

    render(<OffersList offers={offers} />);

    const offerCards = screen.getAllByRole('article');
    expect(offerCards).toHaveLength(4);
  });

  it('should render empty list when offers array is empty', () => {
    const offers: OfferType[] = [];

    const { container } = render(<OffersList offers={offers} />);

    expect(container.querySelector('.places__list')).toBeInTheDocument();
    expect(screen.queryAllByRole('article')).toHaveLength(0);
  });
});

