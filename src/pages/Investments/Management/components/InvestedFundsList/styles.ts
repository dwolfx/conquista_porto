import styled, { css } from 'styled-components'

import IconComponent from 'components/IconExporter'
import Button from 'components/Button'
import Card from 'components/Card'
import Loading from 'components/Loading'
import Text from 'components/Text'
import { LegendText } from 'components/Loading/styles'
import { CardBody } from 'components/Card/styles'
import { Content } from 'components/Button/styles'

export const ContainerCard = styled(Card)`
  height: 350px;
  padding: ${({ theme }) => `${theme.spacing(19)}px ${theme.spacing(35)}px`};

  ${CardBody} {
    align-items: center;
  }

  @media ${({ theme }) => theme.mediaQueries.mdUp} {
    text-align: center;
    padding: ${({ theme }) => `${theme.spacing(18)}px`};
    margin-bottom: ${({ theme }) => `${theme.spacing(2)}px`};
  }

  @media ${({ theme }) => theme.mediaQueries.md} {
    text-align: center;
    padding: ${({ theme }) => `${theme.spacing(17)}px ${theme.spacing(8)}px`};
    margin-bottom: ${({ theme }) => `${theme.spacing(2)}px`};
  }
`
export const LoadingStyled = styled(Loading)`
  ${LegendText} {
    text-align: center;
  }
`
export const ErrorText = styled(Text).attrs(() => ({
  type: 'headline',
  color: 'magenta2',
}))`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

export const ButtonStyled = styled(Button)`
  padding: 0 ${({ theme }) => theme.spacing(4)}px;
  width: 196px;
  ${Content} {
    padding: 0;
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => `${theme.spacing(2)}px`};
`

export const ChangePageButton = styled.button<{ disabled: boolean }>`
  display: flex;
  background-color: ${({ theme }) => theme.colors.gray2};
  width: 28px;
  height: 28px;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;

  &:active {
    background-color: ${({ theme }) => theme.colors.gray1};
  }
  & + & {
    margin-left: ${({ theme }) => `${theme.spacing(2)}px`};
    svg {
      margin-left: 3px;
      margin-right: 0;
    }
  }
  svg {
    margin-right: 2px;
  }
  svg polyline {
    stroke-width: ${({ theme }) => `${theme.spacing(1)}px`};
    height: 12px;
    stroke: ${props => props.theme.colors.gray6};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      pointer-events: none;
      background-color: ${({ theme }) => theme.colors.gray1};

      svg polyline {
        stroke: ${props => props.theme.colors.gray4};
      }
    `}
`

export const ForwardIcon = styled(IconComponent)`
  height: 12px;
  width: 12px;
`

export const BackwardIcon = styled(IconComponent)`
  height: 12px;
  width: 12px;
`

export const FilterAndButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
