'use client';

import {clsx} from 'clsx';
import Link from 'next/link';
import React from 'react';
import Icons from '../Icons';
import ButtonCS from './ButtonCS';

export type ButtonType = 'gradient' | 'filled' | 'outlined' | 'link' | 'box';

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  icon?: keyof typeof Icons;
  type?: ButtonType;
  disabled?: boolean;
  showOnlyIcon?: boolean;
  round?: boolean;
};

const Button = ({
  href,
  children,
  className = '',
  icon,
  type = 'gradient',
  disabled = false,
  showOnlyIcon = false,
  round = false,
}: ButtonProps) => {
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(href);

  const baseClasses = clsx(
    'inline-flex items-center justify-center gap-2 px-6 py-3 font-medium',
    round ? 'rounded-full' : 'rounded-lg',
    round && showOnlyIcon ? 'w-16 h-16 p-0' : '',
    type === 'box' ? 'flex-col px-12 py-6 w-[256px]' : '',
    {
      'text-white bg-gradient-to-r from-gradient-blue to-gradient-purple hover:from-gradient-blue/90 hover:to-gradient-purple/90 transition-all duration-200':
        type === 'gradient' && !disabled,
      'bg-black text-white hover:bg-gray-100 transition-colors':
        type === 'filled' && !disabled,
      'border-2 border-white text-white hover:bg-white hover:text-black transition-colors':
        (type === 'outlined' || type === 'box') && !disabled,
      'p-0 text-white hover:underline': type === 'link' && !disabled,
      'opacity-50 cursor-not-allowed': disabled,
    },
    className,
  );

  const Icon = () => {
    if (icon) {
      return Icons[icon];
    }
  };

  const ButtonContent = () => {
    if (showOnlyIcon) {
      return Icon();
    } else if (type === 'box') {
      return (
        <div className="flex flex-col justify-center items-center gap-2">
          {Icon()}
          {children}
          {isEmail && href}
        </div>
      );
    } else {
      return (
        <>
          {Icon()}
          {children}
        </>
      );
    }
  };

  if (disabled) {
    return <span className={baseClasses}>{ButtonContent()}</span>;
  }

  if (isEmail) {
    return (
      <ButtonCS className={baseClasses} href={href}>
        {ButtonContent()}
      </ButtonCS>
    );
  }

  return (
    <Link href={href} className={baseClasses}>
      {ButtonContent()}
    </Link>
  );
};

export default Button;
