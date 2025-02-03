import { useMemo } from 'react';
import { useDevice } from 'vtex.device-detector';
import { ButtonStyleProps } from '../../../types/media';

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

export const useWrapperButtonStyle = ({
  listPositionMobile = 1,
  listPositionDesktop = 1,
  advancedSettings = {},
}) => {
  const { isMobile } = useDevice();

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
      marginBottom: `${calculateVw(marginBottom, isMobile)}vw`,
    };
  }, [currentSettings, isMobile]);

  return { wrapperClass, wrapperStyle };
};

const calculateVw = (px: number, isMobile?: boolean) => {
  const screenWidth = isMobile ? 430 : 1920;
  return parseFloat(((px / screenWidth) * 100).toFixed(6));
};

const isValidHex = (color: string) => /^#([0-9A-F]{3}){1,2}$/i.test(color);
export const useButtonStyle = ({
  colorSingle,
  colorBackground,
  advancedSettings,
}: ButtonStyleProps) => {
  const { isMobile } = useDevice();

  const buttonStyle = useMemo(() => {
    const isBackground = isValidHex(colorSingle ?? '');
    const height = calculateVw(
      isMobile
        ? advancedSettings?.heightMobile || 37
        : advancedSettings?.height || 35.5,
      isMobile,
    );
    const width = calculateVw(
      isMobile
        ? advancedSettings?.widthMobile || 177
        : advancedSettings?.width || 230,
      isMobile,
    );
    const spacing =
      calculateVw(
        isMobile
          ? advancedSettings?.spacingMobile || 20
          : advancedSettings?.spacing || 15,
        isMobile,
      ) / 2;
    const fontSize = calculateVw(
      isMobile
        ? advancedSettings?.fontSizeMobile || 12
        : advancedSettings?.fontSize || 12,
      isMobile,
    );

    return {
      color: isBackground ? colorSingle : '#CFCFCF',
      background: colorBackground ?? `${colorSingle}00`,
      margin: `${spacing}vw`,
      width: `${width}vw`,
      height: `${height}vw`,
      lineHeight: `${height}vw`,
      fontSize: `${fontSize}vw`,
      borderRadius: `${advancedSettings?.borderRadius || 0}px`,
      ...(isBackground ? { border: `1px solid ${colorSingle}` } : {}),
      '&:hover': {
        border: '1px solid transparent',
        background: colorBackground ?? `${colorSingle}61`,
      },
    };
  }, [
    advancedSettings?.borderRadius,
    advancedSettings?.fontSize,
    advancedSettings?.fontSizeMobile,
    advancedSettings?.height,
    advancedSettings?.heightMobile,
    advancedSettings?.spacing,
    advancedSettings?.spacingMobile,
    advancedSettings?.width,
    advancedSettings?.widthMobile,
    colorBackground,
    colorSingle,
    isMobile,
  ]);

  return { buttonStyle };
};
