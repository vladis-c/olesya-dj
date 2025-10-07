import {ContentfulDjLife} from '@/lib/contentful';
import InstagramReel from '../InstagramReel';

type LifeProps = {
  content: {fields: ContentfulDjLife | undefined}[] | undefined;
};

const Life = async ({content}: LifeProps) => {
  const Cards = () => {
    return content?.map((card, i) => {
      if (!card.fields?.url) {
        return null;
      }

      return (
        <div
          key={card.fields.url + i}
          id="life_card"
          className="relative flex w-full max-w-sm">
          <InstagramReel src={card.fields.url} />
          <p className="absolute bottom-8 left-1/2 transform -translate-x-1/2 font-bold text-white text-center bg-black/50 px-2 py-1 rounded-md">
            {card?.fields?.title}
          </p>
        </div>
      );
    });
  };
  return (
    <div
      className="relative flex flex-col justify-start items-center min-h-screen w-screen p-8 gap-8 bg-black pb-24"
      id="life">
      <h1 className="text-5xl font-bold mt-16 mb-8 text-white">My DJ Life</h1>
      <div className="flex flex-wrap w-screen justify-center items-center gap-8 md:px-48">
        {Cards()}
      </div>
    </div>
  );
};

export default Life;
