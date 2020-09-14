import styled from 'styled-components'
import { Row } from 'styled-bootstrap-grid'

import Button from 'components/Button'
import TableComp from 'components/Table'
import Text from 'components/Text'

import { TheadText } from 'components/Table/styles'

import { themeColors } from 'styles/theme'

export const ContainerFunds = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 ${({ theme }) => theme.spacing(2)}px;

  @media ${props => props.theme.mediaQueries.sm} {
    flex-direction: column;
  }
`

export const Table = styled(TableComp)`
  .table {
    max-height: 353px;
    table-layout: auto;
  }

  ${TheadText} {
    font-weight: 600;
    font-size: 11px;
    line-height: 15px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.gray6};
  }
`

export const FundoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 22px;
  padding: 9px 14px 8px 20px;
  width: 100%;
`

export const FundoOutterWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

export const FundoNameWrapper = styled(Text)`
  text-align: left;
  max-width: 220px;
  font-weight: normal;
  white-space: pre-wrap;
`

export const SquareRiskContainer = styled.div`
  display: flex;
  margin: 0 ${({ theme }) => theme.spacing(3)}px;
`
const handleOpacitySquareRisk = ({
  disabled,
  selectedRisk,
}: ISquareRiskLevelProps) => {
  if (!selectedRisk || disabled) {
    return 0.2
  }
  return 1
}

interface ISquareRiskLevelProps {
  color: keyof typeof themeColors
  selectedRisk: boolean
  value: string
  disabled?: boolean
  isInteractive?: boolean
}

export const SquareRiskLevel = styled.div.attrs(() => ({
  role: 'button',
}))<ISquareRiskLevelProps>`
  width: 21px;
  height: 21px;
  margin-right: 4px;
  background-color: ${({ theme, color }) => theme.colors[color]};
  border-radius: 4px;
  transition: all 0.3s ease;
  opacity: ${handleOpacitySquareRisk};
  ${({ isInteractive, disabled }) =>
    isInteractive &&
    `
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
  `}

  &:last-child {
    margin-right: 0;
  }
`

export const TotalValuesRow = styled(Row)`
  padding: 0 ${({ theme }) => theme.spacing(2)}px;
  margin: ${({ theme }) => theme.spacing(2)}px 0;
  width: 100%;

  & > div {
    &:first-of-type {
      flex: 1;
    }
    &:nth-of-type(2) {
      width: 22%;
    }
    &:last-of-type {
      width: 21%;
    }
  }
`

export const TotalLine = styled(Row)`
  height: 20px;
`

export const EditButton = styled(Button)`
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
  margin-top: ${({ theme }) => theme.spacing(3)}px;
  width: 100%;
`

export const LabelRow = styled(Row)`
  min-width: 315px;
`
