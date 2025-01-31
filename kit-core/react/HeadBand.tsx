/* eslint-disable @typescript-eslint/no-explicit-any */
// import HeadBand from './components/head-band';

import React, { lazy } from 'react';
import { LazyComponent } from './LazyObserver';

const HeadBandComp = lazy(() => import('./components/head-band'));

const HeadBand = (props: any) => (
  <LazyComponent
    skeleton={{
      height: 38,
    }}
  >
    <HeadBandComp {...props} />
  </LazyComponent>
);

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
