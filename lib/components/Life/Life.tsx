import {ContentfulDjLife} from '@/lib/contentful';
import AnimatedLifeGrid from './AnimatedLifeGrid';
import LifeCard from './LifeCard';

type LifeProps = {
  content: {fields: ContentfulDjLife | undefined}[] | undefined;
};

const Life = async ({content}: LifeProps) => {
  const Cards = () => {
    return content?.map((card, i) => (
      <LifeCard key={JSON.stringify(card)} card={card} index={i} />
    ));
  };
  return (
    <div
      className="relative flex flex-col justify-start items-center min-h-screen w-screen p-8 gap-8 bg-black pb-24"
      id="life">
      <h1 className="text-5xl font-bold mt-16 mb-8 text-white">My DJ Life</h1>
      <AnimatedLifeGrid>{Cards()}</AnimatedLifeGrid>
    </div>
  );
};

export default Life;
