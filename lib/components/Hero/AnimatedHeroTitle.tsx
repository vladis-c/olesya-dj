'use client';

import {motion, useScroll, useTransform} from 'framer-motion';
import {useEffect, useState} from 'react';

type AnimatedHeroTitleProps = {
  children: React.ReactNode;
};

const AnimatedHeroTitle = ({children}: AnimatedHeroTitleProps) => {
  const [heroHeight, setHeroHeight] = useState(0);
  const {scrollY} = useScroll();

  useEffect(() => {
    const heroElement = document.getElementById('hero');
    if (heroElement) {
      setHeroHeight(heroElement.offsetHeight);
    }
  }, []);

  const opacity = useTransform(scrollY, [0, heroHeight * 0.5], [1, 0]);
  const y = useTransform(scrollY, [0, heroHeight * 0.5], [0, -200]);
  const scaleY = useTransform(scrollY, [0, heroHeight * 0.5], [1, 1.5]);
  const scaleX = useTransform(scrollY, [0, heroHeight * 0.5], [1, 0.5]);

  return (
    <motion.div
      initial={{y: 100, opacity: 0}}
      animate={{y: 0, opacity: 1}}
      transition={{duration: 1, delay: 0.2}}>
      <motion.div style={{opacity, y, scaleY, scaleX}}>{children}</motion.div>
    </motion.div>
  );
};

export default AnimatedHeroTitle;
