/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createElement } from 'react';
import { useCssHandles } from 'vtex.css-handles';
import SliderLayoutBand from './SliderLayoutBand';

import type { HeadBandProps } from './types.d';
import { styleHeaders } from '../utils/styleSeo';

export type { HeadBandProps };

const HeadBand = ({
  children,
  colorText,
  contentItem,
  sliderProps,
  colorBackground,
}: HeadBandProps) => {
  const CSS_HANDLES = [
    'headBand',
    'headBandLink',
    'headBandParagraph',
    'headBandContainer',
  ];
  const { handles } = useCssHandles(CSS_HANDLES);

  return (
    <div
      className={`w-100 flex flex-column justify-center ${handles['headBandContainer']}`}
      style={{
        backgroundColor: colorBackground,
      }}
    >
      <h2 style={styleHeaders}>Promociones destacadas</h2>
      <SliderLayoutBand
        {...{
          infinite: true,
          showPaginationDots: 'never',
          showNavigationArrows: 'never',
          autoplay: {
            timeout: 4000,
            stopOnHover: false,
          },
          itemsPerPage: {
            desktop: 1,
            tablet: 1,
            phone: 1,
          },
          slideTransition: {
            speed: 2000,
            delay: 0,
            timing: '',
          },
          totalItems: contentItem.length,
          ...sliderProps,
        }}
      >
        {contentItem?.map(({ href, text, target = false }, idx) => {
          const props = {
            key: `cintilla-${text}-${idx}`,
            ...(href ? { href } : {}),
            ...(target ? { target: '_blank' } : {}),
            className: `w-100 ma0${href ? ' tc no-underline' : ''} ${
              handles['headBand']
            } ${href ? handles['headBandLink'] : handles['headBandParagraph']}`,
            style: {
              color: colorText,
            },
          };

          const Element = createElement(href ? 'a' : 'p', props, text);
          return Element;
        })}
        {children}
      </SliderLayoutBand>
    </div>
  );
};

export default HeadBand;
