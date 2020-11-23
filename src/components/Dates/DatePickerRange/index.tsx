import React from 'react'
import moment from 'moment'
import {
  DateRangePicker as DRP,
  FocusedInputShape,
  isInclusivelyBeforeDay,
} from 'react-dates'

import { ButtonNavPrev, ButtonNavNext } from '../styles'

import { verifyIsDayBlocked } from '../utils'

import { IRangeDates } from '../types'

import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'

import * as s from './styles'

/*
  Autor: Silvonei

  Exemplo de uso do DatePickerRange:

  <DatePickerRange
    numberOfMonths={2}
    idDatePickerRange="idDPR_Teste"
    rangeDates={rangeDates}
    focusedInput={focusedInput}
    onHandleFocusedInput={handleFocusedInput}
    onHandleSetRangeDates={handleRangeDates}
  />

*/

interface IDatePickerRange {
  idDatePickerRange: string
  numberOfMonths: number
  rangeDates: IRangeDates
  blockFutureDays?: boolean
  blockPastDays?: boolean
  focusedInput: FocusedInputShape | null
  isOpenInsideModal?: boolean
  daysToBlock?: moment.Moment[]
  onHandleFocusedInput: (res: 'startDate' | 'endDate' | null) => void
  onHandleSetRangeDates: (
    startDate: moment.Moment | null,
    endDate: moment.Moment | null
  ) => void
}

const DatePickerRange: React.FC<IDatePickerRange> = ({
  numberOfMonths,
  idDatePickerRange,
  isOpenInsideModal = false,
  rangeDates,
  focusedInput,
  daysToBlock,
  onHandleFocusedInput,
  onHandleSetRangeDates,
  blockFutureDays = false,
  blockPastDays = false,
}) => {
  moment.locale('pt-BR')

  return (
    <s.Container isOpenInsideModal={isOpenInsideModal}>
      <DRP
        /* Usar esta prop para tirar a borda dos inputs */
        noBorder
        /* Usar esta prop para manter o calendário de seleção aberto */
        keepOpenOnDateSelect
        /* Usar esta prop para fomatar a exibição dos dias da semana */
        weekDayFormat="ddd"
        /* Usar esta função para bloquear uma lista de datas: */
        isDayBlocked={day => verifyIsDayBlocked(day, daysToBlock)}
        /* Adiciona componente customizado para seta se navegação "anterior" */
        navPrev={<ButtonNavPrev />}
        /* Adiciona componente customizado para seta se navegação "próximo" */
        navNext={<ButtonNavNext />}
        /* Adiciona componente customizado para o ícone entre os inputs */
        customArrowIcon={<s.NoArrow />}
        /* Usar esta prop para informar um identificador único para a data inicial */
        startDateId={`${idDatePickerRange}_dateBegin`}
        /* Usar esta prop para informar uma data inicial */
        startDate={rangeDates?.dateBegin}
        /* Usar esta prop para informar um identificador único para a data final */
        endDateId={`${idDatePickerRange}_dateEnd`}
        /* Usar esta prop para informar uma data final */
        endDate={rangeDates?.dateEnd}
        /* Usar esta prop para informar onde deseja o foco */
        focusedInput={focusedInput}
        /* Usar esta prop para pegar os valores de data inicial e final selecionadas */
        onDatesChange={({ startDate, endDate }) =>
          onHandleSetRangeDates(startDate, endDate)
        }
        /* Usar esta prop para setar o focus nos inputs*/
        onFocusChange={res => onHandleFocusedInput(res)}
        /* Usar esta prop para informar no placeholder do input inicial um valor */
        startDatePlaceholderText="Data inicial"
        /* Usar esta prop para informar no placeholder do input final um valor */
        endDatePlaceholderText="Data final"
        /* Usar esta prop para formatar a data dos inputs */
        displayFormat="DD/MM/YYYY"
        /* Usar esta prop para desabilitar informações de teclas de atalho */
        hideKeyboardShortcutsPanel
        /* Usar esta prop para habilitar ou desabilitar seleção de datas passadas */
        isOutsideRange={day => {
          if (blockFutureDays) {
            return !isInclusivelyBeforeDay(day, moment())
          }
          if (blockPastDays) {
            return isInclusivelyBeforeDay(day, moment())
          }
          return false
        }}
        /* Usar esta prop para definir aparecer somente um mês no calendário */
        numberOfMonths={numberOfMonths}
      />
    </s.Container>
  )
}

export default DatePickerRange
