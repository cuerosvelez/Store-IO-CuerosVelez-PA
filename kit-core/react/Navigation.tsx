/* eslint-disable @typescript-eslint/no-explicit-any */
// import Navigation from './components/navigation';

import React, { lazy } from 'react';

import { LazyComponent } from './LazyObserver';

const NavigationComp = lazy(() => import('./components/navigation'));

const Navigation = (props: any) => (
  <LazyComponent
    skeletons={{
      size: 5,
      width: 63,
      height: 15,
      spacing: 40,
      direction: 'row',
      mob: {
        size: 2,
        width: 17,
        height: 20,
        spacing: 15,
      },
    }}
  >
    <NavigationComp {...props} />
  </LazyComponent>
);

const subItem = {
  __editorItemTitle: {
    title: 'Título en el editor',
    description: 'Texto que se usará para mostrar este ítem en el Site Editor',
    type: 'string',
  },
  title: {
    title: 'Título',
    description: 'Texto que se mostrará en la navegación',
    type: 'string',
  },
  style: {
    title: 'Estilo',
    description: 'Clase CSS personalizada para este elemento',
    type: 'string',
    enum: ['red', 'bold', 'iconFlyup', 'iconVelez'],
    enumNames: [
      'Texto color rojo',
      'Texto en negrita',
      'Icono Flyup',
      'Icono Vélez',
    ],
  },
  href: {
    title: 'Enlace',
    description: 'URL a la que apunta el ítem',
    type: 'string',
  },
};

Navigation.schema = {
  title: 'Navigation',
  description: 'Componente de navegación con subelementos anidados',
  type: 'object',
  properties: {
    menuItems: {
      default: [],
      title: 'Ítems de navegación',
      description: 'Lista de elementos de navegación',
      type: 'array',
      items: {
        title: 'item de navegación',
        type: 'object',
        properties: {
          ...subItem,
          subItems: {
            title: 'Sub elementos',
            description: 'Sub lista de subelementos anidados',
            type: 'array',
            default: [],
            items: {
              title: 'Subitem de navegación',
              type: 'object',
              properties: {
                ...subItem,
                subItems: {
                  title: 'Sub elementos dos',
                  description: 'Sub Lista de subelementos anidados dos',
                  type: 'array',
                  default: [],
                  items: {
                    title: 'Subitem dos de navegación',
                    type: 'object',
                    properties: {
                      ...subItem,
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
  definitions: {},
};

export default Navigation;
