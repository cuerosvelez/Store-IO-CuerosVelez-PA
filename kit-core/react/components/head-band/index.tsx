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
    'headband',
    'headbandLink',
    'headbandParagraph',
    'headbandContainer',
  ];
  const { handles } = useCssHandles(CSS_HANDLES);

  return (
    <div
      className={`w-100 flex flex-column justify-center ${handles['headbandContainer']}`}
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
              handles['headband']
            }${href ? handles['headbandLink'] : handles['headbandParagraph']}`,
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

HeadBand.schema = {
  title: 'Head band',
  type: 'object',
  properties: {
    contentItem: {
      title: 'Head band Items',
      type: 'array',
      default: [],
      items: {
        title: 'Head band Item',
        type: 'object',
        properties: {
          __editorItemTitle: {
            type: 'string',
            default: 'Band',
            title: 'Editor Title Band',
          },
          text: {
            title: 'Text ',
            type: 'string',
            default: '',
          },
          href: {
            title: 'Link',
            type: 'string',
            default: '',
          },
          target: {
            type: 'boolean',
            default: false,
            title: 'Open in new window',
          },
        },
      },
    },
    colorBackground: {
      title: 'Color Background',
      type: 'string',
      default: '#ffffff',
      widget: {
        'ui:widget': 'color',
      },
    },
    colorText: {
      title: 'Color Text',
      type: 'string',
      default: '#000000',
      widget: {
        'ui:widget': 'color',
      },
    },
  },
};

export default HeadBand;
