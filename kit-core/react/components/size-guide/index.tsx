/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  ReactChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
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
} from '../utils/sizeGuide';

import styled from '../style/style.css';

import type { propsType, TGuiaProps } from '../types/sizeguide';

export const GuiaDeTallas = ({
  product,
  sizeDefault,
  children,
}: {
  product: any;
  sizeDefault?: string;
  children: ReactChildren;
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

    const findData = findImageByIds({
      departmentId: categoryTree?.[0]?.id,
      categoryId: categoryTree?.at(-1)?.id,
    });

    return {
      img: findData?.img,
      findType: findData?.type,
      gender: categoryTree?.[0]?.name?.toLowerCase(),
      title: `${categoryTree?.[0]?.name} | ${categoryTree?.[1]?.name}`,
      isFind:
        findData?.type === 'prenda-superior' || findData?.type === 'cinturones',
    };
  }, [product?.categoryTree]);

  const { isSpecifications, options } = useMemo(() => {
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
      isSpecifications: skuSpecifications !== null,
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

      fetch(`/api/dataentities/TG/search?${query}`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data: any) => {
          setInformationsTalla(data[0]);
        })
        // eslint-disable-next-line no-console
        .catch((error) => console.log('error search', error));
    }
  }, [findType, gender, isFind, valueSelected]);

  if (!isSpecifications) return <></>;

  return (
    <>
      {children}
      <button
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

const SizeGuide = ({ children }: { children: ReactChildren }) => {
  const { product, selectedItem }: any = useProduct();

  return (
    <NoSSR>
      {!hiddenCategorySize?.includes(product?.categoryId) && (
        <GuiaDeTallas
          product={product}
          sizeDefault={
            selectedItem?.variations?.find(
              ({ name }: { name?: string }) => name === 'Talla',
            )?.values?.[0]
          }
        >
          {children}
        </GuiaDeTallas>
      )}
    </NoSSR>
  );
};

export default SizeGuide;
