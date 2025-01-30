import React from 'react';

import { useCssHandles } from 'vtex.css-handles';

import { Media, Button } from '../index';

import type { ButtonProps, MediaProps } from '../../types/media';

interface MediaButtonProps extends MediaProps {
  image?: string;
  video?: string;
  textSeo: string;
  imageMobile?: string;
  mobileVideo?: string;
  buttonList: ButtonProps;
  mediaType?: 'image' | 'video';
}

const CSS_HANDLES = ['mediaButtonContainer'] as const;
const MediaButton = ({ buttonList, ...rest }: MediaButtonProps) => {
  const { handles } = useCssHandles(CSS_HANDLES);

  return (
    <div className={`relative flex items-end ${handles.mediaButtonContainer}`}>
      <Media {...rest} />
      {buttonList && <Button {...buttonList} />}
    </div>
  );
};

export default MediaButton;
