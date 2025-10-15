'use client';

import {motion, useScroll, useTransform} from 'framer-motion';
import {useEffect, useState} from 'react';

type AnimatedHeroContentProps = {
  children: React.ReactNode;
};

const AnimatedHeroContent = ({children}: AnimatedHeroContentProps) => {
  const [heroHeight, setHeroHeight] = useState(0);
  const {scrollY} = useScroll();

  useEffect(() => {
    const heroElement = document.getElementById('hero');
    if (heroElement) {
      setHeroHeight(heroElement.offsetHeight);
    }
  }, []);

  const opacity = useTransform(scrollY, [0, heroHeight * 0.7], [1, 0]);
  const y = useTransform(scrollY, [0, heroHeight * 0.6], [0, -100]);

  return (
    <motion.div
      initial={{y: 50, opacity: 0}}
      animate={{y: 0, opacity: 1}}
      transition={{duration: 1, delay: 0.5}}>
      <motion.div style={{opacity, y}}>{children}</motion.div>
    </motion.div>
  );
};

export default AnimatedHeroContent;
