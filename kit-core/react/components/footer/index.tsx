/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo, useMemo, useState } from 'react';
import { Link, useRuntime } from 'vtex.render-runtime';

import styled from '../style/style.css';

import type { ReactNode } from 'react';
import { useCssHandles } from 'vtex.css-handles';
import { Icon } from 'vtex.store-icons';
import { styleHeaders } from '../utils/styleSeo';

import {
  Newsletter,
  FormSubmit,
  FormEmailInput,
  FormConfirmationCheckbox,
} from 'vtex.store-newsletter';

interface SubItemResponsiveProps {
  href?: string | null;
  classes: string;
  children: ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface IItemsFooter {
  handles?: any;
  title: string;
  href?: string;
  level?: number;
  paramsKeys?: string;
  subItems: IItemsFooter[];
}

const CSS_HANDLES = [
  'footerItem',
  'footerRedes',
  'footerItems',
  'footerSubItem',
  'footerItemLink',
  'footerPayments',
  'footerContainer',
  'footerRedesLink',
  'footerCopyRight',
  'footerIconPayment',
  'footerItemsGroups',
  'footerPaymentIcons',
  'footerPaymentTitle',
  'footerIconCopyRight',
  'footerTextCopyRight',
  'footerItemsContainer',
  'footerNewsLetterTitle',
  'footerSectionIconCopyRight',
] as const;

const SubItemResponsive = ({
  href,
  classes,
  children,
  onClick,
}: SubItemResponsiveProps) => {
  return href ? (
    <Link
      to={href.toLowerCase()}
      className={`c-on-base no-underline ${classes}`}
    >
      {children}
    </Link>
  ) : (
    <button
      onClick={onClick}
      className={`w0 pa0 pointer bn bg-transparent c-on-base ${
        styled['footer'] + 'SubItemsButton'
      } ${classes}`}
    >
      {children}
    </button>
  );
};

const ItemsFooter = memo(
  ({
    title,
    handles,
    subItems,
    level = 0,
    href = '#',
    paramsKeys = '',
  }: IItemsFooter) => {
    const { classes, newLevel, isSubItems } = useMemo(() => {
      const vNewLevel = level + 1;

      const vIsSubItems = Array.isArray(subItems) && subItems?.length > 0;

      const vClasses = `${styled.footerItem + 'Link'}--level-${level} ${
        handles['footerItemLink']
      }`;

      return {
        classes: vClasses,
        newLevel: vNewLevel,
        isSubItems: vIsSubItems,
      };
    }, [handles, level, subItems]);

    const [isActive, setIsActive] = useState(false);

    return (
      <li
        key={`${title}-${level}`}
        className={`${styled.footerItem + '--' + 'level' + '-' + level} ${
          isActive ? styled.footerItem + '--active ' : ''
        }${handles['footerItem']}`}
      >
        <SubItemResponsive
          classes={classes}
          onClick={() => setIsActive((s) => !s)}
          {...(!isSubItems ? { href: href } : {})}
        >
          <h3 className={styled.footerSubItemsHs}>{title}</h3>
        </SubItemResponsive>
        {isSubItems && (
          <ul
            className={`list pl0 ma0 ${styled['footerSub']}Item--level-${level} ${handles['footerSubItem']}`}
          >
            {isSubItems &&
              subItems?.map((subItem, idx) => {
                const params = `${paramsKeys}-${subItem?.title}`;
                return (
                  <ItemsFooter
                    {...subItem}
                    level={newLevel}
                    handles={handles}
                    paramsKeys={params}
                    key={`${params}-${newLevel}-${idx}`}
                  />
                );
              })}
          </ul>
        )}
      </li>
    );
  },
);

ItemsFooter.displayName = 'Footer';

interface IFooter {
  items?: {
    subItems?: IItemsFooter[];
  }[];
  copyright?: {
    logo?: string;
    text?: string;
  };
  redes: {
    title: string;
    href: string;
  }[];
  payments?: {
    title?: string;
    items?: {
      id?: string;
    }[];
  };
  newsLetter: {
    link: string;
    text?: string;
    title?: string;
    textLink: string;
    textButton?: string;
    placeholder?: string;
  };
}

const Footer = ({
  items,
  copyright,
  redes,
  payments,
  newsLetter = {
    link: '#',
    textButton: 'SUSCRIBIRME',
    textLink: 'disponible aquí',
    title: 'Entérate de todas las novedades',
    placeholder: 'Escribe tu correo electrónico',
    text: 'Autorizo el tratamiento de mis datos personales de acuerdo con la Política de Tratamiento de datos personales {term}',
  },
}: IFooter) => {
  const { route } = useRuntime();
  const [news, setNews] = useState(false);
  const { handles } = useCssHandles(CSS_HANDLES);

  return (
    <footer
      className={`${handles.footerContainer}${
        route?.canonicalPath?.startsWith('/flyup')
          ? ' ' + styled['footer'] + 'Container--flyup'
          : ''
      }`}
    >
      <Newsletter>
        <section className={`${styled['footer'] + 'NewsLetterLeft'}`}>
          {!news ? (
            newsLetter?.title && (
              <h2 className={`ma0 ${handles.footerNewsLetterTitle}`}>
                {newsLetter.title}
              </h2>
            )
          ) : (
            <>
              <FormEmailInput placeholderText={newsLetter?.placeholder} />
              <FormConfirmationCheckbox
                firstLabelLink={{
                  url: newsLetter?.link,
                  text: newsLetter?.textLink,
                }}
                checkboxLabel={newsLetter?.text?.replace(
                  /\{\s*term\s*\}/g,
                  '{firstLink}',
                )}
              />
            </>
          )}
        </section>
        <div
          tabIndex={0}
          role="button"
          className={`${styled['footer'] + 'NewsLetterRight'}`}
          onClick={(event) => {
            if (!news) {
              event.preventDefault();
              event.stopPropagation();
              setNews(true);
            }
          }}
        >
          <FormSubmit submitButtonLabel={newsLetter?.textButton} />
        </div>
      </Newsletter>
      <nav className={`${handles.footerItems}`}>
        <h2 style={styleHeaders}>Menu de navegación Footer</h2>
        <div className={`w-100 ${handles.footerItemsContainer}`}>
          {items?.map(({ subItems }, index) => (
            <ul
              className={`list pl0 ma0 ${handles.footerItemsGroups}`}
              key={`footer-link-container-${index}`}
            >
              {subItems?.map((item, idx) => (
                <ItemsFooter
                  {...item}
                  handles={handles}
                  key={`${item.title}-${index}-${idx}`}
                />
              ))}
            </ul>
          ))}
        </div>
      </nav>
      <div className={`${handles.footerRedes}`}>
        {redes.map(({ title, href }, idx) => (
          <Link
            className={`tc c-on-base no-underline ${handles.footerRedesLink}`}
            key={`redes-footer${idx}`}
            to={href}
          >
            {title}
          </Link>
        ))}
      </div>
      <div className={`${handles.footerPayments}`}>
        <h2 className={`ma0 ${handles.footerPaymentTitle}`}>
          {payments?.title}
        </h2>
        <div className={`${handles.footerPaymentIcons}`}>
          {payments?.items?.map((item, idx) => (
            <Icon
              id={item?.id}
              isActive={true}
              key={`payment-${idx}`}
              activeClassName={handles['footerIconPayment']}
            />
          ))}
        </div>
      </div>
      <div className={`${handles.footerCopyRight}`}>
        {copyright?.logo && (
          <div className={handles['footerSectionIconCopyRight']}>
            <Icon
              isActive={true}
              id={copyright?.logo}
              activeClassName={handles['footerIconCopyRight']}
            />
          </div>
        )}
        <p className={`ma0 c-on-base ${handles['footerTextCopyRight']}`}>
          {copyright?.text}
        </p>
      </div>
    </footer>
  );
};

const schemaSubItems: any = {
  subItems: {
    title: 'Footer Sub Items',
    type: 'array',
    default: [],
    items: {
      title: 'Footer Sub Item',
      type: 'object',
      properties: {
        __editorItemTitle: {
          type: 'string',
          default: 'Band',
          title: 'Item',
        },
        title: {
          title: 'Text ',
          type: 'string',
          default: '',
        },
        href: {
          title: 'Link',
          type: 'string',
          default: '',
        },
        // ...schemaSubItems,
      },
    },
  },
};

Footer.schema = {
  title: 'Footer',
  type: 'object',
  properties: {
    items: {
      title: 'Footer Items',
      type: 'array',
      default: [],
      items: {
        title: 'Footer Item Groups',
        type: 'object',
        properties: {
          __editorItemTitle: {
            type: 'string',
            default: 'Footer Item Groups',
            title: 'Editor Title Band',
          },
          ...schemaSubItems,
        },
      },
    },
    redes: {
      default: [],
      type: 'array',
      title: 'Redes items',
      items: {
        title: 'Red item',
        type: 'object',
        properties: {
          __editorItemTitle: {
            type: 'string',
            default: 'Red item',
            title: 'Item',
          },
          title: {
            title: 'Text',
            type: 'string',
            default: '',
          },
          href: {
            title: 'Link',
            type: 'string',
            default: '',
          },
        },
      },
    },
    payments: {
      title: 'Copy Right',
      type: 'object',
      properties: {
        items: {
          default: [],
          type: 'array',
          title: 'Payment items',
          items: {
            title: 'Payment item',
            type: 'object',
            properties: {
              __editorItemTitle: {
                type: 'string',
                default: 'Payment Item',
                title: 'Item',
              },
              title: {
                title: 'Text',
                type: 'string',
                default: '',
              },
              href: {
                title: 'Link',
                type: 'string',
                default: '',
              },
            },
          },
        },
      },
    },
    copyright: {
      title: 'Copy Right',
      type: 'object',
      properties: {
        logo: {
          title: 'Id Icon Copy Right',
          type: 'string',
          default: 'icon-industria',
        },
        text: {
          title: 'Text Copy Right',
          type: 'string',
        },
      },
    },
    newsLetter: {
      title: 'News Letter',
      type: 'object',
      properties: {
        textButton: {
          title: 'Text Button News Letter',
          type: 'string',
          default: 'SUSCRIBIRME',
        },
        title: {
          title: 'Title News Letter',
          type: 'string',
          default: 'Entérate de todas las novedades',
        },
        placeholder: {
          title: 'Placeholder News Letter',
          type: 'string',
          default: 'Escribe tu correo electrónico',
        },
        link: {
          title: 'Link News Letter',
          type: 'string',
          default: '/term',
        },
        textLink: {
          title: 'Text Link News Letter',
          type: 'string',
          default: 'disponible aquí',
        },
        text: {
          title: 'Text Button News Letter',
          type: 'string',
          default:
            'Autorizo el tratamiento de mis datos personales de acuerdo con la Política de Tratamiento de datos personales {term}',
        },
      },
    },
  },
};

export default Footer;
