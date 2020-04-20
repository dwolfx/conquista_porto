import styled, { css } from 'styled-components'

const arrowDirection = {
  bottom: {
    main: css`
      top: -14px;
      left: calc(50% - 7px);
    `,
    pseudo: css`
      border-color: ${props =>
        `${
          props.tooltip ? props.theme.colors.gray6 : props.theme.colors.white
        } transparent transparent ${
          props.tooltip ? props.theme.colors.gray6 : props.theme.colors.white
        }`};
      top: 9px;
      left: calc(50% - 5px);
    `,
  },
  left: {
    main: css`
      top: calc(50% - 7px);
      right: -14px;
    `,
    pseudo: css`
      border-color: ${props =>
        `${
          props.tooltip ? props.theme.colors.gray6 : props.theme.colors.white
        } ${
          props.tooltip ? props.theme.colors.gray6 : props.theme.colors.white
        } transparent transparent`};
      top: 1px;
      left: -5px;
    `,
  },
  right: {
    main: css`
      top: calc(50% - 7px);
      left: -14px;
    `,
    pseudo: css`
      border-color: ${props =>
        `transparent transparent ${
          props.tooltip ? props.theme.colors.gray6 : props.theme.colors.white
        } ${
          props.tooltip ? props.theme.colors.gray6 : props.theme.colors.white
        }`};
      top: 1px;
      right: -5px;
    `,
  },
  top: {
    main: css`
      bottom: -14px;
      left: calc(50% - 7px);
    `,
    pseudo: css`
      border-color: ${props =>
        `transparent ${
          props.tooltip ? props.theme.colors.gray6 : props.theme.colors.white
        } ${
          props.tooltip ? props.theme.colors.gray6 : props.theme.colors.white
        } transparent`};
      top: -5px;
      left: calc(50% - 5px);
    `,
  },
}

export const PopoverContainer = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: 4px;
  box-shadow: ${props => props.theme.shadows.gray2};
  padding: 14px;
  position: relative;
  z-index: 13;
`

export const Tooltip = styled(PopoverContainer)`
  background-color: ${props => props.theme.colors.gray6};
  color: ${props => props.theme.colors.white};
  opacity: 0.84;
  padding: 4.5px 7px;
`

export const Arrow = styled.div`
  height: 14px;
  overflow: hidden;
  position: absolute;
  width: 14px;
  z-index: -1;
  ${props => arrowDirection[props.placement].main};

  &:before {
    border: 5px solid;
    content: '';
    position: absolute;
    transform: rotate(45deg);
    z-index: 10;
    ${props => arrowDirection[props.placement].pseudo};
  }
  &:after {
    border: 5px solid;
    box-shadow: ${props => props.theme.shadows.gray2};
    content: '';
    position: absolute;
    transform: rotate(-45deg);
    z-index: -10;
    ${props => arrowDirection[props.placement].pseudo};
  }
`

export const ChildrenWrapper = styled.div`
  cursor: pointer;
`
