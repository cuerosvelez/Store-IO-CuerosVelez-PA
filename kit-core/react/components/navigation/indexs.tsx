// /* eslint-disable no-console */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useMemo, useState } from 'react';

// import { css } from '@emotion/css';

// import { Icon } from 'vtex.store-icons';
// import { useDevice } from 'vtex.device-detector';
// import { Link, Block } from 'vtex.render-runtime';
// import { useCssHandles } from 'vtex.css-handles';

// import styled from '../style/style.css';
// import BtnSearch from '../common/BtnSearch';

// import type { CSSProperties, ReactNode } from 'react';

// import type { INavigation, ISubItem } from '../types/navigation';

// const CSS_HANDLES = [
//   'menu',
//   'menuIcon',
//   'menuItem',
//   'menuContent',
//   'subMenuItem',
//   'menuItemLink',
//   'subMenuContent',
//   'subMenuContainer',
// ] as const;

// const configStyle: {
//   [key: string]: CSSProperties | string;
// } = {
//   red: {
//     fontWeight: 600,
//     color: '#C30303',
//   },
//   bold: {
//     fontWeight: 600,
//   },
//   iconFlyup: 'flyup',
// };

// const SubItemResponsive = ({
//   href,
//   classes,
//   children,
//   onClick,
// }: {
//   classes: string;
//   children: ReactNode;
//   href?: string | null;
//   onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
// }) => {
//   return (
//     <>
//       {href ? (
//         <Link to={href?.toLowerCase()} className={classes}>
//           {children}
//         </Link>
//       ) : (
//         <button
//           onClick={onClick}
//           className={`w0 pa0 pointer bn bg-transparent ${classes}`}
//         >
//           {children}
//         </button>
//       )}
//     </>
//   );
// };

// const SubItem = ({
//   title,
//   style,
//   subItems,
//   level = 0,
//   href = '#',
//   handles = {},
//   paramsKeys = '',
//   isMobile = false,
// }: ISubItem) => {
//   const { classes, isIcon, selectStyle, newLevel, isLevel, isSubItems } =
//     useMemo(() => {
//       const vNewLevel = level + 1;
//       const vIsLevel = level === 2;
//       const vIsIcon = style?.includes('icon');
//       const vSelectStyle = configStyle[`${style}`];
//       const vIsSubItems = Array.isArray(subItems) && subItems?.length > 0;

//       const vClasses = `c-on-base no-underline ${
//         vSelectStyle && typeof vSelectStyle === 'object' && vSelectStyle
//           ? css({ ...vSelectStyle }) + ' '
//           : ''
//       }${vIsIcon ? styled['menuItem'] + 'Icon ' : ''}${
//         styled['menuItem'] + 'Link' + '--' + 'level' + '-' + level
//       } ${handles['menuItemLink']}`;

//       return {
//         isIcon: vIsIcon,
//         classes: vClasses,
//         isLevel: vIsLevel,
//         newLevel: vNewLevel,
//         isSubItems: vIsSubItems,
//         selectStyle: vSelectStyle,
//       };
//     }, [handles, level, style, subItems]);

//   const [isActive, setIsActive] = useState(false);

//   return (
//     <li
//       key={`${title}-${level}`}
//       className={`${styled['menuItem'] + '--' + 'level' + '-' + level} ${
//         isActive ? styled['menuItem'] + '--active ' : ''
//       }${handles['menuItem']}`}
//     >
//       <SubItemResponsive
//         classes={classes}
//         onClick={() => setIsActive((s) => !s)}
//         {...(isSubItems && isMobile ? { href: href } : {})}
//       >
//         {title}
//         {isIcon && (
//           <Icon
//             isActive={true}
//             id={selectStyle}
//             activeClassName={handles['menuIcon']}
//           />
//         )}
//       </SubItemResponsive>
//       {(isSubItems || isLevel) && (
//         <ul
//           className={`list pl0 ${
//             styled['subMenuItem'] + 'Box' + '--' + 'level' + '-' + level
//           } ${handles['subMenuItem']}`}
//         >
//           {isLevel && (
//             <SubItem
//               level={999}
//               handles={handles}
//               title={'Ver todo'}
//               isMobile={isMobile}
//               key={`nivel-ver-${newLevel}-${paramsKeys}-${title}`}
//             />
//           )}
//           {isSubItems &&
//             subItems?.map((subItem, idx) => {
//               const params = `${paramsKeys}-${subItem?.title}`;
//               return (
//                 <SubItem
//                   {...subItem}
//                   level={newLevel}
//                   handles={handles}
//                   paramsKeys={params}
//                   isMobile={isMobile}
//                   key={`${params}-${newLevel}-${idx}`}
//                 />
//               );
//             })}
//         </ul>
//       )}
//     </li>
//   );
// };

