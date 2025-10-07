import Image from 'next/image';
import Link from 'next/link';

type InstagramReelProps = {
  src: string;
};

const InstagramReel = ({src}: InstagramReelProps) => {
  const getReelId = (url: string) => {
    const match = url.match(/\/reel\/([^\/\?]+)/);
    return match?.[1];
  };

  const reelId = getReelId(src);

  if (!reelId) {
    return null;
  }

  return (
    <Link
      className="relative w-full aspect-[9/16] max-w-sm bg-black rounded-lg overflow-hidden cursor-pointer"
      href={src}
      target="_blank"
      rel="noopener noreferrer">
      <Image
        src={`https://www.instagram.com/p/${reelId}/media/?size=l`}
        alt="Instagram reel"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1"></div>
        </div>
      </div>
    </Link>
  );
};

export default InstagramReel;
