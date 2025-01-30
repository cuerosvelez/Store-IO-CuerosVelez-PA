import React, { memo, useMemo, useState } from 'react';
import SubItemResponsive from './SubItemResponsive';
import { configStyle } from '../utils/menu';
import { Icon } from 'vtex.store-icons';

import styled from '../style/style.css';
import type { ISubItem } from '../types/navigation';

const SubItem = memo(
  ({
    title,
    style,
    subItems,
    level = 0,
    href = '#',
    handles = {},
    paramsKeys = '',
    isMobile = false,
  }: ISubItem) => {
    const { classes, isIcon, selectStyle, newLevel, isLevel, isSubItems } =
      useMemo(() => {
        const vNewLevel = level + 1;
        const vIsLevel = level === 2;
        const vIsIcon = style?.includes('icon');
        const vSelectStyle = configStyle[`${style}`];
        const vIsSubItems = Array.isArray(subItems) && subItems?.length > 0;

        const vClasses = `c-on-base no-underline${
          vSelectStyle && !vIsIcon
            ? ' ' + styled['menuItem'] + 'Style--' + vSelectStyle
            : ''
        }${vIsIcon ? ' ' + styled['menuItem'] + 'Icon' : ''} ${
          styled.menuItemLink
        }--level-${level} ${handles['menuItemLink']}`;

        return {
          isIcon: vIsIcon,
          classes: vClasses,
          isLevel: vIsLevel,
          newLevel: vNewLevel,
          isSubItems: vIsSubItems,
          selectStyle: vSelectStyle,
        };
      }, [handles, level, style, subItems]);

    const [isActive, setIsActive] = useState(false);

    return (
      <li
        key={`${title}-${level}`}
        className={`${styled['menuItem'] + '--' + 'level' + '-' + level} ${
          isActive ? styled['menuItem'] + '--active ' : ''
        }${handles['menuItem']}`}
      >
        <SubItemResponsive
          classes={classes}
          onClick={() => setIsActive((s) => !s)}
          {...((isSubItems && !isMobile) || !isSubItems ? { href: href } : {})}
        >
          {title}
          {isIcon && (
            <Icon
              isActive={true}
              id={selectStyle}
              activeClassName={handles['menuIcon']}
            />
          )}
        </SubItemResponsive>
        {(isSubItems || isLevel) && (
          <ul
            className={`list pl0 ${styled['subMenuItem']}Box--level-${level} ${handles['subMenuItem']}`}
          >
            {(isLevel || isMobile) && (
              <SubItem
                level={999}
                handles={handles}
                title={'Ver todo'}
                isMobile={isMobile}
                key={`nivel-ver-${newLevel}-${paramsKeys}-${title}`}
              />
            )}
            {isSubItems &&
              subItems?.map((subItem, idx) => {
                const params = `${paramsKeys}-${subItem?.title}`;
                return (
                  <SubItem
                    {...subItem}
                    level={newLevel}
                    handles={handles}
                    paramsKeys={params}
                    isMobile={isMobile}
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

SubItem.displayName = 'SubItem';

export default SubItem;
