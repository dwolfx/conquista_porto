import styled from 'styled-components'
import ButtonComponent from 'components/Button'

import Icon from 'components/IconExporter'
import Text from 'components/Text'
import Divisor from 'components/Divisor'

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
`

export const LogoWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const CloseIcon = styled(Icon).attrs(() => ({
  name: 'close',
}))`
  cursor: pointer;
  transition: all ease 0.3s;
  position: absolute;
  right: 12px;

  &:hover {
    fill: ${props => props.theme.colors.blue4};
  }
`

export const PreviousIcon = styled(Icon).attrs(() => ({
  name: 'arrowleft',
}))`
  cursor: pointer;
  transition: all ease 0.3s;
  position: absolute;

  &:hover {
    fill: ${props => props.theme.colors.blue4};
  }
`

export const HeaderWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
`

export const StepBarWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.grayblue1};
  height: 56px;
  display: flex;
  align-items: center;
`

export const ContentContainer = styled.div`
  max-width: 1282px;
  display: flex;
  flex-direction: column;
  z-index: 1;

  @media ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: column;
    padding: 0 ${({ theme }) => theme.spacing(3)}px;
  }
`

export const SimulationText = styled(Text)`
  margin-right: ${({ theme }) => theme.spacing(2)}px;
`

export const DarkBackground = styled.div`
  position: absolute;
  top: 0;
  z-index: 0;
  background-color: ${({ theme }) => theme.colors.grayblue1};
  height: 278px;
  width: 100%;
  display: flex;
`

export const BackgroundWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ContextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2)}px 0px;
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  margin: 0 auto;
`

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(2)}px 0px;

  @media ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: column;
    margin: 0 auto;
    align-items: flex-start;
    width: 607px;
    padding: ${({ theme }) => theme.spacing(4)}px 0px
      ${({ theme }) => theme.spacing(3)}px;
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: column;
    margin: 0 auto;
    align-items: flex-start;
    width: 332px;
  }
`

export const TitleWrapperColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(2)}px 0px;
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`

export const TitleWrapperCentralized = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(2)}px 0px;

  @media ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: column;
    margin: 0 auto;
    align-items: flex-start;
    width: 607px;
    padding: ${({ theme }) => theme.spacing(4)}px 0px
      ${({ theme }) => theme.spacing(3)}px;
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: column;
    margin: 0 auto;
    align-items: flex-start;
    width: 332px;
  }
`

export const Title = styled(Text)``

export const SwitchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: ${({ theme }) => theme.spacing(3)}px;
  }
`

export const SwitchText = styled(Text)`
  max-width: 285px;
`
export const CardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: column;
    align-items: center;
  }
`

export const DisclosureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${({ theme }) => theme.spacing(5)}px 0px;

  @media ${({ theme }) => theme.mediaQueries.md} {
    margin: ${({ theme }) => `${theme.spacing(7)}px 0px ${theme.spacing(5)}px`};
  }
`

export const Link = styled.a`
  color: ${({ theme }) => theme.colors.blue4};
`

export const Footer = styled.div`
  width: 100%;
  bottom: 0;
  margin-top: auto;
  border-top: 1px solid ${({ theme }) => theme.colors.gray3};
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing(2)}px};

  display: flex;
  justify-content: flex-end;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: column;
    justify-content: flex-start;

    button {
      width: 100%;

      &:first-of-type {
        margin-bottom: ${({ theme }) => theme.spacing(2)}px};
      }
    }
  }
`

export const Button = styled(ButtonComponent)`
  &:first-of-type {
    margin-right: ${({ theme }) => `${theme.spacing(2)}px`};
  }
`

export const Divider = styled(Divisor)`
  color: ${({ theme }) => theme.colors.gray5};
`
