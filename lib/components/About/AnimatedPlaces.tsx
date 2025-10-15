'use client';

import {motion, useInView} from 'framer-motion';
import {useRef} from 'react';

type AnimatedPlacesProps = {children: React.ReactNode};

const AnimatedPlaces = ({children}: AnimatedPlacesProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {once: true});

  return (
    <motion.div
      ref={ref}
      initial={{x: 50, opacity: 0}}
      animate={isInView ? {x: 0, opacity: 1} : undefined}
      transition={{delay: 0.6, duration: 1, ease: 'easeOut'}}
      className="w-full">
      {children}
    </motion.div>
  );
};

export default AnimatedPlaces;
