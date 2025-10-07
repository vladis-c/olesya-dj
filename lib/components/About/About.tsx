import Image from 'next/image';
import {ContentfulAbout} from '@/lib/contentful';

type AboutProps = {
  content: {fields: ContentfulAbout | undefined} | undefined;
};

const About = async ({content}: AboutProps) => {
  const genres = ['Progressive house', 'Techno', 'Afro'];
  const places = ['Dubai', 'Movenpick', 'Hotels'];
  return (
    <div className="relative flex flex-col justify-center items-center h-screen w-screen">
      <Image
        alt="about"
        src={`https://images.ctfassets.net/iljug6yydm15/1hX42B7XtdMn1d2rxvP3Xo/17f2c33dbec1dde0b1bc2e4545b870e1/IMG_3458.jpg`}
        fill
        className="object-cover -z-10"
        id="about_background"
      />
      <div
        className="absolute inset-0 bg-gray-900 opacity-95 -z-10"
        id="about_dimmer"
      />
      <div
        className="flex flex-row flex-2 justify-between items-center px-48 gap-8"
        id="about_content">
        <div className="flex flex-col flex-1 gap-8">
          <h1 className="text-5xl font-bold text-white">About Olesya</h1>
          <p className="pr-24 text-lg">{`
      Ali Deger is an innovative electronic music producer and DJ who has been crafting sonic landscapes that push the boundaries of conventional electronic music for over a decade.
Born from a passion for synthesizers and digital audio workstations, Ali's journey began in underground clubs and has evolved into a global presence across major festivals and streaming platforms.
His unique blend of progressive house, techno, and ambient textures creates immersive experiences that transport listeners to otherworldly dimensions.
      `}</p>
        </div>
        <div className="flex flex-col flex-1 gap-8">
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
        </div>
      </div>
    </div>
  );
};

export default About;
