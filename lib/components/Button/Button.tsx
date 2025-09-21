import Link from 'next/link';
import React from 'react';
import Icons from '../Icons';

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  icon?: keyof typeof Icons;
};

const Button = ({href, children, className = '', icon}: ButtonProps) => {
  const Icon = () => {
    if (icon) {
      return Icons[icon];
    }
  };

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3  text-white font-medium rounded-lg bg-gradient-to-r from-gradient-blue to-gradient-purple hover:from-gradient-blue/90 hover:to-gradient-purple/90 transition-all duration-200 ${className}`}>
      {Icon()}
      {children}
    </Link>
  );
};

export default Button;
