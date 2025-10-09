import Link from 'next/link';

type ButtonCSProps = {
  children: React.ReactNode;
  href: string;
  className: string;
};

const ButtonCS = ({children, href, className}: ButtonCSProps) => {
  const handleEmailClick = () => {
    // Check if page becomes hidden (email app opened)
    const wasHidden = document.hidden;

    setTimeout(() => {
      // If page didn't become hidden, email app likely didn't open
      if (!document.hidden && !wasHidden) {
        navigator?.clipboard
          ?.writeText(href)
          .then(() => alert(`Email ${href} is copied to clipboard`));
      }
    }, 500);
  };
  return (
    <Link
      href={`mailto:${href}`}
      onClick={handleEmailClick}
      className={className}>
      {children}
    </Link>
  );
};

export default ButtonCS;