// const NavigationContent = ({ menuItems = [], handles }: INavigation) => {
//   return (
//     <ul className={`list pl0 flex flex-row ma0 ${handles['menu']}`}>
//       {menuItems?.map((menuItem: ISubItem) => (
//         <SubItem
//           level={1}
//           {...menuItem}
//           handles={handles}
//           key={`${menuItem?.title}-1`}
//           paramsKeys={`${menuItem?.title}`}
//         />
//       ))}
//     </ul>
//   );
// };

// interface IModalMobile {
//   classes?: string;
//   isActive: boolean;
//   children?: ReactNode;
//   setIsActive: (value: React.SetStateAction<boolean>) => void;
// }

// const ModalMobile = ({
//   isActive,
//   setIsActive,
//   classes,
//   children,
// }: IModalMobile) => (
//   <div
//     className={`vtex-modal__overlay ${styled['menuMobile'] + 'Container'} ${
//       classes ? styled['menuMobile'] + 'Container--' + classes + ' ' : ''
//     }${
//       styled['menuMobile'] + 'Container--' + (isActive ? 'visible' : 'hidden')
//     }`}
//   >
//     <div
//       className={`vtex-modal__modal br2 w-100 flex flex-column ${
//         styled['menuMobile'] + 'Content'
//       }`}
//     >
//       <div
//         className={`flex justify-content relative ${
//           styled['menuMobile'] + 'Header'
//         }`}
//       >
//         <Block id="nav-logo" />
//         <Block id="search-bar" />
//         <button
//           onClick={() => setIsActive(false)}
//           className="pa0 pointer bn bg-transparent absolute pointer ml-auto items-center flex vtex-modal__close-icon"
//         >
//           <svg
//             className="vtex__icon-close  "
//             width="18"
//             height="18"
//             viewBox="0 0 18 18"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//           >
//             <g fill="currentColor">
//               <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
//             </g>
//           </svg>
//         </button>
//       </div>
//       {!!children && (
//         <div
//           className={`overflow-auto flex-shrink-1 flex-grow-1 ${
//             styled['menuMobile'] + 'SectionMenu'
//           }`}
//         >
//           {children}
//         </div>
//       )}
//     </div>
//   </div>
// );

// const ContainerMobile = ({ children }: any) => {
//   const [isMenu, setIsMenu] = useState(false);
//   const [isActiveSearch, setIsActiveSearch] = useState(false);

//   return (
//     <>
//       <button
//         className={`pa0 pointer bn bg-transparent ${
//           styled['buttonIcon'] + 'Search'
//         }`}
//         onClick={() => setIsMenu((s) => !s)}
//       >
//         <Icon
//           isActive={true}
//           id={'icon-burger'}
//           activeClassName={styled['icon'] + 'Burger'}
//         />
//       </button>
//       <ModalMobile isActive={isMenu} setIsActive={setIsMenu}>
//         {children}
//       </ModalMobile>
//       <BtnSearch
//         isActiveSearch={isActiveSearch}
//         setIsActiveSearch={setIsActiveSearch}
//       />
//       {isActiveSearch && (
//         <ModalMobile
//           classes="modal-search"
//           isActive={isActiveSearch}
//           setIsActive={setIsActiveSearch}
//         />
//       )}
//     </>
//   );
// };

// const Navigation = (props: INavigation) => {
//   const { isMobile } = useDevice();
//   const { handles } = useCssHandles(CSS_HANDLES);

//   return (
//     <>
//       {!isMobile ? (
//         <NavigationContent {...props} handles={handles} />
//       ) : (
//         <ContainerMobile>
//           <NavigationContent {...props} handles={handles} isMobile={isMobile} />
//         </ContainerMobile>
//       )}
//     </>
//   );
// };

// const schemaItems = {
//   __editorItemTitle: {
//     type: 'string',
//     default: 'Sub item',
//     title: 'Editor Title Item',
//   },
//   title: {
//     title: 'Title',
//     type: 'string',
//   },
//   href: {
//     title: 'Link',
//     type: 'string',
//   },
//   style: {
//     type: 'string',
//     title: 'Style',
//     enum: ['red', 'bold', 'iconFlyup', 'none'],
//     enumNames: ['Text Red', 'Text Bold', 'FLYUP', 'None'],
//   },
// };

// const schemaSubItems = {
//   default: [],
//   type: 'array',
//   title: 'Sub Menu Items',
//   items: {
//     title: 'Sub Menu Item',
//     type: 'object',
//     properties: schemaItems,
//   },
// };

// Navigation.schema = {
//   title: 'Menu',
//   type: 'object',
//   properties: {
//     menuItems: {
//       default: [],
//       type: 'array',
//       title: 'Menu Items',
//       items: {
//         title: 'Menu Item',
//         type: 'object',
//         properties: {
//           ...schemaItems,
//           subItems: schemaSubItems,
//         },
//       },
//     },
//   },
// };

// export default Navigation;
