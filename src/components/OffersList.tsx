import { useState, useEffect } from 'react';
import OfferCard from './OfferCard';
import { OfferType } from '../mocks/offers';

interface OffersListProps {
  offers: OfferType[];
}

function OffersList({ offers }: OffersListProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  useEffect(() => {
  }, [activeCard]);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onMouseEnter={() => setActiveCard(offer.id)}
          onMouseLeave={() => setActiveCard(null)}
        />
      ))}
    </div>
  );
}

export default OffersList;

