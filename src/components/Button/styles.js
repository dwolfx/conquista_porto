import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Button = styled(Link)`
  position: relative;
  box-sizing: border-box;
  min-width: 230px;
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

    return '#30C5FF'
  }};
  cursor: pointer;
  transition: all 0.3s ease-out 0s;
  border: ${props => (props.color ? 'none' : '1px solid #30C5FF')};
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 11px;
  text-align: center;

  &:hover {
    background-position: 0;

    &:active {
      &:after {
        background-color: #148dbb;
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
