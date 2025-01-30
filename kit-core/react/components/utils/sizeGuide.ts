/* eslint-disable @typescript-eslint/no-explicit-any */
import type { propsBagsSize, propsData, propsType } from '../types/sizeguide';

export const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

export const validateNumSize = (input: string) => {
  const isNumber = /^\d+$/;
  const validateNum = isNumber.test(input?.toString());
  if (validateNum) {
    return { tallanum: input };
  } else {
    return { talla: input };
  }
};

export const findImageByIds = ({
  categoryId,
  departmentId,
}: {
  categoryId?: number;
  departmentId?: number;
}) => {
  if (!(typeof departmentId === 'number') || !(typeof categoryId === 'number'))
    return null;
  const parent = dataSizeGuide[departmentId];
  if (!parent) return null;

  for (const categoryKey in parent?.categories) {
    const category = parent?.categories?.[categoryKey];
    if (category?.items[categoryId]) {
      return {
        img: category?.img,
        type: category?.type,
        parentName: parent?.name,
        itemName: category?.items?.[categoryId].name,
      };
    }
  }

  return null;
};

export const sortedOptionsSize = (options: any) =>
  [...options].sort((a, b) => {
    const aIndex = sizeOrder.indexOf(a.value);
    const bIndex = sizeOrder.indexOf(b.value);
    return aIndex - bIndex;
  });

export const dataSizeGuide: propsData = {
  2: {
    name: 'hombre',
    categories: {
      ropaSup: {
        type: 'prenda-superior',
        img: 'https://cuerosvelezco.vteximg.com.br/arquivos/PrendasSuperiores_Hombre.svg',
        items: {
          50: { name: 'buzos' },
          54: { name: 'chaquetas' },
          48: { name: 'blazers' },
          53: { name: 'chalecos' },
          58: { name: 'camisas' },
          55: { name: 'guantes' },
          49: { name: 'bufandas' },
          52: { name: 'camisetas-y-polos' },
          137: { name: 'camisetas-deportivas' },
          36: { name: 'chaquetas-tela' },
        },
      },
      ropaInf: {
        type: 'prenda-inferior',
        img: 'https://cuerosvelezco.vteximg.com.br/arquivos/PrendasInferiores_Hombre.svg',
        items: {
          47: { name: 'bermudas' },
          36: { name: 'ciclistas' },
          56: { name: 'jeans-pantalones' },
          59: { name: 'complementos' },
        },
      },
      cinturones: {
        type: 'cinturones',
        img: 'https://cuerosvelezco.vteximg.com.br/arquivos/Cinturones_Hombre.svg',
        items: {
          36: { name: 'doblefaz' },
          37: { name: 'unifaz' },
        },
      },
      calzado: {
        type: 'calzado',
        img: 'https://cuerosvelezco.vteximg.com.br/arquivos/Zapatos.svg',
        items: {
          67: { name: 'Botas' },
          68: { name: 'Con Cordones' },
          69: { name: 'Mocasines' },
          70: { name: 'Sandalias' },
          71: { name: 'Tenis' },
        },
      },
    },
  },
  3: {
    name: 'mujer',
    categories: {
      ropaSup: {
        type: 'prenda-superior',
        img: 'https://cuerosvelezco.vteximg.com.br/arquivos/PrendasSuperiores_Mujer.svg',
        items: {
          135: { name: 'tops' },
          101: { name: 'buzos' },
          99: { name: 'blazer' },
          105: { name: 'chaleco' },
          103: { name: 'camisas' },
          109: { name: 'guantes' },
          100: { name: 'bufandas' },
          134: { name: 'camibuzos' },
          106: { name: 'chaquetas' },
          104: { name: 'camisetas-y-polos' },
          133: { name: 'camisetas-deportivas' },
          130: { name: 'chaquetas-tela' },
        },
      },
      ropaConj: {
        type: 'prenda-conjunto',
        img: 'https://cuerosvelezco.vteximg.com.br/arquivos/PrendasSuperiores_Mujer.svg',
        items: {
          108: {
            name: 'enterizo',
          },
          113: {
            name: 'vestidos-y-faldas',
          },
        },
      },
      ropaInf: {
        type: 'prenda-inferior',
        img: 'https://cuerosvelezco.vteximg.com.br/arquivos/PrendasInferiores_Mujer.svg',
        items: {
          98: { name: 'bermudas' },
          132: { name: 'ciclistas' },
          131: { name: 'leggings' },
          112: { name: 'shorts' },
          114: { name: 'faldas-deportivas' },
          110: { name: 'jeans-y-pantalones' },
          111: { name: 'pantalones-deportivos' },
          107: { name: 'complementos' },
        },
      },
      cinturones: {
        type: 'cinturones',
        img: 'https://cuerosvelezco.vteximg.com.br/arquivos/Cinturones_Mujer.svg',
        items: {
          87: { name: 'doblefaz' },
          88: { name: 'unifaz' },
        },
      },
      calzado: {
        type: 'calzado',
        img: 'https://cuerosvelezco.vteximg.com.br/arquivos/Zapatos.svg',
        items: {
          126: { name: 'Baletas' },
          122: { name: 'Botas y Botines' },
          123: { name: 'Con Cordones' },
          124: { name: 'Mocasines' },
          125: { name: 'Sandalias' },
          127: { name: 'Suecos' },
          128: { name: 'Tacones' },
          129: { name: 'Tenis' },
        },
      },
    },
  },
  153: {
    name: 'mujer',
    categories: {
      ropaSup: {
        type: 'prenda-superior',
        img: 'https://cuerosvelezco.vteximg.com.br/arquivos/PrendasSuperiores_Mujer.svg',
        items: {
          160: { name: 'camisas-flyup' },
          159: { name: 'camisetas-flyup' },
          161: { name: 'chaquetas-y-buzos' },
        },
      },
      ropaInf: {
        type: 'prenda-inferior',
        img: 'https://cuerosvelezco.vteximg.com.br/arquivos/PrendasInferiores_Mujer.svg',
        items: {
          162: { name: 'pantalones-flyup' },
          163: { name: 'shorts-flyup' },
        },
      },
      calzado: {
        type: 'calzado',
        img: 'https://cuerosvelezco.vteximg.com.br/arquivos/Zapatos.svg',
        items: {
          165: { name: 'tenis flyup' },
        },
      },
    },
  },
  139: {
    name: 'hombre',
    categories: {
      ropaSup: {
        type: 'prenda-superior',
        img: 'https://cuerosvelezco.vteximg.com.br/arquivos/PrendasSuperiores_Hombre.svg',
        items: {
          147: { name: 'camisas-flyup' },
          146: { name: 'camisetas-flyup' },
          148: { name: 'chaquetas-y-buzos' },
        },
      },
      ropaInf: {
        type: 'prenda-inferior',
        img: 'https://cuerosvelezco.vteximg.com.br/arquivos/PrendasInferiores_Hombre.svg',
        items: {
          149: { name: 'pantalones-flyup' },
          150: { name: 'bermudas-flyup' },
        },
      },
      calzado: {
        type: 'calzado',
        img: 'https://cuerosvelezco.vteximg.com.br/arquivos/Zapatos.svg',
        items: {
          144: { name: 'tenis flyup' },
        },
      },
    },
  },
};

