import React, { useMemo } from 'react';
import { useProduct } from 'vtex.product-context';

import {
  DisclosureLayout,
  DisclosureTrigger,
  DisclosureContent,
  DisclosureLayoutGroup,
} from 'vtex.disclosure-layout';

import styled from '../style/style.css';

const itemsCharacteristic = [
  {
    name: 'CARACTERÍSTICAS',
  },
  {
    name: 'FORRO',
  },
  {
    name: 'PESO (gr)',
  },
  {
    name: 'PROFUNDO/LONGITUD (cm)',
    label: 'Largo (cm)',
    fallback: 'Ver guía de tallas',
  },
  {
    name: 'ANCHO (cm)',
    fallback: 'Ver guía de tallas',
  },
  {
    name: 'ALTO (cm)',
    fallback: 'Ver guía de tallas',
  },
  {
    name: 'COMPOSICIÓN',
  },
  {
    name: 'PAÍS DE ORIGEN',
  },
  {
    name: 'FABRICANTE Y/O IMPORTADOR',
    label: 'Fabricante Y/O Importador',
  },
  {
    name: 'REGISTRO SIC',
  },
];

const Specifications = () => {
  const { product } = useProduct() || {};

  const productCuidados = useMemo(
    () =>
      product?.specificationGroups?.[2]?.specifications.find(
        (element: { name: string }) =>
          element.name == 'INSTRUCCIONES DE CUIDADO',
      )?.values[0],
    [product?.specificationGroups],
  );

  const renderedCharacteristics = useMemo(() => {
    return itemsCharacteristic
      ?.map(({ name, label, fallback }) => {
        const value = product?.specificationGroups?.[2]?.specifications?.find(
          (element) => element?.name === name,
        )?.values[0];

        if (!value) return null;

        return (
          <p
            key={name}
            className={`${styled['specifications']}Paragraph`}
            dangerouslySetInnerHTML={{
              __html: `<b class='db ${styled['specifications']}ParagraphBold' >
              ${label ?? name}:
            </b>
            <br />
            ${value ?? fallback}
            `,
            }}
          />
        );
      })
      .filter(Boolean);
  }, [product]);

  return (
    <div className={`${styled['specifications'] + 'Container'}`}>
      <DisclosureLayoutGroup>
        {product?.description ? (
          <DisclosureLayout>
            <DisclosureTrigger>Descripción</DisclosureTrigger>
            <DisclosureContent>
              <p className={`${styled['specifications']}Paragraph`}>
                {product?.description}
              </p>
            </DisclosureContent>
          </DisclosureLayout>
        ) : (
          <></>
        )}
        {renderedCharacteristics && renderedCharacteristics.length > 0 && (
          <DisclosureLayout>
            <DisclosureTrigger>Características</DisclosureTrigger>
            <DisclosureContent>{renderedCharacteristics}</DisclosureContent>
          </DisclosureLayout>
        )}

        {productCuidados && (
          <DisclosureLayout>
            <DisclosureTrigger>Cuidados</DisclosureTrigger>
            <DisclosureContent>
              {' '}
              <p className={`${styled['specifications']}Paragraph`}>
                {productCuidados}
              </p>
            </DisclosureContent>
          </DisclosureLayout>
        )}
      </DisclosureLayoutGroup>
    </div>
  );
};

export default Specifications;
