import styled from 'styled-components'

import ButtonCmp from 'components/Button'
import CardUnstyled from 'components/Card'
import NewInput from 'components/NewInput'
import Link from 'components/Button/Link'

export const Container = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(3)}px;

  @media ${props => props.theme.mediaQueries.sm} {
    padding: ${({ theme }) => theme.spacing(3)}px 0;
  }
`

export const Card = styled(CardUnstyled)`
  height: 100%;
  position: relative;
  @media ${props => props.theme.mediaQueries.xs} {
    border-radius: 0;
    max-height: 100vh;
  }
`

export const ContainerSecuritySeal = styled.div`
  margin-top: ${({ theme }) => theme.spacing(3)}px;
`

export const ContainerResendTokenButtons = styled.div`
  display: flex;
  margin-top: ${({ theme }) => `${theme.spacing(3)}px`};
`

export const VirtualKeyboard = styled.div`
  display: flex;
  margin-top: ${({ theme }) => `${theme.spacing(3)}px`};
`

export const Key = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => `${theme.spacing(2)}px`};

  cursor: pointer;
  width: 70px;
  height: 70px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.colors.gray3};

  :hover {
    border-color: ${props => props.theme.colors.blue2};
    box-shadow: ${props => props.theme.shadows.blue1};
  }

  @media ${props => props.theme.mediaQueries.sm} {
    margin-right: ${({ theme }) => `${theme.spacing(1)}px`};
    width: 56px;
    height: 56px;

    :last-child {
      margin-right: 0;
    }
  }
`

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 ${({ theme }) => theme.spacing(2)}px;
  width: 100%;

  button {
    :first-child {
      margin-right: ${props => props.theme.spacing(2)}px;
    }
  }
  @media ${props => props.theme.mediaQueries.sm} {
    display: flex;
    padding: ${props => props.theme.spacing(2)}px 0;
    button {
      width: 50%;
    }
  }
`

export const InputStyled = styled(NewInput)`
  margin-top: ${props => props.theme.spacing(3)}px;
  width: 300px;
`

export const Button = styled(ButtonCmp)`
  min-width: 112px;
`

export const ContainerNewSignature = styled.div`
  display: flex;
  margin-top: ${props => props.theme.spacing(3)}px;
  @media ${props => props.theme.mediaQueries.sm} {
    flex-direction: column;
  }
`
export const ButtonNewSignature = styled(Link)`
  margin-left: ${props => props.theme.spacing(3)}px;
`

export const ButtonMobileNewSignature = styled(Button)`
  margin-top: ${props => props.theme.spacing(1)}px;
`

export const TextSpace = styled.div`
  margin-top: ${props => props.theme.spacing(2)}px;
`
