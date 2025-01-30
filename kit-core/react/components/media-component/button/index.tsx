import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useCssHandles } from 'vtex.css-handles';
import { useDevice } from 'vtex.device-detector';
import { Link } from 'vtex.render-runtime';

import type { ButtonProps, ButtonType } from '../../types/media';

const CSS_HANDLES = [
  'mediaButton',
  'wrapperTextBanner',
  'wrapperMediaButton',
  'containerMediaButton',
  'contentTextMediaButton',
] as const;

const defaultSettings = {
  widthContainer: 0,
  marginBottom: 108,
  directionRow: false,
  leftWidthContainer: false,
  justify: 'justify-center',
};

const applySettings = (overrides = {}) => {
  return { ...defaultSettings, ...overrides };
};

const Button: React.FC<ButtonProps> = ({
  buttons,
  colorBackground,
  color = '#CFCFCF',
  listPositionMobile = 1,
  listPositionDesktop = 1,
  advancedSettings = {},
}) => {
  const [hoverState, setHoverState] = useState<Record<string, boolean>>({});

  const { isMobile } = useDevice();
  const { handles } = useCssHandles(CSS_HANDLES);

  const currentSettings = useMemo(() => {
    if (isMobile) {
      const mobileSettings: Record<number, Partial<typeof defaultSettings>> = {
        1: { marginBottom: 6 },
        2: { marginBottom: 39 },
        3: { marginBottom: 54 },
        4: { marginBottom: 94 },
      };
      return applySettings(mobileSettings[listPositionMobile] || {});
    } else {
      const desktopSettings: Record<number, Partial<typeof defaultSettings>> = {
        1: {},
        2: { marginBottom: 177 },
        3: {
          justify: 'justify-end',
          widthContainer: 92.74,
          leftWidthContainer: true,
        },
        4: {
          directionRow: true,
          marginBottom: 362.5,
          widthContainer: 77.5,
          justify: 'items-start',
        },
        5: {
          justify: 'justify-end',
          widthContainer: 72.74,
          leftWidthContainer: true,
          marginBottom: 367.5,
        },
      };
      return applySettings(
        {
          ...desktopSettings[listPositionDesktop],
          ...advancedSettings,
        } || {},
      );
    }
  }, [isMobile, listPositionMobile, listPositionDesktop, advancedSettings]);

  const calculateVw = useCallback(
    (px: number) => {
      const screenWidth = isMobile ? 430 : 1920;
      return parseFloat(((px / screenWidth) * 100).toFixed(6));
    },
    [isMobile],
  );

  useEffect(() => {
    setHoverState(
      buttons.reduce((acc, _, idx) => {
        acc[`hover-${idx}`] = false;
        return acc;
      }, {} as Record<string, boolean>),
    );
  }, [buttons]);

  const wrapperClass = useMemo(() => {
    const baseClass = `w-100 flex absolute ${currentSettings.justify}`;
    const directionClass =
      isMobile || currentSettings.directionRow
        ? 'flex-column items-center'
        : 'flex-row';
    return `${baseClass} ${directionClass}`;
  }, [isMobile, currentSettings]);

  const wrapperStyle = useMemo(() => {
    const { widthContainer, marginBottom, leftWidthContainer } =
      currentSettings;

    return {
      padding: `0 ${
        !isMobile && widthContainer && leftWidthContainer
          ? 100 - widthContainer
          : 0
      }% 0 ${
        !isMobile && widthContainer && !leftWidthContainer
          ? 100 - widthContainer
          : 0
      }%`,
      marginBottom: `${calculateVw(marginBottom)}vw`,
    };
  }, [currentSettings, isMobile, calculateVw]);

  const isValidHex = useCallback(
    (color: string) => /^#([0-9A-F]{3}){1,2}$/i.test(color),
    [],
  );

  return (
    <div
      ref={useRef<HTMLDivElement>(null)}
      className={`${wrapperClass} ${handles.wrapperMediaButton}`}
      style={wrapperStyle}
    >
      {buttons.map(
        ({ url, name, newTab, colorSingle = color }: ButtonType, idx) => {
          const isBackground = isValidHex(colorSingle);
          const height = calculateVw(
            isMobile
              ? advancedSettings.heightMobile || 37
              : advancedSettings.height || 35.5,
          );
          const width = calculateVw(
            isMobile
              ? advancedSettings.widthMobile || 177
              : advancedSettings.width || 230,
          );
          const spacing =
            calculateVw(
              isMobile
                ? advancedSettings.spacingMobile || 20
                : advancedSettings.spacing || 15,
            ) / 2;
          const fontSize = calculateVw(
            isMobile
              ? advancedSettings.fontSizeMobile || 12
              : advancedSettings.fontSize || 12,
          );

          const buttonStyle = {
            color: isBackground ? colorSingle : '#CFCFCF',
            background:
              colorBackground ??
              (hoverState[`hover-${idx}`]
                ? `${colorSingle}61`
                : `${colorSingle}00`),
            border:
              isBackground && !hoverState[`hover-${idx}`]
                ? `1px solid ${colorSingle}`
                : '1px solid transparent',
            margin: `${spacing}vw`,
            width: `${width}vw`,
            height: `${height}vw`,
            lineHeight: `${height}vw`,
            fontSize: `${fontSize}vw`,
            borderRadius: `${advancedSettings.borderRadius || 0}px`,
          };

          return (
            <Link
              key={idx}
              className={`tc dib ${handles.mediaButton}`}
              href={url}
              target={newTab ? '_blank' : '_self'}
              style={buttonStyle}
              onMouseEnter={() =>
                setHoverState((prev) => ({ ...prev, [`hover-${idx}`]: true }))
              }
              onMouseLeave={() =>
                setHoverState((prev) => ({
                  ...prev,
                  [`hover-${idx}`]: false,
                }))
              }
              rel="noreferrer"
            >
              {name}
            </Link>
          );
        },
      )}
    </div>
  );
};

export default Button;
