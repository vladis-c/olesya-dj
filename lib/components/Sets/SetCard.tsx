import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import {ContentfulDjSet} from '@/lib/contentful';
import Video from '../Video';

type SetCard = {card: {fields: ContentfulDjSet | undefined}; index: number};

const SetCard = ({card, index}: SetCard) => {
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
      key={card.fields.videoUrl}
      id={`set_card_${index}`}
      className="w-full max-w-4xl bg-gray-900/80 border-gray-700 backdrop-blur-md p-8">
      <div id="content" className="flex flex-col gap-2 items-center w-full">
        <Video src={card.fields.videoUrl} />
        <div
          id="set_texts"
          className="flex flex-col gap-2 my-8 items-center w-ful">
          <div className="text-3xl font-bold text-white text-center">
            {Title}
          </div>
          <div className="text-white text-center md:px-24">{Description}</div>
          {card?.fields?.date ? (
            <p className="text-gray-400 text-sm mb-2 text-center">
              {new Date(card.fields.date).toLocaleDateString()}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SetCard;
