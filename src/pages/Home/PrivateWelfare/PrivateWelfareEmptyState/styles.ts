import styled from 'styled-components'
import Button from 'components/Button'
import { rgba } from 'helpers'
import Text from 'components/Text'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  @media ${props => props.theme.mediaQueries.lgUp} {
    height: auto;
  }
`

export const ImageWrapper = styled.div`
  border-radius: 8px;
  height: 184px;
  margin-top: 14px;
  margin-bottom: 21px;
  overflow: hidden;
  position: relative;

  /* Vertical Tablet = 736px Up */
  @media ${props => props.theme.mediaQueries.smUp} {
    height: 171px;
  }

  /* Desktop = 1280px Up */
  @media ${props => props.theme.mediaQueries.lgUp} {
    height: 231px;
  }

  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
`

export const SliderCaption = styled.div`
  bottom: 0;
  background-color: ${props => rgba(props.theme.colors.gray6, 0.63)};
  padding-left: 14px;
  position: absolute;
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;

  p {
    color: ${props => props.theme.colors.white};
  }
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 14px 14px;

  @media ${props => props.theme.mediaQueries.lgUp} {
    height: 168px;
  }

  p:last-of-type {
    color: ${props => props.theme.colors.gray5};
    flex: 1;
  }
`

export const SliderBoxButton = styled(Button)`
  width: 100%;
`

export const Title = styled(Text).attrs(() => ({
  type: 'title',
  bold: true,
}))`
  padding-bottom: ${({ theme }) => `${theme.spacing(1)}px`};
`

export const Description = styled(Text).attrs(() => ({
  bold: true,
}))`
  padding-bottom: ${({ theme }) => `${theme.spacing(2)}px`};
`
