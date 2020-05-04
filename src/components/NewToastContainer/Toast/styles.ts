import styled, { css } from 'styled-components'
import { animated } from 'react-spring'
import Icon from 'components/IconExporter'

interface IToastProps {
  type: 'success' | 'error'
}

const toastTypeVariations = {
  success: css`
    border-color: ${props => props.theme.colors.green3};
    box-shadow: ${props => props.theme.shadows.green3};
  `,
  error: css`
    border-color: ${props => props.theme.colors.magenta2};
    box-shadow: ${props => props.theme.shadows.magenta3};
  `,
}

export const Container = styled(animated.div)<IToastProps>`
  width: 360px;
  position: relative;
  padding: 14px;
  display: flex;
  align-items: flex-start;
  border-radius: 8px;
  background-color: white;
  border: 1px solid;
  ${props => toastTypeVariations[props.type || 'success']};

  @media ${props => props.theme.mediaQueries.xs} {
    width: auto;
  }

  div {
    margin-left: 21px;
  }

  & + div {
    margin-top: 7px;
  }
`

export const IconStyled = styled(Icon)`
  width: 21px;
`

export const CloseToastIconButton = styled(IconStyled)`
  position: absolute;
  right: 14px;
  cursor: pointer;
`
