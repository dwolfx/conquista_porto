import styled from 'styled-components'

import Text from 'components/Text'

export const BannerWrapper = styled.div`
  background-color: ${props => props.theme.colors.gray4};
  background-image: url(${props => !!props.image && props.image});
  background-position: center;
  background-size: cover;
  border-radius: 8px;
  display: flex;
  height: ${props => (props.size === 'sm' ? `208px` : `242px`)};
  overflow: hidden;
  padding: ${props => (props.size === 'sm' ? `28px` : `50px 28px`)};
  position: relative;

  &:before {
    content: '';
    background-color: ${props => props.theme.colors.gray6};
    left: 0;
    height: 100%;
    opacity: ${props => (props.image ? 0.4 : 0)};
    position: absolute;
    top: 0%;
    width: 100%;
  }
`

export const BannerLabel = styled(Text).attrs({ type: 'caption' })`
  color: ${props => props.theme.colors.white};
`

export const BannerContent = styled.div``
