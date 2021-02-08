import styled from 'styled-components'
import { Container as ContainerCmp, Col as ColCmp } from 'styled-bootstrap-grid'
import TextCmp from 'components/Text'
import CardCmp from 'components/Card'
import ComparativeModalCmp from 'pages/TripInsurance/Creation/ComparativeModal'
import DataShower from 'pages/CreditCard/Creation/SummaryStep/DataShower'
import Button from 'components/Button'
import { Table } from 'components/Table/styles'

export const ContentWrapper = styled.div`
  background-color: ${props => props.theme.colors.gray1};
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: auto;
`

export const Container = styled(ContainerCmp)`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing(2)}px;

  @media ${({ theme }) => theme.mediaQueries.smUp} {
    padding: ${({ theme }) => `${theme.spacing(3)}px 0 ${theme.spacing(6)}px`};
  }
`

export const Col = styled(ColCmp)<{ noMargin?: boolean }>`
  padding: 0;
  &:first-of-type {
    margin-bottom: ${({ theme, noMargin }) =>
      noMargin ? 0 : theme.spacing(2)}px;
  }
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    &:first-of-type {
      margin-bottom: ${({ theme, noMargin }) =>
        noMargin ? 0 : theme.spacing(3)}px;
    }
  }
`

export const InformationWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing(2)}px;

  @media ${({ theme }) => theme.mediaQueries.mdUp} {
    padding-right: ${({ theme }) => theme.spacing(3)}px;
  }
  @media ${({ theme }) => theme.mediaQueries.lgUp} {
    padding: ${({ theme }) => `${theme.spacing(4)}px`};
  }
`

export const Text = styled(TextCmp)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

export const Card = styled(CardCmp)`
  padding: ${({ theme }) => theme.spacing(2)}px;
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    margin-bottom: ${({ theme }) => theme.spacing(3)}px;
  }
`

export const CardTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(2)}px;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

export const DataDisplayer = styled(DataShower)`
  padding: ${({ theme }) => theme.spacing(2)}px;
`

export const PlansContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media ${({ theme }) => theme.mediaQueries.lgUp} {
    flex-direction: row;
  }
`

export const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.gray3};
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing(2)}px;
`

export const FooterCol = styled(ColCmp)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0;
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    flex-direction: row;
  }
`

export const NextButton = styled(Button)`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;

  &:last-of-type {
    margin-bottom: 0px;
  }

  @media ${({ theme }) => theme.mediaQueries.smUp} {
    width: auto;
    margin-bottom: 0px;
    margin-right: ${({ theme }) => theme.spacing(2)}px;

    &:last-of-type {
      margin-right: 0px;
    }
  }
`

export const ComparativeModal = styled(ComparativeModalCmp)`
  ${Table} {
    &.sticky {
      .header {
        width: auto;
      }
    }
  }
`

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`
