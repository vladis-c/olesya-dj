import About from '@/lib/components/About';
import Hero from '@/lib/components/Hero';
import Life from '@/lib/components/Life';
import Sets from '@/lib/components/Sets';
import client, {
  ContentfulAbout,
  ContentfulDjLife,
  ContentfulDjSet,
  ContentfulHero,
  ContentfulLimits,
} from '@/lib/contentful';

// import data from '../contentful-data.json';

const Home = async () => {
  const data = await client.getEntries();
  const heroContent = data.items.find(
    el => el.sys.contentType.sys.id === 'hero',
  ) as unknown as {fields: ContentfulHero | undefined} | undefined;

  const setsContent = data.items.filter(
    el => el.sys.contentType.sys.id === 'djSet',
  ) as unknown as {fields: ContentfulDjSet | undefined}[];

  const lifeContent = data.items.filter(
    el => el.sys.contentType.sys.id === 'djLife',
  ) as unknown as {fields: ContentfulDjLife | undefined}[];

  const aboutContent = data.items.find(
    el => el.sys.contentType.sys.id === 'about',
  ) as unknown as {fields: ContentfulAbout | undefined} | undefined;

  const limits = data.items.find(
    el => el.sys.contentType.sys.id === 'limits',
  ) as unknown as {fields: ContentfulLimits | undefined} | undefined;

  return (
    <div className="font-sans">
      <main>
        <Hero content={heroContent} />
        <Sets
          content={(limits?.fields?.setsLimit
            ? setsContent.slice(0, limits?.fields?.setsLimit)
            : setsContent
          ).filter(el => !el.fields?.disabled)}
        />
        <Life
          content={(limits?.fields?.lifeLimit
            ? lifeContent.slice(0, limits?.fields?.lifeLimit)
            : lifeContent
          ).filter(el => !el.fields?.disabled)}
        />
        <About content={aboutContent} />
      </main>
    </div>
  );
};

export default Home;
