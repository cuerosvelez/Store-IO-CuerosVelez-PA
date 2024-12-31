import React, { useCallback } from 'react';

// import { Block } from 'vtex.render-runtime';

import { useFilterTagsContext } from './Context';
// import styled from './style.css';
import { Link, useRuntime } from 'vtex.render-runtime';
import { useCssHandles } from 'vtex.css-handles';
// import { IActive } from './types/filterTags';
// import { useDevice } from 'vtex.device-detector';
// { children }: { children: ReactNode }
interface IFilter {
  filter: 'department' | 'category' | 'subCategory';
}

const CSS_HANDLES = [
  'contentFilterTags',
  'buttonFilterTags',
  'buttonFilterTags-active',
  'contentFilterTags-category',
  'contentFilterTags-department',
  'contentFilterTags-subCategory',
];

const FilterTagsProduct = ({ filter = 'category' }: IFilter) => {
  const { handles } = useCssHandles(CSS_HANDLES);
  const { items, active = {} } = useFilterTagsContext();

  const {
    route: { pathId },
  } = useRuntime();

  const newPath = useCallback(
    (id: string | undefined) => {
      const newActive = {
        ...active,
        [filter]: id === 'all' ? undefined : id,
      };

      const textPath = [
        newActive.department,
        newActive.category,
        newActive.subCategory,
      ]
        ?.join('/')
        .replace(/\/{2,}/g, '/')
        .replace(/^\/+|\/+$/g, '');

      return textPath.endsWith('/') ? textPath.slice(0, -1) : textPath;
    },
    [active, filter],
  );

  return (
    <div
      className={`flex flex-row ${handles['contentFilterTags']} ${
        handles['contentFilterTags' + '-' + filter]
      }`}
    >
      {items?.[filter]?.map(({ id, label, isHidden }, i) => {
        if (isHidden) return <></>;
        return (
          <Link
            scrollOptions={{ baseElementId: '' }}
            to={`${pathId?.replace('*p2', newPath(id))}`}
            key={'buttonFilterTags' + i}
            className={`no-underline bn pa0 fw4 relative v-mid pointer b--transparent bg-transparent ${
              handles['buttonFilterTags']
            }${
              active?.[filter] === id ||
              (id === 'all' && active?.[filter] === undefined)
                ? ' ' + handles['buttonFilterTags-active']
                : ''
            }`}
          >
            {label}
          </Link>
        );
      })}
      {/* {!isMobile && (
        <div ref={RefBread} style={{ display: 'none' }}>
          <Block id="breadcrumb.search" />
        </div>
      )} */}
    </div>
  );
};

export default FilterTagsProduct;
