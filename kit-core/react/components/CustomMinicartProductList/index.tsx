/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useOrderForm } from 'vtex.order-manager/OrderForm';
import styles from './CustomMinicartProductList.css';
// import { PresentWrapper } from './PresentWrapper/PresentWrapper';
import { CloseIco, EditIco } from './icons';
import { useOrderItems } from 'vtex.order-items/OrderItems';
import useFormatPrice from '../hooks/useFormatPrice';
import { Button } from 'vtex.styleguide';
import { useIntl } from 'react-intl';
import { formatIOMessage } from 'vtex.native-types';

// interface IVisibleRegalo {
//   isVisible: boolean;
// }

interface IDataCollection {
  [key: string]: boolean | string | number | undefined;
}

interface ICustomMinicartProductList {
  dataCollection: Array<IDataCollection>;
}

export const iOMessage: any = ({ values, ...messageDescriptor }: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const intl = useIntl();

  const message = formatIOMessage({ intl, ...messageDescriptor }, values);

  return message === '' ? null : { message };
};

export const CustomMinicartProductList = ({
  dataCollection = [],
}: ICustomMinicartProductList) => {
  // const { collection } = dataCollection[0];

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(JSON.stringify(dataCollection))
      .then(() => {
        alert('Texto copiado con éxito');
      })
      .catch((err) => {
        console.error('Error al copiar el texto: ', err);
      });
  };

  const { formatPrice } = useFormatPrice();
  const { orderForm, setOrderForm } = useOrderForm();
  const [isChangingOrderForm, setIsChangingOrderForm] = useState(false);
  const [queryProducts, setQueryProducts] = useState<Array<any>>([]);
  const copyParam = new URLSearchParams(window?.location?.search).get('copy');

  const { removeItem } = useOrderItems();

  async function removeProduct(index: number) {
    if (isChangingOrderForm) {
      return;
    }
    setIsChangingOrderForm(true);

    await removeItem({ seller: '1', index: index });
    setIsChangingOrderForm(false);
  }

  async function quantitySelector(
    product: any,
    orderFormId: string,
    addOrRemove: number,
  ) {
    if (isChangingOrderForm) {
      return;
    }
    setIsChangingOrderForm(true);
    const index = orderForm?.items?.indexOf(product);
    const quantity = addOrRemove
      ? product?.quantity + 1
      : product?.quantity - 1;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        orderItems: [
          {
            quantity: quantity,
            index: index,
          },
        ],
      }),
    };

    await fetch(
      `/api/checkout/pub/orderForm/${orderFormId}/items/update`,
      options,
    )
      .then((res) => res.json())
      .then((res) => {
        setIsChangingOrderForm(false), setOrderForm(res);
      });
  }

  const searchQuery = async (collections: Array<IDataCollection>) => {
    try {
      const promises = collections?.map(({ collection }, index: number) => {
        if (!collection) return;

        return new Promise((resolve, reject) => {
          let from = 0;
          let to = 99;
          let products: any = [];
          const searchCollection = () => {
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            const graphql = JSON.stringify({
              query:
                'query getProductCollection($id: String, $fr: Int, $to: Int) {\n  products(collection: $id, from: $fr, to: $to) @context(provider: "vtex.search-graphql") {\n    categoryId\n    productReference\n    productId\n  }\n}\n',
              variables: {
                id: `${collection}`,
                fr: from,
                to: to,
              },
            });

            fetch('/_v/segment/graphql/v1', {
              method: 'POST',
              headers: myHeaders,
              body: graphql,
              redirect: 'follow',
            })
              .then((response) => response.text())
              .then((result) => {
                const data = JSON.parse(result)?.data?.products;
                products = [...products, ...data];
                if (data.length > 99) {
                  from = from + 99;
                  to = to + 99;
                  searchCollection();
                } else {
                  resolve({
                    key: index,
                    products: products,
                    collection: collection,
                  });
                }
              })
              .catch((error) => reject(error));
          };

          searchCollection();
        });
      });

      const results = await Promise.all(promises);

      return results;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  useEffect(() => {
    searchQuery(dataCollection)
      .then((results) => {
        setQueryProducts(results);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const filterProductsForCollection = (props: {
    [x: string]: boolean | string | number;
  }) => {
    const {
      collection,
      discount,
      quantity,
      color,
      colorBackground,
      link,
      text,
    } = props;

    if (
      !(typeof collection === 'number') ||
      !(typeof discount === 'number') ||
      !(typeof quantity === 'number')
    )
      return;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const getProducts = queryProducts.find((item) => {
      return item?.collection === collection;
    });

    if (!(getProducts && getProducts?.products)) return;
    const products = getProducts?.products;

    const content = orderForm?.items
      ?.filter(({ productRefId }: any) => {
        if (Array.isArray(products) && products.length > 0) {
          const some = products.some(
            (entry: { categoryId: any; productReference: any }) =>
              entry?.productReference === productRefId,
          );
          return some;
        }
        return false;
      })
      ?.map(({ productRefId, quantity }: any, index: number) => ({
        productQuantity: quantity,
        productRefId,
        key: index,
      }));
    const contentMap = {
      discount,
      quantity,
      color,
      link,
      text,
      colorBackground,
      products: content,
    };
    return contentMap;
  };

  const filteredDataForAllCollections = dataCollection.map(
    (packs: any, index: number) => {
      const pack: any = filterProductsForCollection(packs);
      if (!pack) return;
      const {
        text,
        discount,
        quantity,
        products,
        color,
        colorBackground,
        link,
      }: any = pack;

      const sum = products?.reduce(
        (total: number, { productQuantity }: { productQuantity: number }) =>
          total + productQuantity,
        0,
      );

      if (products.length < quantity && sum < quantity) {
        return {
          discount,
          quantity,
          color,
          colorBackground,
          link,
          text,
          key: index,
          need: quantity - sum,
          productRefId: products[products.length - 1]?.productRefId,
        };
      }
      return;
    },
  );

  return (
    <div
      className={`${styles.productListContainer} velez-common-minicartProductList`}
    >
      {copyParam === 'true' && (
        <Button onClick={copyToClipboard} variation="primary" block>
          Copiar Configuracion
        </Button>
      )}
      {orderForm?.items?.map((product: any, index: number) => {
        const foundData = filteredDataForAllCollections?.find(
          (
            item: { productRefId: string | undefined } = {
              productRefId: undefined,
            },
          ) => item?.productRefId === product?.productRefId,
        );

        const capitalize = (texto: string) => {
          return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
        };

        return (
          <>
            <div
              key={product.uniqueId + index}
              className={`${
                styles.productContainer
              } velez-common-minicartProductList-productContainer velez-common-minicartProductList-productContainer--${
                product.uniqueId + index
              }`}
            >
              <img
                className={`${styles.productImage} velez-common-minicartProductList-productContainer-image`}
                src={
                  product?.imageUrls?.at1x
                    ? product?.imageUrls?.at1x
                    : product.imageUrl
                }
              />
              <div
                className={`${styles.productInfos} velez-common-minicartProductList-productContainer-infos`}
              >
                <div
                  className={`${styles.autor} velez-common-minicartProductList-productContainer-infos-brand`}
                >
                  {product.additionalInfo?.brandName}
                </div>
                <div
                  className={`${styles.productNameAndRemoveButtonContainer} velez-common-minicartProductList-productContainer-infos-name`}
                >
                  <a
                    className={`${styles.productName} velez-common-minicartProductList-productContainer-infos-name-text`}
                    href={product.detailUrl}
                  >
                    {capitalize(product.name ?? '')}
                  </a>
                  <div
                    className={`${styles.iconsContainer} velez-common-minicartProductList-productContainer-infos-name-icons`}
                  >
                    <button
                      className={`${styles.productRemoveButton} velez-common-minicartProductList-productContainer-infos-name-icons-removeButton`}
                    >
                      <a
                        className="velez-common-minicartProductList-productContainer-infos-name-icons-removeButton-link"
                        href={product.detailUrl}
                      >
                        {' '}
                        <EditIco />
                      </a>
                    </button>

                    <button
                      className={`${styles.productRemoveButton} velez-common-minicartProductList-productContainer-infos-name-icons-removeButton`}
                      onClick={() => removeProduct(index)}
                    >
                      <CloseIco />
                    </button>
                  </div>
                </div>
                <div
                  className={`${styles.productVariations} velez-common-minicartProductList-productContainer-infos-variations`}
                >
                  {/* {product?.skuSpecifications[0] && (
                  <div className={styles.productVariationsItens}>
                    {product.skuSpecifications[0]?.fieldName}:{' '}
                    {product.skuSpecifications[0]?.fieldValues[0]}
                  </div>
                )}
                {product?.skuSpecifications[1] && (
                  <div className={styles.productVariationsItens}>
                    {product.skuSpecifications[1]?.fieldName}:{' '}
                    {product.skuSpecifications[1]?.fieldValues[0]}
                  </div>
                )} */}

                  <div
                    className={`${styles.productVariationsItens} velez-common-minicartProductList-productContainer-infos-variations-itens`}
                  >
                    {product?.skuSpecifications?.[0]?.fieldName}:{' '}
                    {product?.skuSpecifications?.[0]?.fieldValues?.[0]}
                  </div>
                  <div
                    className={`${styles.productVariationsItens} velez-common-minicartProductList-productContainer-infos-variations-itens`}
                  >
                    {product?.skuSpecifications?.[1]?.fieldName}:{' '}
                    {product?.skuSpecifications?.[1]?.fieldValues?.[0]}
                  </div>
                  <div
                    className={`${styles.productVariationsItens} velez-common-minicartProductList-productContainer-infos-variations-itens`}
                  >
                    Cantidad:{product.quantity}
                  </div>
                  <div
                    className={`${styles.productVariationsItens} velez-common-minicartProductList-productContainer-infos-variations-itens`}
                  >
                    Ref: {product?.refId}
                  </div>
                </div>
                {/* {isVisible &&
              product.attachmentOfferings.find(
                (attachment: { name: string }) => attachment.name === 'regalo',
              ) ? (
                <PresentWrapper props={product} />
              ) : (
                <></>
              )} */}
                <div
                  className={`${styles.productQuantityAndPriceContainer} velez-common-minicartProductList-productContainer-infos-prices`}
                >
                  <span
                    className={`${styles.quantitySelector} velez-common-minicartProductList-productContainer-infos-prices-qtdSelector`}
                  >
                    <button
                      className={`${styles.quantitySelectorButtonMinus} velez-common-minicartProductList-productContainer-infos-prices-qtdSelector-buttonMinus`}
                      onClick={() => quantitySelector(product, orderForm.id, 0)}
                    >
                      -
                    </button>
                    {product.quantity}
                    <button
                      className={`${styles.quantitySelectorButtonPlus} velez-common-minicartProductList-productContainer-infos-prices-qtdSelector-buttonPlus`}
                      onClick={() => quantitySelector(product, orderForm.id, 1)}
                    >
                      +
                    </button>
                  </span>
                  {product.price !== product.sellingPrice && (
                    <span className={`${styles.productPriceDiscount}`}>
                      {formatPrice(product.price / 100)}
                    </span>
                  )}
                  <span
                    className={`${styles.productPrice} velez-common-minicartProductList-productContainer-infos-prices-productPrice`}
                  >
                    {formatPrice(product.sellingPrice / 100)}
                  </span>
                </div>
              </div>
            </div>
            {foundData && foundData?.need && foundData?.discount ? (
              <a
                href={foundData.link}
                className={styles.packsContainer}
                style={{
                  color: foundData.color ? foundData.color : '#ffffff',
                  backgroundColor: foundData.colorBackground
                    ? foundData.colorBackground
                    : '#AA9CAD',
                }}
              >
                <div className={styles.packsIconWarning}>
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask
                      id="mask0_214_1448"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="30"
                      height="30"
                    >
                      <rect width="30" height="30" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_214_1448)">
                      <path
                        d="M15 20.5769C15.218 20.5769 15.4007 20.5032 15.5481 20.3558C15.6955 20.2083 15.7692 20.0256 15.7692 19.8077C15.7692 19.5898 15.6955 19.4071 15.5481 19.2596C15.4007 19.1122 15.218 19.0385 15 19.0385C14.782 19.0385 14.5993 19.1122 14.4519 19.2596C14.3045 19.4071 14.2308 19.5898 14.2308 19.8077C14.2308 20.0256 14.3045 20.2083 14.4519 20.3558C14.5993 20.5032 14.782 20.5769 15 20.5769ZM14.375 16.4423H15.625V8.94231H14.375V16.4423ZM15.0042 26.25C13.4485 26.25 11.9859 25.9548 10.6164 25.3644C9.24685 24.774 8.05555 23.9727 7.04247 22.9606C6.02941 21.9485 5.2274 20.7583 4.63644 19.3901C4.04548 18.0218 3.75 16.5599 3.75 15.0042C3.75 13.4485 4.0452 11.9859 4.63559 10.6164C5.22601 9.24685 6.02728 8.05555 7.03941 7.04247C8.05153 6.02941 9.24171 5.2274 10.6099 4.63644C11.9782 4.04548 13.4401 3.75 14.9958 3.75C16.5515 3.75 18.0141 4.0452 19.3836 4.63559C20.7531 5.22601 21.9444 6.02728 22.9575 7.03941C23.9706 8.05153 24.7726 9.24171 25.3636 10.6099C25.9545 11.9782 26.25 13.4401 26.25 14.9958C26.25 16.5515 25.9548 18.0141 25.3644 19.3836C24.774 20.7531 23.9727 21.9444 22.9606 22.9575C21.9485 23.9706 20.7583 24.7726 19.3901 25.3636C18.0218 25.9545 16.5599 26.25 15.0042 26.25ZM15 25C17.7917 25 20.1562 24.0312 22.0938 22.0938C24.0312 20.1562 25 17.7917 25 15C25 12.2083 24.0312 9.84375 22.0938 7.90625C20.1562 5.96875 17.7917 5 15 5C12.2083 5 9.84375 5.96875 7.90625 7.90625C5.96875 9.84375 5 12.2083 5 15C5 17.7917 5.96875 20.1562 7.90625 22.0938C9.84375 24.0312 12.2083 25 15 25Z"
                        fill={foundData.color ? foundData.color : '#ffffff'}
                      />
                    </g>
                  </svg>
                </div>
                <p className={styles.paragraphIconWarning}>
                  {
                    iOMessage({
                      id:
                        foundData.text ??
                        'Agrega { need } { p } más de la colección y obtén { discount } de descuento en ambos',
                      values: {
                        need: foundData?.need,
                        discount: `${foundData?.discount}%`,
                        p: `producto${foundData?.need > 1 ? 's' : ''}`,
                      },
                    })?.message
                  }
                </p>
                <div className={styles.packsIconArrow}>
                  <svg
                    width="37"
                    height="19"
                    viewBox="0 0 37 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.8">
                      <path
                        d="M5.52228 9.57508L33.1343 9.57507"
                        stroke={foundData.color ? foundData.color : '#ffffff'}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M28.1639 4.07729L33.3181 9.57514L28.1639 15.073"
                        stroke={foundData.color ? foundData.color : '#ffffff'}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                </div>
              </a>
            ) : (
              <></>
            )}
          </>
        );
      })}
    </div>
  );
};

CustomMinicartProductList.schema = {
  title: 'Product Minicart',
  type: 'object',
  properties: {
    dataCollection: {
      title: 'Collections Packs',
      type: 'array',
      default: [],
      items: {
        title: 'Collection Packs',
        type: 'object',
        properties: {
          __editorItemTitle: {
            default: 'Packs',
            title: 'Change item name',
            type: 'string',
          },
          collection: {
            title: 'Collection Number',
            type: 'number',
          },
          discount: {
            title: 'Discount',
            type: 'number',
            default: 30,
          },
          quantity: {
            title: 'Quantity',
            type: 'number',
            default: 3,
          },
          link: {
            title: 'Link',
            type: 'string',
          },
          colorBackground: {
            title: 'Color Background',
            type: 'string',
            default: '#AA9CAD',
            widget: {
              'ui:widget': 'color',
            },
          },
          color: {
            title: 'Color',
            type: 'string',
            default: '#ffffff',
            widget: {
              'ui:widget': 'color',
            },
          },
          text: {
            title: 'Text',
            type: 'string',
            widget: {
              'ui:widget': 'textarea',
            },
            description: 'Content text { need } { p } { discount } ',
            default:
              'Agrega { need } { p } más de la colección y obtén { discount } de descuento en ambos',
          },
        },
      },
    },
  },
};
