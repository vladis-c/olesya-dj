import {clsx} from 'clsx';
import Link from 'next/link';
import React from 'react';
import Icons from '../Icons';

type ButtonType = 'gradient' | 'filled' | 'outlined' | 'icon' | 'link';

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  icon?: keyof typeof Icons;
  type?: ButtonType;
};

const Button = ({
  href,
  children,
  className = '',
  icon,
  type = 'gradient',
}: ButtonProps) => {
  const Icon = () => {
    if (icon) {
      return Icons[icon];
    }
  };

  return (
    <Link
      href={href}
      className={clsx(
        'inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-lg',
        {
          'text-white bg-gradient-to-r from-gradient-blue to-gradient-purple hover:from-gradient-blue/90 hover:to-gradient-purple/90 transition-all duration-200':
            type === 'gradient',
          'bg-black text-white hover:bg-gray-100 transition-colors':
            type === 'filled',
          'border-2 border-white text-white hover:bg-white hover:text-black transition-colors':
            type === 'outlined',
          'p-2 text-white hover:bg-gray-100 transition-colors': type === 'icon',
          'p-0 text-white hover:underline': type === 'link',
        },
        className,
      )}>
      {Icon()}
      {children}
    </Link>
  );
};

export default Button;
