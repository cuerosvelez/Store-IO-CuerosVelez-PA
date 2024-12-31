const SORT_OPTIONS = [
  {
    value: '',
    label: 'store/ordenation.relevance',
  },
  {
    value: 'OrderByTopSaleDESC',
    label: 'store/ordenation.sales',
  },
  {
    value: 'OrderByReleaseDateDESC',
    label: 'store/ordenation.release.date',
  },
  {
    value: 'OrderByBestDiscountDESC',
    label: 'store/ordenation.discount',
  },
  {
    value: 'OrderByPriceDESC',
    label: 'store/ordenation.price.descending',
  },
  {
    value: 'OrderByPriceASC',
    label: 'store/ordenation.price.ascending',
  },
  {
    value: 'OrderByNameASC',
    label: 'store/ordenation.name.ascending',
  },
  {
    value: 'OrderByNameDESC',
    label: 'store/ordenation.name.descending',
  },
];

const querySchemaProps = {
  maxItemsPerPage: {
    title: 'admin/editor.search-result.query.maxItemsPerPage',
    type: 'number',
    default: 10,
  },
  priceRangeField: {
    title: 'PriceRange',
    type: 'string',
    description: 'e.g., "10 TO 233"',
  },
  orderByField: {
    title: 'Order by field',
    type: 'string',
    default: '',
    enum: SORT_OPTIONS.map((opt) => opt.value),
    enumNames: SORT_OPTIONS.map((opt) => opt.label),
  },
  hideUnavailableItems: {
    title: 'admin/editor.search-result.query.hideUnavailableItems',
    type: 'boolean',
    default: false,
  },
  skusFilter: {
    title: 'admin/editor.search-result.query.skusFilter',
    description: 'admin/editor.search-result.query.skusFilter.description',
    type: 'string',
    default: 'ALL_AVAILABLE',
    enum: ['ALL_AVAILABLE', 'ALL', 'FIRST_AVAILABLE'],
    enumNames: [
      'admin/editor.search-result.query.skusFilter.all-available',
      'admin/editor.search-result.query.skusFilter.none',
      'admin/editor.search-result.query.skusFilter.first-available',
    ],
  },
  simulationBehavior: {
    title: 'admin/editor.search-result.query.simulationBehavior',
    description:
      'admin/editor.search-result.query.simulationBehavior.description',
    type: 'string',
    default: 'default',
    enum: ['default', 'skip'],
    enumNames: [
      'admin/editor.search-result.query.simulationBehavior.default',
      'admin/editor.search-result.query.simulationBehavior.skip',
    ],
  },
  installmentCriteria: {
    title: 'admin/editor.search-result.query.installmentCriteria.title',
    description:
      'admin/editor.search-result.query.installmentCriteria.description',
    type: 'string',
    default: 'MAX_WITHOUT_INTEREST',
    enum: ['MAX_WITHOUT_INTEREST', 'MAX_WITH_INTEREST'],
    enumNames: [
      'admin/editor.search-result.query.installmentCriteria.max-without-interest',
      'admin/editor.search-result.query.installmentCriteria.max-with-interest',
    ],
  },
};

const querySchema = {
  title: 'admin/editor.search-result.query',
  description: 'admin/editor.search-result.query.description',
  type: 'object',
  properties: {
    queryField: {
      title: 'Query',
      type: 'string',
    },
    mapField: {
      title: 'Map',
      type: 'string',
    },
    ...querySchemaProps,
  },
};

const querySchemaItems = {
  title: 'admin/editor.search-result.query',
  description: 'admin/editor.search-result.query.description',
  type: 'object',
  properties: {
    subQueryField: {
      title: 'Sub Query',
      type: 'string',
    },
    subMapField: {
      title: 'Sub Map',
      type: 'string',
    },
    ...querySchemaProps,
  },
};

const propsSub = {
  __editorItemTitle: {
    default: 'PLP Items',
    title: 'Change item name',
    type: 'string',
  },
  id: {
    title: 'Id',
    type: 'string',
  },
  isHidden: {
    title: '¿Ocultar?',
    type: 'boolean',
    default: false,
  },
  text: {
    title: 'Text',
    type: 'string',
    widget: {
      'ui:widget': 'textarea',
    },
  },
  label: {
    title: 'Label',
    type: 'string',
  },
  title: {
    title: 'Title',
    type: 'string',
  },
  image: {
    title: 'Image',
    type: 'string',
    widget: {
      'ui:widget': 'image-uploader',
    },
  },
  imageMobile: {
    title: 'Image Mobile',
    type: 'string',
    widget: {
      'ui:widget': 'image-uploader',
    },
  },
  querySchema: querySchemaItems,
};

export const schemaPLP = {
  title: 'Filter Tags PLP',
  type: 'object',
  properties: {
    active: {
      title: 'Active Item',
      type: 'string',
      default: '',
    },
    isSingle: {
      title: '¿Sin Filtros Rapidos?',
      type: 'boolean',
      default: false,
    },
    text: {
      title: 'Text',
      type: 'string',
      widget: {
        'ui:widget': 'textarea',
      },
    },
    image: {
      title: 'Image',
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    imageMobile: {
      title: 'Image Mobile',
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    items: {
      title: 'Items',
      type: 'array',
      default: [],
      items: {
        type: 'object',
        properties: {
          ...propsSub,
        },
        required: ['id', 'label'],
      },
    },
    querySchema: querySchema,
  },
};
