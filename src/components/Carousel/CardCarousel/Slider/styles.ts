import styled from 'styled-components'

import IconButton from 'components/Button/Icon'

export const ButtonVertical = styled(IconButton)`
  border-radius: 4px;
  margin-right: 14px;
  width: 49px !important;
  height: 112px;
`

export const ContentContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  display: flex;
  margin-top: ${({ theme }) => theme.spacing(5)}px;
`

const ChangePageButton = styled(IconButton).attrs(() => ({
  size: 'small',
  isLoading: false,
}))`
  &.slick-prev {
    left: 804px;
    top: -28px;
  }

  &.slick-next {
    right: 0;
    top: -28px;
  }

  &.slick-next::before,
  &.slick-prev::before {
    content: '';
  }
`
export const NextButton = styled(ChangePageButton).attrs(() => ({
  icon: 'arrowright',
}))``

export const PrevButton = styled(ChangePageButton).attrs(() => ({
  icon: 'arrowleft',
}))``
