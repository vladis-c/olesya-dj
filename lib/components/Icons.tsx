import {Headphones, Instagram, Youtube} from 'lucide-react';

const Icons = {
  headphones: <Headphones />,
  youtube: <Youtube />,
  instagram: <Instagram />,
} as const;

export type IconType = keyof typeof Icons;

export default Icons;