export const typesSize: Record<propsType, string[]> = {
  'prenda-superior': [
    'type',
    'pecho',
    'talla',
    'cadera',
    'gender',
    'cintura',
    'tallanum',
    'cinturabaja',
  ],
  'prenda-conjunto': [
    'type',
    'pecho',
    'talla',
    'cadera',
    'gender',
    'cintura',
    'tallanum',
    'cinturabaja',
  ],
  'prenda-inferior': [
    'type',
    'talla',
    'pecho',
    'gender',
    'cadera',
    'cintura',
    'tallanum',
    'cinturabaja',
  ],
  calzado: [
    'uk',
    'eu',
    'usa',
    'type',
    'largo',
    'talla',
    'ancho',
    'gender',
    'contorno',
  ],
  cinturones: [
    'type',
    'talla',
    'torso',
    'gender',
    'cadera',
    'cintura',
    'tallanum',
    'pulgadas',
    'centimetro',
    'cinturabaja',
  ],
};

export const hiddenCategorySize = [
  '1',
  '4',
  '6',
  '24',
  '5',
  '22',
  '21',
  '23',
  '7',
  '38',
  '27',
  '28',
  '25',
  '30',
  '29',
  '26',
  '8',
  '31',
  '32',
  '33',
  '34',
  '35',
  '10',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
  '12',
  '60',
  '61',
  '62',
  '63',
  '64',
  '65',
  '66',
  '14',
  '89',
  '72',
  '91',
  '74',
  '76',
  '77',
  '75',
  '73',
  '15',
  '78',
  '80',
  '81',
  '82',
  '79',
  '83',
  '84',
  '85',
  '86',
  '17',
  '90',
  '92',
  '93',
  '94',
  '95',
  '96',
  '97',
  '19',
  '115',
  '116',
  '117',
  '118',
  '119',
  '121',
  '120',
];

export const bagsSize = (properties: propsBagsSize[]): string[] =>
  properties
    ?.filter((property) => property?.name?.includes('(cm)')) // Filtrar solo propiedades con "(cm)"
    ?.map((property) => {
      const value = property?.values?.[0]; // Obtener el primer valor del array values
      const baseName = property?.name?.replace('PROFUNDO/LONGITUD', 'profundo');

      return `${baseName?.split(' (')?.[0] ?? ''} ${
        value ?? ''
      } (cm)`?.toLowerCase(); // Formar el string completo
    });
