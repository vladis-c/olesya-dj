import {ContentfulDjSet} from '@/lib/contentful';
import AnimatedSetCard from './AnimatedSetCard';
import SetCard from './SetCard';

type SetsProps = {content: {fields: ContentfulDjSet | undefined}[] | undefined};

const Sets = async ({content}: SetsProps) => {
  const Cards = () => {
    return content?.map((card, index) => (
      <AnimatedSetCard key={JSON.stringify(card)} index={index}>
        <SetCard card={card} index={index} />
      </AnimatedSetCard>
    ));
  };
  return (
    <div
      className="relative flex flex-col justify-start items-center min-h-screen w-screen p-8 gap-8 bg-black"
      id="sets">
      <h1 className="text-5xl font-bold mt-16 mb-8 text-white">My DJ Sets</h1>
      {Cards()}
    </div>
  );
};

export default Sets;
