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
  white: '#FFFFFF',
  darkBlue1: '#E6F7FF',
  darkBlue2: '#004E70',
  blue1: '#EFFBFF',
  blue2: '#C8F0FF',
  blue3: '#A1E5FF',
  blue4: '#00ADEF',
  blue5: '#018CB7',
  green1: '#CFE8D2',
  green2: '#57B063',
  green3: '#46A166',
  green4: '#2F736B',
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
