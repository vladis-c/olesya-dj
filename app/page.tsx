import Hero from '@/lib/components/Hero';
import Sets from '@/lib/components/Sets';
import client, {ContentfulHero} from '@/lib/contentful';

// import data from '../contentful-data.json';

const Home = async () => {
  const data = await client.getEntries();
  const heroContent = data.items.find(
    el => el.sys.contentType.sys.id === 'hero',
  ) as {fields: ContentfulHero | undefined} | undefined;

  return (
    <div className="font-sans">
      <main>
        <Hero content={heroContent} />
        <Sets />
      </main>
    </div>
  );
};

export default Home;
