import React from 'react';

import { Icon } from 'vtex.store-icons';
import { useCssHandles } from 'vtex.css-handles';

interface IBtnSearch {
  isActiveSearch: boolean;
  setIsActiveSearch: (value: React.SetStateAction<boolean>) => void;
}

const CSS_HANDLES = ['iconSearch', 'iconSearchButton'] as const;

const BtnSearch = ({ isActiveSearch, setIsActiveSearch }: IBtnSearch) => {
  const { handles } = useCssHandles(CSS_HANDLES);

  return (
    <button
      onClick={() => {
        setIsActiveSearch((s) => !s);
      }}
      className={`relative bw0 pa0 pointer bg-transparent flex flex-row items-center ${handles['iconSearchButton']}`}
    >
      <Icon
        isActive={true}
        activeClassName={handles['iconSearch']}
        id={isActiveSearch ? 'sti-close--line' : 'icon-search'}
      />
    </button>
  );
};

export default BtnSearch;
