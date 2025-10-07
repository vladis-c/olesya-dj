import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import {ContentfulAbout, ContentfulMedia} from '@/lib/contentful';

type AboutProps = {
  content: {fields: ContentfulAbout | undefined} | undefined;
};

const About = async ({content}: AboutProps) => {
  const title = content?.fields?.title as ContentfulAbout['title'];
  const Title = title ? documentToReactComponents(title) : null;

  const description = content?.fields
    ?.description as ContentfulAbout['description'];
  const Description = description
    ? documentToReactComponents(description)
    : null;

  const background = content?.fields
    ?.background as ContentfulAbout['background'];

  const image = background?.fields as ContentfulMedia;

  return (
    <div
      className="relative flex flex-col justify-center items-center w-screen min-h-screen"
      id="about">
      {image ? (
        <>
          <Image
            alt="about"
            src={`https:${image.file.url}`}
            fill
            className="object-cover -z-10"
            id="about_background"
          />
          <div
            className="absolute inset-0 bg-gray-900 opacity-95 -z-10"
            id="about_dimmer"
          />
        </>
      ) : null}
      <div
        className="flex flex-col md:flex-row md:flex-2 justify-between items-center px-4 md:px-48 gap-8"
        id="about_content">
        <div className="flex flex-col md:flex-1 gap-8" id="about_texts">
          <div className="text-center md:text-left">{Title}</div>
          <div className="pr-4 pl-4 md:pr-24 md:pl-0">{Description}</div>
        </div>
        <div className="flex flex-col md:flex-1 gap-8" id="about_data">
          <div
            className="flex flex-col gap-4 bg-white/5 backdrop-blur-sm p-4 rounded-xl"
            id="about_genres">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-gradient-purple to-gradient-blue bg-clip-text text-transparent">
              Genres
            </h2>
            <ul className="flex flex-wrap gap-2 px-1">
              {content?.fields?.genres?.map(genre => (
                <li
                  key={genre}
                  className="bg-gradient-to-r from-gradient-blue/30 to-gradient-purple/30 backdrop-blur-sm px-4 py-2 w-fit rounded-xl">
                  <p className="text-white font-medium">{genre}</p>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="flex flex-col gap-4 bg-white/5 backdrop-blur-sm p-4 rounded-xl"
            id="about_places">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-gradient-blue to-gradient-purple bg-clip-text text-transparent">
              Places
            </h2>
            <ul className="flex flex-col gap-2 list-disc list-inside px-2">
              {content?.fields?.places?.map(place => (
                <li key={place} className="text-white font-medium">
                  {place}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
