import React, { useState, useEffect } from 'react';
import { Dropdown } from 'vtex.styleguide';
import Map from '../map';
import { useCssHandles } from 'vtex.css-handles';
import datosTiendas from '../../data/tiendas.json';

interface ShopsType
  extends Array<{
    name: string;
    lat: number;
    lng: number;
    horary: string;
    address: string;
    telOne: number | string | null;
    telTwo: number | string | null;
    fax: string | null;
  }> {}

interface CityType {
  lat: number;
  lng: number;
  value: string;
  label: string;
  shops?: ShopsType;
}

interface CityArrayType extends Array<CityType> {}

interface CountriesType
  extends Array<{
    img: string;
    lat: number;
    lng: number;
    value: string;
    label: string;
    cities?: CityArrayType;
  }> {}

interface TiendasType {
  icon: string;
  blockClass: string | Array<string>;
  settingsMaps: object;
  styleMaps: object;
  countries: CountriesType;
}

const Tiendas = ({
  blockClass,
  styleMaps,
  settingsMaps,
  countries,
  icon,
}: TiendasType) => {
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState<string>('580');
  const [shops, setShops] = useState<CityType | undefined>();
  const [cities, setCities] = useState<CityArrayType | undefined>();

  const CSS_HANDLES = [
    'containerTiendas',
    'selectTiendas',
    'mapTiendas',
    'flagTiendas',
    'flagTiendas-paragraph',
    'flagTiendas-box',
    'flagTiendas-img',
    'flagTiendas-box-active',
    'tiendasDropdown',
    'countryTiendas-title',
    'infoTiendas-paragraph',
    'infoTiendas-container',
    'infoTiendas-title',
    'infoTiendas-wrapper',
  ];
  const handles = useCssHandles(CSS_HANDLES, { blockClass });
  console.log('HANDLES:', handles);
  const countryObj = countries.find((count) => count.value === country);

  useEffect(() => {
    const filterData: CityArrayType | undefined = countries.find(
      (count) => count.value === country,
    )?.cities;
    setCities(filterData);
    setCity(null);
    setShops(undefined);
  }, [country]);

  useEffect(() => {
    if (cities && city !== null) {
      const filterDataCities: CityType | undefined = cities.find(
        (item) => item.value === city,
      );
      setShops(filterDataCities);
    }
  }, [city]);

  if (!countryObj) return <></>;

  const { lat: defLat, lng: defLng }: any = countries.find(
    (count) => count.value === country,
  );

  return (
    <div className={`flex w-100 ${handles.handles['containerTiendas']}`}>
      <div className={`flex flex-column ${handles.handles['selectTiendas']}`}>
        <h2 className={`tc mb1 ${handles.handles['countryTiendas-title']}`}>
          Elige tu país
        </h2>
        <div
          className={`flex flex-row justify-center ${handles.handles['flagTiendas']}`}
        >
          {countries.map(({ img, label, value }, index) => {
            return (
              <div
                key={index}
                className={`flex flex-column justify-end items-center ${
                  handles.handles['flagTiendas-box']
                }${
                  value === country
                    ? ' ' + handles.handles['flagTiendas-box-active']
                    : ''
                }`}
              >
                {value === country ? (
                  <p
                    className={`ma0 ${handles.handles['flagTiendas-paragraph']}`}
                  >
                    {label}
                  </p>
                ) : (
                  <></>
                )}
                <img
                  className={`${handles.handles['flagTiendas-img']}`}
                  src={img}
                  alt={label}
                  onClick={() => setCountry(value)}
                />
              </div>
            );
          })}
        </div>
        <div
          className={`flex flex-column items-center ${handles.handles['tiendasDropdown']}`}
        >
          <Dropdown
            placeholder="Elige tu Ciudad"
            options={cities}
            value={city}
            onChange={(_: any, v: any) => setCity(v)}
          />
        </div>
        <div className={`${handles.handles['infoTiendas-container']}`}>
          {shops && shops.shops ? (
            shops.shops.map(({ name, telOne, address, horary }, index) => {
              return (
                <div
                  className={`${handles.handles['infoTiendas-wrapper']}`}
                  key={index}
                >
                  <h3 className={`${handles.handles['infoTiendas-title']}`}>
                    {name}
                  </h3>
                  <p className={`${handles.handles['infoTiendas-paragraph']}`}>
                    Teléfono: {telOne}
                  </p>
                  {/*<p className={`${handles['infoTiendas-paragraph']}`}>
                      Teléfono: {telTwo}
                </p>*/}
                  <p className={`${handles.handles['infoTiendas-paragraph']}`}>
                    Dirección: {address}
                  </p>
                  <p className={`${handles.handles['infoTiendas-paragraph']}`}>
                    Horario: {horary}
                  </p>
                  {/*<p className={`${handles['infoTiendas-paragraph']}`}>
                      Fax: {fax}
                    </p>*/}
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className={`${handles.handles['mapTiendas']}`}>
        <Map
          blockClass={blockClass}
          settingsMaps={settingsMaps}
          defLat={defLat}
          defLng={defLng}
          styleMaps={styleMaps}
          icon={icon}
          {...shops}
        />
      </div>
    </div>
  );
};

Tiendas.defaultProps = datosTiendas;

Tiendas.schema = {
  title: 'Tiendas',
  type: 'object',
  properties: {
    icon: {
      title: 'Icon map',
      default: datosTiendas.icon,
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    countries: {
      title: 'Countries',
      type: 'array',
      default: datosTiendas.countries,
      items: {
        title: 'Country',
        type: 'object',
        properties: {
          img: {
            title: 'Country Icon',
            default: '',
            type: 'string',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          __editorItemTitle: {
            // now change name is available
            default: 'Country',
            title: 'Change item name country',
            type: 'string',
          },
          value: {
            title: 'Country Code',
            type: 'string',
            default: '',
            description:
              'Code postal in https://cuerosvelezco.vteximg.com.br/arquivos/codigos-paises-dian.pdf',
          },
          label: {
            title: 'Country Name',
            type: 'string',
            default: '',
          },
          lat: {
            title: 'Country Latitude',
            type: 'number',
            default: '',
          },
          lng: {
            title: 'Country Longitud',
            type: 'number',
            default: '',
          },
          cities: {
            title: 'Cities',
            type: 'array',
            default: [],
            items: {
              title: 'City',
              type: 'object',
              properties: {
                __editorItemTitle: {
                  // now change name is available
                  default: 'City',
                  title: 'Change item name city',
                  type: 'string',
                },
                value: {
                  title: 'City Code',
                  type: 'string',
                  default: '',
                  description:
                    'Code postal in https://cuerosvelezco.vteximg.com.br/arquivos/codigos-municipios-dian.pdf',
                },
                label: {
                  title: 'City Name',
                  type: 'string',
                  default: '',
                },
                lat: {
                  title: 'City Latitude',
                  type: 'number',
                  default: '',
                },
                lng: {
                  title: 'City Longitud',
                  type: 'number',
                  default: '',
                },
                shops: {
                  title: 'Shops',
                  type: 'array',
                  default: [],
                  items: {
                    title: 'Shop',
                    type: 'object',
                    properties: {
                      __editorItemTitle: {
                        // now change name is available
                        default: 'Shop',
                        title: 'Change item name shop',
                        type: 'string',
                      },
                      name: {
                        title: 'Shop Name',
                        type: 'string',
                        default: '',
                      },
                      horary: {
                        title: 'Horary',
                        type: 'string',
                        default: '',
                      },
                      address: {
                        title: 'Address',
                        type: 'string',
                        default: '',
                      },
                      lat: {
                        title: 'Shop Latitude',
                        type: 'number',
                        default: '',
                      },
                      lng: {
                        title: 'Shop Longitud',
                        type: 'number',
                        default: '',
                      },
                      telOne: {
                        title: 'Telephone one',
                        type: 'string',
                        default: null,
                      },
                      telTwo: {
                        title: 'Telephone two',
                        type: 'string',
                        default: null,
                      },
                      fax: {
                        title: 'Fax',
                        type: 'string',
                        default: '',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default Tiendas;
