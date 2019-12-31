export const themeColors = {
  secondary: {
    light: '#FF7433',
    medium: '#FE5C00',
    dark: '#F35600',
    disabled: '#f4bea5',
  },

  black: '#000',
  gray1: '#F9F9F9',
  gray2: '#EBEBEB',
  gray3: '#DDDDDD',
  gray4: '#BABABA',
  gray5: '#898989',
  gray6: '#272727',
  gray7: '#777777',
  white: '#FFFFFF',
  darkBlue1: '#E6F7FF',
  darkBlue2: '#004E70',
  blue1: '#EFFBFF',
  blue2: '#C8F0FF',
  blue3: '#A1E5FF',
  blue4: '#00ADEF',
  blue5: '#018CB7',
  green1: '#EEF8F2',
  green2: '#CFE8D2',
  green3: '#57B063',
  green4: '#46A166',
  green5: '#2F736B',
  yellow1: '#FFF3C4',
  yellow2: '#FFCD00',
  magenta1: '#FAD2E3',
  magenta2: '#E72176',
}

export const fundRiskColors = {
  lowRisk: '#555861',
  lowMediumRisk: '#33BFFF',
  mediumRisk: '#3CC225',
  mediumHighRisk: '#FDA529',
  highRisk: '#D0011B',
}

export const gridConfig = {
  breakpoints: {
    xl: 1280,
    lg: 1280,
    md: 980,
    sm: 736,
    xs: 480,
  },
  row: {
    padding: 7,
  },
  col: {
    padding: 7,
  },
  container: {
    padding: 7,
    maxWidth: {
      xl: 1280,
      lg: 1280,
      md: 980,
      sm: 736,
      xs: 480,
    },
  },
}

export const mediaQueries = {
  xs: `(max-width: ${gridConfig.breakpoints.xs}px)`,
  sm: `(max-width: ${gridConfig.breakpoints.sm}px)`,
  md: `(max-width: ${gridConfig.breakpoints.md}px)`,
  lg: `(max-width: ${gridConfig.breakpoints.lg}px)`,
  xl: `(max-width: ${gridConfig.breakpoints.xl}px)`,
  smUp: `(min-width: ${gridConfig.breakpoints.sm}px)`,
  mdUp: `(min-width: ${gridConfig.breakpoints.md}px)`,
  lgUp: `(min-width: ${gridConfig.breakpoints.lg}px)`,
  xlUp: `(min-width: ${gridConfig.breakpoints.xl}px)`,
}

const genericFontType = {
  fontFamily: 'Open Sans',
  lineHeight: 1.5,
}

export const fontTypes = {
  heading1: {
    ...genericFontType,
    fontSize: 92,
    letterSpacing: 0,
  },
  heading2: {
    ...genericFontType,
    fontSize: 56,
    letterSpacing: 1,
  },
  heading3: {
    ...genericFontType,
    fontSize: 34,
    letterSpacing: 0.5,
  },
  heading4: {
    ...genericFontType,
    fontSize: 22,
    letterSpacing: 0,
    textTransform: 'uppercase',
    fontWeight: 300,
  },
  headline: {
    ...genericFontType,
    fontSize: 18,
    letterSpacing: 0,
    fontWeight: 400,
  },
  title: {
    fontSize: 14,
    letterSpacing: 0.25,
    fontWeight: 600,
  },
  subheading: {
    ...genericFontType,
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: 600,
  },
  body: {
    ...genericFontType,
    fontSize: 14,
    letterSpacing: 0,
  },
  caption: {
    ...genericFontType,
    fontSize: 12,
    letterSpacing: 0,
    fontWeight: 400,
  },
  captionUppercase: {
    ...genericFontType,
    fontSize: 12,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    fontWeight: 400,
  },
  button: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
}

export default {
  colors: themeColors,
  fundRiskColors,
  fontFamily: 'Open Sans',
  fontTypes,
  gutter: 14,
  grid: gridConfig,
  mediaQueries,
}
