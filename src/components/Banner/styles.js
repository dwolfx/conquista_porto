import styled from 'styled-components'

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
  padding: ${props => (props.size === 'sm' ? `28px` : `0px 28px`)};
  position: relative;

  &:before {
    content: '';
    background-color: ${props => props.theme.colors.gray6};
    left: 0;
    height: 100%;
    opacity: ${props => (props.image ? 0.35 : 0)};
    position: absolute;
    top: 0%;
    width: 100%;
  }
`

export const BannerLabel = styled(Text).attrs({ type: 'captionUppercase' })`
  color: ${props => props.theme.colors.white};
`

export const BannerContent = styled.div`
  margin: auto;
`
