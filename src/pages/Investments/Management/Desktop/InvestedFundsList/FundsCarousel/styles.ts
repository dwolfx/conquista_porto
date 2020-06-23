import styled, { css } from 'styled-components'

import IconButton from 'components/Button/Icon'
import Card from 'components/Card'
import { CardBody } from 'components/Card/styles'

export const ButtonVertical = styled(IconButton)`
  border-radius: 4px;
  margin-right: 14px;
  width: 49px !important;
  height: 112px;
`

export const ContentContainer = styled.div`
  margin-bottom: 14px;
`

interface IChipProps {
  onClick: () => any
  selected: boolean
}
export const Chip = styled(Card)<IChipProps>`
  border: 1px solid #dddddd;
  background-color: white;
  border-radius: 4px;
  width: 238px;
  margin-right: ${({ theme }) => theme.spacing(2)}px;
  padding: ${({ theme }) => theme.spacing(2)}px;
  height: 112px;

  ${({ selected }) =>
    selected
      ? css`
          box-shadow: ${({ theme }) => theme.shadows.blue1};
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

export const ChangePageButton = styled.button`
  &.slick-prev {
    left: 868px;
    top: -28px;
  }

  &.slick-next {
    right: 7px;
    top: -28px;
  }

  &.slick-next::before,
  &.slick-prev::before {
    content: '';
  }
`
