import styled from 'styled-components'
import Text from 'components/Text'
import {
  BannerWrapper,
  BannerContent,
  BannerTitle,
} from '../styles'

interface IBannerTipWrapper {
  height: string
}
export const BannerTipWrapper = styled(BannerWrapper)<IBannerTipWrapper>`
  height: ${({ height }) => height};
  align-items: center;
`

export const BannerTipContent = styled(BannerContent)`
  width: 100%;
`
export const BannerTipTitle = styled(BannerTitle)`
  margin-bottom: ${({ theme }) => `${theme.spacing(1)}px`};
`

export const BannerTipCaption = styled(Text).attrs(() => ({
  type: 'captionUppercase',
  bold: true
}))`
  margin-bottom: ${({ theme }) => `${theme.spacing(1)}px`};
`
