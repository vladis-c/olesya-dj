import {ContentfulDjLife} from '@/lib/contentful';
import InstagramReel from '../InstagramReel';
import AnimatedLifeCard from './AnimatedLifeCard';

type LifeCardType = {
  card: {fields: ContentfulDjLife | undefined};
  index: number;
};

const LifeCard = ({card, index}: LifeCardType) => {
  if (!card.fields?.url) {
    return null;
  }

  return (
    <AnimatedLifeCard card={card} index={index}>
      <InstagramReel src={card.fields.url} />
      {card?.fields?.title ? (
        <p className="absolute bottom-8 left-1/2 transform -translate-x-1/2 font-bold text-white text-center bg-black/50 px-2 py-1 rounded-md">
          {card?.fields?.title}
        </p>
      ) : null}
    </AnimatedLifeCard>
  );
};

export default LifeCard;
