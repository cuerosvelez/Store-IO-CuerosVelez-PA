/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  ReactChildren,
} from 'react';

import { NoSSR } from 'vtex.render-runtime';
import { Overlay } from 'vtex.react-portal';
import { useProduct } from 'vtex.product-context';
import { Dropdown, Modal } from 'vtex.styleguide';

import { Table } from './Table';
import {
  typesSize,
  findImageByIds,
  validateNumSize,
  hiddenCategorySize,
  sortedOptionsSize,
  bagsSize,
} from '../utils/sizeGuide';

import styled from '../style/style.css';

import type { propsType, TGuiaProps } from '../types/sizeguide';

export const GuiaDeTallas = ({
  product,
  children,
  sizeDefault,
  entity = 'TG',
  categoryIdFlyup = 141,
}: {
  product: any;
  entity?: string;
  sizeDefault?: string;
  children: ReactChildren;
  categoryIdFlyup?: number;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [valueSelected, setValueSelected] = useState<string | undefined>(
    sizeDefault,
  );
  const [informationsTalla, setInformationsTalla] = useState<
    TGuiaProps | undefined
  >();

  const modalRef = useRef<HTMLDivElement>(null);

  const {
    img,
    title,
    isFind,
    findType,
    gender = 'hombre',
  } = useMemo(() => {
    const categoryTree = product?.categoryTree;
    const valFlyup = categoryTree?.[0]?.id === categoryIdFlyup ? 1 : 0;

    const findData = findImageByIds({
      departmentId: categoryTree?.[valFlyup]?.id,
      categoryId: categoryTree?.at(-1)?.id,
    });

    return {
      img: findData?.img,
      findType: findData?.type,
      gender: categoryTree?.[valFlyup]?.name?.toLowerCase(),
      title: `${categoryTree?.[valFlyup]?.name} | ${
        categoryTree?.[valFlyup + 1]?.name
      }`,
      isFind:
        findData?.type === 'prenda-superior' || findData?.type === 'cinturones',
    };
  }, [categoryIdFlyup, product?.categoryTree]);

  const { options } = useMemo(() => {
    const skuSpecifications = product?.skuSpecifications;
    const options = skuSpecifications
      ?.find(
        (item?: { field?: { name?: string } }) => item?.field?.name === 'Talla',
      )
      ?.values?.map((item: { name?: string }) => ({
        label: item?.name,
        value: item?.name,
      }));

    return {
      options: sortedOptionsSize(options),
    };
  }, [product?.skuSpecifications]);

  useEffect(() => {
    if (valueSelected) {
      const inputResult = {
        talla: valueSelected,
        ...(isFind && valueSelected ? validateNumSize(valueSelected) : {}),
      };
      const queryBody: any = {
        ...inputResult,
        gender: gender,
        type: findType,
        _fields:
          typesSize[(findType as propsType) ?? 'prenda-superior']?.join(','),
      };

      const query = new URLSearchParams(queryBody);

      fetch(`/api/dataentities/${entity}/search?${query}`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data: any) => {
          setInformationsTalla(data[0]);
        });
    }
  }, [entity, findType, gender, isFind, valueSelected]);

  return (
    <>
      {children}
      <button
        aria-label="Tallas"
        className={`w0 pa0 pointer bn bg-transparent c-on-base ${
          styled['sizeGuide'] + 'ModalButton'
        }`}
        onClick={() => setOpen((s) => !s)}
      >
        Conoce tu talla
      </button>
      <Overlay>
        <div
          ref={modalRef}
          className={`${styled['sizeGuide'] + 'ModalOverlay'}`}
        />
      </Overlay>
      {modalRef?.current && (
        <Modal
          centered
          isOpen={open}
          onClose={() => setOpen(false)}
          container={modalRef?.current}
        >
          <div className={`${styled['sizeGuide'] + 'Container'}`}>
            <h1 className={styled['sizeGuide'] + 'Title'}>{title}</h1>
            <Dropdown
              label=""
              options={options}
              value={valueSelected}
              placeholder="Selecciona tu talla"
              onChange={(_: any, v: any) => setValueSelected(v)}
            />
            <div className={styled['sizeGuide'] + 'Row'}>
              <img
                src={img}
                alt="Tallas"
                loading="lazy"
                className={styled['sizeGuide'] + 'Image'}
              />
              {valueSelected && <Table values={informationsTalla} />}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

const SizeGuide = ({
  entity,
  children,
  categoryIdFlyup,
}: {
  entity?: string;
  children: ReactChildren;
  categoryIdFlyup?: number;
}) => {
  const { product, selectedItem }: any = useProduct();

  const dataBagsSize = useMemo(
    () => bagsSize(product?.properties),
    [product?.properties],
  );

  return (
    <NoSSR>
      {!hiddenCategorySize?.includes(product?.categoryId) &&
      product?.skuSpecifications !== null ? (
        <GuiaDeTallas
          entity={entity}
          product={product}
          categoryIdFlyup={categoryIdFlyup}
          sizeDefault={
            selectedItem?.variations?.find(
              ({ name }: { name?: string }) => name === 'Talla',
            )?.values?.[0]
          }
        >
          {children}
        </GuiaDeTallas>
      ) : (
        dataBagsSize &&
        dataBagsSize?.length > 0 && (
          <div className={`${styled['sizeGuide'] + 'BagsContainer'}`}>
            <h3 className={`${styled['sizeGuide'] + 'BagsTitle'}`}>Medidas</h3>
            {dataBagsSize?.map(
              (formattedName, index) =>
                formattedName && (
                  <p
                    className={`${styled['sizeGuide'] + 'Bags'}`}
                    key={`size-guide-bags-${index}`}
                  >
                    {formattedName}
                  </p>
                ),
            )}
          </div>
        )
      )}
    </NoSSR>
  );
};

export default SizeGuide;
