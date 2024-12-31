import React from 'react';

import { useDevice } from 'vtex.device-detector';
import { useCssHandles } from 'vtex.css-handles';
import { index as RichText } from 'vtex.rich-text';
import { Media as MediaDefault } from 'vtex.store-media';

import { MediaProps as MediaDefaultProps } from 'vtex.store-media';

export interface MediaProps extends MediaDefaultProps {
  image?: string;
  video?: string;
  textSeo: string;
  imageMobile?: string;
  mobileVideo?: string;
  mediaType?: 'image' | 'video';
}

const CSS_HANDLES = ['mediaContainer'] as const;
export const Media = ({
  video,
  image,
  textSeo,
  mediaType,
  mobileVideo,
  imageMobile,
  ...rest
}: MediaProps) => {
  const { handles } = useCssHandles(CSS_HANDLES);
  const { isMobile } = useDevice();

  return (
    <div className={handles.mediaContainer}>
      {textSeo && (
        <div
          style={{
            opacity: 0.1,
            width: 0.005,
            height: 0.005,
            overflow: 'hidden',
            position: 'absolute',
          }}
        >
          <RichText
            text={textSeo}
            textPosition="CENTER"
            textAlignment="CENTER"
          />
        </div>
      )}
      <MediaDefault
        {...rest}
        src={
          mediaType === 'image'
            ? isMobile && imageMobile
              ? imageMobile
              : image
            : isMobile && mobileVideo
            ? mobileVideo
            : video
        }
      />
    </div>
  );
};

export default Media;
