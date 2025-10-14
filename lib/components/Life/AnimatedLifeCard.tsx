'use client';

import {motion, useInView} from 'framer-motion';
import React, {useRef} from 'react';
import {ContentfulDjLife} from '@/lib/contentful';

type AnimatedLifeCardType = {
  card: {fields: ContentfulDjLife | undefined};
  index: number;
  children: React.ReactNode;
};

const AnimatedLifeCard = ({card, index, children}: AnimatedLifeCardType) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {margin: '80px 0px 80px 0px'});
  if (!card.fields?.url) {
    return null;
  }

  return (
    <motion.div
      ref={ref}
      key={card.fields.url + index}
      id="life_card"
      className="relative flex w-full max-w-sm"
      initial={{opacity: 0, y: 60, scale: 0.8}}
      animate={
        isInView
          ? {opacity: 1, y: 0, scale: 1}
          : {opacity: 0, y: 60, scale: 0.8}
      }
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: 'easeOut',
      }}>
      {children}
    </motion.div>
  );
};

export default AnimatedLifeCard;
