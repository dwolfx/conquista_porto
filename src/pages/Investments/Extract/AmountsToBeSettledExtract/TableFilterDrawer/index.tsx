import React, { useState, useEffect, useContext } from 'react'
import { ThemeContext } from 'styled-components'
import 'styled-components/macro'
import moment from 'moment'

import LogoConquistaBeta from 'assets/images/logoConquistaBeta.png'
import DatePickerRange from 'components/Dates/DatePickerRange'
import Drawer from 'components/Drawer'
import Divisor from 'components/Divisor'
import Text from 'components/Text'
import ButtonTag from 'components/Button/Tag'
import ButtonLink from 'components/Button/Link'
import { INTERVAL_DATE_TYPE } from 'components/Dates/types'

import { INTERVAL_SELECT_OPTIONS } from '../../constants'
import { IFilter, IInterval, ISelectInterval } from '../types'

import * as s from './styles'

interface IProps {
  isOpen: boolean
  onHandleClose: () => void
  filters: IFilter
  handleFilters: (newFilters: IFilter) => void
  interval: IInterval
  handleInterval: (newInterval: IInterval) => void
  selectedInterval: ISelectInterval
  handleSelectInterval: (newSelectInterval: ISelectInterval) => void
  handleClearFilters: () => void
}
const TableFilterDrawer = ({
  isOpen,
  onHandleClose,
  filters,
  handleFilters,
  interval,
  handleInterval,
  selectedInterval,
  handleClearFilters,
  handleSelectInterval,
}: IProps) => {
  const themeContext = useContext(ThemeContext)
  // Datepicker states
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [initialDate, setInitialDate] = useState<moment.Moment | null>(null)
  const [finalDate, setFinalDate] = useState<moment.Moment | null>(null)
  const [focusedInput, setFocusedInput] = useState(null)

  const [newFilters, setNewFilters] = useState<IFilter>({
    application: false,
    redeem: false,
  })
  const [newInterval, setNewInterval] = useState<IInterval>({
    startDate: '',
    endDate: '',
  })

  useEffect(() => {
    if (selectedInterval.id === 3) {
      setInitialDate(moment(interval.startDate))
      setFinalDate(moment(interval.endDate))
    } else {
      setInitialDate(null)
      setFinalDate(null)
    }
  }, [selectedInterval, interval])

  useEffect(() => {
    setNewFilters({ ...filters })
  }, [filters])

  useEffect(() => {
    setNewInterval({ ...interval })
  }, [interval])

  const clearFilters = () => {
    handleClearFilters()
    changeInterval(INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION)
  }

  const onHandleRangeFocused = (focus: any) => {
    setFocusedInput(focus)
  }

  const changeInterval = (interval: ISelectInterval) => {
    setIsDatePickerOpen(false)
    setFinalDate(null)
    setInitialDate(null)
    handleSelectInterval(interval)
    setNewInterval({
      startDate: moment()
        .subtract(interval.value, 'days')
        .format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
    })
  }

  const applyFilters = () => {
    handleFilters({ ...newFilters })
    handleInterval({ ...newInterval })
    onHandleClose()
  }

  const DrawerHeader = (handleCloseFilters: () => void) => {
    return (
      <s.FilterDrawerHeader>
        <s.PrevButton
          data-gtm-subname="drawer filtros"
          data-gtm-name="botao fechar drawer filtros"
          data-gtm-type="click"
          data-gtm-clicktype="button"
          role="button"
          name="arrowleft"
          color="gray4"
          width={28}
          height={28}
          onClick={() => handleCloseFilters()}
        />
        <s.HeaderColTitle>
          <img src={LogoConquistaBeta} alt="Logo Conquista Beta" />
        </s.HeaderColTitle>
        <s.CloseButton
          data-gtm-subname="drawer close"
          data-gtm-name="botao fechar drawer filtros"
          data-gtm-type="click"
          data-gtm-clicktype="button"
          role="button"
          name="close"
          color="gray4"
          width={28}
          height={28}
          onClick={() => handleCloseFilters()}
        />
      </s.FilterDrawerHeader>
    )
  }

  const DrawerFooter = () => {
    return (
      <s.FooterWrapper>
        <s.FooterButtonsWrapper>
          <s.ButtonSubmit outline onClick={onHandleClose}>
            CANCELAR
          </s.ButtonSubmit>
          <s.ButtonSubmit color="secondary" onClick={applyFilters}>
            APLICAR
          </s.ButtonSubmit>
        </s.FooterButtonsWrapper>
        <ButtonLink
          noIcon
          role="button"
          css={`
            margin: 0 auto ${themeContext.spacing(3)}px;
          `}
          onClick={clearFilters}
        >
          LIMPAR
        </ButtonLink>
      </s.FooterWrapper>
    )
  }

  return (
    <Drawer
      isOpen={isOpen}
      header={DrawerHeader(onHandleClose)}
      footer={DrawerFooter()}
      footerHeight="auto"
      handleClose={onHandleClose}
      data-testid="extract-filter-drawer"
    >
      <s.ContentWrapper>
        <Text type="subheading" color="gray6" bold>
          PERÍODO
        </Text>
        <s.PeriodButtonsWrapper>
          <ButtonTag
            color={selectedInterval.id === 1 ? 'primary' : ''}
            onClick={() =>
              changeInterval(
                INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION
              )
            }
            css={`
              margin: 0 ${themeContext.spacing(1)}px
                ${themeContext.spacing(1)}px 0;
            `}
          >
            últimos 7 dias
          </ButtonTag>
          <ButtonTag
            color={selectedInterval.id === 2 ? 'primary' : ''}
            onClick={() =>
              changeInterval(
                INTERVAL_SELECT_OPTIONS.MONTH_INTERVAL_SELECT_OPTION
              )
            }
          >
            últimos 30 dias
          </ButtonTag>
          <ButtonTag
            color={
              isDatePickerOpen || selectedInterval.id === 3 ? 'primary' : ''
            }
            onClick={() => {
              handleSelectInterval(
                INTERVAL_SELECT_OPTIONS.SPECIFIC_INTERVAL_SELECT_OPTION
              )
              setIsDatePickerOpen(!isDatePickerOpen)
            }}
          >
            {selectedInterval.id === 3 && initialDate && finalDate
              ? `${moment(initialDate).format('DD/MM/YYYY')} - ${moment(
                  finalDate
                ).format('DD/MM/YYYY')}`
              : 'período específico'}
          </ButtonTag>
          {isDatePickerOpen && (
            <s.DatePickerContainer>
              <DatePickerRange
                idDatePickerRange="id-interval"
                // blockFutureDays
                numberOfMonths={1}
                onHandleFocusedInput={focused => onHandleRangeFocused(focused)}
                focusedInput={focusedInput}
                rangeDates={{
                  dateBegin: initialDate,
                  dateEnd: finalDate,
                  intervalDateType: INTERVAL_DATE_TYPE.MONTH,
                }}
                onHandleSetRangeDates={(initialDateInput, finalDateInput) => {
                  setInitialDate(initialDateInput)
                  setFinalDate(finalDateInput)
                  setNewInterval({
                    startDate: moment(initialDateInput).format('YYYY-MM-DD'),
                    endDate: moment(finalDateInput).format('YYYY-MM-DD'),
                  })
                }}
              />
            </s.DatePickerContainer>
          )}
        </s.PeriodButtonsWrapper>
        <Divisor />
        <s.FilterContentWrapper>
          <Text type="subheading" color="gray6" bold>
            TIPO DE MOVIMENTAÇÃO
          </Text>
          <s.FilterButtonsWrapper>
            <ButtonTag
              color={newFilters.redeem ? 'primary' : ''}
              onClick={() => {
                setNewFilters({
                  ...newFilters,
                  redeem: !newFilters.redeem,
                })
              }}
              css={`
                margin: 0 ${themeContext.spacing(1)}px
                  ${themeContext.spacing(1)}px 0;
              `}
            >
              resgate
            </ButtonTag>
            <ButtonTag
              color={newFilters.application ? 'primary' : ''}
              onClick={() => {
                setNewFilters({
                  ...newFilters,
                  application: !newFilters.application,
                })
              }}
            >
              aplicação
            </ButtonTag>
          </s.FilterButtonsWrapper>
        </s.FilterContentWrapper>
      </s.ContentWrapper>
    </Drawer>
  )
}

export default TableFilterDrawer
