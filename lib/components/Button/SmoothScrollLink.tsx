'use client';

import Link from 'next/link';

type SmoothScrollLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

const SmoothScrollLink = ({
  href,
  children,
  className,
}: SmoothScrollLinkProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({behavior: 'smooth'});
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default SmoothScrollLink;
