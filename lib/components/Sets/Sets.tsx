import Button from '../Button';
import Video from '../Video';

const Sets = async () => {
  const Cards = () => {
    return (
      <div
        id="card"
        className="w-full max-w-4xl bg-gray-900/80 border-gray-700 backdrop-blur-md p-8">
        <div id="content" className="flex flex-col gap-2 items-center w-full">
          <Video
            src={
              'https://www.youtube.com/watch?v=i5vViuYKkiA&pp=ygUUc2Vuc2F0aW9uIHdoaXRlIDIwMTU%3D'
            }
          />
          <h3 className="text-3xl font-bold text-white">Title</h3>
          <p className="text-white">Description</p>
          <p className="text-gray-400 text-sm mb-2">Date</p>
          <Button href={''} className="min-w-[128px]">
            <p className="text-white">Label</p>
          </Button>
        </div>
      </div>
    );
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
