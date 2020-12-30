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

import { INTERVAL_SELECT_OPTIONS, ALLOCATION_TYPES } from '../constants'
import { IInterval, ISelectInterval, IAllocationType } from '../types'

import {
  ButtonSubmit,
  CloseButton,
  ContentWrapper,
  DatePickerContainer,
  FilterButtonsWrapper,
  FilterContentWrapper,
  FilterDrawerHeader,
  FooterButtonsWrapper,
  HeaderColTitle,
  PrevButton,
  PeriodButtonsWrapper,
  FooterWrapper,
} from './styles'

interface IProps {
  isOpen: boolean
  onHandleClose: () => void
  filters: IAllocationType[]
  handleFilters: (newFilters: IAllocationType[]) => void
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

  const [newFilters, setNewFilters] = useState<IAllocationType[]>([])
  const [newInterval, setNewInterval] = useState<IInterval>({
    initialDate: '',
    finalDate: '',
  })

  useEffect(() => {
    if (selectedInterval.id === 3) {
      setInitialDate(moment(interval.initialDate, 'DD/MM/YYYY'))
      setFinalDate(moment(interval.finalDate, 'DD/MM/YYYY'))
    } else {
      setInitialDate(null)
      setFinalDate(null)
    }
  }, [selectedInterval, interval])

  useEffect(() => {
    setNewFilters([...filters])
  }, [filters])

  useEffect(() => {
    setNewInterval({ ...interval })
  }, [interval])

  const filterSelect = (allocationType: IAllocationType) => {
    if (newFilters.some(filter => filter === allocationType)) {
      setNewFilters(newFilters.filter(filter => filter !== allocationType))
    } else {
      setNewFilters([...newFilters, allocationType])
    }
  }

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
      initialDate: moment()
        .subtract(interval.value, 'days')
        .format('DD/MM/YYYY'),
      finalDate: moment().format('DD/MM/YYYY'),
    })
  }

  const applyFilters = () => {
    handleFilters([...newFilters])
    handleInterval({ ...newInterval })
    onHandleClose()
  }

  const DrawerHeader = (handleCloseFilters: () => void) => {
    return (
      <FilterDrawerHeader>
        <PrevButton
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
        <HeaderColTitle>
          <img src={LogoConquistaBeta} alt="Logo Conquista Beta" />
        </HeaderColTitle>
        <CloseButton
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
      </FilterDrawerHeader>
    )
  }

  const DrawerFooter = () => {
    return (
      <FooterWrapper>
        <FooterButtonsWrapper>
          <ButtonSubmit outline onClick={onHandleClose}>
            CANCELAR
          </ButtonSubmit>
          <ButtonSubmit color="secondary" onClick={applyFilters}>
            APLICAR
          </ButtonSubmit>
        </FooterButtonsWrapper>
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
      </FooterWrapper>
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
      <ContentWrapper>
        <Text type="subheading" color="gray6" bold>
          PERÍODO
        </Text>
        <PeriodButtonsWrapper>
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
            <DatePickerContainer>
              <DatePickerRange
                idDatePickerRange="id-interval"
                blockFutureDays
                numberOfMonths={1}
                onHandleFocusedInput={focused => onHandleRangeFocused(focused)}
                focusedInput={focusedInput}
                rangeDates={{
                  dateBegin: moment(initialDate),
                  dateEnd: finalDate,
                  intervalDateType: INTERVAL_DATE_TYPE.MONTH,
                }}
                onHandleSetRangeDates={(initialDateInput, finalDateInput) => {
                  setInitialDate(initialDateInput)
                  setFinalDate(finalDateInput)
                  setNewInterval({
                    initialDate: moment(initialDateInput).format('DD/MM/YYYY'),
                    finalDate: moment(finalDateInput).format('DD/MM/YYYY'),
                  })
                }}
              />
            </DatePickerContainer>
          )}
        </PeriodButtonsWrapper>
        <Divisor />
        <FilterContentWrapper>
          <Text type="subheading" color="gray6" bold>
            TIPO DE MOVIMENTAÇÃO
          </Text>
          <FilterButtonsWrapper>
            <ButtonTag
              color={
                newFilters.some(item => item === ALLOCATION_TYPES.INVEST)
                  ? 'primary'
                  : ''
              }
              onClick={() => {
                filterSelect(ALLOCATION_TYPES.INVEST)
              }}
            >
              aplicação no fundo
            </ButtonTag>
            <ButtonTag
              color={
                newFilters.some(item => item === ALLOCATION_TYPES.GOAL_LINK)
                  ? 'primary'
                  : ''
              }
              onClick={() => {
                filterSelect(ALLOCATION_TYPES.GOAL_LINK)
              }}
            >
              vínculo ao objetivo
            </ButtonTag>
            <ButtonTag
              color={
                newFilters.some(item => item === ALLOCATION_TYPES.REDEEM)
                  ? 'primary'
                  : ''
              }
              onClick={() => {
                filterSelect(ALLOCATION_TYPES.REDEEM)
              }}
            >
              resgate do fundo
            </ButtonTag>
            <ButtonTag
              color={
                newFilters.some(item => item === ALLOCATION_TYPES.GOAL_UNLINK)
                  ? 'primary'
                  : ''
              }
              onClick={() => {
                filterSelect(ALLOCATION_TYPES.GOAL_UNLINK)
              }}
            >
              desvínculo do objetivo
            </ButtonTag>
            <ButtonTag
              color={
                newFilters.some(item => item === ALLOCATION_TYPES.GOAL_TRANSFER)
                  ? 'primary'
                  : ''
              }
              onClick={() => {
                filterSelect(ALLOCATION_TYPES.GOAL_TRANSFER)
              }}
            >
              transferência entre objetivos
            </ButtonTag>
          </FilterButtonsWrapper>
        </FilterContentWrapper>
      </ContentWrapper>
    </Drawer>
  )
}

export default TableFilterDrawer
