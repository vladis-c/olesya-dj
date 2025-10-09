import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import {Document} from '@contentful/rich-text-types';
import Image from 'next/image';
import {
  ContentfulCTAButton,
  ContentfulHero,
  ContentfulMedia,
} from '@/lib/contentful';
import Button from '../Button';

type HeroProps = {content: {fields: ContentfulHero | undefined} | undefined};

const Hero = async ({content}: HeroProps) => {
  const description = content?.fields
    ?.description as ContentfulHero['description'];

  const Description = description
    ? documentToReactComponents(description)
    : null;

  const background = content?.fields
    ?.background as ContentfulHero['background'];

  const image = background?.fields as ContentfulMedia;

  const title = content?.fields?.title as ContentfulHero['title'];

  const ctaButtons = (
    content?.fields?.ctaButtons as ContentfulCTAButton[]
  )?.map(el => {
    const disabled = !el.fields?.enabled;
    const label = el.fields?.label as Document;
    const link = el.fields?.link ?? '';
    const showOnlyIcon = el.fields?.showOnlyIcon;
    const icon = el.fields?.icon?.[0];
    const type = el.fields?.type;
    const round = el.fields?.round;

    return {label, link, disabled, showOnlyIcon, icon, type, round};
  });

  const Links =
    ctaButtons && ctaButtons.length > 0
      ? ctaButtons
          .slice(1)
          .map(
            ({link, disabled, label, icon, showOnlyIcon, type, round}, i) => {
              return (
                <Button
                  href={link}
                  key={link + i}
                  icon={icon}
                  type={type}
                  disabled={disabled}
                  showOnlyIcon={showOnlyIcon}
                  round={round}>
                  {documentToReactComponents(label)}
                </Button>
              );
            },
          )
      : null;

  return (
    <div
      className="relative flex flex-col justify-center items-center h-screen w-screen p-8 gap-8"
      id="hero">
      <Image
        alt="hero"
        src={`https:${image.file.url}`}
        fill
        className="object-cover -z-10"
        id="hero_background"
      />
      <div
        className="absolute inset-0 bg-black opacity-50 -z-10"
        id="hero_dimmer"
      />
      <h1 className="text-6xl md:text-9xl font-semibold bg-gradient-to-r from-gradient-blue to-gradient-purple bg-clip-text text-transparent">
        {title}
      </h1>
      <div className="text-white text-center">{Description}</div>
      {ctaButtons && ctaButtons.length > 0 ? (
        <div className="flex flex-col gap-4">
          <Button
            href={ctaButtons[0]?.link}
            key={ctaButtons[0]?.link}
            icon={ctaButtons[0]?.icon}
            type={ctaButtons[0]?.type}
            disabled={ctaButtons[0]?.disabled}
            showOnlyIcon={ctaButtons[0]?.showOnlyIcon}>
            {documentToReactComponents(ctaButtons[0].label)}
          </Button>
          <div className="flex flex-row items-center justify-center gap-4">
            {Links}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Hero;
