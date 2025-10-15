import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import {ContentfulAbout, ContentfulMedia} from '@/lib/contentful';
import AnimatedAboutContainer from './AnimatedAboutContainer';
import AnimatedGenres from './AnimatedGenres';
import AnimatedPlaces from './AnimatedPlaces';

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

  const genres = content?.fields?.genres;
  const places = content?.fields?.places;

  return (
    <div
      className="relative flex flex-col justify-center items-center w-screen lg:min-h-screen py-24 lg:py-0"
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
        className="flex flex-col lg:flex-row lg:flex-2 justify-between items-center px-4 lg:px-24 xl:px-48 gap-8"
        id="about_content">
        <AnimatedAboutContainer direction="right">
          <div className="flex flex-col lg:flex-1 gap-8" id="about_texts">
            <div className="text-center lg:text-left">{Title}</div>
            <div className="pr-4 pl-4 lg:pr-24 lg:pl-0">{Description}</div>
          </div>
        </AnimatedAboutContainer>
        <AnimatedAboutContainer direction="left">
          <div
            className="flex flex-col lg:flex-1 gap-8 w-full px-4"
            id="about_data">
            {genres && genres.length > 0 ? (
              <AnimatedGenres>
                <div
                  className="flex flex-col gap-4 bg-white/5 backdrop-blur-sm p-4 rounded-xl"
                  id="about_genres">
                  <h2 className="text-xl font-semibold bg-gradient-to-r from-gradient-purple to-gradient-blue bg-clip-text text-transparent">
                    Genres
                  </h2>
                  <ul className="flex flex-wrap gap-2 px-1">
                    {genres.map(genre => (
                      <li
                        key={genre}
                        className="bg-gradient-to-r from-gradient-blue/30 to-gradient-purple/30 backdrop-blur-sm px-4 py-2 w-fit rounded-xl">
                        <p className="text-white font-medium">{genre}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedGenres>
            ) : null}
            {places && places.length > 0 ? (
              <AnimatedPlaces>
                <div
                  className="flex flex-col gap-4 bg-white/5 backdrop-blur-sm p-4 rounded-xl"
                  id="about_places">
                  <h2 className="text-xl font-semibold bg-gradient-to-r from-gradient-blue to-gradient-purple bg-clip-text text-transparent">
                    Places
                  </h2>
                  <ul className="flex flex-col gap-2 list-disc list-inside px-2">
                    {places.map(place => (
                      <li key={place} className="text-white font-medium">
                        {place}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedPlaces>
            ) : null}
          </div>
        </AnimatedAboutContainer>
      </div>
    </div>
  );
};

export default About;
