import React from 'react';

import { useDevice } from 'vtex.device-detector';
import { useCssHandles } from 'vtex.css-handles';
import { index as RichText } from 'vtex.rich-text';
import { Media as MediaDefault, MediaProps } from 'vtex.store-media';

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
  const { isMobile } = useDevice();
  const { handles } = useCssHandles(CSS_HANDLES);

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
        width="100%"
        height="100%"
        loading={'lazy'}
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
