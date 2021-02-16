import styled, { css } from 'styled-components'
import DataShower from 'pages/CreditCard/Creation/SummaryStep/DataShower'
import SelectComponent from 'components/Inputs/Select'
import NewInput from 'components/NewInput'

const spacePlusError = css`
  &&& {
    margin-bottom: ${({ theme }) => theme.spacing(7)}px;

    div {
      margin-bottom: ${({ theme }) => theme.spacing(2)}px;
    }

    span {
      margin-bottom: 0;
      margin-top: 0;
    }
  }
`

export const DataDisplay = styled(DataShower)`
  padding-left: ${({ theme }) => theme.spacing(2)}px;
`
export const DelimiterWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media ${({ theme }) => theme.mediaQueries.smUp} {
    width: 630px;
  }
`

export const DelimiterInputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  div {
    &:first-child {
      margin-bottom: ${({ theme }) => theme.spacing(4)}px;
    }

    &:last-child {
      margin-bottom: ${({ theme }) => theme.spacing(2)}px;

      @media ${({ theme }) => theme.mediaQueries.sm} {
        margin-bottom: ${({ theme }) => theme.spacing(4)}px;
      }
    }
  }

  @media ${({ theme }) => theme.mediaQueries.smUp} {
    width: 630px;
  }
`

export const Select = styled(SelectComponent)`
  margin: ${({ theme }) =>
    `${theme.spacing(4)}px 0 ${theme.spacing(4)}px ${theme.spacing(2)}`}px;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    margin: ${({ theme }) => `${theme.spacing(4)}px ${theme.spacing(2)}`}px;
  }
`

export const InputPersonalData = styled(NewInput)`
  margin: ${({ theme }) => `0 ${theme.spacing(2)}`}px;
  ${({ error }) => error && spacePlusError}
`
