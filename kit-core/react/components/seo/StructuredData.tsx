import React from 'react';
import { Helmet } from 'vtex.render-runtime';
import { helmetJsonLdProp } from 'react-schemaorg';

interface IStructuredData {
  json__ld: string;
}

interface Props {
  structuredDataList: IStructuredData[];
}

const StructuredData = ({ structuredDataList }: Props) => (
  <>
    {structuredDataList?.map((item, i) => (
      <Helmet key={i}>
        <script {...helmetJsonLdProp(item?.json__ld)} />
      </Helmet>
    ))}
  </>
);

StructuredData.schema = {
  title: 'Datos Estructurados',
  type: 'object',
  properties: {
    structuredDataList: {
      title: 'objetos JSON-LD',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          __editorItemTitle: {
            title: 'titulo del elemento',
            type: 'string',
          },
          json__ld: {
            title: 'JSON-LD',
            type: 'string',
          },
        },
      },
    },
  },
};

export default StructuredData;
