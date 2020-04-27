export const themeColors = {
  black: '#000',
  gray1: '#F1F1F1',
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

export const shadows = {
  gray1: '0px 1px 2px rgba(39, 39, 39, 0.14)',
  gray2: '0px 2px 4px rgba(39, 39, 39, 0.14)',
  gray3: '0px 4px 8px rgba(39, 39, 39, 0.14)',
  gray4: '0px 7px 21px rgba(39, 39, 39, 0.14)',
  blue1: '0px 3px 6px rgba(0, 173, 239, 0.14)',
}

export const fundRiskColors = {
  lowRisk: themeColors.darkBlue2,
  lowMediumRisk: themeColors.blue4,
  mediumRisk: themeColors.green3,
  mediumHighRisk: themeColors.yellow2,
  highRisk: themeColors.magenta2,
}

export const fundRiskColorsNew = {
  lowRisk: themeColors.gray4,
  lowMediumRisk: themeColors.blue4,
  mediumRisk: themeColors.green3,
  mediumHighRisk: themeColors.yellow2,
  highRisk: themeColors.magenta2,
}

export const objectivesColorGuide = [
  themeColors.magenta2,
  themeColors.yellow2,
  themeColors.green4,
  themeColors.darkBlue2,
  themeColors.darkBlue1,
  themeColors.green5,
  themeColors.magenta1,
]

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
}

export const fontTypes = {
  heading1: {
    ...genericFontType,
    fontSize: 92,
    letterSpacing: 0,
    lineHeight: '125px',
  },
  heading2: {
    ...genericFontType,
    fontSize: 56,
    letterSpacing: 1,
    lineHeight: '76px',
  },
  heading3: {
    ...genericFontType,
    fontSize: 34,
    letterSpacing: 0.5,
    lineHeight: '46px',
  },
  heading4: {
    ...genericFontType,
    fontSize: 22,
    letterSpacing: 0,
    lineHeight: '30px',
  },
  headline: {
    ...genericFontType,
    fontSize: 18,
    letterSpacing: 0,
    lineHeight: '25px',
  },
  title: {
    fontSize: 14,
    letterSpacing: 0.25,
    fontWeight: 600,
    lineHeight: '19px',
  },
  subheading: {
    ...genericFontType,
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: 600,
    lineHeight: '15px',
  },
  body: {
    ...genericFontType,
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: '19px',
  },
  caption: {
    ...genericFontType,
    fontSize: 12,
    letterSpacing: 0,
    fontWeight: 400,
    lineHeight: '16px',
  },
  captionUppercase: {
    ...genericFontType,
    fontSize: 12,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    fontWeight: 400,
    lineHeight: '16px',
  },
  button: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    lineHeight: '15px',
  },
}

export default {
  shadows,
  colors: themeColors,
  fundRiskColors,
  fundRiskColorsNew,
  fontFamily: 'Open Sans',
  fontTypes,
  gutter: 14,
  grid: gridConfig,
  mediaQueries,
}
