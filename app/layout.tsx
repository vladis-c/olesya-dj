import {Analytics} from '@vercel/analytics/next';
import {SpeedInsights} from '@vercel/speed-insights/next';
import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import Link from 'next/link';
import Button from '@/lib/components/Button';
import AnimatedLayoutTitle from '@/lib/components/Layout/AnimatedLayoutTitle';
import client, {ContentfulMedia, ContentfulMetadata} from '@/lib/contentful';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateMetadata(): Promise<Metadata> {
  const metadataEntry = await client.getEntries({
    content_type: 'metadata',
    limit: 1,
  });
  const metadataContent = metadataEntry.items[0]?.fields as ContentfulMetadata;

  return {
    title: metadataContent?.title || 'DJ Olesya',
    description: metadataContent?.description || 'DJ Olesya Cherkasheninova',
    openGraph: {
      title: metadataContent?.ogTitle || metadataContent?.title,
      description:
        metadataContent?.ogDescription || metadataContent?.description,
      images: metadataContent?.ogImage
        ? [
            {
              url: `https:${(metadataContent.ogImage.fields as ContentfulMedia).file.url}`,
            },
          ]
        : [],
    },
    keywords: (metadataContent?.keywords as string[]) || [],
  };
}

const links = [
  {path: '#sets', name: 'Sets'},
  {path: '#life', name: 'Life'},
  {path: '#about', name: 'About me'},
  {path: '#contacts', name: 'Contacts'},
];

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const metadataEntry = await client.getEntries({
    content_type: 'metadata',
    limit: 1,
  });
  const metadataContent = metadataEntry.items[0]?.fields as ContentfulMetadata;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav
          className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-sm"
          id="navigation">
          <div className="w-full flex flex-row justify-between items-center px-4 md:px-16 py-4">
            <Link href="#hero" className="cursor-default">
              <AnimatedLayoutTitle>
                <h3 className="bg-gradient-to-r from-gradient-blue to-gradient-purple bg-clip-text text-transparent">
                  {metadataContent?.title}
                </h3>
              </AnimatedLayoutTitle>
            </Link>
            <ul className="hidden md:flex md:gap-1 flex-wrap items-center justify-center">
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
          {`© ${new Date().getFullYear()} ${metadataContent.name}. All rights reserved.`}
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
