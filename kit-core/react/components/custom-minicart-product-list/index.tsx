/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, memo, useCallback } from 'react';
import { Icon } from 'vtex.store-icons';
import { Link } from 'vtex.render-runtime';
import { FormattedPrice } from 'vtex.formatted-price';
import { useOrderForm } from 'vtex.order-manager/OrderForm';
import { useOrderItems } from 'vtex.order-items/OrderItems';
import styles from '../style/style.css';
import { styleHeaders } from '../utils/styleSeo';

// Tipado del producto
interface CartItem {
  name: string;
  price: number | null;
  refId: string;
  imageUrl: string;
  uniqueId: string;
  quantity: number;
  imageUrls: { at1x?: string };
  detailUrl: string;
  sellingPrice: number;
  additionalInfo: { brandName: string };
  skuSpecifications: { fieldName: string; fieldValues: string[] }[];
}

const getFormattedPrice = (price: number | undefined | null) => {
  return price != null ? price / 100 : price;
};

// Componente para cada producto del carrito
const ProductItem = memo(
  ({
    product,
    index,
    onRemove,
  }: {
    product: CartItem;
    index: number;
    onRemove: (index: number) => void;
  }) => {
    const {
      name,
      price,
      refId,
      imageUrl,
      uniqueId,
      quantity,
      imageUrls,
      detailUrl,
      sellingPrice,
      additionalInfo,
      skuSpecifications,
    } = product;

    return (
      <div key={uniqueId} className={`${styles.product + 'Container'}`}>
        <img
          alt={name}
          className={styles.product + 'Image'}
          src={imageUrls?.at1x || imageUrl}
        />
        <div className={styles.product + 'Infos'}>
          <div className={styles.product + 'Autor'}>
            {additionalInfo?.brandName}
          </div>
          <div className={styles.product + 'NameAndRemoveButtonContainer'}>
            <Link className={styles.product + 'Name'} href={detailUrl}>
              {name}
            </Link>
            <div className={styles.product + 'IconsContainer'}>
              <button
                aria-label="Editar producto"
                className={styles.product + 'RemoveButton'}
              >
                <Link
                  to={detailUrl}
                  className={`${styles.product + 'RemoveButtonLink'}`}
                >
                  <p style={styleHeaders}>Editar</p>
                  <Icon
                    isActive
                    id="icon-edit"
                    activeClassName={styles.product + 'IconMinicartEdit'}
                  />
                </Link>
              </button>
              <button
                aria-label="Remover producto"
                className={styles.product + 'RemoveButton'}
                onClick={() => onRemove(index)}
              >
                <p style={styleHeaders}>Remover producto</p>
                <Icon
                  isActive
                  id="icon-remove"
                  activeClassName={styles.product + 'IconMinicartRemove'}
                />
              </button>
            </div>
          </div>
          <div className={styles.product + 'Variations'}>
            {skuSpecifications?.map((spec, specIndex) => (
              <div
                key={specIndex}
                className={styles.product + 'VariationsItens'}
              >
                {spec.fieldName}: {spec.fieldValues?.[0]}
              </div>
            ))}
            <div className={styles.product + 'VariationsItens'}>
              Cantidad: {quantity}
            </div>
            <div className={styles.product + 'VariationsItens'}>
              Ref: {refId}
            </div>
          </div>
          <div className={styles.product + 'QuantityAndPriceContainer'}>
            {price !== sellingPrice && (
              <span className={styles.product + 'PriceDiscount'}>
                <FormattedPrice value={getFormattedPrice(price)} />
              </span>
            )}
            <span className={styles.product + 'Price'}>
              <FormattedPrice value={getFormattedPrice(sellingPrice)} />
            </span>
          </div>
        </div>
      </div>
    );
  },
);

ProductItem.displayName = 'ProductItem';

// export const CustomMinicartProductList = () => {
//   return <></>;
// };
export const CustomMinicartProductList = () => {
  const { orderForm } = useOrderForm();
  const { removeItem } = useOrderItems();
  const [isChangingOrderForm, setIsChangingOrderForm] = useState(false);

  const removeProduct = useCallback(
    async (index: number) => {
      if (isChangingOrderForm) {
        return;
      }
      setIsChangingOrderForm(true);

      await removeItem({ seller: '1', index });
      setIsChangingOrderForm(false);
    },
    [isChangingOrderForm, removeItem],
  );

  if (!orderForm?.items?.length) {
    return (
      <div className={styles.product + 'emptyCart'}>El carrito está vacío</div>
    );
  }

  return (
    <div className={styles.product + 'ListContainer'}>
      {orderForm.items.map((item: CartItem, index: number) => (
        <ProductItem
          key={item.uniqueId}
          product={item}
          index={index}
          onRemove={removeProduct}
        />
      ))}
    </div>
  );
};

export default CustomMinicartProductList;
