'use client';

import {motion, useInView} from 'framer-motion';
import {useRef} from 'react';

type AnimatedAboutContainerProps = {
  children: React.ReactNode;
  direction: 'left' | 'right';
};

const AnimatedAboutContainer = ({
  direction,
  children,
}: AnimatedAboutContainerProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {once: true});

  return (
    <motion.div
      ref={ref}
      initial={{x: direction === 'right' ? -100 : 100, opacity: 0}}
      animate={isInView ? {x: 0, opacity: 1} : undefined}
      transition={{duration: 1}}
      className="w-full">
      {children}
    </motion.div>
  );
};

export default AnimatedAboutContainer;
