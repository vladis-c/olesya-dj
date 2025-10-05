import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import {Document} from '@contentful/rich-text-types';
import {Entry} from 'contentful';
import Image from 'next/image';
import React, {ComponentProps} from 'react';
import {client} from '@/lib/contentful';
import data from '../../../contentful-data.json';
import Button from '../Button';
import Icons from '../Icons';

type ContentfulHero = {
  title: string;
  description?: Document;
  background?: Entry;
  ctaButtons?: [
    {
      fields: {
        label: Document;
        link: string;
        enabled: boolean;
        showOnlyIcon: boolean;
        icon: (keyof typeof Icons)[];
        type: ComponentProps<typeof Button>['type'];
      };
    },
  ];
};

type ContentfulMedia = {
  title: string;
  descriptions: string;
  file: {
    url: string;
    details: {size: number; image: {width: number; height: number}};
  };
};

const Hero = async () => {
  // const data = await client.getEntries();
  const content = data.items.find(el => el.sys.contentType.sys.id === 'hero');

  const description = content?.fields
    ?.description as ContentfulHero['description'];

  const Description = description
    ? documentToReactComponents(description)
    : null;

  const background = content?.fields
    ?.background as ContentfulHero['background'];

  const image = background?.fields as ContentfulMedia;

  const title = content?.fields.title as ContentfulHero['title'];

  const ctaButtons = (
    content?.fields?.ctaButtons as ContentfulHero['ctaButtons']
  )?.map(el => {
    const disabled = !el.fields?.enabled;
    const label = el.fields?.label as Document;
    const link = el.fields?.link;
    const showOnlyIcon = el.fields?.showOnlyIcon;
    const icon = el.fields?.icon?.[0];
    const type = el.fields?.type;

    return {label, link, disabled, showOnlyIcon, icon, type};
  });

  const Links =
    ctaButtons && ctaButtons.length > 0
      ? ctaButtons
          .slice(1)
          .map(({link, disabled, label, icon, showOnlyIcon, type}, i) => {
            return (
              <Button
                href={link}
                key={link + i}
                icon={icon}
                type={type}
                disabled={disabled}
                showOnlyIcon={showOnlyIcon}>
                {documentToReactComponents(label)}
              </Button>
            );
          })
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
        id="hero-background"
      />
      <div className="absolute inset-0 bg-black opacity-50 -z-10" id="dimmer" />
      <h1
        className="text-6xl md:text-9xl font-semibold bg-gradient-to-r from-gradient-blue to-gradient-purple bg-clip-text text-transparent"
        id="title">
        {title}
      </h1>
      <div id="description" className="text-white text-center">
        {Description}
      </div>
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
