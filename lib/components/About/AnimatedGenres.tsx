'use client';

import {motion, useInView} from 'framer-motion';
import {useRef} from 'react';

type AnimatedGenresProps = {children: React.ReactNode};

const AnimatedGenres = ({children}: AnimatedGenresProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {once: true});

  return (
    <motion.div
      ref={ref}
      initial={{x: 50, opacity: 0}}
      animate={isInView ? {x: 0, opacity: 1} : undefined}
      transition={{delay: 0.4, duration: 0.7, ease: 'easeOut'}}
      className="w-full">
      {children}
    </motion.div>
  );
};

export default AnimatedGenres;
