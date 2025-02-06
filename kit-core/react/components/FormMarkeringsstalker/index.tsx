import React, { useEffect, useState } from "react";
import { useCssHandles } from "vtex.css-handles";
import { Button, Dropdown } from "vtex.styleguide";
import { index as RichText } from "vtex.rich-text";
import { useDevice } from "vtex.device-detector";

interface Store {
  store_name: string;
  type_service: string;
  address: string;
  name_city: string;
  isThreeService: boolean;
  phone: string;
  hours: {};
}

type StoresByCity = { [cityName: string]: Store[] };

const storesRestoration: StoresByCity ={
  "CIUDAD DE PANAMA":[
    {
      store_name: "ALBROOK MALL",
      type_service: "A - B",
      address:
        "Avenida Omar Torrijos, por la Universidad Nacional de Curundu, Pasillo del Canguro, Local 15 ",
      name_city: "CIUDAD DE PANAMA",
      isThreeService: false,
      phone: "(507) 6264 4790",
      hours: {
        "L - J": "10:00 am a 8:00 pm",
        "V - S": "10:00 am a 8:00 pm",
        "D - Festivos": "11:00 am a 7:00 pm",
      },
    }
  ],
  DAVID:[]
}

const stores: StoresByCity = {
  "CIUDAD DE PANAMA": [
    {
      store_name: "MULTIPLAZA",
      type_service: "A - B - C",
      address: "Vía Israel, Segundo Nivel, Local 171B",
      name_city: "CIUDAD DE PANAMA",
      isThreeService: false,
      phone: "(507) 6200 0157",
      hours: {
        "L - S": "10:00 am a 8:00 pm",
        "D - Festivos": "11:00 am a 7:00 pm",
      },
    },
    {
      store_name: "ALBROOK MALL",
      type_service: "A - B",
      address:
        "Avenida Omar Torrijos, por la Universidad Nacional de Curundu, Pasillo del Canguro, Local 15 ",
      name_city: "CIUDAD DE PANAMA",
      isThreeService: false,
      phone: "(507) 6264 4790",
      hours: {
        "L - J": "10:00 am a 8:00 pm",
        "V - S": "10:00 am a 8:00 pm",
        "D - Festivos": "11:00 am a 7:00 pm",
      },
    },
    {
      store_name: "ALBROOK MALL",
      type_service: "A - B - C",
      address:
        "Avenida Omar Torrijos, por la Universidad Nacional de Curundu, Pasillo Central, Local X-43",
      name_city: "CIUDAD DE PANAMA",
      isThreeService: false,
      phone: "(507) 6677 3386",
      hours: {
        "L - J": "10:00 am a 8:00 pm",
        "V - S": "10:00 am a 8:00 pm",
        "D - Festivos": "11:00 am a 7:00 pm",
      },
    },
    {
      store_name: "ALTAPLAZA MALL",
      type_service: "A - B - C",
      address:
        "Vía Cenetenario, con acceso al corredor norte, Planta Baja, Local 0 - 203",
      name_city: "CIUDAD DE PANAMA",
      isThreeService: false,
      phone: "(507) 6200 0157",
      hours: {
        "L - J": "11:00 am a 7:00 pm",
        "V - S": "11:00 am a 8:00 pm",
        "D - Festivos": "11:00 am a 7:00 pm",
      },
    },
    {
      store_name: "EL DORADO",
      type_service: "A - B - C",
      address: "Vía Ricardo J. Alfaro, Panamá, Nivel 100, Local 46",
      name_city: "CIUDAD DE PANAMA",
      isThreeService: false,
      phone: "(507) 6264 4792",
      hours: {
        "L - J": "10:00 am a 8:00 pm",
        "V - S": "10:00 am a 8:00 pm",
        "D - Festivos": "11:00 am a 7:00 pm",
      },
    },
    {
      store_name: "METROMALL",
      type_service: "A - B",
      address:
        "Avenida José Domingo Díaz, Plaza Central, Local B-217-1-1-Nivel B / Nivel 100",
      name_city: "CIUDAD DE PANAMA",
      isThreeService: false,
      phone: "(507) 6213 5897",
      hours: {
        "L - J": "11:00 am a 9:00pm",
        "V - S": "10:00 am a 9:00pm",
        "D - Festivos": "11:00 am a 7:00 pm",
      },
    },
    {
      store_name: "MARKET PLAZA",
      type_service: "A - B",
      address:
        "Edificio PH Market, Panamá Oeste - Chorrera, Plaza Central, Local E-12.2",
      name_city: "CIUDAD DE PANAMA",
      isThreeService: false,
      phone: "(507) 6213 4775",
      hours: {
        "L - J": "11:00 am a 9:00pm",
        "V - S": "10:00 am a 9:00pm",
        "D - Festivos": "11:00 am a 7:00 pm",
      },
    },
  ],
  DAVID: [
    {
      store_name: "DAVID",
      type_service: "A - B",
      address:
        "David - Chiriquí, Edificio PH Galería Central, Primer Nivel, Planta Baja, Local #25",
      name_city: "DAVID",
      isThreeService: false,
      phone: "(507) 6318 4028",
      hours: {
        "L - J": "11:00 am a 8:00 pm",
        "V - S": "10:00 am a 8:00 pm",
        "D - Festivos": "11:00 am a 7:00 pm",
      },
    },
  ],
};

