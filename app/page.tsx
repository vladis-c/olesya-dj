import About from '@/lib/components/About';
import Contacts from '@/lib/components/Contacts';
import Hero from '@/lib/components/Hero';
import Life from '@/lib/components/Life';
import Sets from '@/lib/components/Sets';
import client, {
  ContentfulAbout,
  ContentfulContacts,
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

  const contactContent = data.items.find(
    el => el.sys.contentType.sys.id === 'contacts',
  ) as unknown as {fields: ContentfulContacts | undefined} | undefined;

  const limits = data.items.find(
    el => el.sys.contentType.sys.id === 'limits',
  ) as unknown as {fields: ContentfulLimits | undefined} | undefined;

  const sets = (
    limits?.fields?.setsLimit
      ? setsContent.slice(0, limits?.fields?.setsLimit)
      : setsContent
  ).filter(el => !el.fields?.disabled);

  const life = (
    limits?.fields?.lifeLimit
      ? lifeContent.slice(0, limits?.fields?.lifeLimit)
      : lifeContent
  ).filter(el => !el.fields?.disabled);

  return (
    <div className="font-sans">
      <main>
        <Hero content={heroContent} />
        {sets.length > 0 ? <Sets content={sets} /> : null}
        {life.length > 0 ? <Life content={life} /> : null}
        <About content={aboutContent} />
        <Contacts content={contactContent} />
      </main>
    </div>
  );
};

export default Home;
