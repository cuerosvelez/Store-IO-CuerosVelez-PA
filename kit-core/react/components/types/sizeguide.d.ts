export type propsType =
  | 'calzado'
  | 'cinturones'
  | 'prenda-superior'
  | 'prenda-inferior'
  | 'prenda-conjunto';

export type propsData = Record<
  number,
  {
    name: string;
    categories: Record<
      string,
      {
        img: string;
        type: propsType;
        isSizeNum?: boolean;
        items: Record<number, { name: string }>;
      }
    >;
  }
>;

type valuesMasterData = string | undefined | null;

interface IGuiaTallasCalzados extends ValuesRepeat {
  ancho: valuesMasterData;
  contorno: valuesMasterData;
  eu: valuesMasterData;
  largo: valuesMasterData;
  uk: valuesMasterData;
  usa: valuesMasterData;
}

interface IGuiaTallasPrendas extends ValuesRepeat {
  cintura: valuesMasterData;
  cinturabaja: valuesMasterData;
  pecho: valuesMasterData;
  cadera: valuesMasterData;
  tallanum: valuesMasterData;
}

interface IGuiaTallasCinturones extends ValuesRepeat {
  torso: valuesMasterData;
  pulgadas: valuesMasterData;
  centimetro: valuesMasterData;
  tallanum: valuesMasterData;
  cinturabaja: valuesMasterData;
  cintura: valuesMasterData;
  cadera: valuesMasterData;
}

interface ValuesRepeat {
  type:
    | 'prenda-superior'
    | 'prenda-inferior'
    | 'prenda-conjunto'
    | 'calzado'
    | 'cinturon';
  talla: valuesMasterData;
  gender: valuesMasterData;
}

type TGuiaProps = IGuiaTallasCalzados &
  IGuiaTallasCinturones &
  IGuiaTallasPrendas;

export interface IPropsTable {
  values: TGuiaProps | null | undefined;
}
