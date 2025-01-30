import React, { useEffect, useMemo, useState } from 'react';

// import { Spinner } from 'vtex.styleguide';
import { useDevice } from 'vtex.device-detector';
import { index as RichText } from 'vtex.rich-text';
import { useRuntime, NoSSR } from 'vtex.render-runtime';
import { SearchResultLayoutCustomQuery } from 'vtex.search-result';

import Bread from './Bread';
import { schemaPLP } from './schemas';
import FilterTagsProduct from './FilterTags';
import { dataSchemaDpto } from './utils/dataSchemaDpto';
import { areObjectsEqual } from '../utils/areObjectsEqual';
import { formtURLToCamelCase } from '../utils/replaceString';
import { FilterTagsProvider, useFilterTagsContext } from './Context';

import type { IFilterTagsPLP } from './types/filterTags';
import { useCssHandles } from 'vtex.css-handles';

import styled from '../style/style.css';

const CSS_HANDLES = ['containerFilterTags'] as const;
const FilterTagsPLP = ({
  items,
  isSingle = false,
  department: filterDepartment,
  querySchema: querySchemaDefault,
  ...rest
}: IFilterTagsPLP) => {
  const [paramsState, setParamState] = useState<string[] | undefined>();
  const { isMobile } = useDevice();
  const { handles } = useCssHandles(CSS_HANDLES);

  const {
    route,
    route: { params },
  } = useRuntime();

  const { setItems, setActive, active } = useFilterTagsContext();

  const { dataDpto } = useMemo(() => {
    const dataDpto = dataSchemaDpto(filterDepartment) ?? [];

    if (!isSingle) {
      const buttonDpto =
        dataDpto?.map(({ id, label, isHidden }) => ({ id, label, isHidden })) ??
        [];

      const buttonCat =
        items?.map(({ id, label, isHidden }) => ({ id, label, isHidden })) ??
        [];

      setItems({
        category: buttonCat,
        department: buttonDpto,
      });
    }

    return {
      dataDpto,
    };
  }, [filterDepartment, isSingle, items, setItems]);

  const { text, image, imageMobile, querySchema, path } = useMemo(() => {
    const department = dataDpto?.find((item: { id?: string }) =>
      paramsState?.includes(item?.id ?? ''),
    );
    const category = items?.find((item: { id?: string }) =>
      paramsState?.includes(item?.id ?? ''),
    );

    const QF = querySchemaDefault?.queryField;
    const CQF = category?.querySchema?.queryField;
    const DQF = department?.querySchema?.queryField;

    const QM = querySchemaDefault?.mapField;
    const CQM = category?.querySchema?.mapField;
    const DQM = department?.querySchema?.mapField;

    return {
      ...(rest ?? {}),
      ...(department ?? {}),
      ...(category ?? {}),
      querySchema: {
        ...(querySchemaDefault ?? {}),
        ...(category?.querySchema ?? {}),
        ...(department?.querySchema ?? {}),
        queryField: `${QF ?? ''}/${DQF ?? ''}${DQF && CQF ? '/' : ''}${
          CQF ?? ''
        }`,
        mapField: `${QM ?? ''},${DQM ?? ''}${DQM && CQM ? ',' : ''}${
          CQM ?? ''
        }`,
      },
      path: {
        category: category?.id,
        department: department?.id,
      },
    };
  }, [dataDpto, items, paramsState, querySchemaDefault, rest]);

  const textDevice = useMemo(
    () =>
      text
        ?.replace(
          /\{\s*image\s*\}/g,
          `![Image product](${isMobile && imageMobile ? imageMobile : image})`,
        )
        ?.split(/\s*{\s*filtDepartment\s*}\s*/),
    [image, imageMobile, isMobile, text],
  );

  useEffect(() => {
    const veriActive = areObjectsEqual(path, active);
    if (!veriActive) {
      setActive(path);
    }
  }, [active, path, setActive]);

  useEffect(() => {
    const param = params?.terms || '';
    const paramSplit = param.split('/');

    setParamState(paramSplit);
  }, [params?.terms]);

  return (
    <div
      className={`${handles['containerFilterTags']} ${
        styled['containerFilterTag'] + formtURLToCamelCase(route?.path ?? '')
      }`}
    >
      <Bread />
      {Array.isArray(textDevice) &&
        textDevice.length > 0 &&
        textDevice.map((text, idx) => (
          <>
            {idx > 0 && <FilterTagsProduct filter={'department'} />}
            {text?.trim() !== '' && (
              <RichText
                text={text}
                textPosition="CENTER"
                textAlignment="CENTER"
                key={`content-departamen-filt-${idx}`}
              />
            )}
          </>
        ))}
      <SearchResultLayoutCustomQuery querySchema={querySchema} />
    </div>
  );
};

const FilterTagsProviderPLP = (props: IFilterTagsPLP) => (
  <FilterTagsProvider>
    <NoSSR>
      <FilterTagsPLP {...props} />
    </NoSSR>
  </FilterTagsProvider>
);

FilterTagsProviderPLP.schema = schemaPLP;

export default FilterTagsProviderPLP;
