import React from 'react';
import { useCssHandles } from 'vtex.css-handles';
import { Link } from 'vtex.render-runtime';

import { useButtonStyle, useWrapperButtonStyle } from './hook/useButtonStyle';

import type {
  ButtonContentType,
  ButtonProps,
  ButtonType,
} from '../../types/media';
import { css } from '@emotion/css';

const CSS_HANDLES = [
  'mediaButton',
  'wrapperTextBanner',
  'wrapperMediaButton',
  'containerMediaButton',
  'contentTextMediaButton',
] as const;

const ButtonContent = ({
  url,
  name,
  newTab,
  handles,
  colorSingle,
  colorBackground,
  advancedSettings,
}: ButtonContentType) => {
  const { buttonStyle } = useButtonStyle({
    colorSingle,
    colorBackground,
    advancedSettings,
  });

  return (
    <Link
      className={`tc dib ${handles?.mediaButton} ${css(buttonStyle)}`}
      href={url}
      target={newTab ? '_blank' : '_self'}
      rel="noreferrer"
    >
      {name}
    </Link>
  );
};

const Button: React.FC<ButtonProps> = ({
  buttons,
  colorBackground,
  color = '#CFCFCF',
  listPositionMobile,
  listPositionDesktop,
  advancedSettings = {},
}) => {
  const { handles } = useCssHandles(CSS_HANDLES);

  const { wrapperClass, wrapperStyle } = useWrapperButtonStyle({
    advancedSettings,
    listPositionMobile,
    listPositionDesktop,
  });

  return (
    <div
      className={`${wrapperClass} ${handles.wrapperMediaButton}`}
      style={wrapperStyle}
    >
      {buttons?.map((item: ButtonType, idx) => (
        <ButtonContent
          handles={handles}
          key={`button-banner-${idx}`}
          {...{
            colorSingle: color,
            colorBackground,
            ...item,
            advancedSettings,
          }}
        />
      ))}
    </div>
  );
};

export default Button;
