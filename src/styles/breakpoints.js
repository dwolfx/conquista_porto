const size = {
  mobile: '768px',
  tablet: '1024px',
  notebook: '1366px',
  notebookLarge: '1440px',
  fullhd: '1920px',
}

export default {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
  notebook: `(max-width: ${size.notebook})`,
  notebookLarge: `(max-width: ${size.notebookLarge})`,
  fullhd: `(max-width: ${size.fullhd})`,
}
