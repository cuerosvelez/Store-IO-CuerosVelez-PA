const colors: {
  code: string;
  name: string;
}[] = [
  {
    code: '00',
    name: 'Negro',
  },
  {
    code: '01',
    name: 'Azul',
  },
  {
    code: '02',
    name: 'Miel',
  },
  {
    code: '03',
    name: 'Natural',
  },
  {
    code: '04',
    name: 'Dorado',
  },
  {
    code: '05',
    name: 'Brandy',
  },
  {
    code: '06',
    name: 'Cafe claro',
  },
  {
    code: '07',
    name: 'Verde',
  },
  {
    code: '08',
    name: 'Marron',
  },
  {
    code: '09',
    name: 'Blanco',
  },
  {
    code: '10',
    name: 'Combinado',
  },
  {
    code: '11',
    name: 'Cafe',
  },
  {
    code: '12',
    name: 'Vinotinto',
  },
  {
    code: '13',
    name: 'Canela',
  },
  {
    code: '14',
    name: 'Kaky',
  },
  {
    code: '15',
    name: 'Perla',
  },
  {
    code: '16',
    name: 'Rosado',
  },
  {
    code: '17',
    name: 'Camel',
  },
  {
    code: '18',
    name: 'Crepe',
  },
  {
    code: '19',
    name: 'Gris',
  },
  {
    code: '20',
    name: 'Azul claro',
  },
  {
    code: '21',
    name: 'Beige',
  },
  {
    code: '22',
    name: 'Coral',
  },
  {
    code: '23',
    name: 'Tabaco',
  },
  {
    code: '24',
    name: 'Terracota',
  },
  {
    code: '25',
    name: 'Rojo',
  },
  {
    code: '26',
    name: 'Morado',
  },
  {
    code: '27',
    name: 'Amarillo',
  },
  {
    code: '28',
    name: 'Azul oscuro',
  },
  {
    code: '29',
    name: 'Amarillo limon',
  },
  {
    code: '30',
    name: 'Verde limon',
  },
  {
    code: '31',
    name: 'Arena',
  },
  {
    code: '32',
    name: 'Crema',
  },
  {
    code: '33',
    name: 'Naranja',
  },
  {
    code: '34',
    name: 'Ocre',
  },
  {
    code: '35',
    name: 'Transparente',
  },
  {
    code: '36',
    name: 'Bronce',
  },
  {
    code: '37',
    name: 'Mostaza',
  },
  {
    code: '38',
    name: 'Plata',
  },
  {
    code: '39',
    name: 'Fucsia',
  },
  {
    code: '40',
    name: 'Lila',
  },
  {
    code: '41',
    name: 'Grafito',
  },
  {
    code: '42',
    name: 'Niquel',
  },
  {
    code: '43',
    name: 'Multicolor',
  },
  {
    code: '44',
    name: 'Nb',
  },
  {
    code: '46',
    name: 'Nbip',
  },
  {
    code: '47',
    name: 'Cafe medio',
  },
  {
    code: '54',
    name: 'Nn',
  },
  {
    code: '58',
    name: 'Verde oliva',
  },
  {
    code: '60',
    name: 'Ns (niquel satinado)',
  },
  {
    code: '63',
    name: 'Cobre',
  },
  {
    code: '64',
    name: 'Gris pistola',
  },
  {
    code: '68',
    name: 'Mora',
  },
  {
    code: '70',
    name: 'Neutro',
  },
  {
    code: '72',
    name: 'Ple',
  },
  {
    code: '80',
    name: 'Oro dorado',
  },
  {
    code: '81',
    name: 'Oro mate',
  },
  {
    code: '83',
    name: 'Aluminio',
  },
  {
    code: '84',
    name: 'Agua marina',
  },
  {
    code: '85',
    name: 'Azul aguamarina',
  },
  {
    code: '86',
    name: 'Negro perlado',
  },
  {
    code: '88',
    name: 'Varios',
  },
  {
    code: '99',
    name: 'Unico',
  },
];
const textClass = (texto?: string): string | undefined => {
  // Convertir a minúsculas
  const minusculas = texto?.toLowerCase();

  // Eliminar tildes utilizando `normalize` y una expresión regular
  const sinTildes = minusculas
    ?.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  // Reemplazar espacios con guiones
  const conGuiones = sinTildes?.replace(/\s+/g, '-');

  return conGuiones;
};

export const getColor = (codeToFind?: string) => {
  const color = colors.find((item) => item.code === codeToFind);

  if (!color) return;

  return {
    class: textClass(color?.name),
    ...color,
  };
};
