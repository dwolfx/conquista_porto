import styled from 'styled-components'
import { Col, Container, Row } from 'styled-bootstrap-grid'
import Text from 'components/Text'
import Button from 'components/Button'

export const ContentContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) =>
    `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(11)}`}px;
  align-items: center;
  @media ${({ theme }) => theme.mediaQueries.lgUp} {
    flex-direction: row;
    align-items: flex-start;
  }
`

export const Column = styled(Col)``

export const RowContent = styled(Row)``

export const FooterContent = styled(Container)``

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media ${({ theme }) => theme.mediaQueries.lgUp} {
    margin-right: ${({ theme }) => theme.spacing(4)}px;
  }
`

export const TitleText = styled(Text)`
  padding: ${({ theme }) => theme.spacing(2)}px;
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    text-align: center;
    &:last-child {
      margin-bottom: ${({ theme }) => theme.spacing(4)}px;
    }
  }
  @media ${({ theme }) => theme.mediaQueries.lgUp} {
    text-align: left;
  }
`

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing(2)}px;
  justify-content: flex-end;
  position: fixed;
  bottom: 0;
  width: 100vw;
  border-top: 1px solid ${({ theme }) => theme.colors.gray3};
`

export const ButtonAlign = styled.div`
  min-width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-right: ${({ theme }) => theme.spacing(3)}px;

  @media ${({ theme }) => theme.mediaQueries.lg} {
    padding-right: ${({ theme }) => theme.spacing(2)}px;
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: 0;
  }
`

export const NextButton = styled(Button)`
  width: 100%;
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    width: 133px;
  }
`
