/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { lazy } from 'react';
import { LazyComponent } from './LazyObserver';

const FilterTagsComp = lazy(
  () => import('./components/filter-tags/FilterTags'),
);
const FilterTags = (props: any) => (
  <LazyComponent>
    <FilterTagsComp {...props} />
  </LazyComponent>
);
// import { FilterTags } from './components/filter-tags';

export default FilterTags;
