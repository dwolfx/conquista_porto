import styled from 'styled-components'

import { Container as ContainerCmp } from 'styled-bootstrap-grid'

import TextCmp from 'components/Text'
import DivisorCmp from 'components/Divisor'
import ButtonCmp from 'components/Button'
import LoadingCmp from 'components/Loading'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  height: auto;
  padding-bottom: ${({ theme }) => theme.spacing(9)}px;
  justify-content: center;

  @media ${({ theme }) => theme.mediaQueries.md} {
    min-height: 0;
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    padding-bottom: ${({ theme }) => theme.spacing(18)}px;
  }
`

export const ContextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 56px;
  padding: ${({ theme }) => theme.spacing(2)}px
    ${({ theme }) => theme.spacing(4)}px 0;

  @media ${({ theme }) => theme.mediaQueries.md} {
    align-items: flex-start;
  }
`
export const SimulationText = styled(TextCmp)`
  margin: 0 ${({ theme }) => theme.spacing(2)}px
    ${({ theme }) => theme.spacing(2)}px 0;
`

export const Text = styled(TextCmp)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

interface ITitleWrapper {
  cardsQuantity: number
}

export const TitleWrapper = styled.div<ITitleWrapper>`
  display: flex;
  width: 816px;


  ${({ cardsQuantity, theme }) =>
    cardsQuantity < 3
      ? `

    @media ${theme.mediaQueries.lgUp} {
      width: 848px;
    }  
    @media ${theme.mediaQueries.lg} {
      flex-direction: column;
      align-items: flex-start;
    }`
      : `@media ${theme.mediaQueries.lgUp} {
          width: 1280px; 
        }
      flex-direction: row;
      align-items: center;
    `}

  justify-content: ${({ cardsQuantity }) =>
    cardsQuantity === 1 ? `center` : `space-between`};

  padding: ${({ theme }) => `${theme.spacing(4)}px 0px ${theme.spacing(3)}px`};
  
  @media ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: column;
    align-items: flex-start;
    width: 607px;
    padding: ${({ theme }) => theme.spacing(3)}px 0px
      ${({ theme }) => theme.spacing(3)}px;
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: column;
    margin: 0 auto;
    align-items: flex-start;
    width: 332px;
    padding: ${({ theme }) => theme.spacing(3)}px 0 0 0;
  }
`

export const Title = styled(TextCmp)`
  @media ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: ${({ theme }) => theme.spacing(3)}px;
  }
`

export const BackgroundWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
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

export const SmallDarkBackground = styled.div`
  position: absolute;
  top: 0;
  z-index: 0;
  background-color: ${({ theme }) => theme.colors.grayblue1};
  height: 56px;
  width: 100%;
  display: flex;
`

export const ContentContainer = styled(ContainerCmp)`
  padding-left: 0;
  padding-right: 0;
  height: calc(100vh - 135px);
  display: flex;
  flex-direction: column;
  z-index: 1;

  @media ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: column;
    height: calc(100vh - 198px);
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    padding: 0 ${({ theme }) => theme.spacing(2)}px;
  }
`

export const ContentSchemeContainer = styled(ContainerCmp)`
  padding-left: 0;
  padding-right: 0;
  display: flex;
  flex-direction: column;
  z-index: 1;

  @media ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: column;
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    padding: 0 ${({ theme }) => theme.spacing(2)}px;
  }
`

export const Divider = styled(DivisorCmp)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray5};
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  margin: 0 auto;

  @media ${({ theme }) => theme.mediaQueries.md} {
    align-items: flex-start;
  }
`

interface ICardsWrapper {
  cardsQuantity: number
}

export const CardsWrapper = styled.div<ICardsWrapper>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  padding-bottom: ${({ theme }) => theme.spacing(3)}px;

  ${({ cardsQuantity }) => cardsQuantity > 3 && `flex-wrap: wrap;`}

  @media ${({ theme }) => theme.mediaQueries.lgUp}{
    ${({ cardsQuantity }) =>
      cardsQuantity > 3 &&
      `align-content: flex-start; justify-content: flex-start`}
  }

  @media ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    align-items: center;
    width: 730px;
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    flex-direction: column;
    align-items: center;
    width: 332px;
  }
`

export const Link = styled.a`
  color: ${({ theme }) => theme.colors.blue4};
`

export const Footer = styled.div`
  position: fixed;
  z-index: 1;
  width: 100%;
  bottom: 0;
  margin-top: auto;
  border-top: 1px solid ${({ theme }) => theme.colors.gray3};
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing(2)}px;

  display: flex;
  justify-content: flex-end;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: column;
    justify-content: flex-start;

    button {
      width: 100%;

      &:first-of-type {
        margin-bottom: ${({ theme }) => theme.spacing(2)}px;
      }
    }
  }
`

export const Button = styled(ButtonCmp)`
  &:first-of-type {
    margin-right: ${({ theme }) => `${theme.spacing(2)}px`};
  }
`

export const TryAgainButton = styled(ButtonCmp)`
  width: 192px;
  margin-top: ${({ theme }) => `${theme.spacing(2)}px`};
`

export const ErrorState = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 136px);
  width: 434px;
  align-self: center;
  text-align: center;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    width: 318px;
  }
`

export const Loading = styled(LoadingCmp)``

export const LoadingContainer = styled.div`
  max-width: 428px;
  margin: auto;
  display: flex;
  min-height: calc(100vh - 136px);
  align-self: center;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    width: 304px;
  }
`

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    flex-direction: column;
    width: 100%;
  }
`

export const ExitButton = styled(ButtonCmp)`
  width: 98px;
  margin-right: ${({ theme }) => theme.spacing(2)}px;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    width: 100%;
    margin: 0 0 ${({ theme }) => theme.spacing(2)}px 0;
  }
`

export const SimulateAgainButton = styled(ButtonCmp)`
  width: 205px;

  @media ${({ theme }) => theme.mediaQueries.md} {
    width: 100%;
  }
`
