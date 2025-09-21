import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import {Document} from '@contentful/rich-text-types';
import {Entry} from 'contentful';
import Image from 'next/image';
import React from 'react';
import {client} from '@/lib/contentful';
// import data from '../../../contentful-data.json';
import Button from '../Button';

type ContentfulHero = {
  title: string;
  description?: Document;
  background?: Entry;
  ctaButtons?: [{fields: {label: Document; link: string}}];
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
  const data = await client.getEntries();
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
    const label = el.fields.label as Document;
    const link = el.fields.link;

    return {label, link};
  });

  const Links =
    ctaButtons && ctaButtons.length > 0
      ? ctaButtons.map((ctaButton, i) => (
          <Button
            href={ctaButton.link}
            key={ctaButton.link + i}
            icon="headphones">
            {documentToReactComponents(ctaButton.label)}
          </Button>
        ))
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
      <h1 className="text-9xl text-white font-semibold " id="title">
        {title}
      </h1>
      <div id="description">{Description}</div>
      {Links}
    </div>
  );
};

export default Hero;
