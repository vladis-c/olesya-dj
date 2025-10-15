'use client';

import {motion, useInView} from 'framer-motion';
import {useRef} from 'react';

type AnimatedContactsContentProps = {
  children: React.ReactNode;
};

const AnimatedContactsContent = ({children}: AnimatedContactsContentProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {margin: '0px 0px -50px 0px', once: true});

  return (
    <motion.div
      ref={ref}
      initial={{y: 50, opacity: 0}}
      animate={isInView ? {y: 0, opacity: 1} : undefined}
      transition={{duration: 0.8, delay: 0.4}}>
      {children}
    </motion.div>
  );
};

export default AnimatedContactsContent;
