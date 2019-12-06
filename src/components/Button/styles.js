import styled from 'styled-components'

export const Button = styled.button`
  position: relative;
  box-sizing: border-box;
  min-width: 230px;
  background: ${props => {
    switch (props.color) {
      case 'primary':
        return !props.disabled
          ? `linear-gradient(
            270deg,
            ${props.theme.colors.lightPrimary} 0,
            ${props.theme.colors.mediumPrimary} 50%,
            ${props.theme.colors.darkPrimary} 60%
          )`
          : props.theme.colors.disabledPrimary
      case 'secondary':
        return !props.disabled
          ? `linear-gradient(
            270deg,
            ${props.theme.colors.lightSecondary} 0,
            ${props.theme.colors.mediumSecondary} 50%,
            ${props.theme.colors.darkSecondary} 60%
          )`
          : props.theme.colors.disabledSecondary
      case 'alternative':
        return !props.disabled
          ? `linear-gradient(
              270deg,
              ${props.theme.colors.lightAlternative} 0,
              ${props.theme.colors.mediumAlternative} 50%,
              ${props.theme.colors.darkAlternative} 60%
            )`
          : props.theme.colors.disabledAlternative
      default:
        return `linear-gradient(
          270deg,
          rgba(255,255,255,0),
          rgba(255,255,255,0) 50%,
          rgba(190,199,190,.2) 60%,
          rgba(190,190,190,.2) 100%
        )`
    }
  }};
  background-size: 250% 100%;
  background-position: 98%;
  background-repeat: no-repeat;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
  border-radius: 4px;
  padding: 9px 25px;
  color: ${props => {
    if (props.color) {
      return '#fff'
    }

    return props.theme.colors.lightPrimary
  }};
  cursor: ${props => (props.disabled ? 'disabled' : 'pointer')};
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
  transition: all 0.3s ease-out 0s;
  border: ${props =>
    props.color ? 'none' : `1px solid ${props.theme.colors.lightPrimary}`};
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 11px;
  text-align: center;
  margin: 7px;
  display: inline-block;

  &:hover {
    background-position: 0;

    &:active {
      &:after {
        background-color: ${props => {
          switch (props.color) {
            case 'primary':
              return props.theme.colors.darkPrimary
            case 'secondary':
              return props.theme.colors.darkSecondary
            case 'alternative':
              return props.theme.colors.darkAlternative
            default:
              return 'rgba(190,190,190,.2)'
          }
        }};
        background-size: 100%;
        transition: all ease 0s;
        opacity: 0.2;
      }
    }
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      pointer-events: none;
      background: transparent radial-gradient(circle, #000 1%, transparent 1%)
        center/15000%;
      opacity: 0;
      background-position: center;
      transition: all ease 0.8s;
    }
  }
`
