import Hero from '@/lib/components/Hero';
import Sets from '@/lib/components/Sets';

const Home = async () => {
  return (
    <div className="font-sans">
      <main>
        <Hero />
        <Sets />
      </main>
    </div>
  );
};

export default Home;
