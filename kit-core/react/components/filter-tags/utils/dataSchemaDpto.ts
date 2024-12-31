import { IItem, querySchemaProps } from '../types/filterTags';

const schemaD: querySchemaProps = {
  maxItemsPerPage: 16,
  skusFilter: 'ALL_AVAILABLE',
  simulationBehavior: 'default',
  orderByField: 'OrderByTopSaleDESC',
};

const dpto: IItem[] = [
  {
    id: 'mujer',
    label: 'Mujer',
    querySchema: {
      queryField: 'mujer',
      mapField: 'category-1',
      ...schemaD,
    },
  },
  {
    id: 'hombre',
    label: 'Hombre',
    querySchema: {
      queryField: 'hombre',
      mapField: 'category-1',
      ...schemaD,
    },
  },
];

export const dataSchemaDpto = (data: IItem[] | undefined): IItem[] => {
  if (!Array.isArray(data)) return dpto;
  if (data.length === 0) return dpto;

  const result = [...dpto, ...data].reduce((acc: IItem[], current) => {
    const existingIndex = acc.findIndex((item) => item.id === current.id);

    if (existingIndex !== -1) {
      acc[existingIndex] = {
        ...acc[existingIndex],
        ...current,
        querySchema: {
          ...acc[existingIndex].querySchema,
          ...current.querySchema,
        },
      };
    } else {
      acc.push(current);
    }

    return acc;
  }, []);

  const idOrder = data.map((item) => item.id);

  const orderedResult = result.sort((a, b) => {
    return idOrder.indexOf(a.id) - idOrder.indexOf(b.id);
  });

  return orderedResult;
};
