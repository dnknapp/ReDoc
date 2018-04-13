import { adjustHue, desaturate, lighten, transparentize } from 'polished';

const defaultTheme: ThemeInterface = {
  spacingUnit: 20,
  breakpoints: {
    small: '50rem',
    medium: '85rem',
    large: '105rem',
  },
  colors: {
    main: '#000000',
    brand: '#3BB878',
    brandDark: '#35a56b',
    success: '#3BB878',
    redirect: '#ffa500',
    error: '#E74C3C',
    info: '#87ceeb',
    text: '#4C4C4C',
    warning: '#f1c400',
    link: '#0089bc',
    hover: '#005170',
    http: {
      get: '#3BB878',
      post: '#0089BC',
      put: '#8468A4',
      options: '#d3ca12',
      patch: '#F4A63E',
      delete: '#EC6565',
      basic: '#999',
      link: '#31bbb6',
    },
  },
  schemaView: {
    linesColor: theme => lighten(0.25, desaturate(0.35, theme.colors.main)),
    defaultDetailsWidth: '75%',
    typeNameColor: theme => transparentize(0.2, theme.colors.text),
    typeTitleColor: theme => theme.schemaView.typeNameColor,
    requireLabelColor: theme => theme.colors.error,
  },
  baseFont: {
    size: '15px',
    lineHeight: '1.5',
    weight: '400',
    family: 'Lato, sans-serif',
    smoothing: 'antialiased',
    optimizeSpeed: true,
  },
  headingsFont: {
    family: 'Lato, sans-serif',
  },
  code: {
    fontSize: '13px',
    fontFamily: 'Source Code Pro, monospace',
  },
  links: {
    color: ({ colors }) => colors.brand,
    visited: ({ colors }) => colors.brand,
    hover: ({ colors }) => colors.brandDark,
  },
  menu: {
    width: '260px',
    backgroundColor: '#EBEFF0',
  },
  logo: {
    maxHeight: ({ menu }) => menu.width,
    maxWidth: ({ menu }) => menu.width,
    padding: '1.5rem 3rem 2rem',
  },
  rightPanel: {
    backgroundColor: '#2D3339',
    width: '40%',
  },
};

export default defaultTheme;

export function resolveTheme(theme: ThemeInterface): ResolvedThemeInterface {
  const resolvedValues = {};
  let counter = 0;
  const setProxy = (obj, path: string) => {
    Object.keys(obj).forEach(k => {
      const currentPath = (path ? path + '.' : '') + k;
      const val = obj[k];
      if (typeof val === 'function') {
        Object.defineProperty(obj, k, {
          get() {
            if (!resolvedValues[currentPath]) {
              counter++;
              if (counter > 1000) {
                throw new Error(
                  `Theme probably contains cirucal dependency at ${currentPath}: ${val.toString()}`,
                );
              }

              resolvedValues[currentPath] = val(theme);
            }
            return resolvedValues[currentPath];
          },
          enumerable: true,
        });
      } else if (typeof val === 'object') {
        setProxy(val, currentPath);
      }
    });
  };

  setProxy(theme, '');
  return JSON.parse(JSON.stringify(theme));
}

export interface ResolvedThemeInterface {
  spacingUnit: number;
  breakpoints: {
    small: string;
    medium: string;
    large: string;
  };
  colors: {
    main: string;
    brand: string;
    brandDark: string;
    success: string;
    redirect: string;
    error: string;
    info: string;
    text: string;
    warning: string;
    link: string;
    hover: string;
    http: {
      get: string;
      post: string;
      put: string;
      options: string;
      patch: string;
      delete: string;
      basic: string;
      link: string;
    };
  };
  schemaView: {
    linesColor: string;
    defaultDetailsWidth: string;
    typeNameColor: string;
    typeTitleColor: string;
    requireLabelColor: string;
  };
  baseFont: {
    size: string;
    lineHeight: string;
    weight: string;
    family: string;
    smoothing: string;
    optimizeSpeed: boolean;
  };
  headingsFont: {
    family: string;
  };
  code: {
    fontSize: string;
    fontFamily: string;
  };
  links: {
    color: string;
    visited: string;
    hover: string;
  };
  menu: {
    width: string;
    backgroundColor: string;
  };
  logo: {
    maxHeight: string;
    maxWidth: string;
    padding: string;
  };
  rightPanel: {
    backgroundColor: string;
    width: string;
  };
}

export type primitive = string | number | boolean | undefined | null;
export type AdvancedThemeDeep<T> = T extends primitive
  ? T | ((theme: ResolvedThemeInterface) => T)
  : AdvancedThemeObject<T>;
export type AdvancedThemeObject<T> = { [P in keyof T]: AdvancedThemeDeep<T[P]> };
export type ThemeInterface = AdvancedThemeObject<ResolvedThemeInterface>;
