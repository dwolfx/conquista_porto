import styled, { css } from 'styled-components'

import Button from 'components/Button'
import Card from 'components/Card'
import HorizontalList from 'components/HorizontalList'

import { CardBody, CardFooter } from 'components/Card/styles'

export const ButtonStyled = styled(Button)`
  padding: 10px ${({ theme }) => theme.spacing(16)}px;

  @media ${({ theme }) => theme.mediaQueries.lg} {
    padding: 10px ${({ theme }) => theme.spacing(9)}px;
  }
`
export const CardStyled = styled(Card)`
  padding: 0;
  max-height: 308px;
  height: 308px;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  border: 1px solid ${({ theme }) => theme.colors.gray2};

  ${CardBody} {
    overflow-y: auto;
  }

  ${CardFooter} {
    justify-content: center;
    border-color: ${({ theme }) => theme.colors.gray2};
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`

interface IFundItemProps {
  selected: boolean
  itemsLength: number
}
export const FundItem = styled.div<IFundItemProps>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray1};
  cursor: pointer;
  padding: ${({ theme }) => `0 ${theme.spacing(5)}px 0 ${theme.spacing(1)}px;`}
    ${({ selected }) =>
      selected
        ? css`
            box-shadow: ${({ theme }) => theme.shadows.blue1};
          `
        : css`
            box-shadow: none;
          `};

  &:last-child {
    ${({ theme, itemsLength }) =>
      itemsLength > 4
        ? 'border-bottom: none;'
        : `border-bottom: 1px solid ${theme.colors.gray1};`}
  }
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.blue3};
  }
`

export const HorizontalListStyled = styled(HorizontalList)`
  height: auto;
  padding: 0;
`
