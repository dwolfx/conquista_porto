import styled, { css } from 'styled-components'

import Button from 'components/Button'
import IconButton from 'components/Button/Icon'
import Card from 'components/Card'
import { CardFooter, CardBody } from 'components/Card/styles'
import HorizontalList from 'components/HorizontalList'
import Carousel from 'components/Carousel'

export const CardStyled = styled(Card)`
  padding: 0;
  max-height: 308px;
  border: 1px solid ${({ theme }) => theme.colors.gray2};

  ${CardBody} {
    overflow-y: scroll;
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
}

export const ButtonStyled = styled(Button)`
  padding: 10px 114px;
`

export const ButtonVertical = styled(IconButton)`
  border-radius: 4px;
  margin-right: 14px;
  width: 49px !important;
  height: 112px;
`

export const FundItem = styled.div<IFundItemProps>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray1};
  cursor: pointer;
  padding: 0 35px 0 7px;

  ${({ selected }) =>
    selected
      ? css`
          box-shadow: 0px 3px 6px rgba(0, 173, 239, 0.14);
        `
      : css`
          box-shadow: none;
        `};

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.blue3};
  }

  &:last-child {
    border-bottom: none;
  }
`

interface IChipProps {
  onClick: () => any
  selected: boolean
}

export const CarouselStyled = styled(Carousel)`
  &.slick-slider {
    width: auto;
    background-color: red;
  }
`

export const Chip = styled(Card)<IChipProps>`
  border: 1px solid #dddddd;
  background-color: white;
  border-radius: 4px;
  width: 238px;
  margin-right: 14px;
  padding: 14px;
  height: 112px;

  ${({ selected }) =>
    selected
      ? css`
          box-shadow: 0px 3px 6px rgba(0, 173, 239, 0.14);
        `
      : css`
          box-shadow: none;
        `};

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.blue3};
  }

  ${CardBody} {
    height: 100%;
    justify-content: space-between;
  }
`

export const HorizontalListStyled = styled(HorizontalList)`
  height: auto;
  padding: 0;
`
