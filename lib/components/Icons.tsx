import {Calendar, Headphones, Instagram, Mail, Youtube} from 'lucide-react';

const Icons = {
  headphones: <Headphones />,
  youtube: <Youtube />,
  instagram: <Instagram />,
  email: <Mail color="#8B5CF6" />,
  booking: <Calendar color="#3B82F6" />,
} as const;

export type IconType = keyof typeof Icons;

export default Icons;
