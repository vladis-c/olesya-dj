'use client';

import {motion, useInView} from 'framer-motion';
import {useRef} from 'react';

type AnimatedContactsTitleProps = {
  children: React.ReactNode;
};

const AnimatedContactsTitle = ({children}: AnimatedContactsTitleProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {margin: '0px 0px -100px 0px', once: true});

  return (
    <motion.div
      ref={ref}
      initial={{y: 100, opacity: 0}}
      animate={isInView ? {y: 0, opacity: 1} : undefined}
      transition={{duration: 0.8, delay: 0.2}}>
      {children}
    </motion.div>
  );
};

export default AnimatedContactsTitle;
