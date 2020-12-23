import styled from 'styled-components'
import { Col } from 'styled-bootstrap-grid'

import ButtonCmp from 'components/Button'
import InputCmp from 'components/NewInput'
import SelectCmp from 'components/Inputs/Select'
import TextCmp from 'components/Text'
import RadioButtonCmp from 'components/Inputs/Radio/New'
import DivisorCmp from 'components/Divisor'
import ModalCmp from 'components/Modal/ModalNew'
import WarningFlagCmp from '../../../commons/WarningFlag'
import { WarningText } from '../../../commons/WarningFlag/styles'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  padding: 10px 14px 0 14px;
`

export const Content = styled.div`
  margin-top: 28px;
  width: 100%;
`


export const ButtonSubmit = styled(ButtonCmp)`
  width: 100%;
`

export const Input = styled(InputCmp)`
  margin-bottom: ${({ error, theme }) => !!error && `${theme.spacing(5)}px`};
  width: 100%;
`
export const ColInput = styled(Col as any)<{ error: boolean }>`
  padding: 0;
  margin-bottom: ${({ error, theme }) =>
    error ? '0' : `${theme.spacing(4)}px`};

  &:last-of-type {
    margin-bottom: ${({ error, theme }) =>
      error ? `-${theme.spacing(3)}px` : `${theme.spacing(1.5)}px`};
  }
`

export const Select = styled(SelectCmp)``

export const Text = styled(TextCmp)`
  margin-bottom: ${({ theme }) => `${theme.spacing(4)}px`};
`

export const Divisor = styled(DivisorCmp)`
  margin: ${({ theme }) => `${theme.spacing(4)}px 0 ${theme.spacing(4)}px`};
`

export const WarningFlag = styled(WarningFlagCmp)`
  max-width: 304px !important;
  ${WarningText} {
    max-width: 231px !important;
  }
`

export const RadioOptionsWrapper = styled.div<{ flexDirection?: string }>`
  display: flex;
  flex-direction: ${props => props.flexDirection};
  /* margin-top: ${({ theme }) => theme.spacing(4)}px; */
  /* margin-bottom: ${({ theme }) => theme.spacing(4)}px; */

  @media ${({ theme }) => theme.mediaQueries.smUp} {
    margin-top: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const Radio = styled(RadioButtonCmp)`
  margin-right: ${({ theme }) => theme.spacing(4)}px;
  &:first-of-type {
    margin-right: ${({ theme }) => theme.spacing(4)}px;
  }
`

export const Modal = styled(ModalCmp)``