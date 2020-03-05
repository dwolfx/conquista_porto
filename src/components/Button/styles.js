import styled from 'styled-components'

// functions
const handleBgGradient = (colors, type, isDisabled, isOutline) => {
  if (isOutline) {
    return colors.white
  }

  switch (type) {
    case 'primary':
      return !isDisabled
        ? `linear-gradient(
          to left,
          ${colors.blue5} 20%,
          ${colors.blue4}
        )`
        : colors.blue2
    case 'secondary':
      return !isDisabled
        ? `linear-gradient(
            to left,
            ${colors.green5} -35%,
            ${colors.green4}
          )`
        : colors.green2
    default:
      return colors.white
  }
}

const handleBgHover = (colors, type, isOutline) => {
  switch (type) {
    case 'primary':
      return isOutline ? colors.blue1 : colors.blue5
    case 'secondary':
      return isOutline ? colors.green1 : colors.green5
    default:
      return colors.gray1
  }
}

const handleBorder = (colors, type, isDisabled, isOutline) => {
  if (!isOutline) {
    return 'none'
  }

  let borderColor = ''

  if (type === 'primary') {
    borderColor = !isDisabled ? colors.blue4 : colors.gray3
  } else {
    borderColor = !isDisabled ? colors.green4 : colors.gray3
  }

  return `1px solid ${borderColor}`
}

const handleColor = (colors, type, isDisabled, isOutline) => {
  if (!isOutline) {
    return colors.white
  }

  if (type === 'primary') {
    return !isDisabled ? colors.blue4 : colors.gray3
  }

  return !isDisabled ? colors.green4 : colors.gray3
}

// styles
export const LoadingContainer = styled.div`
  position: absolute;
  top: calc(50% - 12px);
  right: 14px;
`

export const Button = styled.button`
  background: ${props =>
    handleBgGradient(
      props.theme.colors,
      props.color,
      props.disabled,
      props.outline
    )};
  background-repeat: no-repeat;
  border: ${props =>
    handleBorder(
      props.theme.colors,
      props.color,
      props.disabled,
      props.outline
    )};
  border-radius: 4px;
  box-sizing: border-box;
  display: inline-block;
  color: ${props =>
    handleColor(
      props.theme.colors,
      props.color,
      props.disabled,
      props.outline
    )};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  height: 35px;
  overflow: hidden;
  position: relative;
  text-decoration: none;
  transition: all 0.4s ease-out;

  &:hover {
    &:active {
      pointer-events: ${props => (props.disabled ? 'none' : 'auto')};

      &:after {
        background-color: ${props =>
          handleBgHover(props.theme.colors, props.color, props.outline)};
        background-size: 100%;
        opacity: 0.2;
        transition: all ease 0s;
      }
    }

    /* only render hover and ripple style if button is not disabled */
    ${props =>
      !props.disabled &&
      `
      &:before {
        width: 100%;
      }
      &:after {
        background: transparent
          radial-gradient(
            circle,
            ${props.theme.colors.black} 1%,
            transparent 1%
          )
          center/15000%;
        background-position: center;
        content: '';
        height: 100%;
        left: 0;
        opacity: 0;
        pointer-events: none;
        position: absolute;
        top: 0;
        transition: all ease 0.8s;
        width: 100%;
      }
    `}
  }
  &:before {
    background-color: ${props =>
      handleBgHover(props.theme.colors, props.color, props.outline)};
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transition: width 0.2s ease-in;
    width: 0;
  }
`

export const Content = styled.span`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 9px 25px;
  position: relative;
  width: 100%;
  ${props => props.theme.fontTypes.button};
`
