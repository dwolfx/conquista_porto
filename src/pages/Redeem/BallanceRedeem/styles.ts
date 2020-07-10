
import { Col } from 'styled-bootstrap-grid'
import styled from 'styled-components'
import ButtonComponent from 'components/Button'
import VerticalList from 'components/VerticalList'
import HorizontalList from 'components/HorizontalList';

export const RedeemFormContainer = styled(Col)`
  padding: 0 ${({ theme }) => theme.spacing(2)}px;
  margin: ${({ theme }) => theme.spacing(4)}px 0;
  @media ${props => props.theme.mediaQueries.xs} {
    padding: 21px ${props => `${props.theme.spacing(3)}px`} 0 ${props => `${props.theme.spacing(3)}px`};
    margin: ${({ theme }) => theme.spacing(3)}px 0;

    &:first-child {
      margin: 0;
    }
  }
`

export const HorizontalListStyled = styled(HorizontalList)`
  @media ${({ theme }) => theme.mediaQueries.xs} {
    padding: 0 7px;
    height: 28px;
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

  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin: 7px;
  }
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
  position: relative;
  background-color: ${({ theme }) => theme.colors.gray1};
  border-radius: 8px;
  margin: ${({ theme }) => theme.spacing(2)}px 0;
`

interface ICalculationOverlayProps {
  isOpen: boolean
}
export const CalculationOverlay = styled.div<ICalculationOverlayProps>`
  display: ${({ isOpen }) => isOpen ? 'flex' : 'none'};
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray1};
  opacity: 0.4;
`

export const InformationsWrapper = styled.div`
  display: block;
  padding: ${({ theme }) => theme.spacing(2)}px;
  margin: ${({ theme }) => `${theme.spacing(2)}px 0 ${theme.spacing(7)}px`};

  @media ${props => props.theme.mediaQueries.sm} {
    margin: 0;
    padding: 21px 14px;
    background-color: ${({ theme }) => theme.colors.gray1};
    width: 100%;
  }
`

export const ButtonStyled = styled(ButtonComponent)`
  padding: 10px 28px;
  margin-left: 21px;

  @media ${props => props.theme.mediaQueries.sm} {
    margin: 14px 0;
    width: 100%;
  }

`

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    display: block;
  }
`