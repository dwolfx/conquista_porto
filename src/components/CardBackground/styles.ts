import styled from 'styled-components'

import LoadingIcon from 'components/Loading'
import { rgba } from 'helpers'

interface CardBackground {
  image: string
}

interface CardWrapper {
  align: string
}

export const CardBackground = styled.div<CardBackground>`
  background-image: ${props =>
    props.image ? `url('${props.image}')` : props.theme.colors.gray4};
  background-position: center center;
  background-size: cover;
  height: 100%;
  transition: all ease 0.5s;
  width: 100%;
`

export const CardWrapper = styled.div<CardWrapper>`
  cursor: pointer;
  align-items: ${props => `flex-${props.align}`};
  border-radius: 8px;
  display: flex;
  height: 250px;
  overflow: hidden;
  position: relative;

  &:hover,
  &:focus {
    ${CardBackground} {
      transform: scale(1.2);
    }
  }

  @media ${props => props.theme.mediaQueries.lg} {
    height: 188px;
  }

  @media ${props => props.theme.mediaQueries.sm} {
    height: 127px;
  }
`

export const CardTitle = styled.div`
  background-color: ${props => rgba(props.theme.colors.gray6, 0.63)};
  display: flex;
  padding: ${props =>
    `${props.theme.spacing(1)}px ${props.theme.spacing(4)}px`};
  position: absolute;
  width: 100%;
`

export const IconWrapper = styled.div`
  height: ${props => props.theme.spacing(3)}px;

  svg {
    fill: ${props => props.theme.colors.white};
    height: 100%;
    margin-right: ${props => props.theme.spacing(2)}px;
  }
`

export const Loading = styled(LoadingIcon)`
  position: absolute;
  right: ${props => props.theme.spacing(3)}px;
`
