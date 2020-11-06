import styled from 'styled-components'
import { Col as ColComponent, Row as RowComponent } from 'styled-bootstrap-grid'

import ButtonComponent from 'components/Button'
import DivisorComponent from 'components/Divisor'
import Text from 'components/Text'
import CardComponent from 'components/Card'
import { CardBody } from 'components/Card/styles'

export const GridRow = styled(RowComponent)`
  justify-content: center;
  height: 100%;
`

export const GridCol = styled(ColComponent)`
  height: 100%;
`

export const Title = styled(Text).attrs(() => ({
  type: 'heading4',
  color: 'gray6',
}))`
  margin: ${({ theme }) => `${theme.spacing(2)}px 0 ${theme.spacing(4)}px`};
  text-align: center;
  width: 100%;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    margin: ${({ theme }) => `${theme.spacing(3)}px 0 ${theme.spacing(5)}px`};
  }
`

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  margin-top: ${({ theme }) => theme.spacing(4)}px;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding: ${({ theme }) => `0 ${theme.spacing(3)}px `};
  }
`

export const Label = styled(Text).attrs(() => ({
  type: 'captionUppercase',
  bold: true,
  color: 'gray5',
}))``

export const Value = styled(Text).attrs(() => ({
  type: 'headline',
  bold: true,
  color: 'gray6',
}))``

export const Divisor = styled(DivisorComponent)`
  margin: ${({ theme }) => `${theme.spacing(1)}px 0`};
`

export const Button = styled(ButtonComponent)`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(4)}px;
  & + & {
    margin-bottom: ${({ theme }) => theme.spacing(3)}px;
  }
`

export const FooterText = styled(Text).attrs(() => ({
  type: 'body',
  bold: true,
  color: 'gray5',
}))`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing(3)}px;
`

export const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 308px;
  width: 100%;
`
export const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: auto;
  margin: ${({ theme }) => `0 ${theme.spacing(5)}px`};
`

export const ErrorText = styled(Text).attrs(() => ({
  type: 'headline',
  color: 'magenta2',
}))`
  margin-bottom: ${({ theme }) => `${theme.spacing(2)}px`};
  text-align: center;
`

export const CenterContentCardWrapper = styled.div`
  display: flex;
  width: 458px;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    width: 100%;
  }
`

export const TextTitleNoOffer = styled(Text).attrs(() => ({
  type: 'headline',
  bold: true,
  color: 'gray6',
}))`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

export const TextBodyNoOffer = styled(Text).attrs(() => ({
  type: 'body',
  bold: true,
  color: 'gray5',
}))``

export const FullHeightRow = styled(RowComponent)`
  height: calc(90vh - 142px);
  margin: ${({ theme }) => `${theme.spacing(2)}px 0`};

  @media ${({ theme }) => theme.mediaQueries.xs} {
    height: calc(90vh - 155px);
  }
`

export const IconWrapper = styled.div`
  margin: ${({ theme }) => `0 ${theme.spacing(3)}px`};
`

export const CenterContentCard = styled(CardComponent)`
  height: 100%;
  align-items: center;
  justify-content: center;

  ${CardBody} {
    overflow: visible;
    align-items: center;
    justify-content: center;

    @media ${({ theme }) => theme.mediaQueries.xs} {
      padding: ${({ theme }) => theme.spacing(2)}px;
    }
  }
`

export const ButtonPrimary = styled(ButtonComponent).attrs(() => ({
  color: 'primary',
}))`
  @media ${({ theme }) => theme.mediaQueries.xs} {
    width: 100%;
  }
`

export const Footer = styled.div`
  position: fixed;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 42px;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 63px;
  background-color: white;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    padding: ${({ theme }) => `0 ${theme.spacing(2)}px`};
  }
`
