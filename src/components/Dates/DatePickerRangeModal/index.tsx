import React, { useState, useEffect } from 'react'
import { FocusedInputShape } from 'react-dates'
import { INTERVAL_DATE_TYPE, IRangeDates } from '../types'

import useMedia from 'hooks/useMedia'

import DatePickerRange from 'components/Dates/DatePickerRange'

import * as s from './styles'

/*
  Autor: Silvonei

  Exemplo de uso do DatePickerRangeModal

  <DatePickerRangeModal
    isOpen={isOpenDatePickerRangeModal}
    headerControlls={headerControlls}
    preSelectedRange={preSelectedRange}
    onChangeModalOpen={setIsOpenDatePickerRangeModal}
    onHandleApply={handleRangeDates}
  />

*/

interface IPreSelectedRange {
  dateBegin: moment.Moment | null
  dateEnd: moment.Moment | null
}

interface IProps {
  isOpen: boolean
  headerControlls?: React.ReactNode
  preSelectedRange?: IPreSelectedRange
  blockFutureDays?: boolean
  blockPastDays?: boolean
  onChangeModalOpen: (open: boolean) => void
  onHandleApply: (
    startDate: moment.Moment | null,
    endDate: moment.Moment | null
  ) => void
}

const DatePickerRangeModal: React.FC<IProps> = ({
  isOpen,
  headerControlls,
  preSelectedRange,
  onChangeModalOpen,
  onHandleApply,
  blockFutureDays = false,
  blockPastDays = false,
}) => {
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(
    'startDate'
  )
  const [rangeDates, setRangeDates] = useState<IRangeDates>({
    dateBegin: null,
    dateEnd: null,
    intervalDateType: INTERVAL_DATE_TYPE.MONTH,
  })
  const [numberOfMonths, setNumberOfMonths] = useState<number>(1)
  const isMobile = useMedia('sm')

  useEffect(() => {
    isMobile ? setNumberOfMonths(1) : setNumberOfMonths(2)
  }, [isMobile])

  useEffect(() => {
    if (
      preSelectedRange &&
      preSelectedRange.dateBegin &&
      preSelectedRange.dateEnd
    ) {
      setRangeDates({
        ...rangeDates,
        dateBegin: preSelectedRange?.dateBegin,
        dateEnd: preSelectedRange?.dateEnd,
      })
    }
    // eslint-disable-next-line
  }, [])

  const handleClearDates = () => {
    setRangeDates({
      ...rangeDates,
      dateBegin: null,
      dateEnd: null,
    })
    setFocusedInput('startDate')
  }

  const hasSelectedDatesValid = () => {
    return !!rangeDates.dateBegin || !!rangeDates.dateEnd
  }

  const handleFocusedInput = (res: 'startDate' | 'endDate' | null) => {
    if (!res) return
    setFocusedInput(res)
  }

  const handleRangeDates = (
    startDate: moment.Moment | null,
    endDate: moment.Moment | null
  ) => {
    setRangeDates({
      ...rangeDates,
      dateBegin: startDate,
      dateEnd: endDate,
    })
  }

  const handleCancelRangeDates = () => {
    handleClearDates()
    onChangeModalOpen(false)
  }

  const handleApplyRangeDates = () => {
    onHandleApply(rangeDates.dateBegin, rangeDates.dateEnd)
    onChangeModalOpen(false)
    handleClearDates()
  }

  return (
    <s.ModalStyled
      isOpen={isOpen}
      handleClose={() => onChangeModalOpen(false)}
      isHeaderComponent={false}
    >
      {isMobile ? (
        <s.RowHeaderControlls>
          {headerControlls ? headerControlls : null}
        </s.RowHeaderControlls>
      ) : null}
      <s.RowDatePickerRange>
        <s.DatePickerRangeWrapper>
          <DatePickerRange
            numberOfMonths={numberOfMonths}
            idDatePickerRange="idDPR_Modal"
            isOpenInsideModal
            blockFutureDays={blockFutureDays}
            blockPastDays={blockPastDays}
            rangeDates={rangeDates}
            focusedInput={focusedInput}
            onHandleFocusedInput={handleFocusedInput}
            onHandleSetRangeDates={handleRangeDates}
          />
          {!isMobile ? (
            <s.LinkClearDates
              noIcon
              onClick={handleClearDates}
              hasSelectedDate={hasSelectedDatesValid()}
              data-gtm-subname="modal datepickerrange"
              data-gtm-name="botao limpar datas"
              data-gtm-type="click"
              data-gtm-clicktype="button"
            >
              limpar
            </s.LinkClearDates>
          ) : null}
        </s.DatePickerRangeWrapper>
        {!isMobile ? (
          <s.CloseButton
            data-gtm-subname="modal datepickerrange"
            data-gtm-name="botao fechar"
            data-gtm-type="click"
            data-gtm-clicktype="button"
            onClick={() => onChangeModalOpen(false)}
          />
        ) : null}
      </s.RowDatePickerRange>
      <s.RowButtons>
        {isMobile ? (
          <s.ButtonClearDates
            outline
            onClick={handleClearDates}
            hasSelectedDate={hasSelectedDatesValid()}
            data-gtm-subname="modal datepickerrange"
            data-gtm-name="botao limpar datas"
            data-gtm-type="click"
            data-gtm-clicktype="button"
          >
            limpar
          </s.ButtonClearDates>
        ) : null}
        <s.ButtonStyled
          outline
          data-gtm-type="click"
          data-gtm-clicktype="button"
          data-gtm-name="selecao de periodo"
          data-gtm-subname="cancelar selecao de periodo"
          onClick={handleCancelRangeDates}
        >
          cancelar
        </s.ButtonStyled>
        <s.ButtonStyled
          data-gtm-type="click"
          data-gtm-clicktype="button"
          data-gtm-name="selecao de periodo"
          data-gtm-subname="aplicar selecao de periodo"
          onClick={handleApplyRangeDates}
        >
          aplicar
        </s.ButtonStyled>
      </s.RowButtons>
    </s.ModalStyled>
  )
}

export default DatePickerRangeModal
