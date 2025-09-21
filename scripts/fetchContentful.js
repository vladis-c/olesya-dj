import {createClient} from 'contentful';
import 'dotenv/config';
import {writeFileSync} from 'fs';
import path from 'path';

if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
  throw new Error('Missing Contentful environment variables');
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

const entries = await client.getEntries();

const filePath = path.join(process.cwd(), 'contentful-data.json');
writeFileSync(filePath, JSON.stringify(entries, null, 2));
