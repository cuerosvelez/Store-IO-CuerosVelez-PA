// import type { ReactNode } from 'react';

export interface querySchemaProps {
  maxItemsPerPage?: number;
  orderByField?:
    | 'OrderByReleaseDateDESC'
    | 'OrderByBestDiscountDESC'
    | 'OrderByPriceDESC'
    | 'OrderByPriceASC'
    | 'OrderByNameASC'
    | 'OrderByNameDESC'
    | 'OrderByTopSaleDESC'
    | '';
  hideUnavailableItems?: boolean;
  facetsBehavior?: string;
  skusFilter?: 'FIRST_AVAILABLE' | 'ALL_AVAILABLE' | 'ALL';
  simulationBehavior?: 'default' | 'skip';
  installmentCriteria?: 'MAX_WITHOUT_INTEREST' | 'MAX_WITH_INTEREST';
  excludedPaymentSystems?: string;
  includedPaymentSystems?: string;
}

interface querySchema extends querySchemaProps {
  queryField?: string;
  mapField?: string;
}

export interface IItem {
  id?: string;
  text?: string;
  label?: string;
  image?: string;
  isHidden?: boolean;
  imageMobile?: string;
  querySchema?: querySchema;
}

export interface IFilterTagsPLP {
  text?: string;
  image?: string;
  items?: IItem[];
  isSingle: boolean;
  imageMobile?: string;
  querySchema?: querySchema;
  department?: IFilterDepartment[];
}

export interface IActive {
  department?: string;
  category?: string;
  subCategory?: boolean;
}
