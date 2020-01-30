import styled from 'styled-components'
import { Row as RowSBG } from 'styled-bootstrap-grid'

import Text from 'components/Text'

export const BannerWrapper = styled.div`
  background-color: ${props => props.theme.colors.gray4};
  background-image: url(${props => !!props.image && props.image});
  background-position: center;
  background-size: cover;
  border-radius: 8px;
  display: flex;
  align-items: ${props => (props.size === 'sm' ? 'flex-start' : 'center')};
  height: ${props => (props.size === 'sm' ? `208px` : `242px`)};
  max-width: ${props => (props.size === 'sm' ? '665px' : '100%')};
  overflow: hidden;
  padding: ${props => (props.size === 'sm' ? `28px` : `0 28px`)};
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

  @media ${props => props.theme.mediaQueries.sm} {
    align-items: center;
    padding: 0 21px;
  }
`

export const BannerLabel = styled(Text).attrs(() => ({
  type: 'captionUppercase',
}))`
  color: ${props => props.theme.colors.white};
`

export const BannerContent = styled.div``

export const Row = styled(RowSBG)`
  justify-content: ${props => props.justify};
`
