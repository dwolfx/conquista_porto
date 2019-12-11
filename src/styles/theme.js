export const themeColors = {
  backgroundColor: '#f1f1f1',
  linkColor: '#1c1c1c',
  linkBlue: '#33BFFF',
  lightGray: '#e6e6e6',
  white: '#fff',
  black: '#000',

  primary: {
    light: '#30C5FF',
    medium: '#3dacff',
    dark: '#148dbb',
    disabled: '#86c2d9',
  },

  secondary: {
    light: '#FF7433',
    medium: '#FE5C00',
    dark: '#F35600',
    disabled: '#f4bea5',
  },

  alternative: {
    light: '#27c145',
    medium: '#3cc127',
    dark: '#379f26',
    disabled: '#27c14545',
  },
}

const fundRiskColors = {
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

export const defaultBreakpoints = {
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

export default {
  colors: themeColors,
  fundRiskColors,
  fontFamily: 'Open Sans',
  grid: gridConfig,
  mediaQueries: defaultBreakpoints,
}
