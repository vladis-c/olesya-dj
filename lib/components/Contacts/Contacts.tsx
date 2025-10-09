import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import {Document} from '@contentful/rich-text-types';
import {ContentfulCTAButton, ContentfulContacts} from '@/lib/contentful';
import Button from '../Button';

type ContactsProps = {
  content: {fields: ContentfulContacts | undefined} | undefined;
};

const Contacts = async ({content}: ContactsProps) => {
  const title = content?.fields?.title;

  const ctaButtons = (
    content?.fields?.ctaButtons as ContentfulCTAButton[]
  )?.map(el => {
    const disabled = !el.fields?.enabled;
    const label = el.fields?.label as Document;
    const link = el.fields?.link ?? el.fields.email ?? '';
    const showOnlyIcon = el.fields?.showOnlyIcon;
    const icon = el.fields?.icon?.[0];
    const type = el.fields?.type;
    const round = el.fields?.round;

    return {label, link, disabled, showOnlyIcon, icon, type, round};
  });

  const buttonsExist = ctaButtons && ctaButtons.length > 0;

  const Emails = buttonsExist
    ? ctaButtons
        .filter(el => el.type === 'box')
        .map(({link, disabled, label, icon, showOnlyIcon, type, round}, i) => {
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
        })
    : null;

  const Links = buttonsExist
    ? ctaButtons
        .filter(el => el.type !== 'box')
        .map(({link, disabled, label, icon, showOnlyIcon, type, round}, i) => {
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
        })
    : null;

  return (
    <div
      className="relative flex flex-col justify-center items-center w-screen py-24 gap-8"
      id="contacts">
      <h1 className="pb-8 text-4xl font-semibold bg-gradient-to-r from-gradient-purple to-gradient-blue bg-clip-text text-transparent">
        {title}
      </h1>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
        {Emails}
      </div>
      <div className="flex flex-row justify-between items-center gap-8">
        {Links}
      </div>
    </div>
  );
};

export default Contacts;
