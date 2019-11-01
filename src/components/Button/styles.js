import styled from 'styled-components'

export const Button = styled.a`
  box-sizing: border-box;
  min-width: 230px;
  text-align: center;
  background: ${props => {
    switch (props.color) {
      case 'primary':
        return `linear-gradient(
          270deg,
          #3dacff 0,
          #2fc5ff 50%,
          #148dbb 60%,
          #148dbb 100%
        )`
      case 'secondary':
        return `linear-gradient(
          270deg,
          #FF7433 0,
          #FE5C00 50%,
          #F35600 60%,
          #F35600 100%
        )`
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
  overflow: hidden;
  transform: translate3d(0, 0, 0);
  background-size: 250% 100%;
  background-position: 98%;
  border-radius: 4px;
  padding: 9px 25px;
  color: ${props => {
    if (props.color) {
      return '#fff'
    }

    return '#30C5FF'
  }};
  text-transform: uppercase;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.3s ease-out 0s;
  border: ${props => (props.color ? 'none' : '1px solid #30C5FF')};
  font-weight: 600;

  &:hover {
    background-position: 0;

    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      pointer-events: none;
      background-image: radial-gradient(circle, #000 10%, transparent 10.01%);
      background-repeat: no-repeat;
      background-position: 50%;
      transform: scale(10, 10);
      opacity: 0;
      transition: transform 0.5s, opacity 1s;
    }
    &:active {
      &:after {
        transform: scale(0, 0);
        opacity: 0.2;
        transition: 0s;
      }
    }
  }
`
