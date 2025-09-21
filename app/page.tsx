import Hero from '@/lib/components/Hero';
import data from '../contentful-data.json';

const Home = async () => {
  return (
    <div className="font-sans">
      <main>
        <Hero />
      </main>
      <footer className="flex gap-[24px] flex-wrap items-center justify-center p-8">
        Here is footer
      </footer>
    </div>
  );
};

export default Home;
