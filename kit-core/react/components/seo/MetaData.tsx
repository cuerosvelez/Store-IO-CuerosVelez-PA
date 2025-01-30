import React from 'react';
import { Helmet } from 'vtex.render-runtime';

interface Props {
  description: string | undefined;
}

const MetaData = ({
  description = 'Viste con elegancia y estilo. Conoce los exclusivos productos de la tienda online de ropa, zapatos y accesorios en cuero Vélez Colombia. ¡Compra ahora!',
}: Props) => (
  <Helmet>
    <meta name="description" content={description} />
    <meta property="og:description" content={description} />
    <meta
      property="og:image"
      content="https://cuerosvelezco.vtexassets.com/assets/vtex.file-manager-graphql/images/b4e30667-44f7-45b6-8089-dc99b8591886___2563a222064351cad1b29c15a10c4525.png"
    />
  </Helmet>
);

MetaData.schema = {
  title: 'Metas',
  type: 'object',
  properties: {
    description: {
      title: 'Meta description',
      type: 'string',
      default:
        'Viste con elegancia y estilo. Conoce los exclusivos productos de la tienda online de ropa, zapatos y accesorios en cuero Vélez Colombia. ¡Compra ahora!',
    },
  },
};

export default MetaData;
