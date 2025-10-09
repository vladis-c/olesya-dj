import {Document} from '@contentful/rich-text-types';
import {Entry, createClient} from 'contentful';
import {ButtonType} from './components/Button/Button';
import {IconType} from './components/Icons';

const isPreview = process.env.VERCEL_ENV !== 'production';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: isPreview
    ? (process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN as string)
    : (process.env.CONTENTFUL_ACCESS_TOKEN as string),
  host: isPreview ? 'preview.contentful.com' : 'cdn.contentful.com',
});

export default client;

export type ContentfulHero = {
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
        icon: IconType[];
        type: ButtonType;
      };
    },
  ];
};

export type ContentfulDjSet = {
  title: Document;
  description: Document;
  /** YYYY-DD-MMTHH:mm+Z */
  date?: string;
  videoUrl?: string;
  disabled: boolean;
};

export type ContentfulDjLife = {
  title: string;
  url: string;
  disabled: boolean;
};

export type ContentfulAbout = {
  title: Document;
  description: Document;
  genres?: string[];
  places?: string[];
  background?: Entry;
};

export type ContentfulLimits = {
  title: string;
  setsLimit: number;
  lifeLimit: number;
};

export type ContentfulMedia = {
  title: string;
  descriptions: string;
  file: {
    url: string;
    details: {size: number; image: {width: number; height: number}};
  };
};
