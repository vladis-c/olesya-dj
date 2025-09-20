import {createClient} from 'contentful';

const isPreview = process.env.VERCEL_ENV !== 'production';

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: isPreview
    ? (process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN as string)
    : (process.env.CONTENTFUL_ACCESS_TOKEN as string),
  host: isPreview ? 'preview.contentful.com' : 'cdn.contentful.com',
});
