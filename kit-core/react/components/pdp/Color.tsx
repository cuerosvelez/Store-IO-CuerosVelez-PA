/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo } from 'react';
import { useLazyQuery } from 'react-apollo';

import { useProduct } from 'vtex.product-context';

import GETPRODUCTBYSKUREFID from '../graphql/getProductBySkuRefId.gql';

import { getColor } from '../utils/color';
import { Link } from 'vtex.render-runtime';

import styled from '../style/style.css';

const ProductColor = () => {
  const {
    product: { productReference },
  }: any = useProduct() || {
    product: {
      productReference: undefined,
    },
  };
  const [getData, { data: { autocomplete } = { autocomplete: {} as any } }] =
    useLazyQuery(GETPRODUCTBYSKUREFID, {
      fetchPolicy: 'network-only',
    });

  const items = useMemo(() => {
    return autocomplete?.itemsReturned
      ?.filter((item: { productId: string | null }) => item?.productId !== null)
      .map(({ href }: { href?: string }) => ({
        color: getColor(href?.match(/-(\d{2})\/p/)?.[1]),
        href: href?.replace('https://portal.vtexcommercestable.com.br', ''),
      }));
  }, [autocomplete?.itemsReturned]);

  useEffect(() => {
    const search = productReference?.slice(0, -2);
    if (search) {
      getData({
        variables: {
          id: search,
        },
      });
    }
  }, [getData, productReference]);

  return (
    <div className={`${styled['productColor'] + 'Container'}`}>
      {items?.map(
        ({
          href,
          color,
        }: {
          href?: string;
          color: {
            code?: string;
            class: string;
          };
        }) => {
          return (
            <Link
              to={href}
              key={color?.code}
              scrollOptions={{ baseElementId: '' }}
              className={`${styled['productColor']} ${
                productReference?.slice(-2) === color?.code
                  ? styled['productColor'] + '--active'
                  : ''
              } ${
                color.class ? styled['productColor'] + '--' + color.class : ''
              }`}
            />
          );
        },
      )}
      <span></span>
    </div>
  );
};

export default ProductColor;
