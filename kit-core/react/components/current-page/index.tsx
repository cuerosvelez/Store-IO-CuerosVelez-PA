import React, { ReactChildren, useEffect, useMemo, useState } from 'react';

import { useSearchPage } from 'vtex.search-page-context/SearchPageContext';

import styled from '../style/style.css';
import { css } from '@emotion/css';
import { useRuntime } from 'vtex.render-runtime';
// import { useRuntime } from 'vtex.render-runtime';

const classContent = (content: string) => css`
  .vtex-button__label::after {
    content: '${content}';
  }
`;
const CurrentPage = ({
  children,
  isPrev,
}: {
  isPrev: boolean;
  children: ReactChildren;
}) => {
  const { query } = useRuntime();
  const { maxItemsPerPage, searchQuery, page } = useSearchPage();

  const [state, setState] = useState<number>(page);

  useEffect(() => {
    const current = Number(query?.page ?? '');
    if (current <= state) {
      setState((s) => (s > 0 ? s - 1 : s));
    }
  }, [query, state]);

  const totalPages = useMemo(
    () =>
      classContent(
        `${
          isPrev
            ? state
            : Math.ceil(
                (searchQuery?.products?.length + state * maxItemsPerPage) /
                  maxItemsPerPage,
              )
        }/${Math.ceil(searchQuery?.recordsFiltered / maxItemsPerPage)}`,
      ),
    [
      state,
      isPrev,
      maxItemsPerPage,
      searchQuery?.recordsFiltered,
      searchQuery?.products?.length,
    ],
  );

  return (
    <div className={`${totalPages} ${styled.currentPage}`}>{children}</div>
  );
};

export default CurrentPage;
