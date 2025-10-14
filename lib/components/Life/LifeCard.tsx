import React from 'react';
import {ContentfulDjLife} from '@/lib/contentful';
import InstagramReel from '../InstagramReel';

type LifeCardType = {
  card: {fields: ContentfulDjLife | undefined};
  index: number;
};

const LifeCard = ({card, index}: LifeCardType) => {
  if (!card.fields?.url) {
    return null;
  }

  return (
    <div
      key={card.fields.url + index}
      id="life_card"
      className="relative flex w-full max-w-sm">
      <InstagramReel src={card.fields.url} />
      <p className="absolute bottom-8 left-1/2 transform -translate-x-1/2 font-bold text-white text-center bg-black/50 px-2 py-1 rounded-md">
        {card?.fields?.title}
      </p>
    </div>
  );
};

export default LifeCard;
