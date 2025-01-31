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

const Specifications = ({
  positionSpecification = 1,
}: {
  positionSpecification?: number;
}) => {
  const { product } = useProduct() || {};

  const productCuidados = useMemo(
    () =>
      product?.specificationGroups?.[
        positionSpecification
      ]?.specifications.find(
        (element: { name: string }) =>
          element.name == 'INSTRUCCIONES DE CUIDADO',
      )?.values[0],
    [positionSpecification, product?.specificationGroups],
  );

  const renderedCharacteristics = useMemo(() => {
    return itemsCharacteristic
      ?.map(({ name, label, fallback }) => {
        const value = product?.specificationGroups?.[
          positionSpecification
        ]?.specifications?.find(
          (element: { name: string }) => element?.name === name,
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
  }, [positionSpecification, product?.specificationGroups]);

  const sections = useMemo(
    () =>
      [
        { title: 'Descripción', content: product?.description },
        { title: 'Características', content: renderedCharacteristics },
        { title: 'Cuidados', content: productCuidados },
      ].filter(({ content }) => Boolean(content)),
    [product?.description, productCuidados, renderedCharacteristics],
  );

  return (
    <div className={`${styled['specifications']}Container`}>
      <DisclosureLayoutGroup maxVisible="many">
        {sections.map(({ title, content }, index) => (
          <article
            key={index}
            className={`w-100 ${styled['specifications']}Article`}
          >
            <DisclosureLayout
              {...(title === 'Descripción'
                ? { initialVisibility: 'visible' }
                : {})}
            >
              <DisclosureTrigger>
                <h2 className={`${styled['specifications']}Title`}>{title}</h2>
              </DisclosureTrigger>
              <DisclosureContent>
                {typeof content === 'string' ? (
                  <p className={`${styled['specifications']}Paragraph`}>
                    {content}
                  </p>
                ) : (
                  content
                )}
              </DisclosureContent>
            </DisclosureLayout>
          </article>
        ))}
      </DisclosureLayoutGroup>
    </div>
  );
};

export default Specifications;
