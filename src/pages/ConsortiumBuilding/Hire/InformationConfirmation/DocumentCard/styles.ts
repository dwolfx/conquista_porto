import styled, { css } from 'styled-components'
import SelectComponent from 'components/Inputs/Select'
import { Col, Row } from 'styled-bootstrap-grid'
import NewInput from 'components/NewInput'
import Text from 'components/Text'
import Radio from 'components/Inputs/Radio'

const spacePlusError = css`
  &&& {
    margin-bottom: ${({ theme }) => theme.spacing(5)}px;

    @media ${({ theme }) => theme.mediaQueries.sm} {
      margin-bottom: ${({ theme }) => theme.spacing(7)}px;
    }

    div {
      margin-bottom: ${({ theme }) => theme.spacing(2)}px;
    }

    span {
      margin-bottom: 0;
      margin-top: 0;
    }
  }
`

export const RowDocument = styled(Row)`
  margin: 0;
  padding-left: ${({ theme }) => theme.spacing(2)}px;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const ColDocument = styled(Col)`
  padding: 0;
`

export const WrapperDocument = styled.div`
  position: relative;
`

export const DelimiterWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media ${({ theme }) => theme.mediaQueries.smUp} {
    width: 234px;
  }
`

export const FormDocumentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing(4)}px;
  margin-left: ${({ theme }) => theme.spacing(2)}px;
  max-width: 368px;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 0;

    & > div {
      margin-bottom: ${({ theme }) => theme.spacing(4)}px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`

export const Select = styled(SelectComponent)`
  margin-top: ${({ theme }) => theme.spacing(2)}px;
  margin-bottom: ${({ theme }) => theme.spacing(4)}px;
`

export const InputDocument = styled(NewInput)`
  margin: ${({ theme }) =>
    `${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(2)}`}px;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    margin: 0;
  }

  ${({ error }) => error && spacePlusError}

  span {
    ${({ theme }) => theme.fontTypes.body};
  }
`

export const TextDocument = styled(Text)`
  position: absolute;
  top: 14px;
  right: -18px;
  ${({ theme }) => theme.fontTypes.caption};
  color: ${({ theme }) => theme.colors.gray5};
  width: 140px;
  height: 80px;
`

export const RadioDocumentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing(3)}px;
  margin-bottom: ${({ theme }) => theme.spacing(4)}px;
  padding-left: ${({ theme }) => theme.spacing(2)}px;
`

export const LabelRadioDocument = styled(Text).attrs(() => ({
  type: 'headline',
  bold: true,
}))``

export const RadioOptionsDocumentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: ${({ theme }) => theme.spacing(4)}px;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  height: 30px;

  & > div {
    width: 100%;
    display: flex;
    flex-direction: initial;
    align-items: center;
    justify-content: flex-start;
  }

  & label {
    margin-right: ${({ theme }) => theme.spacing(4)}px;
  }

  @media ${({ theme }) => theme.mediaQueries.smUp} {
    margin-top: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const RadioDocument = styled(Radio)``

export const WrapperForeignResidenceForm = styled.div`
  max-width: 630px;
`

export const RowForeignResidenceDocument = styled(Row)`
  margin: 0;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const ColForeignResidenceDocument = styled(Col)`
  padding: 0;
`

export const InputForeignResidenceDocument = styled(NewInput)`
  margin-right: ${({ theme }) => theme.spacing(2)}px;
  margin-bottom: ${({ theme }) => theme.spacing(4)}px;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    margin-right: 0;
  }

  ${({ error }) =>
    error &&
    css`
      margin-bottom: ${({ theme }) => theme.spacing(7)}px;
    `}

  span {
    ${({ theme }) => theme.fontTypes.body};
  }
`

export const SelectForeignResidenceDocument = styled(SelectComponent)`
  margin-left: ${({ theme }) => theme.spacing(2)}px;
  margin-bottom: ${({ theme }) => theme.spacing(4)}px;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 0;
  }
`

export const SelectCountryIssuancePassportDocument = styled(SelectComponent)``
