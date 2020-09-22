import styled from 'styled-components'

import CardComponent from 'components/Card'
import ButtonComponent from 'components/Button'

import { rgba } from 'helpers'

export const Card = styled(CardComponent)`
  height: 490px;
  margin-bottom: ${({ theme }) => `${theme.spacing(2)}px`};

  /* Vertical Tablet = 736px Up */
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    height: 458px;
  }

  /* Desktop = 1280px Up */
  @media ${({ theme }) => theme.mediaQueries.lgUp} {
    height: 518px;
  }
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const ImageWrapper = styled.div`
  border-radius: 8px;
  height: 231px;
  margin-top: ${({ theme }) => `${theme.spacing(2)}px`};
  margin-bottom: ${({ theme }) => `${theme.spacing(3)}px`};
  overflow: hidden;
  position: relative;
  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
`

export const Caption = styled.div`
  bottom: 0;
  background-color: ${props => rgba(props.theme.colors.gray6, 0.63)};
  padding-left: ${({ theme }) => `${theme.spacing(2)}px`};
  position: absolute;
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;

  p {
    color: ${props => props.theme.colors.white};
  }
`

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${({ theme }) => `0 ${theme.spacing(2)}px ${theme.spacing(2)}px`};

  p:last-of-type {
    color: ${props => props.theme.colors.gray5};
    flex: 1;
  }
`

export const Button = styled(ButtonComponent)`
  width: 100%;
`
