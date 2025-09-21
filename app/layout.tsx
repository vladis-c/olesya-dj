import {Analytics} from '@vercel/analytics/next';
import {SpeedInsights} from '@vercel/speed-insights/next';
import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import Link from 'next/link';
import Button from '@/lib/components/Button';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Olesya DJ',
  description: 'Portfolio site for DJ Olesya Cherkasheninova',
};

const links = [
  {path: '#hero', name: 'Hero'},
  {path: '#footer', name: 'Footer'},
];

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav
          className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-sm"
          id="navigation">
          <div className="w-full flex flex-row justify-between items-center px-24 py-4">
            <div>
              <h3 className="text-white">Olesya DJ</h3>
            </div>
            <ul className="flex gap-[24px] flex-wrap items-center justify-center">
              {links.map(({path, name}) => (
                <li key={path}>
                  <Button href={path} type="link">
                    {name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        {children}
        <SpeedInsights />
        <Analytics />
        <footer
          className="flex gap-[24px] flex-wrap items-center justify-center p-8"
          id="footer">
          Here is footer
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
