import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useQuery } from 'react-apollo';
import keyMap from '../graphql/query.keyMaps.gql';
import { Spinner } from 'vtex.styleguide';
import { useCssHandles } from 'vtex.css-handles';

interface DataType {
  name?: string;
  lat?: number;
  lng?: number;
  icon?: string;
}

interface DataArrayType extends Array<DataType> {}

interface MapType {
  name?: string;
  defLat?: number;
  defLng?: number;
  icon?: string;
  lat?: number;
  lng?: number;
  shops?: DataArrayType;
  blockClass?: string | string[];
  settingsMaps?: object;
  styleMaps?: object;
}

const Map = ({
  defLat,
  defLng,
  lat = defLat,
  lng = defLng,
  shops,
  blockClass,
  settingsMaps,
  styleMaps,
  icon,
}: MapType) => {
  const CSS_HANDLES = ['map'];
  const handles = useCssHandles(CSS_HANDLES, { blockClass });

  const { data: { logistics: { googleMapsKey = '' } = {} } = {}, loading } =
    useQuery(keyMap);
  if (loading) {
    return (
      <div className="flex flex-grow-1 justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className={`${handles.handles.map}`}>
      <LoadScript googleMapsApiKey={googleMapsKey}>
        {lat && lng ? (
          <GoogleMap
            options={settingsMaps}
            mapContainerStyle={styleMaps}
            center={{ lat: lat, lng: lng }}
            zoom={shops ? 10.7 : 5}
          >
            {shops ? (
              shops.map(({ name, lat = 0, lng = 0 }: DataType) => (
                <Marker
                  key={name}
                  position={{ lat: lat, lng: lng }}
                  zIndex={100}
                  icon={{
                    url: `${icon}`,
                  }}
                />
              ))
            ) : (
              <></>
            )}
          </GoogleMap>
        ) : (
          <></>
        )}
      </LoadScript>
    </div>
  );
};

export default Map;
