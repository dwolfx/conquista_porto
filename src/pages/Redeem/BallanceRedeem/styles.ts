import { Col } from 'styled-bootstrap-grid';
import styled from 'styled-components'

import ButtonComponent from 'components/Button'
import CardComponent from 'components/Card'
import { CardBody } from 'components/Card/styles'
import Icon from 'components/IconExporter'
import Loading from 'components/Loading'
import Text from 'components/Text'

import VerticalList from 'components/VerticalList'

export const CardStyled = styled(CardComponent)`
  height: 100%;
  padding: ${({ theme }) => `${theme.spacing(5)}px ${theme.spacing(5)}px 0`};

  @media ${({ theme }) => theme.mediaQueries.xs} {
    border-radius: 0;
    padding: 0;
  }

  ${CardBody} {
    overflow-y: auto;

    @media ${({ theme }) => theme.mediaQueries.xs} {
      overflow: none;
    }
  }
`

// export const InputWrapper = styled(Col)`

// `

export const RedeemFormContainer = styled(Col)`
  padding: 0 14px;
  margin: 28px 0;
  @media ${props => props.theme.mediaQueries.xs} {
    padding: 0 ${props => `${props.theme.spacing(3)}px`};
    margin: ${({ theme }) => theme.spacing(3)}px 0;

    &:first-child {
      margin: 0;
    }
  }
`

export const BodyWrapper = styled.div`
  overflow: auto;
  @media ${({ theme }) => theme.mediaQueries.xs} {
    height: calc(100vh - 256px);
  }
`

export const ButtonsStepWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: ${({ theme }) => `0 ${theme.spacing(2)}px`};
  width: 100%;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    justify-content: center;
    position: 
  }
`

export const FixedBottom = styled.div`
  position: fixed;
  bottom: 0;
  padding: ${props => props.theme.spacing(2)}px;
  width: 100%;
  background-color: ${props => props.theme.colors.white};
  border-top: 1px solid ${props => props.theme.colors.gray3};
  z-index: 1;
`

export const ButtonsBallanceWrapper = styled.div`
  display: flex;
  margin: 21px 0 14px;
`

export const BalanceInfoContainer = styled.div`
  display: flex;
  align-items: center;
  // padding: 0 ${props => `${props.theme.spacing(3)}px`};
  height: ${props => `${props.theme.spacing(13)}px`};
  margin-bottom: ${props => `${props.theme.spacing(3)}px`};
`

export const ButtonStyled = styled(ButtonComponent)`
  @media ${({ theme }) => theme.mediaQueries.xs} {
    width: 100%;
  }

  & + & {
    margin-left: ${({ theme }) => theme.spacing(1)}px;
  }
`

export const IconRetry = styled(Icon).attrs(() => ({
  name: 'reload',
  color: 'blue4',
}))`
  cursor: pointer;
  margin: 0 0 0 ${({ theme }) => theme.spacing(2)}px !important;
  height: ${({ theme }) => theme.spacing(3)}px;
  width: ${({ theme }) => theme.spacing(3)}px;
`

export const LoadingSpinner = styled(Loading)`
  margin: 0 0 0 ${({ theme }) => theme.spacing(2)}px !important;
  height: ${({ theme }) => theme.spacing(4)}px;
  width: ${({ theme }) => theme.spacing(4)}px;
`
export const VerticalListStyled = styled(VerticalList)`
  width: auto;
  margin-right: ${props => props.theme.spacing(6)}px;
`

export const SimulationWrapper = styled.div`
  margin-top: 14px;
  padding: 14px;
`

export const CalculationWrapper = styled.div`
  display: block;
  background-color: ${({ theme }) => theme.colors.gray1};
  border-radius: 8px;
  margin: 14px 0;
  padding: 14px;

  // @media ${({ theme }) => theme.mediaQueries.lg} {
  //   margin-left: ${({ theme }) => theme.spacing(4)}px;
  // }

  // @media ${({ theme }) => theme.mediaQueries.xs} {
  //   margin: 0 ${({ theme }) => theme.spacing(3)}px
  //     ${({ theme }) => theme.spacing(4)}px;
  // }
`

export const InformationsWrapper = styled.div`
  display: block;
  padding: 14px;
  margin: 14px 0 35px;
`