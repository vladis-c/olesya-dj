import Link from 'next/link';

type ButtonCSProps = {
  children: React.ReactNode;
  href: string;
  className: string;
};

const ButtonCS = ({children, href, className}: ButtonCSProps) => {
  const isPhone = /^\+?[1-9]\d{1,14}$/.test(href);
  const handleEmailClick = () => {
    // Check if page becomes hidden (email app opened)
    const wasHidden = document?.hidden;

    setTimeout(() => {
      // If page didn't become hidden, email app likely didn't open
      if (!document?.hidden && !wasHidden) {
        // Focus the window first to ensure clipboard access
        window.focus();

        navigator?.clipboard
          ?.writeText(href)
          .then(() =>
            alert(
              `${isPhone ? 'Phone number' : 'Email'} ${href} is copied to clipboard`,
            ),
          )
          .catch(() => {
            // Fallback: deprecated but still widely supported
            const input = document.createElement('input');
            input.value = href;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy'); // @deprecated but needed for fallback
            document.body.removeChild(input);
            alert(
              `${isPhone ? 'Phone number' : 'Email'} ${href} is copied to clipboard`,
            );
          });
      }
    }, 500);
  };
  return (
    <Link
      href={`${isPhone ? 'tel' : 'mailto'}:${href}`}
      onClick={handleEmailClick}
      className={className}>
      {children}
    </Link>
  );
};

export default ButtonCS;
