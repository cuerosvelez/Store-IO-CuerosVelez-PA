import React from 'react';
import styled from '../style/style.css';
import { IPropsTable, valuesMasterData } from '../types/sizeguide';

const ColumnSize = ({
  title,
  value,
}: {
  title: string;
  value: valuesMasterData;
}) => (
  <div className={styled['sizeGuide'] + 'ContentCol'}>
    <p className={styled['sizeGuide'] + 'TitleCol'}>{title}</p>
    <div className={styled['sizeGuide'] + 'Col'}>{value}</div>
  </div>
);

const TableContent = ({ values }: IPropsTable) => {
  switch (values?.type) {
    case 'calzado':
      return (
        <>
          <ColumnSize title="'Largo'" value={values?.largo} />
          <ColumnSize title="Contorno" value={values?.contorno} />
        </>
      );
    case 'prenda-conjunto':
      return (
        <>
          <ColumnSize title="Cintura Alta" value={values?.cintura} />
          <ColumnSize title="Cadera" value={values?.cadera} />
        </>
      );
    case 'prenda-inferior':
      return (
        <>
          <ColumnSize title="Cadera" value={values?.cadera} />
          <ColumnSize
            title={`Cintura ${values?.gender === 'mujer' ? 'Alta' : ''}`}
            value={values?.cintura}
          />
        </>
      );
    case 'prenda-superior': {
      const isMujer = values?.gender === 'mujer';
      return (
        <>
          <ColumnSize title="Pecho" value={values?.pecho} />
          <ColumnSize title="Cintura Alta" value={values?.cintura} />
          {isMujer && (
            <ColumnSize title="Cintura Baja" value={values?.cinturabaja} />
          )}
        </>
      );
    }
    default: {
      const isMujerDefault = values?.gender === 'mujer';
      return (
        <>
          <ColumnSize
            title="Cadera"
            value={values?.cadera || values?.centimetro}
          />
          {isMujerDefault && (
            <>
              <ColumnSize
                title="Cintura Baja"
                value={values?.cinturabaja || values?.cintura}
              />
              <ColumnSize title="Torso" value={values?.torso} />
            </>
          )}
        </>
      );
    }
  }
};

export const Table = ({ values }: IPropsTable) => {
  return (
    <div className={styled['sizeGuide'] + 'ContainerTable'}>
      {!values ? (
        <div className={styled['sizeGuide'] + 'NotFound'}>
          <p>
            Lo sentimos... ¡Pero la información para el tamaño seleccionado aún
            no se ha completado!
          </p>
        </div>
      ) : (
        <>
          <h2 className={styled['sizeGuide'] + 'SubTitle'}>
            Talla {values?.talla}
          </h2>
          <div className={styled['sizeGuide'] + 'Table'}>
            <div
              className={
                values?.type === 'calzado'
                  ? styled['sizeGuide'] + 'TableTwo'
                  : styled['sizeGuide'] + 'TableThree'
              }
            >
              <TableContent values={values} />
            </div>
            {values?.type === 'calzado' && (
              <>
                <p className={styled['sizeGuide'] + 'Info'}>Medidas en CM*</p>
                <div className={styled['sizeGuide'] + 'Spacing'} />
                <div className={styled['sizeGuide'] + 'TableOne'}>
                  <h5>Talla</h5>
                  <div className={styled['sizeGuide'] + 'SubTableOne'}>
                    <ColumnSize title="EU" value={values?.eu} />
                    <ColumnSize title="USA" value={values?.usa} />
                    <ColumnSize title="UK" value={values?.uk} />
                  </div>
                </div>
              </>
            )}
          </div>
          {values?.type === 'cinturon' && (
            <>
              <p className={styled['sizeGuide'] + 'Info'}>
                Los rangos de talla varían +/-{' '}
                {values?.gender === 'mujer' ? '3' : '2,5'} cm entre cada una
              </p>
              <p className={styled['sizeGuide'] + 'Info'}>
                *Medida de tira hasta 3er perforado
              </p>
            </>
          )}
          {values?.type !== 'calzado' && (
            <p className={styled['sizeGuide'] + 'Info'}>Medidas en CM*</p>
          )}
          <div className={styled['sizeGuide'] + 'ContainerInfo'}>
            <p className={styled['sizeGuide'] + 'InfoTitle'}>
              ¿No es la talla correcta?
            </p>
            <p className={styled['sizeGuide'] + 'InfoDesc'}>
              No te preocupes, ofrecemos cambios y devoluciones gratuitos
            </p>
          </div>
        </>
      )}
    </div>
  );
};
