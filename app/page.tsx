import Hero from '@/lib/components/Hero';
import Sets from '@/lib/components/Sets';
import client, {ContentfulDjSet, ContentfulHero} from '@/lib/contentful';

// import data from '../contentful-data.json';

const Home = async () => {
  const data = await client.getEntries();
  const heroContent = data.items.find(
    el => el.sys.contentType.sys.id === 'hero',
  ) as unknown as {fields: ContentfulHero | undefined} | undefined;

  const setsContent = data.items.filter(
    el => el.sys.contentType.sys.id === 'djSet',
  ) as unknown as {fields: ContentfulDjSet | undefined}[];

  return (
    <div className="font-sans">
      <main>
        <Hero content={heroContent} />
        <Sets content={setsContent} />
      </main>
    </div>
  );
};

export default Home;
