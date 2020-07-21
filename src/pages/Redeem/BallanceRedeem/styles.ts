import { Col } from 'styled-bootstrap-grid'
import styled from 'styled-components'

import VerticalList from 'components/VerticalList'

export const RedeemFormContainer = styled(Col)`
  padding: 0 ${({ theme }) => theme.spacing(2)}px;
  margin: ${({ theme }) => theme.spacing(4)}px 0;
  @media ${props => props.theme.mediaQueries.xs} {
    padding: 0 ${props => `${props.theme.spacing(3)}px`};
    margin: ${({ theme }) => theme.spacing(3)}px 0;

    &:first-child {
      margin: 0;
    }
  }
`

export const ButtonsBallanceWrapper = styled.div`
  display: flex;
  margin: ${({ theme }) => `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`};
`

export const BalanceInfoContainer = styled.div`
  display: flex;
  align-items: center;
  height: ${props => `${props.theme.spacing(13)}px`};
  margin-bottom: ${props => `${props.theme.spacing(3)}px`};
`

export const SimulationWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing(2)}px;
  padding: ${({ theme }) => theme.spacing(2)}px;
`

export const VerticalListStyled = styled(VerticalList)`
  width: auto;
  margin-right: ${props => props.theme.spacing(6)}px;
`

export const CalculationWrapper = styled.div`
  display: block;
  background-color: ${({ theme }) => theme.colors.gray1};
  border-radius: 8px;
  margin: ${({ theme }) => theme.spacing(2)}px 0;
  padding: ${({ theme }) => theme.spacing(2)}px;
`

export const InformationsWrapper = styled.div`
  display: block;
  padding: ${({ theme }) => theme.spacing(2)}px;
  margin: ${({ theme }) => `${theme.spacing(2)}px 0 ${theme.spacing(7)}px`};
`