const servicesDropdown = [
  { label: 'PIGMENTACIÓN', value: 'PIGMENTACIÓN' },
  { label: 'RESTAURACIÓN', value: 'RESTAURACIÓN' },
  { label: "MARCACIÓN", value: "MARCACIÓN" },
];

const storesDropdown = Object.keys(stores).map((store) => ({
  value: store,
  label: store,
}));

const FormMarkeringsstalker = ({ blockClass }: any) => {
  const CSS_HANDLES = [
    "markeringsstalker-col",
    "markeringsstalker-size",
    "markeringsstalker-title",
    "markeringsstalker-select",
    "markeringsstalker-button",
    "markeringsstalker-wrapper",
    "markeringsstalker-container",
    "markeringsstalker-title-size",
    "markeringsstalker-size-unica",
    "markeringsstalker-size-active",
    "markeringsstalker-content-size",
    "markeringsstalker-paragraph-city",
    "markeringsstalker-paragraph-size",
    "markeringsstalker-paragraph-search",
  ];
  const { isMobile } = useDevice();
  const handles = useCssHandles(CSS_HANDLES, { blockClass });

  const [city, setCity]: any = useState();
  const [services, setServices] = useState();
  const [filterInformation, setfilterInformation] = useState([]);



  const handleSearch = () => {
    const availableStores: any = [];
    for (const store of storesRestoration[city]) {
      if (services === "RESTAURACIÓN" || services === "PIGMENTACIÓN"){
        availableStores.push(store);
      }
    }




    for (const store of stores[city]) {
       if (services === "MARCACIÓN") {
        availableStores.push(store);
      }
    }
    setfilterInformation(availableStores);
  };

  useEffect(()=>{
    if(city){
   handleSearch()

    }
  },[services])


  return (
    <div
      className={`w-100 flex flex-column items-center ${handles.handles["markeringsstalker-container"]}`}
    >
      <p className={handles["markeringsstalker-title"]}>
        ¿QUÉ SERVICIO ESTÁS BUSCANDO?
      </p>
      <div
        className={`w-100 flex ${isMobile ? "flex-column" : "flex-row"} ${
          handles["markeringsstalker-wrapper"]
        }`}
      >
        <div
          className={`${
            isMobile ? "w-100" : "w-50"
          } flex flex-column items-center ${handles.handles["markeringsstalker-col"]}`}
        >
          <div
            className={`w-100 flex flex-column items-center ${handles["markeringsstalker-select"]}`}
          >
            <Dropdown
              value={city}
              label="CIUDAD"
              options={storesDropdown}
              onChange={(_: any, v: any) => {
                setCity(undefined);
                setCity(v);
              }}
            />
            <Dropdown
              value={services}
              label="SERVICIO"
              disabled={!city}
              options={servicesDropdown}
              onChange={(_: any, v: any) => {
                setServices(undefined);
                setServices(v);
              }}
            />
          </div>
          <div
            className={`w-100 flex flex-column items-center ${handles["markeringsstalker-button"]}`}
          >
            <Button
              disabled={!city && !services}
              onClick={() => handleSearch()}
              variation="primary"
            >
              BUSCAR
            </Button>
          </div>
        </div>
      </div>
      {filterInformation.length > 0 && (

        (services === "RESTAURACIÓN" || services === "PIGMENTACIÓN")?
        <RichText
          text={
            "|TIENDA|DIRECCIÓN|\n|---|---|\n" +
            filterInformation
              ?.map(
                ({ store_name = "", address = "" }) =>
                  `|${store_name}|${address}|`
              )
              .join("\n")
          }
        />
        :
        <RichText
          text={
            "|TIENDA|DIRECCIÓN|TIPO DE MARCACIÓN|\n|---|---|---|\n" +
            filterInformation
              ?.map(
                ({ store_name = "", address = "", type_service = "" }) =>
                  `|${store_name}|${address}|${type_service}|`
              )
              .join("\n")
          }
        />
      )}
    </div>
  );
};

export default FormMarkeringsstalker;
