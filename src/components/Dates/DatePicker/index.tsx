import React from 'react'
import moment from 'moment'
import { SingleDatePicker as SDP } from 'react-dates'
import { ButtonNavPrev, ButtonNavNext } from '../styles'

/* Usar esta propriedade para bloquear uma lista de datas */
import { verifyIsDayBlocked } from '../utils'

import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'

import * as s from './styles'

/*
  Autor: Silvonei

  Exemplo de uso do DatePicker:

    <DatePicker
      dateItem={dateItem}
      focusedInput={focusedInputDate}
      daysToBlock={[
        moment('2020-09-21'),
        moment('2020-09-22'),
        moment('2020-09-23'),
      ]}
      onHandleFocusedInput={setFocusedInputDate}
      onHandleSetDateItem={handleSetDateItem}
    />

*/

interface IDatePicker {
  dateItem: moment.Moment | null
  focusedInput: boolean
  daysToBlock?: moment.Moment[]
  onHandleFocusedInput: (res: boolean) => void
  onHandleSetDateItem: (dateItem: moment.Moment | null) => void
}

const DatePicker: React.FC<IDatePicker> = ({
  dateItem,
  focusedInput,
  daysToBlock,
  onHandleFocusedInput,
  onHandleSetDateItem,
}) => {
  return (
    <s.Container>
      <SDP
        /* id do Datepicker */
        id="idDateItem"
        /* Prop usada para guardar o estado da data selecionada */
        date={dateItem}
        /* Evento que atualiza o estado da data selecionada */
        onDateChange={date => onHandleSetDateItem(date)}
        /* Controla o foco no input */
        focused={focusedInput}
        /* Altera o estado da prop que guarda o valor do foco */
        onFocusChange={({ focused }) => onHandleFocusedInput(focused)}
        /* Usar esta propriedade para bloquear uma lista de datas */
        isDayBlocked={day => verifyIsDayBlocked(day, daysToBlock)}
        /* Prop que irá aparecer como placeholder do input*/
        placeholder="Data"
        /* Usar esta prop para tirar a borda dos inputs */
        noBorder
        /* Usar esta prop para manter o calendário de seleção aberto */
        keepOpenOnDateSelect
        /* Usar esta prop para definir aparecer somente um mês no calendário */
        numberOfMonths={1}
        /* Usar esta prop para com valor false para habilitar seleção de datas passadas */
        isOutsideRange={() => false}
        /* Adiciona componente customizado para seta se navegação "anterior" */
        navPrev={<ButtonNavPrev />}
        /* Adiciona componente customizado para seta se navegação "próximo" */
        navNext={<ButtonNavNext />}
        /* Usar esta prop para fomatar a exibição dos dias da semana */
        weekDayFormat="ddd"
        /* Usar esta prop para formatar a data dos inputs */
        displayFormat="DD/MM/YYYY"
        /* Usar esta prop para desabilitar informações de teclas de atalho */
        hideKeyboardShortcutsPanel
      />
    </s.Container>
  )
}

export default DatePicker
