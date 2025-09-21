import Hero from '@/lib/components/Hero';

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
