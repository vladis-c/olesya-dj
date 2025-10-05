import Image from 'next/image';
import Link from 'next/link';
import {getDevice} from '@/lib/utils/getDevice';

type VideoProps = {
  src: string;
};

const Video = async ({src}: VideoProps) => {
  const isMobile = await getDevice();

  const getVideoId = (url: string) => url.match(/[?&]v=([^&]+)/)?.[1];
  const videoId = getVideoId(src);

  if (!videoId) {
    return null;
  }

  if (isMobile) {
    return (
      <Link
        className="relative w-full aspect-video bg-black rounded-lg overflow-hidden cursor-pointer"
        href={src}>
        <Image
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt="video"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
            <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1"></div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <iframe
      src={
        videoId
          ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`
          : src
      }
      allowFullScreen
      className="w-full aspect-video"
    />
  );
};

export default Video;
