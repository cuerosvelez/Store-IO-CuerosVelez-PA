import React from 'react';

import { useDevice } from 'vtex.device-detector';
import { index as RichText } from 'vtex.rich-text';
import { CssHandlesTypes, useCssHandles } from 'vtex.css-handles';

import type { TCARD } from './TCard';
import { Link } from 'vtex.render-runtime';

const CSS_HANDLES = [
  'container-card',
  'img-card',
  'link-img-card',
  'video-card',
  'link-video-card',
];

interface ICARD extends TCARD {
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>;
}

const Card = ({
  classes,
  alt,
  text,
  image,
  mobileImage,
  video,
  mobileVideo,
  link,
  type,
}: ICARD) => {
  const { handles } = useCssHandles(CSS_HANDLES, {
    migrationFrom: 'vtex.store-components@3.x',
    classes,
  });

  const { isMobile } = useDevice();

  return (
    <>
      {(text && !video) || (image && type === 'image') ? (
        <div className={handles['container-card']}>
          {image &&
            (link ? (
              <Link className={handles['link-img-card']} href={link}>
                <img
                  alt={alt ?? 'Card'}
                  className={handles['img-card']}
                  src={isMobile && mobileImage ? mobileImage : image}
                />
              </Link>
            ) : (
              <img
                alt={alt ?? 'Card'}
                className={handles['img-card']}
                src={isMobile && mobileImage ? mobileImage : image}
              />
            ))}
          {text && <RichText text={text} />}
        </div>
      ) : !image && video && type === 'video' ? (
        <div className={handles['container-card']}>
          {video &&
            (link ? (
              <Link className={handles['link-video-card']} href={link}>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={handles['video-card']}
                  src={isMobile && mobileVideo ? mobileVideo : video}
                ></video>
              </Link>
            ) : (
              <video
                autoPlay
                loop
                muted
                playsInline
                className={handles['video-card']}
                src={isMobile && mobileVideo ? mobileVideo : video}
              ></video>
            ))}
          {text && <RichText text={text} />}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export const PCARD = {
  __editorItemTitle: {
    default: 'Item',
    title: 'Change item title name',
    type: 'string',
  },
  type: {
    title: 'Tipo de contenido',
    type: 'string',
    enum: ['image', 'video'],
    enumNames: ['image', 'video'],
  },
  video: {
    title: 'Video',
    type: 'string',
    default: '',
  },
  videoMobile: {
    title: 'Video Mobile',
    type: 'string',
    default: '',
  },
  image: {
    title: 'Image',
    type: 'string',
    default: '',
    widget: {
      'ui:widget': 'image-uploader',
    },
  },
  mobileImage: {
    title: 'Image Mobile',
    type: 'string',
    default: '',
    widget: {
      'ui:widget': 'image-uploader',
    },
  },
  alt: {
    title: 'ALT',
    type: 'string',
    default: '',
  },
  link: {
    title: 'Link',
    type: 'string',
    default: '',
  },
  text: {
    title: 'Text',
    type: 'string',
    default: '',
    widget: {
      'ui:widget': 'textarea',
    },
  },
};

Card.schema = {
  title: 'Card',
  type: 'object',
  properties: PCARD,
};

export default Card;
