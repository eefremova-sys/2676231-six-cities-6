import OfferCard from './OfferCard';
import { OfferType } from '../offer';

interface OffersListProps {
  offers: OfferType[];
  onFavoriteClick?: (offerId: string) => void;
  onCardMouseEnter?: (offerId: string) => void;
  onCardMouseLeave?: () => void;
  selectedCardId?: string;
}

function OffersList({ offers, onFavoriteClick, onCardMouseEnter, onCardMouseLeave, selectedCardId }: OffersListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onMouseEnter={() => onCardMouseEnter?.(offer.id)}
          onMouseLeave={onCardMouseLeave}
          onFavoriteClick={onFavoriteClick}
          isSelected={selectedCardId === offer.id}
        />
      ))}
    </div>
  );
}

export default OffersList;

