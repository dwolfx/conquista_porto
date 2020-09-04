import styled from 'styled-components'

import Icon from 'components/IconExporter'
import Text from 'components/Text'

interface IBannerWrapper {
  image?: string
}
export const BannerWrapper = styled.div<IBannerWrapper>`
  background-color: ${props => props.theme.colors.gray4};
  background-image: url(${props => !!props.image && props.image});
  padding: ${({ theme }) => `${theme.spacing(6)}px ${theme.spacing(4)}px`};
  background-position: center;
  background-size: cover;
  border-radius: 8px;
  display: flex;
  overflow: hidden;
  position: relative;

  &:before {
    content: '';
    background-color: ${props => props.theme.colors.gray6};
    left: 0;
    height: 100%;
    opacity: ${props => (props.image ? 0.56 : 0)};
    position: absolute;
    top: 0%;
    width: 100%;
  }
`

export const BannerTitle = styled(Text).attrs(() => ({
  type: 'heading3',
}))`
  color: ${props => props.theme.colors.white};
`

export const BannerContent = styled.div`
  width: 50%;
  z-index: 1;
  color: ${props => props.theme.colors.white};

  @media ${({ theme }) => theme.mediaQueries.md} {
    width: 100%;
  }
`

export const CloseButton = styled.div`
  position: absolute;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.gray2};
  width: 35px;
  height: 35px;
  border-radius: 50%;
  right: 28px;
  top: 0px;
  cursor: pointer;
`
export const CloseIcon = styled(Icon)`
  width: 16px;
  height: 16px;
`
