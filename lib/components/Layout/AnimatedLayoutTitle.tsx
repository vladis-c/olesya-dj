'use client';

import {motion, useScroll, useTransform} from 'framer-motion';
import {useEffect, useState} from 'react';

type AnimatedLayoutTitleProps = {
  children: React.ReactNode;
};

const AnimatedLayoutTitle = ({children}: AnimatedLayoutTitleProps) => {
  const [heroHeight, setHeroHeight] = useState(0);
  const {scrollY} = useScroll();

  useEffect(() => {
    const heroElement = document.getElementById('hero');
    if (heroElement) {
      setHeroHeight(heroElement.offsetHeight);
    }
  }, []);

  const opacity = useTransform(
    scrollY,
    [heroHeight * 0.2, heroHeight * 0.5],
    [0, 1],
  );

  return <motion.div style={{opacity}}>{children}</motion.div>;
};

export default AnimatedLayoutTitle;
