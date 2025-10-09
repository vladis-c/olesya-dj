import {Analytics} from '@vercel/analytics/next';
import {SpeedInsights} from '@vercel/speed-insights/next';
import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import Button from '@/lib/components/Button';
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
  {path: '#hero', name: 'Hero'},
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
          <div className="w-full flex flex-row justify-between items-center px-4 md:px-24 py-4">
            <h3 className="text-white">{metadataContent?.title}</h3>
            <ul className="hidden md:flex md:gap-4 flex-wrap items-center justify-center">
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
