import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import {ContentfulDjSet} from '@/lib/contentful';
import Video from '../Video';

type SetsProps = {content: {fields: ContentfulDjSet | undefined}[] | undefined};

const Sets = async ({content}: SetsProps) => {
  const Cards = () => {
    return content?.map((card, i) => {
      if (!card.fields?.videoUrl) {
        return null;
      }

      const title = card?.fields?.title as ContentfulDjSet['title'];
      const Title = title ? documentToReactComponents(title) : null;

      const description = card?.fields
        ?.description as ContentfulDjSet['description'];
      const Description = description
        ? documentToReactComponents(description)
        : null;

      return (
        <div
          key={card.fields.videoUrl + i}
          id="set_card"
          className="w-full max-w-4xl bg-gray-900/80 border-gray-700 backdrop-blur-md p-8">
          <div id="content" className="flex flex-col gap-2 items-center w-full">
            <Video src={card.fields.videoUrl} />
            <div
              id="set_texts"
              className="flex flex-col gap-2 my-8 items-center w-ful">
              <div className="text-3xl font-bold text-white text-center">
                {Title}
              </div>
              <div className="text-white text-center px-24">{Description}</div>
              {card?.fields?.date ? (
                <p className="text-gray-400 text-sm mb-2 text-center">
                  {new Date(card.fields.date).toLocaleDateString()}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div
      className="relative flex flex-col justify-start items-center h-screen w-screen p-8 gap-8 bg-black"
      id="sets">
      <h1 className="text-5xl font-bold mt-16 mb-8 text-white">My DJ Sets</h1>
      {Cards()}
    </div>
  );
};

export default Sets;
