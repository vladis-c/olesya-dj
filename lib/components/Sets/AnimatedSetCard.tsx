'use client';

import {motion, useInView} from 'motion/react';
import {useRef} from 'react';

type AnimatedSetCard = {
  children: React.ReactNode;
  index: number;
};

const AnimatedSetCard = ({children}: AnimatedSetCard) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {margin: '80px 0px 80px 0px'});

  return (
    <motion.div
      ref={ref}
      animate={{
        scale: isInView ? 1 : 0.6,
        opacity: isInView ? 1 : 0.4,
        y: isInView ? 0 : 80,
      }}
      transition={{duration: 0.8, ease: 'easeOut'}}>
      {children}
    </motion.div>
  );
};

export default AnimatedSetCard;
