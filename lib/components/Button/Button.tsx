import {clsx} from 'clsx';
import Link from 'next/link';
import React from 'react';
import Icons from '../Icons';

export type ButtonType = 'gradient' | 'filled' | 'outlined' | 'link';

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  icon?: keyof typeof Icons;
  type?: ButtonType;
  disabled?: boolean;
  showOnlyIcon?: boolean;
};

const Button = ({
  href,
  children,
  className = '',
  icon,
  type = 'gradient',
  disabled = false,
  showOnlyIcon = false,
}: ButtonProps) => {
  const Icon = () => {
    if (icon) {
      return Icons[icon];
    }
  };

  const baseClasses = clsx(
    'inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-lg',
    {
      'text-white bg-gradient-to-r from-gradient-blue to-gradient-purple hover:from-gradient-blue/90 hover:to-gradient-purple/90 transition-all duration-200':
        type === 'gradient' && !disabled,
      'bg-black text-white hover:bg-gray-100 transition-colors':
        type === 'filled' && !disabled,
      'border-2 border-white text-white hover:bg-white hover:text-black transition-colors':
        type === 'outlined' && !disabled,
      'p-0 text-white hover:underline': type === 'link' && !disabled,
      'opacity-50 cursor-not-allowed': disabled,
    },
    className,
  );

  const ButtonContent = () => {
    if (showOnlyIcon) {
      return Icon();
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

  return (
    <Link href={href} className={baseClasses}>
      {ButtonContent()}
    </Link>
  );
};

export default Button;
